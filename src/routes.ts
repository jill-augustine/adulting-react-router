// import {type RouteConfig, index, prefix, route} from "@react-router/dev/routes";
import {createBrowserRouter} from "react-router"
import Home from "./routes/home";
import ChoreLibrary from "./routes/chore-library";
import ChoreDetails from "./routes/chore-details";
import TaskTypeLibrary from "./routes/task-type-library";
import TaskTypeDetails from "./routes/task-type-details";
import BoopSizeLibrary from "./routes/boop-size-library";
import TagsLibrary from "@/routes/tag-library"
import {getAllTaskTypes, getTaskType} from "@/lib/task-types.ts";
import {getAllTags} from "@/lib/tags.ts";
import {getAllBoopSizes} from "@/lib/boop-sizes.ts";
import {getAllChores, getChore} from "@/lib/chores.ts";

export const router = createBrowserRouter([
    {
      path: "/",
      Component: Home
    },
    {
      path: "/chores",
      children: [
        {
          Component: ChoreLibrary,
          index: true,
          loader: async () => {
            return {data: await getAllChores()};
          }
        },
        {
          path: ":choreId",
          Component: ChoreDetails,
          loader: async ({params}) => {
            return {data: await getChore(Number(params.choreId))};
          }
        },
      ],
    },
    {
      path: "/task-types",
      children: [
        {
          index: true,
          Component: TaskTypeLibrary,
          loader: async () => {
            return {data: await getAllTaskTypes()};
          }
        },
        {
          path: ":taskTypeId",
          Component: TaskTypeDetails,
          loader: async ({params}) => {
            return {data: await getTaskType(Number(params.taskTypeId))};
          }
        }
      ],
    },
    {
      path: "boop-sizes",
      children: [
        {
          index: true,
          Component: BoopSizeLibrary,
          loader: async () => {
            return {data: await getAllBoopSizes()};
          }
        }
      ],
    },
    {
      path: "tags",
      children: [
        {
          index: true,
          Component: TagsLibrary,
          loader: async () => {
            return {data: await getAllTags()};
          },
        }
      ]
    }
  ]
)