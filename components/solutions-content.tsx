'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'

// ─── Color Palette (extracted from WebGL hero shaders) ───
const COLORS = {
  // Dark backgrounds (from shader bgDark/bgMid/bgLight)
  deepDark: '#060e09',
  darkTeal: '#0a1a10',
  darkMid: '#0e2418',
  darkLight: '#123a24',

  // Amber/gold ribbons (from shader amberBase/amberHighlight/amberDark)
  amberBase: '#9e7533',
  amberHighlight: '#d9b873',
  amberDark: '#594019',
  amberMuted: '#7a5c2e',

  // Greens (from shader greenReflect + glow)
  greenReflect: '#264d2e',
  greenGlow: '#145033',
  greenDeep: '#0e3020',

  // Brand accents (existing)
  teal: '#00d4aa',
  tealMuted: 'rgba(0, 212, 170, 0.15)',

  // Light palette
  cream: '#e8e4de',
  warmWhite: '#f5f3ef',
}

// ─── Easing curves ───
const EASE_SNAPPY = [0.25, 0.1, 0.25, 1] as const
const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const
const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94] as const

// ─── Solutions Data ───
const solutions = [
  {
    id: 'core',
    number: '01',
    title: 'Trinade Core',
    subtitle: 'Enterprise AI Platform',
    description:
      'A unified intelligence layer that connects your entire organization. Trinade Core processes, learns, and adapts — transforming raw data streams into actionable intelligence across every department.',
    features: [
      'Real-time data processing pipeline',
      'Adaptive ML model orchestration',
      'Cross-department intelligence sharing',
      'Enterprise-grade security & compliance',
    ],
    accent: COLORS.teal,
    gradient: `linear-gradient(135deg, ${COLORS.darkTeal} 0%, ${COLORS.greenDeep} 50%, ${COLORS.darkMid} 100%)`,
  },
  {
    id: 'insight',
    number: '02',
    title: 'Insight Engine',
    subtitle: 'Predictive Analytics Suite',
    description:
      'See around corners. Insight Engine combines historical pattern recognition with real-time signal processing to surface opportunities and threats before they materialize.',
    features: [
      'Predictive trend forecasting',
      'Anomaly detection at scale',
      'Natural language query interface',
      'Custom dashboard builder',
    ],
    accent: COLORS.amberHighlight,
    gradient: `linear-gradient(135deg, ${COLORS.amberDark} 0%, ${COLORS.darkTeal} 50%, ${COLORS.greenDeep} 100%)`,
  },
  {
    id: 'connect',
    number: '03',
    title: 'Connect API',
    subtitle: 'Integration Framework',
    description:
      'The connective tissue of your tech stack. Connect API provides a single, elegant interface to orchestrate data flow between systems — legacy and modern alike.',
    features: [
      'Universal API gateway',
      'Legacy system adapters',
      'Real-time event streaming',
      'Zero-downtime migrations',
    ],
    accent: '#7ecba1',
    gradient: `linear-gradient(135deg, ${COLORS.greenReflect} 0%, ${COLORS.darkTeal} 50%, ${COLORS.darkLight} 100%)`,
  },
  {
    id: 'shield',
    number: '04',
    title: 'Trinade Shield',
    subtitle: 'AI Security & Compliance',
    description:
      'Security that thinks ahead. Shield continuously monitors, learns, and adapts to protect your AI infrastructure — ensuring compliance without compromising capability.',
    features: [
      'Continuous threat intelligence',
      'Automated compliance auditing',
      'AI model integrity monitoring',
      'Zero-trust architecture',
    ],
    accent: '#e8c97a',
    gradient: `linear-gradient(135deg, ${COLORS.amberMuted} 0%, ${COLORS.darkTeal} 50%, ${COLORS.amberDark} 100%)`,
  },
  {
    id: 'deploy',
    number: '05',
    title: 'Deploy Studio',
    subtitle: 'MLOps & Orchestration',
    description:
      'From prototype to production in minutes. Deploy Studio provides the complete infrastructure for training, testing, and deploying AI models at enterprise scale.',
    features: [
      'One-click model deployment',
      'A/B testing infrastructure',
      'Resource auto-scaling',
      'Version control & rollback',
    ],
    accent: COLORS.teal,
    gradient: `linear-gradient(135deg, ${COLORS.darkMid} 0%, ${COLORS.greenGlow} 50%, ${COLORS.darkTeal} 100%)`,
  },
]

