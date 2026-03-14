'use client'

import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { useEffect } from 'react'
import { motion, useInView } from 'motion/react'

const SolutionsNavbar = dynamic(() => import('@/components/solutions-navbar'), { ssr: false })
const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'), { ssr: false })
const SolutionsCookiePopup = dynamic(() => import('@/components/solutions-cookie-popup'), { ssr: false })
const SolutionsFooter = dynamic(() => import('@/components/solutions-footer'), { ssr: false })

const BASE_SIZE = 20
const HOVER_SIZE = 50

function PremiumCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0, rafId: number
    let currentSize = BASE_SIZE, targetSize = BASE_SIZE

    const onMove = (e: MouseEvent) => { targetX = e.clientX; targetY = e.clientY }
    const onOverInteractive = (e: Event) => {
      const el = e.target as HTMLElement
      if (!el) return
      const tag = el.tagName.toLowerCase()
      const isInteractive = tag === 'button' || tag === 'a' || tag === 'select' ||
        tag === 'input' || tag === 'textarea' ||
        el.getAttribute('role') === 'button' || el.closest('button') || el.closest('a')
      if (isInteractive) targetSize = HOVER_SIZE
    }
    const onOutInteractive = () => { targetSize = BASE_SIZE }

    const tick = () => {
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12
      currentSize += (targetSize - currentSize) * 0.15
      if (dotRef.current) {
        dotRef.current.style.left = `${currentX}px`
        dotRef.current.style.top = `${currentY}px`
        dotRef.current.style.width = `${currentSize}px`
        dotRef.current.style.height = `${currentSize}px`
      }
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOverInteractive)
    document.addEventListener('mouseout', onOutInteractive)
    rafId = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOverInteractive)
      document.removeEventListener('mouseout', onOutInteractive)
      cancelAnimationFrame(rafId)
    }
  }, [])
  return <div ref={dotRef} className="fixed rounded-full pointer-events-none z-[99999]" style={{ width: BASE_SIZE, height: BASE_SIZE, background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.95), rgba(255,255,255,0.7))', mixBlendMode: 'difference', transform: 'translate(-50%, -50%)', willChange: 'left, top, width, height', boxShadow: '0 0 8px rgba(255,255,255,0.3), inset 0 1px 2px rgba(255,255,255,0.4)' }} />
}

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

