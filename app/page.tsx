'use client'

import dynamic from 'next/dynamic'

const OrganicBackground = dynamic(() => import('@/components/organic-background'), {
  ssr: false,
})

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
    <div className="relative">
      <div className="fixed inset-0 z-0">
        <OrganicBackground />
      </div>
      <SmoothScroll>
        <Navigation />
        <main>
          <HeroSection />
          <div className="relative bg-[#060e09]">
            <TrustedBy />
            <WhatWeDo />
            <ProductShowcase />
            <StatsSection />
            <Testimonials />
          </div>
          <Footer />
        </main>
      </SmoothScroll>
    </div>
  )
}
