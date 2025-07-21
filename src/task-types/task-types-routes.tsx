import {redirect, useLoaderData} from "react-router";
import type {ActionFunctionArgs, LoaderFunctionArgs} from "react-router-dom"
import * as z from "zod"
import {getAllTaskTypes, getTaskType, addTaskType, type TaskType} from "./task-types.service";
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
