import Footer from "@/components/footer/footer"
import Header from "@/components/header"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Pricing - Udinmo',
	description: 'Where imagination takes flight.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className="bg-gray-100 text-gray-900">
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
