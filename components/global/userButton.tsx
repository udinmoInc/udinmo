"use client";

import { useState, useEffect } from "react";
import { logout } from "@/app/actions/auth-actions";
import {
    BadgeCheck,
    Bell,
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

export function UserButton({
    user,
}: {
    user: {
        name: string;
        email: string;
        avatar?: string;
    };
}) {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(user.avatar || null);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    useEffect(() => {
        if (!user.avatar && typeof window !== "undefined") {
            const initial = getInitial(user.name, user.email);
            const color = getAvatarColor(user.name, user.email);
            const params = new URLSearchParams({ initial, color });
            const secureApiUrl = `/api/avatar?${params.toString()}`;
            setAvatarUrl(secureApiUrl);
        }
    }, [user.name, user.email, user.avatar]);


    const displayName = user.name || user.email;
    const displayInitial = getInitial(user.name, user.email);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition text-sm">
                    <Avatar className="h-6 w-6 rounded-full overflow-hidden">
                        {avatarUrl ? (
                            <AvatarImage src={avatarUrl} alt={displayName} />
                        ) : (
                            <AvatarFallback>{displayInitial}</AvatarFallback>
                        )}
                    </Avatar>
                    <span className="hidden md:block font-medium truncate max-w-[100px]">
                        {displayName}
                    </span>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-white dark:bg-[#0a0a0a]"
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
                            <span className="font-semibold text-sm truncate w-full">{displayName}</span>
                            <span className="text-[10px] text-muted-foreground truncate w-full">{user.email}</span>
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
    );
}
