'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'

// ═══════════════════════════════════════════════════════════
// INDEPENDENT DESIGN SYSTEM — Zero Trinade site patterns
// Palette: Charcoal / Cream / Gold — editorial luxury
// ═══════════════════════════════════════════════════════════

const P = {
  charcoal: '#1a1a1e',
  charcoalLight: '#242428',
  charcoalMid: '#2c2c30',
  charcoalBorder: '#3a3a3c',
  cream: '#f2ede6',
  creamDark: '#e5e0d8',
  white: '#faf9f7',
  textDark: '#2d2d2d',
  textMuted: '#7a7a7a',
  textDimmed: '#a0a0a0',
  textOnDark: '#f0ede8',
  textOnDarkMuted: 'rgba(240, 237, 232, 0.55)',
  textOnDarkDimmed: 'rgba(240, 237, 232, 0.30)',
  gold: '#c9a86e',
  goldLight: '#d4bb8a',
  goldDark: '#a08040',
  goldSubtle: 'rgba(201, 168, 110, 0.12)',
  burgundy: '#8b4d5a',
}

const EASE = [0.25, 0.1, 0.25, 1] as const
const EASE_OUT = [0.16, 1, 0.3, 1] as const

// ─── Solutions Data ───
const solutions = [
  {
    id: 'platform',
    num: '01',
    name: 'Intelligence Platform',
    tagline: 'The operating system for enterprise AI',
    body: 'A unified intelligence layer that connects every department, every data source, every decision point. It processes, learns, and adapts — turning noise into signal at enterprise scale.',
    capabilities: ['Real-time data orchestration', 'Adaptive model management', 'Cross-system intelligence', 'Enterprise compliance'],
    accent: P.gold,
  },
  {
    id: 'analytics',
    num: '02',
    name: 'Predictive Analytics',
    tagline: 'See what others can\'t',
    body: 'Historical pattern recognition meets real-time signal processing. Surface opportunities before competitors. Identify risks before they materialize. Make decisions with unprecedented clarity.',
    capabilities: ['Trend forecasting', 'Anomaly detection', 'Natural language queries', 'Custom reporting'],
    accent: '#b8936e',
  },
  {
    id: 'integration',
    num: '03',
    name: 'Integration Layer',
    tagline: 'One interface, every system',
    body: 'The connective tissue of your technology stack. A single, elegant interface that orchestrates data flow between legacy systems and modern infrastructure — zero downtime, infinite scale.',
    capabilities: ['Universal API gateway', 'Legacy adapters', 'Event streaming', 'Migration tooling'],
    accent: '#8b9a7e',
  },
  {
    id: 'security',
    num: '04',
    name: 'Security Framework',
    tagline: 'Protection that thinks ahead',
    body: 'Continuous monitoring, adaptive response, automated compliance. Your AI infrastructure stays secure — not because we lock it down, but because we built security into every layer from day one.',
    capabilities: ['Threat intelligence', 'Compliance automation', 'Model integrity', 'Zero-trust access'],
    accent: '#7a8b9e',
  },
]

const industries = [
  { name: 'Healthcare', desc: 'Clinical intelligence and compliance automation', icon: 'health' },
  { name: 'Financial Services', desc: 'Risk modeling and regulatory technology', icon: 'finance' },
  { name: 'Manufacturing', desc: 'Predictive maintenance and quality systems', icon: 'manufacturing' },
  { name: 'Logistics', desc: 'Route optimization and demand forecasting', icon: 'logistics' },
  { name: 'Legal', desc: 'Document intelligence and contract analysis', icon: 'legal' },
  { name: 'Retail', desc: 'Customer insight and inventory intelligence', icon: 'retail' },
]

const differentiators = [
  { num: '01', title: 'AI-Native Architecture', body: 'Built for intelligence from the ground up — not retrofitted. Every layer processes, learns, and adapts in real-time.', tags: ['Neural Processing', 'Adaptive Learning', 'Edge Computing'] },
  { num: '02', title: 'Enterprise-Grade Security', body: 'Zero-trust architecture with continuous monitoring. Your data stays encrypted at rest, in transit, and during processing.', tags: ['SOC 2 Type II', 'HIPAA', 'GDPR', 'ISO 27001'] },
  { num: '03', title: 'Seamless Integration', body: 'Connect with existing tools in minutes. Our universal API adapts to your stack — cutting-edge or legacy, it just works.', tags: ['REST & GraphQL', 'Webhook Events', 'SDKs in 8 Languages'] },
  { num: '04', title: 'Dedicated Partnership', body: 'Not a vendor — a strategic partner. Every client gets a dedicated team of engineers, scientists, and architects.', tags: ['Dedicated Team', '24/7 Support', 'Quarterly Reviews'] },
]

