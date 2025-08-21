import {useFetcher, useLoaderData} from "react-router";
import {action} from "@/chores/create/action"
import {CreateChoreCard} from "@/chores/create/components.tsx";
import {EditChoreCard} from "@/chores/edit/components.tsx";

export const Page = () => {
  const {data} = useLoaderData()
  console.log("page data", data)
  const fetcher = useFetcher<typeof action>()
  const error = fetcher?.data?.error;
  const loading = fetcher.state === 'submitting'

  return <EditChoreCard chore={data.chore} fetcher={fetcher} error={error} loading={loading}/>
}
