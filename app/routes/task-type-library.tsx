import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import { type TaskType, data } from "~/lib/task-types";

export default ()=>  {
  const createTaskTypeCard = (taskType: TaskType) => {
    return (
      <Card key={taskType.id}>
        <CardHeader>
          <CardTitle>{taskType.id} - {taskType.name}</CardTitle>
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
  return data.map(createTaskTypeCard)
}