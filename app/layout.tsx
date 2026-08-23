import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  // Ditetapkan agar semua path gambar/link otomatis menggunakan domain absolut
  metadataBase: new URL('https://nusar.vercel.app'),
  title: 'NusAR | Explore, Learn, Imagine',
  description: 'An immersive AR/VR learning experience for curious explorers.',
  generator: 'NusAR',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'NusAR | Explore, Learn, Imagine',
    description: 'An immersive AR/VR learning experience for curious explorers.',
    url: 'https://nusar.vercel.app',
    siteName: 'NusAR',
    images: [
      {
        url: '/apple-icon.png', // Bisa diganti dengan /og-image.png jika kamu ada gambar banner khusus
        width: 1200,
        height: 630,
        alt: 'NusAR Preview Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NusAR | Explore, Learn, Imagine',
    description: 'An immersive AR/VR learning experience for curious explorers.',
    images: ['/apple-icon.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#fffdfa',
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}