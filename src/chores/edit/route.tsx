import {Page} from "@/chores/edit/Page";
import {action} from "@/chores/edit/action";
import {loader} from "@/chores/edit/loader";
import {type RouteObject} from "react-router";

const route: RouteObject =
  {
    path: ":choreId/edit",
    Component: Page,
    action,
    loader,
  }

export default route;