import * as z from 'zod';
import {type BoopSize, boopSizeSelect,} from "@/boop-sizes/service";
// import {tagsSelect, parseTagIdsFromString, type Tag} from "@/tags/service"
import {browserClient as supabase} from "@/lib/client";
import {Duration} from "luxon";

export {
  type TaskType,
  taskTypeSelect,
  createTaskType,
  updateTaskType,
  getTaskType,
  getAllTaskTypes,
  deleteTaskType,
  parseCreateTaskTypeForm,
};

type TaskType = {
  id: number;
  boopSize: BoopSize
  name: string;
  frequency: string;
  // tags: Tag[];
}

const taskTypeSelect = `
  id,
  name,
  frequency,
  boopSize:boop_sizes(${boopSizeSelect})
  `
// tags(${tagsSelect})
// `

const parseFrequency = (formData: FormData) => {
  const frequencySchema = z.object(
    {
      // Convert values to numbers
      months: z.string().transform(val => parseInt(val, 10)),
      weeks: z.string().transform(val => parseInt(val, 10)),
      days: z.string().transform(val => parseInt(val, 10)),
    }).superRefine(
    // Assert 1) no values below zero, 2) at least one value above 0
    (freq, ctx) => {
      const values = Object.values(freq)
      if (values.some(isNaN)) {
        ctx.addIssue({
            code: "custom",
            message: "Task frequency contains empty values",
          },
        )
      } else {
        if (Math.min(...values) < 0) {
          ctx.addIssue({
              code: "custom",
              message: "Task frequency contains negative values"
            }
          )
        }
        if (!(Math.max(...values) > 0)) {
          ctx.addIssue({
            code: "custom",
            message: "Task frequency does not contain any value > 0"
          })
        }
      }
    }).transform(
    // Convert to ISO duration
    (freq) => Duration.fromObject(freq).toISO()
  )
  return frequencySchema.safeParse(
    {
      months: formData.get('frequency-months'),
      weeks: formData.get('frequency-weeks'),
      days: formData.get('frequency-days'),
    }
  )
}

const createTaskTypeFormSchema = z.object({
  taskTypeName: z.string(),
  boopSizeId: z.string(),
  // tagIds: z.string().transform(parseTagIdsFromString),
  frequency: z.string(),
})

// Returns the IDs of the boop size and tags, instead of the whole object.
const parseCreateTaskTypeForm = (formData: FormData) => {
  const {data: parsedFrequency, error: frequencyParsingError} = parseFrequency(formData);
  if (frequencyParsingError) {
    throw new Error("Frequency parsing error: " + frequencyParsingError);
  }
  console.log("Parsed Frequency: ", parsedFrequency)
  const {data: parsedFormData, error} = createTaskTypeFormSchema.safeParse({
    id: formData.get("task-type-id"),
    taskTypeName: formData.get("task-type-name"),
    boopSizeId: formData.get("boop-size-id"),
    tagIds: formData.get("tag-ids"),
    frequency: parsedFrequency,
  });

  if (error) {
    console.error("parseCreateTaskTypeForm:", error)
    throw error;
  }
  return {
    name: parsedFormData.taskTypeName,
    boopSizeId: parsedFormData.boopSizeId,
    // tagIds: parsedFormData.tagIds,
    frequency: parsedFormData.frequency,
  };
}

export const parseEditTaskTypeForm = (formData: FormData) => {
  const editTaskTypeFormSchema = createTaskTypeFormSchema.extend(
    {id: z.string()}
  )
  const {data: parsedFrequency, error: frequencyParsingError} = parseFrequency(formData);
  if (frequencyParsingError) {
    throw new Error("Frequency parsing error: " + frequencyParsingError);
  }
  const {data: parsedFormData, error} = editTaskTypeFormSchema.safeParse({
    id: formData.get("task-type-id"),
    taskTypeName: formData.get("task-type-name"),
    boopSizeId: formData.get("boop-size-id"),
    // tagIds: formData.get("tag-ids"),
    frequency: parsedFrequency,
  });
  if (error) {
    console.error("parseEditTaskTypeForm", error)
    throw error;
  }
  return {
    id: parsedFormData.id,
    name: parsedFormData.taskTypeName,
    boopSizeId: parsedFormData.boopSizeId,
    // tagIds: parsedFormData.tagIds,
    frequency: parsedFormData.frequency
  };
}

const createTaskType = async (
  name: string,
  boopSizeId: string,
  frequency: string,
  tagIds: string[] = []
): Promise<number> => {
  const taskData = {name, boop_size_id: boopSizeId, frequency, tag_ids: tagIds}
  console.log(taskData);
  const {data: taskTypeId, error} = await supabase
    .rpc('add_task_type', taskData)
    .single()
    .overrideTypes<number, { merge: false }>()
  if (error) {
    console.error(`Error creating task type: ${error.message}`);
    throw error;
  }
  if (!taskTypeId) {
    console.error("No error was thrown but no task type was returned.");
    throw error;
  }
  return taskTypeId;
}

const updateTaskType = async (
  id: string,
  name: string,
  boopSizeId: string,
  frequency: string,
  tagIds: string[] = []): Promise<number> => {
  const taskData = {
    id,
    name,
    boop_size_id: boopSizeId,
    frequency,
    tag_ids: tagIds,
  }
  console.log(taskData);
  const {data: taskTypeId, error} = await supabase
    .rpc('update_task_type', taskData)
    .single()
    .overrideTypes<number, { merge: false }>()
  if (error) {
    console.error("Error updating task type");
    throw error;
  }
  if (!taskTypeId) {
    console.error("No error was thrown but no task type was returned.");
    throw error;
  }
  return taskTypeId;
}

const getTaskType = async (taskTypeId: number): Promise<TaskType> => {
  const {data, error} = await supabase
    .from("task_types")
    .select(taskTypeSelect)
    .eq("id", taskTypeId)
    .overrideTypes<TaskType[], { merge: false }>()
  if (error) throw error;
  return data[0]
}

const getAllTaskTypes = async (): Promise<TaskType[]> => {
  const {data, error} = await supabase
    .from("task_types")
    .select(taskTypeSelect)
    .overrideTypes<TaskType[], { merge: false }>()
  if (error) throw error;
  return data
}

const deleteTaskType = async (taskTypeId: number): Promise<TaskType> => {
  const {data, error} = await supabase
    .from("task_types")
    .delete()
    .eq("id", taskTypeId)
    .select(taskTypeSelect)
    .overrideTypes<TaskType[], { merge: false }>()
  if (error) throw error;
  return data[0]
}
