import {browserClient as supabase} from '@/lib/client'
import {type LoaderFunctionArgs, redirect, type RouteObject} from 'react-router'


export async function loader() {
  const {error} = await supabase.auth.signOut()

  if (error) {
    console.error(error)
    return {success: false, error: error.message}
  }

  // Redirect to dashboard or home page after successful sign-out
  return redirect('/')
}

const route: RouteObject = {
  path: "/logout",
  loader: loader,
  Component: () => {
    return <div></div>
  }
}

export default route