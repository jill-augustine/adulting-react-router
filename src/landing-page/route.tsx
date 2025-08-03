import {type RouteObject} from "react-router";
import {ErrorBoundary} from "@/landing-page/error-boundary";
import {unprotectedLayoutRoute} from "@/layouts/unprotected/route.tsx";
import {protectedLayoutRoute} from "@/layouts/protected/route.tsx";
import {Page} from "@/landing-page/Page.tsx";
import {loader} from "@/landing-page/loader.tsx";

const route: RouteObject = {
  path: "/",
  loader,
  Component: null,
  ErrorBoundary,
  // HydrateFallback: Page,
  // children: [
  //   unprotectedLayoutRoute,
  //   protectedLayoutRoute,
  // ]
}

export default route;