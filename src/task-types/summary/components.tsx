import {type TaskType} from "@/task-types/service.ts";
import {Card, CardAction, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button.tsx";
import {PlusIcon} from "lucide-react";
import * as React from "react";
import {useLocation} from "react-router";
import {Duration} from "luxon";
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from "@/components/ui/table";

const TaskTypeSummaryCard = ({taskType, location}: {
  taskType: TaskType,
  location: ReturnType<typeof useLocation>
}) => {
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

export const TaskTypeSummaryCardList = ({taskTypes}: { taskTypes: TaskType[] }) => {
  const location = useLocation();
  return (
    <div>
      <PageHeader/>
      <div className="flex flex-col gap-4">
        {taskTypes.map((taskType: TaskType) => <TaskTypeSummaryCard taskType={taskType} location={location}/>)}
      </div>
    </div>
  )
}

const TaskTypeSummaryTableRow = ({taskType, location}: {
  taskType: TaskType,
  location: ReturnType<typeof useLocation>
}) => {
  const frequency = Duration.fromISO(taskType.frequency).removeZeros()
  return (
    <TableRow key={taskType.id}>
      <TableCell>{taskType.id}</TableCell>
      <TableCell>{taskType.name}</TableCell>
      <TableCell>{taskType.boopSize.name}</TableCell>
      <TableCell>{frequency.isValid ?
        <span> Repeats every {frequency.toHuman({showZeros: false})}</span> :
        <span className="text-sm text-red-500"> No frequency set!</span>
      }</TableCell>
    </TableRow>
  )
}

export const TaskTypeSummaryTable = ({taskTypes}: { taskTypes: TaskType[] }) => {
  const location = useLocation();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10 font-bold">ID</TableHead>
          <TableHead className="font-bold">Name</TableHead>
          <TableHead className="font-bold">Size</TableHead>
          <TableHead className="font-bold">Frequency</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {taskTypes.map((taskType) => {
          return <TaskTypeSummaryTableRow key={taskType.id} taskType={taskType} location={location}/>
        })}
      </TableBody>
    </Table>
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