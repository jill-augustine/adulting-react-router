import {type useFetcher} from "react-router";
import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardDescription,
  CardContent
} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {BoopSizeSelectorRadio as BoopSizeSelector} from "@/boop-sizes/summary/components"
import type {BoopSize} from "@/boop-sizes/service.ts";
import {useState} from "react";
import * as React from "react";
import type {TaskType} from "@/task-types/service.ts";
import {Duration} from "luxon";

type TaskTypeCreateCardProps = {
  error?: string;
  loading: boolean;
  fetcher: ReturnType<typeof useFetcher>;
  boopSizes: BoopSize[];
}

export const CreateTaskTypeCard = ({boopSizes, fetcher, loading, error}: TaskTypeCreateCardProps) => {
  if (boopSizes.length === 0) {
    throw new Error("No boop sizes found.");
  }
  const [boopSizeId, setBoopSizeId] = useState(boopSizes[0].id.toString());
  return (
    <div className="flex flex-col gap-y-2 md:gap-y-4 items-center">
      <Card className="w-full max-w-sm">
        <fetcher.Form method="post" className="flex flex-col gap-4">
          <CardHeader>
            <CardTitle>Create a new task type</CardTitle>
            <CardDescription>
              You can add this task type to chores later.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="task-type-name">Name</Label>
                <Input
                  id="task-type-name"
                  name="task-type-name"
                  type="text"
                  placeholder="e.g. take out trash"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="boop-size-id">Task Type Size</Label>
                <BoopSizeSelector boopSizes={boopSizes} setBoopSizeId={setBoopSizeId} boopSizeId={boopSizeId}/>
                <Input type="hidden" name="boop-size-id" value={boopSizeId}/>
              </div>
              <div className="grid gap-2">
                <FrequencySelector/>
              </div>
              <div className="grid gap-2">
                {/*  <Label htmlFor="tag-ids">Tags</Label>*/}
                {/*  <Input*/}
                {/*    id="tag-ids"*/}
                {/*    type="text"*/}
                {/*    name="tag-ids"*/}
                {/*    placeholder="TODO: Make into multi-select with search?"*/}
                {/*  />*/}
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" variant="outline" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </CardFooter>
        </fetcher.Form>
      </Card>
      <h1 className="text-3xl">Add a "add to chore" button on the task type details page</h1>
    </div>
  );
}

export const FrequencySelector = ({taskType}: { taskType?: TaskType }) => {
  const frequency = taskType?.frequency ? Duration.fromISO(taskType.frequency) : undefined
  if (frequency && !frequency.isValid) {
    throw new Error(`Invalid frequency (${taskType?.frequency}) for task type ${taskType?.name}`);
  }
  return (
    <>
      <Label htmlFor="frequency-selector">Repeats every...</Label>
      <div className="flex flex-row gap-4" id="frequency-selector">
        <div className="grid gap-2 w-12">
          <Input type="number" min="0" defaultValue={frequency?.months || 0} id="frequency-months"
                 name="frequency-months" required/>
          <Label htmlFor="frequency-months" className="font-normal">Months</Label></div>
        <div className="grid gap-2 w-12">
          <Input type="number" min="0" defaultValue={frequency?.weeks || 0} id="frequency-weeks" name="frequency-weeks"
                 required/>
          <Label htmlFor="frequency-days" className="font-normal">Weeks</Label>
        </div>
        <div className="grid gap-2 w-12">
          <Input type="number" min="0" defaultValue={frequency?.days || 0} id="frequency-days" name="frequency-days"
                 required/>
          <Label htmlFor="frequency-days" className="font-normal">Days</Label>
        </div>
      </div>
    </>
  )
}
