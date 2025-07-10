import {createClient, type QueryData, type QueryError, type QueryResult} from '@supabase/supabase-js';
import type {TaskType} from "~/lib/task-types";
import type {Chore} from "~/lib/chores";
import type {Tag} from "~/lib/tags";
import type {Task} from "~/lib/tasks";
import type {BoopSize} from "~/lib/boop-sizes";

const VITE_SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
const VITE_SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

type AdultingData = BoopSize[] | Chore[] | Tag[] | TaskType[] | Task[]

// type AdultingResponse = {
//   data: Task[]
//   error: null } | {
//   data: null
//   error: QueryError
// }

// // Response should always contain an array of elements (not single elements)
// const handleResponse = (response: AdultingData |) : ReturnedData  => {
//   const { data, error } = response
//   if (error) throw error
//   return data
// }
// Select queries explicitly returning selected columns and renaming where necessary
const tagsSelect = 'id, name'
const boopSizeSelect = 'id, name, value'
const taskTypeSelect = `
  id,
  name,
  boopSize:boop_sizes(${boopSizeSelect}),
  tags(${tagsSelect})
` // not boop_size_id // not tag_id
const taskSelect = `
  id,
  choreId:chore_id,
  startDate:start_date,
  dueDate:due_date,
  dateCompleted:date_completed,
  completedBy:completed_by,
  taskType:task_types(${taskTypeSelect})
  ` // not task_type_id
const choreSelect = `
  id,
  name,
  description,
  tasks (${taskSelect}),
  taskTypes:task_types (${taskTypeSelect}),
  tags (${tagsSelect})
  `

const boopSizeQuery = supabase
  .from('boop_sizes')
  .select(boopSizeSelect)
  .limit(1)
  .overrideTypes<BoopSize[], {merge: false}>()

type ReturnedBoopSize = QueryData<typeof boopSizeQuery>

const taskTypesQuery = supabase
  .from('task_types')
  .select(taskTypeSelect)
  .limit(1)
  .overrideTypes<TaskType[], {merge: false}>()

type ReturnedTaskType = QueryData<typeof taskTypesQuery>

const tasksQuery = supabase
  .from('tasks')
  .select(taskSelect)
  .limit(1)
  .overrideTypes<Task[], {merge: false}>()
type ReturnedTask = QueryData<typeof tasksQuery>

const choreQuery = supabase
  .from('chore')
  .select(choreSelect)
  .limit(1)
  .overrideTypes<Chore[], {merge: false}>
type ReturnedChore = QueryData<typeof choreQuery>

type ReturnedData = ReturnedBoopSize | ReturnedChore | ReturnedTask | ReturnedTaskType



type QueryRes = QueryResult<Promise<ReturnedData>>

export type {
  AdultingData,
  // AdultingResponse,
  ReturnedBoopSize,
  ReturnedChore,
  ReturnedData,
  ReturnedTask,
  ReturnedTaskType,
  // ReturnedResult,
}
export {
  // handleResponse,
  supabase,
  boopSizeSelect,
  taskTypesQuery,
  taskSelect,
  choreSelect
};