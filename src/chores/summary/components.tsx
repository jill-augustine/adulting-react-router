import type {Chore} from "@/chores/service";
import {Card, CardAction, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {
  CheckSquareIcon,
  SquareIcon
} from "lucide-react";
import * as React from "react";
import {useLocation} from "react-router";

const ChoreSummaryCard = ({chore, location}: {
  chore: Chore, location: ReturnType<typeof useLocation>
}) => {
  const openTasks = chore?.tasks ? chore.tasks.filter((t) => t.completedBy === null) : []
  const completeTasks = chore?.tasks ? chore.tasks.filter((t) => t.completedBy !== null) : []
  return (
    <a href={`${location.pathname.replace(/\/$/, "")}/${chore.id}`}>
      <Card key={chore.id} className="size-40">
        <CardHeader>
          <CardAction className="grid grid-cols-2 gap-x-1 gap-y-0.5">
            <span className="sr-only">Number of open tasks:</span>
            <SquareIcon aria-hidden="true"/>{`${openTasks.length}`}
            <span className="sr-only">Number of completed tasks:</span>
            <CheckSquareIcon aria-hidden="true"/> {`${completeTasks.length - openTasks.length}`}
          </CardAction>
        </CardHeader>
        <CardContent>
          <CardTitle>{chore.name}</CardTitle>
        </CardContent>
      </Card>
    </a>
  )
}

export const ChoreSummaryCardList = ({chores}: { chores: Chore[] }) => {
  const location = useLocation();
  return (
    <div className="flex flex-wrap justify-evenly gap-4">
      {chores.map((chore: Chore) => <ChoreSummaryCard chore={chore} location={location}/>)}
    </div>
  )
}