import {useLoaderData} from "react-router";
import {PageHeader, TaskTypeSummaryTable} from "@/task-types/summary/components"
import * as React from "react";

export const Page = () => {
  const {data} = useLoaderData();
  return (
    <div>
      <PageHeader/>
      <TaskTypeSummaryTable taskTypes={data}/>
    </div>
  )
}
