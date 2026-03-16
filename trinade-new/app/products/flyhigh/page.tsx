'use client'

import dynamic from 'next/dynamic'

const SolutionsNavbar = dynamic(() => import('../../../components/solutions-navbar'), { ssr: false })
const SolutionsFooter = dynamic(() => import('../../../components/solutions-footer'), { ssr: false })
const SolutionsCookiePopup = dynamic(() => import('../../../components/solutions-cookie-popup'), { ssr: false })
const PremiumCursor = dynamic(() => import('../../../components/premium-cursor'), { ssr: false })
const SmoothScroll = dynamic(() => import('../../../components/smooth-scroll'), { ssr: false })
const FlyHighContent = dynamic(() => import('../../../components/flyhigh-content'), { ssr: false })

export default function FlyHighPage() {
  return (
    <div className="solutions-page">
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