export default function PrivacyPolicyPage() {
  return (
    <>
      <style>{`*, *::before, *::after { cursor: none !important; }`}</style>
      <PremiumCursor />
      <SmoothScroll>
        <SolutionsNavbar />

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: '#f2ede6',
            color: '#1a1510',
            minHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 'clamp(6rem, 15vh, 10rem) clamp(2rem, 8vw, 8rem) clamp(3rem, 6vh, 5rem)',
          }}
        >
          <div style={{ maxWidth: '52rem', margin: '0 auto', width: '100%' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                color: '#c9a86e',
                marginBottom: '1.5rem',
              }}
            >
              Legal
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(40px, 6vw, 72px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                color: '#1a1510',
                marginBottom: '2rem',
              }}
            >
              Privacy Policy
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
              }}
            >
              <span
                style={{
                  fontSize: '15px',
                  color: 'rgba(42, 34, 24, 0.55)',
                  fontWeight: 400,
                }}
              >
                Last updated: March 14, 2026
              </span>
              <span
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: '#c9a86e',
                }}
              />
              <span
                style={{
                  fontSize: '15px',
                  color: 'rgba(42, 34, 24, 0.55)',
                  fontWeight: 400,
                }}
              >
                Trinade AI Technologies Pvt Ltd
              </span>
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: '1px',
                background: 'linear-gradient(90deg, #c9a86e, rgba(201, 168, 110, 0.1))',
                marginTop: '3rem',
                transformOrigin: 'left',
              }}
            />
          </div>
        </motion.section>

        {/* Introduction */}
        <PolicySection>
          <AccentDivider />
          <BodyText>
            At Trinade AI Technologies Pvt Ltd, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our products, or engage with our services.
          </BodyText>
          <BodyText>
            By accessing or using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this privacy policy, please do not access our website or use our services.
          </BodyText>
        </PolicySection>

        {/* Information We Collect */}
        <PolicySection alt>
          <SectionHeading>Information We Collect</SectionHeading>
          <AccentDivider />
          <BodyText>
            We collect information that you provide directly to us, information we obtain automatically when you use our services, and information from third-party sources. This includes:
          </BodyText>
          <div style={{ marginTop: '0.5rem' }}>
            <BodyText>
              <strong style={{ color: '#1a1510', fontWeight: 600 }}>Personal Information:</strong> Name, email address, phone number, company name, job title, and postal address when you fill out forms, register for accounts, or contact us.
            </BodyText>
            <BodyText>
              <strong style={{ color: '#1a1510', fontWeight: 600 }}>Usage Data:</strong> Information about how you interact with our website and services, including pages visited, time spent on pages, click patterns, and referring URLs.
            </BodyText>
            <BodyText>
              <strong style={{ color: '#1a1510', fontWeight: 600 }}>Device Information:</strong> Browser type, operating system, device identifiers, IP address, and general location data derived from your IP address.
            </BodyText>
            <BodyText>
              <strong style={{ color: '#1a1510', fontWeight: 600 }}>Communication Data:</strong> Records of correspondence when you contact us via email, phone, or through our website forms, including any feedback or support requests.
            </BodyText>
          </div>
        </PolicySection>

        {/* How We Use Your Information */}
        <PolicySection>
          <SectionHeading>How We Use Your Information</SectionHeading>
          <AccentDivider />
          <BodyText>
            We use the information we collect to provide, maintain, and improve our services, and to develop new features that are relevant to our users. Specifically, we use your information for the following purposes:
          </BodyText>
          <BodyText>
            To process and fulfill your requests, including responding to inquiries, providing customer support, and delivering products or services you have requested. We also use your data to send you technical notices, updates, security alerts, and administrative messages.
          </BodyText>
          <BodyText>
            To personalize your experience and deliver content and product offerings relevant to your interests. We may analyze usage patterns to improve our website functionality, user interface, and overall service quality.
          </BodyText>
          <BodyText>
            To communicate with you about products, services, promotions, and events offered by Trinade AI Technologies and our partners, where you have consented to receive such communications. You may opt out of marketing communications at any time.
          </BodyText>
        </PolicySection>

        {/* Data Sharing */}
        <PolicySection alt>
          <SectionHeading>Data Sharing</SectionHeading>
          <AccentDivider />
          <BodyText>
            We do not sell your personal information to third parties. We may share your information only in the following circumstances:
          </BodyText>
          <BodyText>
            <strong style={{ color: '#1a1510', fontWeight: 600 }}>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
          </BodyText>
          <BodyText>
            <strong style={{ color: '#1a1510', fontWeight: 600 }}>Legal Requirements:</strong> We may disclose your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect our or others&apos; rights, property, or safety.
          </BodyText>
          <BodyText>
            <strong style={{ color: '#1a1510', fontWeight: 600 }}>Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or a portion of our assets, your personal information may be transferred as part of that transaction, provided that the acquiring entity agrees to protect your information consistent with this policy.
          </BodyText>
        </PolicySection>

        {/* Cookies and Tracking */}
        <PolicySection>
          <SectionHeading>Cookies and Tracking</SectionHeading>
          <AccentDivider />
          <BodyText>
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are small data files stored on your device that help us improve our services and your experience.
          </BodyText>
          <BodyText>
            <strong style={{ color: '#1a1510', fontWeight: 600 }}>Essential Cookies:</strong> Required for the operation of our website. They enable basic functions like page navigation and access to secure areas. The website cannot function properly without these cookies.
          </BodyText>
          <BodyText>
            <strong style={{ color: '#1a1510', fontWeight: 600 }}>Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve the structure and content of our site.
          </BodyText>
          <BodyText>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
          </BodyText>
        </PolicySection>

        {/* Data Security */}
        <PolicySection alt>
          <SectionHeading>Data Security</SectionHeading>
          <AccentDivider />
          <BodyText>
            The security of your personal information is important to us. We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
          </BodyText>
          <BodyText>
            These measures include encryption of data in transit and at rest, regular security assessments, access controls, and employee training on data protection practices. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
          </BodyText>
          <BodyText>
            In the event of a data breach that affects your personal information, we will notify you and the relevant authorities in accordance with applicable law.
          </BodyText>
        </PolicySection>

        {/* Your Rights */}
        <PolicySection>
          <SectionHeading>Your Rights</SectionHeading>
          <AccentDivider />
          <BodyText>
            Depending on your jurisdiction, you may have certain rights regarding your personal information. These rights may include:
          </BodyText>
          <BodyText>
            The right to access and receive a copy of your personal data. The right to request correction of inaccurate personal data. The right to request deletion of your personal data, subject to certain exceptions. The right to object to or restrict the processing of your personal data.
          </BodyText>
          <BodyText>
            The right to data portability, allowing you to receive your personal data in a structured, commonly used, and machine-readable format. The right to withdraw consent at any time, where processing is based on your consent.
          </BodyText>
          <BodyText>
            To exercise any of these rights, please contact us using the information provided at the end of this policy. We will respond to your request within the timeframe required by applicable law.
          </BodyText>
        </PolicySection>

        {/* Children's Privacy */}
        <PolicySection alt>
          <SectionHeading>Children&apos;s Privacy</SectionHeading>
          <AccentDivider />
          <BodyText>
            Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child under 18 has provided us with personal information, we will take steps to delete such information from our systems.
          </BodyText>
          <BodyText>
            If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us so that we can take the necessary steps to remove that information.
          </BodyText>
        </PolicySection>

        {/* Changes to This Policy */}
        <PolicySection>
          <SectionHeading>Changes to This Policy</SectionHeading>
          <AccentDivider />
          <BodyText>
            We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will update the &ldquo;Last Updated&rdquo; date at the top of this page.
          </BodyText>
          <BodyText>
            We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information. Your continued use of our services after any changes to this policy constitutes your acceptance of the updated terms.
          </BodyText>
        </PolicySection>

        {/* Contact Us */}
        <PolicySection alt>
          <SectionHeading>Contact Us</SectionHeading>
          <AccentDivider />
          <BodyText>
            If you have any questions about this Privacy Policy, or if you would like to exercise your rights regarding your personal information, please contact us:
          </BodyText>
          <div
            style={{
              marginTop: '1.5rem',
              padding: '2rem 2.5rem',
              background: 'rgba(201, 168, 110, 0.08)',
              borderRadius: '12px',
              border: '1px solid rgba(201, 168, 110, 0.15)',
            }}
          >
            <p style={{ fontSize: '17px', fontWeight: 600, color: '#1a1510', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
              Trinade AI Technologies Pvt Ltd
            </p>
            <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: 'rgba(42, 34, 24, 0.72)' }}>
              #06, Green Valley Apartments, Gorantla,<br />
              Guntur, Andhra Pradesh 522034, India
            </p>
            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a
                href="mailto:info@trinade.com"
                style={{
                  fontSize: '15.5px',
                  color: '#c9a86e',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'opacity 0.2s',
                }}
              >
                info@trinade.com
              </a>
              <a
                href="tel:+919490754923"
                style={{
                  fontSize: '15.5px',
                  color: '#c9a86e',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'opacity 0.2s',
                }}
              >
                +91 9490754923
              </a>
            </div>
          </div>
        </PolicySection>

        <SolutionsFooter />
        <SolutionsCookiePopup />
      </SmoothScroll>
    </>
  )
}
