'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
const PreloaderAnimation = dynamic(() => import('@/components/preloader-animation'), { ssr: false })
const PremiumCursor = dynamic(() => import('@/components/premium-cursor'), { ssr: false })
const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'), { ssr: false })
const SolutionsNavbar = dynamic(() => import('@/components/solutions-navbar'), { ssr: false })
const HomepageContent = dynamic(() => import('@/components/homepage-content'), { ssr: false })
const SolutionsFooter = dynamic(() => import('@/components/solutions-footer'), { ssr: false })
const SolutionsCookiePopup = dynamic(() => import('@/components/solutions-cookie-popup'), { ssr: false })

export default function HomePage() {
  const [showPreloader, setShowPreloader] = useState(false)

  useEffect(() => {
    try {
      if (!sessionStorage.getItem('trinade-preloader-seen')) {
        setShowPreloader(true)
      }
    } catch {
      // sessionStorage unavailable — skip preloader
    }
  }, [])

  return (
    <>
      <style>{`
        .solutions-page, .solutions-page * { cursor: none !important; }
      `}</style>
      {showPreloader && <PreloaderAnimation />}
      <div className="solutions-page relative bg-[#e8e4de]">
        <PremiumCursor />
        <SolutionsNavbar />
        <SmoothScroll>
          <HomepageContent />
          <SolutionsFooter />
        </SmoothScroll>
        <SolutionsCookiePopup />
      </div>
    </>
  )
}
