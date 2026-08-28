import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { UserProvider } from './context/UserContext' // <-- Import Provider

export const metadata: Metadata = {
  title: 'NusAR | Explore, Learn, Imagine',
  description: 'An immersive AR/VR learning experience for curious explorers.',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'NusAR | Explore, Learn, Imagine',
    description: 'An immersive AR/VR learning experience for curious explorers.',
    url: 'https://nusar.vercel.app',
    siteName: 'NusAR',
    images: [
      {
        url: 'https://nusar.vercel.app/icon.png',
        width: 1200,
        height: 630,
        alt: 'NusAR Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NusAR | Explore, Learn, Imagine',
    description: 'An immersive AR/VR learning experience for curious explorers.',
    images: ['https://nusar.vercel.app/icon.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#fffdfa',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Bungkus aplikasi dengan UserProvider agar state bisa diakses global */}
        <UserProvider>
          {children}
        </UserProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}