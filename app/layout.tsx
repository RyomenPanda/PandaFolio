import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Press_Start_2P } from "next/font/google"
import "./globals.css"

const pressStart = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-press" })

export const metadata: Metadata = {
  title: 'Pandafolio',
  description: 'Ryomenpanda\'s Personal Portfolio',
  generator: 'ryomenpanda',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${pressStart.variable}`}>
      <body>{children}</body>
    </html>
  )
}
