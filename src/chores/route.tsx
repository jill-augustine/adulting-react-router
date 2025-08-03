import summaryRoute from "@/chores/summary/route"
import detailsRoute from "@/chores/details/route"

const route = {
  path: "chores",
  children: [
    summaryRoute,
    detailsRoute,
  ],
}

export default route;