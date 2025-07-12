import {ChoreDetailsCard} from "@/components/ui/chore-card";
import {useLoaderData} from "react-router";
import {type Chore} from "@/lib/chores.ts"

export default () => {
  const {data}: { data: Chore } = useLoaderData();
  return <ChoreDetailsCard chore={data}></ChoreDetailsCard>
}