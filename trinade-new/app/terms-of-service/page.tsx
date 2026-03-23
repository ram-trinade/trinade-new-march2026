import type { Metadata } from 'next'
import TermsOfServicePageClient from '@/components/terms-of-service-page-client'

export const metadata: Metadata = {
  title: 'Terms of Service | Trinade Solutions',
  description: 'Read our terms of service and usage agreement. Understand the conditions for using Trinade Solutions\' AI technology services and platforms.',
  keywords: 'terms of service, usage agreement, legal terms, Trinade Solutions',
  openGraph: {
    title: 'Terms of Service',
    description: 'Terms of service and usage agreement for Trinade Solutions.',
    url: 'https://trinade.com/terms-of-service',
    siteName: 'Trinade Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service',
    description: 'Terms of service for Trinade Solutions.',
  },
  alternates: {
    canonical: 'https://trinade.com/terms-of-service',
  },
}

export default function TermsOfServicePage() {
  return <TermsOfServicePageClient />
}
