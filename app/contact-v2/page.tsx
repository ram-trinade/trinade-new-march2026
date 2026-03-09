'use client'

import dynamic from 'next/dynamic'

const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'), { ssr: false })
const Navigation = dynamic(() => import('@/components/navigation'), { ssr: false })
const Footer = dynamic(() => import('@/components/footer'), { ssr: false })
const ContactContentV2 = dynamic(() => import('@/components/contact-content-v2'), { ssr: false })

export default function ContactPageV2() {
  return (
    <div className="relative bg-[#060e09]">
      <SmoothScroll>
        <Navigation />
        <main>
          <ContactContentV2 />
          <Footer withBackground />
        </main>
      </SmoothScroll>
    </div>
  )
}
