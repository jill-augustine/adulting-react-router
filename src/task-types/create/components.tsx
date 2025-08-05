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

type TaskTypeCreateCardProps = {
  error?: string;
  loading: boolean;
  fetcher: ReturnType<typeof useFetcher>;
  boopSizes: BoopSize[];
}

export const TaskTypeCreateCard = ({boopSizes, fetcher, loading, error}: TaskTypeCreateCardProps) => {
  if (boopSizes.length === 0) {
    throw new Error("No boop sizes found.");
  }
  const [boopSizeName, setBoopSizeName] = useState(boopSizes[0].name);
  return (
    <div className="flex flex-col gap-y-2 md:gap-y-4 items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create a new task type</CardTitle>
          <CardDescription>
            You can add this task type to chores later.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <fetcher.Form method="post">
            {/*<div className="grid gap-2">*/}
            {/*  <Input id="is-test-user" type="hidden" name="is-test-user"/>*/}
            {/*</div>*/}
            {/*<div className="flex flex-col gap-6">*/}
            {/*  <Button type="submit" className="w-full" disabled={loading}>*/}
            {/*    {loading ? 'Logging in as test user...' : 'Login as Test User'}*/}
            {/*  </Button>*/}
            {/*</div>*/}
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
                <Label htmlFor="boop-size-name">Task Type Size</Label>
                {/*Pass "boop-size" and "set-boop-size" as props?*/}
                <BoopSizeSelector boopSizes={boopSizes} boopSizeName={boopSizeName}
                                  setBoopSizeName={setBoopSizeName}></BoopSizeSelector>
                <Input type="hidden" name="boop-size-name" value={boopSizeName}></Input>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tag-names">Tags</Label>
                <Input
                  id="tag-names"
                  type="text"
                  name="tag-names"
                  placeholder="TODO: Make into multi-select with search?"
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
              <Button type="submit" className="w-full" variant="outline" disabled={loading}>
                {loading ? "Creating..." : "Create"}
              </Button>
            </div>
          </fetcher.Form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" variant="outline">
            Submit
          </Button>
        </CardFooter>
      </Card>
      <h1 className="text-3xl">Add a "add to chore" button on the task type details page</h1>
    </div>
  );
}
