import {Outlet, useLoaderData} from "react-router";
import {loader} from "@/layouts/protected/loader";

export const UnprotectedLayout = () => {
  return (
    <>
      <Outlet/>
    </>
  )
}