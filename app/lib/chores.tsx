import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import {type Task} from "~/lib/tasks";
import {type ReturnedData, type ReturnedChore, supabase} from "~/lib/client";
import type {QueryData, QueryResult} from "@supabase/supabase-js";
import type {TaskType} from "~/lib/task-types";

type Chore = {
  id: number;
  name: string;
  description: string;
  tasks: Task[],
}

// Supabase fetch functions that return an array of objects that are then renamed `convertResponseToChores`
// Returns ordered array of chores

const getAllChores = async (): Promise<Chore[]> => {
  const { data, error } = await supabase
    .from('chores')
    .select(`
      *,
      tasks (
        *,
        task_types (
          *,
          boop_sizes (*)
        )
      )
    `)
    .overrideTypes<Chore[], {merge: false}>()
  if (error) throw error;
  return data.sort((a, b) => a.id - b.id);
}

const getChore = async (choreId: number): Promise<Chore> => {
  const { data, error } = await supabase
    .from('chores')
    .select(`
      *,
      tasks (
        *,
        task_types (
          *,
          boop_sizes (*)
        )
      )
    `)
    .eq('id', choreId)
    .limit(1)
    .overrideTypes<Chore[], {merge: false}>()
  ;
  if (error) throw error;
  return data[0]
}

// Add chore with no associated tasks
const addChore = async(chore: {name: string, description: string}): Promise<Chore> => {
  const { data, error } = await supabase
    .from('chores')
    .insert([chore])
    .select()
    .overrideTypes<Chore[], {merge: false}>()
  if (error) throw error;
  return data[0]
}

const updateChore = async (chore: Omit<Chore, "tasks">): Promise<Chore> => {
  const { data, error } = await supabase
    .from('chores')
    .upsert(chore)
    .select()
    .overrideTypes<Chore[], {merge: false}>()
  if (error) throw error;
  return data[0]
}

// Delete and return a chore
const deleteChore = async (choreId: number): Promise<Chore> => {
  const { data, error } = await supabase
    .from('chores')
    .delete()
    .eq('id', choreId)
    .select()
    .overrideTypes<Chore[], {merge: false}>()
  if (error) throw error;
  return data[0]
}

const getTaskTypesForChore = (chore: Chore) => {
  return new Set(chore.tasks.map((task) => task.taskType.id))
}

export { type Chore, getTaskTypesForChore }