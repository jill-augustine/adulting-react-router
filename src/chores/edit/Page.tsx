import {useFetcher, useLoaderData} from "react-router";
import {action} from "@/chores/create/action"
import {EditChoreCard} from "@/chores/components"

export const Page = () => {
  const {data} = useLoaderData()
  const fetcher = useFetcher<typeof action>()
  const error = fetcher?.data?.error;
  const loading = fetcher.state === 'submitting'

  return <EditChoreCard chore={data.chore} fetcher={fetcher} error={error} loading={loading}/>
}
