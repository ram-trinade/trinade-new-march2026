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
    desc: 'Transparency and honesty in every engagement. We build trust through ethical practices and open communication — no black boxes, no hidden agendas.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: 'V/02',
    title: 'Driven by Innovation',
    desc: 'We push boundaries not for novelty, but to solve problems that matter. Every experiment, every prototype — in pursuit of solutions that move the needle.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    id: 'V/03',
    title: 'Built on Partnership',
    desc: 'Your challenges become ours. We invest deeply in understanding your domain, your constraints, your ambitions — and co-create solutions that are uniquely yours.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'V/04',
    title: 'Engineering Excellence',
    desc: 'Every architecture decision, every line of code, every deployment — held to the highest standard. We build systems that work at 3 AM on a holiday weekend.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /><line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
  },
  {
    id: 'V/05',
    title: 'Human-Centered Design',
    desc: 'Technology that augments, never replaces. We design systems for collaboration between human expertise and machine capability.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    id: 'V/06',
    title: 'Sustainable Growth',
    desc: 'We grow deliberately — scaling our impact without sacrificing quality. Every decision is measured against long-term value.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
]

const TIMELINE = [
  { year: '2021', title: 'Founded', desc: 'Founded in Guntur with a conviction: AI should empower enterprises, not intimidate them. Three engineers, one vision, zero shortcuts.' },
  { year: '2022', title: 'First Solutions', desc: 'Delivered our first AI-powered platform for healthcare document processing. Proved that enterprise-grade AI doesn\'t require enterprise-grade complexity.' },
  { year: '2023', title: 'Enterprise Trust', desc: 'Secured partnerships across healthcare, legal, and financial services. Our systems processed their first billion data points with zero downtime.' },
  { year: '2024', title: 'Scaling', desc: 'Expanded into manufacturing and logistics verticals. Built our modular architecture framework that lets clients scale without starting over.' },
  { year: '2025', title: 'Platform Launch', desc: 'Launched Trinade Core — our flagship platform. Sub-12ms response times, 99.9% uptime, and the trust of organizations who bet their operations on our systems.' },
  { year: '2026', title: 'Global Vision', desc: 'Pushing into edge AI, federated learning, and next-generation interfaces. The mission hasn\'t changed — the ambition has grown.' },
]

