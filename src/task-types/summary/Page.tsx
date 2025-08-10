import {useLoaderData} from "react-router";
import {type TaskType} from "../service";
import {PageHeader, TaskTypeSummaryCard} from "@/task-types/summary/components"
import * as React from "react";

export const Page = () => {
  const {data} = useLoaderData();
  return (
    <div>
      <PageHeader/>
      <div className="flex flex-col gap-4">
        {data.map((taskType: TaskType) => <TaskTypeSummaryCard taskType={taskType}/>)}
      </div>
    </div>
  )
}
