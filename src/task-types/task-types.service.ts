import {type BoopSize, boopSizeSelect} from "@/boop-sizes/boop-sizes.service";
import {type Tag, tagsSelect} from "@/tags/tags.service"
import {supabase} from "@/lib/client";
import type {TaskTypeDetailsCard} from "@/components/ui/tasktype-card.tsx";

export {
  type TaskType,
  taskTypeSelect,
  addTaskType,
  getTaskType,
  getAllTaskTypes,
  updateTaskType,
  deleteTaskType,
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
  const {data: taskTypeId, error} = await supabase
    .rpc('add_task_type', {name, boop_size_id: boopSize.id, tag_ids: tagIds})
    .single()
    .overrideTypes<number, { merge: false }>()
  if (error || taskTypeId === null) throw error;
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

