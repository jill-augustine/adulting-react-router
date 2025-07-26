import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {type Tag} from "@/tags/service.ts";

const TagCard = ({tag}: { tag: Tag }) => {
  return (
    <Card key={tag.id}>
      <CardHeader>
        <CardTitle>{tag.name}</CardTitle>
        <CardDescription>Tag</CardDescription>
        {/*<CardAction>Card Action</CardAction>*/}
      </CardHeader>
      {/*<CardContent>*/}
      {/*  <p>Size: {tag.name} ({tag.value})</p>*/}
      {/*</CardContent>*/}
      {/*<CardFooter>*/}
      {/*  <p>Card Footer</p>*/}
      {/*</CardFooter>*/}
    </Card>
  )
}
export {TagCard}