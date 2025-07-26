import {Page} from "@/task-types/details/Page"
import {loader} from "@/task-types/details/loader"
import {type RouteObject} from "react-router";

const route: RouteObject = {
  path: ":taskTypeId",
  Component: Page,
  loader,
}
export default route;