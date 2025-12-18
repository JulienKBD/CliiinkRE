import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header, Footer } from '../components/layout'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Cliiink Réunion - Triez, Gagnez, Préservez',
    template: '%s | Cliiink Réunion',
  },
  description: 'Cliiink Réunion : le dispositif de tri du verre qui vous récompense. Trouvez une borne, déposez vos bouteilles et gagnez des avantages chez nos partenaires réunionnais.',
  keywords: ['cliiink', 'réunion', 'tri', 'verre', 'recyclage', 'récompenses', 'écologie', 'partenaires', 'bornes'],
  authors: [{ name: 'Cliiink Réunion' }],
  creator: 'Cliiink Réunion',
  publisher: 'Cliiink Réunion',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/',
    siteName: 'Cliiink Réunion',
    title: 'Cliiink Réunion - Triez, Gagnez, Préservez',
    description: 'Le dispositif de tri du verre qui vous récompense à La Réunion',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cliiink Réunion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cliiink Réunion - Triez, Gagnez, Préservez',
    description: 'Le dispositif de tri du verre qui vous récompense à La Réunion',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2D8B4E" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
