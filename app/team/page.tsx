'use client'

import dynamic from 'next/dynamic'

const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'), {
  ssr: false,
})
const Navigation = dynamic(() => import('@/components/navigation'), {
  ssr: false,
})
const Footer = dynamic(() => import('@/components/footer'), { ssr: false })
const TeamContent = dynamic(() => import('@/components/team-content'), {
  ssr: false,
})

export default function TeamPage() {
  return (
    <div className="relative bg-[#f5f3ef]">
      <SmoothScroll>
        <Navigation />
        <main>
          <TeamContent />
          <Footer withBackground />
        </main>
      </SmoothScroll>
    </div>
  )
}
