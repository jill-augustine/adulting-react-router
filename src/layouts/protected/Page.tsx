import {SiteHeaderWithContent} from "@/layouts/protected/components/app-header.tsx";
import {Outlet, useLoaderData} from "react-router";
import {loader} from "@/layouts/protected/loader";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/layouts/protected/components/app-sidebar.tsx";
import * as React from "react";

export const navData = {
  versions: ["0.0.1"],
  navMain: [
    {
      title: "Home",
      url: "/home",
    },
    {
      title: "Chores",
      url: "/chores",
    },
    {
      title: "Tasks",
      url: "/tasks",
    },
    {
      title: "Settings",
      url: "/settings",
    }
  ],
}
export const Page = () => {
  const data = useLoaderData<typeof loader>()
  return (
    <SidebarProvider>
      <AppSidebar navMain={navData.navMain} version={navData.versions.pop() ?? ""}/>
      <SidebarInset>
        {/*Header of that page spanning whole width*/}
        <SiteHeaderWithContent data={data}/>
        <div className="flex flex-col w-full items-center justify-center p-2 md:p-4 min-w-sm max-w-xl">
          {/*Content of that page limited to width small->large*/}
          <Outlet/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}