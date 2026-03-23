'use client'

import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const PremiumCursor = dynamic(() => import('@/components/premium-cursor'), { ssr: false })
const SolutionsNavbar = dynamic(() => import('@/components/solutions-navbar'), { ssr: false })
const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'), { ssr: false })
const SolutionsCookiePopup = dynamic(() => import('@/components/solutions-cookie-popup'), { ssr: false })
const SolutionsFooter = dynamic(() => import('@/components/solutions-footer'), { ssr: false })

function PolicySection({
  children,
  alt = false,
}: {
  children: React.ReactNode
  alt?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: 'clamp(3.5rem, 8vh, 6rem) clamp(2rem, 8vw, 8rem)',
        background: alt ? '#ebe5db' : '#f2ede6',
        color: '#2a2218',
      }}
    >
      <div style={{ maxWidth: '52rem', margin: '0 auto' }}>
        {children}
      </div>
    </motion.section>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: 'clamp(24px, 3vw, 36px)',
        fontWeight: 600,
        color: '#1a1510',
        marginBottom: '1.5rem',
        letterSpacing: '-0.02em',
        lineHeight: 1.25,
      }}
    >
      {children}
    </h2>
  )
}

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: '16.5px',
        lineHeight: 1.8,
        color: 'rgba(42, 34, 24, 0.78)',
        marginBottom: '1.25rem',
      }}
    >
      {children}
    </p>
  )
}

function AccentDivider() {
  return (
    <div
      style={{
        width: '3rem',
        height: '2px',
        background: '#c9a86e',
        marginBottom: '2rem',
        borderRadius: '1px',
      }}
    />
  )
}

export default function PrivacyPolicyPageClient() {
  return (
    <>
      <style>{`
        .privacy-page, .privacy-page * { cursor: none !important; }
      `}</style>

      <div className="privacy-page relative" style={{ background: '#f2ede6' }}>
        <PremiumCursor />
        <SolutionsNavbar />
        <SmoothScroll>

          {/* Hero Section */}
          <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #1a1510 0%, #2a1f14 25%, #1f1a12 50%, #2d2218 75%, #0f0d09 100%)',
              }}
            />

            {/* Content */}
            <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-32 text-center max-w-4xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3rem,8vw,6rem)] font-light tracking-tight leading-[0.9] mb-8"
                style={{ color: 'rgba(255,255,255,0.95)' }}
              >
                Privacy Policy
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(1.1rem,2vw,1.4rem)] leading-[1.8] font-light"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                How we protect your privacy and handle your data.
              </motion.p>
            </div>
          </section>

          {/* Privacy Policy Content */}
          <PolicySection>
            <AccentDivider />
            <SectionHeading>Information We Collect</SectionHeading>
            <BodyText>
              We collect information you provide directly to us, such as when you contact us, use our services, or communicate with us. This may include your name, email address, phone number, and any other information you choose to provide.
            </BodyText>
            <BodyText>
              We also automatically collect certain information about your device and how you interact with our website, including IP address, browser type, operating system, and usage data.
            </BodyText>
          </PolicySection>

          <PolicySection alt>
            <SectionHeading>How We Use Your Information</SectionHeading>
            <BodyText>
              We use the information we collect to provide, maintain, and improve our services, communicate with you, and respond to your requests. We may also use your information for marketing purposes with your consent.
            </BodyText>
            <BodyText>
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
            </BodyText>
          </PolicySection>

          <PolicySection>
            <SectionHeading>Data Security</SectionHeading>
            <BodyText>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </BodyText>
          </PolicySection>

          <PolicySection alt>
            <SectionHeading>Your Rights</SectionHeading>
            <BodyText>
              You have the right to access, update, or delete your personal information. You may also object to or restrict certain processing of your information. To exercise these rights, please contact us using the information provided on our contact page.
            </BodyText>
          </PolicySection>

          <PolicySection>
            <SectionHeading>Changes to This Policy</SectionHeading>
            <BodyText>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </BodyText>
            <BodyText>
              Last updated: March 1, 2026
            </BodyText>
          </PolicySection>

          <SolutionsFooter />
        </SmoothScroll>

        <SolutionsCookiePopup />
      </div>
    </>
  )
}