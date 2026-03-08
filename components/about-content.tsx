'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import Link from 'next/link'

/* ─── TYPES ─────────────────────────────────────────────────────── */

interface Milestone {
  year: string
  title: string
  description: string
}

interface ValueItem {
  index: string
  title: string
  description: string
  accent: string
}

interface LeaderPreview {
  name: string
  role: string
  initials: string
  gradient: string
}

/* ─── DATA ──────────────────────────────────────────────────────── */

const MILESTONES: Milestone[] = [
  {
    year: '2020',
    title: 'The Spark',
    description:
      'Founded in Guntur with a radical premise — technology should serve human intelligence, not replace it. Three engineers, one belief, zero compromise.',
  },
  {
    year: '2021',
    title: 'First Product',
    description:
      'Trinade Core ships to beta — a modular software backbone that enterprises can shape to their own logic. 12 early adopters sign on within weeks.',
  },
  {
    year: '2022',
    title: 'Enterprise Suite',
    description:
      'Expanded beyond AI into full-stack enterprise solutions: workflow automation, data orchestration, and custom software platforms for regulated industries.',
  },
  {
    year: '2023',
    title: 'Insight Engine',
    description:
      'Launched real-time analytics powered by contextual AI. Processing 500M+ data points within the first quarter. The AI-native product line takes shape.',
  },
  {
    year: '2024',
    title: 'Global Reach',
    description:
      'Expanded to 40+ countries. Opened partnerships across APAC and Europe. The team grows to 50+ across three continents.',
  },
  {
    year: '2025',
    title: 'Connect API & Shield',
    description:
      'Released the developer platform — 2.4B+ monthly API calls. Shield launches: enterprise-grade security. The platform matures from product to ecosystem.',
  },
]

const VALUES: ValueItem[] = [
  {
    index: '01',
    title: 'Intelligence with Integrity',
    description:
      'We build technology that respects the humans who use it. No dark patterns, no extractive mechanics. Software should elevate, not manipulate.',
    accent: '#00d4aa',
  },
  {
    index: '02',
    title: 'Elegance in Engineering',
    description:
      'Beautiful code ships beautiful products. We obsess over architecture, readability, and the quiet craft that makes complex systems feel simple.',
    accent: '#c8e64e',
  },
  {
    index: '03',
    title: 'Substance over Signal',
    description:
      'We let the work speak. No hype cycles, no buzzword-driven roadmaps. Just measurable impact delivered consistently to every client.',
    accent: '#b48237',
  },
  {
    index: '04',
    title: 'Restless Curiosity',
    description:
      'We hire people who read research papers for fun. Who prototype on weekends. Who see limitations as invitations. That energy is contagious.',
    accent: '#00d4aa',
  },
]

const LEADERS: LeaderPreview[] = [
  {
    name: 'Arjun Mehta',
    role: 'Founder & CEO',
    initials: 'AM',
    gradient:
      'radial-gradient(ellipse at 25% 15%, rgba(0,212,170,0.4) 0%, transparent 55%), radial-gradient(ellipse at 75% 85%, rgba(200,230,78,0.15) 0%, transparent 50%), linear-gradient(160deg, #0a1f16 0%, #060e09 50%, #0c1a12 100%)',
  },
  {
    name: 'Priya Ramanathan',
    role: 'Chief Technology Officer',
    initials: 'PR',
    gradient:
      'radial-gradient(ellipse at 70% 20%, rgba(0,212,170,0.3) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(180,130,55,0.2) 0%, transparent 55%), linear-gradient(200deg, #081a12 0%, #060e09 50%, #0a1810 100%)',
  },
  {
    name: 'Leo Nakamura',
    role: 'VP of Product',
    initials: 'LN',
    gradient:
      'radial-gradient(ellipse at 50% 10%, rgba(200,230,78,0.25) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(0,212,170,0.2) 0%, transparent 55%), linear-gradient(140deg, #0b1e14 0%, #060e09 100%)',
  },
  {
    name: 'Zara Okonkwo',
    role: 'Head of Design',
    initials: 'ZO',
    gradient:
      'radial-gradient(ellipse at 30% 80%, rgba(0,212,170,0.35) 0%, transparent 50%), radial-gradient(ellipse at 70% 20%, rgba(200,230,78,0.12) 0%, transparent 45%), linear-gradient(180deg, #091810 0%, #060e09 100%)',
  },
]

