import {TaskTypeDetailsCard} from "@/components/ui/tasktype-card";
import {useLoaderData} from "react-router";
import {type TaskType} from "@/lib/task-types"

export default () => {
  const {data}: { data: TaskType } = useLoaderData();
  return <TaskTypeDetailsCard taskType={data}></TaskTypeDetailsCard>
  // return <>{JSON.stringify(data, null, 2)}</>
}