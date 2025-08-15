import {type useFetcher} from "react-router";
import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent
} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {BoopSizeSelectorRadio as BoopSizeSelector} from "@/boop-sizes/summary/components"
import type {BoopSize} from "@/boop-sizes/service.ts";
import {useState} from "react";
import type {TaskType} from "@/task-types/service.ts";
import * as React from "react";
import {FrequencySelector} from "@/task-types/create/components.tsx";

type TaskTypeCreateCardProps = {
  taskType: TaskType;
  error?: string;
  loading: boolean;
  fetcher: ReturnType<typeof useFetcher>;
  boopSizes: BoopSize[];
}

export const EditTaskTypeCard = ({taskType, boopSizes, fetcher, loading, error}: TaskTypeCreateCardProps) => {
  if (boopSizes.length === 0) {
    throw new Error("No boop sizes found.");
  }
  const [boopSizeId, setBoopSizeId] = useState(taskType.boopSize.id.toString());
  return (
    <div className="flex flex-col gap-y-2 md:gap-y-4 items-center">
      <Card className="w-full max-w-sm">
        <fetcher.Form method="post" className="flex flex-col gap-4">
          <CardHeader>
            <CardTitle>Edit task type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="task-type-id">ID</Label>
                <Input
                  id="task-type-id"
                  name="task-type-id"
                  type="text"
                  value={taskType.id.toString()}
                  readOnly={true}
                  className="read-only:bg-gray-100"
                />
              </div>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="task-type-name">Name</Label>
                  <Input
                    id="task-type-name"
                    name="task-type-name"
                    type="text"
                    defaultValue={taskType.name}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="boop-size-id">Task Type Size</Label>
                  <BoopSizeSelector boopSizes={boopSizes} setBoopSizeId={setBoopSizeId} boopSizeId={boopSizeId}/>
                  <Input type="hidden" name="boop-size-id" defaultValue={boopSizeId}/>
                </div>
                <div className="grid gap-2">
                  <FrequencySelector taskType={taskType}/>
                </div>
                {/*TODO: Change this to a different type of input, e.g. drop-down or something else.*/}
                {/*<div className="grid gap-2">*/}
                {/*  <Label htmlFor="tag-ids">Tags</Label>*/}
                {/*  <Input*/}
                {/*    id="tag-ids"*/}
                {/*    type="text"*/}
                {/*    name="tag-ids"*/}
                {/*    defaultValue={taskType.tags.map((tag) => {*/}
                {/*      return tag.name*/}
                {/*    }).join(",")}*/}
                {/*  />*/}
                {/*  {error && <p className="text-sm text-red-500">{error}</p>}*/}
                {/*</div>*/}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" variant="outline" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </fetcher.Form>
      </Card>
    </div>
  );
}
