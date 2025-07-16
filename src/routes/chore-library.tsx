import {ChoreSummaryCard} from "@/components/ui/chore-card";
import {type Chore} from "@/lib/chores";
import {useLoaderData} from "react-router";

export default () => {
  const {data} = useLoaderData();
  return data.map((chore: Chore) => <ChoreSummaryCard chore={chore}></ChoreSummaryCard>)
}