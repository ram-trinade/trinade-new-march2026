'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/* ─── COLOR PALETTE (extracted from WebGL hero shader) ─────────── */
const COLORS = {
  // Deep forest greens (from shader bgDark/bgMid/bgLight)
  forestDeep: '#091a11',
  forestMid: '#0e311f',
  forestLight: '#124029',
  // Rich amber/gold (from shader tube colors)
  amberBase: '#9e7533',
  amberHighlight: '#d9b873',
  amberDark: '#59401a',
  amberMuted: '#b48237',
  // Green reflect
  greenReflect: '#264d2e',
  // Warm cream (light sections)
  cream: '#e8e4de',
  creamLight: '#f5f3ef',
  // Near black
  nearBlack: '#1a1f1a',
  // Deep dark
  deepDark: '#060e09',
}

/* ─── TYPES ─────────────────────────────────────────────────────── */

interface Solution {
  title: string
  subtitle: string
  description: string
  features: string[]
  index: string
}

interface ServiceItem {
  title: string
  description: string
  tags: string[]
}

interface ProcessStep {
  index: string
  title: string
  description: string
  detail: string
}

interface Industry {
  name: string
  description: string
  stat: string
  statLabel: string
}

interface ImpactStat {
  value: string
  suffix: string
  label: string
}

/* ─── DATA ──────────────────────────────────────────────────────── */

const SOLUTIONS: Solution[] = [
  {
    title: 'AI-Powered Analytics',
    subtitle: 'Intelligence at Scale',
    description: 'Transform raw data into strategic clarity. Real-time pattern recognition, anomaly detection, and predictive forecasting that surfaces insights humans miss. Built for enterprises processing billions of data points daily.',
    features: ['Predictive Models', 'Anomaly Detection', 'Real-time Dashboards', 'Custom Reports'],
    index: '01',
  },
  {
    title: 'Workflow Automation',
    subtitle: 'Eliminate Friction',
    description: 'Intelligent process automation that learns, adapts, and scales with your operational complexity. End repetitive manual tasks across your organization while maintaining compliance and auditability.',
    features: ['Process Mining', 'Smart Routing', 'Auto-scaling', 'Compliance Tracking'],
    index: '02',
  },
  {
    title: 'Data Orchestration',
    subtitle: 'Unified Pipeline',
    description: 'Unify disparate data sources into a single coherent pipeline. ETL, real-time streaming, and intelligent data routing — all from one control plane with 200+ pre-built connectors.',
    features: ['ETL Pipelines', 'Stream Processing', '200+ Connectors', 'Data Quality'],
    index: '03',
  },
  {
    title: 'Custom Software',
    subtitle: 'Built to Last',
    description: 'Purpose-built applications engineered to your exact requirements. From enterprise portals to customer-facing platforms — architected for longevity, designed for scale.',
    features: ['Full-stack Development', 'API Design', 'Cloud-native', 'Microservices'],
    index: '04',
  },
  {
    title: 'Cloud Infrastructure',
    subtitle: 'Resilient by Design',
    description: 'Multi-cloud architecture designed for resilience and performance. Auto-scaling, zero-downtime deployments, and infrastructure-as-code from day one.',
    features: ['Multi-cloud', 'Auto-scaling', 'IaC', 'Zero-downtime Deploy'],
    index: '05',
  },
  {
    title: 'Security & Compliance',
    subtitle: 'Trust Architecture',
    description: 'Enterprise-grade protection woven into every layer. SOC2 Type II certified, zero-trust architecture, end-to-end encryption at rest and in transit.',
    features: ['SOC2 Type II', 'Zero-Trust', 'E2E Encryption', 'Audit Logs'],
    index: '06',
  },
]

