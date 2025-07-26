import {useSearchParams} from 'react-router'
import {ErrorCard} from "@/auth/error/components";

export function Page() {
  const [searchParams] = useSearchParams()
  return <ErrorCard searchParams={searchParams}/>
}