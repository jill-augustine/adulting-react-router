// import {type RouteConfig, index, prefix, route} from "@react-router/dev/routes";
import {createBrowserRouter} from "react-router"
import Home from "./routes/home";
import Login, {loginAction} from "@/auth/login";
import * as boopSizeRoutes from "@/boop-sizes/boop-sizes-routes"
import * as choresRoutes from "@/chores/chores-routes"
import * as tagsRoutes from "@/tags/tags-routes"
import * as taskTypeRoutes from "@/task-types/task-types-routes"
import landingPageRoute from "@/routes/landing-page"
import logoutRoute from "@/auth/logout"
import authConfirmRoute from "@/auth/auth.confirm";
import authErrorRoute from "@/auth/auth.error"
import forgotPasswordRoute from "@/auth/forgot-password"
import protectedRoute from "@/auth/protected"
import signUpRoute from "@/auth/sign-up";
import updatePasswordRoute from "@/auth/update-password";


const isString = (value: unknown): value is string => {
  return value !== null && typeof value === "string";
}

const isStringArray = (arr: unknown): arr is string[] =>
  Array.isArray(arr) && arr.every(isString);


// Do not require user to be signed in
const unprotectedRoutes = [
  landingPageRoute,
  forgotPasswordRoute,
  signUpRoute,
  // TODO: Update these below to import the route object only (also for auth).
  //  Can both auths be in the same file?
  {
    path: "/auth",
    children: [
      authConfirmRoute,
      authErrorRoute,
    ]
  },
  {
    path: "/login",
    Component: Login,
    action: loginAction,
  },
]

const protectedLayoutRoute = {
  Component: null,
  children: protectedRoutes,
}

const unprotectedLayoutRoute = {
  Component: null,
  children: unprotectedRoutes,
}

export const router = createBrowserRouter([
    unprotectedLayoutRoute,
    protectedLayoutRoute,
  ]
)