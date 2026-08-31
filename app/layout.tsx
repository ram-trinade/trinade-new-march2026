import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import { SiteJsonLd } from '@/components/seo/site-json-ld'
import { absoluteUrl, getSiteUrl } from '@/lib/seo/site-config'
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
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  keywords: [
    'Trinade AI Technologies',
    'AI solutions',
    'enterprise AI services',
    'AI products',
    'predictive intelligence',
    'intelligent automation',
    'AI healthcare',
    'AI financial services',
    'AI manufacturing',
    'secure AI infrastructure',
  ],
  category: 'technology',
  referrer: 'origin-when-cross-origin',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: absoluteUrl('/'),
    siteName: 'Trinade AI Technologies',
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: absoluteUrl('/logo-transparent.png'),
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
    images: [absoluteUrl('/logo-transparent.png')],
  },
  other: {
    bingbot: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    gptbot: 'index, follow',
    perplexitybot: 'index, follow',
    claudebot: 'index, follow',
    google: 'notranslate',
    'msapplication-TileColor': '#1a1a1e',
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
        <link rel="icon" href="/32x32-gold.png" />
        <link rel="apple-touch-icon" href="/32x32-gold.png" />
        <link rel="shortcut icon" href="/32x32-gold.png" />
      </head>
      <body>
        <SiteJsonLd />
        {children}
      </body>
    </html>
  )
}
