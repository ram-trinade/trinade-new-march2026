'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
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
  { name: 'Healthcare', desc: 'Patient records scattered across incompatible systems. Compliance audits that consume entire quarters. We unify clinical data, automate HIPAA workflows, and give care teams the tools to focus on medicine.' },
  { name: 'Legal', desc: 'Discovery timelines are shrinking while document volumes multiply. Our secure infrastructure and intelligent search platforms help firms move faster without compromising privilege or confidentiality.' },
  { name: 'Financial Services', desc: 'Fraud patterns shift daily. Regulatory frameworks overlap. We build security architectures and compliance engines that keep pace with both, so your teams can focus on the business of finance.' },
  { name: 'Manufacturing', desc: 'Downtime on a production line costs more per hour than most annual IT budgets. We deliver predictive monitoring, connected factory systems, and supply chain visibility that keeps operations running.' },
  { name: 'Logistics', desc: 'When shipment data arrives 48 hours late, decisions are already wrong. We build real-time tracking, demand sensing, and route intelligence that close the gap between what happened and what\u2019s happening now.' },
  { name: 'Retail', desc: 'Inventory blind spots, fragmented customer data, and seasonal demand spikes that overwhelm legacy systems. We build the infrastructure that turns every transaction into insight and every insight into action.' },
]


const challengeTestimonials = [
  {
    domain: 'Enterprise',
    quote: '\u201CWe were managing nine separate vendor relationships for infrastructure alone. Nothing talked to anything else. Trinade consolidated the entire stack in four months \u2014 and our teams didn\u2019t miss a single day of uptime.\u201D',
    attribution: 'VP of Infrastructure, Global Industrial Conglomerate',
    tags: ['Systems Integration', 'Managed IT'],
  },
  {
    domain: 'FinTech',
    quote: '\u201CEvery new regulation meant six weeks of manual remediation. We brought Trinade in to build an automated compliance layer, and our last three audits closed without a single finding.\u201D',
    attribution: 'Chief Risk Officer, Digital Payments Platform',
    tags: ['Compliance Automation', 'Cloud Architecture'],
  },
  {
    domain: 'Healthcare',
    quote: '\u201CAfter two acquisitions, our clinicians were logging into five different systems to see one patient\u2019s history. Trinade unified everything behind a single pane of glass without disrupting a single clinical workflow.\u201D',
    attribution: 'CIO, Multi-State Hospital Network',
    tags: ['Data Unification', 'Legacy Modernization'],
  },
  {
    domain: 'Logistics',
    quote: '\u201COur forecasting was based on spreadsheets and gut instinct. Trinade built a demand sensing platform that cut our inventory carrying costs by 23% in the first quarter alone.\u201D',
    attribution: 'COO, Asia-Pacific Freight & Distribution',
    tags: ['Predictive Analytics', 'Supply Chain Intelligence'],
  },
  {
    domain: 'Legal',
    quote: '\u201CWe were spending more on IT firefighting than on strategic technology. Trinade gave us a three-year roadmap, migrated us to the cloud, and our per-attorney IT cost dropped by a third.\u201D',
    attribution: 'Managing Partner, 200-Attorney National Firm',
    tags: ['IT Strategy', 'Cloud Migration'],
  },
]

const services = [
  {
    title: 'Cybersecurity & Compliance',
    body: 'Security is not a product you install \u2014 it\u2019s a posture you maintain. We architect layered defenses, run continuous threat monitoring, and keep your compliance certifications current so your business stays protected and your auditors stay satisfied.',
    areas: ['Threat Detection & Response', 'HIPAA / SOC2 / GDPR Compliance', 'Virtual CISO Services', 'Penetration Testing & Risk Audits', 'Disaster Recovery Planning'],
  },
  {
    title: 'Cloud Services',
    body: 'Whether you\u2019re migrating a legacy application or orchestrating workloads across three providers, we design cloud environments that perform under pressure. Cost-optimized, auto-scaling, and built to survive the traffic spike you didn\u2019t plan for.',
    areas: ['Multi-Cloud & Hybrid Architecture', 'Cloud Migration & Modernization', 'Cost Optimization & FinOps', 'Auto-Scaling Infrastructure', 'Infrastructure as Code'],
  },
  {
    title: 'Managed IT',
    body: 'Your internal team handles strategy. We handle everything else. Round-the-clock monitoring, helpdesk resolution, network health, and vendor coordination \u2014 all delivered under SLAs that hold us accountable, not just available.',
    areas: ['24/7 Infrastructure Monitoring', 'Tiered Helpdesk Support', 'Network & Endpoint Management', 'Vendor Coordination', 'Co-Managed IT Partnerships'],
  },
  {
    title: 'AI & Data Intelligence',
    body: 'Most companies are sitting on data they\u2019ve never fully used. We build the models, pipelines, and interfaces that turn dormant information into operational intelligence \u2014 from demand forecasting to anomaly detection to natural language search across your own documents.',
    areas: ['Predictive & Prescriptive Analytics', 'Natural Language Processing', 'Computer Vision Systems', 'Anomaly & Fraud Detection', 'Custom ML Model Development'],
  },
  {
    title: 'Strategic Consulting',
    body: 'Technology decisions compound. A wrong architecture choice today becomes a million-dollar migration three years from now. We help leadership teams build IT roadmaps grounded in business reality, with clear milestones and honest cost projections.',
    areas: ['IT Roadmap & Architecture Review', 'Digital Transformation Strategy', 'Organizational Change Management', 'Technology Due Diligence', 'Executive Decision Workshops'],
  },
  {
    title: 'Professional Services',
    body: 'When you need experienced engineers embedded in a project \u2014 not a pitch deck, but actual delivery \u2014 our professional services teams step in. System integrations, custom builds, and training programs that transfer knowledge, not just deliverables.',
    areas: ['Enterprise System Integration', 'Custom Application Development', 'Technical Project Management', 'Staff Augmentation & Advisory', 'Training & Knowledge Transfer'],
  },
]

