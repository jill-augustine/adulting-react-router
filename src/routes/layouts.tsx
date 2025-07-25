import {type RouteObject, Outlet} from "react-router";
import {AppSidebar} from "@/components/ui/app-sidebar.tsx";
// Protected routes
import logoutRoute from '@/auth/logout'
import protectedRoute from '@/auth/protected'
import updatePasswordRoute from "@/auth/update-password";
import homeRoute from "@/routes/home"
import choresRoute from "@/chores/chores-routes";
import taskTypesRoute from "@/task-types/task-types-routes";
import boopSizesRoute from "@/boop-sizes/boop-sizes-routes"
import tagsRoute from "@/tags/tags-routes"
// Unprotected routes
import landingPageRoute from "@/routes/landing-page"
import authRoute from "@/auth/auth"
import forgotPasswordRoute from "@/auth/forgot-password"
import signUpRoute from "@/auth/sign-up";
import loginRoute from "@/auth/login"

// TODO: Decide whether to split into two files (protected and unprotected)

// Required user to be signed in
const protectedRoutes: RouteObject[] = [
  logoutRoute,
  protectedRoute,
  updatePasswordRoute,
  homeRoute,
  choresRoute,
  taskTypesRoute,
  boopSizesRoute,
  tagsRoute,
]

// Extract data needed for the sidebar from route list
const protectedNavMain = protectedRoutes.map(route => {
  const nav = {
    title: route.path ? route.path.replace("/", "") : "",
    url: route.path ?? "",
  }
  if (!route.children) {
    return nav
  }
  return {
    ...nav,
    items: route.children.map(childRoute => {
      return {
        title: childRoute.path ? childRoute.path.replace("/", "") : "",
        url: childRoute.path ? `${route.path}/${childRoute.path}` : "",
        isActive: false,
      }
    })
  }
})

const ProtectedLayout = () => {
  return (
    <div>
      <AppSidebar navMain={protectedNavMain}/>
      <Outlet/>
    </div>
  )
}

export const protectedLayoutRoute: RouteObject = {
  Component: ProtectedLayout,
  children: protectedRoutes,
}

// Require user to NOT be signed in
const unprotectedRoutes: RouteObject[] = [
  landingPageRoute,
  forgotPasswordRoute,
  signUpRoute,
  authRoute,
  loginRoute,
]

// Extract data needed for the sidebar from route list
const unprotectedNavMain = unprotectedRoutes.map(route => {
  const nav = {
    title: route.path ? route.path.replace("/", "") : "",
    url: route.path ?? "",
  }
  if (!route.children) {
    return nav
  }
  return {
    ...nav,
    items: route.children.map(childRoute => {
      return {
        title: childRoute.path ? childRoute.path.replace("/", "") : "",
        url: childRoute.path ? `${route.path}/${childRoute.path}` : "",
        isActive: false,
      }
    })
  }
})

const UnprotectedLayout = () => {
  return (
    <div>
      <AppSidebar navMain={unprotectedNavMain}/>
      <Outlet/>
    </div>
  )
}

export const unprotectedLayoutRoute: RouteObject = {
  Component: UnprotectedLayout,
  children: unprotectedRoutes,
}