import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {type Chore} from "@/lib/chores";

const ChoreSummaryCard = ({chore}: { chore: Chore }) => {
  const openTasks = chore.tasks.filter((t) => t.completedBy === null)
  const completeTasks = chore.tasks.filter((t) => t.completedBy !== null)
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
          Open: {openTasks.length}<br/>
          Complete: {completeTasks.length}<br/>
          Number of TasksTypes: {chore.taskTypes.length}
        </CardDescription>
      </CardContent>
      {/*<CardFooter>*/}
      {/*  <p>Card Footer</p>*/}
      {/*</CardFooter>*/}
    </Card>
  )
}

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
          Number of TasksTypes: {chore.taskTypes.length}
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