'use client'

import HeroContent from './hero-content'
import RevealAnimation from './reveal-animation'

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-transparent">
      {/* Content Overlay */}
      <HeroContent />

      {/* Radial Reveal Animation */}
      <RevealAnimation />
    </section>
  )
}
