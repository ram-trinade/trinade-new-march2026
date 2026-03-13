'use client'

import dynamic from 'next/dynamic'

const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'), { ssr: false })
const Navigation = dynamic(() => import('@/components/navigation'), { ssr: false })
const Footer = dynamic(() => import('@/components/footer'), { ssr: false })
const ContactContentV3 = dynamic(() => import('@/components/contact-content-v3'), { ssr: false })

export default function ContactPageV3() {
  return (
    <div className="relative bg-[#060e09]" data-cursor="light">
      <SmoothScroll>
        <Navigation />
        <main>
          <ContactContentV3 />
          <Footer withBackground />
        </main>
      </SmoothScroll>
    </div>
  )
}
