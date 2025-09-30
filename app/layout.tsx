import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "TripKatha",
  description: "Track trips, discover hidden gems, and stay safe while traveling",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
        <div id="deployment-f0a195a0-bea4-4654-8a2a-c04826a90f7f"></div>
        <Script 
          src="https://studio.pickaxe.co/api/embed/bundle.js" 
          strategy="afterInteractive" 
        />
      </body>
    </html>
  )
}
