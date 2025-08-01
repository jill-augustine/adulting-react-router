import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/layouts/protected/components/app-sidebar.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {LogOut as LogOutIcon} from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import {Outlet} from "react-router";
import {Button} from "@/components/ui/button.tsx";
import type {User} from "@supabase/supabase-js";
import {Card, CardContent} from "@/components/ui/card.tsx";
import * as React from "react"

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
    {
      title: "Tags",
      url: "/tags",
    },
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

export const SiteHeaderWithContent = ({...props}) => {
  const {data, ...rest} = props;
  return <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
    <SidebarTrigger className="-ml-1"/>
    <Separator
      orientation="vertical"
      className="mr-2 data-[orientation=vertical]:h-4"
    />
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="#">
            Building Your Application
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block"/>
        <BreadcrumbItem>
          <BreadcrumbPage>Data Fetching</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <WelcomeCard data={data}/>
    <Logout/>
  </header>;
}

const Logout = () => {
  return (
    <a href="/logout">
      <Button variant="outline" size="sm">
        <LogOutIcon/>Log Out
      </Button>
    </a>
  )
}

const WelcomeCard = ({data}: { data: { user: User } }) => {
  return (
    <div className="flex items-center justify-center h-screen gap-2">
      <Card>
        <CardContent>
          <p>
            Hello <span className="text-primary font-semibold">{data.user.email}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}