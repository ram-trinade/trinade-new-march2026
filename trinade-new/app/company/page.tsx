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
    desc: 'Every engagement is tailored to the client\u2019s context \u2014 industry, workflow, and goals \u2014 so solutions are usable, practical, and aligned with real needs.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'V/04',
    title: 'Responsible AI',
    desc: 'AI is applied with care and intention \u2014 focused on accuracy, reliability, and outcomes that teams can confidently stand behind.',
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
    desc: 'Growth is pursued through responsible expansion \u2014 building across sectors while preserving quality, trust, and long-term value.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
]

const TIMELINE = [
  { year: '2020', title: 'Founded', desc: 'Trinade AI Technologies Pvt. Ltd. established in Guntur with a long-term focus on building useful products and dependable services.' },
  { year: '2021', title: 'Product + Services Direction', desc: 'Committed to a dual model \u2014 building products while delivering software and web solutions that improve business operations.' },
  { year: '2023', title: 'Expansion Roadmap', desc: 'Defined plans to expand into multiple sectors guided by trust, reliability, and measurable outcomes.' },
  { year: '2024', title: 'Sleep Alert Device', desc: 'Initiated development of a safety-focused concept for automotive applications designed for real-world impact.' },
  { year: '2025', title: 'Fly High', desc: 'Began building Fly High as part of Trinade\u2019s product roadmap and platform direction.' },
  { year: '2026', title: 'Website + Offerings Launch', desc: 'Launch of the website and structured offerings \u2014 opening collaborations with businesses, startups, and community initiatives.' },
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
    bio: 'BI Analyst with an MS in Business Intelligence & Analytics (Stevens, GPA 3.84) and experience across pharma and e-commerce analytics. Strong in SQL, Python, Power BI, and Tableau \u2014 building KPI dashboards and stakeholder-ready insights. At Trinade, supports requirements, process flows, Excel analysis, and UAT for early-stage initiatives.',
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
    bio: 'Founder and CMD of Trinade, focused on creating products and services that make life better through responsible innovation. Leads the company\u2019s vision across AI-backed solutions, product engineering, and trusted delivery. Believes the strongest technology supports human intelligence and real-world progress.',
    tagline: 'Builds responsibly \u2014 combining human judgment with intelligent systems',
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
    <div ref={sectionRef}>
      {/* Header + Arrows */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: '48px',
      }}>
        <div>
          <SectionEyebrow dark>Our Milestones</SectionEyebrow>
          <Reveal>
            <h2 style={{
              fontSize: 'clamp(26px, 3.5vw, 44px)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              color: 'rgba(255,255,255,0.93)',
              maxWidth: '500px',
            }}>
              A journey of disciplined progress.
            </h2>
          </Reveal>
        </div>

        {/* Arrow buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => scroll('left')}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: '1px solid rgba(201,168,110,0.3)',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              color: '#c9a86e',
            }}
            aria-label="Scroll left"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: '1px solid rgba(201,168,110,0.3)',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              color: '#c9a86e',
            }}
            aria-label="Scroll right"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="scrollbar-none"
        style={{
          display: 'flex',
          gap: '24px',
          overflowX: 'auto',
          paddingBottom: '16px',
          scrollSnapType: 'x mandatory',
        }}
      >
        {TIMELINE.map((item, i) => (
          <MilestoneCard key={item.year} item={item} index={i} isInView={isInView} />
        ))}
      </div>
    </div>
  )
}

function MilestoneCard({ item, index, isInView }: { item: typeof TIMELINE[0]; index: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE_CINEMATIC }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        minWidth: '380px',
        maxWidth: '380px',
        borderRadius: '20px',
        background: '#1a1a1e',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 36px',
        scrollSnapAlign: 'start',
        flexShrink: 0,
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered
          ? '0 24px 60px rgba(0,0,0,0.25)'
          : '0 8px 24px rgba(0,0,0,0.1)',
      }}
    >
      {/* Gold accent line at top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: isHovered
          ? 'linear-gradient(90deg, #c9a86e, #d4bb8a, #c9a86e)'
          : 'linear-gradient(90deg, rgba(160,128,64,0.6), rgba(201,168,110,0.6), rgba(212,187,138,0.6))',
        transition: 'background 0.5s ease',
      }} />

      {/* Grain */}
      <Grain id={`grain-card-${index}`} opacity={0.03} />

      {/* Year */}
      <p style={{
        fontSize: '48px',
        fontWeight: 300,
        letterSpacing: '-0.03em',
        background: 'linear-gradient(135deg, #c9a86e, #d4bb8a)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: 1,
        position: 'relative',
        zIndex: 2,
        marginBottom: '32px',
      }}>
        {item.year}
      </p>

      {/* Title */}
      <h4 style={{
        fontSize: '22px',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.93)',
        marginBottom: '14px',
        letterSpacing: '-0.01em',
        position: 'relative',
        zIndex: 2,
      }}>
        {item.title}
      </h4>

      {/* Description */}
      <p style={{
        fontSize: '15px',
        lineHeight: 1.75,
        color: 'rgba(255,255,255,0.5)',
        position: 'relative',
        zIndex: 2,
      }}>
        {item.desc}
      </p>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════
   TEAM CARDS — Collapsing/Expanding with Image
   ═══════════════════════════════════════════ */
