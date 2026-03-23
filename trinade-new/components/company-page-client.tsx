'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'

const PremiumCursor = dynamic(() => import('@/components/premium-cursor'), { ssr: false })
const SolutionsNavbar = dynamic(() => import('@/components/solutions-navbar'), { ssr: false })
const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'), { ssr: false })
const SolutionsCookiePopup = dynamic(() => import('@/components/solutions-cookie-popup'), { ssr: false })
const SolutionsFooter = dynamic(() => import('@/components/solutions-footer'), { ssr: false })

/* ═══════════════════════════════════════════
   EASING & DESIGN TOKENS
   ═══════════════════════════════════════════ */
const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const
const EASE_UI = [0.32, 0.72, 0, 1] as const

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */
const VALUES = [
  {
    id: 'V/01',
    title: 'Led by Integrity',
    desc: 'Transparent communication, professional relationships, and delivery that matches commitments. Trust is treated as a long-term asset.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: 'V/02',
    title: 'Engineering Excellence',
    desc: 'Strong architecture, readable systems, disciplined testing, and maintainable foundations built to perform today and scale tomorrow.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /><line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
  },
  {
    id: 'V/03',
    title: 'Customer-Fit Solutions',
    desc: 'Every engagement is tailored to the client\'s context — industry, workflow, and goals — so solutions are usable, practical, and aligned with real needs.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'V/04',
    title: 'Responsible AI',
    desc: 'AI is applied with care and intention — focused on accuracy, reliability, and outcomes that teams can confidently stand behind.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    id: 'V/05',
    title: 'Sustainable Growth',
    desc: 'Growth is pursued through responsible expansion — building across sectors while preserving quality, trust, and long-term value.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
]

const TIMELINE = [
  { year: '2020', title: 'Founded', desc: 'Trinade AI Technologies Pvt. Ltd. established in Guntur with a long-term focus on building useful products and dependable services.' },
  { year: '2021', title: 'Product + Services Direction', desc: 'Committed to a dual model — building products while delivering software and web solutions that improve business operations.' },
  { year: '2023', title: 'Expansion Roadmap', desc: 'Defined plans to expand into multiple sectors guided by trust, reliability, and measurable outcomes.' },
  { year: '2024', title: 'Sleep Alert Device', desc: 'Initiated development of a safety-focused concept for automotive applications designed for real-world impact.' },
  { year: '2025', title: 'Fly High', desc: 'Began building Fly High as part of Trinade\'s product roadmap and platform direction.' },
  { year: '2026', title: 'Website + Offerings Launch', desc: 'Launch of the website and structured offerings — opening collaborations with businesses, startups, and community initiatives.' },
]

const TEAM = [
  {
    name: 'Shubham Sakhare',
    role: 'AI & Full Stack Developer',
    bio: 'AI & Full Stack Developer with 6+ years of experience delivering scalable web applications with AI/ML integrations. Strong in React/Angular, Node/Java/Spring Boot, and AWS, with hands-on work in predictive analytics, NLP, and recommendation systems. Known for leading builds end-to-end with a focus on performance, reliability, and business impact.',
    tagline: 'Builds AI-enhanced applications that scale cleanly from concept to production',
    mesh: 'radial-gradient(ellipse at 25% 75%, rgba(201,168,110,0.7) 0%, transparent 55%), radial-gradient(ellipse at 75% 25%, rgba(212,187,138,0.6) 0%, transparent 55%), radial-gradient(ellipse at 50% 50%, rgba(139,105,20,0.4) 0%, transparent 65%), linear-gradient(135deg, #2a2218 0%, #1a1a1e 100%)',
  },
  {
    name: 'Akash Sakhare',
    role: 'Software Developer',
    bio: 'Software Developer with 1+ years of experience building modern full-stack applications using React/Angular, Java/Spring Boot, Node.js, SQL, and MongoDB. Comfortable designing REST APIs, optimizing performance, and writing clean, maintainable code. Works well in Agile teams and delivers user-focused solutions.',
    tagline: 'Builds clean, scalable web applications with a user-first mindset',
    mesh: 'radial-gradient(ellipse at 30% 70%, rgba(42,42,94,0.6) 0%, transparent 55%), radial-gradient(ellipse at 70% 30%, rgba(201,168,110,0.4) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(26,26,62,0.5) 0%, transparent 60%), linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%)',
  },
  {
    name: 'Renu Kumari',
    role: 'Scrum Master / QA Project Manager',
    bio: 'Scrum Master and QA Project Manager with 10+ years across STLC, UAT, defect management, and test leadership. Experienced with automation and performance tools (RPT, QTP, LoadRunner) and databases (DB2, Oracle). Drives planning, risk control, stakeholder reporting, and high-quality delivery across teams.',
    tagline: 'Leads delivery and quality with strong execution discipline',
    mesh: 'radial-gradient(ellipse at 20% 80%, rgba(160,129,74,0.5) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(201,168,110,0.6) 0%, transparent 50%), radial-gradient(ellipse at 45% 55%, rgba(42,34,24,0.6) 0%, transparent 55%), linear-gradient(135deg, #1a1510 0%, #2a2218 100%)',
  },
  {
    name: 'Havilah Sale',
    role: 'Business Intelligence Analyst',
    bio: 'BI Analyst with an MS in Business Intelligence & Analytics (Stevens, GPA 3.84) and experience across pharma and e-commerce analytics. Strong in SQL, Python, Power BI, and Tableau — building KPI dashboards and stakeholder-ready insights. At Trinade, supports requirements, process flows, Excel analysis, and UAT for early-stage initiatives.',
    tagline: 'Converts data into dashboards, decisions, and measurable impact',
    mesh: 'radial-gradient(ellipse at 35% 65%, rgba(139,105,20,0.5) 0%, transparent 50%), radial-gradient(ellipse at 65% 35%, rgba(42,34,24,0.7) 0%, transparent 55%), radial-gradient(ellipse at 50% 50%, rgba(201,168,110,0.3) 0%, transparent 60%), linear-gradient(135deg, #15130e 0%, #1e1c17 100%)',
  },
  {
    name: 'George Gideon',
    role: 'Product & Strategy Lead',
    bio: 'Product and strategy leader focused on building practical solutions that customers adopt quickly. Drives product clarity, go-to-market alignment, and cross-functional execution from concept to launch. Keeps delivery structured, measurable, and business-first.',
    tagline: 'Shapes clear roadmaps and turns ideas into launch-ready products',
    mesh: 'radial-gradient(ellipse at 25% 70%, rgba(212,187,138,0.5) 0%, transparent 50%), radial-gradient(ellipse at 75% 30%, rgba(180,130,55,0.4) 0%, transparent 50%), radial-gradient(ellipse at 50% 60%, rgba(242,237,230,0.2) 0%, transparent 55%), linear-gradient(135deg, #1e1a14 0%, #262218 100%)',
  },
  {
    name: 'Peter',
    role: 'Founder / CMD & CEO',
    bio: 'Founder and CMD of Trinade, focused on creating products and services that make life better through responsible innovation. Leads the company\'s vision across AI-backed solutions, product engineering, and trusted delivery. Believes the strongest technology supports human intelligence and real-world progress.',
    tagline: 'Builds responsibly — combining human judgment with intelligent systems',
    mesh: 'radial-gradient(ellipse at 30% 75%, rgba(42,34,24,0.7) 0%, transparent 50%), radial-gradient(ellipse at 70% 25%, rgba(139,105,20,0.5) 0%, transparent 50%), radial-gradient(ellipse at 55% 50%, rgba(201,168,110,0.3) 0%, transparent 60%), linear-gradient(135deg, #121210 0%, #1a1816 100%)',
  },
]


/* ═══════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════ */

function Grain({ id, opacity = 0.035 }: { id: string; opacity?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none mix-blend-overlay" style={{ opacity, zIndex: 1 }}>
      <svg width="100%" height="100%">
        <filter id={id}><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter={`url(#${id})`} />
      </svg>
    </div>
  )
}

function GoldRule({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : {}}
      transition={{ duration: 1.4, ease: EASE_CINEMATIC }}
      className={className}
      style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, #c9a86e, transparent)',
        transformOrigin: 'left',
      }}
    />
  )
}

function SectionEyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
      style={{
        fontSize: '12px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        color: dark ? '#c9a86e' : 'rgba(42,34,24,0.4)',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <span
        style={{
          width: '40px',
          height: '1px',
          background: dark ? '#c9a86e' : 'rgba(42,34,24,0.2)',
          display: 'inline-block',
        }}
      />
      {children}
    </motion.p>
  )
}


/* Reveal wrapper with configurable direction */
function Reveal({
  children,
  delay = 0,
  y = 50,
  className = '',
  style = {},
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: EASE_CINEMATIC }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════
   HERO — Letter-by-Letter Reveal
   ═══════════════════════════════════════════ */
function HeroLetterReveal() {
  const letters = 'TRINADE'.split('')
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(4px, 1vw, 16px)', overflow: 'hidden' }}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 80, rotateX: 40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.3 + i * 0.08,
            ease: EASE_CINEMATIC,
          }}
          style={{
            display: 'inline-block',
            fontSize: 'clamp(72px, 15vw, 220px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 0.85,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(201,168,110,0.35)',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.97) 0%, rgba(212,187,138,0.7) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            userSelect: 'none',
          }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════
   ANIMATED COUNTER — Cinematic number animation
   ═══════════════════════════════════════════ */
function AnimatedCounter({ target, isActive }: { target: number; isActive: boolean }) {
  const [count, setCount] = useState(0)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (isActive) {
      // Animate from 0 to target
      const duration = 800 // ms
      const startTime = performance.now()
      const startVal = count

      const animate = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        // Cinematic ease-out curve
        const eased = 1 - Math.pow(1 - progress, 4)
        setCount(Math.round(startVal + (target - startVal) * eased))

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate)
        }
      }
      frameRef.current = requestAnimationFrame(animate)
    } else {
      // Animate back to 0
      const duration = 500
      const startTime = performance.now()
      const startVal = count

      const animate = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = progress * progress // ease-in for collapse
        setCount(Math.round(startVal + (0 - startVal) * eased))

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate)
        }
      }
      frameRef.current = requestAnimationFrame(animate)
    }

    return () => cancelAnimationFrame(frameRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, target])

  return <>{String(count).padStart(2, '0')}</>
}

