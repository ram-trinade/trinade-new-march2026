'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
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
    title: 'Infrastructure That Cannot Keep Pace',
    tags: ['Cloud Migration', 'Capacity Planning', 'Performance Engineering'],
  },
  {
    title: 'Siloed Data Across Dozens of Platforms',
    tags: ['Unified Architecture', 'API Orchestration', 'Real-Time Sync'],
  },
  {
    title: 'Security Posture Falling Behind Threats',
    tags: ['Zero-Trust Design', 'Incident Response', 'Compliance Automation'],
  },
  {
    title: 'Vendor Sprawl Draining Budgets',
    tags: ['Platform Consolidation', 'License Optimization', 'Managed Operations'],
  },
  {
    title: 'Digital Initiatives Stalling at Scale',
    tags: ['Delivery Acceleration', 'Change Management', 'Outcome Measurement'],
  },
]

const values = [
  {
    number: 'V / 01',
    title: 'Understand before we act',
    description: 'We start with your business, not our toolset. Through structured workshops and technical audits, we map your operations, surface friction, and identify where technology will deliver the highest return.',
    icon: 'search',
  },
  {
    number: 'V / 02',
    title: 'Design with intent',
    description: 'Architecture is a commitment. We draft systems that account for where you are today and where you need to be in three years — built for resilience, security, and graceful scale.',
    icon: 'grid',
  },
  {
    number: 'V / 03',
    title: 'Engineer without compromise',
    description: 'Every line of code ships through automated testing, peer review, and continuous integration. We treat production-readiness as the baseline, not the finish line.',
    icon: 'code',
  },
  {
    number: 'V / 04',
    title: 'Sustain and sharpen over time.',
    description: 'Delivery is only the midpoint. We monitor performance, tighten security posture, and refine your systems quarter over quarter — so your technology compounds in value, not in technical debt.',
    icon: 'evolve',
  },
]

