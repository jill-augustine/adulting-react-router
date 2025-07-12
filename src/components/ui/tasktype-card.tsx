import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
// import { type TaskType, getTaskTypesForTaskType}from "@/lib/taskTypes";
import {type TaskType} from "@/lib/task-types";

const TaskTypeSummaryCard = ({taskType}: { taskType: TaskType }) => {
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

const TaskTypeDetailsCard = ({taskType}: { taskType: TaskType }) => {
  return (
    <Card key={taskType.id}>
      <CardHeader>
        <CardTitle>TaskType Details</CardTitle>
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

export {
  TaskTypeDetailsCard,
  TaskTypeSummaryCard,
}