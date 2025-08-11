// Required user to be signed in
import {type RouteObject} from "react-router";
import logoutRoute from "@/logout/route.tsx";
import updatePasswordRoute from "@/update-password/route.tsx";
import choresRoute from "@/chores/route.tsx";
import taskTypesRoute from "@/task-types/route.tsx";
import boopSizesRoute from "@/boop-sizes/route.tsx";
// import tagsRoute from "@/tags/route.tsx";
import homeRoute from "@/home/route.tsx";
import {Page} from "@/layouts/protected/Page.tsx";
import {loader} from "@/layouts/protected/loader";

const protectedRoutes: RouteObject[] = [
  logoutRoute,
  updatePasswordRoute,
  homeRoute,
  choresRoute,
  taskTypesRoute,
  boopSizesRoute,
  // tagsRoute,
]

export const protectedLayoutRoute: RouteObject = {
  // No path because it is a layout, not a parent page.
  // path: "/",
  Component: Page,
  loader,
  children: protectedRoutes,
}