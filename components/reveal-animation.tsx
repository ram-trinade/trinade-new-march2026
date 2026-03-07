'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function RevealAnimation() {
  const svgRef = useRef<SVGSVGElement>(null)
  const holeRef = useRef<SVGRectElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    const hole = holeRef.current
    if (!svg || !hole) return

    const vw = window.innerWidth
    const vh = window.innerHeight
    const border = 12
    const rx = 24

    // Track whether entrance animation has completed
    let entranceComplete = false

    // Initial state: no hole visible (full white screen)
    gsap.set(hole, {
      attr: {
        x: vw / 2,
        y: vh / 2,
        width: 0,
        height: 0,
        rx: 0,
      },
    })

    const tl = gsap.timeline({
      onComplete: () => {
        entranceComplete = true
      },
    })

    // Phase 1: Brief white screen hold
    tl.to({}, { duration: 0.4 })

    // Phase 2: Expand rounded rectangle from center to edges
    tl.to(hole, {
      attr: {
        x: border,
        y: border,
        width: vw - border * 2,
        height: vh - border * 2,
        rx: rx,
      },
      duration: 1.8,
      ease: 'power3.inOut',
    })

    // Phase 3: Slight overshoot settle (scale 1.02 → 1.0 feel)
    tl.to(hole, {
      attr: {
        x: border - 1,
        y: border - 1,
        width: vw - (border - 1) * 2,
        height: vh - (border - 1) * 2,
      },
      duration: 0.3,
      ease: 'power2.out',
    })

    // Scroll-triggered border fade — border stays visible on landing,
    // fades out as user scrolls away from hero section.
    // Only starts fading AFTER the entrance animation is complete.
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: `+=${vh * 0.25}`,
      scrub: 0.3,
      onUpdate: (self) => {
        if (!svg || !entranceComplete) return
        const fade = 1 - Math.pow(self.progress, 0.6)
        svg.style.opacity = String(fade)
      },
    })

    // Handle resize — keep border sized to viewport
    const handleResize = () => {
      const newVw = window.innerWidth
      const newVh = window.innerHeight
      if (hole.getAttribute('width') !== '0') {
        gsap.set(hole, {
          attr: {
            x: border - 1,
            y: border - 1,
            width: Math.max(0, newVw - (border - 1) * 2),
            height: Math.max(0, newVh - (border - 1) * 2),
          },
        })
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      tl.kill()
      st.kill()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 100,
        overflow: 'hidden',
      }}
    >
      <mask id="reveal-mask">
        <rect width="100%" height="100%" fill="white" />
        <rect ref={holeRef} fill="black" />
      </mask>
      <rect
        width="100%"
        height="100%"
        fill="white"
        mask="url(#reveal-mask)"
      />
    </svg>
  )
}
