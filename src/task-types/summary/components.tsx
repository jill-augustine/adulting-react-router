import type {TaskType} from "@/task-types/service";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export const TaskTypeSummaryCard = ({taskType}: { taskType: TaskType }) => {
  return (
    <Card key={taskType.id}>
      <CardHeader>
        <CardTitle>TaskType Summary</CardTitle>
        {/*<CardAction>Card Action</CardAction>*/}
      </CardHeader>
      <CardContent>
        <CardTitle>#{taskType.id} {taskType.name}</CardTitle>
        <CardDescription>
          {JSON.stringify(taskType.boopSize)}<br/><br/>
        </CardDescription>
      </CardContent>
      {/*<CardFooter>*/}
      {/*  <p>Card Footer</p>*/}
      {/*</CardFooter>*/}
    </Card>
  )
}
