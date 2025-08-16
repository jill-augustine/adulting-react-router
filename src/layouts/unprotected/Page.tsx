// import {Sidebar, Logout} from "@/layouts/protected/app-header.tsx";
import {Outlet, useLoaderData} from "react-router";
import {loader} from "@/layouts/protected/loader";

export const UnprotectedLayout = () => {
  const data = useLoaderData<typeof loader>()
  return (
    <>
      {/*Maybe sidebar not needed on unprotected pages because there is no info to show?*/}
      {/*<Sidebar/>*/}
      <Outlet/>
    </>
  )
}