const SERVICES: ServiceItem[] = [
  {
    title: 'Cybersecurity & Compliance',
    description: 'Stay ahead of evolving threats with proactive security solutions that safeguard your business and streamline your compliance journey. Our multi-layered defense strategy adapts to your risk profile.',
    tags: ['Managed Security', 'Threat Management', 'Compliance Support', 'vCISO Services'],
  },
  {
    title: 'Cloud Architecture',
    description: 'Unlock flexibility and scalability with secure cloud solutions tailored to drive efficiency and innovation. We architect for resilience, not just availability.',
    tags: ['Migration', 'Hybrid Cloud', 'Cost Optimization', 'Disaster Recovery'],
  },
  {
    title: 'Managed Intelligence',
    description: 'Streamline operations with expert AI-driven management, reducing downtime and keeping your business running at peak performance around the clock.',
    tags: ['24/7 Monitoring', 'Predictive Maintenance', 'Auto-remediation', 'SLA Guarantees'],
  },
  {
    title: 'Strategic Consulting',
    description: 'Turn technology into a competitive advantage with strategic planning that aligns IT with your business goals and fuels long-term sustainable growth.',
    tags: ['Roadmap Design', 'Technology Audit', 'Transformation', 'ROI Modeling'],
  },
]

const PROCESS_STEPS: ProcessStep[] = [
  {
    index: '01',
    title: 'Discover & Define',
    description: 'Deep-dive into your operational landscape.',
    detail: 'We begin by understanding the full context — your systems, workflows, pain points, and ambitions. No templates. Every engagement starts with first-principles analysis.',
  },
  {
    index: '02',
    title: 'Architect & Build',
    description: 'Engineering solutions that last.',
    detail: 'Our teams design modular, future-proof architectures tailored to your constraints. We build incrementally, shipping working software early and often.',
  },
  {
    index: '03',
    title: 'Deploy & Evolve',
    description: 'From launch day to long-term impact.',
    detail: 'Continuous monitoring, iterative optimization, and proactive support ensure your solutions grow smarter and more efficient over time.',
  },
]

const INDUSTRIES: Industry[] = [
  { name: 'Financial Services', description: 'Risk modeling, fraud detection, and regulatory compliance automation.', stat: '98%', statLabel: 'Compliance rate' },
  { name: 'Healthcare', description: 'Clinical workflow optimization and HIPAA-compliant intelligence systems.', stat: '3.2x', statLabel: 'Efficiency gain' },
  { name: 'Manufacturing', description: 'Predictive maintenance, supply chain optimization, and quality control.', stat: '40%', statLabel: 'Cost reduction' },
  { name: 'Retail & E-commerce', description: 'Customer behavior analytics, demand forecasting, personalization engines.', stat: '2.8x', statLabel: 'Revenue uplift' },
  { name: 'Logistics', description: 'Route optimization, fleet management, and real-time tracking infrastructure.', stat: '55%', statLabel: 'Faster delivery' },
  { name: 'Education', description: 'Learning analytics, adaptive content delivery, and institutional intelligence.', stat: '4.1x', statLabel: 'Engagement boost' },
]

const IMPACT_STATS: ImpactStat[] = [
  { value: '500', suffix: '+', label: 'Enterprise deployments worldwide' },
  { value: '99.9', suffix: '%', label: 'Platform uptime guaranteed' },
  { value: '40', suffix: '+', label: 'Countries with active clients' },
  { value: '3.2', suffix: 'x', label: 'Average efficiency improvement' },
]

/* ─── ANIMATION CONFIG ───────────────────────────────────────────── */

const EASE_CINEMATIC: [number, number, number, number] = [0.25, 0.0, 0.15, 1]
const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

/* ─── GRAIN OVERLAY ──────────────────────────────────────────────── */

function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.035] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
      }}
    />
  )
}

/* ─── ANIMATED COUNTER ───────────────────────────────────────────── */

