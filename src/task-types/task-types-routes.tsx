import {redirect, useLoaderData} from "react-router";
import type {ActionFunctionArgs, LoaderFunctionArgs} from "react-router-dom"
import * as z from "zod"
import {getAllTaskTypes, getTaskType, addTaskType, type TaskType, parseTaskTypeForm} from "./task-types.service";
import {TaskTypeCreateCard, TaskTypeDetailsCard, TaskTypeSummaryCard} from "@/components/ui/tasktype-card";
import {getBoopSizeByName} from "@/boop-sizes/boop-sizes.service";
import {getTagByName} from "@/tags/tags.service.ts";

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
                            }: ActionFunctionArgs): Promise<Response | { errors: unknown[] }> => {
  try {
    // validate and parse? using zod?
    const parsedFormData = await parseTaskTypeForm(await request.formData());
    const taskTypeId = await addTaskType(parsedFormData.name, parsedFormData.boopSize, parsedFormData.tags);
    return redirect(`/task-types/${taskTypeId}`);
  } catch (error) {
    return {errors: [error]}
  }
}

const route = {
  path: "/task-types",
  children: [
    {
      index: true,
      Component: SummaryRoute,
      loader: summaryLoader,
    },
    {
      path: ":taskTypeId",
      Component: DetailsRoute,
      loader: detailsLoader,
    },
    {
      path: "new",
      Component: CreateRoute,
      action: createAction,
    }
  ],
}
export default route;