const scrollCards = [
  { title: 'Cybersecurity & Compliance.', body: 'Threat landscapes shift daily. We build layered defenses — from zero-trust networks to real-time monitoring — and maintain the compliance frameworks that keep regulators satisfied and breaches contained.' },
  { title: 'Cloud Infrastructure.', body: 'We architect multi-cloud and hybrid environments tuned for your workload profile. Migration, orchestration, and cost governance — handled end to end, with no performance trade-offs.' },
  { title: 'Managed IT Services.', body: 'Round-the-clock monitoring, proactive maintenance, and a single point of accountability for your entire technology estate. Your team focuses on the business; we keep the systems running.' },
  { title: 'AI & Data Intelligence.', body: 'We embed machine learning, predictive models, and intelligent automation into your existing workflows — turning operational data into decisions that move faster than intuition alone.' },
  { title: 'Strategic Consulting.', body: 'Technology without direction is just overhead. We align IT roadmaps to business objectives, model investment scenarios, and sequence initiatives so every dollar deployed earns its place.' },
  { title: 'Professional Services.', body: 'Dedicated engineering teams for high-stakes builds — custom platforms, system integrations, and enterprise migrations delivered on timeline, on budget, and with full knowledge transfer.' },
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
          Precision-built<br />technology, at scale.
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
              We design, build, and manage the systems that enterprises depend on — cloud infrastructure, cybersecurity, custom platforms, data intelligence, and the strategic consulting that ties it all together.
            </p>

            <div className="flex items-center gap-6 mt-8">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-[14px] font-medium transition-all duration-300 hover:scale-[1.02]"
                style={{ background: P.charcoal, color: P.textOnDark }}
              >
                Get started
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[14px] font-medium transition-opacity duration-300 hover:opacity-60"
                style={{ color: P.textMuted }}
              >
                Talk to us
                <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
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
    subtitle: 'Purpose-built platforms shaped around your operations',
    image: '/gradient-mesh-warm.jpg',
    accent: 'rgba(201,168,110,0.35)',
  },
  {
    title: 'Enterprise Integration',
    subtitle: 'Unified data, connected systems, single source of truth',
    image: '/gradient-orbs-warm.jpg',
    accent: 'rgba(212,187,138,0.30)',
  },
  {
    title: 'Cloud Infrastructure',
    subtitle: 'Architected for resilience, governed for cost',
    image: '/spiral-bg-dark.jpg',
    accent: 'rgba(160,128,64,0.25)',
  },
  {
    title: 'Cybersecurity',
    subtitle: 'Layered defense from perimeter to endpoint',
    image: '/spiral-wide.jpg',
    accent: 'rgba(201,168,110,0.30)',
  },
  {
    title: 'Strategic Consulting',
    subtitle: 'IT roadmaps tied to measurable business outcomes',
    image: '/spiral-light.jpg',
    accent: 'rgba(212,187,138,0.25)',
  },
  {
    title: 'Managed Services',
    subtitle: 'Always-on operations, always accountable',
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
              Where strategy<br />
              becomes<br />
              infrastructure
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="text-[15px] leading-[1.85] max-w-[380px]"
              style={{ color: P.textOnDarkMuted }}
            >
              Six disciplines, one integrated practice. We bring the full depth of enterprise IT under a single engagement — so nothing falls between the seams.
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
      {/* Spiral lines background image — subtle warm texture */}
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/spiral-light.jpg" alt="" fill className="object-cover" style={{ opacity: 0.09 }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${P.cream}cc 0%, ${P.cream}88 40%, ${P.cream}bb 100%)` }} />
      </div>

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
              border: `1px solid rgba(201,168,110,${0.22 - i * 0.05})`,
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
          background: 'radial-gradient(circle, rgba(201,168,110,0.1) 0%, transparent 65%)',
        }}
      />

      <Grain id="homeScrollGrain" opacity={0.025} />

      {/* Left: Headline pinned at bottom-left — outside max-width container for proper page alignment */}
      <div
        className="absolute z-20 px-[clamp(2rem,8vw,8rem)]"
        style={{ bottom: '10vh', left: 0, width: '50%' }}
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
          Built to perform,<br />
          engineered<br />
          to endure
        </h2>
      </div>

      <div
        className="relative flex"
        style={{ zIndex: 10, maxWidth: 1600, height: '100%', margin: '0 auto', alignItems: 'flex-start' }}
      >
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
            {scrollCards.map((card, i) => (
              <div
                key={card.title}
                className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-[5px] hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
                style={{
                  background: 'linear-gradient(135deg, #1a1a1e 0%, #0f0f12 60%, #131318 100%)',
                  padding: 'clamp(2rem,4vw,4rem)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {/* Gold glow from bottom-right corner */}
                <div
                  className="absolute pointer-events-none transition-opacity duration-700 opacity-60 group-hover:opacity-100"
                  style={{
                    bottom: '-20%',
                    right: '-10%',
                    width: '70%',
                    height: '70%',
                    background: `radial-gradient(ellipse at center, rgba(201,168,110,${i % 2 === 0 ? '0.15' : '0.12'}) 0%, rgba(201,168,110,0.04) 50%, transparent 80%)`,
                    filter: 'blur(30px)',
                  }}
                />

                {/* Subtle grain on card */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay">
                  <svg width="100%" height="100%">
                    <filter id={`cardGrain${i}`}><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" /></filter>
                    <rect width="100%" height="100%" filter={`url(#cardGrain${i})`} />
                  </svg>
                </div>

                {/* Gold left edge accent */}
                <div
                  className="absolute top-[15%] bottom-[15%] left-0 w-[2px] transition-all duration-500 group-hover:top-[5%] group-hover:bottom-[5%]"
                  style={{ background: `linear-gradient(180deg, transparent, ${P.gold}55, transparent)` }}
                />

                <h3
                  className="relative z-10 tracking-[-0.015em] mb-4"
                  style={{ fontSize: 'clamp(1.2rem, 1.6vw, 1.6rem)', fontWeight: 500, color: 'rgba(240,237,232,0.93)' }}
                >
                  {card.title}
                </h3>
                <p
                  className="relative z-10 leading-[1.7] max-w-[480px]"
                  style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)', color: 'rgba(240,237,232,0.45)' }}
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

// Single value row — smooth scroll-triggered with number on right
function ValueRow({ item, index, isLast }: { item: typeof values[0]; index: number; isLast: boolean }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const isInRow = useInView(rowRef, { margin: '-30% 0px -30% 0px' })

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
          background: `linear-gradient(90deg, rgba(201,168,110,${isInRow ? '0.4' : '0.15'}), rgba(255,255,255,0.04))`,
          transformOrigin: 'left',
          transition: 'background 0.8s ease',
        }}
      />

      <div
        className="flex items-start justify-between py-12 lg:py-16"
        style={{ gap: 'clamp(2rem, 4vw, 4rem)' }}
      >
        {/* Left: Title + Description */}
        <div className="flex-1 min-w-0">
          <motion.h3
            className="tracking-[-0.02em] leading-[1.15]"
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
              fontWeight: 300,
              color: P.textOnDark,
            }}
            animate={{ opacity: isInRow ? 0.95 : 0.35 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {item.title}
          </motion.h3>

          {/* Description — smooth height animation */}
          <motion.div
            className="overflow-hidden"
            animate={{
              height: isInRow ? 'auto' : 0,
              opacity: isInRow ? 1 : 0,
              marginTop: isInRow ? 20 : 0,
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-[15px] leading-[1.85] max-w-[560px]"
              style={{ color: P.textOnDarkMuted }}
            >
              {item.description}
            </p>
          </motion.div>
        </div>

        {/* Right: Large number */}
        <motion.span
          className="hidden lg:block shrink-0 tabular-nums leading-none"
          style={{
            fontSize: 'clamp(4.5rem, 8vw, 7.5rem)',
            fontWeight: 200,
            color: P.gold,
            letterSpacing: '-0.04em',
          }}
          animate={{ opacity: isInRow ? 0.4 : 0.08 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
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
            background: 'rgba(201,168,110,0.15)',
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
          How We Work
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
            <span style={{ color: P.textDark }}>The problems that stall growth </span>
            <span style={{ color: P.textMuted }}>
              are rarely about a single system. They are about the compounding weight of decisions deferred — and we solve them methodically.
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
              Let&apos;s build what<br />comes next.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="text-[15px] leading-[1.9] mb-12"
              style={{ color: P.textOnDarkMuted }}
            >
              A 30-minute conversation is where most of our best work begins. No pitch deck, no pressure — just a clear look at where your technology stands and where it could go.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            >
              <Link href="/contact"
                className="group inline-flex items-center gap-3 px-9 py-4 rounded-full text-[14px] font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(201,168,110,0.3)]"
                style={{ background: P.gold, color: P.charcoal }}>
                Start a conversation
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
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