/* ═══════════════════════════════════════════
   VALUES ACCORDION — AROX-Style Rows
   ═══════════════════════════════════════════ */
function ValuesAccordion() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} style={{ width: '100%' }}>
      {/* Top border */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(201,168,110,0.3), rgba(42,34,24,0.08))' }} />

      {VALUES.map((value, i) => {
        const isExpanded = expandedIndex === i
        const targetNum = i + 1

        return (
          <motion.div
            key={value.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.06, ease: EASE_CINEMATIC }}
          >
            <button
              onClick={() => setExpandedIndex(isExpanded ? null : i)}
              style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr auto auto',
                alignItems: 'center',
                gap: '24px',
                padding: '36px 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                color: 'inherit',
                font: 'inherit',
                transition: 'opacity 0.3s ease',
              }}
            >
              {/* Title — bold, prominent */}
              <span style={{
                fontSize: 'clamp(24px, 3vw, 40px)',
                fontWeight: 500,
                color: isExpanded ? '#2a2218' : 'rgba(42,34,24,0.7)',
                letterSpacing: '-0.025em',
                transition: 'color 0.4s ease',
                lineHeight: 1.2,
              }}>
                {value.title}
              </span>

              {/* Big animated number on right */}
              <span style={{
                fontSize: 'clamp(48px, 5vw, 72px)',
                fontWeight: 200,
                color: isExpanded ? 'rgba(201,168,110,0.35)' : 'rgba(42,34,24,0.12)',
                letterSpacing: '-0.04em',
                lineHeight: 1,
                transition: 'color 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                fontVariantNumeric: 'tabular-nums',
                minWidth: '80px',
                textAlign: 'right',
              }}>
{String(i + 1).padStart(2, '0')}
              </span>

              {/* Toggle icon */}
              <motion.span
                animate={{ rotate: isExpanded ? 45 : 0 }}
                transition={{ duration: 0.3, ease: EASE_UI }}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: isExpanded ? '1px solid rgba(201,168,110,0.5)' : '1px solid rgba(201,168,110,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  fontWeight: 300,
                  color: isExpanded ? '#c9a86e' : '#a0814a',
                  transition: 'border-color 0.4s ease, color 0.4s ease',
                  flexShrink: 0,
                }}
              >
                +
              </motion.span>
            </button>

            {/* Expanded content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '24px',
                    paddingBottom: '40px',
                    paddingTop: '8px',
                    paddingLeft: '0',
                  }}>
                    {/* Icon — positioned top-left of expanded area */}
                    <div style={{
                      color: '#c9a86e',
                      opacity: 0.6,
                      flexShrink: 0,
                      marginTop: '4px',
                    }}>
                      {value.icon}
                    </div>

                    {/* Description */}
                    <p style={{
                      fontSize: '18px',
                      lineHeight: 1.85,
                      color: 'rgba(42,34,24,0.6)',
                      maxWidth: '700px',
                      textAlign: 'left',
                    }}>
                      {value.desc}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom border */}
            <div style={{ height: '1px', background: 'rgba(42,34,24,0.08)' }} />
          </motion.div>
        )
      })}
    </div>
  )
}

