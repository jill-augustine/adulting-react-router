import {useFetcher} from "react-router";
import {action} from "@/login/action";
import {LoginCard} from "@/login/components";

export const Page = () => {
  const fetcher = useFetcher<typeof action>()
  const error = fetcher.data?.error
  const loading = fetcher.state === 'submitting'

  const testUserFetcher = useFetcher<typeof action>()
  const testUserError = testUserFetcher.data?.error
  const testUserLoading = testUserFetcher.state === 'loading'

  return (
    <LoginCard fetcher={fetcher} error={error} loading={loading} testUserFetcher={testUserFetcher}
               testUserLoading={testUserLoading} testUserError={testUserError}/>
  )
}