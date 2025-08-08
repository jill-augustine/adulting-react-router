import {CreateTaskTypeCard} from "@/task-types/create/components";
// Only need to load the boop size so  the boop-size loader can be used
import {useFetcher, useLoaderData} from "react-router";
import {action} from "@/task-types/create/action";

export const Page = () => {
  const {data} = useLoaderData();
  const fetcher = useFetcher<typeof action>()
  const error = fetcher?.data?.error;
  const loading = fetcher.state === 'submitting'

  return <CreateTaskTypeCard fetcher={fetcher} error={error} loading={loading} boopSizes={data}/>
}
