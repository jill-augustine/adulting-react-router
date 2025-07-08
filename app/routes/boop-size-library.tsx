import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import { type BoopSize, data } from "~/lib/boop-sizes";

export default  () => {
  const createBoopSizeCard = (boopSize: BoopSize) => {
    return (
      <Card key={boopSize.id}>
        <CardHeader>
          <CardTitle>{boopSize.name}</CardTitle>
          <CardDescription>BoopSize</CardDescription>
          {/*<CardAction>Card Action</CardAction>*/}
        </CardHeader>
        {/*<CardContent>*/}
        {/*  <p>Size: {boopSize.name} ({boopSize.value})</p>*/}
        {/*</CardContent>*/}
        {/*<CardFooter>*/}
        {/*  <p>Card Footer</p>*/}
        {/*</CardFooter>*/}
      </Card>
    )
  }
  return data.map(createBoopSizeCard)
}