function TeamAccordion() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column' }}>
      {TEAM.map((member, i) => {
        const isExpanded = expandedIndex === i
        const num = String(i + 1).padStart(2, '0')
        const initials = member.name.split(' ').map(n => n[0]).join('')

        return (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.08, ease: EASE_CINEMATIC }}
          >
            {/* Separator line */}
            <div style={{ height: '1px', background: 'rgba(42,34,24,0.08)' }} />

            {/* Card — clickable row */}
            <div
              style={{ cursor: 'pointer', padding: 'clamp(24px, 2.4vw, 36px) 0' }}
              onClick={() => setExpandedIndex(isExpanded ? null : i)}
            >
              {/* Top row: text left + image right */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: 'clamp(20px, 3vw, 48px)',
                alignItems: 'center',
              }}>
                {/* LEFT: Role + Name + Tagline */}
                <div style={{ position: 'relative', zIndex: 2, minWidth: 0 }}>
                  {/* Role label */}
                  <span style={{
                    display: 'inline-block',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: '#c9a86e',
                    marginBottom: '6px',
                  }}>
                    {member.role}
                  </span>

                  {/* Name with ghost number */}
                  <div style={{ position: 'relative' }}>
                    <span style={{
                      position: 'absolute',
                      right: '0',
                      top: '50%',
                      transform: 'translateY(-50%) translateX(20%)',
                      fontSize: 'clamp(70px, 9vw, 130px)',
                      fontWeight: 200,
                      color: 'rgba(42,34,24,0.04)',
                      lineHeight: 1,
                      userSelect: 'none',
                      pointerEvents: 'none',
                      letterSpacing: '-0.04em',
                      zIndex: 0,
                    }}>
                      {num}
                    </span>
                    <h3 style={{
                      fontSize: 'clamp(26px, 3.2vw, 42px)',
                      fontWeight: 500,
                      color: '#2a2218',
                      letterSpacing: '-0.025em',
                      lineHeight: 1.15,
                      position: 'relative',
                      zIndex: 1,
                    }}>
                      {member.name}
                    </h3>
                  </div>

                  <p style={{
                    fontSize: '16px',
                    fontStyle: 'italic',
                    color: 'rgba(42,34,24,0.35)',
                    marginTop: '6px',
                    lineHeight: 1.5,
                    position: 'relative',
                    zIndex: 1,
                  }}>
                    {member.tagline}
                  </p>
                </div>

                {/* RIGHT: Image + Toggle — image collapses/expands */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <motion.div
                    animate={{
                      width: isExpanded ? 'clamp(140px, 14vw, 200px)' : 'clamp(90px, 9vw, 130px)',
                      height: isExpanded ? 'clamp(160px, 16vw, 240px)' : 'clamp(80px, 8vw, 115px)',
                      borderRadius: isExpanded ? '16px' : '12px',
                    }}
                    transition={{ duration: 0.65, ease: EASE_CINEMATIC }}
                    style={{
                      background: member.mesh,
                      position: 'relative',
                      overflow: 'hidden',
                      flexShrink: 0,
                      boxShadow: isExpanded
                        ? '0 20px 50px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.1)'
                        : '0 4px 16px rgba(0,0,0,0.06)',
                    }}
                  >
                    {/* Inner shadow */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      boxShadow: 'inset 0 -40px 60px rgba(0,0,0,0.25)',
                      pointerEvents: 'none',
                      zIndex: 2,
                    }} />
                    <Grain id={`grain-member-${i}`} opacity={0.04} />
                    {/* Initials */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1,
                    }}>
                      <motion.span
                        animate={{
                          fontSize: isExpanded ? 'clamp(48px, 5vw, 80px)' : 'clamp(24px, 2.5vw, 36px)',
                        }}
                        transition={{ duration: 0.65, ease: EASE_CINEMATIC }}
                        style={{
                          fontWeight: 200,
                          color: 'rgba(255,255,255,0.12)',
                          letterSpacing: '0.08em',
                          userSelect: 'none',
                        }}
                      >
                        {initials}
                      </motion.span>
                    </div>
                  </motion.div>

                  {/* Toggle */}
                  <motion.div
                    animate={{ rotate: isExpanded ? 45 : 0 }}
                    transition={{ duration: 0.35, ease: EASE_UI }}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: `1px solid ${isExpanded ? 'rgba(201,168,110,0.5)' : 'rgba(201,168,110,0.35)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      fontWeight: 300,
                      color: isExpanded ? '#c9a86e' : '#a0814a',
                      flexShrink: 0,
                      transition: 'color 0.4s ease, border-color 0.4s ease, background 0.4s ease',
                      background: isExpanded ? 'rgba(201,168,110,0.08)' : 'transparent',
                    }}
                  >
                    +
                  </motion.div>
                </div>
              </div>

              {/* Expanded bio content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ paddingTop: '4px', maxWidth: '850px' }}>
                      <p style={{
                        fontSize: '17px',
                        lineHeight: 1.85,
                        color: 'rgba(42,34,24,0.55)',
                      }}>
                        {member.bio}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )
      })}

      {/* Final separator */}
      <div style={{ height: '1px', background: 'rgba(42,34,24,0.08)' }} />
    </div>
  )
}

/* ═══════════════════════════════════════════
   QUOTE SECTION — Striking Editorial Design
   ═══════════════════════════════════════════ */
function QuoteSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} style={{ position: 'relative', padding: 'clamp(40px, 6vh, 80px) 0' }}>
      {/* Giant decorative quotation mark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: EASE_CINEMATIC }}
        style={{
          position: 'absolute',
          top: 'clamp(20px, 4vh, 60px)',
          left: 'clamp(-20px, -2vw, -40px)',
          fontSize: 'clamp(200px, 25vw, 400px)',
          fontWeight: 200,
          lineHeight: 0.8,
          background: 'linear-gradient(180deg, rgba(201,168,110,0.12) 0%, rgba(201,168,110,0.03) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
          fontFamily: 'Georgia, serif',
        }}
      >
        &ldquo;
      </motion.div>

      {/* Quote text */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: EASE_CINEMATIC }}
          style={{
            fontSize: 'clamp(26px, 3.8vw, 52px)',
            fontWeight: 300,
            lineHeight: 1.3,
            letterSpacing: '-0.025em',
            color: '#2a2218',
            maxWidth: '900px',
            margin: '0',
            paddingLeft: 'clamp(40px, 6vw, 100px)',
            borderLeft: '2px solid rgba(201,168,110,0.3)',
          }}
        >
          AI is the force shaping the next era — and responsible building is what turns that power into real progress.
        </motion.blockquote>

        {/* Attribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE_CINEMATIC }}
          style={{
            marginTop: 'clamp(32px, 4vh, 56px)',
            paddingLeft: 'clamp(40px, 6vw, 100px)',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {/* Gold dash */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE_CINEMATIC }}
            style={{
              width: '48px',
              height: '1px',
              background: '#c9a86e',
              transformOrigin: 'left',
            }}
          />
          <div>
            <p style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#2a2218',
              letterSpacing: '0.02em',
            }}>
              Peter
            </p>
            <p style={{
              fontSize: '13px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'rgba(42,34,24,0.35)',
              marginTop: '4px',
            }}>
              CMD / CEO, Trinade
            </p>
          </div>
        </motion.div>
      </div>

      {/* Closing quote mark — bottom right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: EASE_CINEMATIC }}
        style={{
          position: 'absolute',
          bottom: 'clamp(10px, 2vh, 40px)',
          right: 'clamp(0px, 2vw, 40px)',
          fontSize: 'clamp(120px, 15vw, 240px)',
          fontWeight: 200,
          lineHeight: 0.5,
          background: 'linear-gradient(180deg, rgba(201,168,110,0.08) 0%, rgba(201,168,110,0.02) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
          fontFamily: 'Georgia, serif',
        }}
      >
        &rdquo;
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════ */
export default function CompanyPage() {
  return (
    <>
      <style>{`
        .solutions-page, .solutions-page * { cursor: none !important; }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(15px, -20px) scale(1.02); }
          66% { transform: translate(-10px, 10px) scale(0.98); }
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="solutions-page relative bg-[#f2ede6]">
        <PremiumCursor />
        <SolutionsNavbar />
        <SmoothScroll>

          {/* ══════════════════════════════════════════════
              SECTION 1: HERO — Dark Cinematic Opening
              ══════════════════════════════════════════════ */}
          <section
            data-dark-section
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0a0a0a',
              position: 'relative',
              overflow: 'hidden',
              padding: '0 clamp(24px, 6vw, 80px)',
            }}
          >
            <Grain id="grain-hero" opacity={0.035} />

            {/* Spiral-lines-gold background overlay */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none', zIndex: 0 }}>
              <Image
                src="/spiral-lines-gold.jpg"
                alt=""
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>

            {/* Atmospheric orbs */}
            <div style={{ position: 'absolute', top: '10%', left: '15%', width: '45vw', height: '45vw', maxWidth: '600px', maxHeight: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,110,0.06) 0%, transparent 65%)', pointerEvents: 'none', animation: 'float-slow 20s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', bottom: '5%', right: '10%', width: '35vw', height: '35vw', maxWidth: '450px', maxHeight: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(160,129,74,0.04) 0%, transparent 65%)', pointerEvents: 'none', animation: 'float-slow 25s ease-in-out infinite reverse' }} />

            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '1200px' }}>
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE_CINEMATIC }}
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.25em',
                  color: '#c9a86e',
                  marginBottom: '52px',
                }}
              >
                Our Story
              </motion.p>

              {/* Letter-by-letter TRINADE */}
              <HeroLetterReveal />

              {/* Thin gold line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.6, delay: 1.2, ease: EASE_CINEMATIC }}
                style={{
                  width: '160px',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, #c9a86e, transparent)',
                  margin: '48px auto',
                  transformOrigin: 'center',
                }}
              />

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5, ease: EASE_CINEMATIC }}
                style={{
                  fontSize: 'clamp(18px, 2.2vw, 26px)',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.55)',
                  textAlign: 'center',
                  maxWidth: '680px',
                  margin: '0 auto',
                  lineHeight: 1.65,
                  letterSpacing: '0.01em',
                }}
              >
                We saw the future coming and we wanted to build it responsibly.
              </motion.p>

              {/* Est detail */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2, ease: EASE_CINEMATIC }}
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginTop: '40px',
                }}
              >
                Est. 2020 &middot; Guntur, India
              </motion.p>
            </div>
          </section>

          {/* ══════════════════════════════════════════════
              QUOTE — Before Vision
              ══════════════════════════════════════════════ */}
          <section style={{
            padding: 'clamp(24px, 4vh, 60px) clamp(24px, 8vw, 120px)',
            paddingBottom: '0',
            backgroundColor: '#f2ede6',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
              <QuoteSection />
            </div>
          </section>

          {/* ══════════════════════════════════════════════
              SECTION 2: VISION — Editorial Split
              ══════════════════════════════════════════════ */}
          <section
            style={{
              padding: 'clamp(40px, 6vh, 80px) clamp(24px, 8vw, 120px)',
              backgroundColor: '#f2ede6',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Grain id="grain-vision" opacity={0.025} />

            <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
              <SectionEyebrow>Our Vision</SectionEyebrow>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
                gap: 'clamp(40px, 6vw, 100px)',
                alignItems: 'start',
              }}>
                <Reveal>
                  <h2 style={{
                    fontSize: 'clamp(30px, 4.5vw, 60px)',
                    fontWeight: 300,
                    lineHeight: 1.12,
                    letterSpacing: '-0.035em',
                    color: '#2a2218',
                  }}>
                    A trusted global solution provider creating products and services for a{' '}
                    <span style={{
                      background: 'linear-gradient(135deg, #c9a86e, #a08040)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                      better future.
                    </span>
                  </h2>
                </Reveal>

                <Reveal delay={0.15}>
                  <div>
                    <p style={{
                      fontSize: '16px',
                      lineHeight: 1.85,
                      color: 'rgba(42,34,24,0.55)',
                      marginBottom: '24px',
                    }}>
                      Trinade&apos;s vision is to build technology that makes life better through meaningful products, dependable services, and responsible innovation. AI is a key accelerator in this journey, helping organizations move faster, work smarter, and make clearer decisions across industries and communities.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>

            <GoldRule className="mt-16" />
          </section>

          {/* ══════════════════════════════════════════════
              SECTION 3: MISSION — Dark with 3 Pillars
              ══════════════════════════════════════════════ */}
          <section
            data-dark-section
            style={{
              padding: 'clamp(60px, 12vh, 140px) clamp(24px, 8vw, 120px)',
              backgroundColor: '#0a0a0a',
              color: 'rgba(255,255,255,0.93)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Grain id="grain-mission" opacity={0.035} />

            {/* Spiral-lines-gold background */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.12, pointerEvents: 'none', zIndex: 0 }}>
              <Image
                src="/spiral-lines-gold.jpg"
                alt=""
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Ambient glow */}
            <div style={{ position: 'absolute', top: '-15%', right: '-8%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,110,0.04) 0%, transparent 65%)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
              <SectionEyebrow dark>Our Mission</SectionEyebrow>

              <Reveal>
                <h2 style={{
                  fontSize: 'clamp(28px, 4vw, 52px)',
                  fontWeight: 300,
                  lineHeight: 1.2,
                  letterSpacing: '-0.03em',
                  maxWidth: '900px',
                  marginBottom: '72px',
                }}>
                  To deliver products and services that are effective, reliable, and scalable, using AI to enhance productivity, efficiency, and decision-making.
                </h2>
              </Reveal>

              <Reveal delay={0.15}>
                <p style={{
                  fontSize: '16px',
                  lineHeight: 1.85,
                  color: 'rgba(255,255,255,0.55)',
                  maxWidth: '800px',
                  marginBottom: '56px',
                  marginTop: '-40px',
                }}>
                  Trinade serves individuals, projects, and organizations across public, private, and community sectors, contributing to a more sustainable society through technology and social responsibility.
                </p>
              </Reveal>

              {/* Three mission pillars */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: '2px',
              }}>
                {[
                  {
                    num: '01',
                    title: 'Empower Expertise',
                    desc: 'AI-backed solutions designed to elevate teams \u2014 automating repetitive work, improving clarity, and supporting better outcomes with human judgment in control.',
                  },
                  {
                    num: '02',
                    title: 'Build for the Real World',
                    desc: 'Production-ready engineering from day one: clean architecture, strong testing discipline, stable performance, and solutions that remain dependable after launch.',
                  },
                  {
                    num: '03',
                    title: 'Measure What Matters',
                    desc: 'Success is defined by real results \u2014 faster operations, improved productivity, clearer decisions, and measurable efficiency delivered consistently.',
                  },
                ].map((pillar, i) => (
                  <Reveal key={pillar.num} delay={i * 0.12}>
                    <div
                      style={{
                        padding: 'clamp(32px, 4vw, 48px)',
                        borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                        borderTop: '1px solid rgba(201,168,110,0.15)',
                        position: 'relative',
                      }}
                    >
                      <span style={{
                        fontSize: '44px',
                        fontWeight: 200,
                        color: 'rgba(201,168,110,0.3)',
                        lineHeight: 1,
                        display: 'block',
                        marginBottom: '24px',
                        letterSpacing: '-0.04em',
                      }}>
                        {pillar.num}
                      </span>
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: 600,
                        marginBottom: '16px',
                        letterSpacing: '-0.01em',
                      }}>
                        {pillar.title}
                      </h3>
                      <p style={{
                        fontSize: '16px',
                        lineHeight: 1.85,
                        color: 'rgba(255,255,255,0.65)',
                      }}>
                        {pillar.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════
              SECTION 4: VALUES — AROX-Style Accordion Rows
              ══════════════════════════════════════════════ */}
          <section
            style={{
              padding: 'clamp(60px, 12vh, 140px) clamp(24px, 8vw, 120px)',
              backgroundColor: '#f2ede6',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Grain id="grain-values" opacity={0.02} />

            <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
              <SectionEyebrow>Our Values</SectionEyebrow>

              <Reveal>
                <h2 style={{
                  fontSize: 'clamp(26px, 3.5vw, 44px)',
                  fontWeight: 500,
                  letterSpacing: '-0.03em',
                  color: '#2a2218',
                  marginBottom: '64px',
                  maxWidth: '550px',
                }}>
                  Principles that guide every decision we make.
                </h2>
              </Reveal>

              <ValuesAccordion />
            </div>
          </section>

          {/* ══════════════════════════════════════════════
              SECTION 5: MILESTONES — Horizontal Card Carousel
              ══════════════════════════════════════════════ */}
          <section
            data-dark-section
            style={{
              padding: 'clamp(60px, 12vh, 140px) clamp(24px, 8vw, 120px)',
              backgroundColor: '#0a0a0a',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Grain id="grain-milestones" opacity={0.025} />

            <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
              <MilestonesCarousel />
            </div>
          </section>

          {/* ══════════════════════════════════════════════
              SECTION 6: TEAM — Click-to-Expand Accordion
              ══════════════════════════════════════════════ */}
          <section
            style={{
              padding: 'clamp(60px, 12vh, 140px) clamp(24px, 8vw, 120px)',
              backgroundColor: '#f2ede6',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Grain id="grain-team" opacity={0.02} />

            <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
              <SectionEyebrow>Our Team</SectionEyebrow>

              <Reveal>
                <h2 style={{
                  fontSize: 'clamp(26px, 3.5vw, 44px)',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  color: '#2a2218',
                  marginBottom: '16px',
                  maxWidth: '600px',
                }}>
                  The people behind the intelligence.
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <p style={{
                  fontSize: '16px',
                  lineHeight: 1.85,
                  color: 'rgba(42,34,24,0.55)',
                  maxWidth: '560px',
                  marginBottom: '60px',
                }}>
                  Engineers, researchers, designers, and strategists — united by a shared obsession with building AI that works in the real world.
                </p>
              </Reveal>

              <TeamAccordion />
            </div>
          </section>

          <SolutionsFooter />
        </SmoothScroll>
        <SolutionsCookiePopup />
      </div>
    </>
  )
}
