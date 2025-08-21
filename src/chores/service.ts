import * as z from 'zod';
import {browserClient as supabase} from "@/lib/client";
import {type Task, taskSelect} from "@/tasks/service";
import {type TaskType, taskTypeSelect} from "@/task-types/service";
// import {type Tag, tagsSelect} from "@/tags/service";

export type Chore = {
  id: string;
  name: string;
  description: string;
  tasks: Task[],
  taskTypes: TaskType[]
  // tags: Tag[]
}

const choreSelect = `
  id,
  name,
  description,
  tasks (${taskSelect}),
  taskTypes:task_types (${taskTypeSelect})
  `
// tags (${tagsSelect})
// `


export const getAllChores = async (): Promise<Chore[]> => {
  const {data, error} = await supabase
    .from('chores')
    .select(choreSelect)
    .overrideTypes<Chore[], { merge: false }>()
  if (error) throw error;
  return data.sort((a, b) => a.id - b.id);
}

export const getChore = async (choreId: string): Promise<Chore> => {
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

const createChoreFormSchema = z.object({
  choreName: z.string(),
  choreDescription: z.string().optional(),
})

// Add chore with no associated tasks
export const parseCreateChoreForm = (formData: FormData) => {
  const {data: parsedFormData, error} = createChoreFormSchema.safeParse({
    choreName: formData.get('chore-name'),
    choreDescription: formData.get('chore-description'),
  })
  if (error) {
    console.error("parseCreateChoreForm:", error)
    throw error
  }
  return parsedFormData
}

export const addChore = async (chore: { name: string, description?: string }): Promise<string> => {
  const {data, error} = await supabase
    .from('chores')
    .insert([chore])
    .select('id')
    .single()
    .overrideTypes<{ id: string }, { merge: false }>()
  if (error) throw error;
  return data.id
}

export const updateChore = async (chore: Omit<Chore, "tasks">): Promise<Chore> => {
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
