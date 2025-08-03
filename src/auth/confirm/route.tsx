// Creating the route object including any loaders or actions, but excluding pages/components.

import {browserClient as supabase} from '@/lib/client'
import {type EmailOtpType} from '@supabase/supabase-js'
import {type LoaderFunctionArgs, redirect, type RouteObject} from 'react-router'

const loader = async ({request}: LoaderFunctionArgs) => {
  const requestUrl = new URL(request.url)
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type') as EmailOtpType | null
  const _next = requestUrl.searchParams.get('next')
  const next = _next?.startsWith('/') ? _next : '/'

  if (token_hash && type) {
    const {error} = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      return redirect(next)
    } else {
      return redirect(`/auth/error?error=${error?.message}`)
    }
  }

  // redirect the user to an error page with some instructions
  return redirect(`/auth/error?error=No token hash or type`)
}

const route: RouteObject =
  {
    path: "confirm",
    loader,
  }

export default route;