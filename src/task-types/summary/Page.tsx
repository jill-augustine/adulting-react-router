import {useLoaderData} from "react-router";
import {type TaskType} from "../service";
import {TaskTypeSummaryCard} from "@/task-types/summary/components"
import * as React from "react";
import {Button} from "@/components/ui/button.tsx";
import {Plus as PlusIcon} from "lucide-react";

export const Page = () => {
  const {data} = useLoaderData();
  return (
    <div>
      <PageHeader/>
      {data.map((taskType: TaskType) => <TaskTypeSummaryCard taskType={taskType}/>)}
    </div>
  )
}

const PageHeader = () => {
  return (
    <div className="p-4">
      <div>
        <a href="/task-types/new">
          <Button variant="outline" size="sm" className="">
            <PlusIcon/>Create Task Type
          </Button>
        </a>
      </div>
    </div>
  )
}