/* ═══════════════════════════════════════════
   MILESTONES — Horizontal Scrollable Cards
   ═══════════════════════════════════════════ */
function MilestonesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 360
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }, [])

  return (
    <div ref={sectionRef} style={{ width: '100%' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: EASE_CINEMATIC }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          marginBottom: '48px',
        }}
      >
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '1px solid rgba(201,168,110,0.3)',
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: '#c9a86e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(201,168,110,0.6)'
            e.currentTarget.style.background = 'rgba(201,168,110,0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(201,168,110,0.3)'
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {TIMELINE.map((milestone, i) => (
            <div
              key={milestone.year}
              style={{
                flexShrink: 0,
                width: '320px',
                padding: '32px',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(201,168,110,0.1)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              {/* Year badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '8px 16px',
                borderRadius: '20px',
                background: 'rgba(201,168,110,0.1)',
                border: '1px solid rgba(201,168,110,0.2)',
                marginBottom: '20px',
              }}>
                <span style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#c9a86e',
                  letterSpacing: '0.05em',
                }}>
                  {milestone.year}
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '24px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.9)',
                marginBottom: '12px',
                lineHeight: 1.3,
              }}>
                {milestone.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '16px',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.6)',
              }}>
                {milestone.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '1px solid rgba(201,168,110,0.3)',
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: '#c9a86e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(201,168,110,0.6)'
            e.currentTarget.style.background = 'rgba(201,168,110,0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(201,168,110,0.3)'
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   TEAM GRID — Interactive Cards
   ═══════════════════════════════════════════ */
function TeamGrid() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <div ref={sectionRef} style={{ width: '100%' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: EASE_CINEMATIC }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
        }}
      >
        {TEAM.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.1, ease: EASE_CINEMATIC }}
            whileHover={{ y: -8 }}
            style={{
              padding: '32px',
              borderRadius: '20px',
              background: member.mesh,
              border: '1px solid rgba(201,168,110,0.15)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            {/* Subtle grain overlay */}
            <Grain id={`grain-${i}`} opacity={0.02} />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              {/* Name and role */}
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.95)',
                  marginBottom: '4px',
                  lineHeight: 1.2,
                }}>
                  {member.name}
                </h3>
                <p style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#c9a86e',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}>
                  {member.role}
                </p>
              </div>

              {/* Tagline */}
              <p style={{
                fontSize: '16px',
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '20px',
                lineHeight: 1.4,
              }}>
                {member.tagline}
              </p>

              {/* Bio */}
              <p style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.6)',
              }}>
                {member.bio}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   MAIN COMPANY PAGE COMPONENT
   ═══════════════════════════════════════════ */

