'use client'

import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const PremiumCursor = dynamic(() => import('@/components/premium-cursor'), { ssr: false })
const SolutionsNavbar = dynamic(() => import('@/components/solutions-navbar'), { ssr: false })
const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'), { ssr: false })
const SolutionsCookiePopup = dynamic(() => import('@/components/solutions-cookie-popup'), { ssr: false })
const SolutionsFooter = dynamic(() => import('@/components/solutions-footer'), { ssr: false })

function TermsSection({
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

export default function TermsOfServicePageClient() {
  return (
    <>
      <style>{`
        .terms-page, .terms-page * { cursor: none !important; }
      `}</style>

      <div className="terms-page relative" style={{ background: '#f2ede6' }}>
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
                Terms of Service
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(1.1rem,2vw,1.4rem)] leading-[1.8] font-light"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                Terms and conditions for using Trinade Solutions services.
              </motion.p>
            </div>
          </section>

          {/* Terms of Service Content */}
          <TermsSection>
            <AccentDivider />
            <SectionHeading>Acceptance of Terms</SectionHeading>
            <BodyText>
              By accessing and using Trinade Solutions' services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </BodyText>
          </TermsSection>

          <TermsSection alt>
            <SectionHeading>Use License</SectionHeading>
            <BodyText>
              Permission is granted to temporarily use Trinade Solutions' services for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </BodyText>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1.25rem' }}>
              <li style={{ fontSize: '16.5px', lineHeight: 1.8, color: 'rgba(42, 34, 24, 0.78)', marginBottom: '0.5rem' }}>
                • Modify or copy the materials
              </li>
              <li style={{ fontSize: '16.5px', lineHeight: 1.8, color: 'rgba(42, 34, 24, 0.78)', marginBottom: '0.5rem' }}>
                • Use the materials for any commercial purpose or for any public display
              </li>
              <li style={{ fontSize: '16.5px', lineHeight: 1.8, color: 'rgba(42, 34, 24, 0.78)', marginBottom: '0.5rem' }}>
                • Attempt to decompile or reverse engineer any software contained on our services
              </li>
            </ul>
          </TermsSection>

          <TermsSection>
            <SectionHeading>Service Description</SectionHeading>
            <BodyText>
              Trinade Solutions provides AI-powered technology services, including but not limited to software development, consulting, and technology solutions. We reserve the right to modify or discontinue our services at any time without notice.
            </BodyText>
            <BodyText>
              All services are provided "as is" without warranty of any kind, either express or implied, including but not limited to the implied warranties of merchantability and fitness for a particular purpose.
            </BodyText>
          </TermsSection>

          <TermsSection alt>
            <SectionHeading>User Responsibilities</SectionHeading>
            <BodyText>
              You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.
            </BodyText>
            <BodyText>
              You must not use our services for any illegal or unauthorized purpose. You agree to comply with all applicable laws and regulations.
            </BodyText>
          </TermsSection>

          <TermsSection>
            <SectionHeading>Intellectual Property</SectionHeading>
            <BodyText>
              The service and its original content, features, and functionality are and will remain the exclusive property of Trinade Solutions and its licensors. The service is protected by copyright, trademark, and other laws.
            </BodyText>
          </TermsSection>

          <TermsSection alt>
            <SectionHeading>Limitation of Liability</SectionHeading>
            <BodyText>
              In no event shall Trinade Solutions, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </BodyText>
          </TermsSection>

          <TermsSection>
            <SectionHeading>Termination</SectionHeading>
            <BodyText>
              We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
            </BodyText>
          </TermsSection>

          <TermsSection alt>
            <SectionHeading>Changes to Terms</SectionHeading>
            <BodyText>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
            </BodyText>
            <BodyText>
              Last updated: March 1, 2026
            </BodyText>
          </TermsSection>

          <SolutionsFooter />
        </SmoothScroll>

        <SolutionsCookiePopup />
      </div>
    </>
  )
}