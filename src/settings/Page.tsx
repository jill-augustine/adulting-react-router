import {useFetcher, useLoaderData} from 'react-router'
import {UpdateSettingsCard} from "@/settings/components";
import {action} from "@/settings/action";
import type {SettingsLoaderData} from "@/settings/loader";

export const Page = () => {
  const fetcher = useFetcher<typeof action>()
  const loaderData = useLoaderData<SettingsLoaderData>()
  const fetcherError = fetcher.data?.error
  const loading = fetcher.state === 'submitting'
  return <UpdateSettingsCard fetcher={fetcher} loading={loading} error={fetcherError} userData={loaderData.data}/>

}
