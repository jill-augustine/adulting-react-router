import {useLoaderData} from "react-router";
import {type TaskType} from "../service";
import {PageHeader, TaskTypeSummaryCard} from "@/task-types/summary/components"
import * as React from "react";

export const Page = () => {
  const {data} = useLoaderData();
  return (
    <div>
      <PageHeader/>
      {data.map((taskType: TaskType) => <TaskTypeSummaryCard taskType={taskType}/>)}
    </div>
  )
}