// ─── SVG Industry Icons ───
function IndustryIcon({ type }: { type: string }) {
  const s = { width: 40, height: 40, viewBox: '0 0 40 40', fill: 'none', stroke: P.goldDark, strokeWidth: 1.2 }
  switch (type) {
    case 'health': return <svg {...s}><path d="M20 8v24M8 20h24" strokeLinecap="round" /><circle cx="20" cy="20" r="14" /><path d="M14 20h12M20 14v12" strokeWidth="2" strokeLinecap="round" /></svg>
    case 'finance': return <svg {...s}><rect x="6" y="18" width="6" height="14" rx="1" /><rect x="17" y="10" width="6" height="22" rx="1" /><rect x="28" y="14" width="6" height="18" rx="1" /><path d="M6 8l14-2 14 4" strokeLinecap="round" /></svg>
    case 'manufacturing': return <svg {...s}><circle cx="14" cy="26" r="6" /><circle cx="28" cy="16" r="5" /><path d="M8 14l6 6M22 12l-4 8M20 26h14" strokeLinecap="round" /><rect x="4" y="8" width="8" height="8" rx="1" /></svg>
    case 'logistics': return <svg {...s}><path d="M4 28h24M8 28V14l8-6 8 6v14" strokeLinecap="round" strokeLinejoin="round" /><path d="M28 22h6l2 6h-8z" strokeLinejoin="round" /><circle cx="12" cy="28" r="3" /><circle cx="32" cy="28" r="3" /></svg>
    case 'legal': return <svg {...s}><path d="M20 6v28M12 10h16M8 16l12 4 12-4" strokeLinecap="round" strokeLinejoin="round" /><rect x="14" y="30" width="12" height="4" rx="1" /></svg>
    case 'retail': return <svg {...s}><path d="M8 12h24l-3 18H11z" strokeLinejoin="round" /><path d="M14 12V8a6 6 0 0112 0v4" strokeLinecap="round" /><circle cx="16" cy="22" r="2" /><circle cx="24" cy="22" r="2" /></svg>
    default: return null
  }
}

