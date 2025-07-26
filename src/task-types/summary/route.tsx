import {Page} from "@/task-types/summary/Page";
import {loader} from "@/task-types/summary/loader";
import {type RouteObject} from "react-router";

const route: RouteObject = {
  index: true,
  Component: Page,
  loader,
}

export default route;