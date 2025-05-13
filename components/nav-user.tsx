"use client";

import { useState, useEffect } from "react";
import { logout } from "@/app/actions/auth-actions";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";


const getInitial = (name: string | undefined, email: string): string => {
  return name?.charAt(0).toUpperCase() || email.charAt(0).toUpperCase();
};

const getAvatarColor = (name: string | undefined, email: string) => {
  const combinedString = (name || "") + email;
  const hash = Array.from(combinedString).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );
  const hue = (hash * 137 + 40) % 360;
  const saturation = 70;
  const lightness = 35;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export function NavUser({
  user,
}: {
  user: {
    name?: string;
    email: string;
    avatar?: string;
  };
}) {
  const { isMobile } = useSidebar();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    if (!avatarUrl && typeof window !== "undefined") {
      const initial = getInitial(user.name, user.email);
      const color = getAvatarColor(user.name, user.email);
      const params = new URLSearchParams({ initial, color });
      const secureApiUrl = `/api/avatar?${params.toString()}`;
      setAvatarUrl(secureApiUrl);
    }
  }, [user.name, user.email, avatarUrl]);

  const displayName = user.name || user.email;
  const displayInitial = getInitial(user.name, user.email);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="bg-muted/50 rounded-lg p-4 flex items-center gap-3 transition-all hover:bg-muted dark:hover:bg-muted-800"
            >
              <Avatar className="h-8 w-8 rounded-full overflow-hidden">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt={displayName} />
                ) : (
                  <AvatarFallback>{displayInitial}</AvatarFallback>
                )}
              </Avatar>
              <div className="flex flex-col text-left overflow-hidden">
                <span className="font-semibold text-sm truncate">{displayName}</span>
                <span className="text-xs text-muted-foreground truncate">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-white dark:bg-[#0a0a0a]"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-4">
              <div className="flex flex-col items-center text-center space-y-2 overflow-hidden">
                <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt={displayName} />
                  ) : (
                    <AvatarFallback>{displayInitial}</AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col items-center max-w-[200px] overflow-hidden">
                  <span className="font-semibold text-sm truncate w-full">
                    {displayName}
                  </span>
                  <span className="text-[10px] text-muted-foreground truncate w-full">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck className="mr-2 h-4 w-4" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
