'use client'

import dynamic from 'next/dynamic'

const SleepAlertContent = dynamic(() => import('@/components/sleep-alert-content'), {
  loading: () => <div style={{ minHeight: '100svh', background: '#0a0a0a' }} />,
})
const PremiumCursor = dynamic(() => import('@/components/premium-cursor'), { ssr: false })
const SolutionsNavbar = dynamic(() => import('@/components/solutions-navbar'))
const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'))
const SolutionsFooter = dynamic(() => import('@/components/solutions-footer'))
const SolutionsCookiePopup = dynamic(() => import('@/components/solutions-cookie-popup'))

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
