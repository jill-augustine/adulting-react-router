import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import { type Chore, data } from "~/lib/chores";

export default ()=>  {
  const createChoreCard = (chore: Chore) => {
    return (
      <Card key={chore.id}>
        <CardHeader>
          <CardTitle>{chore.id} - {chore.name}</CardTitle>
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
  return data.map(createChoreCard)
}