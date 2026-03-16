'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import SolutionsFooter from './solutions-footer'

// ═══════════════════════════════════════════════════════════
// INDEPENDENT DESIGN SYSTEM V5 — IT Solutions-inspired
// Charcoal / Cream / Gold with spiral line imagery
// Balanced content: 40% AI, 60% other solutions
// ScrollCards: CSS sticky heading + scrolling cards (IT Solutions pattern)
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
}

const EASE = [0.25, 0.1, 0.25, 1] as const
const EASE_OUT = [0.16, 1, 0.3, 1] as const

// ─── Data ───
const industries = [
  { name: 'Healthcare', desc: 'Secure, compliant technology solutions that enhance patient care, streamline operations, and protect sensitive health data.' },
  { name: 'Legal', desc: 'Reliable and secure solutions tailored to meet the unique demands of modern law firms and legal departments.' },
  { name: 'Financial Services', desc: 'Advanced security and compliance solutions that safeguard transactions, enhance efficiency, and meet strict regulatory requirements.' },
  { name: 'Manufacturing', desc: 'Smart automation, predictive maintenance, and supply chain optimization for modern production environments.' },
  { name: 'Logistics', desc: 'Route optimization, demand forecasting, and real-time visibility across your entire supply chain.' },
  { name: 'Retail', desc: 'Customer analytics, inventory intelligence, and personalized experience platforms that drive growth at scale.' },
]

const scrollCards = [
  { title: 'Cybersecurity & Compliance.', body: 'Proactive threat management, zero-trust architecture, and compliance frameworks that keep your business protected and audit-ready across every regulatory landscape.' },
  { title: 'Cloud Infrastructure.', body: 'Multi-cloud orchestration, seamless migration, and hybrid environments designed for performance, resilience, and cost efficiency at any scale.' },
  { title: 'Managed IT Services.', body: '24/7 monitoring, helpdesk support, and network management that keeps your operations running smoothly — so your team can focus on what matters.' },
  { title: 'AI & Data Intelligence.', body: 'Predictive analytics, natural language processing, and computer vision that turn raw data into actionable insights and smarter business decisions.' },
  { title: 'Strategic Consulting.', body: 'IT roadmap planning, digital strategy, and change management that align technology investments with your business goals and long-term vision.' },
  { title: 'Professional Services.', body: 'End-to-end project management, system integration, and custom development delivered by experienced teams who understand your industry.' },
]

const challengeTestimonials = [
  {
    domain: 'Enterprise',
    quote: '\u201COur data was siloed across twelve different systems with no unified view. We needed a partner who could bring everything together without disrupting daily operations.\u201D',
    attribution: 'CTO, Fortune 500 Manufacturing',
    tags: ['Data Integration', 'System Unification'],
  },
  {
    domain: 'FinTech',
    quote: '\u201CRegulatory requirements were changing faster than our security infrastructure could adapt. Every audit felt like a scramble, and compliance gaps kept growing.\u201D',
    attribution: 'VP Security, Digital Banking Platform',
    tags: ['Cybersecurity', 'Compliance Automation'],
  },
  {
    domain: 'Healthcare',
    quote: '\u201CLegacy systems from three different acquisitions couldn\u2019t communicate. Patient data was fragmented, and our clinical teams were losing hours every day to manual workarounds.\u201D',
    attribution: 'CIO, Regional Health Network',
    tags: ['Legacy Modernization', 'Integration'],
  },
  {
    domain: 'Logistics',
    quote: '\u201CWe had no real-time visibility across our supply chain. Decisions were based on data that was already 48 hours old, and the cost of that delay was enormous.\u201D',
    attribution: 'SVP Operations, Global Logistics Firm',
    tags: ['Real-Time Analytics', 'Supply Chain'],
  },
  {
    domain: 'Legal',
    quote: '\u201COur technology strategy was reactive \u2014 always putting out fires. We needed a roadmap that aligned IT investments with where the firm was actually heading.\u201D',
    attribution: 'Managing Partner, AmLaw 100 Firm',
    tags: ['Strategic Consulting', 'IT Roadmap'],
  },
]

