import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import { SiteJsonLd } from '@/components/seo/site-json-ld'
import { getSiteUrl } from '@/lib/seo/site-config'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
})

const defaultTitle = 'Trinade AI Technologies | Intelligent Solutions, Delivered Confidently'
const defaultDescription =
  'From intelligent products to enterprise services — engineered thoughtfully, delivered confidently, everywhere it ships.'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: defaultTitle,
    template: '%s | Trinade AI Technologies',
  },
  description: defaultDescription,
  applicationName: 'Trinade AI Technologies',
  authors: [{ name: 'Trinade AI Technologies' }],
  creator: 'Trinade AI Technologies',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'Trinade AI Technologies',
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: '/logo-transparent.png',
        width: 540,
        height: 720,
        alt: 'Trinade AI Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: ['/logo-transparent.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-IN" className={manrope.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="shortcut icon" href="/icon.png" />
      </head>
      <body>
        <SiteJsonLd />
        {children}
      </body>
    </html>
  )
}
