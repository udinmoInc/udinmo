"use client"

import './globals.css'
import Preload from '@/components/loader/preload'
import { Toaster } from '@/components/ui/sonner'
import GlobalNetworkError from '@/components/errorHandlers/globalNetworkHandler'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/lib/aplloclient'






export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body>
            <Toaster richColors/>
                <Preload/>
                <ApolloProvider client={client}>
                    {children}


                    <GlobalNetworkError />
                </ApolloProvider>
            </body>
        </html>
    )
}