const TEAM = [
  {
    name: 'Sale Pitchaiah',
    role: 'Founder & CEO',
    bio: 'Visionary technologist who founded Trinade with the belief that AI should amplify human potential, not replace it. Leads strategy, culture, and the relentless pursuit of engineering excellence.',
    tagline: 'Builds systems that think in decades',
    funFact: 'Collects rare fountain pens from the 1920s',
    mesh: 'radial-gradient(ellipse at 25% 75%, rgba(201,168,110,0.7) 0%, transparent 55%), radial-gradient(ellipse at 75% 25%, rgba(212,187,138,0.6) 0%, transparent 55%), radial-gradient(ellipse at 50% 50%, rgba(139,105,20,0.4) 0%, transparent 65%), linear-gradient(135deg, #2a2218 0%, #1a1a1e 100%)',
  },
  {
    name: 'Vikram Rao',
    role: 'CTO',
    bio: 'Architect of Trinade\'s technical vision. 12+ years building distributed systems and ML pipelines at scale. Obsessed with clean abstractions and production reliability.',
    tagline: 'Architect of distributed intelligence',
    funFact: 'Has completed 14 ultra-marathons across 6 continents',
    mesh: 'radial-gradient(ellipse at 30% 70%, rgba(42,42,94,0.6) 0%, transparent 55%), radial-gradient(ellipse at 70% 30%, rgba(201,168,110,0.4) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(26,26,62,0.5) 0%, transparent 60%), linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%)',
  },
  {
    name: 'Deepa Menon',
    role: 'Head of AI Research',
    bio: 'Leads our research lab, translating cutting-edge ML papers into production systems. Specializes in NLP, computer vision, and making the impossible feel routine.',
    tagline: 'Translating research into production',
    funFact: 'Published poet in three languages',
    mesh: 'radial-gradient(ellipse at 20% 80%, rgba(160,129,74,0.5) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(201,168,110,0.6) 0%, transparent 50%), radial-gradient(ellipse at 45% 55%, rgba(42,34,24,0.6) 0%, transparent 55%), linear-gradient(135deg, #1a1510 0%, #2a2218 100%)',
  },
  {
    name: 'Rahul Krishnan',
    role: 'VP of Engineering',
    bio: 'Builds and leads the engineering team that turns prototypes into production-grade systems. Expert in cloud infrastructure, DevOps, and systems that scale gracefully under pressure.',
    tagline: 'Engineering at scale, under pressure',
    funFact: 'Restored a 1967 Royal Enfield from scratch',
    mesh: 'radial-gradient(ellipse at 35% 65%, rgba(139,105,20,0.5) 0%, transparent 50%), radial-gradient(ellipse at 65% 35%, rgba(42,34,24,0.7) 0%, transparent 55%), radial-gradient(ellipse at 50% 50%, rgba(201,168,110,0.3) 0%, transparent 60%), linear-gradient(135deg, #15130e 0%, #1e1c17 100%)',
  },
  {
    name: 'Ananya Sharma',
    role: 'Head of Product & Design',
    bio: 'Bridges the gap between engineering brilliance and human usability. Ensures every product we ship is as intuitive as it is intelligent. Where empathy meets interface.',
    tagline: 'Where empathy meets interface',
    funFact: 'Teaches calligraphy workshops on weekends',
    mesh: 'radial-gradient(ellipse at 25% 70%, rgba(212,187,138,0.5) 0%, transparent 50%), radial-gradient(ellipse at 75% 30%, rgba(180,130,55,0.4) 0%, transparent 50%), radial-gradient(ellipse at 50% 60%, rgba(242,237,230,0.2) 0%, transparent 55%), linear-gradient(135deg, #1e1a14 0%, #262218 100%)',
  },
  {
    name: 'Karthik Nair',
    role: 'Director of Cloud Architecture',
    bio: 'Designs and oversees the cloud infrastructure that powers Trinade\'s entire platform. Builds systems that treat infrastructure as a competitive moat, not just a utility.',
    tagline: 'Infrastructure as a competitive moat',
    funFact: 'Amateur astronomer — discovered a minor asteroid',
    mesh: 'radial-gradient(ellipse at 30% 75%, rgba(42,34,24,0.7) 0%, transparent 50%), radial-gradient(ellipse at 70% 25%, rgba(139,105,20,0.5) 0%, transparent 50%), radial-gradient(ellipse at 55% 50%, rgba(201,168,110,0.3) 0%, transparent 60%), linear-gradient(135deg, #121210 0%, #1a1816 100%)',
  },
  {
    name: 'Priya Ramanathan',
    role: 'Head of Client Success',
    bio: 'Champions the client experience from onboarding through long-term partnership. Ensures every deployment delivers measurable business outcomes and lasting relationships.',
    tagline: 'Building relationships, not just systems',
    funFact: 'Competitive chess player — ranked nationally in her age group',
    mesh: 'radial-gradient(ellipse at 40% 60%, rgba(201,168,110,0.5) 0%, transparent 50%), radial-gradient(ellipse at 60% 40%, rgba(160,129,74,0.4) 0%, transparent 55%), radial-gradient(ellipse at 50% 50%, rgba(42,34,24,0.5) 0%, transparent 60%), linear-gradient(135deg, #1a1614 0%, #22201c 100%)',
  },
  {
    name: 'Leo Nakamura',
    role: 'VP of Strategic Partnerships',
    bio: 'Builds the bridges between Trinade and the wider technology ecosystem. Identifies integration opportunities, forges alliances, and connects endpoints into thriving networks.',
    tagline: 'Connecting ecosystems, not just endpoints',
    funFact: 'Speaks five languages and collects vintage maps',
    mesh: 'radial-gradient(ellipse at 35% 70%, rgba(139,105,20,0.4) 0%, transparent 50%), radial-gradient(ellipse at 65% 30%, rgba(201,168,110,0.5) 0%, transparent 55%), radial-gradient(ellipse at 50% 55%, rgba(42,34,24,0.6) 0%, transparent 60%), linear-gradient(135deg, #14120e 0%, #1c1a16 100%)',
  },
]

