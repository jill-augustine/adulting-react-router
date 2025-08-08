import {Page} from "@/task-types/create/Page";
import {action} from "@/task-types/create/action";
import {loader} from "@/boop-sizes/summary/loader"
import {type RouteObject} from "react-router";

const route: RouteObject =
  {
    path: "new",
    Component: Page,
    action,
    loader,
  }

export default route;