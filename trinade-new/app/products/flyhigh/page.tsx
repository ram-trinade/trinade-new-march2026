import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const FlyHighContent = dynamic(() => import('@/components/flyhigh-product-content'))
const SolutionsNavbar = dynamic(() => import('@/components/solutions-navbar'))
const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'))
const PremiumCursor = dynamic(() => import('@/components/premium-cursor'))
const SolutionsFooter = dynamic(() => import('@/components/solutions-footer'))
const SolutionsCookiePopup = dynamic(() => import('@/components/solutions-cookie-popup'))

export const metadata: Metadata = {
  title: 'FlyHigh - AI-Powered Drone Technology | Trinade Solutions',
  description: 'Experience the future of aerial surveillance with FlyHigh, our advanced AI-powered drone system. Featuring autonomous flight, real-time analytics, and military-grade security for critical operations.',
  keywords: 'drone technology, AI drones, aerial surveillance, autonomous flight, Trinade Solutions',
  openGraph: {
    title: 'FlyHigh - AI-Powered Drone Technology',
    description: 'Advanced AI-powered drone system for autonomous aerial surveillance and analytics.',
    url: 'https://trinade.com/products/flyhigh',
    siteName: 'Trinade Solutions',
    images: [
      {
        url: 'https://trinade.com/og-flyhigh.png',
        width: 1200,
        height: 630,
        alt: 'FlyHigh Drone Technology',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlyHigh - AI-Powered Drone Technology',
    description: 'Advanced AI-powered drone system for autonomous aerial surveillance.',
    images: ['https://trinade.com/og-flyhigh.png'],
  },
  alternates: {
    canonical: 'https://trinade.com/products/flyhigh',
  },
}

export default function FlyHighPage() {
  return (
    <div className="solutions-page" data-dark-section>
      <PremiumCursor />
      <SolutionsNavbar />
      <SmoothScroll>
        <FlyHighContent />
        <SolutionsFooter />
      </SmoothScroll>
      <SolutionsCookiePopup />
    </div>
  )
}
