import type { Metadata } from "next"
import { Inter, Oswald, Space_Grotesk } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "@/components/ui/sonner"
import { Providers } from "@/components/providers"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
})

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "LINKED.AI - LinkedIn Content Creation Platform",
  description: "The Ultimate LinkedIn Growth Engine",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} ${oswald.variable} ${spaceGrotesk.variable} antialiased font-inter`}>
          <Providers>
            {children}
            <Toaster richColors position="top-right" />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}