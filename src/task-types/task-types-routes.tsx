import {getAllTaskTypes, getTaskType, addTaskType, type TaskType} from "./task-types.service";
import {TaskTypeCreateCard, TaskTypeDetailsCard, TaskTypeSummaryCard} from "@/components/ui/tasktype-card";
import {redirect, useLoaderData} from "react-router";
import {getBoopSizeByName} from "@/boop-sizes/boop-sizes.service";
import type {ActionFunctionArgs, LoaderFunctionArgs} from "react-router-dom"

export {
  SummaryRoute,
  summaryLoader,
  DetailsRoute,
  detailsLoader,
  CreateRoute,
  createAction,
}

const SummaryRoute = () => {
  const {data} = useLoaderData();
  return data.map((taskType: TaskType) => <TaskTypeSummaryCard taskType={taskType}></TaskTypeSummaryCard>)
}

const summaryLoader = async () => {
  return {data: await getAllTaskTypes()};
}

const DetailsRoute = () => {
  const {data}: { data: TaskType } = useLoaderData();
  return <TaskTypeDetailsCard taskType={data}></TaskTypeDetailsCard>
}

const detailsLoader = async ({params}: LoaderFunctionArgs) => {
  return {data: await getTaskType(Number(params.taskTypeId))};
}

const CreateRoute = () => {
  return <TaskTypeCreateCard></TaskTypeCreateCard>
}

const createAction = async ({
                              request,
                            }: ActionFunctionArgs) => {
  const formData = await request.formData();
  // const errors = await validateRecipeFormData(formData);
  // if (errors) {
  //   return { errors };
  // }
  // validate and parse? using zod?

  const name = formData.get("name") as string
  const boopSize = await getBoopSizeByName("small")
  const taskType = await addTaskType(name, boopSize);
  return redirect(`/task-types/${taskType.id}`);
}
