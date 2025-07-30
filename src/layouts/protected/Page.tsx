import {SidebarLayout, Logout} from "@/layouts/protected/components/some-name.tsx/components.tsx";
import {Outlet, useLoaderData} from "react-router";
import {loader} from "@/layouts/protected/loader";

export const Page = () => {
  const data = useLoaderData<typeof loader>()
  return (
    <>
      <SidebarLayout/>
      {/*<Sidebar>{Something here}<Sidebar/>*/}
      <Logout data={data}/>
      <Outlet/>
    </>
  )
}