const STATS = [
  { value: '500', suffix: '+', label: 'Enterprise Deployments' },
  { value: '99.9', suffix: '%', label: 'Uptime Guaranteed' },
  { value: '2.4', suffix: 'B+', label: 'Data Points Processed' },
  { value: '12', suffix: 'ms', label: 'Avg Response Time' },
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

/* Animated counter for stats */
function AnimatedStat({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!isInView) return
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ''))
    const hasDecimal = value.includes('.')
    const duration = 2200
    const start = performance.now()

    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      const current = numeric * eased
      setDisplay(hasDecimal ? current.toFixed(1) : Math.floor(current).toString())
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, value])

  return <span ref={ref}>{display}{suffix}</span>
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
            fontSize: 'clamp(60px, 14vw, 200px)',
            fontWeight: 200,
            letterSpacing: '-0.04em',
            lineHeight: 0.85,
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(201,168,110,0.5)',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(201,168,110,0.6) 100%)',
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
   VALUES ACCORDION — AROX-Style Rows
   ═══════════════════════════════════════════ */
function ValuesAccordion() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} style={{ width: '100%' }}>
      {/* Top border */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

      {VALUES.map((value, i) => {
        const isExpanded = expandedIndex === i

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
                gridTemplateColumns: '80px 1fr auto',
                alignItems: 'center',
                padding: '28px 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                color: 'inherit',
                font: 'inherit',
                transition: 'opacity 0.3s ease',
              }}
            >
              {/* Label */}
              <span style={{
                fontSize: '12px',
                fontWeight: 500,
                color: isExpanded ? '#c9a86e' : 'rgba(255,255,255,0.25)',
                letterSpacing: '0.05em',
                transition: 'color 0.4s ease',
              }}>
                {value.id}
              </span>

              {/* Title */}
              <span style={{
                fontSize: 'clamp(20px, 2.5vw, 32px)',
                fontWeight: 400,
                color: isExpanded ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.6)',
                letterSpacing: '-0.02em',
                transition: 'color 0.4s ease',
              }}>
                {value.title}
              </span>

              {/* Toggle icon */}
              <motion.span
                animate={{ rotate: isExpanded ? 45 : 0 }}
                transition={{ duration: 0.3, ease: EASE_UI }}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 300,
                  color: isExpanded ? '#c9a86e' : 'rgba(255,255,255,0.3)',
                  transition: 'border-color 0.4s ease, color 0.4s ease',
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
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr auto',
                    alignItems: 'start',
                    paddingBottom: '32px',
                  }}>
                    {/* Spacer for alignment */}
                    <div />

                    {/* Description */}
                    <p style={{
                      fontSize: '16px',
                      lineHeight: 1.85,
                      color: 'rgba(255,255,255,0.45)',
                      maxWidth: '600px',
                      paddingRight: '40px',
                    }}>
                      {value.desc}
                    </p>

                    {/* Geometric icon */}
                    <div style={{
                      color: 'rgba(201,168,110,0.4)',
                      opacity: 0.7,
                    }}>
                      {value.icon}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom border */}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
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
              A journey of relentless progress.
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
        minWidth: '320px',
        maxWidth: '320px',
        height: '380px',
        borderRadius: '20px',
        background: '#1a1a1e',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '36px 32px',
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
        height: '4px',
        background: 'linear-gradient(90deg, #a08040, #c9a86e, #d4bb8a)',
      }} />

      {/* Grain */}
      <Grain id={`grain-card-${index}`} opacity={0.03} />

      {/* Year */}
      <p style={{
        fontSize: '48px',
        fontWeight: 200,
        letterSpacing: '-0.04em',
        background: 'linear-gradient(135deg, #c9a86e, #d4bb8a)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: 1,
        marginBottom: '20px',
        position: 'relative',
        zIndex: 2,
      }}>
        {item.year}
      </p>

      {/* Title */}
      <h4 style={{
        fontSize: '20px',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.93)',
        marginBottom: '12px',
        letterSpacing: '-0.01em',
        position: 'relative',
        zIndex: 2,
      }}>
        {item.title}
      </h4>

      {/* Description */}
      <p style={{
        fontSize: '16px',
        lineHeight: 1.85,
        color: 'rgba(255,255,255,0.45)',
        position: 'relative',
        zIndex: 2,
      }}>
        {item.desc}
      </p>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════
   TEAM ACCORDION — Click-to-Expand Rows
   ═══════════════════════════════════════════ */
