import {type LoaderFunctionArgs, redirect, type RouteObject} from "react-router";
import {browserClient as supabase} from "@/lib/client.ts";
import {ErrorBoundary} from "@/routes/error-boundary.tsx";

const loader = async () => {
  const {data, error} = await supabase.auth.getUser()
  if (error || !data?.user) {
    return redirect('/login')
  }
  return redirect('/home')
}

const LandingPage = () => {
  return (
    <p>LandingPage</p>
  )
}
const route: RouteObject = {
  path: "/",
  loader: loader,
  Component: LandingPage,
  ErrorBoundary: ErrorBoundary,
  HydrateFallback: LandingPage,
}

export default route;