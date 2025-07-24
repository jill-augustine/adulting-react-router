import {type BoopSize, getAllBoopSizes} from "@/boop-sizes/boop-sizes.service";
import {BoopSizeCard} from "@/components/ui/boopsize-card";
import {useLoaderData} from "react-router";

// export {
//   SummaryRoute,
//   summaryLoader,
// }

const SummaryRoute = () => {
  const {data} = useLoaderData();
  return data.map((boopSize: BoopSize) => <BoopSizeCard key={boopSize.id} boopSize={boopSize}></BoopSizeCard>)
}

const summaryLoader = async () => {
  return {data: await getAllBoopSizes()};
}

const route = {
  path: "boop-sizes",
  children: [
    {
      index: true,
      Component: SummaryRoute,
      loader: summaryLoader,
    }
  ],
}

export default route;
