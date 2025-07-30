import {type RouteObject} from "react-router";
import {Page} from "@/chores/summary/Page.tsx";
import {loader} from "@/chores/summary/loader.tsx";

const route: RouteObject = {
  index: true,
  Component: Page,
  loader
}

export default route;