const services = [
  {
    title: 'Cybersecurity & Compliance',
    body: 'Proactive security and threat management that keeps your business protected. From compliance frameworks like HIPAA, SOC2, and GDPR to vCISO services, risk assessments, and backup & disaster recovery — we build security into every layer.',
    areas: ['Threat Management', 'Compliance (HIPAA, SOC2, GDPR)', 'vCISO Services', 'Risk Assessments', 'Backup & Disaster Recovery'],
  },
  {
    title: 'Cloud Services',
    body: 'Multi-cloud orchestration, migration, and hybrid environments designed for performance and cost efficiency. Auto-scaling infrastructure and infrastructure-as-code practices that keep your systems resilient and your teams agile.',
    areas: ['Multi-Cloud Orchestration', 'Cloud Migration', 'Hybrid Environments', 'Auto-Scaling', 'Infrastructure as Code'],
  },
  {
    title: 'Managed IT',
    body: '24/7 monitoring, helpdesk support, and network management that keeps your business running without interruption. From vendor management to co-managed IT arrangements — flexible support that fits how your team operates.',
    areas: ['24/7 Monitoring', 'Helpdesk Support', 'Network Management', 'Vendor Management', 'Co-Managed IT'],
  },
  {
    title: 'AI & Data Intelligence',
    body: 'Predictive analytics, natural language processing, computer vision, and recommendation engines that turn your data into a competitive advantage. Anomaly detection and intelligent automation that scale with your business.',
    areas: ['Predictive Analytics', 'NLP', 'Computer Vision', 'Recommendation Engines', 'Anomaly Detection'],
  },
  {
    title: 'Strategic Consulting',
    body: 'IT roadmap planning, digital strategy, and change management that align technology investments with business outcomes. Executive workshops and ROI modeling that give leadership the clarity to move forward with confidence.',
    areas: ['IT Roadmap', 'Digital Strategy', 'Change Management', 'ROI Modeling', 'Executive Workshops'],
  },
  {
    title: 'Professional Services',
    body: 'End-to-end project management, system integration, and custom development delivered by experienced teams. Training programs and ongoing optimization that ensure your technology investment keeps delivering value.',
    areas: ['Project Management', 'System Integration', 'Custom Development', 'Training', 'Ongoing Optimization'],
  },
]

