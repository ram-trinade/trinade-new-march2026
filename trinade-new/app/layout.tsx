import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import ClientLayout from '@/components/client-layout'

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Trinade AI Technologies | Intelligent Solutions, Delivered Confidently',
  description:
    'From intelligent products to enterprise services — engineered thoughtfully, delivered confidently, everywhere it ships.',
  metadataBase: new URL('https://trinade.ai'),
  alternates: {
    canonical: 'https://trinade.ai',
    languages: {
      'en-US': '/en-US',
      'hi-IN': '/hi-IN',
      'ar-AE': '/ar-AE',
      'es-419': '/es-419',
    },
  },
  openGraph: {
    title: 'Trinade AI Technologies | Intelligent Solutions, Delivered Confidently',
    description:
      'From intelligent products to enterprise services — engineered thoughtfully, delivered confidently, everywhere it ships.',
    url: 'https://trinade.ai',
    siteName: 'Trinade AI Technologies',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://trinade.ai/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Trinade AI Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trinade AI Technologies | Intelligent Solutions, Delivered Confidently',
    description:
      'From intelligent products to enterprise services — engineered thoughtfully, delivered confidently, everywhere it ships.',
    images: ['https://trinade.ai/og-image.png'],
    site: '@trinadeai',
    creator: '@trinadeai',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <body>
        <script
          id="trinade-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Trinade AI Technologies',
              url: 'https://trinade.ai',
              logo: 'https://trinade.ai/logo.png',
              sameAs: [
                'https://www.linkedin.com/company/trinade',
                'https://www.instagram.com/trinade',
                'https://www.facebook.com/trinade',
              ],
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: '+91-1234-567-890',
                  contactType: 'customer service',
                  areaServed: 'GLOBAL',
                  availableLanguage: ['English', 'Hindi', 'Arabic', 'Spanish'],
                },
              ],
            }),
          }}
        />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
