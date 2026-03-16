'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ═══════════════════════════════════════════════════════════
// HOMEPAGE — Using IT Solutions-inspired sections not in Solutions page
// Charcoal / Cream / Gold design system
// ═══════════════════════════════════════════════════════════

const P = {
  charcoal: '#1a1a1e',
  cream: '#f2ede6',
  creamDark: '#e5e0d8',
  creamMid: '#ebe6de',
  white: '#faf9f7',
  textDark: '#2d2d2d',
  textMuted: '#7a7a7a',
  textDimmed: '#a0a0a0',
  textOnDark: '#f0ede8',
  textOnDarkMuted: 'rgba(240, 237, 232, 0.55)',
  gold: '#c9a86e',
  goldLight: '#d4bb8a',
  goldDark: '#a08040',
  lime: '#c8d84e',
}

const EASE = [0.25, 0.1, 0.25, 1] as const
const EASE_OUT = [0.16, 1, 0.3, 1] as const

// ─── Data ───
const challenges = [
  {
    title: 'Technology Investments Without Clear Returns',
    tags: ['Strategy Assessment', 'Use Case Prioritization', 'ROI Analysis'],
  },
  {
    title: 'Disconnected Systems Blocking Growth',
    tags: ['System Integration', 'Data Unification', 'Platform Architecture'],
  },
  {
    title: 'Compliance in Regulated Industries',
    tags: ['Healthcare Standards', 'Financial Compliance', 'Audit-Ready Systems'],
  },
  {
    title: 'Scaling from Pilot to Full Deployment',
    tags: ['Operations Monitoring', 'Auto-Scaling Infrastructure', 'Continuous Delivery'],
  },
  {
    title: 'Legacy Systems Resisting Modernization',
    tags: ['API-First Integration', 'System Migration', 'Cloud Transition'],
  },
]

const values = [
  {
    number: 'V / 01',
    title: 'Led by deep discovery',
    description: 'We begin by understanding your business — mapping workflows, identifying pain points, and uncovering opportunities where technology can create the most impact.',
    icon: 'search',
  },
  {
    number: 'V / 02',
    title: 'to architect with precision',
    description: 'Every solution starts with a blueprint. We design scalable, secure systems tailored to your industry — from data pipelines to user-facing platforms.',
    icon: 'grid',
  },
  {
    number: 'V / 03',
    title: 'building with engineering excellence',
    description: 'Our team builds with precision — clean code, rigorous testing, and continuous integration ensuring every release is production-ready from day one.',
    icon: 'code',
  },
  {
    number: 'V / 04',
    title: 'to drive continuous evolution.',
    description: 'Technology doesn\'t stand still, and neither do we. We monitor, optimize, and evolve your systems to keep pace with changing demands and new possibilities.',
    icon: 'evolve',
  },
]

const scrollCards = [
  { title: 'Cybersecurity & Compliance.', body: 'Proactive threat management, zero-trust architecture, and compliance frameworks that keep your business protected and audit-ready across every regulatory landscape.' },
  { title: 'Cloud Infrastructure.', body: 'Multi-cloud orchestration, seamless migration, and hybrid environments designed for performance, resilience, and cost efficiency at any scale.' },
  { title: 'Managed IT Services.', body: '24/7 monitoring, helpdesk support, and network management that keeps your operations running smoothly — so your team can focus on what matters.' },
  { title: 'AI & Data Intelligence.', body: 'Predictive analytics, natural language processing, and computer vision that turn raw data into actionable insights and smarter business decisions.' },
  { title: 'Strategic Consulting.', body: 'IT roadmap planning, digital strategy, and change management that align technology investments with your business goals and long-term vision.' },
  { title: 'Professional Services.', body: 'End-to-end project management, system integration, and custom development delivered by experienced teams who understand your industry.' },
]


// ─── Grain overlay ───
function Grain({ id, opacity = 0.035 }: { id: string; opacity?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none mix-blend-overlay" style={{ opacity }}>
      <svg width="100%" height="100%">
        <filter id={id}><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter={`url(#${id})`} />
      </svg>
    </div>
  )
}


