import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from "@/component/navbar/NavbarComponent";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Vercel Dashboard Clone',
    description: 'A clone of the Vercel dashboard using Next.js and Tailwind CSS',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow">
                {children}
            </main>
        </div>
        </body>
        </html>
    )
}