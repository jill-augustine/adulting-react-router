import * as React from "react"
import * as z from "zod"
import {GalleryVerticalEnd} from "lucide-react"
// Adapted from: https://ui.shadcn.com/blocks/sidebar

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar.tsx"

const navSubItemSchema = z.object({
  title: z.string(),
  url: z.string(),
  isActive: z.boolean().optional(),
})

const navMainSchema = z.object({
  title: z.string(),
  url: z.string(),
  items: navSubItemSchema.array().optional(),
}).array()

type NavMain = z.infer<typeof navMainSchema>

const SidebarHeaderWithContent = ({version}: { version: string }) => {
  return <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <a href="#">
            <div
              className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <GalleryVerticalEnd className="size-4"/>
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-medium">Documentation</span>
              <span className="">{version.startsWith("v") ? version : "v" + version}</span>
            </div>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>;
}

export const AppSidebar = ({navMain, version, ...props}: {
  navMain: NavMain,
  version: string,
}) => {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeaderWithContent version={version}/>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {navMain.slice(0, 3).map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator/>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {navMain.slice(3).map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
