import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import { SiteJsonLd } from '@/components/seo/site-json-ld'
import {
  absoluteUrl,
  getSiteUrl,
  isProductionDeployment,
} from '@/lib/seo/site-config'
import {
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_PATH,
  OG_IMAGE_WIDTH,
} from '@/lib/seo/page-metadata'
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

// Emit robots: noindex/nofollow on preview and development deployments so
// Vercel preview URLs do not accumulate in Google's index and compete with
// the production canonical. Only the real production deploy carries an
// index directive. See isProductionDeployment() in lib/seo/site-config.ts.
const shouldIndex = isProductionDeployment()

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
  // Icons field is the single source of truth for favicons and touch icons.
  // Next emits the correct <link> tags automatically — do not hand-roll
  // <link rel="icon"> in the layout <head>, which would duplicate output.
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  robots: shouldIndex
    ? {
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
      }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
          noimageindex: true,
        },
      },
  // `keywords` meta removed — Google stopped using it in 2009, Bing in
  // 2014. It neither helps ranking nor AI-search visibility. Organization
  // knowsAbout (in SiteJsonLd) is the modern, honored equivalent.
  category: 'technology',
  referrer: 'origin-when-cross-origin',
  alternates: {
    canonical: '/',
    types: {
      // Advertise the RSS feed so AI pipelines (which consume RSS
      // aggressively for blog freshness) can find it without guessing
      // the URL. Also lets browser feed-readers auto-discover.
      'application/rss+xml': '/feed.xml',
    },
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
        url: absoluteUrl(OG_IMAGE_PATH),
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: [absoluteUrl(OG_IMAGE_PATH)],
  },
  // bingbot / gptbot / perplexitybot / claudebot meta tags are intentionally
  // omitted. None of those crawlers read per-agent <meta name=""> tags — they
  // all respect only robots.txt (which app/robots.ts already allows). The
  // standard <meta name="robots"> above covers Bing, Google, and general
  // SERP-facing crawlers. The `google: 'notranslate'` tag stays because it
  // is a genuine Google-specific hint.
  other: {
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
      <body>
        <SiteJsonLd />
        {children}
      </body>
    </html>
  )
}
