import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { Separator } from "@radix-ui/react-separator";
import { Bell, HelpCircle, FileText, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import PathName from "@/components/global/dir";
import { ThemeProvider } from "@/components/global/themeProvider";
import { ModeToggle } from "@/components/global/toggle";

import SearchBar from "@/components/search/searchComponet";
import { UserButton } from "@/components/global/userButton";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = {
    name: data.user?.user_metadata.full_name || data.user?.email || "Unknown User",
    email: data.user?.email ?? "",
    avatar: data.user?.user_metadata.avatar_url ?? "",
  };
  

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-light-body dark:bg-[#0A0A0A]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
              <header className="flex h-10 shrink-0 items-center gap-1 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-10 border-b border-gray-300 dark:border-gray-700 bg-light-header dark:bg-[#090909]">
                <div className="flex items-center gap-1 px-3 w-full">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-1 h-3" />

                  <div className="flex-1">
                    <PathName />
                  </div>

                  <div className="ml-auto flex items-center gap-2 w-full justify-end">
                    <div className="cursor-pointer transform transition duration-300 hover:scale-95 hover:text-gray-600 relative group" title="Notifications">
                      <Bell className="w-3.5 h-3.5 text-gray-600 dark:text-white" />
                      <div className="absolute inset-0 bg-gray-300 opacity-0 group-hover:opacity-50 rounded-full transition-all duration-500 scale-0 group-hover:scale-150"></div>
                    </div>

                    <a href="https://docs.udinmo.com" target="_blank" rel="noopener noreferrer" title="Documents">
  <div className="cursor-pointer transform transition duration-300 hover:scale-95 hover:text-gray-600 relative group">
    <FileText className="w-3.5 h-3.5 text-gray-600 dark:text-white" />
    <div className="absolute inset-0 bg-gray-300 opacity-0 group-hover:opacity-50 rounded-full transition-all duration-500 scale-0 group-hover:scale-150"></div>
  </div>
</a>

<a href="https://helpdesk.udinmo.net.in" target="_blank" rel="noopener noreferrer" title="Help">
  <div className="cursor-pointer transform transition duration-300 hover:scale-95 hover:text-gray-600 relative group">
    <HelpCircle className="w-3.5 h-3.5 text-gray-600 dark:text-white" />
    <div className="absolute inset-0 bg-gray-300 opacity-0 group-hover:opacity-50 rounded-full transition-all duration-500 scale-0 group-hover:scale-150"></div>
  </div>
</a>


                    <ModeToggle /> 

                   <SearchBar/>
                    <UserButton user={user} />
                  </div>
                </div>
              </header>

              <main className="flex flex-1 flex-col gap-3 p-3 pt-0 bg-light-body dark:bg-[#0a0a0a]">
              {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
