import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
// import { type TaskType, getTaskTypesForTaskType}from "@/task-types/task-types.service";
import {type TaskType} from "@/task-types/task-types.service";

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

import {Form} from "react-router";

const TaskTypeCreateCard = () => {
  return (
    <Form method="post">
      TaskType Name: <input type="text" name="task-type-name"/><br/>
      BoopSize Name: <input type="text" name="boop-size-name"/><br/>
      Tag Names: <input type="text" name="tag-names"/><br/>
      <button type="submit">Submit</button>
    </Form>
  );
}


export {
  TaskTypeDetailsCard,
  TaskTypeSummaryCard,
  TaskTypeCreateCard,
}