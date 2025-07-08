import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
  // renders into the root.tsx Outlet at /
  index("routes/home.tsx"),
  // route("chores", "routes/chores.tsx", [
  //   // contains chore summaries
  //   index("routes/chore-library.tsx"),
  //   // contains chore details
  //   route("chores/:choreId", "routes/chore-details.tsx")
  // ]),
  ...prefix("task-types", [
    // contains TaskType summaries
    index("routes/task-type-library.tsx"),
    // contains TaskType details
    route(":taskTypeId", "routes/task-type-details.tsx")
  ]),
  ...prefix("boop-sizes", [
    // contains BoopSize summaries
    index("routes/boop-size-library.tsx"),
    // no boop size details page
  ])
] satisfies RouteConfig;
