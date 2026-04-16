'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

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
    title: 'Infrastructure That Cannot Keep Pace',
    tags: ['Cloud Migration', 'Capacity Planning', 'Performance Engineering'],
  },
  {
    title: 'Siloed Data Across Dozens of Platforms',
    tags: ['Unified Architecture', 'API Orchestration', 'Real-Time Sync'],
  },
  {
    title: 'Security Posture Falling Behind Threats',
    tags: ['Zero-Trust Design', 'Incident Response', 'Compliance Automation'],
  },
  {
    title: 'Vendor Sprawl Draining Budgets',
    tags: ['Platform Consolidation', 'License Optimization', 'Managed Operations'],
  },
  {
    title: 'Digital Initiatives Stalling at Scale',
    tags: ['Delivery Acceleration', 'Change Management', 'Outcome Measurement'],
  },
]

const values = [
  {
    number: 'V / 01',
    title: 'Understand before we act',
    description: 'We start with your business, not our toolset. Through structured workshops and technical audits, we map your operations, surface friction, and identify where technology will deliver the highest return.',
    icon: 'search',
  },
  {
    number: 'V / 02',
    title: 'Design with intent',
    description: 'Architecture is a commitment. We draft systems that account for where you are today and where you need to be in three years — built for resilience, security, and graceful scale.',
    icon: 'grid',
  },
  {
    number: 'V / 03',
    title: 'Engineer without compromise',
    description: 'Every line of code ships through automated testing, peer review, and continuous integration. We treat production-readiness as the baseline, not the finish line.',
    icon: 'code',
  },
  {
    number: 'V / 04',
    title: 'Sustain and sharpen over time.',
    description: 'Delivery is only the midpoint. We monitor performance, tighten security posture, and refine your systems quarter over quarter — so your technology compounds in value, not in technical debt.',
    icon: 'evolve',
  },
]

const scrollCards = [
  { title: 'Cybersecurity & Compliance.', body: 'Threat landscapes shift daily. We build layered defenses — from zero-trust networks to real-time monitoring — and maintain the compliance frameworks that keep regulators satisfied and breaches contained.' },
  { title: 'Cloud Infrastructure.', body: 'We architect multi-cloud and hybrid environments tuned for your workload profile. Migration, orchestration, and cost governance — handled end to end, with no performance trade-offs.' },
  { title: 'Managed IT Services.', body: 'Round-the-clock monitoring, proactive maintenance, and a single point of accountability for your entire technology estate. Your team focuses on the business; we keep the systems running.' },
  { title: 'AI & Data Intelligence.', body: 'We embed machine learning, predictive models, and intelligent automation into your existing workflows — turning operational data into decisions that move faster than intuition alone.' },
  { title: 'Strategic Consulting.', body: 'Technology without direction is just overhead. We align IT roadmaps to business objectives, model investment scenarios, and sequence initiatives so every dollar deployed earns its place.' },
  { title: 'Professional Services.', body: 'Dedicated engineering teams for high-stakes builds — custom platforms, system integrations, and enterprise migrations delivered on timeline, on budget, and with full knowledge transfer.' },
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
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden"
      style={{
        background: P.cream,
        minHeight: 'var(--hero-min-h)',
      }}
    >
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none">
        <Image src="/gradient-orbs-warm.jpg" alt="" fill className="object-cover" priority />
      </div>
      <Grain id="homeHeroGrain" opacity={0.02} />

      <div
        className="relative z-10 w-full shrink-0"
        style={{
          paddingLeft: 'var(--spacing-gutter)',
          paddingRight: 'var(--spacing-gutter)',
          paddingTop: 'var(--spacing-rhythm-hero)',
          paddingBottom: 'var(--spacing-fluid-s)',
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: EASE_OUT }}
          className="leading-[1.05] tracking-[-0.03em]"
          style={{ fontSize: 'var(--text-hero-home)', fontWeight: 400, color: P.textDark }}
        >
          Precision-built<br className="hidden sm:inline" />{' '}technology, at scale.
        </motion.h1>
      </div>

      {/* Gradient card below hero — IT Solutions style.
          Fills remaining space in the 100svh section via flex-1.
          Content (text + CTAs) is pinned to the bottom via justify-end,
          leaving the top intentionally void. Mobile (≤640px) gets a
          modest floor so the card doesn't collapse.
          Note: motion.div is flex-col so the inner card can use flex-1
          to fill the motion.div's flex-computed height (h-full doesn't
          work here because the parent has min-height but no height). */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.0, delay: 0.3, ease: EASE_OUT }}
        className="relative z-10 flex-1 min-h-[20rem] flex flex-col"
        style={{
          marginLeft: 'var(--spacing-gutter)',
          marginRight: 'var(--spacing-gutter)',
          marginBottom: 'var(--spacing-fluid-m)',
        }}
      >
        <div
          className="relative overflow-hidden flex-1 flex flex-col"
          style={{ borderRadius: 'var(--radius-fluid-2xl)' }}
        >
          <div className="absolute inset-0">
            <Image src="/gradient-mesh-warm.jpg" alt="" fill className="object-cover" />
          </div>
          <Grain id="heroCardGrain" opacity={0.03} />

          <div
            className="relative z-10 flex-1 flex flex-col justify-end"
            style={{ padding: 'var(--spacing-fluid-xl)' }}
          >
            <p
              className="leading-[1.55] tracking-[-0.01em] max-w-[var(--container-prose)]"
              style={{ fontSize: 'var(--text-card)', fontWeight: 450, color: P.textDark }}
            >
              We design, build, and manage the systems that enterprises depend on — cloud infrastructure, cybersecurity, custom platforms, data intelligence, and the strategic consulting that ties it all together.
            </p>

            <div
              className="flex items-center flex-wrap"
              style={{ gap: 'var(--spacing-fluid-m)', marginTop: 'var(--spacing-fluid-l)' }}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 min-h-[44px] rounded-full text-[14px] font-medium transition-all duration-300 hover:scale-[1.02]"
                style={{ background: P.charcoal, color: P.textOnDark }}
              >
                Book a consultation
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              {/* pl-6 on mobile (when the flex container wraps and View drops
                  to its own row) so "V" aligns with Book's "B" — Book's px-6
                  puts its text 24px in from the button's left edge; matching
                  View's inline-level padding-left makes the two glyphs share
                  the same vertical x-line. md:pl-0 resets on desktop where
                  the buttons sit side-by-side and no indent is needed. */}
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 pl-6 md:pl-0 text-[14px] font-medium transition-opacity duration-300 hover:opacity-60"
                style={{ color: P.textMuted }}
              >
                View our solutions
                <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════
