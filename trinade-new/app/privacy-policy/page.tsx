import type { Metadata } from 'next'
import PrivacyPolicyPageClient from '@/components/privacy-policy-page-client'

export const metadata: Metadata = {
  title: 'Privacy Policy | Trinade Solutions',
  description: 'Learn how Trinade Solutions protects your privacy and handles your data. Our comprehensive privacy policy covers data collection, usage, and security measures.',
  keywords: 'privacy policy, data protection, privacy rights, data security, Trinade Solutions',
  openGraph: {
    title: 'Privacy Policy',
    description: 'Privacy policy and data protection information for Trinade Solutions.',
    url: '/privacy-policy',
    siteName: 'Trinade Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy',
    description: 'Privacy policy for Trinade Solutions.',
  },
  alternates: {
    canonical: '/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyPageClient />
}
