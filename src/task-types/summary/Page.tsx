import {useLoaderData} from "react-router";
import {
  PageHeader,
  BasicTaskTypeSummaryTable,
  TaskTypeSummaryDataTable,
  TaskTypeSummaryCardList
} from "@/task-types/summary/components"
import * as React from "react";
import {Card} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {PlusIcon} from "lucide-react";
import type {TaskType} from "@/task-types/service.ts";

export const Page = () => {
  const {data} = useLoaderData();
  return (
    <div className="flex flex-col w-full items-center justify-center gap-4 p-4">
      {/*<PageHeader/>*/}
      <div className="flex flex-row justify-center w-full">
        <Button variant="outline" size="sm" asChild className="items-center justify-end">
          <a href="/task-types/new">
            <span><PlusIcon/></span>New Task Type
          </a>
        </Button>
      </div>
      {/*<TaskTypeSummaryDataTable taskTypes={data}/>*/}
      <TaskTypeSummaryCardList
        taskTypes={data.filter((taskType: TaskType) => taskType.frequency)}></TaskTypeSummaryCardList>
    </div>
  )
}
