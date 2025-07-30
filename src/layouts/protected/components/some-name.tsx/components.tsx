// Extract data needed for the sidebar from route list
// const protectedNavMain = protectedRoutes.map(route => {
//   const nav = {
//     title: route.path ? route.path.replace("/", "") : "",
//     url: route.path ?? "",
//   }
//   if (!route.children) {
//     return nav
//   }
//   return {
//     ...nav,
//     items: route.children.map(childRoute => {
//       return {
//         title: childRoute.path ? childRoute.path.replace("/", "") : "",
//         url: childRoute.path ? `${route.path}/${childRoute.path}` : "",
//         isActive: false,
//       }
//     })
//   }
// })
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/layouts/protected/components/app-sidebar.tsx";
import {Separator} from "@/components/ui/separator.tsx";
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

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#",
        },
        {
          title: "Project Structure",
          url: "#",
        },
      ],
    },
    {
      title: "Building Your Application",
      url: "#",
      items: [
        {
          title: "Routing",
          url: "#",
        },
        {
          title: "Data Fetching",
          url: "#",
          isActive: true,
        },
        {
          title: "Rendering",
          url: "#",
        },
        {
          title: "Caching",
          url: "#",
        },
        {
          title: "Styling",
          url: "#",
        },
        {
          title: "Optimizing",
          url: "#",
        },
        {
          title: "Configuring",
          url: "#",
        },
        {
          title: "Testing",
          url: "#",
        },
        {
          title: "Authentication",
          url: "#",
        },
        {
          title: "Deploying",
          url: "#",
        },
        {
          title: "Upgrading",
          url: "#",
        },
        {
          title: "Examples",
          url: "#",
        },
      ],
    },
    {
      title: "API Reference",
      url: "#",
      items: [
        {
          title: "Components",
          url: "#",
        },
        {
          title: "File Conventions",
          url: "#",
        },
        {
          title: "Functions",
          url: "#",
        },
        {
          title: "next.config.js Options",
          url: "#",
        },
        {
          title: "CLI",
          url: "#",
        },
        {
          title: "Edge Runtime",
          url: "#",
        },
      ],
    },
    {
      title: "Architecture",
      url: "#",
      items: [
        {
          title: "Accessibility",
          url: "#",
        },
        {
          title: "Fast Refresh",
          url: "#",
        },
        {
          title: "Next.js Compiler",
          url: "#",
        },
        {
          title: "Supported Browsers",
          url: "#",
        },
        {
          title: "Turbopack",
          url: "#",
        },
      ],
    },
  ],
}
const protectedNavMain = data.navMain

const SiteHeader = () => {
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
  </header>;
}

export const SidebarLayout = () => {
  return <SidebarProvider>
    <AppSidebar navMain={protectedNavMain}/>
    <SidebarInset>
      <SiteHeader/>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl"/>
          <div className="bg-muted/50 aspect-video rounded-xl"/>
          <div className="bg-muted/50 aspect-video rounded-xl"/>
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"/>
      </div>
    </SidebarInset>
  </SidebarProvider>;
}

export const Logout = ({data}: { data: { user: User } }) => {
  return (
    // <div className="flex items-center justify-center h-screen gap-2">
    <Card>
      <CardContent>
        <p>
          Hello <span className="text-primary font-semibold">{data.user.email}</span>
        </p>
        <a href="/src/logout/page">
          <Button>Logout</Button>
        </a>
      </CardContent>
    </Card>
    // </div>
  )
}