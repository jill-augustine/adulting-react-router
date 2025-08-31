import type {Chore} from "@/chores/service.ts";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import * as React from "react";
import {type useFetcher, useLocation} from "react-router";
import {type TaskTypeFormRow, EditableTableWithAddFooter, NonEditableTable} from "@/task-types/components.tsx";
import {useState} from "react";
import {CheckSquareIcon, ChevronLeftIcon, PencilIcon, SquareIcon} from "lucide-react";
import {Duration} from "luxon";

export const EditButton = () => {
  const location = useLocation()
  return (
    <a href={`${location.pathname.replace(/\/$/, "")}/edit`}>
      <Button variant="outline" size="sm" className="">
        <PencilIcon/>Edit
      </Button>
    </a>
  )
}

type GenericChoreCardProps = {
  fetcher: ReturnType<typeof useFetcher>;
  loading: boolean;
  error?: string;
  chore?: Chore;
}
const GenericChoreInputCard = ({fetcher, loading, chore, error}: GenericChoreCardProps) => {
  const location = useLocation();
  const [taskTypeFormData, setTaskTypeFormData] = useState<TaskTypeFormRow[]>(chore?.taskTypes ?
    chore.taskTypes.map((taskType) => (
      {
        name: taskType.name,
        frequency: Duration.fromISO(taskType.frequency).days.toString()
      })) :
    []);
  return (
    <div className="flex flex-col gap-y-2 md:gap-y-4 items-center">
      <Card className="w-full min-w-sm max-w-sm">
        <fetcher.Form method="post" className="flex flex-col gap-4">
          <CardHeader>
            <CardTitle>{chore ? "Edit chore details" : "Create a new chore"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 md:gap-6">
              <div className="grid gap-1 md:gap-2">
                <Label htmlFor="chore-name">Name</Label>
                {chore ?
                  <Input id="chore-name" name="chore-name" type="text" defaultValue={chore.name}/> :
                  <Input id="chore-name" name="chore-name" type="text" placeholder="e.g. take out trash" required/>}
              </div>
              <div className="grid gap-1 md:gap-2">
                <Label htmlFor="chore-description">Description</Label>
                <Input id="chore-description" name="chore-description" type="text"
                       defaultValue={chore?.description ?? ""}/>
              </div>
              <CardTitle className="grid gap-1 md:gap-2">Task Types</CardTitle>
              <EditableTableWithAddFooter taskTypeFormData={taskTypeFormData}
                                          setTaskTypeFormData={setTaskTypeFormData} footerType="button"/>
              <Input type="hidden" name="task-types" value={JSON.stringify(taskTypeFormData)}/>
              {error ? <p className="text-sm text-red-500">{error}</p> : null}
            </div>
          </CardContent>
          <CardFooter className="flex flex-row gap-1 md:gap-2 justify-between">
            {
              chore ?
                <Button variant="outline" asChild className="w-1/3 bg-gray-200">
                  <a href={location.pathname.replace(/\/edit$/, "")}>
                    Cancel
                  </a>
                </Button> : <Button/>
            }
            {
              chore ?
                <Button type="submit" className="w-1/3" variant="outline" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </Button> :
                <Button type="submit" className="w-1/3" variant="outline" disabled={loading}>
                  {loading ? "Creating..." : "Create"}
                </Button>}
          </CardFooter>
        </fetcher.Form>
      </Card>
    </div>
  )
}

export const CreateChoreCard = ({fetcher, loading, error}: GenericChoreCardProps) => {
  return <GenericChoreInputCard fetcher={fetcher} loading={loading} error={error}/>
}

export const EditChoreCard = ({chore, fetcher, loading, error}: GenericChoreCardProps) => {
  return <GenericChoreInputCard chore={chore} fetcher={fetcher} loading={loading} error={error}/>
}

export const GenericChoreDetailCard = ({chore}: { chore: Chore }) => {
  const openTasks = chore?.tasks ? chore.tasks.filter((t) => t.completedBy === null) : []
  const completeTasks = chore?.tasks ? chore.tasks.filter((t) => t.completedBy !== null) : []
  const taskTypeData = chore?.taskTypes ? chore.taskTypes.map((taskType) => (
    {
      name: taskType.name,
      frequency: taskType.frequency,
    })) : null

  return (
    <div className="flex flex-col gap-y-2 md:gap-y-4 items-center">
      <Card key={chore.id} className="w-full min-w-sm max-w-sm">
        <CardHeader>
          <CardAction className="grid grid-cols-2 gap-x-1 gap-y-0.5">
            <SquareIcon/>{`${openTasks.length}`}
            <CheckSquareIcon/> {`${completeTasks.length - openTasks.length}`}
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 md:gap-6">
            <CardTitle>{chore.name}</CardTitle>
            <CardDescription className="flex flex-col gap-3">
              <div>{chore.description}</div>
              <CardTitle>{(taskTypeData && taskTypeData.length > 0) ? "Task Types" : "No Task Types"}</CardTitle>
              {(taskTypeData && taskTypeData.length > 0) ? <NonEditableTable taskTypeData={taskTypeData}/> : null}
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row gap-1 md:gap-2 justify-end-safe">
          <EditButton/>
        </CardFooter>
      </Card>
    </div>
  )
}

export const ChoreDetailsHeader = () => {
  return (
    <div className="flex flex-row justify-start w-full">
      <Button variant="outline" size="sm" asChild className="items-center justify-end">
        <a href="/chores">
          <span><ChevronLeftIcon/></span>Back to all Chores
        </a>
      </Button>
    </div>
  )
}