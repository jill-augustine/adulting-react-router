import {createBrowserRouter} from "react-router"
import {unprotectedLayoutRoute, protectedLayoutRoute} from "@/routes/layouts";

export const router = createBrowserRouter([
    unprotectedLayoutRoute,
    protectedLayoutRoute,
  ]
)