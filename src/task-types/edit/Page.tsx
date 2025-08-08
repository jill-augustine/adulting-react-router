import {EditTaskTypeCard} from "@/task-types/edit/components";
import {data, useFetcher, useLoaderData} from "react-router";
import {action} from "@/task-types/create/action";
import type {TaskType} from "@/task-types/service.ts";
import type {BoopSize} from "@/boop-sizes/service.ts";

export const Page = () => {
  const {data} = useLoaderData<{ data: { boopSizes: BoopSize[], taskType: TaskType } }>();
  const fetcher = useFetcher<typeof action>()
  const error = fetcher?.data?.error;
  const loading = fetcher.state === 'submitting'

  return <EditTaskTypeCard taskType={data.taskType} fetcher={fetcher} error={error} loading={loading}
                           boopSizes={data.boopSizes}/>
}
