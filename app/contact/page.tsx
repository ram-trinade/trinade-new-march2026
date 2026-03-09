'use client'

import dynamic from 'next/dynamic'

const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'), { ssr: false })
const Navigation = dynamic(() => import('@/components/navigation'), { ssr: false })
const Footer = dynamic(() => import('@/components/footer'), { ssr: false })
const ContactContent = dynamic(() => import('@/components/contact-content'), { ssr: false })

export default function ContactPage() {
  return (
    <div className="relative bg-[#f0e6d3]">
      <SmoothScroll>
        <Navigation />
        <main>
          <ContactContent />
          <Footer withBackground />
        </main>
      </SmoothScroll>
    </div>
  )
}
