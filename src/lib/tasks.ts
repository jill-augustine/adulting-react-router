import {
  supabase,
} from "@/lib/client";
import {type TaskType, taskTypeSelect} from "@/lib/task-types";
import {DateTime} from "luxon"

type Task = {
  id: number;
  choreId: number;
  dueDate: string;
  startDate: string;
  taskType: TaskType;
  completedBy: string | null;
  dateCompleted: string | null;
}

const taskSelect = `
  id,
  choreId:chore_id,
  startDate:start_date,
  dueDate:due_date,
  dateCompleted:date_completed,
  completedBy:completed_by,
  taskType:task_types(${taskTypeSelect})
  ` // not task_type_id

// Functions to return tasks
const getTask = async (taskId: number): Promise<Task> => {
  const {data, error} = await supabase
    .from("tasks")
    .select(taskSelect)
    .is("id", taskId)
    .overrideTypes<Task[], { merge: false }>()
  if (error) throw error;
  return data[0];
}
const getOpenTasks = async (): Promise<Task[]> => {
  const {data, error} = await supabase
    .from("tasks")
    .select(taskSelect)
    .is("date_completed", null)
    .overrideTypes<Task[], { merge: false }>()
  if (error) throw error;
  return data;
}

const getCompletedTasks = async (): Promise<Task[]> => {
  const {data, error} = await supabase
    .from("tasks")
    .select(taskSelect)
    .neq("date_completed", null)
    .overrideTypes<Task[], { merge: false }>()
  if (error) throw error;
  return data;
}

const addTask = async (choreId: number, taskTypeId: number, startDate: string | null = null): Promise<Task> => {

  // check if task types exist. if no, throw error.
  // check if chore exists, if no, throw error
  // if yes,

  const taskData = {
    // Note: arguments to add
    //     chore_id: (this should be passed as argument)
    //     task_type_id: this key is needed
    //     start_date: startDate (set to today if not provided),
    //     due_date: (deduce from start date + task type frequency)
    //   id: number; (should not be provided)
    //     task_types: (should not be present)
    //     completed_by: completedBy, (should not be present)
    //     date_completed: dateCompleted, (should not be present)
  }
  const {data, error} = await supabase
    .from('tasks')
    .insert(taskData) // should include the id of the task type
    .select(taskSelect)
    .overrideTypes<Task[], { merge: false }>()
  if (error) throw error;
  return data[0];
}

const completeTask = async (taskId: number): Promise<Task[]> => {
  // Logic: Get boopSize of current task
  // Get tasks where boopsize <= W where choreId = X and completed = False
  // set "completed_by" and "date_completed" for each task
  // return all completed tasks

  const date_completed = DateTime.now().toISODate()
  // Use task to get associated BoopSize
  const task = await getTask(taskId);

  const eligibleTasksResult = await supabase
    .from("tasks")
    .select(taskSelect)
    .is("chore_id", task.choreId)
    .lte("task_types.boop_sizes.value", task.taskType.boopSize.value)
    .is("date_completed", null)
    .overrideTypes<Task[], { merge: false }>()
  if (eligibleTasksResult.error) throw eligibleTasksResult.error
  const eligibleTaskIds: number[] = eligibleTasksResult.data.map((row) => row.id)

  const {data, error} = await supabase
    .from("tasks")
    .update({completedBy: task.id, date_completed})
    .in('id', eligibleTaskIds)
    .select(taskSelect)
    .overrideTypes<Task[], { merge: false }>()
  if (error) throw error;
  return data
}

const deleteTask = async (taskId: number): Promise<Task> => {
  const {data, error} = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId)
    .select()
    .overrideTypes<Task[], { merge: false }>()
  if (error) throw error;
  return data[0]
}

export {
  type Task,
  taskSelect,
  addTask,
  getTask,
  getCompletedTasks,
  getOpenTasks,
  // No update method planned
  deleteTask,
};