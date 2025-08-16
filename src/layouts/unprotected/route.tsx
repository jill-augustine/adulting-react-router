// Require user to NOT be signed in
import {type RouteObject} from "react-router";
import forgotPasswordRoute from "@/forgot-password/route.tsx";
import signUpRoute from "@/sign-up/route.tsx";
import authRoute from "@/auth/route.tsx";
import loginRoute from "@/login/route.tsx";
import {UnprotectedLayout} from "@/layouts/unprotected/Page.tsx";

const unprotectedRoutes: RouteObject[] = [
  forgotPasswordRoute,
  signUpRoute,
  authRoute,
  loginRoute,
]

export const unprotectedLayoutRoute: RouteObject = {
  // path: "/",
  Component: UnprotectedLayout,
  children: unprotectedRoutes,
}