import {useLoaderData} from "react-router";
import {ChoreSummaryCardList} from "@/chores/summary/components.tsx";
import {Button} from "@/components/ui/button.tsx";
import {PlusIcon} from "lucide-react";
import * as React from "react";

const Page = () => {
  const {data} = useLoaderData();
  return (
    <div className="flex flex-col w-full items-center justify-center gap-4 p-4">
      <div className="flex flex-row justify-center w-full">
        <Button variant="outline" size="sm" asChild className="items-center justify-end">
          <a href="/chores/new">
            <span><PlusIcon/></span>New Chore
          </a>
        </Button>
      </div>
      <ChoreSummaryCardList chores={data}/>
    </div>
  )
}

export {Page}