"use client"

import {
  Calendar,
  CircleHelp,
  Code2,
  Home,
  Inbox,
  Settings,
  User2,
  ChevronRight,
  Folder,
} from "lucide-react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"

const navItems = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: Folder,
  },
  {
    title: "Bookings",
    url: "/bookings",
    icon: Calendar,
  },
  {
    title: "Dev",
    url: "/dev",
    icon: Code2,
  },
  {
    title: "Documentation",
    icon: CircleHelp,
    items: [
      { title: "Introduction", url: "/docs/introduction" },
      { title: "Get Started", url: "/docs/get-started" },
      { title: "Tutorials", url: "/docs/tutorials" },
      { title: "Changelog", url: "/docs/changelog" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    items: [
      { title: "Billing", url: "/dashboard/billing" },
      { title: "Account", url: "/settings/account" },
    ],
  },
  {
    title: "Members",
    url: "/members",
    icon: User2,
  },
]

export function NavMain() {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Console</SidebarGroupLabel>
      <SidebarMenu>
        {navItems.map((item) => {
   
          const isActive = item.url ? pathname === item.url : false
          const isSubmenuActive = item.items
            ? item.items.some((sub) => pathname === sub.url)
            : false

          if (item.items) {
            return (
              <Collapsible key={item.title} defaultOpen={isSubmenuActive}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={cn(
                        "rounded-md text-sm group flex items-center p-2 transition-colors",
                        isSubmenuActive
                          ? "bg-gradient-to-r from-indigo-600 via-indigo-800 to-indigo-900 text-white"
                          : "hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-600 hover:text-white text-muted-foreground dark:hover:bg-gradient-to-r dark:hover:from-indigo-700 dark:hover:to-indigo-800 dark:text-muted-foreground transition-all duration-200 ease-in-out"
                      )}
                    >
                      {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => {
                      const isSubItemActive = pathname === subItem.url
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={cn(
                              "text-sm pl-8 justify-start transition-colors",
                              isSubItemActive
                                ? "bg-gradient-to-r from-indigo-600 via-indigo-800 to-indigo-900 text-white"
                                : "hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-600 hover:text-white dark:hover:bg-gradient-to-r dark:hover:from-indigo-700 dark:hover:to-indigo-800 text-muted-foreground dark:text-muted-foreground transition-all duration-200 ease-in-out"
                            )}
                          >
                            <Link href={subItem.url}>
                              {subItem.title}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            )
          }

          return (
            <Link href={item.url!} key={item.title}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={cn(
                    "rounded-md text-sm group flex items-center p-2 transition-colors",
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 via-indigo-800 to-indigo-900 text-white"
                      : "hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-600 hover:text-white dark:hover:bg-gradient-to-r dark:hover:from-indigo-700 dark:hover:to-indigo-800 dark:text-muted-foreground transition-all duration-200 ease-in-out"
                  )}
                >
                  {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
