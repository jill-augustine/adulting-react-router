import * as z from 'zod';
import {type BoopSize, boopSizeSelect,} from "@/boop-sizes/service";
import {tagsSelect, parseTagIdsFromString} from "@/tags/service"
import {browserClient as supabase} from "@/lib/client";

export {
  type TaskType,
  taskTypeSelect,
  addTaskType,
  getTaskType,
  getAllTaskTypes,
  updateTaskType,
  deleteTaskType,
  parseTaskTypeForm,
};

type TaskType = {
  id: number;
  boopSize: BoopSize
  name: string;
  tags: string[];
}

const taskTypeSelect = `
  id,
  name,
  boopSize:boop_sizes(${boopSizeSelect}),
  tags(${tagsSelect})
` // not boop_size_id // not tag_id

const addTaskType = async (name: string, boopSizeId: string, tagIds: string[] = []): Promise<number> => {
  const taskData = {name, boop_size_id: Number(boopSizeId), tag_ids: tagIds.map(Number)}
  console.log(taskData);
  const {data: taskTypeId, error} = await supabase
    .rpc('add_task_type', taskData)
    .single()
    .overrideTypes<number, { merge: false }>()
  // const error = new Error("some message")
  // const taskTypeId = null
  if (error) {
    console.error("Error creating task type");
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

// Add tags in tags.ts because updating tags doesn't show what should be added or removed.
const updateTaskType = async (name: string, boopSize: BoopSize): Promise<TaskType> => {
  const {data, error} = await supabase
    .from("task_types")
    .update({name, boop_size: boopSize})
    .select(taskTypeSelect)
    .overrideTypes<TaskType[], { merge: false }>()
  if (error) throw error;
  return data[0]
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

// Returns BoopSize and Tags[] objects, not just their IDs.
const parseTaskTypeForm = async (formData: FormData) => {
  const taskTypeFormSchema = z.object({
    "taskTypeName": z.string(),
    "boopSizeId": z.string(),
    "tagIds": z.string().transform(parseTagIdsFromString),
  })

  const {data: parsedFormData, error} = taskTypeFormSchema.safeParse({
    "taskTypeName": formData.get("task-type-name"),
    "boopSizeId": formData.get("boop-size-id"),
    "tagIds": formData.get("tag-ids"),
  });
  if (error) {
    console.error("parseTaskTypeForm", error)
    throw error;
  }

  // Option A: JSON object
  // const tagNamesParsed = JSON.parse(tagsValue);
  // if (!(tagNamesParsed instanceof Array) ||
  //   tagNamesParsed.some((t) => typeof t !== "string")
  // ) {
  //   throw new Error("tag-names must be an array of strings");
  // }
  // Option B: Comma-separated values
  // const tagNamesParsed = tagsValue.split(",").map(s => s.trim());

  return {
    name: parsedFormData.taskTypeName,
    boopSizeId: parsedFormData.boopSizeId,
    tagIds: parsedFormData.tagIds,
  };
}
