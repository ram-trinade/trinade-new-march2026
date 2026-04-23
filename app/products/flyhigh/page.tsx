'use client'

import dynamic from 'next/dynamic'

const FlyHighContent = dynamic(() => import('@/components/flyhigh-product-content'), {
  loading: () => <div style={{ minHeight: '100svh', background: '#0a0a0a' }} />,
})
const SolutionsNavbar = dynamic(() => import('@/components/solutions-navbar'))
const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'))
const PremiumCursor = dynamic(() => import('@/components/premium-cursor'), { ssr: false })
const SolutionsFooter = dynamic(() => import('@/components/solutions-footer'))
const SolutionsCookiePopup = dynamic(() => import('@/components/solutions-cookie-popup'))

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