function TeamAccordion() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref}>
      {TEAM.map((member, i) => {
        const isExpanded = expandedIndex === i
        const num = String(i + 1).padStart(2, '0')

        return (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.08, ease: EASE_CINEMATIC }}
          >
            {/* Separator line */}
            <div style={{
              height: '1px',
              background: 'rgba(0,0,0,0.08)',
            }} />

            {/* Row button */}
            <button
              onClick={() => setExpandedIndex(isExpanded ? null : i)}
              style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '60px 1fr auto auto',
                alignItems: 'center',
                gap: '24px',
                padding: '32px 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                color: 'inherit',
                font: 'inherit',
                position: 'relative',
              }}
            >
              {/* Number */}
              <span style={{
                fontSize: '14px',
                fontWeight: 400,
                color: 'rgba(42,34,24,0.2)',
                letterSpacing: '0.05em',
              }}>
                {num}
              </span>

              {/* Name + Role + Tagline */}
              <div>
                <span style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: '#c9a86e',
                  marginBottom: '6px',
                }}>
                  {member.role}
                </span>
                <span style={{
                  display: 'block',
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  fontWeight: 500,
                  color: '#2a2218',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}>
                  {member.name}
                </span>
                <span style={{
                  display: 'block',
                  fontSize: '16px',
                  fontStyle: 'italic',
                  color: 'rgba(42,34,24,0.35)',
                  marginTop: '4px',
                  lineHeight: 1.5,
                }}>
                  {member.tagline}
                </span>
              </div>

              {/* Spacer */}
              <div />

              {/* Toggle button */}
              <motion.span
                animate={{ rotate: isExpanded ? 45 : 0 }}
                transition={{ duration: 0.3, ease: EASE_UI }}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1px solid rgba(42,34,24,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 300,
                  color: isExpanded ? '#c9a86e' : 'rgba(42,34,24,0.3)',
                  transition: 'color 0.4s ease, border-color 0.4s ease',
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
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr 300px',
                    gap: '24px',
                    paddingBottom: '40px',
                    alignItems: 'start',
                  }}>
                    {/* Spacer */}
                    <div />

                    {/* Bio + Fun fact */}
                    <div>
                      <p style={{
                        fontSize: '16px',
                        lineHeight: 1.85,
                        color: 'rgba(42,34,24,0.55)',
                        marginBottom: '20px',
                        maxWidth: '520px',
                      }}>
                        {member.bio}
                      </p>
                      <p style={{
                        fontSize: '16px',
                        lineHeight: 1.85,
                        color: 'rgba(42,34,24,0.35)',
                        fontStyle: 'italic',
                      }}>
                        &bull; Fun fact: {member.funFact}
                      </p>
                    </div>

                    {/* Mesh gradient portrait */}
                    <div
                      style={{
                        width: '300px',
                        height: '300px',
                        borderRadius: '16px',
                        background: member.mesh,
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Inner shadow */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        boxShadow: 'inset 0 -40px 60px rgba(0,0,0,0.2)',
                        pointerEvents: 'none',
                      }} />
                      {/* Initials */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <span style={{
                          fontSize: '56px',
                          fontWeight: 200,
                          color: 'rgba(255,255,255,0.12)',
                          letterSpacing: '0.1em',
                          userSelect: 'none',
                        }}>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}

      {/* Final separator */}
      <div style={{ height: '1px', background: 'rgba(0,0,0,0.08)' }} />
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
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.25em',
                  color: '#c9a86e',
                  marginBottom: '48px',
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
                  fontSize: 'clamp(16px, 1.8vw, 22px)',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.5)',
                  textAlign: 'center',
                  maxWidth: '600px',
                  margin: '0 auto',
                  lineHeight: 1.7,
                  letterSpacing: '0.01em',
                }}
              >
                Engineering intelligence for the enterprise of tomorrow.
              </motion.p>

              {/* Est detail */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2, ease: EASE_CINEMATIC }}
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.2)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginTop: '40px',
                }}
              >
                Est. 2021 &middot; Guntur, India
              </motion.p>
            </div>
          </section>

          {/* ══════════════════════════════════════════════
              SECTION 2: VISION — Editorial Split
              ══════════════════════════════════════════════ */}
          <section
            style={{
              padding: 'clamp(60px, 12vh, 140px) clamp(24px, 8vw, 120px)',
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
                    A world where every enterprise operates at the speed of{' '}
                    <span style={{
                      background: 'linear-gradient(135deg, #c9a86e, #a08040)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                      intelligence.
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
                      We envision a future where AI isn&apos;t a competitive advantage — it&apos;s the baseline. Where every hospital, every law firm, every factory, every logistics network operates with intelligence woven into its DNA.
                    </p>
                    <p style={{
                      fontSize: '16px',
                      lineHeight: 1.85,
                      color: 'rgba(42,34,24,0.55)',
                    }}>
                      Not artificial intelligence that replaces human judgment, but augmented intelligence that makes every decision sharper, every process faster, every outcome more predictable. That&apos;s the world we&apos;re building toward — one system, one partnership, one breakthrough at a time.
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
                  To deliver AI solutions that are not just intelligent, but trustworthy, scalable, and deeply integrated into the fabric of modern enterprise.
                </h2>
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
                    title: 'Empower, Don\'t Replace',
                    desc: 'AI that augments human expertise. We design for collaboration between people and machines — amplifying what teams do best while automating what slows them down.',
                  },
                  {
                    num: '02',
                    title: 'Build for the Real World',
                    desc: 'Production-grade from day one. Every system handles edge cases, scales under load, and stays reliable when it matters most — because in enterprise, downtime isn\'t an option.',
                  },
                  {
                    num: '03',
                    title: 'Measure What Matters',
                    desc: 'We track business outcomes, not vanity metrics. Success means your operations move faster, your decisions are sharper, and your competitive position is stronger.',
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
                        color: 'rgba(201,168,110,0.12)',
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
                        color: 'rgba(255,255,255,0.45)',
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
            data-dark-section
            style={{
              padding: 'clamp(60px, 12vh, 140px) clamp(24px, 8vw, 120px)',
              backgroundColor: '#0a0a0a',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Grain id="grain-values" opacity={0.035} />

            {/* Spiral-lines-gold subtle overlay */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.08, pointerEvents: 'none', zIndex: 0 }}>
              <Image
                src="/spiral-lines-gold.jpg"
                alt=""
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,110,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
              <SectionEyebrow dark>Our Values</SectionEyebrow>

              <Reveal>
                <h2 style={{
                  fontSize: 'clamp(26px, 3.5vw, 44px)',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  color: 'rgba(255,255,255,0.93)',
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

          {/* ══════════════════════════════════════════════
              SECTION 7: IMPACT — Stats on Dark
              ══════════════════════════════════════════════ */}
          <section
            data-dark-section
            style={{
              padding: 'clamp(80px, 14vh, 160px) clamp(24px, 8vw, 120px)',
              backgroundColor: '#0a0a0a',
              color: 'rgba(255,255,255,0.93)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Grain id="grain-stats" opacity={0.035} />

            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60vw', height: '60vw', maxWidth: '700px', maxHeight: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,110,0.04) 0%, transparent 65%)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
              <div style={{ textAlign: 'center', marginBottom: '72px' }}>
                <SectionEyebrow dark>Our Impact</SectionEyebrow>
                <Reveal>
                  <h2 style={{
                    fontSize: 'clamp(26px, 3.5vw, 44px)',
                    fontWeight: 300,
                    letterSpacing: '-0.03em',
                    maxWidth: '500px',
                    margin: '0 auto',
                  }}>
                    Performance that speaks for itself.
                  </h2>
                </Reveal>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                gap: '2px',
              }}>
                {STATS.map((s, i) => (
                  <Reveal key={s.label} delay={i * 0.1}>
                    <div
                      style={{
                        padding: '48px 32px',
                        textAlign: 'center',
                        borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                        position: 'relative',
                      }}
                    >
                      <p style={{
                        fontSize: 'clamp(44px, 6vw, 72px)',
                        fontWeight: 200,
                        letterSpacing: '-0.04em',
                        background: 'linear-gradient(135deg, #c9a86e, #d4bb8a)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginBottom: '16px',
                        lineHeight: 1,
                      }}>
                        <AnimatedStat value={s.value} suffix={s.suffix} />
                      </p>
                      <p style={{
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: 'rgba(255,255,255,0.35)',
                        fontWeight: 600,
                      }}>
                        {s.label}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════
              SECTION 8: CTA — Cinematic Close
              ══════════════════════════════════════════════ */}
          <section
            data-dark-section
            style={{
              padding: 'clamp(100px, 16vh, 220px) clamp(24px, 8vw, 120px)',
              backgroundColor: '#0a0a0a',
              color: 'rgba(255,255,255,0.93)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Grain id="grain-cta" opacity={0.035} />

            {/* Spiral-lines-gold background with dark overlay */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none', zIndex: 0 }}>
              <Image
                src="/spiral-lines-gold.jpg"
                alt=""
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.6) 100%)', pointerEvents: 'none', zIndex: 0 }} />

            {/* Double ambient glow */}
            <div style={{ position: 'absolute', top: '30%', left: '20%', width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,110,0.05) 0%, transparent 60%)', pointerEvents: 'none', animation: 'float-slow 18s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', bottom: '20%', right: '15%', width: '30vw', height: '30vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(160,129,74,0.04) 0%, transparent 60%)', pointerEvents: 'none', animation: 'float-slow 22s ease-in-out infinite reverse' }} />

            <div style={{ position: 'relative', zIndex: 2 }}>
              <Reveal>
                <p style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: '#c9a86e',
                  marginBottom: '36px',
                }}>
                  Let&apos;s Build Together
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 style={{
                  fontSize: 'clamp(32px, 5.5vw, 72px)',
                  fontWeight: 200,
                  lineHeight: 1.1,
                  letterSpacing: '-0.035em',
                  maxWidth: '800px',
                  margin: '0 auto 28px',
                }}>
                  Ready to engineer your{' '}
                  <span style={{
                    background: 'linear-gradient(135deg, #c9a86e, #d4bb8a)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    next breakthrough?
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p style={{
                  fontSize: '16px',
                  lineHeight: 1.85,
                  color: 'rgba(255,255,255,0.45)',
                  maxWidth: '520px',
                  margin: '0 auto 52px',
                }}>
                  Let&apos;s discuss how Trinade can accelerate your enterprise AI journey.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <a
                  href="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '20px 48px',
                    background: 'linear-gradient(135deg, rgba(201,168,110,0.15), rgba(201,168,110,0.05))',
                    border: '1px solid rgba(201,168,110,0.3)',
                    color: '#d4bb8a',
                    borderRadius: '9999px',
                    fontSize: '16px',
                    fontWeight: 500,
                    textDecoration: 'none',
                    letterSpacing: '0.03em',
                    backdropFilter: 'blur(16px)',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'linear-gradient(135deg, rgba(201,168,110,0.25), rgba(201,168,110,0.1))'
                    el.style.borderColor = 'rgba(201,168,110,0.5)'
                    el.style.transform = 'translateY(-2px)'
                    el.style.boxShadow = '0 12px 40px rgba(201,168,110,0.15)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'linear-gradient(135deg, rgba(201,168,110,0.15), rgba(201,168,110,0.05))'
                    el.style.borderColor = 'rgba(201,168,110,0.3)'
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  Get in Touch
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </Reveal>
            </div>
          </section>

          <SolutionsFooter />
        </SmoothScroll>
        <SolutionsCookiePopup />
      </div>
    </>
  )
}
