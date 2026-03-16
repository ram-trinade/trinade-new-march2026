'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import Image from 'next/image'

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
    title: 'Technology Adoption Without Clear Returns',
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

const processCards = [
  {
    label: 'Discovery',
    body: 'We begin by understanding your business — mapping workflows, identifying pain points, and uncovering opportunities where technology can create the most impact.',
    image: '/spiral-card.jpg',
  },
  {
    label: 'Architecture',
    body: 'Every solution starts with a blueprint. We design scalable, secure systems tailored to your industry — from data pipelines to user-facing platforms.',
    image: '/spiral-motion.jpg',
  },
  {
    label: 'Engineering',
    body: 'Our team builds with precision — clean code, rigorous testing, and continuous integration ensuring every release is production-ready from day one.',
    image: '/gradient-mesh-warm.jpg',
  },
  {
    label: 'Evolution',
    body: 'Technology doesn\'t stand still, and neither do we. We monitor, optimize, and evolve your systems to keep pace with changing demands and new possibilities.',
    image: '/gradient-orbs-warm.jpg',
  },
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
              From custom software and intelligent automation to scalable platforms, we deliver solutions designed to strengthen operations, sharpen decision-making, and drive measurable growth.
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
// WHY CHOOSE US + PROCESS/PEOPLE — IT Solutions inspired
// ═══════════════════════════════════════════════════════════
function WhyChooseUsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: P.white }}>
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Image src="/gradient-orbs-warm.jpg" alt="" fill className="object-cover" />
      </div>

      <div className="relative z-10 px-[clamp(2rem,8vw,8rem)] pt-32 pb-8">
        {/* Why choose us heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="max-w-[800px] mb-16"
        >
          <h2 className="leading-[1.15] tracking-[-0.025em]" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400 }}>
            <span style={{ color: P.textDark }}>Why choose us? </span>
            <span style={{ color: P.textMuted }}>
              From custom software development to intelligent automation, we deliver tailored solutions that help your business work smarter and move faster.
            </span>
          </h2>
        </motion.div>
      </div>

      {/* Sticky scroll-over cards */}
      <div className="relative" style={{ marginBottom: '0' }}>
        {processCards.map((card, i) => (
          <div
            key={card.label}
            className="sticky"
            style={{
              top: `${100 + i * 20}px`,
              zIndex: i + 1,
              marginBottom: i < processCards.length - 1 ? '80vh' : '0',
            }}
          >
            <div className="px-[clamp(2rem,8vw,8rem)]">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, ease: EASE }}
                className="rounded-[24px] overflow-hidden"
                style={{
                  border: `1px solid ${P.creamDark}`,
                  boxShadow: '0 8px 40px rgba(0,0,0,0.06), 0 2px 12px rgba(0,0,0,0.04)',
                  background: P.creamMid,
                }}
              >
                <div className="flex flex-col lg:flex-row" style={{ minHeight: '420px' }}>
                  {/* Text area */}
                  <div
                    className="flex-1 p-12 lg:p-16 flex flex-col justify-between"
                    style={{ background: P.creamMid }}
                  >
                    <div>
                      <span
                        className="text-[13px] font-semibold uppercase tracking-[0.15em] mb-4 block"
                        style={{ color: P.gold }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-[32px] font-medium tracking-[-0.02em] mb-6" style={{ color: P.textDark }}>
                        {card.label}
                      </h3>
                    </div>
                    <p className="text-[15px] leading-[1.9]" style={{ color: P.textMuted }}>
                      {card.body}
                    </p>
                  </div>

                  {/* Image area */}
                  <div className="relative w-full lg:w-[45%] min-h-[280px] lg:min-h-0">
                    <Image src={card.image} alt={card.label} fill className="object-cover" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
        {/* Spacer for last card to scroll into view */}
        <div style={{ height: '40vh' }} />
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
              Ready to build<br />something intelligent?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="text-[15px] leading-[1.9] mb-12"
              style={{ color: P.textOnDarkMuted }}
            >
              Whether you&apos;re exploring AI for the first time or scaling production systems — let&apos;s talk about what&apos;s possible.
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
      <WhyChooseUsSection />
      <ChallengesSection />
      <HomeCTASection />
    </main>
  )
}
