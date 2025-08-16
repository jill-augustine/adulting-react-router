import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {LogOutIcon, SettingsIcon} from "lucide-react"
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
  const name = data.user?.user_metadata?.displayName || data.user.email
  return (
    <div className="flex justify-end gap-2">
      Hello<span className="text-primary font-semibold">{name ? ` ${name}` : ""}</span>
      <a href="/settings">
        <span className="sr-only">Go to settings</span>
        <SettingsIcon strokeWidth="1" aria-hidden="true"/></a>
    </div>
  )
}