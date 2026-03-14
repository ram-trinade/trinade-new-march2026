'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/* ─── TYPES ─────────────────────────────────────────────────────── */

interface Solution {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  accent: string
  accentBg: string
}

interface ProcessStep {
  index: string
  title: string
  description: string
  detail: string
}

interface Industry {
  icon: React.ReactNode
  name: string
  description: string
}

interface ImpactStat {
  value: string
  suffix: string
  label: string
  accent: string
}

/* ─── DATA ──────────────────────────────────────────────────────── */

const SOLUTIONS: Solution[] = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 24L12 16L18 20L28 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="16" r="2.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <circle cx="18" cy="20" r="2.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <circle cx="28" cy="8" r="2.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <path d="M4 28V4" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path d="M4 28H28" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
    title: 'AI-Powered Analytics',
    description: 'Transform raw data into strategic clarity. Real-time pattern recognition, anomaly detection, and predictive forecasting that surfaces insights humans miss.',
    features: ['Predictive Models', 'Anomaly Detection', 'Real-time Dashboards', 'Custom Reports'],
    accent: '#00d4aa',
    accentBg: 'rgba(0,212,170,0.06)',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M8 8L16 4L24 8V16L16 20L8 16V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M16 20V28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 16L4 18" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <path d="M24 16L28 18" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <circle cx="16" cy="12" r="3" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    title: 'Workflow Automation',
    description: 'Eliminate repetitive friction across your organization. Intelligent process automation that learns, adapts, and scales with your operational complexity.',
    features: ['Process Mining', 'Smart Routing', 'Auto-scaling', 'Compliance Tracking'],
    accent: '#c8e64e',
    accentBg: 'rgba(200,230,78,0.06)',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <circle cx="16" cy="16" r="1.5" fill="currentColor" opacity="0.6" />
        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <line x1="16" y1="26" x2="16" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <line x1="2" y1="16" x2="6" y2="16" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <line x1="26" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
    title: 'Data Orchestration',
    description: 'Unify disparate data sources into a single coherent pipeline. ETL, real-time streaming, and intelligent data routing — all from one control plane.',
    features: ['ETL Pipelines', 'Stream Processing', '200+ Connectors', 'Data Quality'],
    accent: '#b48237',
    accentBg: 'rgba(180,130,55,0.06)',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="8" width="24" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 14H22" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <path d="M10 18H18" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <rect x="8" y="4" width="16" height="4" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <rect x="8" y="24" width="16" height="4" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
    title: 'Custom Software',
    description: 'Purpose-built applications engineered to your exact requirements. From enterprise portals to customer-facing platforms — architected for longevity.',
    features: ['Full-stack Development', 'API Design', 'Cloud-native', 'Microservices'],
    accent: '#00d4aa',
    accentBg: 'rgba(0,212,170,0.06)',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4L28 10V22L16 28L4 22V10L16 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M16 16L28 10" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path d="M16 16L4 10" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path d="M16 16V28" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.4" />
      </svg>
    ),
    title: 'Cloud Infrastructure',
    description: 'Multi-cloud architecture designed for resilience and performance. Auto-scaling, zero-downtime deployments, and infrastructure-as-code from day one.',
    features: ['Multi-cloud', 'Auto-scaling', 'IaC', 'Zero-downtime Deploy'],
    accent: '#c8e64e',
    accentBg: 'rgba(200,230,78,0.06)',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4L24 8V16Q24 24 16 28Q8 24 8 16V8L16 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 16L15 19L21 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Security & Compliance',
    description: 'Enterprise-grade protection woven into every layer. SOC2 Type II certified, zero-trust architecture, end-to-end encryption at rest and in transit.',
    features: ['SOC2 Type II', 'Zero-Trust', 'E2E Encryption', 'Audit Logs'],
    accent: '#b48237',
    accentBg: 'rgba(180,130,55,0.06)',
  },
]