/* ─── ANIMATED NUMBER ───────────────────────────────────────────── */

function AnimatedNumber({
  value,
  suffix,
  isInView,
}: {
  value: number
  suffix: string
  isInView: boolean
}) {
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayed(value * eased)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, value])

  const format = (n: number) => {
    if (value >= 100) return Math.round(n).toLocaleString()
    return n.toFixed(value % 1 !== 0 ? 1 : 0)
  }

  return (
    <span>
      {format(displayed)}
      <span className="text-[#00d4aa]">{suffix}</span>
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 1: MANIFESTO HERO
   ═══════════════════════════════════════════════════════════════════ */

function ManifestoHero() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -60])

  return (
    <section
      ref={ref}
      className="relative min-h-[100vh] grid place-items-center overflow-hidden bg-[#f5f3ef]"
    >
      {/* Decorative grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(26,31,26,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26,31,26,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Ambient gradient orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '10%',
          right: '-10%',
          width: '60%',
          height: '60%',
          background:
            'radial-gradient(ellipse at center, rgba(0,212,170,0.04) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '5%',
          left: '-5%',
          width: '45%',
          height: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(200,230,78,0.03) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 text-center px-6 max-w-[1200px] pt-28 md:pt-16"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-10 md:mb-14"
        >
          <span className="inline-flex items-center gap-2.5 text-[12px] uppercase tracking-[0.3em] text-[#1a1f1a]/40 font-semibold">
            <motion.span
              animate={{
                textShadow: [
                  '0 0 8px rgba(0,212,170,0)',
                  '0 0 14px rgba(0,212,170,0.6)',
                  '0 0 8px rgba(0,212,170,0)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-[#00d4aa]/70"
            >
              ✦
            </motion.span>
            Our Story
          </span>
        </motion.div>

        {/* Line 1: bold */}
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: '130%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : {}}
            transition={{
              duration: 1.2,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h1 className="text-[clamp(3rem,8vw,7rem)] font-bold text-[#1a1f1a] leading-[1.0] tracking-[-0.04em]">
              We build technology
            </h1>
          </motion.div>
        </div>

        {/* Line 2: italic accent */}
        <div className="overflow-hidden mt-1">
          <motion.div
            initial={{ y: '130%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : {}}
            transition={{
              duration: 1.2,
              delay: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h1 className="text-[clamp(3rem,8vw,7rem)] font-extralight italic leading-[1.0] tracking-[-0.02em] text-[#00d4aa]">
              that moves business forward.
            </h1>
          </motion.div>
        </div>

        {/* Subtext — larger, more weight */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="mt-8 md:mt-12 text-[17px] md:text-[19px] leading-[1.7] font-normal text-[#1a1f1a]/55 max-w-[620px] mx-auto"
        >
          From AI-powered platforms to enterprise software — Trinade builds
          the tools that help organizations think faster, operate smarter,
          and scale with confidence.
        </motion.p>

        {/* Founded tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-12 md:mt-16 inline-flex items-center gap-3 text-[13px] tracking-[0.15em] text-[#1a1f1a]/30 font-medium uppercase"
        >
          <span className="w-8 h-px bg-[#1a1f1a]/15" />
          Est. 2020 · Guntur, India
          <span className="w-8 h-px bg-[#1a1f1a]/15" />
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 2.0 }}
          className="mt-14 md:mt-20"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] h-8 mx-auto bg-gradient-to-b from-[#1a1f1a]/15 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 2: ORIGIN STORY
   ═══════════════════════════════════════════════════════════════════ */

function OriginStory() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-24 md:py-36 bg-[#f5f3ef] overflow-hidden">
      <div className="px-[calc(12.5vw+0.8rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Left — the problem */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="inline-flex items-center gap-2 text-[13px] tracking-[0.08em] uppercase text-[#00d4aa] font-semibold mb-8"
            >
              <span>&#10022;</span>
              The Beginning
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[#1a1f1a] mb-8"
            >
              We saw a gap between{' '}
              <span className="text-[#1a1f1a]/30">what technology promised</span>{' '}
              and <span className="text-[#1a1f1a]/30">what it delivered.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-5"
            >
              <p className="text-[16px] md:text-[17px] leading-[1.75] text-[#1a1f1a]/55 font-normal">
                Enterprise software was either too rigid to adapt or too complex to trust.
                AI tools overpromised and underdelivered. Teams spent months integrating
                solutions that didn&apos;t understand their workflows.
              </p>
              <p className="text-[16px] md:text-[17px] leading-[1.75] text-[#1a1f1a]/55 font-normal">
                We started Trinade in 2020 to build the alternative: modular, transparent
                technology — spanning AI, data platforms, and custom software — that moulds to
                how organizations actually think and work.
              </p>
            </motion.div>
          </div>

          {/* Right — belief statement */}
          <div className="relative">
            {/* Decorative vertical line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="hidden lg:block absolute left-0 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-[#00d4aa]/20 via-[#1a1f1a]/[0.08] to-transparent"
            />

            <div className="lg:pl-16">
              <motion.blockquote
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <p className="text-[clamp(1.6rem,2.8vw,2.4rem)] font-normal leading-[1.35] tracking-[-0.015em] text-[#1a1f1a]/75 italic">
                  &ldquo;The best technology doesn&apos;t replace human judgment —
                  it makes every decision sharper, every insight faster, every
                  outcome more intentional.&rdquo;
                </p>
                <footer className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#060e09] flex items-center justify-center">
                    <span className="text-[12px] font-semibold text-white/60 tracking-wider">
                      AM
                    </span>
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-[#1a1f1a]/80">
                      Arjun Mehta
                    </p>
                    <p className="text-[13px] text-[#1a1f1a]/40 font-medium">
                      Founder & CEO
                    </p>
                  </div>
                </footer>
              </motion.blockquote>

              {/* Year watermark */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute right-0 bottom-0 text-[8rem] md:text-[12rem] font-extralight text-[#1a1f1a]/[0.03] leading-none select-none pointer-events-none tracking-tight"
              >
                2020
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 3: PHILOSOPHY — EDITORIAL MANIFESTO LAYOUT
   ═══════════════════════════════════════════════════════════════════ */

function PhilosophySection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const principles = [
    {
      num: '01',
      statement: 'Technology should serve people,',
      statementAccent: 'not the other way around.',
      detail:
        'Every product begins with a human need. Whether it\'s AI analytics or a custom enterprise platform, we design for the person on the other side of the screen — never the spec sheet.',
      accent: '#00d4aa',
    },
    {
      num: '02',
      statement: 'Modularity is freedom.',
      statementAccent: 'Monoliths are traps.',
      detail:
        'Our platform is built from independent, composable modules. Deploy the full stack or just the pieces you need — AI, data, automation, security — with zero vendor lock-in.',
      accent: '#c8e64e',
    },
    {
      num: '03',
      statement: 'Trust isn\'t a feature.',
      statementAccent: 'It\'s the foundation.',
      detail:
        'Open architectures, explainable models, honest pricing. We build long-term partnerships, not lock-in contracts. Every line of code earns the confidence placed in it.',
      accent: '#b48237',
    },
  ]

  return (
    <section ref={ref} className="relative py-28 md:py-36 bg-[#060e09] overflow-hidden">
      {/* Layered ambient glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 20% 30%, rgba(0,212,170,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 80% 70%, rgba(200,230,78,0.03) 0%, transparent 60%)
          `,
        }}
      />

      <div className="relative px-[calc(12.5vw+0.8rem)]">
        {/* Section header — full width */}
        <div className="mb-20">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-[13px] tracking-[0.08em] uppercase text-[#00d4aa] font-semibold mb-6"
          >
            <span>&#10022;</span>
            Our Philosophy
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-[1.1] tracking-[-0.03em] max-w-[800px]"
          >
            <span className="text-white/95">What guides us</span>
            <span className="text-white/30">
              {' '}— three beliefs that shape every product, every decision, every partnership.
            </span>
          </motion.h2>
        </div>

        {/* Editorial principle rows */}
        <div className="space-y-0">
          {principles.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 48 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.25 + i * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {/* Separator line */}
              <div className="h-px bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-transparent" />

              <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_1fr] gap-6 md:gap-10 py-12 md:py-16 items-start">
                {/* Large number */}
                <span
                  className="text-[4rem] md:text-[5rem] font-bold leading-none tracking-tight"
                  style={{ color: `${item.accent}25` }}
                >
                  {item.num}
                </span>

                {/* Statement — large type */}
                <div className="md:pt-2">
                  <h3 className="text-[1.5rem] md:text-[1.9rem] font-bold text-white/90 leading-[1.2] tracking-[-0.02em]">
                    {item.statement}
                    <br />
                    <span style={{ color: item.accent }} className="opacity-70">
                      {item.statementAccent}
                    </span>
                  </h3>
                </div>

                {/* Detail text */}
                <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/50 font-normal md:pt-3">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Final separator */}
          <div className="h-px bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-transparent" />
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 4: JOURNEY TIMELINE
   ═══════════════════════════════════════════════════════════════════ */

function JourneyTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative py-28 md:py-36 bg-[#f5f3ef] overflow-hidden">
      <div className="px-[calc(12.5vw+0.8rem)]">
        {/* Section header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-[13px] tracking-[0.08em] uppercase text-[#00d4aa] font-semibold mb-6"
          >
            <span>&#10022;</span>
            Our Journey
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-[1.1] tracking-[-0.03em] max-w-[42ch]"
          >
            <span className="text-[#1a1f1a]">From first principles</span>
            <span className="text-[#1a1f1a]/30">{' '}to a platform trusted across continents.</span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connecting line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{
              duration: 1.8,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-[#00d4aa]/25 via-[#1a1f1a]/[0.08] to-transparent"
          />

          <div className="space-y-0">
            {MILESTONES.map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 48 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + i * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 py-8 md:py-12 ${
                  i % 2 === 0 ? '' : 'md:direction-rtl'
                }`}
              >
                {/* Dot on the line */}
                <div className="absolute left-[24px] md:left-1/2 top-10 md:top-14 z-10 -translate-x-1/2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.5 + i * 0.1,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="w-[9px] h-[9px] rounded-full bg-[#00d4aa]/60 ring-4 ring-[#f5f3ef]"
                  />
                </div>

                {/* Content — alternating sides */}
                <div
                  className={`pl-16 md:pl-0 ${
                    i % 2 === 0
                      ? 'md:text-right md:pr-16'
                      : 'md:col-start-2 md:pl-16'
                  }`}
                  style={{ direction: 'ltr' }}
                >
                  <span className="text-[13px] font-bold tracking-[0.2em] text-[#00d4aa]/60 uppercase">
                    {milestone.year}
                  </span>
                  <h3 className="mt-2 text-[1.5rem] md:text-[1.8rem] font-bold text-[#1a1f1a]/90 tracking-[-0.02em]">
                    {milestone.title}
                  </h3>
                  <p className="mt-3 text-[15px] md:text-[16px] leading-[1.75] text-[#1a1f1a]/50 font-normal max-w-[440px] inline-block">
                    {milestone.description}
                  </p>
                </div>

                {/* Empty column for alternation */}
                {i % 2 === 0 && <div className="hidden md:block" />}
                {i % 2 !== 0 && <div className="hidden md:block order-first" />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 5: STATS (DARK)
   ═══════════════════════════════════════════════════════════════════ */

function AboutStats() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { value: 6, suffix: '+', label: 'Years Building', sublabel: 'since founding in 2020' },
    { value: 50, suffix: '+', label: 'Team Members', sublabel: 'across three continents' },
    { value: 40, suffix: '+', label: 'Countries Served', sublabel: 'enterprise deployments' },
    { value: 4, suffix: '', label: 'Core Products', sublabel: 'AI + enterprise software' },
  ]

  return (
    <section ref={ref} className="relative py-28 md:py-32 bg-[#060e09]">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,170,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative px-[calc(12.5vw+0.8rem)]">
        {/* Section header */}
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-[13px] tracking-[0.08em] uppercase text-[#00d4aa] font-semibold mb-6"
          >
            <span>&#10022;</span>
            Trinade at a Glance
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-[1.1] tracking-[-0.03em]"
          >
            <span className="text-white/95">Numbers tell a story</span>
            <span className="text-white/30">{' '}— here&apos;s ours.</span>
          </motion.h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="relative text-center"
            >
              {i > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-16 w-px bg-white/[0.06]" />
              )}
              <div
                className="text-[clamp(2.4rem,4.5vw,4rem)] font-bold tracking-[-0.03em] text-white/95 mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  isInView={isInView}
                />
              </div>
              <p className="text-[16px] font-semibold text-white/65 mb-1">
                {stat.label}
              </p>
              <p className="text-[14px] text-white/35 font-normal">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 6: VALUES
   ═══════════════════════════════════════════════════════════════════ */

function ValuesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-28 md:py-36 bg-[#f5f3ef] overflow-hidden">
      <div className="px-[calc(12.5vw+0.8rem)]">
        {/* Section header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-[13px] tracking-[0.08em] uppercase text-[#00d4aa] font-semibold mb-6"
          >
            <span>&#10022;</span>
            What We Believe
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-[1.1] tracking-[-0.03em] max-w-[42ch]"
          >
            <span className="text-[#1a1f1a]">Four convictions</span>
            <span className="text-[#1a1f1a]/30">
              {' '}that shape everything we build.
            </span>
          </motion.h2>
        </div>

        {/* Values list */}
        <div className="space-y-0">
          {VALUES.map((value, i) => (
            <motion.div
              key={value.index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {/* Top border */}
              <div className="h-px bg-gradient-to-r from-[#1a1f1a]/[0.08] via-[#1a1f1a]/[0.06] to-transparent" />

              <div className="group grid grid-cols-1 md:grid-cols-[90px_1fr_1.2fr] gap-4 md:gap-10 py-10 md:py-14 items-start">
                {/* Index number */}
                <motion.span
                  className="text-[3.5rem] md:text-[4.5rem] font-bold leading-none tracking-tight"
                  style={{ color: `${value.accent}25` }}
                >
                  {value.index}
                </motion.span>

                {/* Title */}
                <h3 className="text-[1.5rem] md:text-[1.8rem] font-bold text-[#1a1f1a]/90 tracking-[-0.02em] leading-[1.15] md:pt-3">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-[16px] md:text-[17px] leading-[1.75] text-[#1a1f1a]/50 font-normal md:pt-4 max-w-[520px]">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Final border */}
          <div className="h-px bg-gradient-to-r from-[#1a1f1a]/[0.08] via-[#1a1f1a]/[0.06] to-transparent" />
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 7: TEAM TEASER
   ═══════════════════════════════════════════════════════════════════ */

function TeamTeaser() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative pt-8 pb-28 bg-[#f5f3ef] overflow-hidden">
      <div className="px-[calc(12.5vw+0.8rem)]">
        {/* Section header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 text-[13px] tracking-[0.08em] uppercase text-[#00d4aa] font-semibold mb-6"
            >
              <span>&#10022;</span>
              Leadership
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-[1.1] tracking-[-0.03em]"
            >
              <span className="text-[#1a1f1a]">The people</span>
              <span className="text-[#1a1f1a]/30">{' '}behind the platform.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/team"
              className="group inline-flex items-center gap-2 text-[15px] font-semibold text-[#1a1f1a]/50 hover:text-[#1a1f1a]/80 transition-colors duration-300"
            >
              <span>Meet the full team</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Leader cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LEADERS.map((leader, i) => (
            <motion.div
              key={leader.initials}
              initial={{ opacity: 0, y: 48 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.15 + i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group"
            >
              {/* Portrait card */}
              <div
                className="relative w-full aspect-[3/4] rounded-xl overflow-hidden border border-black/[0.06] group-hover:border-black/[0.12] transition-all duration-500"
                style={{ background: leader.gradient }}
              >
                {/* Initials */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[5rem] font-extralight text-white/[0.06] group-hover:text-white/[0.12] select-none tracking-[0.08em] transition-all duration-500">
                    {leader.initials}
                  </span>
                </div>

                {/* Dot grid */}
                <div
                  className="absolute inset-0 opacity-[0.035]"
                  style={{
                    backgroundImage:
                      'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 70%, rgba(0,212,170,0.08) 0%, transparent 60%)',
                  }}
                />

                {/* Bottom gradient */}
                <div
                  className="absolute inset-x-0 bottom-0 h-2/5"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(6,14,9,0.7) 0%, transparent 100%)',
                  }}
                />

                {/* Name and role */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[16px] font-bold text-white/90 tracking-[-0.01em]">
                    {leader.name}
                  </p>
                  <p className="text-[13px] text-white/45 mt-1 tracking-wide font-medium">
                    {leader.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 8: CTA (DARK CLOSING)
   ═══════════════════════════════════════════════════════════════════ */

function ClosingCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-28 md:py-36 bg-[#060e09] overflow-hidden"
    >
      {/* Atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 60% at 50% 50%, rgba(0,212,170,0.05) 0%, transparent 65%),
            radial-gradient(ellipse 30% 40% at 30% 30%, rgba(200,230,78,0.02) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative text-center px-[calc(12.5vw+0.8rem)]">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-[13px] tracking-[0.08em] uppercase text-[#00d4aa] font-semibold mb-8"
        >
          <span>&#10022;</span>
          Join Us
        </motion.span>

        <div className="overflow-hidden">
          <motion.div
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : {}}
            transition={{
              duration: 1.0,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h2 className="text-[clamp(2.5rem,5.5vw,5rem)] font-bold text-white/95 leading-[1.05] tracking-[-0.03em] max-w-[800px] mx-auto">
              Let&apos;s build what&apos;s next
              <span className="text-white/25">{' '}— together.</span>
            </h2>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-7 text-[17px] md:text-[18px] leading-[1.7] text-white/50 font-normal max-w-[560px] mx-auto"
        >
          Whether you&apos;re exploring a partnership, evaluating our platform,
          or simply curious — we&apos;d love to hear from you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-[#00d4aa]/10 px-8 py-4 text-[15px] font-semibold tracking-[0.03em] text-[#00d4aa] border border-[#00d4aa]/20 transition-all duration-400 hover:bg-[#00d4aa]/15 hover:border-[#00d4aa]/35 hover:shadow-[0_0_40px_rgba(0,212,170,0.1)]"
          >
            <span>Get in Touch</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path
                d="M6 4L10 8L6 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <Link
            href="/team"
            className="group inline-flex items-center gap-3 rounded-full bg-white/[0.04] px-8 py-4 text-[15px] font-semibold tracking-[0.03em] text-white/70 border border-white/[0.08] transition-all duration-400 hover:bg-white/[0.08] hover:border-white/[0.14] hover:text-white/90"
          >
            <span>Meet the Team</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path
                d="M6 4L10 8L6 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════════ */

export default function AboutContent() {
  return (
    <div className="relative z-10">
      <ManifestoHero />
      <OriginStory />
      <div className="relative bg-[#060e09]">
        <PhilosophySection />
      </div>
      <JourneyTimeline />
      <div className="relative bg-[#060e09]">
        <AboutStats />
      </div>
      <ValuesSection />
      <TeamTeaser />
      <div className="relative bg-[#060e09]">
        <ClosingCTA />
      </div>
    </div>
  )
}
