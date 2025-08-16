import {type RouteObject,} from 'react-router'
import {action} from "@/settings/action";
import {loader} from "@/settings/loader";
import {Page} from "@/settings/Page";

const route: RouteObject = {
  path: "settings",
  loader,
  Component: Page,
  action: action,
}

export default route