function AnimatedCounter({ value, suffix, isInView }: { value: string; suffix: string; isInView: boolean }) {
  const [display, setDisplay] = useState('0')
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const numericValue = parseFloat(value)
    const isDecimal = value.includes('.')
    const duration = 2200
    const startTime = Date.now()

    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: `linear-gradient(145deg, ${COLORS.deepDark} 0%, ${COLORS.forestDeep} 35%, ${COLORS.forestMid} 70%, ${COLORS.forestDeep} 100%)` }}
    >
      {/* Atmospheric gradient orbs — greens and golds only */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[20%] left-[15%] w-[700px] h-[700px] rounded-full opacity-[0.08]"
          style={{ background: `radial-gradient(circle, ${COLORS.forestLight} 0%, transparent 70%)` }}
        />
        <div
          className="absolute bottom-[15%] right-[10%] w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: `radial-gradient(circle, ${COLORS.amberBase} 0%, transparent 70%)` }}
        />
        <div
          className="absolute top-[40%] left-[55%] w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: `radial-gradient(circle, ${COLORS.amberHighlight} 0%, transparent 60%)` }}
        />
        <div
          className="absolute top-[65%] left-[30%] w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: `radial-gradient(circle, ${COLORS.greenReflect} 0%, transparent 70%)` }}
        />
      </div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]">
        <div className="absolute top-0 left-[25%] w-px h-full" style={{ background: `linear-gradient(to bottom, transparent, ${COLORS.amberHighlight}40, transparent)` }} />
        <div className="absolute top-0 left-[50%] w-px h-full" style={{ background: `linear-gradient(to bottom, transparent, ${COLORS.amberHighlight}20, transparent)` }} />
        <div className="absolute top-0 left-[75%] w-px h-full" style={{ background: `linear-gradient(to bottom, transparent, ${COLORS.amberHighlight}40, transparent)` }} />
      </div>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />

      <div className="relative z-10 w-full">
        <div className="max-w-[1400px] mx-auto px-[calc(12.5vw+0.8rem)] pt-40 pb-32">
          {/* Centered content */}
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.7, ease: EASE_CINEMATIC }}
              className="inline-flex items-center gap-3 mb-12"
            >
              <div className="h-px w-8" style={{ background: `linear-gradient(to right, transparent, ${COLORS.amberHighlight})` }} />
              <span
                className="text-[13px] tracking-[0.15em] uppercase font-medium"
                style={{ color: COLORS.amberHighlight }}
              >
                Solutions
              </span>
              <div className="h-px w-8" style={{ background: `linear-gradient(to left, transparent, ${COLORS.amberHighlight})` }} />
            </motion.div>

            {/* Headline — centered, perfectly balanced */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1.1, delay: 0.15, ease: EASE_CINEMATIC }}
              className="text-[clamp(3.2rem,8vw,8rem)] font-bold leading-[1.02] tracking-[-0.04em] mb-8"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="text-white/95">Intelligence,</span>
              <br />
              <span style={{ color: `${COLORS.amberHighlight}50` }}>Applied.</span>
            </motion.h1>

            {/* Subtitle — centered */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.9, delay: 0.4, ease: EASE_SMOOTH }}
              className="text-[clamp(1rem,1.5vw,1.3rem)] font-light leading-[1.8] text-white/40 max-w-[580px] mx-auto mb-14"
            >
              From AI-driven analytics to enterprise-scale automation — we engineer
              solutions that transform complexity into competitive advantage.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.6, ease: EASE_SMOOTH }}
              className="flex flex-wrap justify-center gap-5"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-9 py-4 rounded-full text-[14px] font-semibold tracking-[0.02em] transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.amberBase}, ${COLORS.amberHighlight})`,
                  color: COLORS.deepDark,
                }}
              >
                Start a Conversation
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <button
                className="group inline-flex items-center gap-3 px-9 py-4 rounded-full text-[14px] font-medium tracking-[0.02em] transition-all duration-500 border"
                style={{
                  borderColor: `${COLORS.amberHighlight}20`,
                  color: `${COLORS.amberHighlight}90`,
                  background: `${COLORS.amberHighlight}06`,
                }}
              >
                View Case Studies
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5">
                  <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-[10px] tracking-[0.15em] uppercase font-medium" style={{ color: `${COLORS.amberHighlight}35` }}>Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-10"
              style={{ background: `linear-gradient(to bottom, ${COLORS.amberHighlight}30, transparent)` }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── SECTION 2: SLIDING SOLUTIONS CARDS (HarkCap Pattern) ─────── */

function SlidingCardsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      className="relative py-0"
      style={{ background: COLORS.deepDark }}
    >
      {/* Section header — sticky */}
      <div className="px-[calc(12.5vw+0.8rem)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="pt-32 pb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.9, ease: EASE_CINEMATIC }}
              className="text-[clamp(3rem,6vw,6.5rem)] font-bold leading-[1.05] tracking-[-0.035em]"
              style={{ fontFamily: 'var(--font-display)', color: 'rgba(255,255,255,0.9)' }}
            >
              Our Solutions
            </motion.h2>
          </div>

          {/* Cards — HarkCap-style numbered rows */}
          <div className="pb-32">
            {SOLUTIONS.map((solution, i) => (
              <motion.div
                key={solution.index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.1,
                  ease: EASE_SMOOTH,
                }}
                className="group"
              >
                {/* Top divider */}
                <div className="h-px" style={{ background: `linear-gradient(to right, ${COLORS.amberHighlight}15, rgba(255,255,255,0.06), transparent)` }} />

                <div className="grid grid-cols-[1fr_1.5fr_auto] gap-8 lg:gap-16 py-14 lg:py-16 items-start relative">
                  {/* Title + Subtitle */}
                  <div>
                    <h3
                      className="text-[clamp(1.3rem,2.2vw,1.8rem)] font-semibold text-white/90 tracking-[-0.01em] mb-2 transition-colors duration-500 group-hover:text-white"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {solution.title}
                    </h3>
                    <p className="text-[13px] font-medium tracking-[0.04em] uppercase transition-colors duration-500" style={{ color: `${COLORS.amberHighlight}50` }}>
                      {solution.subtitle}
                    </p>
                  </div>

                  {/* Description + Tags */}
                  <div>
                    <p className="text-[15px] leading-[1.8] text-white/35 font-light mb-5 transition-colors duration-500 group-hover:text-white/50">
                      {solution.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {solution.features.map((f) => (
                        <span
                          key={f}
                          className="px-3 py-1 rounded-lg text-[11px] font-medium tracking-[0.02em] transition-all duration-500"
                          style={{
                            color: `${COLORS.amberHighlight}40`,
                            background: `${COLORS.amberHighlight}06`,
                            border: `1px solid ${COLORS.amberHighlight}10`,
                          }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Giant index number — cropped at right edge */}
                  <div className="hidden lg:block relative">
                    <span
                      className="text-[clamp(8rem,14vw,13rem)] font-bold leading-none tracking-[-0.05em] select-none transition-all duration-700 group-hover:tracking-[-0.02em]"
                      style={{
                        fontFamily: 'var(--font-display)',
                        color: 'transparent',
                        WebkitTextStroke: `1px ${COLORS.amberHighlight}12`,
                      }}
                    >
                      {solution.index}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Final divider */}
            <div className="h-px" style={{ background: `linear-gradient(to right, ${COLORS.amberHighlight}15, rgba(255,255,255,0.06), transparent)` }} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── SECTION 3: SERVICES SHOWCASE (ITSolutions Pattern — Green Gradient + Glass Cards) */

function ServicesShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeService, setActiveService] = useState(0)

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 30% 40%, ${COLORS.forestLight}40 0%, transparent 60%),
          radial-gradient(ellipse at 70% 60%, ${COLORS.forestMid}50 0%, transparent 60%),
          radial-gradient(ellipse at 50% 80%, ${COLORS.amberDark}15 0%, transparent 50%),
          linear-gradient(160deg, ${COLORS.forestDeep} 0%, ${COLORS.forestMid} 40%, ${COLORS.forestLight}80 70%, ${COLORS.forestMid} 100%)
        `,
      }}
    >
      {/* Organic curve overlays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute w-full h-full opacity-[0.04]" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <path d="M0 400 Q360 200 720 350 T1440 300" fill="none" stroke={COLORS.amberHighlight} strokeWidth="1" />
          <path d="M0 500 Q360 350 720 450 T1440 400" fill="none" stroke={COLORS.amberHighlight} strokeWidth="0.5" />
          <path d="M0 600 Q480 400 960 550 T1440 500" fill="none" stroke="white" strokeWidth="0.3" />
        </svg>
      </div>

      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}
      />

      <div className="relative z-10 px-[calc(12.5vw+0.8rem)]">
        <div className="max-w-[1400px] mx-auto">
          {/* Section header — centered */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, ease: EASE_SMOOTH }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="h-px w-6" style={{ background: `linear-gradient(to right, transparent, ${COLORS.amberHighlight}60)` }} />
              <span className="text-[13px] tracking-[0.15em] uppercase font-medium" style={{ color: COLORS.amberHighlight }}>
                Capabilities
              </span>
              <div className="h-px w-6" style={{ background: `linear-gradient(to left, transparent, ${COLORS.amberHighlight}60)` }} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE_CINEMATIC }}
              className="text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-center"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="text-white/95">Secure, Streamline,</span>
              <br />
              <span className="text-white/30">and Succeed with Confidence</span>
            </motion.h2>
          </div>

          {/* Service cards — glassmorphic, ITSolutions-inspired */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 48 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: EASE_SMOOTH }}
                className={`group relative rounded-2xl p-8 lg:p-10 cursor-pointer transition-all duration-600 ${
                  activeService === i ? 'scale-[1.02]' : ''
                }`}
                style={{
                  background: activeService === i
                    ? `linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)`
                    : 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(20px) saturate(1.3)',
                  WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
                  border: activeService === i
                    ? `1px solid ${COLORS.amberHighlight}30`
                    : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: activeService === i
                    ? `0 8px 40px ${COLORS.amberHighlight}08, inset 0 1px 0 rgba(255,255,255,0.06)`
                    : 'inset 0 1px 0 rgba(255,255,255,0.04)',
                }}
                onClick={() => setActiveService(i)}
                onMouseEnter={() => setActiveService(i)}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 30% 20%, ${COLORS.amberHighlight}08, transparent 70%)` }}
                />

                <div className="relative">
                  {/* Service number */}
                  <div className="flex items-center gap-4 mb-6">
                    <span
                      className="text-[11px] font-bold tracking-[0.1em] px-2.5 py-1 rounded-md"
                      style={{
                        background: `${COLORS.amberHighlight}10`,
                        color: COLORS.amberHighlight,
                        border: `1px solid ${COLORS.amberHighlight}15`,
                      }}
                    >
                      0{i + 1}
                    </span>
                    <h3
                      className="text-[20px] font-semibold text-white/90 tracking-[-0.01em]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-[14px] leading-[1.75] text-white/40 font-light mb-6">
                    {service.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-lg text-[11px] font-medium tracking-[0.02em]"
                        style={{
                          color: 'rgba(255,255,255,0.35)',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Learn more link */}
                  <div
                    className="inline-flex items-center gap-2 text-[13px] font-medium transition-all duration-300 group-hover:gap-3"
                    style={{ color: `${COLORS.amberHighlight}60` }}
                  >
                    <span>Learn more</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── SECTION 4: PROCESS ─────────────────────────────────────────── */

function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-32" style={{ background: COLORS.cream }}>
      <div className="px-[calc(12.5vw+0.8rem)]">
        <div className="max-w-[1400px] mx-auto">
          {/* Section header */}
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, ease: EASE_SMOOTH }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="h-px w-6" style={{ background: `linear-gradient(to right, transparent, ${COLORS.amberBase})` }} />
              <span className="text-[13px] tracking-[0.15em] uppercase font-medium" style={{ color: COLORS.amberBase }}>
                The Approach
              </span>
              <div className="h-px w-6" style={{ background: `linear-gradient(to left, transparent, ${COLORS.amberBase})` }} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE_CINEMATIC }}
              className="text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-[1.08] tracking-[-0.03em]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span style={{ color: `${COLORS.nearBlack}ee` }}>How we work</span>
              <span style={{ color: `${COLORS.nearBlack}30` }}> — substance over ceremony.</span>
            </motion.h2>
          </div>

          {/* Process steps */}
          <div>
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: EASE_SMOOTH }}
                className="group"
              >
                {/* Divider */}
                <div
                  className="h-px"
                  style={{ background: `linear-gradient(to right, ${COLORS.amberBase}25, ${COLORS.nearBlack}08, transparent)` }}
                />

                <div className="grid grid-cols-[auto_1fr] lg:grid-cols-[120px_300px_1fr] gap-8 lg:gap-12 py-14 lg:py-16 items-start">
                  {/* Index */}
                  <span
                    className="text-[clamp(3.5rem,6vw,5.5rem)] font-extralight tracking-[-0.03em] leading-none transition-all duration-700"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: `${COLORS.amberBase}15`,
                    }}
                  >
                    {step.index}
                  </span>

                  {/* Title */}
                  <div>
                    <h3
                      className="text-[clamp(1.3rem,2vw,1.75rem)] font-semibold tracking-[-0.01em] mb-2"
                      style={{ fontFamily: 'var(--font-display)', color: `${COLORS.nearBlack}e0` }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[15px] font-light" style={{ color: `${COLORS.nearBlack}50` }}>
                      {step.description}
                    </p>
                  </div>

                  {/* Detail */}
                  <p className="text-[15px] leading-[1.8] font-light lg:pt-1" style={{ color: `${COLORS.nearBlack}40` }}>
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            ))}
            {/* Final divider */}
            <div className="h-px" style={{ background: `linear-gradient(to right, ${COLORS.amberBase}25, ${COLORS.nearBlack}08, transparent)` }} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── SECTION 5: INDUSTRIES ──────────────────────────────────────── */

function IndustriesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-32"
      style={{ background: `linear-gradient(180deg, ${COLORS.deepDark}, ${COLORS.forestDeep})` }}
    >
      <div className="px-[calc(12.5vw+0.8rem)]">
        <div className="max-w-[1400px] mx-auto">
          {/* Section header — centered */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, ease: EASE_SMOOTH }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="h-px w-6" style={{ background: `linear-gradient(to right, transparent, ${COLORS.amberHighlight}60)` }} />
              <span className="text-[13px] tracking-[0.15em] uppercase font-medium" style={{ color: COLORS.amberHighlight }}>
                Industries
              </span>
              <div className="h-px w-6" style={{ background: `linear-gradient(to left, transparent, ${COLORS.amberHighlight}60)` }} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE_CINEMATIC }}
              className="text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-[1.08] tracking-[-0.03em]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="text-white/95">Proven across sectors</span>
              <br />
              <span className="text-white/25">— from regulated enterprises to fast-moving startups.</span>
            </motion.h2>
          </div>

          {/* Industry cards — 3x2 grid with hover stat reveal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map((industry, i) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 36 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: EASE_SMOOTH }}
                className="group relative p-8 rounded-2xl transition-all duration-600 cursor-pointer overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {/* Hover gradient overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-600 group-hover:opacity-100 pointer-events-none"
                  style={{ background: `linear-gradient(145deg, ${COLORS.forestLight}15, ${COLORS.amberHighlight}06, transparent)` }}
                />

                <div className="relative">
                  {/* Stat — revealed on hover */}
                  <div className="overflow-hidden mb-6">
                    <div className="transform transition-all duration-500 translate-y-0 group-hover:-translate-y-1">
                      <span
                        className="text-[clamp(2rem,3vw,2.8rem)] font-bold tracking-[-0.02em]"
                        style={{ color: COLORS.amberHighlight, fontFamily: 'var(--font-display)' }}
                      >
                        {industry.stat}
                      </span>
                      <span className="block text-[11px] tracking-[0.08em] uppercase mt-1" style={{ color: `${COLORS.amberHighlight}50` }}>
                        {industry.statLabel}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-[18px] font-semibold text-white/85 mb-3 tracking-[-0.01em]" style={{ fontFamily: 'var(--font-display)' }}>
                    {industry.name}
                  </h3>
                  <p className="text-[14px] leading-[1.65] text-white/35 font-light">
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

/* ─── SECTION 6: IMPACT STATS ────────────────────────────────────── */

function ImpactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-32" style={{ background: COLORS.cream }}>
      <div className="px-[calc(12.5vw+0.8rem)]">
        <div className="max-w-[1400px] mx-auto">
          {/* Section header — centered */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, ease: EASE_SMOOTH }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="h-px w-6" style={{ background: `linear-gradient(to right, transparent, ${COLORS.amberBase})` }} />
              <span className="text-[13px] tracking-[0.15em] uppercase font-medium" style={{ color: COLORS.amberBase }}>
                Impact
              </span>
              <div className="h-px w-6" style={{ background: `linear-gradient(to left, transparent, ${COLORS.amberBase})` }} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE_CINEMATIC }}
              className="text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-[1.08] tracking-[-0.03em]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span style={{ color: `${COLORS.nearBlack}ee` }}>Numbers that speak</span>
              <span style={{ color: `${COLORS.nearBlack}25` }}> — measurable outcomes.</span>
            </motion.h2>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {IMPACT_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: EASE_SMOOTH }}
                className="text-center group"
              >
                <div
                  className="text-[clamp(3rem,5.5vw,4.8rem)] font-bold tracking-[-0.03em] leading-none mb-4 transition-transform duration-500 group-hover:scale-105"
                  style={{ color: COLORS.amberBase, fontFamily: 'var(--font-display)' }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
                </div>
                <p className="text-[14px] leading-[1.5] font-light max-w-[200px] mx-auto" style={{ color: `${COLORS.nearBlack}40` }}>
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

/* ─── SECTION 7: CTA ─────────────────────────────────────────────── */

function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-40 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 50% 50%, ${COLORS.forestMid}30 0%, transparent 70%),
          linear-gradient(180deg, ${COLORS.deepDark}, ${COLORS.forestDeep})
        `,
      }}
    >
      {/* Atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.06]"
          style={{ background: `radial-gradient(circle, ${COLORS.amberHighlight} 0%, transparent 60%)` }}
        />
      </div>

      <div className="relative z-10 px-[calc(12.5vw+0.8rem)]">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.9, ease: EASE_CINEMATIC }}
            className="text-[clamp(3rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.035em] mb-8"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="text-white/95">Ready to build</span>
            <br />
            <span style={{ color: `${COLORS.amberHighlight}35` }}>what&apos;s next?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_SMOOTH }}
            className="text-[16px] leading-[1.8] text-white/35 font-light max-w-[520px] mx-auto mb-12"
          >
            Whether you&apos;re exploring possibilities or ready to move —
            we&apos;d love to hear what you&apos;re building.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE_SMOOTH }}
            className="flex flex-wrap justify-center gap-5"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-10 py-4.5 rounded-full text-[14px] font-semibold tracking-[0.02em] transition-all duration-500 hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${COLORS.amberBase}, ${COLORS.amberHighlight})`,
                color: COLORS.deepDark,
              }}
            >
              Get in Touch
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-10 py-4.5 rounded-full text-[14px] font-medium tracking-[0.02em] transition-all duration-500 border"
              style={{
                borderColor: 'rgba(255,255,255,0.10)',
                color: 'rgba(255,255,255,0.60)',
                background: 'rgba(255,255,255,0.04)',
              }}
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

export default function ExperimentalSolutionsContent() {
  return (
    <>
      <GrainOverlay />
      <HeroSection />
      <SlidingCardsSection />
      <ServicesShowcase />
      <ProcessSection />
      <IndustriesSection />
      <ImpactSection />
      <CTASection />
    </>
  )
}
