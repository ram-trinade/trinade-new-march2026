import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const SleepAlertContent = dynamic(() => import('@/components/sleep-alert-content'))
const PremiumCursor = dynamic(() => import('@/components/premium-cursor'))
const SolutionsNavbar = dynamic(() => import('@/components/solutions-navbar'))
const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'))
const SolutionsFooter = dynamic(() => import('@/components/solutions-footer'))
const SolutionsCookiePopup = dynamic(() => import('@/components/solutions-cookie-popup'))

export const metadata: Metadata = {
  title: 'Sleep Alert Device - Smart Sleep Monitoring | Trinade Solutions',
  description: 'Monitor sleep patterns and receive intelligent alerts with our Sleep Alert device. Advanced sensors track vital signs, detect irregularities, and ensure timely interventions for better health outcomes.',
  keywords: 'sleep monitoring, sleep alert device, health tracking, vital signs monitoring, Trinade Solutions',
  openGraph: {
    title: 'Sleep Alert Device - Smart Sleep Monitoring',
    description: 'Intelligent sleep monitoring device with real-time alerts and health tracking.',
    url: '/products/sleep-alert',
    siteName: 'Trinade Solutions',
    images: [
      {
        url: '/og-sleep-alert.png',
        width: 1200,
        height: 630,
        alt: 'Sleep Alert Device',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sleep Alert Device - Smart Sleep Monitoring',
    description: 'Intelligent sleep monitoring device with real-time alerts.',
    images: ['/og-sleep-alert.png'],
  },
  alternates: {
    canonical: '/products/sleep-alert',
  },
}

export default function SleepAlertPage() {
  return (
    <div className="solutions-page">
      <PremiumCursor />
      <SolutionsNavbar />
      <SmoothScroll>
        <SleepAlertContent />
        <SolutionsFooter />
      </SmoothScroll>
      <SolutionsCookiePopup />
    </div>
  )
}