const PROCESS_STEPS: ProcessStep[] = [
  {
    index: '01',
    title: 'Discover & Define',
    description: 'Deep-dive into your operational landscape.',
    detail: 'We begin by understanding the full context — your systems, workflows, pain points, and ambitions. No templates. Every engagement starts with first-principles analysis to uncover what truly matters.',
  },
  {
    index: '02',
    title: 'Architect & Build',
    description: 'Engineering solutions that last.',
    detail: 'Our teams design modular, future-proof architectures tailored to your constraints. We build incrementally, shipping working software early and often — so you see progress, not just promises.',
  },
  {
    index: '03',
    title: 'Deploy & Evolve',
    description: 'From launch day to long-term impact.',
    detail: 'We don\'t disappear after deployment. Continuous monitoring, iterative optimization, and proactive support ensure your solutions grow smarter and more efficient over time.',
  },
]

const INDUSTRIES: Industry[] = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="10" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M10 10V7C10 5.34315 11.3431 4 13 4H15C16.6569 4 18 5.34315 18 7V10" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="14" cy="17" r="2" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
    name: 'Financial Services',
    description: 'Risk modeling, fraud detection, and regulatory compliance automation.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4V24" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M4 14H24" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.3" />
        <path d="M10 9Q14 6 18 9" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <path d="M10 19Q14 22 18 19" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
    name: 'Healthcare',
    description: 'Clinical workflow optimization, patient data intelligence, and HIPAA-compliant systems.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.3" />
        <rect x="15" y="4" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.3" />
        <rect x="4" y="15" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.3" />
        <rect x="15" y="15" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
    name: 'Manufacturing',
    description: 'Predictive maintenance, supply chain optimization, and quality control automation.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 22L10 10L16 16L22 6L24 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 22H24" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="10" cy="10" r="1.5" fill="currentColor" opacity="0.5" />
        <circle cx="22" cy="6" r="1.5" fill="currentColor" opacity="0.5" />
      </svg>
    ),
    name: 'Retail & E-commerce',
    description: 'Customer behavior analytics, demand forecasting, and personalization engines.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4L24 10V18L14 24L4 18V10L14 4Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M14 12V20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <path d="M9 15H19" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
    name: 'Logistics',
    description: 'Route optimization, fleet management, and real-time tracking infrastructure.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="6" stroke="currentColor" strokeWidth="1.3" />
        <path d="M6 24C6 19.5817 9.58172 16 14 16C18.4183 16 22 19.5817 22 24" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    name: 'Education',
    description: 'Learning analytics, adaptive content delivery, and institutional intelligence platforms.',
  },
]

const IMPACT_STATS: ImpactStat[] = [
  { value: '500', suffix: '+', label: 'Enterprise deployments worldwide', accent: '#00d4aa' },
  { value: '99.9', suffix: '%', label: 'Platform uptime guaranteed', accent: '#c8e64e' },
  { value: '40', suffix: '+', label: 'Countries with active clients', accent: '#b48237' },
  { value: '3.2', suffix: 'x', label: 'Average efficiency improvement', accent: '#00d4aa' },
]

/* ─── ANIMATION CONFIG ───────────────────────────────────────────── */

const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.1, 0.25, 1]
const EASE_CINEMATIC: [number, number, number, number] = [0.25, 0.0, 0.15, 1]

/* ─── ANIMATED COUNTER ───────────────────────────────────────────── */

function AnimatedCounter({ value, suffix, isInView }: { value: string; suffix: string; isInView: boolean }) {
  const [display, setDisplay] = useState('0')
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const numericValue = parseFloat(value)
    const isDecimal = value.includes('.')
    const duration = 2000
    const startTime = Date.now()

    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = numericValue * eased

      if (isDecimal) {
        setDisplay(current.toFixed(1))
      } else {
        setDisplay(Math.floor(current).toString())
      }

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }
    requestAnimationFrame(tick)
  }, [isInView, value])

  return (
    <span>
      {display}
      {suffix}
    </span>
  )
}

