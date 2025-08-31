import * as z from 'zod';
import {browserClient as supabase} from "@/lib/client";
import {type Task, taskSelect} from "@/tasks/service";
import {taskTypeFormSchema, type TaskType} from "@/task-types/service";

export type Chore = {
  id: string;
  name: string;
  description?: string;
  tasks?: Task[],
  taskTypes?: TaskType[]
}

const choreSelect = `
  id,
  name,
  description,
  taskTypes:task_types,
  tasks (${taskSelect})
  `


export const getAllChores = async (): Promise<Chore[]> => {
  const {data, error} = await supabase
    .from('chores')
    .select(choreSelect)
    .order('id')
    .overrideTypes<Chore[], { merge: false }>()
  if (error) throw error;
  return data;
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
  name: z.string(),
  description: z.string().optional(),
  taskTypes: taskTypeFormSchema.array()
    .transform((array, ctx) => {
      const frequencies = array.map((val) => val.frequency)
      if (array.length !== new Set(frequencies).size) {
        ctx.issues.push({
          code: "custom",
          message: `Duplicate frequencies ${JSON.stringify(frequencies)} are not allowed.`,
          input: frequencies,
        })
        return z.NEVER
      }
      return array.map((val) => ({
          name: val.name,
          frequency: `P${val.frequency}D`
        }
      ))
    }),
})

const editChoreFormSchema = createChoreFormSchema.extend({id: z.uuidv4()})

export const parseCreateChoreForm = (formData: FormData): Omit<Chore, 'id'> => {
  const extractedValues = {
    name: formData.get('chore-name'),
    description: formData.get('chore-description'),
    taskTypes: JSON.parse(formData.get('task-types') as string || ""),
  }
  console.log("Extracted values", extractedValues)
  const {data: parsedFormData, error} = createChoreFormSchema.safeParse(extractedValues);
  if (error) {
    console.error("parseCreateChoreForm:", error)
    throw new Error(JSON.stringify(error.issues.map((iss) => iss.message)))
  }
  console.log("parseCreateChoreForm:", parsedFormData)
  return parsedFormData
}

export const parseEditChoreForm = (formData: FormData): Chore => {
  const extractedValues = {
    name: formData.get('chore-name'),
    description: formData.get('chore-description'),
    taskTypes: JSON.parse(formData.get('task-types') as string || ""),
    id: formData.get('chore-id'),
  }
  console.log("Extracted values", extractedValues)
  const {data: parsedFormData, error} = editChoreFormSchema.safeParse(extractedValues);
  if (error) {
    console.error("parseEditChoreForm:", error)
    throw new Error(JSON.stringify(error.issues.map((iss) => iss.message)))
  }
  console.log("parseEditChoreForm:", parsedFormData)
  return parsedFormData
}

export const addChore = async (chore: Omit<Chore, "id">): Promise<string> => {
  const {data, error} = await supabase
    .from('chores')
    .insert([chore])
    .select('id')
    .single()
    .overrideTypes<{ id: string }, { merge: false }>()
  if (error) throw error;
  return data.id
}

export const updateChore = async (chore: Chore): Promise<string> => {
  console.log("Update function", JSON.stringify(chore))
  const {taskTypes, ...rest} = chore
  console.log("Rest:", rest)
  const {data, error} = await supabase
    .from('chores')
    .upsert({
      task_types: taskTypes,
      ...rest,
    })
    .select('id')
    .single()
    .overrideTypes<{ id: string }, { merge: false }>()
  if (error) throw error;
  return data.id
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
