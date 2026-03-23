import type { Metadata } from 'next'
import ContactPageClient from '@/components/contact-page-client'

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch with Trinade Solutions | AI Technology Experts',
  description: 'Ready to transform your business with AI? Contact Trinade Solutions for innovative technology solutions. Reach out to our expert team for consultations and partnerships.',
  keywords: 'contact Trinade, AI solutions, technology consultation, business partnership, Trinade Solutions contact',
  openGraph: {
    title: 'Contact Us - Get in Touch with Trinade Solutions',
    description: 'Ready to transform your business with AI? Contact our expert team for innovative technology solutions.',
    url: 'https://trinade.com/contact',
    siteName: 'Trinade Solutions',
    images: [
      {
        url: 'https://trinade.com/og-contact.png',
        width: 1200,
        height: 630,
        alt: 'Contact Trinade Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Get in Touch with Trinade Solutions',
    description: 'Ready to transform your business with AI? Contact our expert team.',
    images: ['https://trinade.com/og-contact.png'],
  },
  alternates: {
    canonical: 'https://trinade.com/contact',
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
