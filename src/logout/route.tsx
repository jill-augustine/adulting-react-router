import {type RouteObject} from 'react-router'
import {loader} from "@/logout/loader";

const route: RouteObject = {
  path: "logout",
  loader: loader,
}

export default route