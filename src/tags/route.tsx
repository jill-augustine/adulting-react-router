import {type RouteObject} from "react-router";
import summaryRoute from "@/tags/summary/route";

const route: RouteObject = {
  path: "tags",
  children: [
    summaryRoute
  ]
}
export default route;