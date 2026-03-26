import type { Metadata } from 'next'
import CompanyPageClient from '@/components/company-page-client'

export const metadata: Metadata = {
  title: 'About Us - Leading AI Innovation Company | Trinade Solutions',
  description: 'Learn about Trinade Solutions, a pioneering company in AI technology. Our mission is to deliver intelligent solutions that transform industries and create lasting value for our clients.',
  keywords: 'about Trinade, AI company, technology innovation, company mission, team, values, Trinade Solutions',
  openGraph: {
    title: 'About Us - Leading AI Innovation Company',
    description: 'Pioneering AI technology company transforming industries with intelligent solutions.',
    url: '/company',
    siteName: 'Trinade Solutions',
    images: [
      {
        url: '/og-company.png',
        width: 1200,
        height: 630,
        alt: 'Trinade Solutions - About Us',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Leading AI Innovation Company',
    description: 'Pioneering AI technology company transforming industries.',
    images: ['/og-company.png'],
  },
  alternates: {
    canonical: '/company',
  },
}

export default function CompanyPage() {
  return <CompanyPageClient />
}
