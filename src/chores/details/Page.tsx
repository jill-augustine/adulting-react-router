import type {Chore} from "@/chores/service";
import {useLoaderData} from "react-router";
import {ChoreDetailsCard} from "@/chores/details/components.tsx";

const Page = () => {
  const {data}: { data: Chore } = useLoaderData();
  return <ChoreDetailsCard chore={data}/>
}

export {Page}