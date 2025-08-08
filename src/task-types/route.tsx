import summaryRoute from "@/task-types/summary/route"
import detailsRoute from "@/task-types/details/route"
import createRoute from "@/task-types/create/route"
import editRoute from "@/task-types/edit/route"

const route = {
  path: "task-types",
  children: [
    summaryRoute,
    createRoute,
    detailsRoute,
    editRoute,
  ],
}
export default route;