// ═══════════════════════════════════════════════════════════
// HERO — "Experience AI Excellence." large heading + gradient card
// ═══════════════════════════════════════════════════════════
function HomeHeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <section ref={ref} className="relative h-[100vh] h-[100dvh] flex flex-col overflow-hidden" style={{ background: P.cream }}>
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none">
        <Image src="/gradient-orbs-warm.jpg" alt="" fill className="object-cover" priority />
      </div>
      <Grain id="homeHeroGrain" opacity={0.02} />

      <div className="relative z-10 w-full px-[clamp(2rem,8vw,8rem)] pt-32 pb-6 shrink-0">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: EASE_OUT }}
          className="leading-[1.05] tracking-[-0.04em]"
          style={{ fontSize: 'clamp(2.6rem, 6vw, 5.2rem)', fontWeight: 400, color: P.textDark }}
        >
          Technology that<br />works for you.
        </motion.h1>
      </div>

      {/* Gradient card below hero — IT Solutions style */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.0, delay: 0.3, ease: EASE_OUT }}
        className="relative z-10 mx-[clamp(2rem,8vw,8rem)] mb-6 flex-1 min-h-0"
      >
        <div className="relative rounded-[24px] overflow-hidden h-full">
          <div className="absolute inset-0">
            <Image src="/gradient-mesh-warm.jpg" alt="" fill className="object-cover" />
          </div>
          <Grain id="heroCardGrain" opacity={0.03} />

          <div className="relative z-10 p-[clamp(1.5rem,4vw,4rem)] flex flex-col justify-end h-full">
            <p
              className="leading-[1.25] tracking-[-0.02em] max-w-[900px]"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 2.4rem)', fontWeight: 400, color: P.textDark }}
            >
              From cybersecurity and cloud management to custom software and strategic consulting, we deliver solutions designed to strengthen operations, streamline workflows, and drive measurable growth.
            </p>

            <div className="flex items-center gap-6 mt-8">
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-[14px] font-medium transition-all duration-300 hover:scale-[1.02]"
                style={{ background: P.charcoal, color: P.textOnDark }}
              >
                Get started
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-[14px] font-medium transition-opacity duration-300 hover:opacity-60"
                style={{ color: P.textMuted }}
              >
                Talk to us
                <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════
// FLOATING CARDS — AROX/Hatamex inspired hero card grid
// Dark section with staggered slide-in capability cards
// Creating depth through offsets, shadows, and parallax
// ═══════════════════════════════════════════════════════════

const capabilityCards = [
  {
    title: 'Custom Software',
    subtitle: 'Tailored applications built for your workflows',
    image: '/gradient-mesh-warm.jpg',
    accent: 'rgba(201,168,110,0.35)',
  },
  {
    title: 'Enterprise Integration',
    subtitle: 'Connect systems, unify data, accelerate growth',
    image: '/gradient-orbs-warm.jpg',
    accent: 'rgba(212,187,138,0.30)',
  },
  {
    title: 'Cloud Infrastructure',
    subtitle: 'Scalable, resilient, cost-efficient',
    image: '/spiral-bg-dark.jpg',
    accent: 'rgba(160,128,64,0.25)',
  },
  {
    title: 'Cybersecurity',
    subtitle: 'Zero-trust architecture & compliance',
    image: '/spiral-wide.jpg',
    accent: 'rgba(201,168,110,0.30)',
  },
  {
    title: 'Strategic Consulting',
    subtitle: 'Align technology with business vision',
    image: '/spiral-light.jpg',
    accent: 'rgba(212,187,138,0.25)',
  },
  {
    title: 'Managed Services',
    subtitle: '24/7 monitoring and support',
    image: '/spiral-zoom.jpg',
    accent: 'rgba(201,168,110,0.20)',
  },
]

// Stagger delays for clean grid entrance
const cardDelays = [0, 0.06, 0.12, 0.04, 0.10, 0.16]

function FloatingCardsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-28 lg:py-36 overflow-hidden" style={{ background: '#0a0a0a' }}>
      <Grain id="floatingGrain" opacity={0.04} />

      {/* Atmospheric gradient orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,110,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-30%] left-[-10%] w-[50vw] h-[50vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,110,0.04) 0%, transparent 70%)' }} />

      <div className="relative z-10 px-[clamp(2rem,8vw,8rem)]">
        {/* Split layout: headline left, cards right */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">

          {/* Left: headline + description */}
          <div className="lg:w-[38%] lg:sticky lg:top-32 shrink-0">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-[12px] uppercase tracking-[0.2em] font-semibold mb-8"
              style={{ color: P.gold }}
            >
              What we build
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE_OUT }}
              className="leading-[1.08] tracking-[-0.03em] mb-8"
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
                fontWeight: 300,
                color: P.textOnDark,
              }}
            >
              The space between<br />
              ambition and<br />
              execution
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="text-[15px] leading-[1.85] max-w-[380px]"
              style={{ color: P.textOnDarkMuted }}
            >
              We bridge the gap between where your technology is and where it needs to be — with solutions designed to compound in value over time.
            </motion.p>

            {/* Gold rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: EASE_OUT }}
              className="mt-10 h-[1px] max-w-[200px]"
              style={{
                background: `linear-gradient(90deg, ${P.gold}66, transparent)`,
                transformOrigin: 'left',
              }}
            />
          </div>

          {/* Right: card grid (3 cols x 2 rows) */}
          <div className="lg:w-[62%]">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {capabilityCards.map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{
                      duration: 0.8,
                      delay: cardDelays[i],
                      ease: EASE_OUT,
                    }}
                    whileHover={{
                      y: -6,
                      scale: 1.02,
                      transition: { duration: 0.35, ease: EASE },
                    }}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer"
                    style={{
                      aspectRatio: '4/5',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {/* Background image */}
                    <div className="absolute inset-0">
                      <Image src={card.image} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0" style={{
                        background: `linear-gradient(180deg, rgba(10,10,12,0.3) 0%, rgba(10,10,12,0.6) 50%, rgba(10,10,12,0.85) 100%)`,
                      }} />
                    </div>

                    {/* Gold glass accent edge */}
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] transition-opacity duration-500 opacity-40 group-hover:opacity-100"
                      style={{ background: `linear-gradient(90deg, transparent, ${P.gold}88, transparent)` }} />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-6 z-10">
                      <h3
                        className="text-[16px] lg:text-[18px] font-medium tracking-[-0.01em] mb-1.5 transition-colors duration-300"
                        style={{ color: 'rgba(240,237,232,0.93)' }}
                      >
                        {card.title}
                      </h3>
                      <p
                        className="text-[12px] lg:text-[13px] leading-[1.5] transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                        style={{ color: 'rgba(240,237,232,0.5)' }}
                      >
                        {card.subtitle}
                      </p>
                    </div>

                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at 50% 100%, ${card.accent}, transparent 70%)` }}
                    />
                  </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════
// SCROLL-DRIVEN CARDS — GSAP ScrollTrigger pinned section
// IT Solutions reference: section pins, left headline fixed,
// right cards scroll up via scrub. Gold concentric circles bg.
// ═══════════════════════════════════════════════════════════
function HomeScrollCardsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsWrapperRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !cardsWrapperRef.current || !rightColRef.current) return

    const cardsWrapper = cardsWrapperRef.current

    const getScrollDistance = () => cardsWrapper.offsetHeight + window.innerHeight * 0.1

    const ctx = gsap.context(() => {
      gsap.to(rightColRef.current, {
        y: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        height: '100vh',
        background: `linear-gradient(135deg, ${P.cream} 0%, ${P.creamDark} 40%, ${P.creamMid} 100%)`,
      }}
    >
      {/* Concentric circles — decorative bg element */}
      <div
        className="absolute pointer-events-none"
        style={{ top: 0, left: '20%', width: '150vw', height: '150vw', maxWidth: 1800, maxHeight: 1800, zIndex: 0 }}
      >
        {[100, 70, 40].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: '20%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${size}%`,
              height: `${size}%`,
              border: `1px solid rgba(201,168,110,${0.12 - i * 0.03})`,
            }}
          />
        ))}
      </div>

      {/* Atmospheric gold orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-15%',
          right: '-5%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(201,168,110,0.06) 0%, transparent 65%)',
        }}
      />

      <Grain id="homeScrollGrain" opacity={0.025} />

      <div
        className="relative flex"
        style={{ zIndex: 10, maxWidth: 1600, height: '100%', margin: '0 auto', alignItems: 'flex-start' }}
      >
        {/* Left: Headline pinned at bottom-left */}
        <div
          className="absolute z-20"
          style={{ bottom: '10vh', left: 'clamp(1.5rem,4vw,4rem)', width: '46%' }}
        >
          <p
            className="text-[12px] uppercase tracking-[0.2em] font-semibold mb-5"
            style={{ color: P.gold }}
          >
            Our approach
          </p>
          <h2
            className="leading-[1.02] tracking-[-0.04em]"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 5rem)',
              fontWeight: 500,
              color: P.textDark,
            }}
          >
            Secure, Streamline,<br />
            and Succeed with<br />
            Confidence
          </h2>
        </div>

        {/* Right: Cards that scroll up via GSAP */}
        <div
          ref={rightColRef}
          style={{
            width: '50%',
            marginLeft: '50%',
            paddingTop: '100vh',
            paddingLeft: 'clamp(1.5rem,3vw,3rem)',
            paddingRight: 'clamp(2.5rem,7vw,7rem)',
            paddingBottom: '4rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div ref={cardsWrapperRef} className="relative w-full flex flex-col" style={{ maxWidth: 600, gap: '2.5rem' }}>
            {scrollCards.map((card) => (
              <div
                key={card.title}
                className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-[5px] hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)]"
                style={{
                  background: '#ffffff',
                  padding: 'clamp(2rem,4vw,4rem)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                }}
              >
                {/* Gold radial gradient on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at bottom right, rgba(201,168,110,0.25) 0%, transparent 70%)',
                    zIndex: 0,
                  }}
                />

                {/* Gold bottom border line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${P.gold}44 20%, ${P.goldLight}66 50%, ${P.gold}44 80%, transparent 100%)`,
                    opacity: 0.4,
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: `linear-gradient(90deg, ${P.gold}, ${P.goldLight})` }}
                />

                <h3
                  className="relative z-10 tracking-[-0.015em] mb-4"
                  style={{ fontSize: 'clamp(1.2rem, 1.6vw, 1.6rem)', fontWeight: 500, color: P.textDark }}
                >
                  {card.title}
                </h3>
                <p
                  className="relative z-10 leading-[1.7] max-w-[480px]"
                  style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)', color: P.textMuted }}
                >
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════
// WHY CHOOSE US — AROX "Our Values" inspired
// Dark editorial section with numbered accordion items,
// horizontal gold dividers, scroll-triggered expand/collapse
// ═══════════════════════════════════════════════════════════

// Decorative line-art SVG icons for each value
function ValueIcon({ type }: { type: string }) {
  const stroke = 'rgba(201,168,110,0.4)'
  const w = 80
  if (type === 'search') return (
    <svg width={w} height={w} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="35" r="22" stroke={stroke} strokeWidth="1.5" />
      <line x1="51" y1="51" x2="68" y2="68" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="35" cy="35" r="8" stroke="rgba(201,168,110,0.2)" strokeWidth="1" strokeDasharray="3 3" />
    </svg>
  )
  if (type === 'grid') return (
    <svg width={w} height={w} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="12" width="24" height="24" stroke={stroke} strokeWidth="1.5" />
      <rect x="44" y="12" width="24" height="24" stroke={stroke} strokeWidth="1.5" />
      <rect x="12" y="44" width="24" height="24" stroke={stroke} strokeWidth="1.5" />
      <rect x="44" y="44" width="24" height="24" stroke="rgba(201,168,110,0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  )
  if (type === 'code') return (
    <svg width={w} height={w} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="24,28 12,40 24,52" stroke={stroke} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="56,28 68,40 56,52" stroke={stroke} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="46" y1="22" x2="34" y2="58" stroke="rgba(201,168,110,0.25)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
  // evolve
  return (
    <svg width={w} height={w} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 60 C20 40, 40 35, 40 20" stroke={stroke} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M40 20 C40 35, 60 40, 60 60" stroke="rgba(201,168,110,0.2)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="3 3" />
      <circle cx="40" cy="18" r="4" stroke={stroke} strokeWidth="1.5" />
      <line x1="16" y1="62" x2="64" y2="62" stroke="rgba(201,168,110,0.15)" strokeWidth="1" />
    </svg>
  )
}

// Single value row — scroll-triggered expand
function ValueRow({ item, index, isLast }: { item: typeof values[0]; index: number; isLast: boolean }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const isActive = useInView(rowRef, { margin: '-35% 0px -35% 0px' })

  return (
    <div ref={rowRef}>
      {/* Top divider line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE_OUT }}
        style={{
          height: '1px',
          background: 'rgba(201,168,110,0.25)',
          transformOrigin: 'left',
        }}
      />

      <div
        className="grid py-10 lg:py-14"
        style={{
          gridTemplateColumns: 'clamp(80px, 12vw, 180px) 1fr auto',
          gap: 'clamp(1rem, 3vw, 3rem)',
          alignItems: 'start',
        }}
      >
        {/* Number */}
        <motion.span
          className="text-[13px] font-medium tracking-[0.15em] uppercase pt-2"
          style={{ color: P.gold, opacity: isActive ? 1 : 0.4 }}
          animate={{ opacity: isActive ? 1 : 0.4 }}
          transition={{ duration: 0.5 }}
        >
          {item.number}
        </motion.span>

        {/* Title + Description */}
        <div>
          <motion.h3
            className="tracking-[-0.02em] leading-[1.15]"
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
              fontWeight: 300,
              color: P.textOnDark,
            }}
            animate={{ opacity: isActive ? 0.95 : 0.45 }}
            transition={{ duration: 0.5 }}
          >
            {item.title}
          </motion.h3>

          {/* Description — expands when active */}
          <AnimatePresence>
            {isActive && (
              <motion.p
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 20 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
                className="text-[15px] leading-[1.85] max-w-[560px] overflow-hidden"
                style={{ color: P.textOnDarkMuted }}
              >
                {item.description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Decorative icon — visible when active */}
        <motion.div
          className="hidden lg:block pt-2"
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <ValueIcon type={item.icon} />
        </motion.div>
      </div>

      {/* Bottom divider for last item */}
      {isLast && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE_OUT }}
          style={{
            height: '1px',
            background: 'rgba(201,168,110,0.25)',
            transformOrigin: 'left',
          }}
        />
      )}
    </div>
  )
}

function WhyChooseUsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      <Grain id="valuesGrain" opacity={0.04} />

      <div className="relative z-10 px-[clamp(2rem,8vw,8rem)] pt-32 pb-24">
        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="leading-[1.1] tracking-[-0.03em] mb-20"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 300,
            color: P.textOnDark,
          }}
        >
          Why Choose Us
        </motion.h2>

        {/* Value rows */}
        {values.map((item, i) => (
          <ValueRow
            key={item.number}
            item={item}
            index={i}
            isLast={i === values.length - 1}
          />
        ))}
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════
// CHALLENGES — "Overcoming AI adoption barriers"
// IT Solutions "Overcoming IT roadblocks" style
// Sticky text left, challenge items with pill tags right
// ═══════════════════════════════════════════════════════════
function ChallengesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative py-32 overflow-hidden" style={{ background: P.cream }}>
      <Grain id="challengesGrain" opacity={0.02} />

      <div className="relative z-10 px-[clamp(2rem,8vw,8rem)]">
        {/* Full-width heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="max-w-[900px] mb-20"
        >
          <h2 className="leading-[1.15] tracking-[-0.025em]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400 }}>
            <span style={{ color: P.textDark }}>Overcoming real business challenges </span>
            <span style={{ color: P.textMuted }}>
              to drive continuous progress — keeping your organization agile, competitive, and ready for what comes next.
            </span>
          </h2>
        </motion.div>

        {/* 2-column grid of challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
          {challenges.map((ch, i) => (
            <motion.div
              key={ch.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
              className="py-8 flex gap-6"
              style={{ borderBottom: `1px solid ${P.creamDark}` }}
            >
              <span
                className="text-[48px] font-extralight leading-none tracking-[-0.04em] shrink-0"
                style={{ color: P.gold, opacity: 0.5, minWidth: '56px' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-[20px] font-medium tracking-[-0.01em] mb-4" style={{ color: P.textDark }}>
                  {ch.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ch.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 rounded-full text-[13px] font-medium"
                      style={{ color: P.textMuted, border: `1px solid ${P.creamDark}` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}



// ═══════════════════════════════════════════════════════════
// CTA — Reusing the gold spiral CTA pattern
// ═══════════════════════════════════════════════════════════
function HomeCTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative py-32" style={{ background: P.cream }}>
      <div className="px-[clamp(2rem,8vw,8rem)]">
        <div className="relative rounded-[28px] overflow-hidden py-28 px-12 lg:px-24">
          <div className="absolute inset-0">
            <Image src="/spiral-gold.jpg" alt="" fill className="object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,10,12,0.55), rgba(10,10,12,0.25))' }} />
          </div>
          <Grain id="homeCtaGrain" opacity={0.04} />

          <div className="relative z-10 text-center max-w-[640px] mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              className="leading-[1.08] tracking-[-0.03em] mb-8"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 300, color: P.textOnDark }}
            >
              Ready to elevate<br />your technology?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="text-[15px] leading-[1.9] mb-12"
              style={{ color: P.textOnDarkMuted }}
            >
              Whether you&apos;re modernizing infrastructure or building new capabilities — let&apos;s talk about what&apos;s possible.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            >
              <a href="/contact"
                className="group inline-flex items-center gap-3 px-9 py-4 rounded-full text-[14px] font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(201,168,110,0.3)]"
                style={{ background: P.gold, color: P.charcoal }}>
                Start a conversation
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════
export default function HomepageContent() {
  return (
    <main>
      <HomeHeroSection />
      <FloatingCardsSection />
      <HomeScrollCardsSection />
      <WhyChooseUsSection />
      <ChallengesSection />
      <HomeCTASection />
    </main>
  )
}
