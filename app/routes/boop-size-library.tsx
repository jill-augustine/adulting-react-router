import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import { type BoopSize, data } from "~/lib/boop-sizes";
import {BoopSizeCard} from "~/components/ui/boopsize-card";

export default  () => {
  return data.map((boopSize: BoopSize) => <BoopSizeCard boopSize={boopSize}></BoopSizeCard>)
}