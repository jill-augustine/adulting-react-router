import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import { type TaskType, data } from "~/lib/task-types";
import type { Route } from "./+types/task-type-details";

export default ({ params }: Route.LoaderArgs)=> {
  const taskTypesFound = data.filter((taskType: TaskType) => taskType.id.toString() === params.taskTypeId);
  if (!taskTypesFound || taskTypesFound.length != 1) {
    const msg = `Number of task types found: ${taskTypesFound.length}`
    console.error(msg);
    throw new Error(msg);
  }
  const createTaskTypeCard = (taskType: TaskType) => {
    return (
      <Card key={taskType.id}>
        <CardHeader>
          <CardTitle>{taskType.name}</CardTitle>
          <CardDescription>TaskType</CardDescription>
          {/*<CardAction>Card Action</CardAction>*/}
        </CardHeader>
        {/*<CardContent>*/}
        {/*  <p>Size: {taskType.name} ({taskType.value})</p>*/}
        {/*</CardContent>*/}
        {/*<CardFooter>*/}
        {/*  <p>Card Footer</p>*/}
        {/*</CardFooter>*/}
      </Card>
    )
  }
  return createTaskTypeCard(taskTypesFound[0])
}