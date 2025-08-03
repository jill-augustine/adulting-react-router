// export {
//   SummaryRoute,
//   summaryLoader,
//   DetailsRoute,
//   detailsLoader,
// }
import {useLoaderData} from "react-router";
import type {Chore} from "@/chores/service";
import {ChoreSummaryCard} from "@/chores/summary/components.tsx";

const Page = () => {
  const {data} = useLoaderData();
  return data.map((chore: Chore) => <ChoreSummaryCard chore={chore}/>)
}

export {Page}