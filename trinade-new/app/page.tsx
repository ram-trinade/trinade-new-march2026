import type { Metadata } from 'next'
import HomePageClient from '@/components/homepage-client'

export const metadata: Metadata = {
  title: 'Trinade Solutions - Innovative AI Technology for Healthcare & Enterprise',
  description: 'Leading provider of AI-powered solutions for healthcare, legal, finance, and enterprise sectors. Transforming industries with intelligent automation, predictive analytics, and cutting-edge technology.',
  keywords: 'AI solutions, healthcare technology, legal tech, fintech, enterprise AI, intelligent automation, Trinade Solutions',
  openGraph: {
    title: 'Trinade Solutions - Innovative AI Technology',
    description: 'Leading AI solutions for healthcare, legal, finance, and enterprise sectors.',
    url: '/',
    siteName: 'Trinade Solutions',
    images: [
      {
        url: '/og-home.png',
        width: 1200,
        height: 630,
        alt: 'Trinade Solutions - AI Innovation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trinade Solutions - Innovative AI Technology',
    description: 'Leading AI solutions for multiple sectors.',
    images: ['/og-home.png'],
  },
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  return <HomePageClient />
}
