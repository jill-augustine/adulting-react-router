import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import { type Chore, data } from "~/lib/chores";
import type { Route } from "./+types/chore-details";

export default ({ params }: Route.LoaderArgs)=> {
  const choresFound = data.filter((chore: Chore) => chore.id.toString() === params.choreId);
  if (!choresFound || choresFound.length != 1) {
    const msg = `Number of chores found: ${choresFound.length}`
    console.error(msg);
    throw new Error(msg);
  }
  const createChoreCard = (chore: Chore) => {
    return (
      <Card key={chore.id}>
        <CardHeader>
          <CardTitle>{chore.name}</CardTitle>
          <CardDescription>Chore</CardDescription>
          {/*<CardAction>Card Action</CardAction>*/}
        </CardHeader>
        {/*<CardContent>*/}
        {/*  <p>Size: {chore.name} ({chore.value})</p>*/}
        {/*</CardContent>*/}
        {/*<CardFooter>*/}
        {/*  <p>Card Footer</p>*/}
        {/*</CardFooter>*/}
      </Card>
    )
  }
  return createChoreCard(choresFound[0])
}