import errorRoute from "@/auth/error/route"
import confirmRoute from "@/auth/confirm/route"

const route = {
  path: "auth",
  children: [
    errorRoute,
    confirmRoute,
  ]
}

export default route;