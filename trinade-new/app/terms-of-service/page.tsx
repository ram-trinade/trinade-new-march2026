'use client'

import dynamic from 'next/dynamic'
import { useRef, useEffect } from 'react'
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
  return (
    <div
      ref={dotRef}
      className="fixed rounded-full pointer-events-none z-[99999]"
      style={{
        width: BASE_SIZE,
        height: BASE_SIZE,
        background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.95), rgba(255,255,255,0.7))',
        mixBlendMode: 'difference',
        transform: 'translate(-50%, -50%)',
        willChange: 'left, top, width, height',
        boxShadow: '0 0 8px rgba(255,255,255,0.3), inset 0 1px 2px rgba(255,255,255,0.4)',
      }}
    />
  )
}

function TermsSection({
  children,
  alternate = false,
}: {
  children: React.ReactNode
  alternate?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: 'clamp(3.5rem, 8vh, 6rem) clamp(2rem, 8vw, 8rem)',
        background: alternate ? '#ebe5db' : '#f2ede6',
        color: '#2a2218',
      }}
    >
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>{children}</div>
    </motion.section>
  )
}

function SectionHeading({ number, title }: { number: number; title: string }) {
  return (
    <h2
      style={{
        fontSize: 'clamp(24px, 3vw, 36px)',
        fontWeight: 600,
        lineHeight: 1.3,
        marginBottom: '1.5rem',
        color: '#1a1510',
        letterSpacing: '-0.01em',
      }}
    >
      <span style={{ color: '#c9a86e', marginRight: '0.5rem' }}>{number}.</span>
      {title}
    </h2>
  )
}

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: '16.5px',
        lineHeight: 1.8,
        color: '#3d3427',
        fontWeight: 400,
      }}
    >
      {children}
    </div>
  )
}