/* ─── SECTION 1: HERO ────────────────────────────────────────────── */

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden section-dark"
      data-cursor="light"
    >
      {/* Atmospheric gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[15%] left-[10%] w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #00d4aa 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #c8e64e 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #b48237 0%, transparent 60%)' }}
        />
      </div>

      {/* Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
        <div className="absolute top-0 left-[25%] w-px h-full bg-gradient-to-b from-transparent via-white to-transparent" />
        <div className="absolute top-0 left-[50%] w-px h-full bg-gradient-to-b from-transparent via-white/60 to-transparent" />
        <div className="absolute top-0 left-[75%] w-px h-full bg-gradient-to-b from-transparent via-white to-transparent" />
        <div className="absolute top-[33%] left-0 h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="absolute top-[66%] left-0 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>

      <div className="relative z-10 px-[calc(12.5vw+0.8rem)] w-full">
        <div className="max-w-[1400px] mx-auto pt-32 pb-24">
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
            className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase text-[#00d4aa] mb-8"
          >
            <span>&#10022;</span>
            Solutions
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1, delay: 0.15, ease: EASE_CINEMATIC }}
            className="text-[clamp(3rem,7vw,7.5rem)] font-bold leading-[1.05] tracking-[-0.035em] mb-8"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="text-white/95">Intelligence,</span>
            <br />
            <span className="text-white/30">Applied.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE_SMOOTH }}
            className="text-[clamp(1rem,1.4vw,1.25rem)] font-light leading-[1.7] text-white/45 max-w-[600px] mb-12"
          >
            From AI-driven analytics to enterprise-scale automation — we engineer solutions
            that transform complexity into competitive advantage.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE_SMOOTH }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#00d4aa] text-[#060e09] text-[14px] font-semibold tracking-[0.02em] transition-all duration-300 hover:bg-[#00e4b8] hover:shadow-[0_0_30px_rgba(0,212,170,0.25)]"
            >
              Start a Conversation
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/[0.06] border border-white/[0.10] text-white/80 text-[14px] font-medium tracking-[0.02em] transition-all duration-300 hover:bg-white/[0.10] hover:border-white/[0.16]">
              View Case Studies
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-[11px] tracking-[0.12em] uppercase text-white/25 font-medium">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── SECTION 2: SOLUTIONS GRID ──────────────────────────────────── */

function SolutionCard({ solution, index, isInView }: { solution: Solution; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.08,
        ease: EASE_SMOOTH,
      }}
      className="group relative rounded-2xl border border-black/[0.06] bg-black/[0.015] p-8 lg:p-10 transition-all duration-500 hover:border-black/[0.12] hover:bg-black/[0.03]"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 20%, ${solution.accentBg}, transparent 70%)` }}
      />

      <div className="relative">
        {/* Icon */}
        <div
          className="mb-7 inline-flex items-center justify-center w-14 h-14 rounded-xl border transition-colors duration-500"
          style={{
            backgroundColor: solution.accentBg,
            borderColor: `${solution.accent}15`,
            color: solution.accent,
          }}
        >
          {solution.icon}
        </div>

        {/* Title */}
        <h3
          className="text-[22px] font-semibold text-[#1a1f1a]/95 mb-3 tracking-[-0.01em]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {solution.title}
        </h3>

        {/* Description */}
        <p className="text-[15px] leading-[1.7] text-[#1a1f1a]/50 font-light mb-6">
          {solution.description}
        </p>

        {/* Feature tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {solution.features.map((f) => (
            <span
              key={f}
              className="px-3 py-1 rounded-lg text-[11px] font-medium tracking-[0.02em] text-[#1a1f1a]/40 bg-black/[0.03] border border-black/[0.04]"
            >
              {f}
            </span>
          ))}
        </div>

        {/* Learn more */}
        <div className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1a1f1a]/25 transition-all duration-300 group-hover:text-[#1a1f1a]/60 group-hover:gap-2.5">
          <span>Explore solution</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

function SolutionsGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-32 bg-[#e8e4de]">
      <div className="px-[calc(12.5vw+0.8rem)]">
        <div className="max-w-[1400px] mx-auto">
          {/* Section header */}
          <div className="mb-20">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, ease: EASE_SMOOTH }}
              className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase text-[#00d4aa] mb-6"
            >
              <span>&#10022;</span>
              What We Deliver
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE_SMOOTH }}
              className="text-[clamp(2.4rem,4.5vw,4.2rem)] font-light leading-[1.12] tracking-[-0.025em] max-w-[42ch]"
            >
              <span className="text-[#1a1f1a]/95">End-to-end solutions</span>
              <span className="text-[#1a1f1a]/30">{' '}— engineered for complexity, designed for clarity.</span>
            </motion.h2>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOLUTIONS.map((solution, i) => (
              <SolutionCard key={solution.title} solution={solution} index={i} isInView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── SECTION 3: THE APPROACH ────────────────────────────────────── */

function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-32 section-dark" data-cursor="light">
      <div className="px-[calc(12.5vw+0.8rem)]">
        <div className="max-w-[1400px] mx-auto">
          {/* Section header */}
          <div className="mb-24">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, ease: EASE_SMOOTH }}
              className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase text-[#c8e64e] mb-6"
            >
              <span>&#10022;</span>
              The Approach
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE_SMOOTH }}
              className="text-[clamp(2.4rem,4.5vw,4.2rem)] font-light leading-[1.12] tracking-[-0.025em] max-w-[36ch]"
            >
              <span className="text-white/95">How we work</span>
              <span className="text-white/30">{' '}— a methodology built on substance, not ceremony.</span>
            </motion.h2>
          </div>

          {/* Process steps */}
          <div className="space-y-0">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.15,
                  ease: EASE_SMOOTH,
                }}
                className="group"
              >
                {/* Divider */}
                <div className="h-px bg-white/[0.08]" />

                <div className="grid grid-cols-[auto_1fr] lg:grid-cols-[120px_280px_1fr] gap-8 lg:gap-12 py-14 lg:py-16 items-start">
                  {/* Index number */}
                  <span
                    className="text-[clamp(3rem,5vw,5rem)] font-extralight text-white/[0.06] tracking-[-0.03em] leading-none transition-all duration-700 group-hover:text-[#00d4aa]/25 group-hover:tracking-[-0.01em]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {step.index}
                  </span>

                  {/* Title + short description */}
                  <div>
                    <h3
                      className="text-[clamp(1.3rem,2vw,1.75rem)] font-semibold text-white/90 tracking-[-0.01em] mb-2"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[15px] text-white/40 font-light">
                      {step.description}
                    </p>
                  </div>

                  {/* Detail text */}
                  <p className="text-[15px] leading-[1.8] text-white/35 font-light lg:pt-1">
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            ))}
            {/* Final divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="h-px bg-white/[0.08]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── SECTION 4: INDUSTRIES ──────────────────────────────────────── */

function IndustriesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-32 bg-[#e8e4de]">
      <div className="px-[calc(12.5vw+0.8rem)]">
        <div className="max-w-[1400px] mx-auto">
          {/* Section header */}
          <div className="mb-20">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, ease: EASE_SMOOTH }}
              className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase text-[#00d4aa] mb-6"
            >
              <span>&#10022;</span>
              Industries
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE_SMOOTH }}
              className="text-[clamp(2.4rem,4.5vw,4.2rem)] font-light leading-[1.12] tracking-[-0.025em] max-w-[42ch]"
            >
              <span className="text-[#1a1f1a]/95">Proven across sectors</span>
              <span className="text-[#1a1f1a]/30">{' '}— from regulated enterprises to fast-moving startups.</span>
            </motion.h2>
          </div>

          {/* Industry cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((industry, i) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 36 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + i * 0.07,
                  ease: EASE_SMOOTH,
                }}
                className="group relative flex items-start gap-5 p-7 rounded-2xl border border-black/[0.05] bg-black/[0.01] transition-all duration-500 hover:border-black/[0.10] hover:bg-black/[0.025]"
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-black/[0.04] border border-black/[0.05] flex items-center justify-center text-[#1a1f1a]/50 transition-colors duration-500 group-hover:text-[#00d4aa]/70 group-hover:border-[#00d4aa]/15 group-hover:bg-[#00d4aa]/[0.04]">
                  {industry.icon}
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-[17px] font-semibold text-[#1a1f1a]/90 mb-1.5 tracking-[-0.01em]">
                    {industry.name}
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-[#1a1f1a]/45 font-light">
                    {industry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── SECTION 5: IMPACT STATS ────────────────────────────────────── */

function ImpactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-32 section-dark" data-cursor="light">
      <div className="px-[calc(12.5vw+0.8rem)]">
        <div className="max-w-[1400px] mx-auto">
          {/* Section header */}
          <div className="mb-20 text-center">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, ease: EASE_SMOOTH }}
              className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase text-[#00d4aa] mb-6"
            >
              <span>&#10022;</span>
              Impact
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE_SMOOTH }}
              className="text-[clamp(2.4rem,4.5vw,4.2rem)] font-light leading-[1.12] tracking-[-0.025em] mx-auto max-w-[36ch]"
            >
              <span className="text-white/95">Numbers that speak</span>
              <span className="text-white/30">{' '}— measurable outcomes, not marketing promises.</span>
            </motion.h2>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {IMPACT_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.1,
                  ease: EASE_SMOOTH,
                }}
                className="text-center lg:text-left"
              >
                <div
                  className="text-[clamp(2.8rem,5vw,4.5rem)] font-bold tracking-[-0.03em] leading-none mb-4"
                  style={{ color: stat.accent, fontFamily: 'var(--font-display)' }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
                </div>
                <p className="text-[14px] leading-[1.5] text-white/35 font-light max-w-[200px] lg:max-w-none">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── SECTION 6: CTA ─────────────────────────────────────────────── */

function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-40 bg-[#e8e4de]">
      <div className="px-[calc(12.5vw+0.8rem)]">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
            className="text-[clamp(2.8rem,5.5vw,5rem)] font-bold leading-[1.08] tracking-[-0.03em] mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="text-[#1a1f1a]/95">Ready to build</span>
            <br />
            <span className="text-[#1a1f1a]/25">what&apos;s next?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_SMOOTH }}
            className="text-[16px] leading-[1.7] text-[#1a1f1a]/45 font-light max-w-[520px] mx-auto mb-10"
          >
            Whether you&apos;re exploring possibilities or ready to move — we&apos;d love to hear what you&apos;re building.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE_SMOOTH }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#060e09] text-white text-[14px] font-semibold tracking-[0.02em] transition-all duration-300 hover:bg-[#0a1a14] hover:shadow-[0_8px_32px_rgba(6,14,9,0.3)]"
            >
              Get in Touch
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black/[0.04] border border-black/[0.08] text-[#1a1f1a]/70 text-[14px] font-medium tracking-[0.02em] transition-all duration-300 hover:bg-black/[0.07] hover:border-black/[0.12]"
            >
              Learn About Us
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── MAIN EXPORT ────────────────────────────────────────────────── */

/* ─── SECTION DIVIDER ────────────────────────────────────────────── */

function SectionDivider({ dark = false }: { dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <div
      ref={ref}
      className={`relative py-0 ${dark ? 'bg-[#060e09]' : 'bg-[#e8e4de]'}`}
    >
      <div className="px-[calc(12.5vw+0.8rem)]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.0, 0.15, 1] }}
            className={`h-px origin-left ${dark ? 'bg-gradient-to-r from-[#00d4aa]/30 via-white/[0.06] to-transparent' : 'bg-gradient-to-r from-[#00d4aa]/20 via-black/[0.06] to-transparent'}`}
          />
        </div>
      </div>
    </div>
  )
}

/* ─── MAIN EXPORT ────────────────────────────────────────────────── */

export default function SolutionsContent() {
  return (
    <>
      <HeroSection />
      <SolutionsGrid />
      <SectionDivider />
      <ProcessSection />
      <IndustriesSection />
      <SectionDivider />
      <ImpactSection />
      <CTASection />
    </>
  )
}
