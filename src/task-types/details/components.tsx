import {type TaskType} from "@/task-types/service";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button.tsx";
import {PencilIcon} from "lucide-react";
import * as React from "react";
import {useLocation} from "react-router";

export const TaskTypeDetailsCard = ({taskType}: { taskType: TaskType }) => {
  return (
    <Card key={taskType.id}>
      <CardHeader>
        <CardTitle>TaskType Details</CardTitle>
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
  )
}

export const PageHeader = () => {
  const location = useLocation()
  return (
    <div className="p-4">
      <div>
        <a href={`${location.pathname}/edit`}>
          <Button variant="outline" size="sm" className="">
            <PencilIcon/>Edit Task Type
          </Button>
        </a>
      </div>
    </div>
  )
}