const sections = [
  {
    title: 'Acceptance of Terms',
    content: (
      <>
        <p style={{ marginBottom: '1rem' }}>
          By accessing or using any services, products, or platforms provided by Trinade AI Technologies Private Limited
          (&quot;Trinade,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you agree to be bound by these Terms of
          Service (&quot;Terms&quot;). If you do not agree to these Terms, you may not access or use our services.
        </p>
        <p>
          These Terms constitute a legally binding agreement between you (whether an individual or an entity) and Trinade AI
          Technologies Pvt Ltd. Your continued use of our services following any modifications to these Terms constitutes
          acceptance of the revised Terms.
        </p>
      </>
    ),
  },
  {
    title: 'Description of Services',
    content: (
      <>
        <p style={{ marginBottom: '1rem' }}>
          Trinade AI Technologies provides enterprise-grade artificial intelligence solutions, including but not limited to
          AI-native products, enterprise intelligence platforms, modular architecture systems, and related consulting and
          integration services.
        </p>
        <p>
          We reserve the right to modify, suspend, or discontinue any part of our services at any time, with or without
          notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of
          our services.
        </p>
      </>
    ),
  },
  {
    title: 'User Accounts',
    content: (
      <>
        <p style={{ marginBottom: '1rem' }}>
          Certain features of our services may require you to create an account. You are responsible for maintaining the
          confidentiality of your account credentials and for all activities that occur under your account.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          You agree to provide accurate, current, and complete information during the registration process and to update
          such information to keep it accurate, current, and complete. You must immediately notify us of any unauthorized
          use of your account or any other breach of security.
        </p>
        <p>
          We reserve the right to suspend or terminate accounts that violate these Terms, contain inaccurate information,
          or remain inactive for an extended period.
        </p>
      </>
    ),
  },
  {
    title: 'Intellectual Property',
    content: (
      <>
        <p style={{ marginBottom: '1rem' }}>
          All content, features, and functionality of our services, including but not limited to text, graphics, logos,
          icons, images, audio clips, software, algorithms, machine learning models, and the compilation thereof, are the
          exclusive property of Trinade AI Technologies Pvt Ltd or its licensors and are protected by international
          copyright, trademark, patent, and other intellectual property laws.
        </p>
        <p>
          You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform,
          republish, download, store, or transmit any of our proprietary materials without our prior written consent,
          except as expressly permitted by these Terms.
        </p>
      </>
    ),
  },
  {
    title: 'Acceptable Use',
    content: (
      <>
        <p style={{ marginBottom: '1rem' }}>You agree not to use our services to:</p>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 1rem 0',
          }}
        >
          {[
            'Violate any applicable local, state, national, or international law or regulation.',
            'Infringe upon the rights of others, including intellectual property or privacy rights.',
            'Transmit any material that is unlawful, threatening, abusive, defamatory, or otherwise objectionable.',
            'Introduce malicious code, viruses, or any technology intended to harm our systems or users.',
            'Attempt to gain unauthorized access to our systems, networks, or data.',
            'Interfere with or disrupt the integrity or performance of our services.',
            'Use automated means to scrape, collect, or harvest data from our platforms without authorization.',
          ].map((item, i) => (
            <li key={i} style={{ paddingLeft: '1.5rem', position: 'relative', marginBottom: '0.6rem' }}>
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  color: '#c9a86e',
                  fontWeight: 500,
                }}
              >
                &mdash;
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p>
          We reserve the right to investigate and take appropriate legal action against anyone who, in our sole discretion,
          violates this provision.
        </p>
      </>
    ),
  },
  {
    title: 'Limitation of Liability',
    content: (
      <>
        <p style={{ marginBottom: '1rem' }}>
          To the fullest extent permitted by applicable law, Trinade AI Technologies Pvt Ltd shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits,
          data, use, goodwill, or other intangible losses, arising out of or relating to your use or inability to use our
          services.
        </p>
        <p>
          In no event shall our total liability to you for all claims arising from or related to these Terms or our
          services exceed the amount paid by you to Trinade in the twelve (12) months preceding the event giving rise to
          such liability.
        </p>
      </>
    ),
  },
  {
    title: 'Indemnification',
    content: (
      <p>
        You agree to defend, indemnify, and hold harmless Trinade AI Technologies Pvt Ltd, its officers, directors,
        employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims,
        liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys&apos;
        fees) arising out of or relating to your violation of these Terms, your use of our services, or your violation of
        any rights of a third party.
      </p>
    ),
  },
  {
    title: 'Termination',
    content: (
      <>
        <p style={{ marginBottom: '1rem' }}>
          We may terminate or suspend your access to our services immediately, without prior notice or liability, for any
          reason, including without limitation, if you breach these Terms.
        </p>
        <p>
          Upon termination, your right to use our services will immediately cease. All provisions of these Terms which by
          their nature should survive termination shall survive, including without limitation, ownership provisions,
          warranty disclaimers, indemnification, and limitations of liability.
        </p>
      </>
    ),
  },
  {
    title: 'Governing Law',
    content: (
      <p>
        These Terms shall be governed by and construed in accordance with the laws of India, without regard to its
        conflict of law principles. Any legal proceedings arising out of or relating to these Terms shall be subject to
        the exclusive jurisdiction of the courts located in Guntur, Andhra Pradesh, India.
      </p>
    ),
  },
  {
    title: 'Dispute Resolution',
    content: (
      <>
        <p style={{ marginBottom: '1rem' }}>
          Any dispute, controversy, or claim arising out of or relating to these Terms, including the validity,
          invalidity, breach, or termination thereof, shall first be attempted to be resolved through good-faith
          negotiation between the parties for a period of thirty (30) days.
        </p>
        <p>
          If the dispute cannot be resolved through negotiation, it shall be submitted to binding arbitration under the
          Arbitration and Conciliation Act, 1996, as amended. The seat of arbitration shall be Guntur, Andhra Pradesh,
          India, and the language of arbitration shall be English.
        </p>
      </>
    ),
  },
  {
    title: 'Changes to Terms',
    content: (
      <>
        <p style={{ marginBottom: '1rem' }}>
          We reserve the right to modify these Terms at any time at our sole discretion. When we make changes, we will
          update the &quot;Last Updated&quot; date at the top of this page. Material changes will be communicated through
          our services or via email to registered users.
        </p>
        <p>
          Your continued use of our services after any such changes constitutes your acceptance of the new Terms. If you
          do not agree to the modified Terms, you must discontinue use of our services.
        </p>
      </>
    ),
  },
  {
    title: 'Contact Information',
    content: (
      <>
        <p style={{ marginBottom: '1.5rem' }}>
          If you have any questions about these Terms of Service, please contact us:
        </p>
        <div
          style={{
            background: 'rgba(201, 168, 110, 0.08)',
            border: '1px solid rgba(201, 168, 110, 0.2)',
            borderRadius: '12px',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}
        >
          <p style={{ fontWeight: 600, fontSize: '18px', marginBottom: '1rem', color: '#1a1510' }}>
            Trinade AI Technologies Pvt Ltd
          </p>
          <p style={{ marginBottom: '0.5rem' }}>
            <span style={{ color: '#c9a86e', fontWeight: 500 }}>Address</span>
            <br />
            #06, Green Valley Apartments, Gorantla, Guntur, Andhra Pradesh 522034, India
          </p>
          <p style={{ marginBottom: '0.5rem' }}>
            <span style={{ color: '#c9a86e', fontWeight: 500 }}>Email</span>
            <br />
            <a href="mailto:info@trinade.com" style={{ color: '#2a2218', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              info@trinade.com
            </a>
          </p>
          <p>
            <span style={{ color: '#c9a86e', fontWeight: 500 }}>Phone</span>
            <br />
            <a href="tel:+919490754923" style={{ color: '#2a2218', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              +91 9490754923
            </a>
          </p>
        </div>
      </>
    ),
  },
]

export default function TermsOfServicePage() {
  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      <PremiumCursor />
      <SmoothScroll>
        <SolutionsNavbar />

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: '#f2ede6',
            padding: 'clamp(8rem, 20vh, 14rem) clamp(2rem, 8vw, 8rem) clamp(4rem, 10vh, 8rem)',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'inline-block',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#c9a86e',
                marginBottom: '1.5rem',
                padding: '6px 16px',
                border: '1px solid rgba(201, 168, 110, 0.3)',
                borderRadius: '100px',
              }}
            >
              Legal
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(36px, 6vw, 64px)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: '#1a1510',
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em',
              }}
            >
              Terms of Service
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: '16px',
                color: '#6b5d4f',
                lineHeight: 1.6,
              }}
            >
              Last updated: March 14, 2026
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '60px',
                height: '2px',
                background: '#c9a86e',
                margin: '2rem auto 0',
                transformOrigin: 'center',
              }}
            />
          </div>
        </motion.div>

        {/* Intro blurb */}
        <TermsSection alternate>
          <BodyText>
            <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#3d3427' }}>
              Welcome to Trinade AI Technologies. These Terms of Service govern your access to and use of our products,
              services, and platforms. Please read them carefully before engaging with any of our offerings. By using our
              services, you acknowledge that you have read, understood, and agree to be bound by these Terms.
            </p>
          </BodyText>
        </TermsSection>

        {/* Content sections */}
        {sections.map((section, index) => (
          <TermsSection key={index} alternate={index % 2 === 0}>
            <SectionHeading number={index + 1} title={section.title} />
            <BodyText>{section.content}</BodyText>
          </TermsSection>
        ))}

        <SolutionsFooter />
      </SmoothScroll>
      <SolutionsCookiePopup />
    </>
  )
}
