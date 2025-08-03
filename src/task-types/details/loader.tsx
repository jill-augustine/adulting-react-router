import type {LoaderFunctionArgs} from "react-router-dom"
import {getTaskType} from "@/task-types/service";

export const loader = async ({params}: LoaderFunctionArgs) => {
  return {data: await getTaskType(Number(params.taskTypeId))};
}
