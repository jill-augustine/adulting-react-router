import {type TaskType} from "@/task-types/service";
import {
  Card, CardContent, CardDescription,
  CardFooter, CardAction,
  CardHeader, CardTitle
} from "@/components/ui/card";
import {Button} from "@/components/ui/button.tsx";
import {PencilIcon, Repeat2Icon} from "lucide-react";
import * as React from "react";
import {useLocation} from "react-router";
import {Duration} from "luxon";
import {formatFrequency} from "@/task-types/components";

export const TaskTypeDetailsCard = ({taskType}: { taskType: TaskType }) => {
  const frequency = Duration.fromISO(taskType.frequency).removeZeros()
  return (
    <Card key={taskType.id}>
      <CardHeader>
        <CardAction className="justify-items-end">
          <Repeat2Icon/>
          <div>{formatFrequency(taskType.frequency)}</div>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <CardTitle>{taskType.name}</CardTitle>
        <CardDescription>
          {/*<p>ID: {taskType.id}</p>*/}
          <p>Task Size: {taskType.boopSize.name}</p>
          <h3 className="text-lg">Add 'add to chore' button.<br/> Add 'used in chores...' section</h3>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <EditButton/>
      </CardFooter>
    </Card>
  )
}

const EditButton = () => {
  const location = useLocation()
  return (
    <a href={`${location.pathname}/edit`}>
      <Button variant="outline" size="sm" className="">
        <PencilIcon/>Edit
      </Button>
    </a>
  )
}

export const PageHeader = () => {
  // const location = useLocation()
  return null
  // (
  //   <div className="p-4">
  //     <EditButton/>
  //   </div>
  // )
}
