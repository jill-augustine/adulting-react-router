import {useFetcher, useSearchParams} from "react-router";
import {action} from "@/forgot-password/action";
import {ForgotPasswordCard} from "@/forgot-password/components";

export const Page = () => {
  const fetcher = useFetcher<typeof action>()
  const [searchParams] = useSearchParams()

  const success = !!searchParams.has('success')
  const error = fetcher.data?.error
  const loading = fetcher.state === 'submitting'

  return <ForgotPasswordCard loading={loading} error={error} success={success} fetcher={fetcher}/>
}