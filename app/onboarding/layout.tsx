import { Toaster } from "@/components/ui/sonner"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-black"> 
        
    
    
              <Toaster/>
              {children}
       
         
      </body>
    </html>
  )
}
