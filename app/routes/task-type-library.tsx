import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import { type TaskType, data } from "~/lib/task-types";
import {TaskTypeSummaryCard} from "~/components/ui/tasktype-card";

export default ()=>  {
  return data.map((taskType) => <TaskTypeSummaryCard taskType={taskType}></TaskTypeSummaryCard>)
}