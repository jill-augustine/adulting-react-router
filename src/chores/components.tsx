import type {Chore} from "@/chores/service.ts";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {BoopSizeSelectorRadio as BoopSizeSelector} from "@/boop-sizes/summary/components.tsx";
import {Button} from "@/components/ui/button.tsx";
import * as React from "react";
import {FrequencySelector} from "@/task-types/create/components.tsx";
import type {useFetcher} from "react-router";
import {EditableTableWithAddFooter} from "@/task-types/components.tsx";

type GenericChoreCardProps = {
  fetcher: ReturnType<typeof useFetcher>;
  loading: boolean;
  error?: string;
  chore?: Chore;
}
const GenericChoreCard = ({fetcher, loading, chore}: GenericChoreCardProps) => {
  return (
    <div className="flex flex-col gap-y-2 md:gap-y-4 items-center">
      <Card className="w-full max-w-sm">
        <fetcher.Form method="post" className="flex flex-col gap-4">
          <CardHeader>
            <CardTitle>{chore ? "Edit chore details" : "Create a new chore"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="chore-name">Name</Label>
                {chore ?
                  <Input id="chore-name" name="chore-name" type="text" defaultValue={chore.name}/> :
                  <Input id="chore-name" name="chore-name" type="text" placeholder="e.g. take out trash" required/>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="chore-description">Name</Label>
                <Input id="chore-description" name="chore-description" type="text"
                       defaultValue={chore?.description ?? ""}/>
              </div>
              {/*Task types data table below with columns "name and frequency" only*/}
              <EditableTableWithAddFooter taskTypes={chore?.taskTypes || []} choreId={chore?.id}/>
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
  )
}

export const CreateChoreCard = ({fetcher, loading, error}: GenericChoreCardProps) => {
  return <GenericChoreCard fetcher={fetcher} loading={loading} error={error}/>
}

export const EditChoreCard = ({chore, fetcher, loading, error}: GenericChoreCardProps) => {
  return <GenericChoreCard chore={chore} fetcher={fetcher} loading={loading} error={error}/>
}