import {Page} from "@/task-types/edit/Page";
import {action} from "@/task-types/edit/action";
// Load the TaskType the same as from the details page
import {loader} from "@/task-types/edit/loader";
import {type RouteObject} from "react-router";

const route: RouteObject =
  {
    path: ":taskTypeId/edit",
    Component: Page,
    action,
    loader,
  }

export default route;