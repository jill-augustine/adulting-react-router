import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {LogOut as LogOutIcon} from "lucide-react"
import {Button} from "@/components/ui/button.tsx";
import type {User} from "@supabase/supabase-js";
import * as React from "react"

export const SiteHeaderWithContent = ({...props}) => {
  const {data} = props;
  return <header className="flex flex-row h-16 items-center gap-2 border-b px-4">
    <div className="flex gap-2 items-center">
      <SidebarTrigger className="-ml-1"/>
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <h1 className="text-xl font-medium">Adulting</h1>
    </div>
    <div className="flex-grow"/>
    <div className="flex gap-2 md:gap-4 items-center">
      <WelcomeCard data={data}/>
      <Logout className=""/>
    </div>
  </header>;
}

const Logout = ({className}: { className: string }) => {
  return (
    <a href="/logout">
      <Button variant="outline" size="sm" className={className}>
        <LogOutIcon/>Log Out
      </Button>
    </a>
  )
}

const WelcomeCard = ({data}: { data: { user: User } }) => {
  return (
    // <div className="flex items-center justify-center h-screen gap-2">
    //   <Card>
    //     <CardContent>
    <div>
      Hello <span className="text-primary font-semibold">{data.user.email}</span>
    </div>
    //     </CardContent>
    //   </Card>
    // </div>
  )
}