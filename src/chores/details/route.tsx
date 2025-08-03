import {type RouteObject} from "react-router";
import {Page} from "@/chores/details/Page.tsx";
import {loader} from "@/chores/details/loader.tsx";

const route: RouteObject = {
  path: ":choreId",
  Component: Page,
  loader
}

export default route;