import {type RouteObject} from 'react-router'
import {Page} from "@/sign-up/Page"
import {action} from "@/sign-up/action";

const route: RouteObject = {
  path: '/sign-up',
  Component: Page,
  action,
}

export default route