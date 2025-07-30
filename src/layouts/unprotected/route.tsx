// Require user to NOT be signed in
import {Outlet, type RouteObject} from "react-router";
import landingPageRoute from "@/landing-page/route.tsx";
import forgotPasswordRoute from "@/forgot-password/route.tsx";
import signUpRoute from "@/sign-up/route.tsx";
import authRoute from "@/auth/route.tsx";
import loginRoute from "@/login/route.tsx";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/layouts/protected/components/app-sidebar.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import {Page} from "@/layouts/unprotected/Page.tsx";

const unprotectedRoutes: RouteObject[] = [
  forgotPasswordRoute,
  signUpRoute,
  authRoute,
  loginRoute,
]

export const unprotectedLayoutRoute: RouteObject = {
  // path: "/",
  Component: Page,
  children: unprotectedRoutes,
}