import {Page} from "@/task-types/create/Page";
import {action} from "@/task-types/create/action.ts";
import {type RouteObject} from "react-router";

const route: RouteObject =
  {
    path: "new",
    Component: Page,
    action,
  }

export default route;