export default function CompanyPageClient() {
  return (
    <>
      <style>{`
        .company-page, .company-page * { cursor: none !important; }
      `}</style>

      <div className="company-page relative" style={{ background: '#f2ede6' }}>
        <PremiumCursor />
        <SolutionsNavbar />
        <SmoothScroll>

          {/* ═══════════════ HERO ═══════════════ */}
          <section
            className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1a1510 0%, #2a1f14 25%, #1f1a12 50%, #2d2218 75%, #0f0d09 100%)',
            }}
          >
            {/* Atmospheric gradient orbs */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute"
                style={{
                  width: '80vw', height: '80vw', maxWidth: '1200px', maxHeight: '1200px',
                  top: '10%', left: '10%',
                  background: 'radial-gradient(ellipse, rgba(201,168,110,0.06) 0%, transparent 60%)',
                  filter: 'blur(120px)',
                }}
              />
              <div
                className="absolute"
                style={{
                  width: '60vw', height: '60vw', maxWidth: '800px', maxHeight: '800px',
                  bottom: '10%', right: '10%',
                  background: 'radial-gradient(ellipse, rgba(160,129,74,0.04) 0%, transparent 55%)',
                  filter: 'blur(100px)',
                }}
              />
            </div>

            {/* Grain */}
            <Grain id="hero-grain" opacity={0.15} />

            {/* Content */}
            <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-32 text-center">
              <div className="max-w-[1400px] mx-auto">
                {/* Eyebrow */}
                <Reveal>
                  <SectionEyebrow dark>
                    About Trinade
                  </SectionEyebrow>
                </Reveal>

                {/* Main title — letter-by-letter reveal */}
                <HeroLetterReveal />

                {/* Subtitle */}
                <Reveal delay={1.2}>
                  <p
                    className="text-[clamp(1.1rem,2.2vw,1.4rem)] leading-[1.8] font-light mt-8 max-w-[600px] mx-auto"
                    style={{ color: 'rgba(255,255,255,0.7)' }}
                  >
                    Pioneering AI technology company transforming industries with intelligent solutions that create lasting value for our clients.
                  </p>
                </Reveal>

                {/* CTA */}
                <Reveal delay={1.5}>
                  <div className="mt-12">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: '16px 32px',
                        borderRadius: '50px',
                        background: 'linear-gradient(135deg, rgba(201,168,110,0.2), rgba(201,168,110,0.1))',
                        border: '1px solid rgba(201,168,110,0.3)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        color: '#c9a86e',
                        fontSize: '16px',
                        fontWeight: 500,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(201,168,110,0.6)'
                        e.currentTarget.style.background = 'rgba(201,168,110,0.3)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(201,168,110,0.3)'
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201,168,110,0.2), rgba(201,168,110,0.1))'
                      }}
                    >
                      Our Mission
                    </motion.button>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ═══════════════ VALUES ═══════════════ */}
          <section className="relative py-20 md:py-32" style={{ background: '#f2ede6' }}>
            <Grain id="values-grain" />

            <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-32">
              <div className="max-w-[1200px] mx-auto">
                <Reveal>
                  <SectionEyebrow>
                    Our Values
                  </SectionEyebrow>
                </Reveal>

                <Reveal delay={0.2}>
                  <h2
                    className="text-[clamp(2.4rem,5vw,4rem)] font-light tracking-tight leading-[1.1] mb-16 max-w-[800px]"
                    style={{ color: '#2a2218' }}
                  >
                    Principles that guide everything we build
                  </h2>
                </Reveal>

                <ValuesAccordion />
              </div>
            </div>
          </section>

          {/* ═══════════════ MILESTONES ═══════════════ */}
          <section className="relative py-20 md:py-32" style={{ background: '#ebe5db' }}>
            <Grain id="milestones-grain" />

            <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-32">
              <div className="max-w-[1400px] mx-auto">
                <Reveal>
                  <SectionEyebrow>
                    Our Journey
                  </SectionEyebrow>
                </Reveal>

                <Reveal delay={0.2}>
                  <h2
                    className="text-[clamp(2.4rem,5vw,4rem)] font-light tracking-tight leading-[1.1] mb-16 max-w-[800px]"
                    style={{ color: '#2a2218' }}
                  >
                    From foundation to innovation
                  </h2>
                </Reveal>

                <MilestonesCarousel />
              </div>
            </div>
          </section>

          {/* ═══════════════ TEAM ═══════════════ */}
          <section className="relative py-20 md:py-32" style={{ background: '#f2ede6' }}>
            <Grain id="team-grain" />

            <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-32">
              <div className="max-w-[1400px] mx-auto">
                <Reveal>
                  <SectionEyebrow>
                    Our Team
                  </SectionEyebrow>
                </Reveal>

                <Reveal delay={0.2}>
                  <h2
                    className="text-[clamp(2.4rem,5vw,4rem)] font-light tracking-tight leading-[1.1] mb-16 max-w-[800px]"
                    style={{ color: '#2a2218' }}
                  >
                    The minds behind Trinade
                  </h2>
                </Reveal>

                <TeamGrid />
              </div>
            </div>
          </section>

          <SolutionsFooter />
        </SmoothScroll>

        <SolutionsCookiePopup />
      </div>
    </>
  )
}