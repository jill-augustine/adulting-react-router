import type {TaskType} from "@/task-types/service";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button.tsx";
import {PlusIcon} from "lucide-react";
import * as React from "react";
import {useLocation} from "react-router";

export const TaskTypeSummaryCard = ({taskType}: { taskType: TaskType }) => {
  const location = useLocation();
  return (
    <a href={`${location.pathname}/${taskType.id}`}>
      <Card key={taskType.id}>
        <CardHeader>
          <CardTitle>TaskType Summary</CardTitle>
          {/*<CardAction>Card Action</CardAction>*/}
        </CardHeader>
        <CardContent>
          <CardTitle>#{taskType.id} {taskType.name}</CardTitle>
          <CardDescription>
            Size: {JSON.stringify(taskType.boopSize)}<br/><br/>
          </CardDescription>
        </CardContent>
        {/*<CardFooter>*/}
        {/*  <p>Card Footer</p>*/}
        {/*</CardFooter>*/}
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
            <PlusIcon/>Create Task Type
          </Button>
        </a>
      </div>
    </div>
  )
}