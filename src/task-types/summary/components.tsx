import {type TaskType} from "@/task-types/service.ts";
import {Card, CardAction, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button.tsx";
import {ChevronRightIcon, PlusIcon, Repeat2Icon} from "lucide-react";
import * as React from "react";
import {useLocation} from "react-router";
import {Duration} from "luxon";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

import {createColumnHelper, flexRender, getCoreRowModel, useReactTable,} from '@tanstack/react-table'
import {formatFrequency} from "@/task-types/components.tsx";

export const PageHeader = () => {
  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      <div className="flex"><h2 className="text-lg">Overview</h2></div>
      {/*<div className="flex-grow"/>*/}
      <a href="/task-types/new">
        <Button variant="outline" size="sm" className="">
          <PlusIcon/>New Task Type
        </Button>
      </a>
    </div>
  )
}

const TaskTypeSummaryCard = ({taskType, location}: {
  taskType: TaskType,
  location: ReturnType<typeof useLocation>
}) => {
  return (
    <a href={`${location.pathname}/${taskType.id}`}>
      <Card key={taskType.id} className="size-40">
        <CardHeader>
          <CardAction className="justify-items-end">
            <Repeat2Icon/>
            <div>{formatFrequency(taskType.frequency)}</div>
          </CardAction>
        </CardHeader>
        <CardContent>
          <CardTitle>{taskType.name}</CardTitle>
        </CardContent>
      </Card>
    </a>
  )
}

export const TaskTypeSummaryCardList = ({taskTypes}: { taskTypes: TaskType[] }) => {
  const location = useLocation();
  return (
    <div className="flex flex-wrap justify-evenly gap-4">
      {taskTypes.map((taskType: TaskType) => <TaskTypeSummaryCard taskType={taskType} location={location}/>)}
    </div>
  )
}

const BasicTaskTypeSummaryTableRow = ({taskType, location}: {
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

export const BasicTaskTypeSummaryTable = ({taskTypes}: { taskTypes: TaskType[] }) => {
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
          return <BasicTaskTypeSummaryTableRow key={taskType.id} taskType={taskType} location={location}/>
        })}
      </TableBody>
    </Table>
  )
}

const columnHelper = createColumnHelper<TaskType>()

const columns = [
  columnHelper.accessor('name', {
    header: "Name",
    cell: info => info.getValue()
  }),
  columnHelper.accessor('frequency', {
    header: "Repeats every...",
    cell: info => {
      const duration = Duration.fromISO(info.getValue())
      if (duration.isValid) {
        return (<span>{duration.toHuman({showZeros: false})}</span>)
      } else {
        return <span className="text-sm text-red-500"> No frequency set!</span>
      }
    }
  }),
  columnHelper.display(
    {
      id: "details-link",
      cell: info => {
        return <a href={`/task-types/${info.row.original.id}`} className="w-2">
          <ChevronRightIcon/>
        </a>
      }
    })
]

const coreRowModel = getCoreRowModel()

export const TaskTypeSummaryDataTable = ({taskTypes}: { taskTypes: TaskType[] }) => {
  const table = useReactTable({
    data: taskTypes,
    columns,
    getCoreRowModel: coreRowModel,
  })
  return (
    <Card className="flex justify-center px-2 py-1">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id} className="border-0 ">
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
