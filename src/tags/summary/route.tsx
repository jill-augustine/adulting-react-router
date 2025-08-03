import {Page} from "@/tags/summary/Page"
import {loader} from "@/tags/summary/loader";
import {type RouteObject} from "react-router";

const route: RouteObject = {
  index: true,
  Component: Page,
  loader,
}

export default route;