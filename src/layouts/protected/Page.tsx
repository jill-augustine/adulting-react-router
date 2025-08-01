import {
  navData,
  SiteHeaderWithContent
} from "@/layouts/protected/components/app-header.tsx";
import {Outlet, useLoaderData} from "react-router";
import {loader} from "@/layouts/protected/loader";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/layouts/protected/components/app-sidebar.tsx";
import * as React from "react";

export const Page = () => {
  const data = useLoaderData<typeof loader>()
  return (
    <SidebarProvider>
      {/*TODO: Highlight the current page in nav bar*/}
      <AppSidebar navMain={navData.navMain} version={navData.versions.pop() ?? ""}/>
      <SidebarInset>
        {/*Header of that page*/}
        <SiteHeaderWithContent data={data}/>
        {/*Content of that page*/}
        <Outlet/>
      </SidebarInset>
    </SidebarProvider>
  )
}