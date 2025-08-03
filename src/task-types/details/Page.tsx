import {useLoaderData} from "react-router";
import {type TaskType} from "@/task-types/service";
import {TaskTypeDetailsCard} from "@/task-types/details/components"

export const Page = () => {
  const {data}: { data: TaskType } = useLoaderData();
  return <TaskTypeDetailsCard taskType={data}/>
}
