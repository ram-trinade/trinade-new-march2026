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
    title: 'AI Adoption Without Clear ROI',
    tags: ['AI Strategy Assessment', 'Use Case Prioritization', 'ROI Modeling'],
  },
  {
    title: 'Data Silos Blocking Intelligence',
    tags: ['Data Pipeline Design', 'Feature Engineering', 'Data Lake Architecture'],
  },
  {
    title: 'Compliance in Regulated Industries',
    tags: ['HIPAA-Ready AI', 'Financial Compliance', 'Audit Trail Systems'],
  },
  {
    title: 'Scaling from Pilot to Production',
    tags: ['MLOps & Monitoring', 'Auto-Scaling Infrastructure', 'CI/CD for ML'],
  },
  {
    title: 'Legacy Systems Resisting Modernization',
    tags: ['API-First Integration', 'Legacy System Bridging', 'Cloud Migration'],
  },
]

const processCards = [
  {
    label: 'Process',
    body: 'We follow a structured approach — discovery, design, build, deploy, and iterate — ensuring every AI system is validated against real-world conditions before it goes live.',
    image: '/spiral-card.jpg',
  },
  {
    label: 'People',
    body: 'A team of AI engineers, data scientists, and domain experts trained on the latest technologies — committed to understanding your industry and supporting your evolving needs.',
    image: '/spiral-motion.jpg',
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
    <section ref={ref} className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden" style={{ background: P.cream }}>
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none">
        <Image src="/gradient-orbs-warm.jpg" alt="" fill className="object-cover" priority />
      </div>
      <Grain id="homeHeroGrain" opacity={0.02} />

      <div className="relative z-10 w-full px-[clamp(2rem,8vw,8rem)] pt-40 pb-12">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: EASE_OUT }}
          className="leading-[1.05] tracking-[-0.04em]"
          style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 400, color: P.textDark }}
        >
          Experience AI<br />Excellence.
        </motion.h1>
      </div>

      {/* Gradient card below hero — IT Solutions style */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.0, delay: 0.3, ease: EASE_OUT }}
        className="relative z-10 mx-[clamp(2rem,8vw,8rem)] mb-20"
      >
        <div className="relative rounded-[24px] overflow-hidden" style={{ minHeight: '50vh' }}>
          <div className="absolute inset-0">
            <Image src="/gradient-mesh-warm.jpg" alt="" fill className="object-cover" />
          </div>
          <Grain id="heroCardGrain" opacity={0.03} />

          <div className="relative z-10 p-[clamp(2rem,5vw,5rem)] flex flex-col justify-end min-h-[50vh]">
            <p
              className="leading-[1.25] tracking-[-0.02em] max-w-[900px]"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 400, color: P.textDark }}
            >
              From custom AI models and data pipelines to production-ready systems, we deliver intelligent solutions designed to strengthen operations, enhance decision-making, and drive your business forward.
            </p>

            <div className="flex items-center gap-6 mt-10">
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-[14px] font-medium transition-all duration-300 hover:scale-[1.02]"
                style={{ background: P.charcoal, color: P.textOnDark }}
              >
                Explore our solutions
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
    <section ref={ref} className="relative py-32 overflow-hidden" style={{ background: P.white }}>
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Image src="/gradient-orbs-warm.jpg" alt="" fill className="object-cover" />
      </div>

      <div className="relative z-10 px-[clamp(2rem,8vw,8rem)]">
        {/* Why choose us heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="max-w-[800px] mb-20"
        >
          <h2 className="leading-[1.15] tracking-[-0.025em]" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400 }}>
            <span style={{ color: P.textDark }}>Why choose us? </span>
            <span style={{ color: P.textMuted }}>
              From custom AI development to production deployment, we deliver tailored solutions that help your business think smarter and move faster.
            </span>
          </h2>
        </motion.div>

        {/* Process / People cards — IT Solutions style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {processCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: EASE }}
              className="group rounded-[20px] overflow-hidden flex flex-col lg:flex-row"
              style={{ border: `1px solid ${P.creamDark}` }}
            >
              {/* Text area */}
              <div
                className="flex-1 p-10 flex flex-col justify-between"
                style={{ background: P.creamMid, minHeight: '360px' }}
              >
                <h3 className="text-[20px] font-medium tracking-[-0.01em]" style={{ color: P.textDark }}>
                  {card.label}
                </h3>
                <p className="text-[14px] leading-[1.8] mt-auto" style={{ color: P.textMuted }}>
                  {card.body}
                </p>
              </div>

              {/* Image area */}
              <div className="relative w-full lg:w-[45%] min-h-[240px] lg:min-h-0">
                <Image src={card.image} alt={card.label} fill className="object-cover" />
              </div>
            </motion.div>
          ))}
        </div>
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

      <div className="relative z-10 px-[clamp(2rem,8vw,8rem)] grid grid-cols-1 lg:grid-cols-[0.45fr_0.55fr] gap-16" style={{ minHeight: '80vh' }}>
        {/* Left — Sticky text */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            <h2 className="leading-[1.15] tracking-[-0.025em] mb-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400 }}>
              <span style={{ color: P.textDark }}>Overcoming AI adoption barriers </span>
              <span style={{ color: P.textMuted }}>
                to drive continuous progress, ensuring your business stays agile and ready for what&apos;s next — because the story of intelligent transformation is one of growth and evolving potential.
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Right — Challenge items with pill tags */}
        <div className="space-y-0">
          {challenges.map((ch, i) => (
            <motion.div
              key={ch.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
              className="py-8"
              style={{ borderBottom: `1px solid ${P.creamDark}` }}
            >
              <h3 className="text-[20px] font-medium tracking-[-0.01em] mb-4" style={{ color: P.textDark }}>
                {ch.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {ch.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full text-[12px] font-medium cursor-pointer transition-all duration-200 hover:bg-black/[0.04]"
                    style={{ color: P.textMuted, border: `1px solid ${P.creamDark}` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════
// RECOGNITION — "Recognized Excellence & Standards"
// Trust badges / certification logos
// ═══════════════════════════════════════════════════════════
function RecognitionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const badges = [
    { name: 'ISO 27001', desc: 'Information Security' },
    { name: 'SOC 2', desc: 'Service Organization Control' },
    { name: 'HIPAA', desc: 'Healthcare Compliance' },
    { name: 'GDPR', desc: 'Data Protection' },
    { name: 'AWS Partner', desc: 'Cloud Partnership' },
  ]

  return (
    <section ref={ref} className="relative py-28 overflow-hidden" style={{ background: P.white }}>
      <div className="relative z-10 px-[clamp(2rem,8vw,8rem)] text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="leading-[1.1] tracking-[-0.025em] mb-16"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400, color: P.textDark }}
        >
          Recognized Excellence &<br />Compliance Standards
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-8"
        >
          {badges.map((badge) => (
            <div
              key={badge.name}
              className="flex flex-col items-center gap-2 px-8 py-6 rounded-2xl transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
              style={{ background: P.creamMid, border: `1px solid ${P.creamDark}`, minWidth: '140px' }}
            >
              <span className="text-[18px] font-semibold tracking-[-0.01em]" style={{ color: P.textDark }}>{badge.name}</span>
              <span className="text-[12px]" style={{ color: P.textMuted }}>{badge.desc}</span>
            </div>
          ))}
        </motion.div>
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
      <RecognitionSection />
      <HomeCTASection />
    </main>
  )
}
