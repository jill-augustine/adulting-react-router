import {browserClient as supabase} from "@/lib/client.ts";
import {Button} from '@/components/ui/button'
import {type RouteObject, redirect, useLoaderData} from 'react-router'

export const loader = async () => {

  const {data, error} = await supabase.auth.getUser()
  if (error || !data?.user) {
    return redirect('/login')
  }

  return data
}

export function ProtectedPage() {
  let data = useLoaderData<typeof loader>()

  return (
    <div className="flex items-center justify-center h-screen gap-2">
      <p>
        Hello <span className="text-primary font-semibold">{data.user.email}</span>
      </p>
      <a href="/logout">
        <Button>Logout</Button>
      </a>
    </div>
  )
}

const route: RouteObject = {
  path: "/protected",
  Component: ProtectedPage,
  loader: loader,
}

export default route