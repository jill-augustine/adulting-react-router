import type {Chore} from "@/chores/service";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card.tsx";
import {EditButton} from "@/task-types/details/components";
import {CheckSquareIcon, PlusIcon, SeparatorHorizontalIcon, SquareIcon} from "lucide-react";
import * as React from "react";
import {Separator} from "@/components/ui/separator.tsx";
import {TaskTypeSummaryCardList} from "@/task-types/summary/components.tsx";
import {Button} from "@/components/ui/button.tsx";

const ChoreDetailsCard = ({chore}: { chore: Chore }) => {
  const openTasks = chore.tasks.filter((t) => t.completedBy === null)
  const completeTasks = chore.tasks.filter((t) => t.completedBy !== null)
  return (
    <Card key={chore.id} className="w-full">
      <CardHeader>
        <CardAction className="grid grid-cols-2 gap-x-1 gap-y-0.5">
          <SquareIcon/>{`${openTasks.length}`}
          <CheckSquareIcon/> {`${completeTasks.length - openTasks.length}`}
        </CardAction>
      </CardHeader>
      <CardContent className="gap-2">
        <CardTitle>{chore.name}</CardTitle>
        <CardDescription className="flex flex-col gap-3">
          <div>{chore.description}</div>
          <EditButton/>
          <Separator className="bg-cyan-600 my-3"/>
          {/*Default gap and padding of Card is 6*/}
          <CardTitle>Task Types</CardTitle>
          <TaskTypeSummaryCardList taskTypes={chore.taskTypes}/>
          <Button variant="outline" size="sm" className="w-min">
            <PlusIcon/>Add
          </Button>
          <Separator className="bg-cyan-600 my-3"/>
          <CardTitle>Open Tasks</CardTitle>
          Some content
        </CardDescription>
      </CardContent>
      <CardFooter>
        <EditButton/>
      </CardFooter>
    </Card>
  )
  // return (
  //   <Card key={chore.id}>
  //     <CardHeader>
  //       <CardTitle>Chore Summary</CardTitle>
  //       {/*<CardAction>Card Action</CardAction>*/}
  //     </CardHeader>
  //     <CardContent>
  //       <CardTitle>#{chore.id} {chore.name}</CardTitle>
  //       <CardDescription>
  //         {chore.description}<br/><br/>
  //         Number of tasks: {chore.tasks.length}<br/>
  //         Number of TasksTypes: {chore.taskTypes.length}<br/>
  //         {/*Tags: {JSON.stringify(chore.tags)}*/}
  //       </CardDescription>
  //     </CardContent>
  //     {/*<CardFooter>*/}
  //     {/*  <p>Card Footer</p>*/}
  //     {/*</CardFooter>*/}
  //   </Card>
  // )
}
export {ChoreDetailsCard};