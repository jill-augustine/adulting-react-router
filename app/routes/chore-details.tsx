import { ChoreDetailsCard, ChoreSummaryCard } from "~/components/ui/chore-card";
import {type Chore, data } from "~/lib/chores";
import type { Route } from "./+types/chore-details";

export default ({ params }: Route.LoaderArgs)=> {
  const choresFound = data.filter((chore: Chore) => chore.id.toString() === params.choreId);
  if (!choresFound || choresFound.length != 1) {
    const msg = `Number of chores found: ${choresFound.length}`
    console.error(msg);
    throw new Error(msg);
  }
  return <ChoreDetailsCard chore={choresFound[0]}></ChoreDetailsCard>
}