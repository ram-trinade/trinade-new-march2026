'use client'

import dynamic from 'next/dynamic'

const FlyHighContent = dynamic(() => import('@/components/flyhigh-product-content'), { ssr: false })
const SolutionsNavbar = dynamic(() => import('@/components/solutions-navbar'), { ssr: false })
const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'), { ssr: false })
const PremiumCursor = dynamic(() => import('@/components/premium-cursor'), { ssr: false })
const SolutionsFooter = dynamic(() => import('@/components/solutions-footer'), { ssr: false })
const SolutionsCookiePopup = dynamic(() => import('@/components/solutions-cookie-popup'), { ssr: false })

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
