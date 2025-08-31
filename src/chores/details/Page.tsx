import type {Chore} from "@/chores/service";
import {useLoaderData} from "react-router";
import {GenericChoreDetailCard as ChoreDetailsCard, ChoreDetailsHeader} from "@/chores/components";
import * as React from "react";

const Page = () => {
  const {data}: { data: Chore } = useLoaderData();
  return (
    <div className="flex flex-col w-full items-center justify-center gap-4 p-4">
      <ChoreDetailsHeader/>
      <ChoreDetailsCard chore={data}/>
    </div>
  )
}

export {Page}