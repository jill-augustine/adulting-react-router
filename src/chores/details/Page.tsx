import type {Chore} from "@/chores/service";
import {useLoaderData} from "react-router";
import {ChoreDetailsCard} from "@/chores/details/components.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChevronLeftIcon} from "lucide-react";
import * as React from "react";

const Page = () => {
  const {data}: { data: Chore } = useLoaderData();
  return (
    <div className="flex flex-col w-full items-center justify-center gap-4 p-4">
      <div className="flex flex-row justify-start w-full">
        <Button variant="outline" size="sm" asChild className="items-center justify-end">
          <a href="/chores">
            <span><ChevronLeftIcon/></span>Back
          </a>
        </Button>
      </div>
      <ChoreDetailsCard chore={data}/>
    </div>
  )
}

export {Page}