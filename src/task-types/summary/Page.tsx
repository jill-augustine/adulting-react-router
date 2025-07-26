import {useLoaderData} from "react-router";
import {type TaskType} from "../service.ts";
import {TaskTypeSummaryCard} from "@/task-types/summary/components"

export const Page = () => {
  const {data} = useLoaderData();
  return data.map((taskType: TaskType) => <TaskTypeSummaryCard taskType={taskType}/>)
}