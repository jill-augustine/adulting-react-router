import * as z from 'zod';
import {type BoopSize, boopSizeSelect, getBoopSizeByName} from "@/boop-sizes/boop-sizes.service";
import {tagsSelect, getTagByName, type Tag} from "@/tags/service.ts"
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

const addTaskType = async (name: string, boopSize: BoopSize, tags: Tag[] = []): Promise<number> => {
  const tagIds: number[] = tags.map((tag) => tag.id)
  // const {data: taskTypeId, error} = await supabase
  //   .rpc('add_task_type', {name, boop_size_id: boopSize.id, tag_ids: tagIds})
  //   .single()
  //   .overrideTypes<number, { merge: false }>()
  const error = new Error("some message")
  const taskTypeId = null
  if (error || taskTypeId === null) {
    console.error("There is no task type")
    throw error;
  }
  // TODO: Throw a different error if data is null
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
    "task-type-name": z.string(),
    "boop-size-name": z.string(),
    "tag-names": z.string(),
  })

  const {data: parsedFormData, error} = taskTypeFormSchema.safeParse(formData);
  if (error) throw error;

  // const boopSizeNameValue = formData.get("boop-size-name")
  // if (typeof boopSizeNameValue !== "string") throw new Error("boop-size must be a string");
  const boopSizeNameValue = "small"

  // Option A: JSON object
  // const tagNamesParsed = JSON.parse(tagsValue);
  // if (!(tagNamesParsed instanceof Array) ||
  //   tagNamesParsed.some((t) => typeof t !== "string")
  // ) {
  //   throw new Error("tag-names must be an array of strings");
  // }
  // Option B: Comma-separated values
  // const tagNamesParsed = tagsValue.split(",").map(s => s.trim());

  const tagNamesParsed = ["plants", "cleaning"]
  // Allow these to throw errors if they happen
  const boopSize = await getBoopSizeByName(boopSizeNameValue)
  const tags = await Promise.all(tagNamesParsed.map((tagName) => {
    return getTagByName(tagName)
  }))
  return {
    name: parsedFormData["task-type-name"], boopSize, tags
  };
}
