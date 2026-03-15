'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import Image from 'next/image'

// ═══════════════════════════════════════════════════════════
// INDEPENDENT DESIGN SYSTEM V3.1 — IT Solutions-inspired
// Charcoal / Cream / Gold with spiral line imagery
// Polish pass: gradient mesh bgs, taller cards, accent blobs
// ═══════════════════════════════════════════════════════════

const P = {
  charcoal: '#1a1a1e',
  charcoalLight: '#242428',
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
const industries = [
  { name: 'Healthcare', desc: 'Secure, compliant AI solutions that enhance patient care, streamline operations, and protect sensitive data.' },
  { name: 'Legal', desc: 'Reliable and secure AI solutions tailored to meet the needs of modern law firms and legal departments.' },
  { name: 'Financial Services', desc: 'Advanced AI solutions that safeguard transactions, enhance efficiency, and meet strict regulatory requirements.' },
  { name: 'Manufacturing', desc: 'Predictive maintenance, quality control systems, and supply chain intelligence for modern factories.' },
  { name: 'Logistics', desc: 'Route optimization, demand forecasting, and real-time tracking intelligence across the supply chain.' },
  { name: 'Retail', desc: 'Customer behavior intelligence, inventory optimization, and personalized experience engines at scale.' },
]

const scrollCards = [
  { title: 'Predictive Intelligence.', body: 'Stay ahead of market shifts with AI models that identify patterns and predict outcomes before they happen.' },
  { title: 'Adaptive Security.', body: 'Proactive threat detection that evolves with the landscape, keeping your infrastructure resilient and compliant.' },
  { title: 'Seamless Integration.', body: 'Connect legacy and modern systems effortlessly with universal adapters designed for zero-downtime deployment.' },
  { title: 'Scalable Architecture.', body: 'Infrastructure that grows with your ambitions — from thousands to billions of events, without missing a beat.' },
  { title: 'Strategic Partnership.', body: 'Not just a vendor. A dedicated team of engineers and architects invested in your long-term success.' },
]


const services = [
  {
    title: 'AI-Powered Intelligence',
    body: 'Harness the power of artificial intelligence to transform raw data into actionable insights. Our adaptive machine learning models continuously learn from your business patterns, identifying opportunities and risks that traditional analytics would miss. From real-time decision support to automated anomaly detection, we build intelligence that scales with your ambitions.',
    areas: ['Predictive Analytics', 'Natural Language Processing', 'Computer Vision', 'Recommendation Systems', 'Anomaly Detection'],
  },
  {
    title: 'Enterprise Integration',
    body: 'Connect your entire technology ecosystem through a single, elegant integration layer. Whether you\'re bridging legacy systems with modern cloud infrastructure or orchestrating complex data flows across departments, our universal API adapters ensure zero-downtime connectivity and infinite scalability.',
    areas: ['Universal API Gateway', 'Legacy System Adapters', 'Event-Driven Architecture', 'Real-time Data Sync', 'Custom Middleware'],
  },
  {
    title: 'Security & Compliance',
    body: 'Enterprise-grade security woven into every layer of your AI infrastructure. From zero-trust architectures to automated compliance monitoring, we ensure your data stays encrypted at rest, in transit, and during processing — meeting the strictest regulatory requirements across industries.',
    areas: ['Zero-Trust Architecture', 'SOC 2 Type II', 'HIPAA Compliance', 'GDPR Automation', 'Threat Intelligence'],
  },
  {
    title: 'Cloud & Infrastructure',
    body: 'Scalable, resilient cloud infrastructure designed for AI workloads. We architect environments that handle billions of events per day with sub-millisecond latency, ensuring your intelligence layer never becomes a bottleneck — from edge computing to distributed processing clusters.',
    areas: ['Multi-Cloud Orchestration', 'Edge Computing', 'Auto-Scaling Pipelines', 'Infrastructure as Code', 'Disaster Recovery'],
  },
  {
    title: 'Strategic Consulting',
    body: 'Transform technology into a competitive advantage with strategic planning that aligns AI initiatives with your business goals. Our dedicated team of engineers, scientists, and architects partner with your leadership to chart a roadmap from pilot to full-scale deployment.',
    areas: ['AI Readiness Assessment', 'Roadmap Development', 'Change Management', 'ROI Modeling', 'Executive Workshops'],
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
// HERO — IT Solutions style: large flowing text with inline pill images
// ═══════════════════════════════════════════════════════════
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <section ref={ref} className="relative min-h-[100vh] flex items-center overflow-hidden" style={{ background: P.cream }}>
      {/* Subtle gradient mesh bg */}
      <div className="absolute inset-0 opacity-[0.5] pointer-events-none">
        <Image src="/gradient-orbs-warm.jpg" alt="" fill className="object-cover" priority />
      </div>
      <Grain id="heroGrain" opacity={0.02} />

      <div className="relative z-10 w-full px-[clamp(2rem,8vw,8rem)] py-40">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: EASE_OUT }}
          className="max-w-[1200px]"
        >
          <h1 className="leading-[1.12] tracking-[-0.03em]" style={{ fontSize: 'clamp(2.6rem, 5.8vw, 5rem)', fontWeight: 400, color: P.textDark }}>
            We build intelligent{' '}
            <span className="inline-block align-middle mx-2 rounded-full overflow-hidden" style={{ width: 'clamp(80px, 9vw, 120px)', height: 'clamp(44px, 5vw, 68px)' }}>
              <Image src="/spiral-card.jpg" alt="" width={120} height={68} className="w-full h-full object-cover" />
            </span>{' '}
            systems that transform how enterprises{' '}
            <span className="inline-block align-middle mx-2 rounded-full overflow-hidden" style={{ width: 'clamp(80px, 9vw, 120px)', height: 'clamp(44px, 5vw, 68px)' }}>
              <Image src="/spiral-motion.jpg" alt="" width={120} height={68} className="w-full h-full object-cover" />
            </span>
            {' '}think, operate, and grow{' '}
            <span className="inline-block align-middle mx-2 rounded-full overflow-hidden" style={{ width: 'clamp(80px, 9vw, 120px)', height: 'clamp(44px, 5vw, 68px)' }}>
              <Image src="/spiral-rotated.jpg" alt="" width={120} height={68} className="w-full h-full object-cover" />
            </span>{' '}
            — confidently.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          className="mt-16"
        >
          <a
            href="/contact"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-[14px] font-medium transition-all duration-300 hover:scale-[1.02]"
            style={{ background: P.charcoal, color: P.textOnDark }}
          >
            See what we build
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════
// MISSION — Large text on dark spiral bg
// ═══════════════════════════════════════════════════════════
function MissionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ minHeight: '80vh' }}>
      <div className="absolute inset-0">
        <Image src="/spiral-arcs.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(26,26,30,0.72), rgba(26,26,30,0.4))' }} />
      </div>
      <Grain id="missionGrain" opacity={0.04} />

      <div className="relative z-10 px-[clamp(2rem,8vw,8rem)] py-32 flex items-center min-h-[80vh]">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease: EASE_OUT }}
          className="leading-[1.2] tracking-[-0.02em] max-w-[1100px]"
          style={{ fontSize: 'clamp(1.8rem, 4.2vw, 3.6rem)', fontWeight: 300, color: P.textOnDark }}
        >
          Trinade AI Technologies crafts modular, scalable AI solutions — from predictive intelligence and secure cloud infrastructure to enterprise integration — engineered with precision and delivered with conviction.
        </motion.p>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════
