'use client'

import dynamic from 'next/dynamic'
const PremiumCursor = dynamic(() => import('@/components/premium-cursor'), { ssr: false })
const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'), { ssr: false })
const SolutionsNavbar = dynamic(() => import('@/components/solutions-navbar'), { ssr: false })
const SolutionsContent = dynamic(() => import('@/components/solutions-content'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '100svh', background: '#f2ede6' }} />,
})
const SolutionsCookiePopup = dynamic(() => import('@/components/solutions-cookie-popup'), { ssr: false })

export default function SolutionsPage() {
  return (
    <>
      <div className="solutions-page relative bg-[#f2ede6]">
        <PremiumCursor />
        <SolutionsNavbar />
        <SmoothScroll>
          <SolutionsContent />
        </SmoothScroll>
        <SolutionsCookiePopup />
      </div>
    </>
  )
}
