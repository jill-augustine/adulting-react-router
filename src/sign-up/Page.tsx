import {useFetcher, useSearchParams} from 'react-router'
import {action} from "@/sign-up/action";
import {SignUpCard} from "@/sign-up/components";

export const Page = () => {
  const fetcher = useFetcher<typeof action>()
  const [searchParams] = useSearchParams()

  const success = !!searchParams.has('success')
  const error = fetcher.data?.error
  const loading = fetcher.state === 'submitting'
  return <SignUpCard fetcher={fetcher} success={success} error={error} loading={loading}/>
}