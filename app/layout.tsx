import type { Metadata, Viewport } from 'next'
import { Geist, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Chatbot } from '@/components/Chatbot'
import { CartCatalogSync } from '@/components/CartCatalogSync'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'HP Verse - Premium Smartphone Dealership',
  description: 'Discover premium smartphones with expert consultation and white-glove service at HP Verse',
  generator: 'v0.app',
  icons: {
    icon: '/assets/icons/favicon.ico',
    apple: '/assets/icons/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#2a2a2a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'light dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <CartCatalogSync />
        {children}
        <Chatbot />
        <Analytics />
      </body>
    </html>
  )
}
