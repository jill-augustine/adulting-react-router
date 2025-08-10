import type {TaskType} from "@/task-types/service";
import {Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button.tsx";
import {PlusIcon} from "lucide-react";
import * as React from "react";
import {useLocation} from "react-router";
import {Duration} from "luxon";

export const TaskTypeSummaryCard = ({taskType}: { taskType: TaskType }) => {
  const location = useLocation();
  const frequency = Duration.fromISO(taskType.frequency).removeZeros()
  return (
    <a href={`${location.pathname}/${taskType.id}`}>
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
      </Card>
    </a>
  )
}
export const PageHeader = () => {
  return (
    <div className="p-4">
      <div>
        <a href="/task-types/new">
          <Button variant="outline" size="sm" className="">
            <PlusIcon/>New Task Type
          </Button>
        </a>
      </div>
    </div>
  )
}