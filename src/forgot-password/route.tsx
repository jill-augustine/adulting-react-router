import {type RouteObject,} from 'react-router'
import {action} from "@/forgot-password/action";
import {Page} from "@/forgot-password/Page";

const route: RouteObject = {
  path: "forgot-password",
  Component: Page,
  action,
};

export default route