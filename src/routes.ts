import {createBrowserRouter} from "react-router"
import {unprotectedLayoutRoute, protectedLayoutRoute} from "@/routes/layouts.tsx";

export const router = createBrowserRouter([
    unprotectedLayoutRoute,
    protectedLayoutRoute,
  ]
)