// ─── Industries Data ───
const industries = [
  {
    title: 'Healthcare',
    description: 'Clinical intelligence, patient analytics, and compliance automation',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3v22M3 14h22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </svg>
    ),
  },
  {
    title: 'Financial Services',
    description: 'Risk modeling, fraud detection, and regulatory compliance',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 22l6-8 4 4 6-8 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="14" r="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </svg>
    ),
  },
  {
    title: 'Manufacturing',
    description: 'Predictive maintenance, supply chain optimization, quality control',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.2" fill="none" strokeDasharray="3 3" />
        <circle cx="14" cy="14" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Logistics',
    description: 'Route optimization, demand forecasting, fleet intelligence',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20h16M4 20l2-8h12l2 8M8 20v4M16 20v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 20h4l2 4H20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Legal',
    description: 'Document intelligence, contract analysis, due diligence automation',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="6" y="3" width="16" height="22" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <path d="M10 9h8M10 13h8M10 17h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Retail & E-Commerce',
    description: 'Customer intelligence, inventory optimization, personalization',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 4h3l2 14h14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="11" cy="22" r="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <circle cx="21" cy="22" r="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <path d="M9 8h16l-2 8H9" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
]

// ─── Differentiators Data ───
const differentiators = [
  {
    title: 'AI-Native Architecture',
    description:
      'Built from the ground up for artificial intelligence — not retrofitted. Every layer of our platform is designed to process, learn, and adapt in real-time.',
    tags: ['Neural Processing', 'Adaptive Learning', 'Real-time Inference', 'Edge Computing'],
  },
  {
    title: 'Enterprise-Grade Security',
    description:
      'Zero-trust architecture with continuous monitoring. Your data stays yours — encrypted at rest, in transit, and during processing.',
    tags: ['SOC 2 Type II', 'HIPAA Compliant', 'GDPR Ready', 'ISO 27001'],
  },
  {
    title: 'Seamless Integration',
    description:
      'Connect with your existing tools in minutes, not months. Our universal API adapts to your stack — whether cutting-edge or legacy.',
    tags: ['REST & GraphQL', 'Webhook Events', 'Legacy Adapters', 'SDKs in 8 Languages'],
  },
  {
    title: 'Dedicated Partnership',
    description:
      'Not just a vendor — a strategic partner. Every client gets a dedicated team of AI engineers, data scientists, and solution architects.',
    tags: ['Dedicated Team', '24/7 Support', 'Custom Training', 'Quarterly Reviews'],
  },
]

