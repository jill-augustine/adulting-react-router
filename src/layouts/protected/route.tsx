// Required user to be signed in
import {type RouteObject, useLocation} from "react-router";
import {useRouteError} from "react-router-dom"
import logoutRoute from "@/logout/route.tsx";
import settingsRoute from "@/settings/route.tsx";
import choresRoute from "@/chores/route.tsx";
import homeRoute from "@/home/route.tsx";
import {Page} from "@/layouts/protected/Page.tsx";
import {loader} from "@/layouts/protected/loader";
import {MehIcon} from "lucide-react";

const protectedRoutes: RouteObject[] = [
  logoutRoute,
  settingsRoute,
  homeRoute,
  choresRoute,
]

const ProtectedPageErrorBoundary = () => {
  const error = useRouteError()
  const location = useLocation()
  return <div>Unknown Error:<MehIcon/>Adulting is hard</div>
}

export const protectedLayoutRoute: RouteObject = {
  // No path because it is a layout, not a parent page.
  path: undefined,
  Component: Page,
  loader,
  children: protectedRoutes,
  ErrorBoundary: ProtectedPageErrorBoundary,
}