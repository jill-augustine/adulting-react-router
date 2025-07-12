import {type TaskType} from "@/lib/task-types";
import {TaskTypeSummaryCard} from "@/components/ui/tasktype-card";
import {useLoaderData} from "react-router";

export default () => {
  const {data} = useLoaderData();
  return data.map((taskType: TaskType) => <TaskTypeSummaryCard taskType={taskType}></TaskTypeSummaryCard>)
}