const differentiators = [
  {
    label: 'Process',
    desc: 'Documented frameworks, measurable SLAs, and structured escalation paths \u2014 not because process is exciting, but because it\u2019s the only thing that scales. Every engagement follows the same disciplined methodology, whether it\u2019s a two-week audit or a two-year transformation.',
  },
  {
    label: 'People',
    desc: 'Senior engineers who\u2019ve built and broken production systems. Security architects who\u2019ve closed real breaches. Consultants who\u2019ve sat in boardrooms and translated technical risk into business language. We assign people with tenure, not trainees with checklists.',
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
            We architect the systems{' '}
            <span className="inline-block align-middle mx-2 rounded-full overflow-hidden" style={{ width: 'clamp(80px, 9vw, 120px)', height: 'clamp(44px, 5vw, 68px)' }}>
              <Image src="/spiral-card.jpg" alt="" width={120} height={68} className="w-full h-full object-cover" />
            </span>{' '}
            that enterprises depend on — security, cloud, infrastructure,{' '}
            <span className="inline-block align-middle mx-2 rounded-full overflow-hidden" style={{ width: 'clamp(80px, 9vw, 120px)', height: 'clamp(44px, 5vw, 68px)' }}>
              <Image src="/spiral-motion.jpg" alt="" width={120} height={68} className="w-full h-full object-cover" />
            </span>
            {' '}and intelligence — built precisely for how your business{' '}
            <span className="inline-block align-middle mx-2 rounded-full overflow-hidden" style={{ width: 'clamp(80px, 9vw, 120px)', height: 'clamp(44px, 5vw, 68px)' }}>
              <Image src="/spiral-rotated.jpg" alt="" width={120} height={68} className="w-full h-full object-cover" />
            </span>{' '}
            actually operates.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          className="mt-16"
        >
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
          Trinade exists to close the gap between where your technology is and where your business needs it to be. We secure what matters, modernize what holds you back, and build the infrastructure that lets your teams move with confidence and speed.
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
              Deep expertise where it counts most.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="text-[16px] leading-[1.7] mt-4 max-w-[500px]"
              style={{ color: P.textMuted }}
            >
              We don&apos;t retrofit generic platforms. We build solutions shaped by the regulations, workflows, and operational realities of your sector.
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
    <section ref={ref} className="relative py-32 lg:py-40 overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Spiral lines background */}
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/spiral-lines-gold.jpg" alt="" fill className="object-cover" style={{ opacity: 0.12 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.15) 50%, rgba(10,10,10,0.5) 100%)' }} />
      </div>
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
          What our clients say
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
              style={{ background: `linear-gradient(180deg, ${P.gold}33, rgba(255,255,255,0.06), ${P.gold}33)` }}
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
                    color: P.textOnDark,
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
                        background: 'rgba(201,168,110,0.12)',
                        color: P.goldLight,
                        border: '1px solid rgba(201,168,110,0.25)',
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
                  className="w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 hover:border-[#c9a86e] hover:bg-[rgba(201,168,110,0.12)] cursor-pointer"
                  style={{ borderColor: 'rgba(255,255,255,0.15)' }}
                  aria-label="Previous challenge"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="rgba(240,237,232,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 12V2M3 6l4-4 4 4" />
                  </svg>
                </button>
                <button
                  onClick={goDown}
                  className="w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 hover:border-[#c9a86e] hover:bg-[rgba(201,168,110,0.12)] cursor-pointer"
                  style={{ borderColor: 'rgba(255,255,255,0.15)' }}
                  aria-label="Next challenge"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="rgba(240,237,232,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
                    style={{ color: P.textOnDark }}
                  >
                    {String(activeIndex + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
                  </p>
                  <p
                    className="text-[13px] tracking-[0.06em] uppercase mt-1.5"
                    style={{ color: P.textOnDarkMuted }}
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
            style={{ background: 'rgba(255,255,255,0.08)' }}
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
                  color: 'rgba(240,237,232,0.88)',
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
          Six disciplines, one partner.<br />From assessment to operation.
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
              The right conversation<br />starts here.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="text-[16px] leading-[1.9] mb-12"
              style={{ color: P.textOnDarkMuted }}
            >
              Tell us what&apos;s keeping you up at night. We&apos;ll tell you exactly how we&apos;d fix it — no pitch deck, no discovery phase, just a direct technical conversation.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="flex items-center justify-center gap-4 flex-wrap"
            >
              <Link href="/contact"
                className="group inline-flex items-center gap-3 px-9 py-4 rounded-full text-[14px] font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(201,168,110,0.3)]"
                style={{ background: P.gold, color: P.charcoal }}>
                Start a conversation
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-[14px] font-medium transition-all duration-300 hover:bg-white/[0.1]"
                style={{ color: P.textOnDarkMuted, border: '1px solid rgba(255,255,255,0.15)' }}>
                See case studies
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
export default function SolutionsContent() {
  return (
    <main>
      <HeroSection />
      <MissionSection />
      <IndustriesSection />
      <ChallengesSection />
      <AccordionSection />
      <CTASection />
      <SolutionsFooter />
    </main>
  )
}