// INDUSTRIES — Tall cards with hover gradient accent
// IT Solutions style: grid, title at top, desc at bottom, lots of space
// ═══════════════════════════════════════════════════════════
function IndustriesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative py-32 overflow-hidden" style={{ background: P.cream }}>
      {/* Subtle gradient mesh */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <Image src="/gradient-mesh-warm.jpg" alt="" fill className="object-cover" />
      </div>

      <div className="relative z-10 px-[clamp(2rem,8vw,8rem)]">
        <div className="flex items-end justify-between mb-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
              className="leading-[1.1] tracking-[-0.025em]"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 400, color: P.textDark }}
            >
              Tailored solutions for Every Industry.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="text-[15px] leading-[1.7] mt-4 max-w-[500px]"
              style={{ color: P.textMuted }}
            >
              Our expertise spans diverse sectors, ensuring support that evolves with you.
            </motion.p>
          </div>
          {/* Navigation arrows like IT Solutions */}
          <div className="hidden md:flex gap-2">
            <button className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors hover:bg-black/[0.03]" style={{ borderColor: P.creamDark }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={P.textDimmed} strokeWidth="1.5"><path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors hover:bg-black/[0.03]" style={{ borderColor: P.creamDark }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={P.textDimmed} strokeWidth="1.5"><path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>

        {/* Separator line */}
        <div className="h-[1px] mb-10" style={{ background: P.creamDark }} />

        {/* Tall industry cards — IT Solutions style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-none"
          style={{ scrollbarWidth: 'none' }}
        >
          {industries.map((ind, i) => (
            <div
              key={ind.name}
              className="group flex-shrink-0 rounded-2xl p-8 flex flex-col justify-between transition-all duration-500 cursor-pointer relative overflow-hidden"
              style={{
                width: 'clamp(280px, 25vw, 360px)',
                minHeight: '420px',
                background: P.creamMid,
                border: `1px solid ${P.creamDark}`,
              }}
            >
              {/* Gold gradient accent blob on hover — like IT Solutions' lime blob */}
              <div
                className="absolute bottom-0 right-0 w-48 h-48 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${P.lime}90, transparent 70%)`,
                  transform: 'translate(30%, 30%)',
                  filter: 'blur(20px)',
                }}
              />

              <h3 className="text-[20px] font-medium tracking-[-0.01em] relative z-10" style={{ color: P.textDark }}>
                {ind.name}
              </h3>

              <p className="text-[14px] leading-[1.75] relative z-10" style={{ color: P.textMuted }}>
                {ind.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════
// SCROLL-DRIVEN CARDS — Sticky text + scrolling cards
// IT Solutions "Secure, Streamline, and Succeed"
// LIGHT gradient mesh background (not dark spiral)
// ═══════════════════════════════════════════════════════════
function ScrollCardsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* LIGHT gradient mesh bg — matching IT Solutions' pastel green, translated to warm gold */}
      <div className="absolute inset-0">
        <Image src="/gradient-mesh-warm.jpg" alt="" fill className="object-cover" />
        {/* Subtle spiral arc lines overlay */}
        <div className="absolute inset-0 opacity-[0.06]">
          <Image src="/spiral-arcs.jpg" alt="" fill className="object-cover" style={{ mixBlendMode: 'multiply' }} />
        </div>
      </div>
      <Grain id="scrollGrain" opacity={0.02} />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 px-[clamp(2rem,8vw,8rem)]" style={{ minHeight: '220vh' }}>
        {/* Left — Sticky text at bottom */}
        <div className="lg:sticky lg:top-0 lg:h-screen flex items-end pb-24 pt-32">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="leading-[1.08] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 400, color: P.textDark }}
          >
            Intelligent, Adaptive,<br />and Built to Scale<br />with Confidence
          </motion.h2>
        </div>

        {/* Right — Scrolling cards with accent blobs */}
        <div className="flex flex-col gap-6 py-32">
          {scrollCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
              className="group rounded-2xl p-10 relative overflow-hidden transition-shadow duration-500 hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)]"
              style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)' }}
            >
              {/* Lime/gold gradient accent blob — like IT Solutions cards */}
              <div
                className="absolute bottom-0 right-0 w-40 h-40 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${P.lime}80, transparent 70%)`,
                  transform: 'translate(30%, 30%)',
                  filter: 'blur(16px)',
                }}
              />

              <h3 className="text-[22px] font-medium tracking-[-0.015em] mb-4 relative z-10" style={{ color: P.textDark }}>
                {card.title}
              </h3>
              <p className="text-[15px] leading-[1.75] relative z-10" style={{ color: P.textMuted }}>
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


