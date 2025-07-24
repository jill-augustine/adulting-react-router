// TODO: Create one unprotected layout and one protected layout.
import logoutRoute from '@/auth/logout'
import protectedRoute from '@/auth/protected'
import updatePasswordRoute from "@/auth/update-password";
import homeRoute from "@/routes/home"
import choresRoute from "@/chores/chores-routes";
import taskTypesRoute from "@/task-types/task-types-routes";
import boopSizesRoute from "@/boop-sizes/boop-sizes-routes"
import tagsRoute from "@/tags/tags-routes"

// Required user to be signed in
export const protectedRoutes = [
  logoutRoute,
  protectedRoute,
  updatePasswordRoute,
  homeRoute,
  choresRoute,
  taskTypesRoute,
  boopSizesRoute,
  tagsRoute,
]