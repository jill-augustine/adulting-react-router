import {type RouteObject, Outlet} from "react-router";
import {AppSidebar} from "@/components/ui/app-sidebar.tsx";
// Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {Separator} from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
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
    <SidebarProvider>
      <AppSidebar navMain={protectedNavMain}/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1"/>
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block"/>
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl"/>
            <div className="bg-muted/50 aspect-video rounded-xl"/>
            <div className="bg-muted/50 aspect-video rounded-xl"/>
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"/>
        </div>
      </SidebarInset>
      <Outlet/>
    </SidebarProvider>
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
    <SidebarProvider>
      <AppSidebar navMain={unprotectedNavMain}/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1"/>
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block"/>
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl"/>
            <div className="bg-muted/50 aspect-video rounded-xl"/>
            <div className="bg-muted/50 aspect-video rounded-xl"/>
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"/>
        </div>
      </SidebarInset>
      <Outlet/>
    </SidebarProvider>
  )
}

export const unprotectedLayoutRoute: RouteObject = {
  Component: UnprotectedLayout,
  children: unprotectedRoutes,
}