// ─── Grain Overlay (reusable) ───
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
// SECTION 1: HERO — Centered, atmospheric, cinematic
// ═══════════════════════════════════════════════════════════
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <section
      ref={ref}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
      style={{ background: `linear-gradient(160deg, #1e1e22 0%, ${P.charcoal} 35%, #18181c 65%, #1a1a1e 100%)` }}
    >
      {/* Atmospheric gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top-left warm gold bloom */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${P.gold}14, ${P.gold}06 40%, transparent 70%)`,
            top: '-15%', left: '-10%',
            filter: 'blur(80px)',
          }}
        />
        {/* Center subtle bloom */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(200,180,140,0.06), transparent 65%)`,
            top: '30%', left: '40%',
            filter: 'blur(100px)',
          }}
        />
        {/* Bottom-right cool accent */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(120,130,150,0.08), transparent 65%)',
            bottom: '-10%', right: '-5%',
            filter: 'blur(90px)',
          }}
        />
      </div>

      <Grain id="heroGrain" opacity={0.04} />

      {/* Watermark text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none whitespace-nowrap"
        style={{
          fontSize: 'clamp(10rem, 22vw, 28rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          color: P.textOnDark,
          opacity: 0.02,
        }}
      >
        SOLUTIONS
      </div>

      {/* Decorative horizontal lines */}
      <div className="absolute top-[20%] left-0 right-0 h-[1px] pointer-events-none" style={{ background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.03) 70%, transparent)` }} />
      <div className="absolute bottom-[25%] left-0 right-0 h-[1px] pointer-events-none" style={{ background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.025) 20%, rgba(255,255,255,0.025) 80%, transparent)` }} />

      {/* Content — CENTERED */}
      <div className="relative z-10 w-full px-[clamp(2rem,8vw,8rem)] py-40 text-center">
        <div className="max-w-[900px] mx-auto">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="text-[11px] uppercase tracking-[0.22em] mb-10"
            style={{ color: P.gold }}
          >
            Our Solutions
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.4, ease: EASE_OUT }}
            className="leading-[1.0] tracking-[-0.04em] mb-10"
            style={{
              fontSize: 'clamp(3.5rem, 7vw, 7.5rem)',
              fontWeight: 300,
              color: P.textOnDark,
            }}
          >
            Intelligence,<br />
            crafted for <em className="not-italic" style={{ fontWeight: 500, color: P.gold }}>enterprise</em>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            className="text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.9] max-w-[520px] mx-auto mb-14"
            style={{ color: P.textOnDarkMuted }}
          >
            From predictive analytics to seamless integration — solutions
            designed to transform how you think, decide, and act.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
            className="flex items-center justify-center gap-5"
          >
            <a
              href="/contact"
              className="group inline-flex items-center gap-3 px-9 py-4 rounded-full text-[14px] font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(201,168,110,0.25)]"
              style={{ background: P.gold, color: P.charcoal }}
            >
              Explore Solutions
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-[14px] font-medium transition-all duration-300 hover:bg-white/[0.06]"
              style={{ color: P.textOnDarkMuted, border: `1px solid ${P.charcoalBorder}` }}
            >
              Book a Demo
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${P.gold}30, transparent)` }} />
    </section>
  )
}


// ═══════════════════════════════════════════════════════════
// SECTION 2: SLIDING SOLUTIONS — Harkcap-inspired
// ═══════════════════════════════════════════════════════════
function SlidingSolutionsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [active, setActive] = useState(0)
  const sol = solutions[active]

  return (
    <section ref={ref} className="relative py-40 overflow-hidden" style={{ background: P.charcoal }}>
      {/* Subtle side glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[600px] pointer-events-none" style={{ background: `radial-gradient(ellipse at top right, ${P.gold}08, transparent 70%)`, filter: 'blur(60px)' }} />
      <Grain id="slidingGrain" opacity={0.03} />

      <div className="relative z-10 px-[clamp(2rem,8vw,8rem)]">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-[11px] uppercase tracking-[0.22em] mb-6"
          style={{ color: P.gold }}
        >
          What We Build
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="leading-[1.08] tracking-[-0.03em] mb-24"
          style={{ fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)', fontWeight: 300, color: P.textOnDark }}
        >
          Modular intelligence<br />
          <span style={{ color: P.textOnDarkDimmed }}>for every layer of your business.</span>
        </motion.h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 lg:gap-16">
          {/* Left nav */}
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="flex flex-col gap-1"
          >
            {solutions.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className="text-left py-6 px-6 rounded-xl transition-all duration-500 cursor-pointer relative overflow-hidden group"
                style={{
                  background: active === i ? P.charcoalLight : 'transparent',
                  borderLeft: active === i ? `2px solid ${s.accent}` : '2px solid transparent',
                }}
              >
                {/* Hover fill */}
                <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span
                  className="relative text-[11px] font-mono tracking-[0.1em] block mb-1.5 transition-colors duration-300"
                  style={{ color: active === i ? s.accent : P.textOnDarkDimmed }}
                >
                  {s.num}
                </span>
                <span
                  className="relative text-[17px] font-medium block transition-colors duration-300"
                  style={{ color: active === i ? P.textOnDark : P.textOnDarkMuted }}
                >
                  {s.name}
                </span>
              </button>
            ))}
          </motion.nav>

          {/* Right panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="relative min-h-[520px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={sol.id}
                initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(3px)' }}
                transition={{ duration: 0.45, ease: EASE }}
                className="rounded-2xl overflow-hidden h-full"
                style={{ background: P.charcoalLight, border: `1px solid ${P.charcoalBorder}` }}
              >
                {/* Top accent bar */}
                <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${sol.accent}, transparent)` }} />

                <div className="p-10 lg:p-14 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.15em] mb-4" style={{ color: sol.accent }}>{sol.tagline}</p>
                      <h3
                        className="leading-[1.1] tracking-[-0.025em]"
                        style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 500, color: P.textOnDark }}
                      >
                        {sol.name}
                      </h3>
                    </div>
                    <span
                      className="select-none leading-none tracking-[-0.04em]"
                      style={{ fontSize: 'clamp(5rem, 8vw, 9rem)', fontWeight: 200, color: `${sol.accent}08`, fontStyle: 'italic' }}
                    >
                      {sol.num}
                    </span>
                  </div>

                  <p className="text-[15px] leading-[1.9] max-w-[560px] mb-10" style={{ color: P.textOnDarkMuted }}>
                    {sol.body}
                  </p>

                  {/* Capabilities grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
                    {sol.capabilities.map((cap, ci) => (
                      <motion.div
                        key={cap}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: ci * 0.06, ease: EASE }}
                        className="flex items-center gap-3 py-3.5 px-5 rounded-lg group/cap hover:bg-white/[0.03] transition-colors duration-300"
                        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full shrink-0 transition-transform duration-300 group-hover/cap:scale-150" style={{ background: sol.accent }} />
                        <span className="text-[13px]" style={{ color: P.textOnDarkMuted }}>{cap}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════
// TRANSITION: Dark → Light gradient
// ═══════════════════════════════════════════════════════════
function DarkToLightTransition() {
  return <div className="h-32" style={{ background: `linear-gradient(180deg, ${P.charcoal}, ${P.cream})` }} />
}
function LightToDarkTransition() {
  return <div className="h-32" style={{ background: `linear-gradient(180deg, ${P.cream}, ${P.charcoal})` }} />
}


// ═══════════════════════════════════════════════════════════
// SECTION 3: INDUSTRIES — Cream bg, icons, rich hover states
// ═══════════════════════════════════════════════════════════
function IndustriesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative py-40" style={{ background: P.cream }}>
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.4]" style={{
        backgroundImage: `radial-gradient(${P.creamDark} 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
      }} />

      <div className="relative z-10 px-[clamp(2rem,8vw,8rem)]">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-[11px] uppercase tracking-[0.22em] mb-6"
              style={{ color: P.goldDark }}
            >
              Industries
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="leading-[1.08] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)', fontWeight: 300, color: P.textDark }}
            >
              Tailored for<br />
              <span style={{ color: P.textMuted }}>every sector.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="text-[15px] leading-[1.8] max-w-[380px] mt-8 lg:mt-0"
            style={{ color: P.textMuted }}
          >
            Deep domain expertise across the industries that matter most. Each solution shaped by the specific challenges of your sector.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 36 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.07, ease: EASE }}
              className="group relative rounded-2xl p-9 transition-all duration-500 cursor-pointer hover:translate-y-[-4px] hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)]"
              style={{ background: P.white, border: `1px solid ${P.creamDark}` }}
            >
              {/* Icon */}
              <div className="mb-6 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-400 group-hover:scale-110"
                style={{ background: P.goldSubtle, border: `1px solid rgba(201,168,110,0.15)` }}>
                <IndustryIcon type={ind.icon} />
              </div>

              <span className="text-[11px] font-mono tracking-[0.1em] block mb-4 transition-colors duration-300" style={{ color: P.textDimmed }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-[20px] font-medium tracking-[-0.01em] mb-3 transition-colors duration-300 group-hover:text-[#1a1a1e]" style={{ color: P.textDark }}>
                {ind.name}
              </h3>
              <p className="text-[14px] leading-[1.8] mb-8" style={{ color: P.textMuted }}>
                {ind.desc}
              </p>

              <span className="text-[13px] font-medium inline-flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0"
                style={{ color: P.goldDark }}>
                Explore
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-8 right-8 h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full"
                style={{ background: `linear-gradient(90deg, ${P.gold}, transparent)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════
// SECTION 4: FEATURE SHOWCASE — Rich visual panels
// ═══════════════════════════════════════════════════════════
function FeatureShowcaseSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const features = [
    {
      label: 'Predictive Intelligence',
      headline: 'See what\'s coming\nbefore it arrives',
      body: 'Our adaptive ML models continuously learn from your data streams, identifying patterns and anomalies that human analysts would miss.',
      stats: [
        { value: '99.7%', label: 'Accuracy' },
        { value: '12ms', label: 'Latency' },
        { value: '2.4B+', label: 'Events / day' },
      ],
    },
    {
      label: 'Seamless Integration',
      headline: 'One interface,\nevery system',
      body: 'A single elegant interface that orchestrates data flow between legacy and modern infrastructure — zero downtime, infinite scale.',
      stats: [
        { value: '500+', label: 'Connectors' },
        { value: '3min', label: 'Setup time' },
        { value: '0', label: 'Code required' },
      ],
    },
  ]

  return (
    <section ref={ref} className="relative py-40 overflow-hidden" style={{ background: P.charcoal }}>
      {/* Atmospheric glow */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${P.gold}0a, transparent 70%)`, filter: 'blur(80px)' }} />
      <Grain id="featureGrain" opacity={0.03} />

      <div className="relative z-10 px-[clamp(2rem,8vw,8rem)]">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-[11px] uppercase tracking-[0.22em] mb-6"
          style={{ color: P.gold }}
        >
          Capabilities
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="leading-[1.08] tracking-[-0.03em] mb-28"
          style={{ fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)', fontWeight: 300, color: P.textOnDark }}
        >
          Built different.<br />
          <span style={{ color: P.textOnDarkDimmed }}>Proven at scale.</span>
        </motion.h2>

        <div className="space-y-32">
          {features.map((feat, i) => (
            <motion.div
              key={feat.label}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease: EASE }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              {/* Visual panel — NOW WITH RICH CONTENT */}
              <div className={`relative rounded-2xl overflow-hidden aspect-[4/3] ${i % 2 === 1 ? 'lg:order-2' : ''}`}
                style={{ background: `linear-gradient(135deg, ${P.charcoalLight}, ${P.charcoalMid})`, border: `1px solid ${P.charcoalBorder}` }}>

                {/* Abstract dashboard mockup */}
                <div className="absolute inset-0 p-8">
                  {/* Top bar mockup */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: `${P.gold}40` }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
                    <div className="flex-1" />
                    <div className="h-2 w-20 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
                  </div>

                  {/* Grid lines (abstract data viz) */}
                  <div className="relative flex-1 h-[calc(100%-80px)]">
                    {/* Horizontal grid lines */}
                    {[0, 1, 2, 3, 4].map(j => (
                      <div key={j} className="absolute left-0 right-0 h-[1px]" style={{ top: `${j * 25}%`, background: 'rgba(255,255,255,0.03)' }} />
                    ))}
                    {/* Vertical grid lines */}
                    {[0, 1, 2, 3].map(j => (
                      <div key={j} className="absolute top-0 bottom-0 w-[1px]" style={{ left: `${(j + 1) * 25}%`, background: 'rgba(255,255,255,0.03)' }} />
                    ))}

                    {/* Abstract chart bars */}
                    <div className="absolute bottom-0 left-0 right-0 flex items-end gap-[6%] px-[5%] h-[70%]">
                      {[65, 45, 80, 55, 90, 40, 75, 60].map((h, j) => (
                        <div
                          key={j}
                          className="flex-1 rounded-t-sm transition-all duration-500"
                          style={{
                            height: `${h}%`,
                            background: j === 4 ? `linear-gradient(180deg, ${P.gold}60, ${P.gold}20)` : `linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))`,
                            border: j === 4 ? `1px solid ${P.gold}40` : '1px solid rgba(255,255,255,0.04)',
                            borderBottom: 'none',
                          }}
                        />
                      ))}
                    </div>

                    {/* Trend line */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" fill="none" preserveAspectRatio="none">
                      <path
                        d="M0 150 Q50 130 100 120 T200 80 T300 60 T400 30"
                        stroke={P.gold}
                        strokeWidth="1.5"
                        strokeOpacity="0.4"
                        fill="none"
                      />
                      <path
                        d="M0 150 Q50 130 100 120 T200 80 T300 60 T400 30 V200 H0 Z"
                        fill={`url(#grad${i})`}
                        fillOpacity="0.1"
                      />
                      <defs>
                        <linearGradient id={`grad${i}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={P.gold} stopOpacity="0.15" />
                          <stop offset="100%" stopColor={P.gold} stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                {/* Stats at bottom */}
                <div className="absolute bottom-6 left-6 right-6 flex gap-3 z-10">
                  {feat.stats.map((stat) => (
                    <div key={stat.label} className="flex-1 rounded-xl py-4 px-3 text-center"
                      style={{ background: 'rgba(26,26,30,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="text-[clamp(1.1rem,1.8vw,1.4rem)] font-semibold tracking-[-0.02em]" style={{ color: P.gold }}>{stat.value}</div>
                      <div className="text-[9px] uppercase tracking-[0.14em] mt-1" style={{ color: P.textOnDarkDimmed }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Text panel */}
              <div className={`py-4 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <p className="text-[11px] uppercase tracking-[0.18em] mb-5" style={{ color: P.gold }}>{feat.label}</p>
                <h3 className="leading-[1.08] tracking-[-0.025em] mb-8 whitespace-pre-line"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400, color: P.textOnDark }}>
                  {feat.headline}
                </h3>
                <p className="text-[15px] leading-[1.9] max-w-[480px] mb-10" style={{ color: P.textOnDarkMuted }}>{feat.body}</p>

                {/* Feature bullets */}
                <div className="space-y-3 mb-10">
                  {feat.stats.map(s => (
                    <div key={s.label} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full" style={{ background: P.gold }} />
                      <span className="text-[14px]" style={{ color: P.textOnDarkMuted }}>{s.value} {s.label.toLowerCase()}</span>
                    </div>
                  ))}
                </div>

                <a href="/contact" className="group inline-flex items-center gap-2 text-[13px] font-medium transition-colors duration-300" style={{ color: P.gold }}>
                  Learn more
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5">
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
// SECTION 5: DIFFERENTIATORS — Accordion on cream
// ═══════════════════════════════════════════════════════════
function DifferentiatorsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [expanded, setExpanded] = useState(0)

  return (
    <section ref={ref} className="relative py-40" style={{ background: P.cream }}>
      <div className="px-[clamp(2rem,8vw,8rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24">
          {/* Left — sticky header */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-[11px] uppercase tracking-[0.22em] mb-6"
              style={{ color: P.goldDark }}
            >
              Why Us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="leading-[1.08] tracking-[-0.03em] mb-8"
              style={{ fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)', fontWeight: 300, color: P.textDark }}
            >
              What sets us apart<br />
              <span style={{ color: P.textMuted }}>from the rest.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="text-[15px] leading-[1.8] max-w-[380px]"
              style={{ color: P.textMuted }}
            >
              Four pillars that define our approach to enterprise intelligence — each one non-negotiable.
            </motion.p>
          </div>

          {/* Right — accordion */}
          <div className="space-y-3">
            {differentiators.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: EASE }}
                className="rounded-2xl overflow-hidden transition-all duration-400"
                style={{
                  background: expanded === i ? P.white : 'transparent',
                  border: `1px solid ${expanded === i ? P.creamDark : 'rgba(0,0,0,0.04)'}`,
                  boxShadow: expanded === i ? '0 4px 24px rgba(0,0,0,0.05)' : 'none',
                }}
              >
                <button
                  onClick={() => setExpanded(expanded === i ? -1 : i)}
                  className="w-full flex items-center justify-between px-8 py-7 cursor-pointer text-left"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-[12px] font-mono tracking-[0.1em] w-8" style={{ color: expanded === i ? P.gold : P.textDimmed }}>{d.num}</span>
                    <h3 className="text-[18px] font-medium tracking-[-0.01em] transition-colors duration-300"
                      style={{ color: expanded === i ? P.textDark : P.textMuted }}>
                      {d.title}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0"
                    style={{ background: expanded === i ? P.goldSubtle : 'rgba(0,0,0,0.03)', transform: expanded === i ? 'rotate(45deg)' : 'rotate(0)' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={expanded === i ? P.gold : P.textDimmed} strokeWidth="1.5">
                      <path d="M6 1v10M1 6h10" strokeLinecap="round" />
                    </svg>
                  </div>
                </button>

                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 pl-[80px]">
                        <p className="text-[15px] leading-[1.85] mb-6 max-w-[460px]" style={{ color: P.textMuted }}>{d.body}</p>
                        <div className="flex flex-wrap gap-2">
                          {d.tags.map((tag) => (
                            <span key={tag} className="px-4 py-1.5 rounded-full text-[12px] font-medium"
                              style={{ background: P.goldSubtle, color: P.goldDark, border: '1px solid rgba(201,168,110,0.18)' }}>
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
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════
// SECTION 6: SOCIAL PROOF — Minimal, editorial
// ═══════════════════════════════════════════════════════════
function SocialProofSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const partners = ['Meridian Systems', 'Arclight Ventures', 'Novus Technologies', 'Helios Corp', 'Veridian Group', 'Cortex Labs', 'Atlas Cloud', 'Prism Analytics']

  return (
    <section ref={ref} className="relative py-32 overflow-hidden" style={{ background: P.charcoal }}>
      <Grain id="socialGrain" opacity={0.025} />
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${P.charcoalBorder}, transparent)` }} />

      <div className="relative z-10 px-[clamp(2rem,8vw,8rem)]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-[11px] uppercase tracking-[0.22em]"
            style={{ color: P.gold }}
          >
            Trusted By
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-[14px] mt-4 lg:mt-0"
            style={{ color: P.textOnDarkDimmed }}
          >
            Leading enterprises across industries
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-[1px] rounded-2xl overflow-hidden"
          style={{ background: P.charcoalBorder }}
        >
          {partners.map((p) => (
            <div key={p}
              className="flex items-center justify-center py-14 transition-all duration-400 hover:bg-white/[0.03] group"
              style={{ background: P.charcoal }}>
              <span className="text-[14px] font-medium tracking-[0.02em] transition-colors duration-300 group-hover:text-white/40" style={{ color: P.textOnDarkDimmed }}>
                {p}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════
// SECTION 7: CTA — Dramatic, warm, confident
// ═══════════════════════════════════════════════════════════
function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative py-40" style={{ background: P.cream }}>
      <div className="px-[clamp(2rem,8vw,8rem)]">
        <div className="relative rounded-[28px] overflow-hidden py-28 px-12 lg:px-24"
          style={{ background: `linear-gradient(145deg, #1e1e22, ${P.charcoal}, #18181c)` }}>

          <Grain id="ctaGrain" opacity={0.035} />

          {/* Multiple atmospheric glows */}
          <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${P.gold}18, transparent 65%)`, top: '-30%', right: '5%', filter: 'blur(80px)' }} />
          <div className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${P.gold}0c, transparent 65%)`, bottom: '-20%', left: '10%', filter: 'blur(60px)' }} />

          {/* Decorative lines */}
          <div className="absolute top-[30%] left-0 right-0 h-[1px] pointer-events-none" style={{ background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)` }} />
          <div className="absolute bottom-[35%] left-0 right-0 h-[1px] pointer-events-none" style={{ background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.025), transparent)` }} />

          <div className="relative z-10 text-center max-w-[640px] mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE }}
              className="text-[11px] uppercase tracking-[0.22em] mb-8"
              style={{ color: P.gold }}
            >
              Get Started
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              className="leading-[1.08] tracking-[-0.03em] mb-8"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 300, color: P.textOnDark }}
            >
              Ready to transform<br />your enterprise?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="text-[15px] leading-[1.9] mb-12"
              style={{ color: P.textOnDarkMuted }}
            >
              Let&apos;s discuss how our solutions can accelerate your AI journey — from first integration to full-scale deployment.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="flex items-center justify-center gap-4"
            >
              <a href="/contact"
                className="group inline-flex items-center gap-3 px-9 py-4 rounded-full text-[14px] font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(201,168,110,0.3)]"
                style={{ background: P.gold, color: P.charcoal }}>
                Get Started
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="/contact"
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-[14px] font-medium transition-all duration-300 hover:bg-white/[0.06]"
                style={{ color: P.textOnDarkMuted, border: `1px solid ${P.charcoalBorder}` }}>
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
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════
export default function SolutionsContent() {
  return (
    <main>
      <HeroSection />
      <SlidingSolutionsSection />
      <DarkToLightTransition />
      <IndustriesSection />
      <LightToDarkTransition />
      <FeatureShowcaseSection />
      <DarkToLightTransition />
      <DifferentiatorsSection />
      <LightToDarkTransition />
      <SocialProofSection />
      <CTASection />
    </main>
  )
}
