'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => onComplete(),
    })

    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 1.4,
      ease: 'power3.inOut',
      delay: 0.3,
    })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-[#060e09] pointer-events-none"
    />
  )
}
