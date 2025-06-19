import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lets eat',
  description: 'resturant menu app that list resturants with their ratings',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
