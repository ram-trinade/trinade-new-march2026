'use client'

import dynamic from 'next/dynamic'

const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'), {
  ssr: false,
})
const Navigation = dynamic(() => import('@/components/navigation'), {
  ssr: false,
})
const Footer = dynamic(() => import('@/components/footer'), { ssr: false })
const AboutContent = dynamic(() => import('@/components/about-content'), {
  ssr: false,
})

export default function AboutPage() {
  return (
    <div className="relative bg-[#e8e4de]">
      <SmoothScroll>
        <Navigation />
        <main>
          <AboutContent />
          <Footer withBackground />
        </main>
      </SmoothScroll>
    </div>
  )
}
