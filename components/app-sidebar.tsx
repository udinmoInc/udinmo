import * as React from "react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { NavUser } from "./nav-user";

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const user = {
    name: data.user?.user_metadata.full_name,
    email: data.user?.email ?? "",
  };

  return (
    <Sidebar
      collapsible="icon"
      className="bg-[#090909] dark:bg-[#090909] dark:border-gray-700 border-gray-300" 
      {...props}
    >
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/pricing" className="flex items-center gap-2">
                  <div className="flex w-[30px] h-[30px] aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Image src={"/logo-ico.png"} alt="logo" width={30} height={30} className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      Udinmo
                    </span>
                    <span className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-bold text-black">
                      PRO
                    </span>
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                Upgrade your plan
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        <NavMain />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
