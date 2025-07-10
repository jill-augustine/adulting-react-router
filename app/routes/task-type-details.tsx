import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import { type TaskType, data } from "~/lib/task-types";
import type { Route } from "./+types/task-type-details";
import {TaskTypeDetailsCard, TaskTypeSummaryCard} from "~/components/ui/tasktype-card";

export default ({ params }: Route.LoaderArgs)=> {
  const taskTypesFound = data.filter((taskType: TaskType) => taskType.id.toString() === params.taskTypeId);
  if (!taskTypesFound || taskTypesFound.length != 1) {
    const msg = `Number of task types found: ${taskTypesFound.length}`
    console.error(msg);
    throw new Error(msg);
  }
  return <TaskTypeDetailsCard taskType={taskTypesFound[0]}></TaskTypeDetailsCard>
}