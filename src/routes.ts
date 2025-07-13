// import {type RouteConfig, index, prefix, route} from "@react-router/dev/routes";
import {createBrowserRouter} from "react-router"
import Home from "./routes/home";
import * as boopSizeRoutes from "@/boop-sizes/boop-sizes-routes"
import * as choresRoutes from "@/chores/chores-routes"
import * as tagsRoutes from "@/tags/tags-routes"
import * as taskTypeRoutes from "@/task-types/task-types-routes"

const isString = (value: unknown): value is string => {
  return value !== null && typeof value === "string";
}

const isStringArray = (arr: unknown): arr is string[] =>
  Array.isArray(arr) && arr.every(isString);


export const router = createBrowserRouter([
    {
      path: "/",
      Component: Home
    },
    {
      path: "/chores",
      children: [
        {
          Component: choresRoutes.SummaryRoute,
          index: true,
          loader: choresRoutes.summaryLoader,
        },
        {
          path: ":choreId",
          Component: choresRoutes.DetailsRoute,
          loader: choresRoutes.detailsLoader,
        },
      ],
    },
    {
      path: "/task-types",
      children: [
        {
          index: true,
          Component: taskTypeRoutes.SummaryRoute,
          loader: taskTypeRoutes.summaryLoader,
        },
        {
          path: ":taskTypeId",
          Component: taskTypeRoutes.DetailsRoute,
          loader: taskTypeRoutes.detailsLoader,
        },
        {
          path: "new",
          Component: taskTypeRoutes.CreateRoute,
          action: taskTypeRoutes.createAction,
        }
      ],
    },
    {
      path: "boop-sizes",
      children: [
        {
          index: true,
          Component: boopSizeRoutes.SummaryRoute,
          loader: boopSizeRoutes.summaryLoader,
        }
      ],
    },
    {
      path: "tags",
      children: [
        {
          index: true,
          Component: tagsRoutes.SummaryRoute,
          loader: tagsRoutes.summaryLoader,
        }
      ]
    }
  ]
)