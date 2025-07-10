import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import { ChoreSummaryCard } from "~/components/ui/chore-card";
import { type Chore, data } from "~/lib/chores";

export default ()=>  {
  return data.map((chore) => <ChoreSummaryCard chore={chore}></ChoreSummaryCard>)
}