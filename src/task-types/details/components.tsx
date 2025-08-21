import {type TaskType} from "@/task-types/service";
import {
  Card, CardContent, CardDescription,
  CardFooter, CardAction,
  CardHeader, CardTitle
} from "@/components/ui/card";
import {Button} from "@/components/ui/button.tsx";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Car, PencilIcon, Repeat2Icon} from "lucide-react";
import * as React from "react";
import {useLocation} from "react-router";
import {Duration} from "luxon";
import {formatFrequency} from "@/task-types/components";
import {EditTaskTypeCard} from "@/task-types/edit/components.tsx";

export const TaskTypeDetailsCard = ({taskType}: { taskType: TaskType }) => {
  return (
    <Card key={taskType.id}>
      <CardHeader>
        <CardAction className="justify-items-end">
          <Repeat2Icon/>
          <div>{formatFrequency(taskType.frequency)}</div>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <CardTitle>{taskType.name}</CardTitle>
        <CardDescription>
          {/*<p>ID: {taskType.id}</p>*/}
          <p>Task Size: {taskType.boopSize.name}</p>
          <h3 className="text-lg">Add 'add to chore' button.<br/> Add 'used in chores...' section</h3>
        </CardDescription>
      </CardContent>
      <CardFooter>
        {/*<EditButton/>*/}
        <EditDialog taskType={taskType}/>
      </CardFooter>
    </Card>
  )
}

// TODO: Move this to general place
export const EditButton = () => {
  const location = useLocation()
  return (
    <a href={`${location.pathname}/edit`}>
      <Button variant="outline" size="sm" className="">
        <PencilIcon/>Edit
      </Button>
    </a>
  )
}

const EditDialog = ({taskType}: { taskType: TaskType }) => {
  return (
    <Dialog defaultOpen={false}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="">
          <PencilIcon/>Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white">
        Some content
        <Card>
          <CardContent>
            Some other content
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
export const PageHeader = () => {
  // const location = useLocation()
  return null
  // (
  //   <div className="p-4">
  //     <EditButton/>
  //   </div>
  // )
}
