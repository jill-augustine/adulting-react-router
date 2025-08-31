// Required user to be signed in
import {isRouteErrorResponse, type RouteObject} from "react-router";
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
  console.error(error)
  if (isRouteErrorResponse(error)) {
    const message = error.status === 404 ? "404" : "Error";
    const details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || "An unexpected error occurred."
    return <div>{message}: {details}<MehIcon/>Adulting is hard</div>
  }
}

export const protectedLayoutRoute: RouteObject = {
  // No path because it is a layout, not a parent page.
  path: undefined,
  Component: Page,
  loader,
  children: protectedRoutes,
  ErrorBoundary: ProtectedPageErrorBoundary,
}