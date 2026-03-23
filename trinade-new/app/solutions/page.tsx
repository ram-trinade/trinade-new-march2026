import type { Metadata } from 'next'
import SolutionsPageClient from '@/components/solutions-page-client'

export const metadata: Metadata = {
  title: 'AI Solutions & Technology Services | Trinade Solutions',
  description: 'Discover our comprehensive AI-powered solutions across healthcare, legal, finance, and enterprise sectors. Custom-built intelligent systems that transform workflows and drive innovation.',
  keywords: 'AI solutions, artificial intelligence, healthcare AI, legal tech, fintech, enterprise solutions, Trinade Solutions',
  openGraph: {
    title: 'AI Solutions & Technology Services',
    description: 'Comprehensive AI-powered solutions for healthcare, legal, finance, and enterprise sectors.',
    url: 'https://trinade.com/solutions',
    siteName: 'Trinade Solutions',
    images: [
      {
        url: 'https://trinade.com/og-solutions.png',
        width: 1200,
        height: 630,
        alt: 'Trinade AI Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Solutions & Technology Services',
    description: 'Comprehensive AI-powered solutions across multiple sectors.',
    images: ['https://trinade.com/og-solutions.png'],
  },
  alternates: {
    canonical: 'https://trinade.com/solutions',
  },
}

export default function SolutionsPage() {
  return <SolutionsPageClient />
}