// (ChallengesSection and DifferentiatorsSection removed — to be reimplemented for Home Page)


// ═══════════════════════════════════════════════════════════
// ACCORDION — IT Solutions "Tailor-made services" style
// Centered heading, full-width cards, NO "Learn More"
// ═══════════════════════════════════════════════════════════
function AccordionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [expanded, setExpanded] = useState(0)

  return (
    <section ref={ref} className="relative py-32 overflow-hidden" style={{ background: P.white }}>
      {/* Subtle gradient mesh */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Image src="/gradient-orbs-warm.jpg" alt="" fill className="object-cover" />
      </div>

      <div className="relative z-10 px-[clamp(2rem,8vw,8rem)]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="leading-[1.1] tracking-[-0.025em] text-center mb-20"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, color: P.textDark }}
        >
          Tailor-made solutions for<br />all your business needs
        </motion.h2>

        <div className="max-w-[1100px] mx-auto space-y-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: EASE }}
              className="rounded-2xl overflow-hidden transition-all duration-400"
              style={{
                background: expanded === i ? P.white : P.creamMid,
                border: `1px solid ${expanded === i ? P.creamDark : 'transparent'}`,
                boxShadow: expanded === i ? '0 4px 24px rgba(0,0,0,0.04)' : 'none',
              }}
            >
              <button
                onClick={() => setExpanded(expanded === i ? -1 : i)}
                className="w-full flex items-center justify-between px-8 py-7 cursor-pointer text-left"
              >
                <h3 className="text-[20px] font-medium tracking-[-0.01em] transition-colors duration-300"
                  style={{ color: expanded === i ? P.textDark : P.textMuted }}>
                  {s.title}
                </h3>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shrink-0"
                  style={{
                    background: expanded === i ? P.lime : 'rgba(0,0,0,0.04)',
                    transform: expanded === i ? 'rotate(45deg)' : 'rotate(0)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={expanded === i ? P.charcoal : P.textDimmed} strokeWidth="1.5">
                    <path d="M7 1v12M1 7h12" strokeLinecap="round" />
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
                    <div className="px-8 pb-8">
                      <p className="text-[15px] leading-[1.8] mb-6 max-w-[700px]" style={{ color: P.textMuted }}>
                        {s.body}
                      </p>
                      <p className="text-[12px] uppercase tracking-[0.12em] mb-3" style={{ color: P.textDimmed }}>
                        Key Service Areas
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {s.areas.map(area => (
                          <span key={area} className="px-4 py-1.5 rounded-full text-[12px] font-medium"
                            style={{ background: P.cream, color: P.textMuted, border: `1px solid ${P.creamDark}` }}>
                            {area}
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
// CTA — Brown Gold Spiraling lines background
// ═══════════════════════════════════════════════════════════
function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative py-32" style={{ background: P.cream }}>
      <div className="px-[clamp(2rem,8vw,8rem)]">
        <div className="relative rounded-[28px] overflow-hidden py-28 px-12 lg:px-24">
          {/* Brown Gold Spiraling lines background */}
          <div className="absolute inset-0">
            <Image src="/spiral-gold.jpg" alt="" fill className="object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,10,12,0.55), rgba(10,10,12,0.25))' }} />
          </div>
          <Grain id="ctaGrain" opacity={0.04} />

          <div className="relative z-10 text-center max-w-[640px] mx-auto">
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
              className="flex items-center justify-center gap-4 flex-wrap"
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
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-[14px] font-medium transition-all duration-300 hover:bg-white/[0.1]"
                style={{ color: P.textOnDarkMuted, border: '1px solid rgba(255,255,255,0.15)' }}>
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
// FOOTER — Society Studios-inspired dark footer
// Brown gold glassmorphism + scrolling TRINADE marquee
// ═══════════════════════════════════════════════════════════
function SolutionsFooter() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  const navLinks = [
    { label: 'Products', href: '#' },
    { label: 'Solutions', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Company', href: '#' },
    { label: 'Contact', href: '/contact' },
  ]

  const socials = [
    { label: 'Li', href: 'https://linkedin.com/company/trinadeai', icon: 'linkedin' as const },
    { label: 'Ig', href: 'https://instagram.com/trinadeai', icon: 'instagram' as const },
    { label: 'X', href: 'https://x.com/trinadeai', icon: 'x' as const },
  ]

  return (
    <footer ref={ref} className="relative overflow-hidden" style={{ background: '#0a0a0a', maxHeight: '100vh' }}>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .footer-marquee {
          animation: marquee 10s linear infinite;
          will-change: transform;
        }
      `}</style>

      {/* ── Main content area ── */}
      <div className="px-[clamp(2rem,8vw,8rem)] py-14">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="relative rounded-[28px] p-12"
          style={{
            background: 'linear-gradient(165deg, rgba(185,155,100,0.22) 0%, rgba(165,125,60,0.16) 40%, rgba(200,175,125,0.19) 100%)',
            backdropFilter: 'blur(24px) saturate(1.5)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
            border: '1px solid rgba(180,150,95,0.25)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(130,95,30,0.08)',
          }}
        >
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-0">

            {/* LEFT — Navigation links (~40%) */}
            <div className="lg:w-[40%] flex flex-col gap-3">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: EASE }}
                  className="group inline-block w-fit leading-none tracking-[-0.02em] transition-colors duration-300"
                  style={{
                    fontSize: 'clamp(1.4rem, 2vw, 1.75rem)',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.9)',
                  }}
                  whileHover={{ color: 'rgba(201,168,110,0.9)' } as never}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* RIGHT — Office + Social (~60%) */}
            <div className="lg:w-[60%] flex flex-col sm:flex-row gap-12 lg:gap-0 lg:justify-end">

              {/* OFFICE column */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                className="lg:w-[50%]"
              >
                <p className="mb-4 uppercase tracking-[0.08em]" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                  OFFICE
                </p>
                <p className="mb-3" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                  #06, Green Valley Apartments,<br />
                  Gorantla, Guntur,<br />
                  Andhra Pradesh 522034, India
                </p>
                <a
                  href="tel:+919490754923"
                  className="block mb-2 transition-colors duration-200 hover:opacity-100"
                  style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)' }}
                >
                  +91 9490754923
                </a>
                <a
                  href="mailto:info@trinade.com"
                  className="block transition-colors duration-200 hover:underline hover:opacity-100"
                  style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)' }}
                >
                  info@trinade.com
                </a>
              </motion.div>

              {/* SOCIAL column */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
                className="lg:w-[50%]"
              >
                <p className="mb-4 uppercase tracking-[0.08em]" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                  SOCIAL
                </p>
                <div className="flex gap-3">
                  {socials.map(s => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        color: 'rgba(255,255,255,0.9)',
                        background: 'linear-gradient(165deg, rgba(185,155,100,0.55) 0%, rgba(165,125,60,0.42) 40%, rgba(200,175,125,0.50) 100%)',
                        backdropFilter: 'blur(12px) saturate(1.4)',
                        WebkitBackdropFilter: 'blur(12px) saturate(1.4)',
                        border: '1px solid rgba(180,150,95,0.4)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(130,95,30,0.12), 0 2px 10px rgba(130,95,30,0.2)',
                      }}
                      whileHover={{
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(130,95,30,0.18), 0 4px 20px rgba(130,95,30,0.35)',
                      } as never}
                    >
                      {s.icon === 'linkedin' && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      )}
                      {s.icon === 'instagram' && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                      )}
                      {s.icon === 'x' && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      )}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Separator — gold gradient line ── */}
      <div
        className="mx-[clamp(2rem,8vw,8rem)]"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(201,168,110,0.3), transparent)',
        }}
      />

      {/* ── Bottom bar ── */}
      <div className="px-[clamp(2rem,8vw,8rem)] py-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-6">
          {[
            { label: 'Privacy Policy', href: '/privacy-policy' },
            { label: 'Terms of Service', href: '/terms-of-service' },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-[12px] transition-opacity duration-200 hover:opacity-60"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
          &copy; 2026 Trinade AI Technologies Pvt Ltd. All rights reserved.
        </p>
      </div>

      {/* ── Scrolling TRINADE marquee ── */}
      <div className="overflow-hidden" style={{ userSelect: 'none', pointerEvents: 'none' }}>
        <div
          className="footer-marquee flex whitespace-nowrap leading-none"
          style={{
            fontSize: 'clamp(280px, 38vw, 500px)',
            fontWeight: 900,
            color: 'rgba(255,255,255,0.06)',
            letterSpacing: '-0.04em',
          }}
        >
          {/* Duplicated for seamless loop */}
          <span>TRINADE&nbsp;·&nbsp;TRINADE&nbsp;·&nbsp;TRINADE&nbsp;·&nbsp;TRINADE&nbsp;·&nbsp;</span>
          <span>TRINADE&nbsp;·&nbsp;TRINADE&nbsp;·&nbsp;TRINADE&nbsp;·&nbsp;TRINADE&nbsp;·&nbsp;</span>
        </div>
      </div>

    </footer>
  )
}


// ═══════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════
export default function SolutionsContent() {
  return (
    <main>
      <HeroSection />
      <MissionSection />
      <IndustriesSection />
      <ScrollCardsSection />
      <AccordionSection />
      <CTASection />
      <SolutionsFooter />
    </main>
  )
}
