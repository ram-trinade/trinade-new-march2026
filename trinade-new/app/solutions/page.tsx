'use client'

import dynamic from 'next/dynamic'
const PremiumCursor = dynamic(() => import('@/components/premium-cursor'), { ssr: false })
const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'), { ssr: false })
const SolutionsNavbar = dynamic(() => import('@/components/solutions-navbar'), { ssr: false })
const SolutionsContent = dynamic(() => import('@/components/solutions-content'), { ssr: false })
const SolutionsCookiePopup = dynamic(() => import('@/components/solutions-cookie-popup'), { ssr: false })

export default function SolutionsPage() {
  return (
    <>
      <style>{`
        .solutions-page, .solutions-page * { cursor: none !important; }
      `}</style>
      <div className="solutions-page relative bg-[#e8e4de]">
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
