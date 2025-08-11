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
      items: [
        // {
        //   title: "Installation",
        //   url: "#",
        //   isActive: true,
        // },
      ],
    },
    {
      title: "Chores",
      url: "/chores",
    },
    {
      title: "Task Types",
      url: "/task-types",
    },
    // Some separator
    // {
    //   title: "Tags",
    //   url: "/tags",
    // },
    {
      title: "Tasks",
      url: "/tasks",
    },
    {
      title: "Boop Sizes",
      url: "/boop-sizes",
    }
  ],
}
export const Page = () => {
  const data = useLoaderData<typeof loader>()
  return (
    <SidebarProvider>
      <AppSidebar navMain={navData.navMain} version={navData.versions.pop() ?? ""}/>
      <SidebarInset>
        {/*Header of that page*/}
        <SiteHeaderWithContent data={data}/>
        <div className="p-2 md:p-4">
          {/*Content of that page*/}
          <Outlet/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}