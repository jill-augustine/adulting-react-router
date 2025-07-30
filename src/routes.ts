import {createBrowserRouter} from "react-router"
import landingPageRoute from "@/landing-page/route"
import {unprotectedLayoutRoute} from "@/layouts/unprotected/route.tsx";
import {protectedLayoutRoute} from "@/layouts/protected/route.tsx";

export const router = createBrowserRouter([
  landingPageRoute,
  unprotectedLayoutRoute,
  protectedLayoutRoute,
])
