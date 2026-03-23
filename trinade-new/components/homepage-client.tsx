'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const PreloaderAnimation = dynamic(() => import('@/components/preloader-animation'), { ssr: false })
const PremiumCursor = dynamic(() => import('@/components/premium-cursor'), { ssr: false })
const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'), { ssr: false })
const SolutionsNavbar = dynamic(() => import('@/components/solutions-navbar'), { ssr: false })
const HomepageContent = dynamic(() => import('@/components/homepage-content'), { ssr: false })
const SolutionsFooter = dynamic(() => import('@/components/solutions-footer'), { ssr: false })
const SolutionsCookiePopup = dynamic(() => import('@/components/solutions-cookie-popup'), { ssr: false })

export default function HomePageClient() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  return (
    <>
      <style>{`
        .solutions-page, .solutions-page * { cursor: none !important; }
      `}</style>

      {/* SSR dark overlay — renders immediately in HTML, covers cream body bg.
          Sits below preloader (z-10001) but above content. Removed when preloader finishes.
          This is a normal React element = no hydration mismatch. */}
      {!preloaderDone && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9998,
            background: 'linear-gradient(135deg, #0d0b08 0%, #1c160d 20%, #0f0d0a 40%, #201811 60%, #150f08 80%, #0d0b08 100%)',
            pointerEvents: 'none',
          }}
        />
      )}

      <PreloaderAnimation onComplete={() => setPreloaderDone(true)} />
      <div
        className="solutions-page relative bg-[#e8e4de]"
        style={{
          opacity: preloaderDone ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        <PremiumCursor />
        <SolutionsNavbar />
        <SmoothScroll>
          <HomepageContent />
          <SolutionsFooter />
        </SmoothScroll>
        {preloaderDone && <SolutionsCookiePopup />}
      </div>
    </>
  )
}