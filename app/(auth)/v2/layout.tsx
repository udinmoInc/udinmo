import { Toaster } from "@/components/ui/sonner"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-black"> 
        
    
           
            <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <Toaster/>
              {children}
            </main>
         
      </body>
    </html>
  )
}
