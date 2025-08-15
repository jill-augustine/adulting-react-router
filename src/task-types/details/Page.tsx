import {useLoaderData} from "react-router";
import {type TaskType} from "@/task-types/service";
import {PageHeader, TaskTypeDetailsCard} from "@/task-types/details/components"
import {Button} from "@/components/ui/button.tsx";
import {ChevronLeftIcon, PlusIcon} from "lucide-react";
import * as React from "react";

export const Page = () => {
  const {data}: { data: TaskType } = useLoaderData();
  return (
    <div className="flex flex-col w-full items-center justify-center gap-4 p-4">
      <div className="flex flex-row justify-start w-full">
        <Button variant="outline" size="sm" asChild className="items-center justify-end">
          <a href="/task-types">
            <span><ChevronLeftIcon/></span> Back
          </a>
        </Button>
      </div>
      <TaskTypeDetailsCard taskType={data}/>
    </div>
  )
}
