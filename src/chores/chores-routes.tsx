import {ChoreDetailsCard, ChoreSummaryCard} from "@/components/ui/chore-card";
import {type Chore, getAllChores, getChore} from "@/chores/chores.service";
import {useLoaderData} from "react-router";
import {type LoaderFunctionArgs} from "react-router-dom";

// export {
//   SummaryRoute,
//   summaryLoader,
//   DetailsRoute,
//   detailsLoader,
// }
const SummaryRoute = () => {
  const {data} = useLoaderData();
  return data.map((chore: Chore) => <ChoreSummaryCard chore={chore}></ChoreSummaryCard>)
}

const summaryLoader = async () => {
  return {data: await getAllChores()};
}

const DetailsRoute = () => {
  const {data}: { data: Chore } = useLoaderData();
  return <ChoreDetailsCard chore={data}></ChoreDetailsCard>
}

const detailsLoader = async ({params}: LoaderFunctionArgs) => {
  return {data: await getChore(Number(params.choreId))}
}

const route = {
  path: "/chores",
  children: [
    {
      Component: SummaryRoute,
      index: true,
      loader: summaryLoader,
    },
    {
      path: ":choreId",
      Component: DetailsRoute,
      loader: detailsLoader,
    },
  ],
}

export default route;