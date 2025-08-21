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
import type {Chore} from "@/chores/service";
import {Duration} from "luxon";

type ChoreCreateCardProps = {
  error?: string;
  loading: boolean;
  fetcher: ReturnType<typeof useFetcher>;
  // boopSizes: BoopSize[];
}

export const CreateChoreCard = ({fetcher, loading, error}: ChoreCreateCardProps) => {
  return (
    <div className="flex flex-col gap-y-2 md:gap-y-4 items-center">
      <Card className="w-full max-w-sm">
        <fetcher.Form method="post" className="flex flex-col gap-4">
          <CardHeader>
            <CardTitle>Create a new chore</CardTitle>
            <CardDescription>
              You can add task types to this chore later.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="chore-name">Name</Label>
                <Input
                  id="chore-name"
                  name="chore-name"
                  type="text"
                  placeholder="e.g. Outdoor Plants"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="chore-description">Description</Label>
                <Input
                  id="chore-description"
                  name="chore-description"
                  type="text"
                />
              </div>
              <div className="grid gap-2">
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
