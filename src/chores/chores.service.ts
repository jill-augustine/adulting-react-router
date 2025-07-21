import {browserClient as supabase} from "@/lib/client";
import {type Task, taskSelect} from "@/tasks/tasks.service";
import {type TaskType, taskTypeSelect} from "@/task-types/task-types.service";
import {type Tag, tagsSelect} from "@/tags/tags.service";

type Chore = {
  id: number;
  name: string;
  description: string;
  tasks: Task[],
  taskTypes: TaskType[]
  tags: Tag[]
}

const choreSelect = `
  id,
  name,
  description,
  tasks (${taskSelect}),
  taskTypes:task_types (${taskTypeSelect}),
  tags (${tagsSelect})
  `

// Supabase fetch functions that return an array of objects that are then renamed `convertResponseToChores`
// Returns ordered array of chores

const getAllChores = async (): Promise<Chore[]> => {
  const {data, error} = await supabase
    .from('chores')
    .select(choreSelect)
    .overrideTypes<Chore[], { merge: false }>()
  if (error) throw error;
  return data.sort((a, b) => a.id - b.id);
}

const getChore = async (choreId: number): Promise<Chore> => {
  const {data, error} = await supabase
    .from('chores')
    .select(choreSelect)
    .eq('id', choreId)
    .limit(1)
    .overrideTypes<Chore[], { merge: false }>()
  ;
  if (error) throw error;
  return data[0]
}

// Add chore with no associated tasks
const addChore = async (chore: { name: string, description: string }): Promise<Chore> => {
  const {data, error} = await supabase
    .from('chores')
    .insert([chore])
    .select(choreSelect)
    .overrideTypes<Chore[], { merge: false }>()
  if (error) throw error;
  return data[0]
}

const updateChore = async (chore: Omit<Chore, "tasks">): Promise<Chore> => {
  const {data, error} = await supabase
    .from('chores')
    .upsert(chore)
    .select(choreSelect)
    .overrideTypes<Chore[], { merge: false }>()
  if (error) throw error;
  return data[0]
}

// Delete and return a chore
const deleteChore = async (choreId: number): Promise<Chore> => {
  const {data, error} = await supabase
    .from('chores')
    .delete()
    .eq('id', choreId)
    .select(choreSelect)
    .overrideTypes<Chore[], { merge: false }>()
  if (error) throw error;
  return data[0]
}


export {
  type Chore,
  addChore,
  getAllChores,
  getChore,
  updateChore,
  deleteChore,
}