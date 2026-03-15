'use client'

import { useEffect, useRef } from 'react'

// ─── Premium Dual-Dot Cursor with liquid glass hover ───
const SMALL_DOT = 8
const LARGE_DOT = 20
const HOVER_RING = 46

export default function PremiumCursor() {
  const smallRef = useRef<HTMLDivElement>(null)
  const largeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let targetX = 0
    let targetY = 0
    // Small dot tracks fast (nearly 1:1)
    let smallX = 0
    let smallY = 0
    // Large dot trails behind
    let largeX = 0
    let largeY = 0
    let currentLargeSize = LARGE_DOT
    let targetLargeSize = LARGE_DOT
    let isHovering = false
    let rafId: number

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    // Track which interactive element the mouse is over (if any)
    let pendingHoverEl: HTMLElement | null = null

    const onOverInteractive = (e: Event) => {
      const el = e.target as HTMLElement
      if (!el) return
      const tag = el.tagName.toLowerCase()
      const interactive =
        tag === 'button' ||
        tag === 'a' ||
        tag === 'select' ||
        tag === 'input' ||
        tag === 'textarea' ||
        el.getAttribute('role') === 'button' ||
        el.closest('button') ||
        el.closest('a')
      if (interactive) {
        // Store the element — don't activate hover yet.
        // The tick loop will activate when the large dot arrives.
        pendingHoverEl = (el.closest('button') || el.closest('a') || el) as HTMLElement
      }
    }

    const onOutInteractive = () => {
      pendingHoverEl = null
      targetLargeSize = LARGE_DOT
      isHovering = false
    }

    const tick = () => {
      // Small dot: fast lerp (0.35) — stays close to cursor
      smallX += (targetX - smallX) * 0.35
      smallY += (targetY - smallY) * 0.35

      // Large dot: slower lerp (0.1) — trails elegantly
      largeX += (targetX - largeX) * 0.1
      largeY += (targetY - largeY) * 0.1

      // Check if the LARGE dot has reached the interactive element
      // Only then activate hover state
      if (pendingHoverEl && !isHovering) {
        const rect = pendingHoverEl.getBoundingClientRect()
        // Check if large dot center is within (or very close to) the element bounds
        const margin = 8
        if (
          largeX >= rect.left - margin &&
          largeX <= rect.right + margin &&
          largeY >= rect.top - margin &&
          largeY <= rect.bottom + margin
        ) {
          isHovering = true
          targetLargeSize = HOVER_RING
        }
      }

      // Size transitions
      currentLargeSize += (targetLargeSize - currentLargeSize) * 0.12

      if (smallRef.current) {
        smallRef.current.style.left = `${smallX}px`
        smallRef.current.style.top = `${smallY}px`
        // Small dot shrinks on hover
        const sDot = isHovering ? 0 : SMALL_DOT
        smallRef.current.style.width = `${sDot}px`
        smallRef.current.style.height = `${sDot}px`
        smallRef.current.style.opacity = isHovering ? '0' : '1'
      }

      if (largeRef.current) {
        largeRef.current.style.left = `${largeX}px`
        largeRef.current.style.top = `${largeY}px`
        largeRef.current.style.width = `${currentLargeSize}px`
        largeRef.current.style.height = `${currentLargeSize}px`

        if (isHovering) {
          // Brown gold liquid glass outlined ring — fully see-through
          largeRef.current.style.background = 'transparent'
          largeRef.current.style.border = '1.5px solid rgba(201,168,110,0.7)'
          largeRef.current.style.boxShadow =
            '0 0 16px rgba(201,168,110,0.12), 0 0 32px rgba(201,168,110,0.04), inset 0 0 8px rgba(201,168,110,0.06)'
          largeRef.current.style.backdropFilter = 'none'
        } else {
          // Default: solid trailing dot
          largeRef.current.style.background =
            'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.85), rgba(255,255,255,0.55))'
          largeRef.current.style.border = 'none'
          largeRef.current.style.boxShadow =
            '0 0 6px rgba(255,255,255,0.2), inset 0 1px 2px rgba(255,255,255,0.3)'
          largeRef.current.style.backdropFilter = 'none'
        }
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
    <>
      {/* Small inner dot — follows cursor tightly */}
      <div
        ref={smallRef}
        className="fixed rounded-full pointer-events-none z-[99999]"
        style={{
          width: SMALL_DOT,
          height: SMALL_DOT,
          background: '#fff',
          mixBlendMode: 'difference',
          transform: 'translate(-50%, -50%)',
          willChange: 'left, top, width, height, opacity',
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
        }}
      />
      {/* Larger trailing dot — becomes liquid glass ring on hover */}
      <div
        ref={largeRef}
        className="fixed rounded-full pointer-events-none z-[99998]"
        style={{
          width: LARGE_DOT,
          height: LARGE_DOT,
          background:
            'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.85), rgba(255,255,255,0.55))',
          mixBlendMode: 'difference',
          transform: 'translate(-50%, -50%)',
          willChange: 'left, top, width, height, background, border, box-shadow',
          boxShadow:
            '0 0 6px rgba(255,255,255,0.2), inset 0 1px 2px rgba(255,255,255,0.3)',
        }}
      />
    </>
  )
}
