import {type BoopSize} from "@/lib/boop-sizes";
import {BoopSizeCard} from "@/components/ui/boopsize-card";
import {useLoaderData} from "react-router";

export default async () => {
  const {data} = await useLoaderData();
  return data.map((boopSize: BoopSize) => <BoopSizeCard key={boopSize.id} boopSize={boopSize}></BoopSizeCard>)
}