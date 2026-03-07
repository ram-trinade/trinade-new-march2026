'use client'

import dynamic from 'next/dynamic'

const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'), {
  ssr: false,
})

const HeroSection = dynamic(() => import('@/components/hero-section'), {
  ssr: false,
})

const Navigation = dynamic(() => import('@/components/navigation'), {
  ssr: false,
})

const TrustedBy = dynamic(() => import('@/components/trusted-by'), {
  ssr: false,
})

const WhatWeDo = dynamic(() => import('@/components/what-we-do'), {
  ssr: false,
})

const ProductShowcase = dynamic(() => import('@/components/product-showcase'), {
  ssr: false,
})

const StatsSection = dynamic(() => import('@/components/stats-section'), {
  ssr: false,
})

const Testimonials = dynamic(() => import('@/components/testimonials'), {
  ssr: false,
})

const Footer = dynamic(() => import('@/components/footer'), {
  ssr: false,
})

export default function Home() {
  return (
    <SmoothScroll>
      <Navigation />
      <main>
        <HeroSection />
        <TrustedBy />
        <WhatWeDo />
        <div className="relative bg-[#060e09]">
          <ProductShowcase />
          <StatsSection />
        </div>
        <Testimonials />
        <Footer withBackground />
      </main>
    </SmoothScroll>
  )
}
