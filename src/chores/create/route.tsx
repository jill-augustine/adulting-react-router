import {Page} from "@/chores/create/Page";
import {action} from "@/chores/create/action";
import {type RouteObject} from "react-router";

const route: RouteObject =
  {
    path: "new",
    Component: Page,
    action,
  }

export default route;