const differentiators = [
  {
    label: 'Process',
    desc: 'Industry-recognized methodologies backed by continuous improvement ensure consistently high-quality service and rapid response.',
  },
  {
    label: 'People',
    desc: 'A dedicated team of engineers, security specialists, and strategists invested in your long-term success and growth.',
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
            At Trinade, we&apos;ve designed solutions{' '}
            <span className="inline-block align-middle mx-2 rounded-full overflow-hidden" style={{ width: 'clamp(80px, 9vw, 120px)', height: 'clamp(44px, 5vw, 68px)' }}>
              <Image src="/spiral-card.jpg" alt="" width={120} height={68} className="w-full h-full object-cover" />
            </span>{' '}
            to address every challenge, providing reliable, scalable{' '}
            <span className="inline-block align-middle mx-2 rounded-full overflow-hidden" style={{ width: 'clamp(80px, 9vw, 120px)', height: 'clamp(44px, 5vw, 68px)' }}>
              <Image src="/spiral-motion.jpg" alt="" width={120} height={68} className="w-full h-full object-cover" />
            </span>
            {' '}and secure technology solutions tailored to your business{' '}
            <span className="inline-block align-middle mx-2 rounded-full overflow-hidden" style={{ width: 'clamp(80px, 9vw, 120px)', height: 'clamp(44px, 5vw, 68px)' }}>
              <Image src="/spiral-rotated.jpg" alt="" width={120} height={68} className="w-full h-full object-cover" />
            </span>{' '}
            needs.
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
            Get started
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
    <section ref={ref} className="relative overflow-hidden" data-dark-section style={{ minHeight: '80vh' }}>
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
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', fontWeight: 300, color: P.textOnDark }}
        >
          From cybersecurity and cloud management to strategic consulting and managed IT, we provide tailored technology solutions designed to strengthen security, enhance efficiency, and drive your business forward.
        </motion.p>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════
// INDUSTRIES — CSS Grid: 3 large + 2x2 smaller cards
// Clean cream backgrounds, gold accent hover
// ═══════════════════════════════════════════════════════════
function IndustryCard({ ind, isLarge, gridStyle }: { ind: typeof industries[0]; isLarge: boolean; gridStyle?: React.CSSProperties }) {
  return (
    <div
      className="group rounded-2xl p-8 flex flex-col justify-between transition-all duration-500 cursor-pointer relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
      style={{
        background: P.creamMid,
        border: `1px solid ${P.creamDark}`,
        ...gridStyle,
      }}
    >
      {/* Grainy gold glow from bottom-right corner */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 100% 100%, rgba(201,168,110,0.18) 0%, rgba(201,168,110,0.06) 40%, transparent 70%)',
        }}
      />
      {/* Grain texture overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.35]" style={{ mixBlendMode: 'multiply' }}>
        <filter id={`grain-${ind.name.replace(/\s+/g, '-')}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${ind.name.replace(/\s+/g, '-')})`} />
      </svg>

      {/* Gold bottom border on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: `linear-gradient(90deg, ${P.gold}, ${P.goldLight})` }}
      />

      {/* Subtle warm tint on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'rgba(201,168,110,0.06)' }}
      />

      <h3
        className={`${isLarge ? 'text-[22px]' : 'text-[19px]'} font-medium tracking-[-0.01em] relative z-10 transition-colors duration-500`}
        style={{ color: P.textDark }}
      >
        {ind.name}
      </h3>

      <div className="relative z-10 mt-auto">
        <p
          className={`${isLarge ? 'text-[16px]' : 'text-[15px]'} leading-[1.75] transition-colors duration-500`}
          style={{ color: P.textMuted }}
        >
          {ind.desc}
        </p>

      </div>
    </div>
  )
}

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
              Solutions built for your industry, not adapted to it.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="text-[16px] leading-[1.7] mt-4 max-w-[500px]"
              style={{ color: P.textMuted }}
            >
              Every sector has unique challenges, regulations, and workflows. We build technology that respects those realities.
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

        {/* CSS Grid — 3 large + small cards on right (IT Solutions layout) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: '1fr 1fr',
            minHeight: '480px',
          }}
        >
          {/* 3 large cards spanning 2 rows */}
          <IndustryCard ind={industries[0]} isLarge gridStyle={{ gridColumn: '1', gridRow: '1 / 3' }} />
          <IndustryCard ind={industries[1]} isLarge gridStyle={{ gridColumn: '2', gridRow: '1 / 3' }} />
          <IndustryCard ind={industries[2]} isLarge gridStyle={{ gridColumn: '3', gridRow: '1 / 3' }} />

          {/* 3 smaller cards on the right */}
          <IndustryCard ind={industries[3]} isLarge={false} gridStyle={{ gridColumn: '4', gridRow: '1' }} />
          <IndustryCard ind={industries[4]} isLarge={false} gridStyle={{ gridColumn: '5', gridRow: '1' }} />
          <IndustryCard ind={industries[5]} isLarge={false} gridStyle={{ gridColumn: '4 / 6', gridRow: '2' }} />
        </motion.div>

      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════
// SCROLL-DRIVEN CARDS — CSS sticky + natural scroll
// Dark bg with spiral image stays sticky while cards scroll
// on the right side. overflow:clip prevents card leakage.
// ═══════════════════════════════════════════════════════════
function ScrollCardsSection() {
  return (
    <section className="relative" style={{ overflow: 'clip', background: P.cream }}>
      <div style={{ position: 'relative' }}>

        {/* Sticky dark background — stays pinned while cards scroll past */}
        <div
          className="sticky top-0 w-full overflow-hidden"
          style={{ height: '100vh', zIndex: 1 }}
        >
          <div
            className="absolute overflow-hidden"
            style={{
              inset: '0 clamp(1.5rem,6vw,6rem)',
              borderRadius: '24px',
            }}
          >
            <div className="absolute inset-0">
              <Image src="/spiral-lines-gold.jpg" alt="" fill className="object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(26,26,30,0.82) 0%, rgba(26,26,30,0.65) 50%, rgba(26,26,30,0.75) 100%)' }} />
            </div>
            <Grain id="scrollGrain" opacity={0.03} />

            {/* Heading — bottom-left of the sticky container */}
            <div className="absolute bottom-10 left-10 lg:left-14 z-20 max-w-[45%]">
              <p className="text-[12px] uppercase tracking-[0.2em] font-semibold mb-5" style={{ color: P.goldLight }}>
                Our approach
              </p>
              <h2
                className="leading-[1.08] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)', fontWeight: 300, color: P.textOnDark }}
              >
                What makes Trinade<br />
                different — and why<br />
                it matters
              </h2>
            </div>
          </div>
        </div>

        {/* Cards column — overlaps the sticky container via negative margin */}
        <div
          style={{
            marginTop: '-100vh',
            paddingLeft: '52%',
            paddingRight: 'clamp(2.5rem,7vw,7rem)',
            paddingTop: '18vh',
            paddingBottom: '4vh',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div className="flex flex-col gap-5">
            {scrollCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.03, ease: EASE_OUT }}
                className="group rounded-2xl p-9 relative overflow-hidden transition-all duration-500 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] hover:-translate-y-1"
                style={{
                  background: 'rgba(255,255,255,0.97)',
                  border: '1px solid rgba(229,224,216,0.6)',
                }}
              >
                {/* IT Solutions-inspired gold gradient accent wash at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 pointer-events-none transition-opacity duration-700"
                  style={{
                    height: '45%',
                    background: `linear-gradient(to bottom, transparent 0%, rgba(201,168,110,0.04) 30%, rgba(201,168,110,0.10) 70%, rgba(212,187,138,0.18) 100%)`,
                    borderRadius: '0 0 16px 16px',
                  }}
                />
                {/* Stronger gold wash on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    height: '50%',
                    background: `linear-gradient(to bottom, transparent 0%, rgba(201,168,110,0.08) 30%, rgba(201,168,110,0.18) 70%, rgba(212,187,138,0.28) 100%)`,
                    borderRadius: '0 0 16px 16px',
                  }}
                />

                {/* Gold bottom border line — always visible subtle, stronger on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${P.gold}44 20%, ${P.goldLight}66 50%, ${P.gold}44 80%, transparent 100%)`,
                    opacity: 0.5,
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: `linear-gradient(90deg, ${P.gold}, ${P.goldLight})` }}
                />

                <h3 className="text-[22px] font-medium tracking-[-0.015em] mb-3 relative z-10" style={{ color: P.textDark }}>
                  {card.title}
                </h3>
                <p className="text-[15px] leading-[1.75] mb-5 relative z-10" style={{ color: P.textMuted }}>
                  {card.body}
                </p>

                {/* Learn more — always visible like IT Solutions, emphasized on hover */}
                <div className="relative z-10 flex items-center gap-1.5 transition-all duration-300">
                  <span className="text-[13px] font-medium transition-colors duration-300" style={{ color: `${P.gold}99` }}>Learn more</span>
                  <svg className="w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 16 16" stroke={P.gold} strokeWidth="1.5" style={{ opacity: 0.6 }}>
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════
// CHALLENGES — Testimonial/Social Proof Carousel
// Editorial layout: domain name left + quote right, vertical divider
// ═══════════════════════════════════════════════════════════
function ChallengesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [activeIndex, setActiveIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total = challengeTestimonials.length

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % total)
    }, 6000)
  }, [total])

  useEffect(() => {
    resetTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [resetTimer])

  const goUp = () => {
    setActiveIndex(prev => (prev - 1 + total) % total)
    resetTimer()
  }
  const goDown = () => {
    setActiveIndex(prev => (prev + 1) % total)
    resetTimer()
  }

  const current = challengeTestimonials[activeIndex]

  return (
    <section ref={ref} className="relative py-32 lg:py-40 overflow-hidden" style={{ background: P.cream }}>
      <Grain id="challengesGrain" opacity={0.025} />

      <div className="relative z-10 px-[clamp(2rem,8vw,8rem)]">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-[12px] uppercase tracking-[0.2em] font-semibold mb-16"
          style={{ color: P.gold }}
        >
          Challenges we solve
        </motion.p>

        {/* Main layout: left column + vertical line + right column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
          className="flex flex-col lg:flex-row relative"
          style={{ minHeight: '340px' }}
        >
          {/* LEFT COLUMN — ~35% */}
          <div className="lg:w-[35%] flex flex-col justify-between pb-8 lg:pb-0 lg:pr-12 relative">
            {/* Thin vertical line — runs full height on left edge */}
            <div
              className="absolute top-0 bottom-0 left-0 w-[1px] hidden lg:block"
              style={{ background: `linear-gradient(180deg, ${P.gold}33, ${P.creamDark}44, ${P.gold}33)` }}
            />

            <div className="lg:pl-10">
              {/* Domain name — large bold */}
              <AnimatePresence mode="wait">
                <motion.h3
                  key={current.domain}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  className="tracking-[-0.02em] leading-[1.1]"
                  style={{
                    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                    fontWeight: 700,
                    color: P.charcoal,
                  }}
                >
                  {current.domain}
                </motion.h3>
              </AnimatePresence>

              {/* Tags */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`tags-${activeIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex flex-wrap gap-2 mt-5"
                >
                  {current.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.06em]"
                      style={{
                        background: 'rgba(201,168,110,0.1)',
                        color: P.goldDark,
                        border: '1px solid rgba(201,168,110,0.2)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Up/Down nav buttons */}
              <div className="flex items-center gap-3 mt-10">
                <button
                  onClick={goUp}
                  className="w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 hover:border-[#c9a86e] hover:bg-[rgba(201,168,110,0.06)] cursor-pointer"
                  style={{ borderColor: `${P.charcoal}22` }}
                  aria-label="Previous challenge"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={P.charcoal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 12V2M3 6l4-4 4 4" />
                  </svg>
                </button>
                <button
                  onClick={goDown}
                  className="w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 hover:border-[#c9a86e] hover:bg-[rgba(201,168,110,0.06)] cursor-pointer"
                  style={{ borderColor: `${P.charcoal}22` }}
                  aria-label="Next challenge"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={P.charcoal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 2v10M3 8l4 4 4-4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Counter + attribution at bottom */}
            <div className="lg:pl-10 mt-10 lg:mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`meta-${activeIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p
                    className="text-[13px] font-semibold tracking-[0.08em] uppercase"
                    style={{ color: P.charcoal }}
                  >
                    {String(activeIndex + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
                  </p>
                  <p
                    className="text-[13px] tracking-[0.06em] uppercase mt-1.5"
                    style={{ color: P.textMuted }}
                  >
                    {current.attribution}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* VERTICAL DIVIDER — between columns */}
          <div
            className="hidden lg:block w-[1px] mx-0 self-stretch"
            style={{ background: `${P.charcoal}15` }}
          />

          {/* RIGHT COLUMN — ~65% */}
          <div className="lg:w-[65%] lg:pl-16 flex items-center">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.domain}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="leading-[1.4] tracking-[-0.01em]"
                style={{
                  fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
                  fontWeight: 300,
                  color: `${P.charcoal}e6`,
                }}
              >
                {current.quote}
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


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
          What we do — end to end,<br />from strategy to scale
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
                <h3 className="text-[22px] font-medium tracking-[-0.01em] transition-colors duration-300"
                  style={{ color: expanded === i ? P.textDark : P.textMuted }}>
                  {s.title}
                </h3>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shrink-0"
                  style={{
                    background: expanded === i
                      ? 'linear-gradient(165deg, rgba(185,155,100,0.55) 0%, rgba(165,125,60,0.42) 40%, rgba(200,175,125,0.50) 100%)'
                      : 'linear-gradient(165deg, rgba(185,155,100,0.25) 0%, rgba(165,125,60,0.18) 40%, rgba(200,175,125,0.22) 100%)',
                    backdropFilter: 'blur(12px) saturate(1.4)',
                    WebkitBackdropFilter: 'blur(12px) saturate(1.4)',
                    border: expanded === i ? '1px solid rgba(180,150,95,0.4)' : '1px solid rgba(180,150,95,0.2)',
                    boxShadow: expanded === i
                      ? 'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(130,95,30,0.12), 0 2px 10px rgba(130,95,30,0.2)'
                      : 'inset 0 1px 0 rgba(255,255,255,0.1), 0 1px 4px rgba(130,95,30,0.1)',
                    transform: expanded === i ? 'rotate(45deg)' : 'rotate(0)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={expanded === i ? '#2a2218' : 'rgba(42,34,24,0.5)'} strokeWidth="1.5">
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
                      <p className="text-[16px] leading-[1.8] mb-6 max-w-[700px]" style={{ color: P.textMuted }}>
                        {s.body}
                      </p>
                      <p className="text-[12px] uppercase tracking-[0.12em] mb-3" style={{ color: P.textDimmed }}>
                        Core Capabilities
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {s.areas.map(area => (
                          <span key={area} className="px-4 py-1.5 rounded-full text-[13px] font-medium"
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
// DIFFERENTIATORS — Process + People
// ═══════════════════════════════════════════════════════════
function DifferentiatorsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative py-32 overflow-hidden" style={{ background: P.cream }}>
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Image src="/gradient-mesh-warm.jpg" alt="" fill className="object-cover" />
      </div>

      <div className="relative z-10 px-[clamp(2rem,8vw,8rem)]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="leading-[1.1] tracking-[-0.025em] mb-16"
          style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 400, color: P.textDark }}
        >
          What sets us apart
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1000px]">
          {differentiators.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: EASE }}
              className="rounded-2xl p-10"
              style={{ background: P.creamMid, border: `1px solid ${P.creamDark}` }}
            >
              <p className="text-[12px] uppercase tracking-[0.15em] font-semibold mb-4" style={{ color: P.gold }}>
                {d.label}
              </p>
              <p className="text-[17px] leading-[1.75]" style={{ color: P.textMuted }}>
                {d.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════
// CTA — spiral-lines-gold.jpg background
// ═══════════════════════════════════════════════════════════
function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative py-32" style={{ background: P.cream }}>
      <div className="px-[clamp(2rem,8vw,8rem)]">
        <div className="relative rounded-[28px] overflow-hidden py-28 px-12 lg:px-24" data-dark-section>
          {/* spiral-lines-gold background */}
          <div className="absolute inset-0">
            <Image src="/spiral-lines-gold.jpg" alt="" fill className="object-cover" />
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
              Ready to transform your<br />IT infrastructure?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="text-[16px] leading-[1.9] mb-12"
              style={{ color: P.textOnDarkMuted }}
            >
              Let&apos;s discuss how our solutions can strengthen your security, streamline operations, and accelerate growth.
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
                Start a conversation
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="/contact"
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-[14px] font-medium transition-all duration-300 hover:bg-white/[0.1]"
                style={{ color: P.textOnDarkMuted, border: '1px solid rgba(255,255,255,0.15)' }}>
                See case studies
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
      <MissionSection />
      <ScrollCardsSection />
      <IndustriesSection />
      <ChallengesSection />
      <AccordionSection />
      <DifferentiatorsSection />
      <CTASection />
      <SolutionsFooter />
    </main>
  )
}
