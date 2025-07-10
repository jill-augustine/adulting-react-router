import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";
import { type Chore, getTaskTypesForChore}from "~/lib/chores";

const ChoreSummaryCard = ({chore}: {chore: Chore}) => {
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
          {chore.tasks.length} Open Tasks {chore.tasks.length} Completed Tasks <br/>
          2/20 tasks open<br/>
          TasksTypes: {getTaskTypesForChore(chore).size}
        </CardDescription>
      </CardContent>
      {/*<CardFooter>*/}
      {/*  <p>Card Footer</p>*/}
      {/*</CardFooter>*/}
    </Card>
  )
}

const ChoreDetailsCard = ({chore}: {chore: Chore}) => {
  return (
    <Card key={chore.id}>
      <CardHeader>
        <CardTitle>Chore Details</CardTitle>
        {/*<CardAction>Card Action</CardAction>*/}
      </CardHeader>
      <CardContent>
        <CardTitle>{chore.name}</CardTitle>
        <CardDescription>{chore.description}<br/><br/>
          Number of Tasks: {chore.tasks.length}<br/>
          Number of TasksTypes: {getTaskTypesForChore(chore).size}<br/>
          Rest: {JSON.stringify(chore,null, 2)}
        </CardDescription>
      </CardContent>
      {/*<CardFooter>*/}
      {/*  <p>Card Footer</p>*/}
      {/*</CardFooter>*/}
    </Card>
  )
}

export {
  ChoreDetailsCard,
  ChoreSummaryCard,
}