// ═══════════════════════════════════════════════════════════
// SECTION 1: CINEMATIC HERO
// ═══════════════════════════════════════════════════════════
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Aurora gradient mesh background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 20% 50%, ${COLORS.greenDeep} 0%, transparent 60%),
                         radial-gradient(ellipse at 80% 20%, ${COLORS.amberDark}33 0%, transparent 50%),
                         radial-gradient(ellipse at 50% 80%, ${COLORS.greenGlow}44 0%, transparent 60%),
                         ${COLORS.deepDark}`,
          }}
        />

        {/* Animated aurora blobs */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.12]"
          style={{
            background: `radial-gradient(circle, ${COLORS.teal} 0%, transparent 70%)`,
            top: '10%',
            left: '60%',
            filter: 'blur(100px)',
            animation: 'auroraFloat1 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.08]"
          style={{
            background: `radial-gradient(circle, ${COLORS.amberHighlight} 0%, transparent 70%)`,
            top: '50%',
            left: '20%',
            filter: 'blur(120px)',
            animation: 'auroraFloat2 25s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.06]"
          style={{
            background: `radial-gradient(circle, ${COLORS.greenReflect} 0%, transparent 70%)`,
            bottom: '10%',
            right: '30%',
            filter: 'blur(80px)',
            animation: 'auroraFloat3 18s ease-in-out infinite',
          }}
        />

        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='28' height='28' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='0.8' fill='%2300d4aa'/%3E%3C/svg%3E")`,
            backgroundSize: '28px 28px',
          }}
        />

        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none">
          <svg width="100%" height="100%">
            <filter id="heroGrain">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#heroGrain)" />
          </svg>
        </div>

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(6, 14, 9, 0.6) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-[900px] mx-auto px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_SNAPPY }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span
            className="px-4 py-1.5 rounded-full text-[12px] font-medium tracking-[0.1em] uppercase"
            style={{
              background: `${COLORS.teal}12`,
              color: COLORS.teal,
              border: `1px solid ${COLORS.teal}25`,
            }}
          >
            &#10022; Solutions
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4, ease: EASE_CINEMATIC }}
          className="text-[clamp(2.8rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.035em] text-white/95 mb-6"
        >
          Intelligence,{' '}
          <span
            style={{
              background: `linear-gradient(135deg, ${COLORS.amberHighlight}, ${COLORS.teal})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Engineered
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE_SNAPPY }}
          className="text-[clamp(1rem,1.8vw,1.25rem)] leading-[1.7] text-white/50 font-light max-w-[620px] mx-auto mb-10"
        >
          From predictive intelligence to seamless integration, our solutions are designed
          to transform how enterprises think, decide, and act.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.0, ease: EASE_SNAPPY }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-[15px] transition-all duration-300"
            style={{
              background: COLORS.teal,
              color: COLORS.deepDark,
            }}
          >
            Explore Solutions
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 16 16"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-[15px] text-white/80 transition-all duration-300 hover:text-white/95"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.10)',
            }}
          >
            Book a Demo
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] tracking-[0.15em] uppercase text-white/25 font-light">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 2: SLIDING SOLUTIONS CARDS (Harkcap-inspired)
// ═══════════════════════════════════════════════════════════
function SlidingSolutionsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeIndex, setActiveIndex] = useState(0)
  const activeSolution = solutions[activeIndex]

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  return (
    <section ref={ref} className="relative py-32 overflow-hidden" style={{ background: COLORS.deepDark }}>
      {/* Background atmospheric gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, ${COLORS.greenDeep}55 0%, transparent 60%),
                       radial-gradient(ellipse at 20% 80%, ${COLORS.amberDark}22 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 px-[calc(12.5vw+0.8rem)]">
        {/* Section Header */}
        <div className="mb-20">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE_SNAPPY }}
            className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase mb-6"
            style={{ color: COLORS.teal }}
          >
            <span>&#10022;</span>
            Our Solutions
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_SNAPPY }}
            className="text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.12] tracking-[-0.025em]"
          >
            <span className="text-white/95">Modular intelligence </span>
            <span className="text-white/35">for every challenge your enterprise faces.</span>
          </motion.h2>
        </div>

        {/* Solutions Grid: Left Nav + Right Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 lg:gap-16">
          {/* Left Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_SNAPPY }}
            className="flex flex-col gap-1"
          >
            {solutions.map((solution, index) => (
              <button
                key={solution.id}
                onClick={() => handleSelect(index)}
                className="group relative text-left py-5 px-5 rounded-xl transition-all duration-400 cursor-pointer"
                style={{
                  background:
                    activeIndex === index
                      ? 'rgba(255,255,255,0.04)'
                      : 'transparent',
                  borderLeft:
                    activeIndex === index
                      ? `2px solid ${COLORS.teal}`
                      : '2px solid transparent',
                }}
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className="text-[13px] font-mono tracking-wider transition-colors duration-300"
                    style={{
                      color: activeIndex === index ? COLORS.teal : 'rgba(255,255,255,0.25)',
                    }}
                  >
                    {solution.number}
                  </span>
                  <div>
                    <h3
                      className="text-[17px] font-medium transition-colors duration-300 mb-0.5"
                      style={{
                        color: activeIndex === index ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.55)',
                      }}
                    >
                      {solution.title}
                    </h3>
                    <p
                      className="text-[13px] font-light transition-colors duration-300"
                      style={{
                        color: activeIndex === index ? 'rgba(255,255,255,0.40)' : 'rgba(255,255,255,0.20)',
                      }}
                    >
                      {solution.subtitle}
                    </p>
                  </div>
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 20% 50%, ${COLORS.teal}08, transparent 70%)`,
                  }}
                />
              </button>
            ))}
          </motion.div>

          {/* Right Content Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE_SNAPPY }}
            className="relative min-h-[480px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSolution.id}
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                transition={{ duration: 0.5, ease: EASE_SMOOTH }}
                className="relative rounded-2xl overflow-hidden h-full"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {/* Card gradient bg */}
                <div
                  className="absolute inset-0 opacity-40"
                  style={{ background: activeSolution.gradient }}
                />

                {/* Card content */}
                <div className="relative z-10 p-10 lg:p-14 h-full flex flex-col justify-between">
                  <div>
                    {/* Title area */}
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <span
                          className="text-[12px] font-medium tracking-[0.1em] uppercase mb-3 inline-block px-3 py-1 rounded-full"
                          style={{
                            color: activeSolution.accent,
                            background: `${activeSolution.accent}12`,
                            border: `1px solid ${activeSolution.accent}20`,
                          }}
                        >
                          {activeSolution.subtitle}
                        </span>
                        <h3 className="text-[clamp(1.8rem,3vw,2.8rem)] font-semibold text-white/95 leading-[1.15] tracking-[-0.02em] mt-4">
                          {activeSolution.title}
                        </h3>
                      </div>

                      {/* Large number badge */}
                      <span
                        className="text-[clamp(5rem,8vw,9rem)] font-bold leading-none tracking-[-0.04em] select-none"
                        style={{
                          color: 'rgba(255,255,255,0.04)',
                        }}
                      >
                        {activeSolution.number}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-[16px] leading-[1.75] text-white/55 font-light max-w-[540px] mb-10">
                      {activeSolution.description}
                    </p>

                    {/* Features grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeSolution.features.map((feature, i) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.08, ease: EASE_SNAPPY }}
                          className="flex items-center gap-3 py-2.5 px-4 rounded-lg"
                          style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.04)',
                          }}
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: activeSolution.accent }}
                          />
                          <span className="text-[14px] text-white/65 font-light">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-10">
                    <a
                      href={`/solutions/${activeSolution.id}`}
                      className="group inline-flex items-center gap-2 text-[14px] font-medium transition-colors duration-300"
                      style={{ color: activeSolution.accent }}
                    >
                      Learn more
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 16 16"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Bottom decorative line */}
                <div
                  className="absolute bottom-0 left-0 h-[2px]"
                  style={{
                    width: '100%',
                    background: `linear-gradient(90deg, ${activeSolution.accent}00, ${activeSolution.accent}40, ${activeSolution.accent}00)`,
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 3: INDUSTRY SOLUTIONS (IT Solutions-inspired grid)
// ═══════════════════════════════════════════════════════════
function IndustriesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-32" style={{ background: COLORS.warmWhite }}>
      <div className="px-[calc(12.5vw+0.8rem)]">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE_SNAPPY }}
            className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase text-[#1a1f1a]/40 mb-6"
          >
            <span style={{ color: COLORS.teal }}>&#10022;</span>
            Industries We Serve
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_SNAPPY }}
            className="text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.12] tracking-[-0.025em] mx-auto"
          >
            <span className="text-[#1a1f1a]/90">Tailored intelligence </span>
            <span className="text-[#1a1f1a]/35">for every sector.</span>
          </motion.h2>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.15 + i * 0.08,
                ease: EASE_SNAPPY,
              }}
              className="group relative rounded-2xl p-8 transition-all duration-500 cursor-pointer"
              style={{
                background: 'rgba(26, 31, 26, 0.02)',
                border: '1px solid rgba(26, 31, 26, 0.06)',
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 30% 20%, ${COLORS.teal}08, transparent 70%)`,
                }}
              />

              {/* Icon */}
              <div
                className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-400"
                style={{
                  background: `${COLORS.teal}08`,
                  border: `1px solid ${COLORS.teal}15`,
                  color: COLORS.teal,
                }}
              >
                {industry.icon}
              </div>

              {/* Content */}
              <h3 className="text-[18px] font-semibold text-[#1a1f1a]/90 mb-2 tracking-[-0.01em]">
                {industry.title}
              </h3>
              <p className="text-[14px] leading-[1.7] text-[#1a1f1a]/45 font-light">
                {industry.description}
              </p>

              {/* Arrow */}
              <div className="mt-6 flex items-center gap-1.5 text-[13px] font-medium opacity-0 group-hover:opacity-100 transition-all duration-400 translate-x-0 group-hover:translate-x-1" style={{ color: COLORS.teal }}>
                Explore
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Bottom border on hover */}
              <div
                className="absolute bottom-0 left-4 right-4 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${COLORS.teal}30, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 4: FEATURE SHOWCASE (Alternating Split Layouts)
// ═══════════════════════════════════════════════════════════
function FeatureShowcaseSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const features = [
    {
      title: 'Predictive Intelligence',
      subtitle: 'See what\'s coming before it arrives',
      description:
        'Our adaptive ML models continuously learn from your data streams, identifying patterns and anomalies that human analysts would miss. Surface opportunities and threats with confidence.',
      stats: [
        { value: '99.7%', label: 'Prediction accuracy' },
        { value: '12ms', label: 'Response time' },
        { value: '2.4B+', label: 'Events processed daily' },
      ],
      gradient: `linear-gradient(135deg, ${COLORS.greenDeep}, ${COLORS.darkTeal})`,
      accentColor: COLORS.teal,
    },
    {
      title: 'Seamless Integration',
      subtitle: 'Your stack, supercharged',
      description:
        'Connect API bridges the gap between legacy systems and modern cloud infrastructure. One unified interface, zero downtime migrations, infinite scalability.',
      stats: [
        { value: '500+', label: 'Pre-built connectors' },
        { value: '0', label: 'Lines of code to start' },
        { value: '3min', label: 'Average setup time' },
      ],
      gradient: `linear-gradient(135deg, ${COLORS.amberDark}, ${COLORS.darkTeal})`,
      accentColor: COLORS.amberHighlight,
    },
  ]

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{ background: COLORS.deepDark }}
    >
      {/* Atmospheric background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 80% 30%, ${COLORS.greenGlow}33 0%, transparent 50%),
                       radial-gradient(ellipse at 10% 70%, ${COLORS.amberDark}22 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 px-[calc(12.5vw+0.8rem)]">
        {/* Section Header - Centered */}
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE_SNAPPY }}
            className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase mb-6"
            style={{ color: COLORS.teal }}
          >
            <span>&#10022;</span>
            Capabilities
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_SNAPPY }}
            className="text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.12] tracking-[-0.025em] mx-auto"
          >
            <span className="text-white/95">Built different. </span>
            <span className="text-white/35">Proven at scale.</span>
          </motion.h2>
        </div>

        {/* Alternating Feature Rows */}
        <div className="space-y-16">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2 + i * 0.15,
                ease: EASE_SNAPPY,
              }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            >
              {/* Visual Panel */}
              <div
                className={`relative rounded-2xl overflow-hidden aspect-[4/3] ${
                  i % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <div className="absolute inset-0" style={{ background: feature.gradient }} />

                {/* Mesh gradient placeholder visual */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-[200px] h-[200px] rounded-full opacity-20"
                    style={{
                      background: `radial-gradient(circle, ${feature.accentColor}, transparent 70%)`,
                      filter: 'blur(60px)',
                    }}
                  />
                </div>

                {/* Decorative grid lines */}
                <div className="absolute inset-6 rounded-xl border border-white/[0.04]" />
                <div className="absolute inset-12 rounded-lg border border-white/[0.03]" />

                {/* Stats overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                  {feature.stats.map((stat, si) => (
                    <div
                      key={stat.label}
                      className="flex-1 rounded-xl py-4 px-4 text-center"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div
                        className="text-[clamp(1.2rem,2vw,1.6rem)] font-bold tracking-[-0.02em]"
                        style={{ color: feature.accentColor }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-[11px] text-white/35 font-light mt-0.5 tracking-wide uppercase">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Text Panel */}
              <div className={`py-4 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <span
                  className="text-[13px] font-medium tracking-[0.08em] uppercase block mb-4"
                  style={{ color: feature.accentColor }}
                >
                  {feature.subtitle}
                </span>
                <h3 className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold text-white/95 leading-[1.15] tracking-[-0.02em] mb-6">
                  {feature.title}
                </h3>
                <p className="text-[16px] leading-[1.75] text-white/50 font-light max-w-[480px] mb-8">
                  {feature.description}
                </p>
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-[14px] font-medium transition-colors duration-300"
                  style={{ color: feature.accentColor }}
                >
                  Learn more
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 16 16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 5: DIFFERENTIATORS ACCORDION (IT Solutions-inspired)
// ═══════════════════════════════════════════════════════════
function DifferentiatorsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [expandedIndex, setExpandedIndex] = useState(0)

  return (
    <section ref={ref} className="relative py-32" style={{ background: COLORS.warmWhite }}>
      <div className="px-[calc(12.5vw+0.8rem)]">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE_SNAPPY }}
            className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase text-[#1a1f1a]/40 mb-6"
          >
            <span style={{ color: COLORS.teal }}>&#10022;</span>
            Why Trinade
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_SNAPPY }}
            className="text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.12] tracking-[-0.025em] mx-auto"
          >
            <span className="text-[#1a1f1a]/90">What sets us apart </span>
            <span className="text-[#1a1f1a]/35">from the rest.</span>
          </motion.h2>
        </div>

        {/* Accordion Cards */}
        <div className="max-w-[900px] mx-auto space-y-3">
          {differentiators.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.08,
                ease: EASE_SNAPPY,
              }}
              className="rounded-2xl overflow-hidden transition-all duration-400"
              style={{
                background: expandedIndex === i ? 'rgba(26, 31, 26, 0.03)' : 'transparent',
                border: '1px solid',
                borderColor: expandedIndex === i ? 'rgba(26, 31, 26, 0.08)' : 'rgba(26, 31, 26, 0.04)',
              }}
            >
              {/* Header */}
              <button
                onClick={() => setExpandedIndex(expandedIndex === i ? -1 : i)}
                className="w-full flex items-center justify-between px-8 py-6 cursor-pointer text-left"
              >
                <div className="flex items-center gap-5">
                  <span
                    className="text-[13px] font-mono tracking-wider"
                    style={{
                      color: expandedIndex === i ? COLORS.teal : 'rgba(26, 31, 26, 0.25)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3
                    className="text-[18px] font-medium tracking-[-0.01em] transition-colors duration-300"
                    style={{
                      color: expandedIndex === i ? '#1a1f1a' : 'rgba(26, 31, 26, 0.60)',
                    }}
                  >
                    {item.title}
                  </h3>
                </div>

                {/* Toggle icon */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: expandedIndex === i ? `${COLORS.teal}12` : 'rgba(26, 31, 26, 0.04)',
                    transform: expandedIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke={expandedIndex === i ? COLORS.teal : 'rgba(26, 31, 26, 0.35)'}
                    strokeWidth="1.5"
                  >
                    <path d="M7 1v12M1 7h12" strokeLinecap="round" />
                  </svg>
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE_SMOOTH }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-7 pl-[72px]">
                      <p className="text-[15px] leading-[1.7] text-[#1a1f1a]/50 font-light mb-5 max-w-[560px]">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3.5 py-1.5 rounded-full text-[12px] font-medium tracking-wide"
                            style={{
                              background: `${COLORS.teal}08`,
                              color: COLORS.teal,
                              border: `1px solid ${COLORS.teal}15`,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 6: SOCIAL PROOF / CREDIBILITY (Richtech-inspired)
// ═══════════════════════════════════════════════════════════
function SocialProofSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const partners = [
    'Meridian Systems',
    'Arclight Ventures',
    'Novus Technologies',
    'Helios Corp',
    'Veridian Group',
    'Cortex Labs',
    'Atlas Cloud',
    'Prism Analytics',
  ]

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ background: COLORS.deepDark }}
    >
      {/* Subtle gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${COLORS.greenDeep}33 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 px-[calc(12.5vw+0.8rem)]">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE_SNAPPY }}
            className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase mb-5"
            style={{ color: COLORS.teal }}
          >
            <span>&#10022;</span>
            Trusted By Industry Leaders
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_SNAPPY }}
            className="text-[16px] text-white/40 font-light max-w-[500px] mx-auto"
          >
            Powering intelligence across industries — from startups to Fortune 500 enterprises.
          </motion.p>
        </div>

        {/* Partner Logos Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE_SNAPPY }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.04)' }}
        >
          {partners.map((partner, i) => (
            <div
              key={partner}
              className="flex items-center justify-center py-10 transition-all duration-300 hover:bg-white/[0.02]"
              style={{
                borderRight: i % 4 !== 3 ? '1px solid rgba(255,255,255,0.04)' : undefined,
                borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : undefined,
              }}
            >
              <span className="text-[15px] font-medium text-white/20 tracking-[0.02em] transition-colors duration-300 hover:text-white/40">
                {partner}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 7: FINAL CTA (IT Solutions split CTA)
// ═══════════════════════════════════════════════════════════
function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-32" style={{ background: COLORS.warmWhite }}>
      <div className="px-[calc(12.5vw+0.8rem)]">
        <div className="relative rounded-3xl overflow-hidden min-h-[440px] flex items-center">
          {/* Background gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${COLORS.deepDark} 0%, ${COLORS.darkTeal} 40%, ${COLORS.greenDeep} 100%)`,
            }}
          />

          {/* Aurora effects */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full opacity-[0.15]"
            style={{
              background: `radial-gradient(circle, ${COLORS.teal} 0%, transparent 70%)`,
              top: '-20%',
              right: '10%',
              filter: 'blur(100px)',
            }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full opacity-[0.08]"
            style={{
              background: `radial-gradient(circle, ${COLORS.amberHighlight} 0%, transparent 70%)`,
              bottom: '-10%',
              left: '20%',
              filter: 'blur(80px)',
            }}
          />

          {/* Grain */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none">
            <svg width="100%" height="100%">
              <filter id="ctaGrain">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#ctaGrain)" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 w-full p-12 lg:p-20 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
              className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold text-white/95 leading-[1.12] tracking-[-0.025em] mb-6"
            >
              Ready to transform your enterprise?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE_SNAPPY }}
              className="text-[17px] text-white/45 font-light max-w-[520px] mx-auto mb-10 leading-[1.7]"
            >
              Let&apos;s discuss how Trinade&apos;s solutions can accelerate your AI journey — from first integration to full-scale deployment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE_SNAPPY }}
              className="flex items-center justify-center gap-4"
            >
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-[15px] transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: COLORS.teal,
                  color: COLORS.deepDark,
                }}
              >
                Get Started
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 16 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-[15px] text-white/80 transition-all duration-300 hover:text-white/95 hover:bg-white/[0.08]"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.10)',
                }}
              >
                Talk to Sales
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// MAIN EXPORT: Solutions Content
// ═══════════════════════════════════════════════════════════
export default function SolutionsContent() {
  return (
    <main>
      <HeroSection />
      <SlidingSolutionsSection />
      <IndustriesSection />
      <FeatureShowcaseSection />
      <DifferentiatorsSection />
      <SocialProofSection />
      <CTASection />
    </main>
  )
}
