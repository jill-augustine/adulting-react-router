import createRoute from "@/chores/create/route"
import detailsRoute from "@/chores/details/route"
import summaryRoute from "@/chores/summary/route"
import editRoute from "@/chores/edit/route"

const route = {
  path: "chores",
  children: [
    createRoute,
    detailsRoute,
    summaryRoute,
    editRoute,
  ],
}

export default route;