// FLOATING CARDS — AROX/Hatamex inspired hero card grid
// Dark section with staggered slide-in capability cards
// Creating depth through offsets, shadows, and parallax
// ═══════════════════════════════════════════════════════════

const capabilityCards = [
  {
    title: 'Custom Software',
    subtitle: 'Purpose-built platforms shaped around your operations',
    image: '/custom-software.jpeg',
    accent: 'rgba(201,168,110,0.35)',
  },
  {
    title: 'Enterprise Integration',
    subtitle: 'Unified data, connected systems, single source of truth',
    image: '/enterprise-integration.jpeg',
    accent: 'rgba(212,187,138,0.30)',
  },
  {
    title: 'Cloud Infrastructure',
    subtitle: 'Architected for resilience, governed for cost',
    image: '/cloud-infrastructure.jpeg',
    accent: 'rgba(160,128,64,0.25)',
  },
  {
    title: 'Cybersecurity',
    subtitle: 'Layered defense from perimeter to endpoint',
    image: '/cybersecurity.jpeg',
    accent: 'rgba(201,168,110,0.30)',
  },
  {
    title: 'Strategic Consulting',
    subtitle: 'IT roadmaps tied to measurable business outcomes',
    image: '/strategic-consulting.jpeg',
    accent: 'rgba(212,187,138,0.25)',
  },
  {
    title: 'Managed Services',
    subtitle: 'Always-on operations, always accountable',
    image: '/managed-services.jpeg',
    accent: 'rgba(201,168,110,0.20)',
  },
]

// Stagger delays for clean grid entrance
const cardDelays = [0, 0.06, 0.12, 0.04, 0.10, 0.16]

function FloatingCardsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  // Apr 16: mobile carousel + dot pagination (same pattern as Solutions
  // Industries). Desktop keeps the existing 2/3-col grid.
  const capCarouselRef = useRef<HTMLDivElement>(null)
  const [capActiveIndex, setCapActiveIndex] = useState(0)

  const handleCapScroll = () => {
    const el = capCarouselRef.current
    if (!el) return
    const first = el.firstElementChild as HTMLElement | null
    if (!first) return
    const step = first.getBoundingClientRect().width + 16
    const idx = Math.round(el.scrollLeft / step)
    setCapActiveIndex(Math.min(Math.max(0, idx), capabilityCards.length - 1))
  }

  const scrollCapTo = (i: number) => {
    const el = capCarouselRef.current
    if (!el) return
    const first = el.firstElementChild as HTMLElement | null
    if (!first) return
    const step = first.getBoundingClientRect().width + 16
    el.scrollTo({ left: i * step, behavior: 'smooth' })
  }

  // Shared card JSX — rendered inside either the mobile carousel or the
  // desktop grid. Background image now has a `sizes` prop so mobile gets the
  // correct smaller variant (previously Enterprise Integration — a 1440×2160
  // portrait source — was failing to render on some mobile devices because
  // Next.js served a stale placeholder size).
  const renderCard = (card: typeof capabilityCards[0], i: number) => (
    <motion.div
      key={card.title}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: cardDelays[i], ease: EASE_OUT }}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.35, ease: EASE } }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer h-full"
      style={{
        aspectRatio: '4/5',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="absolute inset-0">
        <Image
          src={card.image}
          alt=""
          fill
          sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0" style={{
          background: `linear-gradient(180deg, rgba(10,10,12,0.3) 0%, rgba(10,10,12,0.6) 50%, rgba(10,10,12,0.85) 100%)`,
        }} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[3px] transition-opacity duration-500 opacity-40 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${P.gold}88, transparent)` }} />
      <div className="absolute inset-0 flex flex-col justify-end z-10" style={{ padding: 'var(--spacing-fluid-s)' }}>
        <h3 className="font-medium tracking-[-0.01em] mb-1.5 transition-colors duration-300"
          style={{ color: 'rgba(240,237,232,0.93)', fontSize: 'var(--text-card)' }}>
          {card.title}
        </h3>
        <p className="leading-[1.5] transition-all duration-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-2 md:group-hover:translate-y-0"
          style={{ color: 'rgba(240,237,232,0.5)', fontSize: 'var(--text-caption)' }}>
          {card.subtitle}
        </p>
      </div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 100%, ${card.accent}, transparent 70%)` }} />
    </motion.div>
  )

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      data-dark-section
      style={{
        background: '#0a0a0a',
        paddingTop: 'var(--spacing-rhythm-lg)',
        paddingBottom: 'var(--spacing-rhythm-lg)',
      }}
    >
      <Grain id="floatingGrain" opacity={0.04} />

      {/* Atmospheric gradient orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,110,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-30%] left-[-10%] w-[50vw] h-[50vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,110,0.04) 0%, transparent 70%)' }} />

      <div
        className="relative z-10"
        style={{ paddingLeft: 'var(--spacing-gutter)', paddingRight: 'var(--spacing-gutter)' }}
      >
        {/* Split layout: headline left, cards right */}
        <div
          className="flex flex-col lg:flex-row items-start"
          style={{ gap: 'var(--spacing-fluid-3xl)' }}
        >

          {/* Left: headline + description.
              w-full on mobile so the column doesn't collapse — parent uses
              `items-start` which kills the default `stretch` and lets columns
              shrink to intrinsic width. lg:w-[38%] takes over on desktop. */}
          <div className="w-full lg:w-[38%] lg:sticky shrink-0" style={{ top: 'var(--spacing-rhythm)' }}>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="uppercase tracking-[0.2em] font-semibold"
              style={{ color: P.gold, fontSize: 'var(--text-eyebrow)', marginBottom: 'var(--spacing-fluid-l)' }}
            >
              What we build
            </motion.p>

            {/* max-lg:!text-[3.25rem] bumps mobile+tablet heading size for
                better weight; desktop keeps --text-display fluid token. */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE_OUT }}
              className="leading-[1.08] tracking-[-0.03em] max-lg:!text-[3.25rem]"
              style={{
                fontSize: 'var(--text-display)',
                fontWeight: 300,
                color: P.textOnDark,
                marginBottom: 'var(--spacing-fluid-l)',
              }}
            >
              Where strategy<br />
              becomes<br />
              infrastructure
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="leading-[1.85] max-w-[24rem]"
              style={{ color: P.textOnDarkMuted, fontSize: 'var(--text-body)' }}
            >
              Six disciplines, one integrated practice. We bring the full depth of enterprise IT under a single engagement — so nothing falls between the seams.
            </motion.p>

            {/* Gold rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: EASE_OUT }}
              className="h-[1px] max-w-[12.5rem]"
              style={{
                background: `linear-gradient(90deg, ${P.gold}66, transparent)`,
                transformOrigin: 'left',
                marginTop: 'var(--spacing-fluid-xl)',
              }}
            />
          </div>

          {/* Right column:
              - Mobile (<md): horizontal swipe carousel + dot pagination
              - md+: existing responsive grid (2 cols on md, 3 cols on lg) */}
          <div className="w-full lg:w-[62%]">
            {/* Mobile carousel */}
            <div className="md:hidden">
              <div
                ref={capCarouselRef}
                onScroll={handleCapScroll}
                className="flex items-stretch overflow-x-auto snap-x snap-mandatory pb-2 -mx-[var(--spacing-gutter)] px-[var(--spacing-gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                style={{ gap: '16px' }}
              >
                {capabilityCards.map((card, i) => (
                  <div key={card.title} className="snap-center shrink-0 w-[75vw] max-w-[20rem]">
                    {renderCard(card, i)}
                  </div>
                ))}
              </div>
              <div className="flex justify-center items-center gap-2 mt-5">
                {capabilityCards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollCapTo(i)}
                    aria-label={`Go to capability ${i + 1}`}
                    className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                    style={{
                      width: capActiveIndex === i ? '24px' : '8px',
                      background: capActiveIndex === i ? P.gold : 'rgba(255,255,255,0.18)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* md+ grid (unchanged) */}
            <div
              className="hidden md:grid md:grid-cols-2 lg:grid-cols-3"
              style={{ gap: 'var(--spacing-fluid-s)' }}
            >
              {capabilityCards.map((card, i) => renderCard(card, i))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════
// SCROLL-DRIVEN CARDS — GSAP ScrollTrigger pinned section
// IT Solutions reference: section pins, left headline fixed,
// right cards scroll up via scrub. Gold concentric circles bg.
// ═══════════════════════════════════════════════════════════
function HomeScrollCardsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsWrapperRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)
  // Apr 16: mobile carousel state (same pattern as Industries / What We Build).
  // Only active when isMobile is true; desktop keeps the GSAP pinned layout.
  const appCarouselRef = useRef<HTMLDivElement>(null)
  const [appActiveIndex, setAppActiveIndex] = useState(0)

  // children[0] is a start-spacer, children[1..6] are real cards, children[7]
  // is an end-spacer — so reference children[1] for card width and offset
  // scroll positions by the spacer width.
  const handleAppScroll = () => {
    const el = appCarouselRef.current
    if (!el) return
    const card = el.children[1] as HTMLElement | null
    const spacer = el.children[0] as HTMLElement | null
    if (!card || !spacer) return
    const step = card.getBoundingClientRect().width + 16
    const spacerW = spacer.getBoundingClientRect().width + 16
    const idx = Math.round(Math.max(0, el.scrollLeft - spacerW + step / 2) / step)
    setAppActiveIndex(Math.min(Math.max(0, idx), scrollCards.length - 1))
  }

  const scrollAppTo = (i: number) => {
    const el = appCarouselRef.current
    if (!el) return
    const card = el.children[1] as HTMLElement | null
    const spacer = el.children[0] as HTMLElement | null
    if (!card || !spacer) return
    const step = card.getBoundingClientRect().width + 16
    const spacerW = spacer.getBoundingClientRect().width + 16
    // Scroll so card[i]'s center aligns near viewport center.
    const containerW = el.clientWidth
    const cardCenterOffset = spacerW + i * step + step / 2 - 8  // -8 = gap/2 correction
    el.scrollTo({ left: cardCenterOffset - containerW / 2, behavior: 'smooth' })
  }

  // Initialize isMobile synchronously from matchMedia so the FIRST render
  // already knows whether we're on mobile. Without this, React renders once
  // with isMobile=false (the useState default), GSAP's ScrollTrigger captures
  // that render's inline styles as "original", then when isMobile flips to
  // true the ctx.revert() cleanup restores the stale desktop-height inline
  // styles — leaving section.style.height === "100svh" on mobile and clipping
  // the overflow-hidden cards below the fold.
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(max-width: 1023px)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    // Skip GSAP pin on mobile/tablet — use natural stacked layout instead
    if (isMobile) return
    if (!sectionRef.current || !cardsWrapperRef.current || !rightColRef.current) return

    const cardsWrapper = cardsWrapperRef.current

    const getScrollDistance = () => cardsWrapper.offsetHeight + window.innerHeight * 0.1

    const ctx = gsap.context(() => {
      gsap.to(rightColRef.current, {
        y: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile])

  return (
    // Height is intentionally CSS-only (lg:h-[100svh]) — do NOT put the
    // `height` value into the inline style object. GSAP's ctx.revert()
    // restores React-managed inline styles to their first-render snapshot,
    // which would pin mobile back to the desktop 100svh and clip cards.
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden lg:h-[100svh] lg:min-h-[var(--hero-min-h)]"
      style={{
        background: `linear-gradient(135deg, ${P.cream} 0%, ${P.creamDark} 40%, ${P.creamMid} 100%)`,
      }}
    >
      {/* Spiral lines background image — subtle warm texture */}
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/spiral-light.jpg" alt="" fill className="object-cover" style={{ opacity: 0.09 }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${P.cream}cc 0%, ${P.cream}88 40%, ${P.cream}bb 100%)` }} />
      </div>

      {/* Concentric circles — decorative bg element */}
      <div
        className="absolute pointer-events-none"
        style={{ top: 0, left: '20%', width: '150vw', height: '150vw', maxWidth: 1800, maxHeight: 1800, zIndex: 0 }}
      >
        {[100, 70, 40].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: '20%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${size}%`,
              height: `${size}%`,
              border: `1px solid rgba(201,168,110,${0.22 - i * 0.05})`,
            }}
          />
        ))}
      </div>

      {/* Atmospheric gold orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-15%',
          right: '-5%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(201,168,110,0.1) 0%, transparent 65%)',
        }}
      />

      <Grain id="homeScrollGrain" opacity={0.025} />

      {/* Left: Headline pinned at bottom-left on desktop, normal flow on mobile */}
      <div
        className={isMobile ? 'relative z-20' : 'absolute z-20'}
        style={{
          ...(isMobile
            ? { paddingLeft: 'var(--spacing-gutter)', paddingRight: 'var(--spacing-gutter)', paddingTop: 'var(--spacing-fluid-xl)', paddingBottom: 'var(--spacing-fluid-m)' }
            : { bottom: 'clamp(3.5rem, 10svh, 6.5rem)', left: 0, width: '50%', paddingLeft: 'var(--spacing-gutter)', paddingRight: 'var(--spacing-gutter)' }
          ),
        }}
      >
        <p
          className="uppercase tracking-[0.2em] font-semibold"
          style={{
            color: P.gold,
            fontSize: 'var(--text-eyebrow)',
            marginBottom: 'var(--spacing-fluid-s)',
          }}
        >
          Our approach
        </p>
        {/* max-lg:!text-[2.75rem] on mobile+tablet (reduced from 3.25rem
            — too dominant). Desktop keeps --text-display fluid token. */}
        <h2
          className="leading-[1.02] tracking-[-0.03em] max-lg:!text-[2.75rem]"
          style={{
            fontSize: 'var(--text-display)',
            fontWeight: 500,
            color: P.textDark,
          }}
        >
          Built to perform,<br />
          engineered<br />
          to endure
        </h2>
      </div>

      {/* Mobile branch: horizontal swipe carousel + dot pagination.
          Completely separate from the desktop GSAP pinned layout — no shared
          refs — so the two paths never interact. */}
      {isMobile ? (
        <div className="relative z-10 w-full" style={{ paddingBottom: 'var(--spacing-fluid-l)' }}>
          {/* Edge-fix: spacer divs at start and end of the scroll track create
              a reliable gutter-width visual gap when scrolled to either end.
              The snap-start + scroll-px trick alone wasn't landing consistently
              across browsers because the browser clamped max-scrollLeft before
              the snap position could leave room at the right edge. */}
          <div
            ref={appCarouselRef}
            onScroll={handleAppScroll}
            className="flex items-stretch overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ gap: '16px' }}
          >
            <div aria-hidden className="shrink-0 self-stretch" style={{ width: 'var(--spacing-gutter)' }} />
            {scrollCards.map((card, i) => (
              <div
                key={card.title}
                className="snap-center shrink-0 w-[78vw] max-w-[28rem] h-[22rem] group relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #1a1a1e 0%, #0f0f12 60%, #131318 100%)',
                  padding: 'var(--spacing-fluid-xl)',
                  borderRadius: 'var(--radius-fluid-xl)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div
                  className="absolute pointer-events-none"
                  style={{
                    bottom: '-20%',
                    right: '-10%',
                    width: '70%',
                    height: '70%',
                    background: `radial-gradient(ellipse at center, rgba(201,168,110,${i % 2 === 0 ? '0.15' : '0.12'}) 0%, rgba(201,168,110,0.04) 50%, transparent 80%)`,
                    filter: 'blur(30px)',
                  }}
                />
                <div
                  className="absolute top-[15%] bottom-[15%] left-0 w-[2px]"
                  style={{ background: `linear-gradient(180deg, transparent, ${P.gold}55, transparent)` }}
                />
                <h3
                  className="relative z-10 tracking-[-0.015em]"
                  style={{
                    fontSize: 'var(--text-card-lg)',
                    fontWeight: 500,
                    color: 'rgba(240,237,232,0.93)',
                    marginBottom: 'var(--spacing-fluid-s)',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="relative z-10 leading-[1.7]"
                  style={{ fontSize: 'var(--text-body)', color: 'rgba(240,237,232,0.55)' }}
                >
                  {card.body}
                </p>
              </div>
            ))}
            <div aria-hidden className="shrink-0 self-stretch" style={{ width: 'var(--spacing-gutter)' }} />
          </div>
          <div className="flex justify-center items-center gap-2 mt-5">
            {scrollCards.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollAppTo(i)}
                aria-label={`Go to approach ${i + 1}`}
                className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: appActiveIndex === i ? '24px' : '8px',
                  background: appActiveIndex === i ? P.gold : 'rgba(42,34,24,0.25)',
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Desktop: unchanged GSAP-pinned layout */
        <div
          className="relative flex lg:h-full"
          style={{
            zIndex: 10,
            maxWidth: 'var(--container-hero)',
            margin: '0 auto',
            alignItems: 'flex-start',
          }}
        >
          <div
            ref={rightColRef}
            style={{
              width: '50%',
              marginLeft: '50%',
              paddingTop: '100vh',
              paddingLeft: 'var(--spacing-fluid-m)',
              paddingRight: 'var(--spacing-gutter)',
              paddingBottom: 'var(--spacing-fluid-2xl)',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              ref={cardsWrapperRef}
              className="relative w-full flex flex-col"
              style={{ maxWidth: '37.5rem', gap: 'var(--spacing-fluid-xl)' }}
            >
              {scrollCards.map((card, i) => (
                <div
                  key={card.title}
                  className="group relative overflow-hidden transition-all duration-500 hover:-translate-y-[5px] hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
                  style={{
                    background: 'linear-gradient(135deg, #1a1a1e 0%, #0f0f12 60%, #131318 100%)',
                    padding: 'var(--spacing-fluid-xl)',
                    borderRadius: 'var(--radius-fluid-xl)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    className="absolute pointer-events-none transition-opacity duration-700 opacity-60 group-hover:opacity-100"
                    style={{
                      bottom: '-20%',
                      right: '-10%',
                      width: '70%',
                      height: '70%',
                      background: `radial-gradient(ellipse at center, rgba(201,168,110,${i % 2 === 0 ? '0.15' : '0.12'}) 0%, rgba(201,168,110,0.04) 50%, transparent 80%)`,
                      filter: 'blur(30px)',
                    }}
                  />
                  <div className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay">
                    <svg width="100%" height="100%">
                      <filter id={`cardGrain${i}`}><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" /></filter>
                      <rect width="100%" height="100%" filter={`url(#cardGrain${i})`} />
                    </svg>
                  </div>
                  <div
                    className="absolute top-[15%] bottom-[15%] left-0 w-[2px] transition-all duration-500 group-hover:top-[5%] group-hover:bottom-[5%]"
                    style={{ background: `linear-gradient(180deg, transparent, ${P.gold}55, transparent)` }}
                  />
                  <h3
                    className="relative z-10 tracking-[-0.015em]"
                    style={{
                      fontSize: 'var(--text-card-lg)',
                      fontWeight: 500,
                      color: 'rgba(240,237,232,0.93)',
                      marginBottom: 'var(--spacing-fluid-s)',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="relative z-10 leading-[1.7] max-w-[30rem]"
                    style={{ fontSize: 'var(--text-body)', color: 'rgba(240,237,232,0.45)' }}
                  >
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}


// ═══════════════════════════════════════════════════════════
// WHY CHOOSE US — AROX "Our Values" inspired
// Dark editorial section with numbered accordion items,
// horizontal gold dividers, scroll-triggered expand/collapse
// ═══════════════════════════════════════════════════════════

// Hook: single parent tracks which row is closest to viewport center
// Uses hysteresis (deadband) to prevent rapid toggling at row boundaries
function useClosestToCenter(rowRefs: React.RefObject<(HTMLDivElement | null)[]>) {
  const [activeIndex, setActiveIndex] = useState(0)
  const lastActiveRef = useRef(0)

  useEffect(() => {
    const refs = rowRefs.current
    if (!refs) return

    let ticking = false
    // Reduced from 60 → 20 so cards open/close more responsively near the
    // exact middle, per user request ("strictly while they reach or cross
    // the middle of the screen"). Still non-zero to avoid jitter at boundary.
    const HYSTERESIS = 20 // px deadband — must be this much closer to switch

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        // Trigger exactly at viewport middle (was 0.45 = slightly above).
        // Applies to mobile, tablet, and desktop alike per user request.
        const viewportCenter = window.innerHeight * 0.5
        let closestIdx = 0
        let closestDist = Infinity

        refs.forEach((el, i) => {
          if (!el) return
          const rect = el.getBoundingClientRect()
          const elCenter = rect.top + rect.height / 2
          const dist = Math.abs(elCenter - viewportCenter)
          if (dist < closestDist) {
            closestDist = dist
            closestIdx = i
          }
        })

        // Hysteresis: only switch if new row is significantly closer
        if (closestIdx !== lastActiveRef.current) {
          const currentEl = refs[lastActiveRef.current]
          if (currentEl) {
            const currentRect = currentEl.getBoundingClientRect()
            const currentDist = Math.abs(currentRect.top + currentRect.height / 2 - viewportCenter)
            // Only switch if new is closer by at least HYSTERESIS px
            if (closestDist < currentDist - HYSTERESIS) {
              lastActiveRef.current = closestIdx
              setActiveIndex(closestIdx)
            }
          } else {
            lastActiveRef.current = closestIdx
            setActiveIndex(closestIdx)
          }
        }

        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [rowRefs])

  return activeIndex
}

// Single value row — scroll-driven, parent-controlled active state
function ValueRow({ item, index, isLast, isActive, rowRef }: {
  item: typeof values[0]; index: number; isLast: boolean;
  isActive: boolean; rowRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div ref={rowRef}>
      {/* Top divider line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE_OUT }}
        style={{ height: '1px', transformOrigin: 'left' }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: isActive
              ? `linear-gradient(90deg, ${P.gold}, rgba(201,168,110,0.3))`
              : `linear-gradient(90deg, rgba(201,168,110,0.15), rgba(255,255,255,0.04))`,
            transition: 'background 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </motion.div>

      <div
        className="flex items-start justify-between"
        style={{
          gap: 'var(--spacing-fluid-xl)',
          paddingTop: 'var(--spacing-fluid-xl)',
          paddingBottom: 'var(--spacing-fluid-xl)',
        }}
      >
        {/* Left: Title + Description */}
        <div className="flex-1 min-w-0">
          {/* max-lg:!text-[1.5rem] slightly trims sub-heading size on
              mobile+tablet (was too prominent against the body copy). */}
          <h3
            className="tracking-[-0.02em] leading-[1.15] max-lg:!text-[1.5rem]"
            style={{
              fontSize: 'var(--text-h3)',
              fontWeight: 500,
              color: P.textOnDark,
              opacity: isActive ? 0.95 : 0.35,
              transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
              willChange: 'opacity',
            }}
          >
            {item.title}
          </h3>

          {/* Description — CSS grid-template-rows for smooth height */}
          <div
            style={{
              display: 'grid',
              gridTemplateRows: isActive ? '1fr' : '0fr',
              transition: 'grid-template-rows 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <div style={{ overflow: 'hidden' }}>
              {/* max-lg:!text-[0.9rem] shrinks body copy on mobile+tablet
                  so the card reads tighter there; desktop keeps --text-lead. */}
              <p
                className="leading-[1.75] max-w-[35rem] max-lg:!text-[0.9rem]"
                style={{
                  color: P.textOnDarkMuted,
                  paddingTop: 'var(--spacing-fluid-s)',
                  fontSize: 'var(--text-lead)',
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: isActive ? '0.2s' : '0s',
                }}
              >
                {item.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Large number */}
        <span
          className="hidden lg:block shrink-0 tabular-nums leading-none"
          style={{
            fontSize: 'var(--text-hero)',
            fontWeight: 200,
            color: P.gold,
            letterSpacing: '-0.04em',
            opacity: isActive ? 0.35 : 0.08,
            transform: isActive ? 'translateY(0) scale(1)' : 'translateY(4px) scale(0.98)',
            transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
            willChange: 'opacity, transform',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Bottom divider for last item */}
      {isLast && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE_OUT }}
          style={{
            height: '1px',
            background: 'rgba(201,168,110,0.15)',
            transformOrigin: 'left',
          }}
        />
      )}
    </div>
  )
}

function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const activeIndex = useClosestToCenter(rowRefs)

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      data-dark-section
      style={{ background: '#0a0a0a' }}
    >
      <Grain id="valuesGrain" opacity={0.04} />

      <div
        className="relative z-10"
        style={{
          paddingLeft: 'var(--spacing-gutter)',
          paddingRight: 'var(--spacing-gutter)',
          paddingTop: 'var(--spacing-rhythm-lg)',
          paddingBottom: 'var(--spacing-rhythm)',
        }}
      >
        {/* Section heading.
            max-md:!mb-16 adds 64px bottom gap on phones only (<768px) so
            the heading isn't cramped against the first ValueRow's rule.
            max-lg:!text-[3.25rem] bumps mobile+tablet heading size (Apr 16 —
            the fluid token felt too small for the section weight at those
            viewports). Desktop keeps --text-display via inline style. */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="leading-[1.05] tracking-[-0.03em] max-md:!mb-16 max-lg:!text-[2.5rem]"
          style={{
            fontSize: 'var(--text-display)',
            fontWeight: 300,
            color: P.textOnDark,
            marginBottom: 'var(--spacing-fluid-3xl)',
          }}
        >
          How We Work
        </motion.h2>

        {/* Value rows — scroll-driven, single source of truth */}
        {values.map((item, i) => (
          <ValueRow
            key={item.number}
            item={item}
            index={i}
            isLast={i === values.length - 1}
            isActive={activeIndex === i}
            rowRef={(el) => { rowRefs.current[i] = el }}
          />
        ))}
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
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: P.cream,
        paddingTop: 'var(--spacing-rhythm-lg)',
        paddingBottom: 'var(--spacing-rhythm-lg)',
      }}
    >
      <Grain id="challengesGrain" opacity={0.02} />

      <div
        className="relative z-10"
        style={{ paddingLeft: 'var(--spacing-gutter)', paddingRight: 'var(--spacing-gutter)' }}
      >
        {/* Full-width heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="max-w-[56.25rem]"
          style={{ marginBottom: 'var(--spacing-fluid-3xl)' }}
        >
          <h2
            className="leading-[1.15] tracking-[-0.025em]"
            style={{ fontSize: 'var(--text-h2)', fontWeight: 500 }}
          >
            <span style={{ color: P.textDark }}>The problems that stall growth </span>
            <span style={{ color: P.textMuted }}>
              are rarely about a single system. They are about the compounding weight of decisions deferred — and we solve them methodically.
            </span>
          </h2>
        </motion.div>

        {/* 2-column grid of challenges */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ columnGap: 'var(--spacing-fluid-xl)' }}
        >
          {challenges.map((ch, i) => (
            <motion.div
              key={ch.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
              className="flex"
              style={{
                borderBottom: `1px solid ${P.creamDark}`,
                paddingTop: 'var(--spacing-fluid-l)',
                paddingBottom: 'var(--spacing-fluid-l)',
                gap: 'var(--spacing-fluid-m)',
              }}
            >
              <span
                className="font-extralight leading-none tracking-[-0.04em] shrink-0 tabular-nums"
                style={{
                  color: P.gold,
                  opacity: 0.5,
                  fontSize: 'var(--text-h2)',
                  minWidth: '3.5rem',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3
                  className="font-medium tracking-[-0.01em]"
                  style={{
                    color: P.textDark,
                    fontSize: 'var(--text-card)',
                    marginBottom: 'var(--spacing-fluid-s)',
                  }}
                >
                  {ch.title}
                </h3>
                <div className="flex flex-wrap" style={{ gap: 'var(--spacing-fluid-2xs)' }}>
                  {ch.tags.map(tag => (
                    <span
                      key={tag}
                      className="rounded-full font-medium"
                      style={{
                        color: P.textMuted,
                        border: `1px solid ${P.creamDark}`,
                        fontSize: 'var(--text-caption)',
                        padding: '0.375rem 1rem',
                      }}
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


// ═══════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════
export default function HomepageContent() {
  return (
    <main>
      <HomeHeroSection />
      <FloatingCardsSection />
      <HomeScrollCardsSection />
      <WhyChooseUsSection />
      <ChallengesSection />

    </main>
  )
}
