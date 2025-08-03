import {useFetcher} from 'react-router'
import {UpdatePasswordCard} from "@/update-password/components";
import {action} from "@/update-password/action";

export const Page = () => {
  const fetcher = useFetcher<typeof action>()

  const error = fetcher.data?.error
  const loading = fetcher.state === 'submitting'

  return <UpdatePasswordCard fetcher={fetcher} loading={loading} error={error}/>
}
