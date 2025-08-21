import {useFetcher} from "react-router";
import {action} from "@/chores/create/action"
import {CreateChoreCard} from "@/chores/create/components.tsx";

export const Page = () => {
  const fetcher = useFetcher<typeof action>()
  const error = fetcher?.data?.error;
  const loading = fetcher.state === 'submitting'

  return <CreateChoreCard fetcher={fetcher} error={error} loading={loading}/>
}
