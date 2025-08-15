import type {Chore} from "@/chores/service";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";

const ChoreDetailsCard = ({chore}: { chore: Chore }) => {
  return (
    <Card key={chore.id}>
      <CardHeader>
        <CardTitle>Chore Summary</CardTitle>
        {/*<CardAction>Card Action</CardAction>*/}
      </CardHeader>
      <CardContent>
        <CardTitle>#{chore.id} {chore.name}</CardTitle>
        <CardDescription>
          {chore.description}<br/><br/>
          Number of tasks: {chore.tasks.length}<br/>
          Number of TasksTypes: {chore.taskTypes.length}<br/>
          {/*Tags: {JSON.stringify(chore.tags)}*/}
        </CardDescription>
      </CardContent>
      {/*<CardFooter>*/}
      {/*  <p>Card Footer</p>*/}
      {/*</CardFooter>*/}
    </Card>
  )
}
export {ChoreDetailsCard};