import {type TaskType} from "@/task-types/service";
import {
  Card, CardContent, CardDescription,
  CardFooter, CardAction,
  CardHeader, CardTitle
} from "@/components/ui/card";
import {Button} from "@/components/ui/button.tsx";
import {PencilIcon} from "lucide-react";
import * as React from "react";
import {useLocation} from "react-router";
import {Duration} from "luxon";

export const TaskTypeDetailsCard = ({taskType}: { taskType: TaskType }) => {
  const frequency = Duration.fromISO(taskType.frequency).removeZeros()
  console.log(frequency)
  return (
    <Card key={taskType.id}>
      <CardHeader>
        <CardTitle>{taskType.name}</CardTitle>
        <CardAction>Task Type</CardAction>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <p>ID: {taskType.id}</p>
          <p>Size: {taskType.boopSize.name}</p>
          <p>Frequency:
            {frequency.isValid ?
              <span> Repeats every {frequency.toHuman({showZeros: false})}</span> :
              <span className="text-sm text-red-500"> No frequency set!</span>
            }
          </p>
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
