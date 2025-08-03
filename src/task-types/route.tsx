import summaryRoute from "@/task-types/summary/route"
import detailsRoute from "@/task-types/details/route"
import createRoute from "@/task-types/create/route"

const route = {
  path: "task-types",
  children: [
    summaryRoute,
    createRoute,
    detailsRoute,
  ],
}
export default route;