import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card.tsx";
import {type BoopSize} from "@/boop-sizes/service";

const Components = ({boopSize}: { boopSize: BoopSize }) => {
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
export {Components}