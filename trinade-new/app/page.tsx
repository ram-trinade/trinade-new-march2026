'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'

const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'), {
  ssr: false,
})
const SolutionsNavbar = dynamic(
  () => import('@/components/solutions-navbar'),
  { ssr: false }
)
const SolutionsContent = dynamic(
  () => import('@/components/solutions-content'),
  { ssr: false }
)
const SolutionsCookiePopup = dynamic(
  () => import('@/components/solutions-cookie-popup'),
  { ssr: false }
)

// ─── Premium Cursor with delay + inversion + liquid glass hover ───
const BASE_SIZE = 20
const HOVER_SIZE = 50

function PremiumCursor() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let currentSize = BASE_SIZE
    let targetSize = BASE_SIZE
    let rafId: number

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const onOverInteractive = (e: Event) => {
      const el = e.target as HTMLElement
      if (!el) return
      const tag = el.tagName.toLowerCase()
      const isInteractive =
        tag === 'button' ||
        tag === 'a' ||
        tag === 'select' ||
        tag === 'input' ||
        tag === 'textarea' ||
        el.getAttribute('role') === 'button' ||
        el.closest('button') ||
        el.closest('a')
      if (isInteractive) targetSize = HOVER_SIZE
    }

    const onOutInteractive = () => {
      targetSize = BASE_SIZE
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12
      currentSize += (targetSize - currentSize) * 0.15
      if (dotRef.current) {
        dotRef.current.style.left = `${currentX}px`
        dotRef.current.style.top = `${currentY}px`
        dotRef.current.style.width = `${currentSize}px`
        dotRef.current.style.height = `${currentSize}px`
      }
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOverInteractive)
    document.addEventListener('mouseout', onOutInteractive)
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOverInteractive)
      document.removeEventListener('mouseout', onOutInteractive)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      className="fixed rounded-full pointer-events-none z-[99999]"
      style={{
        width: BASE_SIZE,
        height: BASE_SIZE,
        background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.95), rgba(255,255,255,0.7))',
        mixBlendMode: 'difference',
        transform: 'translate(-50%, -50%)',
        willChange: 'left, top, width, height',
        boxShadow: '0 0 8px rgba(255,255,255,0.3), inset 0 1px 2px rgba(255,255,255,0.4)',
      }}
    />
  )
}

export default function ExperimentalSolutionsPage() {
  return (
    <>
      {/* Hide default cursor across all elements on this page */}
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
