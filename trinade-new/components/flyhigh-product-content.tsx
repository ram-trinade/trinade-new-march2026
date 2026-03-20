'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import Image from 'next/image'

// ═══════════════════════════════════════════════════════════
// FLY HIGH — CINEMATIC PRODUCT PAGE
// Dark-dominant, gold accents, scroll-driven storytelling
// Awwwards-quality: bold typography, atmospheric depth, motion
// ═══════════════════════════════════════════════════════════

const EASE_CINE = [0.16, 1, 0.3, 1] as const
const EASE_UI = [0.32, 0.72, 0, 1] as const

// ─── Grain overlay ───
function GrainOverlay({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
      }}
    />
  )
}

// ─── Gold rule divider ───
function GoldRule() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <div ref={ref} className="flex justify-center py-2">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: EASE_CINE }}
        style={{
          width: '120px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #c9a86e, transparent)',
          transformOrigin: 'center',
        }}
      />
    </div>
  )
}

// ─── Section wrapper ───
function Section({ children, dark = true, className = '', id }: { children: React.ReactNode; dark?: boolean; className?: string; id?: string }) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden ${className}`}
      style={{ background: dark ? '#0a0a0a' : '#f2ede6' }}
      data-dark-section={dark ? '' : undefined}
    >
      <GrainOverlay opacity={dark ? 0.035 : 0.025} />
      {children}
    </section>
  )
}

// ─── Eyebrow label ───
function Eyebrow({ children, light = true }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className="inline-block text-[12px] font-semibold uppercase tracking-[0.2em]"
      style={{ color: light ? '#c9a86e' : 'rgba(42,34,24,0.45)' }}
    >
      {children}
    </span>
  )
}

// ─── Animated section heading ───
function AnimatedHeading({ children, className = '', light = true }: { children: string; className?: string; light?: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const words = children.split(' ')
  return (
    <h2
      ref={ref}
      className={`font-light tracking-[-0.03em] ${className}`}
      style={{
        fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)',
        lineHeight: 1.1,
        color: light ? 'rgba(255,255,255,0.93)' : '#2a2218',
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: i * 0.06, ease: EASE_CINE }}
        >
          {word}
        </motion.span>
      ))}
    </h2>
  )
}

// ═══════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <Section dark className="min-h-screen flex flex-col justify-center relative">
      {/* Atmospheric background */}
      <div className="absolute inset-0">
        {/* Top-right warm orb */}
        <div
          className="absolute"
          style={{
            top: '-10%', right: '-5%',
            width: '60vw', height: '60vw',
            background: 'radial-gradient(ellipse at center, rgba(201,168,110,0.12) 0%, rgba(201,168,110,0.04) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Bottom-left deep orb */}
        <div
          className="absolute"
          style={{
            bottom: '-15%', left: '-10%',
            width: '50vw', height: '50vw',
            background: 'radial-gradient(ellipse at center, rgba(160,129,74,0.08) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Horizontal gold line accent */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 2, delay: 0.8, ease: EASE_CINE }}
          className="absolute"
          style={{
            top: '50%', left: 0, right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent 5%, rgba(201,168,110,0.15) 30%, rgba(201,168,110,0.08) 70%, transparent 95%)',
            transformOrigin: 'left',
          }}
        />
      </div>

      <div ref={ref} className="relative z-10 px-8 md:px-16 lg:px-24 pt-32 pb-24">
        {/* Product badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE_CINE }}
          className="mb-8"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold uppercase tracking-[0.15em]"
            style={{
              background: 'rgba(201,168,110,0.08)',
              border: '1px solid rgba(201,168,110,0.2)',
              color: '#c9a86e',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c9a86e', opacity: 0.7 }} />
            Trinade Product
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: EASE_CINE }}
          className="font-light tracking-[-0.04em] mb-6"
          style={{
            fontSize: 'clamp(3.5rem, 8vw, 8rem)',
            lineHeight: 0.95,
            color: 'rgba(255,255,255,0.95)',
          }}
        >
          Fly<br />
          <span style={{ color: '#c9a86e' }}>High</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE_CINE }}
          className="max-w-xl mb-4"
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            lineHeight: 1.5,
            color: 'rgba(255,255,255,0.55)',
            fontWeight: 300,
          }}
        >
          Where intelligence is shared.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.85, ease: EASE_CINE }}
          className="max-w-lg mb-12"
          style={{
            fontSize: '15px',
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          A platform connecting people with verified experts for real-time guidance —
          through chat, voice, or video. Clearer decisions. Faster progress.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1, ease: EASE_CINE }}
          className="flex items-center gap-5 flex-wrap"
        >
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[14px] font-semibold transition-all duration-300"
            style={{
              background: 'linear-gradient(165deg, #c9a86e 0%, #a0814a 100%)',
              color: '#0a0a0a',
              boxShadow: '0 4px 24px rgba(201,168,110,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 32px rgba(201,168,110,0.5)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(201,168,110,0.3)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Join the Waitlist
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#experts"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[14px] font-medium transition-all duration-300"
            style={{
              border: '1px solid rgba(201,168,110,0.3)',
              color: 'rgba(255,255,255,0.7)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201,168,110,0.6)'
              e.currentTarget.style.color = '#c9a86e'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201,168,110,0.3)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
            }}
          >
            Become an Expert
          </a>
        </motion.div>

        {/* Quick stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.3, ease: EASE_CINE }}
          className="flex items-center gap-10 mt-20 flex-wrap"
        >
          {[
            { label: 'Status', value: 'In Development' },
            { label: 'Modes', value: 'Chat · Voice · Video' },
            { label: 'Fields', value: '8+ Categories' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-1" style={{ color: 'rgba(201,168,110,0.5)' }}>
                {stat.label}
              </div>
              <div className="text-[14px] font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {stat.value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] uppercase tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 24, background: 'linear-gradient(180deg, rgba(201,168,110,0.4), transparent)' }}
        />
      </motion.div>
    </Section>
  )
}

// ═══════════════════════════════════════════════════════════
// NARRATIVE SECTION — Why FlyHigh exists
// ═══════════════════════════════════════════════════════════
function NarrativeSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section dark>
      <div ref={ref} className="px-8 md:px-16 lg:px-24 py-28 md:py-36">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE_CINE }}
            className="mb-6"
          >
            <Eyebrow>The Vision</Eyebrow>
          </motion.div>
          <GoldRule />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
            {/* Left — statement */}
            <div>
              <AnimatedHeading>Search gives answers. You need your answer.</AnimatedHeading>
            </div>

            {/* Right — story */}
            <div className="flex flex-col justify-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE_CINE }}
                className="mb-6"
                style={{ fontSize: '16px', lineHeight: 1.9, color: 'rgba(255,255,255,0.5)' }}
              >
                Everyday challenges — work, finances, health, legal, tech — deserve more than generic search results.
                One focused conversation with the right expert can save you hours, money, and stress.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5, ease: EASE_CINE }}
                style={{ fontSize: '16px', lineHeight: 1.9, color: 'rgba(255,255,255,0.5)' }}
              >
                FlyHigh is built to bridge the gap between the question you have and the expert who has lived it.
                Human-led guidance. AI-enhanced matching. Real outcomes.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

// ═══════════════════════════════════════════════════════════
// HOW IT WORKS — Process steps
// ═══════════════════════════════════════════════════════════
function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const steps = [
    {
      num: '01',
      title: 'Describe',
      desc: 'Tell us what you need in a few lines. No forms, no friction — just your situation.',
    },
    {
      num: '02',
      title: 'Match',
      desc: 'Our system matches you with a verified expert in the relevant field. Credentials checked, quality assured.',
    },
    {
      num: '03',
      title: 'Connect',
      desc: 'Start a session — chat, voice, or video. Whatever feels right for the conversation.',
    },
    {
      num: '04',
      title: 'Act',
      desc: 'Walk away with clear next steps you can act on immediately. Rate and improve future matches.',
    },
  ]

  return (
    <Section dark={false}>
      <div ref={ref} className="px-8 md:px-16 lg:px-24 py-28 md:py-36">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE_CINE }}
            className="mb-6"
          >
            <Eyebrow light={false}>How It Works</Eyebrow>
          </motion.div>

          <AnimatedHeading light={false}>From question to clarity in four steps.</AnimatedHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: EASE_CINE }}
                className="relative group"
              >
                {/* Step number */}
                <div
                  className="text-[64px] font-extralight leading-none mb-4 transition-colors duration-500"
                  style={{ color: 'rgba(201,168,110,0.2)' }}
                >
                  {step.num}
                </div>
                {/* Gold accent line */}
                <div
                  className="w-8 h-[2px] mb-4"
                  style={{ background: 'linear-gradient(90deg, #c9a86e, transparent)' }}
                />
                <h3
                  className="text-[20px] font-semibold tracking-[-0.02em] mb-3"
                  style={{ color: '#2a2218' }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-[14px] leading-[1.8]"
                  style={{ color: 'rgba(42,34,24,0.55)' }}
                >
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

// ═══════════════════════════════════════════════════════════
// VALUE PILLARS — Core benefits
// ═══════════════════════════════════════════════════════════
function ValuePillarsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const pillars = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="12" stroke="#c9a86e" strokeWidth="1" opacity="0.4" />
          <path d="M10 14l3 3 5-6" stroke="#c9a86e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'Verified Expertise',
      desc: 'Every expert is verified with category-specific checks, credentials, and ongoing ratings. No guesswork.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="4" y="4" width="20" height="20" rx="4" stroke="#c9a86e" strokeWidth="1" opacity="0.4" />
          <path d="M10 14h8M14 10v8" stroke="#c9a86e" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: 'Flexible Sessions',
      desc: 'Chat when you have a quick question. Call when you need depth. Video when it requires demonstration.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 4v20M4 14h20" stroke="#c9a86e" strokeWidth="1" opacity="0.4" />
          <circle cx="14" cy="14" r="4" stroke="#c9a86e" strokeWidth="1.5" />
        </svg>
      ),
      title: 'AI-Enhanced Matching',
      desc: 'Smart matching learns from every interaction. The more you use FlyHigh, the better your matches become.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M6 22V10l8-6 8 6v12a2 2 0 01-2 2H8a2 2 0 01-2-2z" stroke="#c9a86e" strokeWidth="1" opacity="0.4" />
          <path d="M11 24v-7h6v7" stroke="#c9a86e" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: 'Actionable Outcomes',
      desc: 'Not just advice — clear, concrete next steps you can act on immediately after every session.',
    },
  ]

  return (
    <Section dark>
      <div ref={ref} className="px-8 md:px-16 lg:px-24 py-28 md:py-36">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE_CINE }}
              className="mb-6"
            >
              <Eyebrow>Why FlyHigh</Eyebrow>
            </motion.div>
            <AnimatedHeading className="max-w-3xl mx-auto">One conversation can change everything.</AnimatedHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: EASE_CINE }}
                className="p-8 rounded-2xl transition-all duration-500 group"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(201,168,110,0.06)'
                  e.currentTarget.style.borderColor = 'rgba(201,168,110,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                }}
              >
                <div className="mb-5">{pillar.icon}</div>
                <h3
                  className="text-[20px] font-semibold tracking-[-0.02em] mb-3"
                  style={{ color: 'rgba(255,255,255,0.9)' }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="text-[14px] leading-[1.8]"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

// ═══════════════════════════════════════════════════════════
// FIELDS SECTION — Categories supported
// ═══════════════════════════════════════════════════════════
function FieldsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const fields = [
    { name: 'Business & Finance', desc: 'Investments, financial planning, strategy, HR' },
    { name: 'Health & Wellness', desc: 'Medical guidance, mental health, fitness coaching' },
    { name: 'Legal & Compliance', desc: 'Legal matters, regulations, dispute resolution' },
    { name: 'Marketing & PR', desc: 'Growth strategy, branding, public relations' },
    { name: 'IT & Digital', desc: 'Technology systems, software, digital productivity' },
    { name: 'Career & Education', desc: 'Career paths, skill development, mentorship' },
    { name: 'Agriculture', desc: 'Farming productivity, cultivation, horticulture' },
    { name: 'Operations & Growth', desc: 'Process optimization, sustainability, scaling' },
  ]

  return (
    <Section dark={false}>
      <div ref={ref} className="px-8 md:px-16 lg:px-24 py-28 md:py-36">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16">
            {/* Left — heading */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: EASE_CINE }}
                className="mb-6"
              >
                <Eyebrow light={false}>Fields We Support</Eyebrow>
              </motion.div>
              <AnimatedHeading light={false}>Expertise across every field that matters.</AnimatedHeading>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: EASE_CINE }}
                className="mt-6"
                style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(42,34,24,0.55)' }}
              >
                From healthcare to agriculture, from legal to tech — FlyHigh connects you
                with professionals who have lived your challenge and can guide you through it.
              </motion.p>
            </div>

            {/* Right — field cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map((field, i) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: EASE_CINE }}
                  className="p-5 rounded-xl transition-all duration-400 group"
                  style={{
                    background: 'rgba(255,255,255,0.65)',
                    border: '1px solid rgba(42,34,24,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(201,168,110,0.3)'
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,168,110,0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(42,34,24,0.06)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <h4
                    className="text-[15px] font-semibold tracking-[-0.01em] mb-1.5"
                    style={{ color: '#2a2218' }}
                  >
                    {field.name}
                  </h4>
                  <p
                    className="text-[13px] leading-[1.6]"
                    style={{ color: 'rgba(42,34,24,0.45)' }}
                  >
                    {field.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

// ═══════════════════════════════════════════════════════════
// FOR EXPERTS SECTION
// ═══════════════════════════════════════════════════════════
function ExpertsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const benefits = [
    { title: 'Get Verified', desc: 'Build your professional profile with verified credentials in your field.' },
    { title: 'Help Real People', desc: 'Support individuals facing real problems with real deadlines.' },
    { title: 'Earn On Your Terms', desc: 'Monetize your expertise professionally — set your own availability.' },
  ]

  return (
    <Section dark id="experts">
      {/* Decorative background image */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/spiral-bg-dark.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ filter: 'blur(1px)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, transparent 30%, transparent 70%, #0a0a0a 100%)' }} />
      </div>

      <div ref={ref} className="relative z-10 px-8 md:px-16 lg:px-24 py-28 md:py-36">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE_CINE }}
            className="mb-6"
          >
            <Eyebrow>For Experts</Eyebrow>
          </motion.div>

          <AnimatedHeading className="max-w-3xl mx-auto mb-6">Let your skill pay you back.</AnimatedHeading>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE_CINE }}
            className="max-w-xl mx-auto mb-16"
            style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(255,255,255,0.45)' }}
          >
            Share what you already know — professionally, on your schedule,
            with people who genuinely need your guidance.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: EASE_CINE }}
                className="text-center"
              >
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-5 flex items-center justify-center"
                  style={{
                    background: 'rgba(201,168,110,0.1)',
                    border: '1px solid rgba(201,168,110,0.2)',
                  }}
                >
                  <span className="text-[18px] font-light" style={{ color: '#c9a86e' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3
                  className="text-[18px] font-semibold tracking-[-0.02em] mb-2"
                  style={{ color: 'rgba(255,255,255,0.9)' }}
                >
                  {b.title}
                </h3>
                <p className="text-[14px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

// ═══════════════════════════════════════════════════════════
// FAQ SECTION
// ═══════════════════════════════════════════════════════════
function FAQSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      q: 'When will FlyHigh launch?',
      a: 'We are iterating with early users and experts. Join the waitlist to receive launch updates and be among the first to experience FlyHigh.',
    },
    {
      q: 'How are experts selected and verified?',
      a: 'Profiles include verification signals and category-specific checks, plus ongoing ratings and feedback from users. We prioritize quality and accountability.',
    },
    {
      q: 'Is FlyHigh powered entirely by AI?',
      a: 'FlyHigh uses AI to improve matching speed and accuracy, but expert guidance remains human-led and accountable. Real people, real expertise.',
    },
    {
      q: 'What does a session look like?',
      a: 'You choose the format — chat, voice, or video. Sessions are focused, time-bounded, and end with clear next steps you can act on.',
    },
    {
      q: 'How much does it cost?',
      a: 'Pricing varies by field and session type. We are designing a model that keeps guidance accessible while fairly compensating experts.',
    },
  ]

  return (
    <Section dark={false}>
      <div ref={ref} className="px-8 md:px-16 lg:px-24 py-28 md:py-36">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE_CINE }}
            className="mb-6"
          >
            <Eyebrow light={false}>FAQ</Eyebrow>
          </motion.div>

          <AnimatedHeading light={false} className="mb-12">Common questions, clear answers.</AnimatedHeading>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isItemOpen = openIndex === i
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: EASE_CINE }}
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.65)',
                    border: '1px solid rgba(42,34,24,0.06)',
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isItemOpen ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                  >
                    <span
                      className="text-[16px] font-semibold tracking-[-0.01em] pr-4"
                      style={{ color: '#2a2218' }}
                    >
                      {faq.q}
                    </span>
                    <motion.svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      animate={{ rotate: isItemOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE_UI }}
                      style={{ flexShrink: 0 }}
                    >
                      <path d="M9 4v10M4 9h10" stroke="#c9a86e" strokeWidth="1.5" strokeLinecap="round" />
                    </motion.svg>
                  </button>
                  <AnimatePresence>
                    {isItemOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE_UI }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5">
                          <p className="text-[14px] leading-[1.8]" style={{ color: 'rgba(42,34,24,0.55)' }}>
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </Section>
  )
}

// ═══════════════════════════════════════════════════════════
// CTA SECTION — Join the waitlist
// ═══════════════════════════════════════════════════════════
function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <Section dark id="waitlist">
      {/* Atmospheric orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute"
          style={{
            top: '20%', left: '50%', transform: 'translateX(-50%)',
            width: '80vw', height: '60vh',
            background: 'radial-gradient(ellipse at center, rgba(201,168,110,0.1) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div ref={ref} className="relative z-10 px-8 md:px-16 lg:px-24 py-28 md:py-40 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_CINE }}
          className="mb-6"
        >
          <Eyebrow>Early Access</Eyebrow>
        </motion.div>

        <AnimatedHeading className="max-w-3xl mx-auto mb-6">This product is in the making.</AnimatedHeading>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE_CINE }}
          className="max-w-lg mx-auto mb-12"
          style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(255,255,255,0.45)' }}
        >
          FlyHigh is currently being built. Early access is open for founding users
          and founding experts who want to shape the experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE_CINE }}
          className="flex items-center justify-center gap-5 flex-wrap"
        >
          <a
            href="mailto:info@trinade.com?subject=FlyHigh%20Waitlist"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[15px] font-semibold transition-all duration-300"
            style={{
              background: 'linear-gradient(165deg, #c9a86e 0%, #a0814a 100%)',
              color: '#0a0a0a',
              boxShadow: '0 4px 24px rgba(201,168,110,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 40px rgba(201,168,110,0.5)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(201,168,110,0.3)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Join the Waitlist
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="mailto:info@trinade.com?subject=FlyHigh%20Expert%20Application"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-[15px] font-medium transition-all duration-300"
            style={{
              border: '1px solid rgba(201,168,110,0.3)',
              color: 'rgba(255,255,255,0.7)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201,168,110,0.6)'
              e.currentTarget.style.color = '#c9a86e'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201,168,110,0.3)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
            }}
          >
            Apply as Expert
          </a>
        </motion.div>

        {/* Contact info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE_CINE }}
          className="mt-12"
          style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)' }}
        >
          Or reach us directly at{' '}
          <a href="mailto:info@trinade.com" style={{ color: 'rgba(201,168,110,0.5)', textDecoration: 'none' }}>
            info@trinade.com
          </a>
        </motion.p>
      </div>
    </Section>
  )
}

// ═══════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════
export default function FlyHighProductContent() {
  return (
    <div data-dark-section>
      <HeroSection />
      <NarrativeSection />
      <HowItWorksSection />
      <ValuePillarsSection />
      <FieldsSection />
      <ExpertsSection />
      <FAQSection />
      <CTASection />
    </div>
  )
}
