import {type BoopSize, getAllBoopSizes} from "~/lib/boop-sizes";
import {BoopSizeCard} from "~/components/ui/boopsize-card";

export default async () => {
  const data = await getAllBoopSizes()
  return data.map((boopSize: BoopSize) => <BoopSizeCard key={boopSize.id} boopSize={boopSize}></BoopSizeCard>)
}