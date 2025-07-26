import {type RouteObject,} from 'react-router'
import {action} from "@/update-password/action";
import {Page} from "@/update-password/Page";

const route: RouteObject = {
  path: "update-password",
  Component: Page,
  action: action,
}

export default route