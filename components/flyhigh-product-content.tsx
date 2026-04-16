'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

// ═══════════════════════════════════════════════════════════════════════
// FLY HIGH — GOD MODE PRODUCT PAGE
// Award-winning techniques: aurora gradients, split-text 3D reveals,
// magnetic buttons, volumetric light, morphing blobs, glassmorphic depth,
// multi-step hover choreography, animated grain, gradient text animations
// ═══════════════════════════════════════════════════════════════════════

const EASE_CINE = [0.16, 1, 0.3, 1] as const
const EASE_UI = [0.32, 0.72, 0, 1] as const

// ─── Animated grain overlay ───
function GrainOverlay({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
        mixBlendMode: 'overlay' as const,
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
function Section({
  children,
  dark = true,
  className = '',
  id,
  style,
}: {
  children: React.ReactNode
  dark?: boolean
  className?: string
  id?: string
  style?: React.CSSProperties
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden ${className}`}
      style={{ background: dark ? '#0a0a0a' : '#f2ede6', ...style }}
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

// ─── Split-text 3D reveal — per-word with rotateX ───
function SplitTextReveal({
  text,
  className = '',
  style = {},
  delay = 0,
}: {
  text: string
  className?: string
  style?: React.CSSProperties
  delay?: number
}) {
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const words = text.split(' ')
  return (
    <h2
      ref={ref}
      className={className}
      style={{ ...style, perspective: '1200px' }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]" style={{ perspective: '800px', paddingBottom: '0.15em' }}>
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: '110%', rotateX: -80 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{
              duration: 1.2,
              delay: delay + i * 0.08,
              ease: EASE_CINE,
            }}
            style={{ transformOrigin: 'center bottom', display: 'inline-block' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  )
}

// ─── Magnetic button component ───
function MagneticButton({
  children,
  href = '#',
  variant = 'primary',
  className = '',
}: {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary'
  className?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    // Skip magnetic effect on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.35, y: y * 0.35 })
  }, [])

  const isPrimary = variant === 'primary'

  return (
    <motion.a
      ref={ref}
      href={href}
      className={`inline-flex items-center gap-2.5 rounded-full font-semibold transition-colors duration-500 ${className}`}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      style={{
        padding: isPrimary ? '16px 36px' : '16px 32px',
        fontSize: '14px',
        background: isPrimary
          ? 'linear-gradient(165deg, #d4bb8a 0%, #c9a86e 30%, #a0814a 100%)'
          : 'transparent',
        color: isPrimary ? '#0a0a0a' : 'rgba(255,255,255,0.6)',
        border: isPrimary ? 'none' : '1px solid rgba(201,168,110,0.25)',
        boxShadow: isPrimary
          ? '0 4px 32px rgba(201,168,110,0.3), 0 1px 0 rgba(255,255,255,0.15) inset'
          : 'none',
      }}
    >
      {children}
    </motion.a>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// HERO SECTION — GOD MODE: Aurora + volumetric light + morphing blob
// ═══════════════════════════════════════════════════════════════════════
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <Section
      dark
      className="flex flex-col justify-between relative"
      style={{ height: '100svh', minHeight: 'var(--hero-min-h-lg)' }}
    >
      {/* ── Aurora gradient background system ── */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Aurora blob 1 — warm gold, drifting */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 3, ease: EASE_CINE }}
          className="absolute"
          style={{
            top: '10%', left: '15%',
            width: '65vw', height: '60vh',
            background: 'radial-gradient(ellipse 80% 50% at 30% 40%, rgba(201,168,110,0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'aurora-drift-1 18s ease-in-out infinite alternate',
          }}
        />
        {/* Aurora blob 2 — warm amber */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 0.8, scale: 1 } : {}}
          transition={{ duration: 3.5, delay: 0.3, ease: EASE_CINE }}
          className="absolute"
          style={{
            top: '20%', right: '10%',
            width: '50vw', height: '50vh',
            background: 'radial-gradient(ellipse 60% 40% at 60% 50%, rgba(180,130,55,0.08) 0%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'aurora-drift-2 22s ease-in-out infinite alternate',
          }}
        />
        {/* Morphing blob — organic center element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute"
          style={{
            top: '30%', left: '50%', transform: 'translateX(-50%)',
            width: 'min(550px, 42vw)', height: 'min(550px, 42vw)',
            background: 'radial-gradient(circle, rgba(201,168,110,0.1) 0%, transparent 60%)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            filter: 'blur(60px)',
            animation: 'morph-blob 12s ease-in-out infinite',
          }}
        />
        {/* Volumetric light cone — hidden on mobile (blur(40px) is GPU-expensive) */}
        <div
          className="absolute hidden md:block"
          style={{
            top: '-10%', left: '50%', transform: 'translateX(-50%)',
            width: 'min(500px, 100vw)', height: '700px',
            background: 'conic-gradient(from 170deg at 50% 0%, transparent 35%, rgba(201,168,110,0.06) 45%, rgba(201,168,110,0.12) 50%, rgba(201,168,110,0.06) 55%, transparent 65%)',
            filter: 'blur(40px)',
            mixBlendMode: 'screen',
          }}
        />
        {/* Top atmospheric haze */}
        <div
          className="absolute"
          style={{
            top: 0, left: 0, right: 0, height: '40%',
            background: 'linear-gradient(180deg, rgba(26,20,10,0.6) 0%, transparent 100%)',
          }}
        />
        {/* Subtle golden grid lines */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.025,
            backgroundImage: `linear-gradient(rgba(201,168,110,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,168,110,0.5) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%)',
          }}
        />
        {/* Concentric rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2.5, delay: 0.6, ease: EASE_CINE }}
          className="absolute"
          style={{
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: 'min(500px, 40vw)', height: 'min(500px, 40vw)',
            borderRadius: '50%',
            border: '1px solid rgba(201,168,110,0.06)',
            boxShadow: 'inset 0 0 100px rgba(201,168,110,0.03)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2.5, delay: 0.9, ease: EASE_CINE }}
          className="absolute"
          style={{
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: 'min(300px, 24vw)', height: 'min(300px, 24vw)',
            borderRadius: '50%',
            border: '1px solid rgba(201,168,110,0.04)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2.5, delay: 1.1, ease: EASE_CINE }}
          className="absolute"
          style={{
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: 'min(150px, 12vw)', height: 'min(150px, 12vw)',
            borderRadius: '50%',
            border: '1px solid rgba(201,168,110,0.03)',
          }}
        />
      </div>

      {/* Main content — centered.
          Apr 16: trimmed vertical spacing on mobile/tablet so everything
          fits inside the 100svh section without overflow. */}
      <div ref={ref} className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 md:px-16 pt-14 md:pt-32 pb-8 md:pb-16">
        {/* Product badge */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1, delay: 0.2, ease: EASE_CINE }}
          className="mb-6 md:mb-12"
        >
          <span
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{
              background: 'rgba(201,168,110,0.06)',
              border: '1px solid rgba(201,168,110,0.15)',
              color: '#c9a86e',
              backdropFilter: 'blur(16px)',
            }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'linear-gradient(165deg, #c9a86e, #a0814a)',
              boxShadow: '0 0 10px rgba(201,168,110,0.7)',
              animation: 'pulse-glow 2s ease-in-out infinite',
            }} />
            Trinade Product
          </span>
        </motion.div>

        {/* Main headline — split-text 3D reveal with gradient accent */}
        <div className="mb-5 md:mb-8" style={{ perspective: '1200px' }}>
          <motion.h1
            initial={{ opacity: 0, y: '110%', rotateX: -80 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 1.4, delay: 0.5, ease: EASE_CINE }}
            className="tracking-[-0.05em] max-lg:!text-[5rem]"
            style={{
              fontSize: 'var(--text-hero-xl)',
              lineHeight: 0.88,
              fontWeight: 200,
              color: 'rgba(255,255,255,0.95)',
              transformOrigin: 'center bottom',
            }}
          >
            Fly{' '}
            <span
              style={{
                color: 'transparent',
                backgroundImage: 'linear-gradient(165deg, #d4bb8a 0%, #c9a86e 40%, #a0814a 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
              }}
            >
              High
            </span>
          </motion.h1>
        </div>

        {/* Animated gradient tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1, delay: 1, ease: EASE_CINE }}
          className="max-w-2xl mb-4 md:mb-5 max-lg:!text-[1.25rem]"
          style={{
            fontSize: 'var(--text-lead)',
            lineHeight: 1.5,
            fontWeight: 300,
            letterSpacing: '-0.01em',
            color: 'rgba(201,168,110,0.7)',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.55), rgba(201,168,110,0.7), rgba(255,255,255,0.55))',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'gradient-text-shift 6s ease infinite',
          }}
        >
          Where intelligence is shared.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.3, ease: EASE_CINE }}
          className="max-w-lg mb-8 md:mb-14 text-[15px] md:text-[15px] max-lg:!text-[1rem]"
          style={{ lineHeight: 1.75, color: 'rgba(255,255,255,0.3)' }}
        >
          A platform connecting people with verified experts for real-time guidance —
          through chat, voice, or video.
        </motion.p>

        {/* CTA — responsive padding: smaller on mobile, full on md+ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5, ease: EASE_CINE }}
          className="flex items-center justify-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 rounded-full font-semibold transition-all duration-500 hover:shadow-[0_8px_40px_rgba(201,168,110,0.35)] px-6 py-3 md:px-9 md:py-4 text-[13px] md:text-[14px]"
            style={{
              background: 'linear-gradient(165deg, #d4bb8a 0%, #c9a86e 30%, #a0814a 100%)',
              color: '#0a0a0a',
              boxShadow: '0 4px 32px rgba(201,168,110,0.3), 0 1px 0 rgba(255,255,255,0.15) inset',
            }}
          >
            Join the Waitlist
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Bottom bar — stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.8, ease: EASE_CINE }}
        className="relative z-10 px-4 md:px-8 lg:px-16 xl:px-24 pb-10"
      >
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between py-5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-4 md:gap-10 flex-wrap">
            {[
              { label: 'Status', value: 'In Development' },
              { label: 'Modes', value: 'Chat · Voice · Video' },
              { label: 'Fields', value: '8+ Categories' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-1" style={{ color: 'rgba(201,168,110,0.4)' }}>
                  {stat.label}
                </div>
                <div className="text-[13px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
          {/* Scroll indicator removed Apr 16 per founder request */}
        </div>
      </motion.div>

      {/* CSS Keyframes */}
      <style jsx global>{`
        @keyframes aurora-drift-1 {
          0% { transform: rotate(0deg) scale(1) translateX(0); }
          50% { transform: rotate(2deg) scale(1.15) translateX(5%); }
          100% { transform: rotate(-1deg) scale(1.05) translateY(3%); }
        }
        @keyframes aurora-drift-2 {
          0% { transform: rotate(0deg) scale(1) translateY(0); }
          50% { transform: rotate(-3deg) scale(1.1) translateX(-3%); }
          100% { transform: rotate(2deg) scale(1.08) translateY(-5%); }
        }
        @keyframes morph-blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50% { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; }
          75% { border-radius: 40% 30% 60% 50% / 60% 40% 30% 70%; }
        }
        @keyframes gradient-text-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 8px rgba(201,168,110,0.6); }
          50% { box-shadow: 0 0 16px rgba(201,168,110,0.9); }
        }
      `}</style>
    </Section>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// NARRATIVE SECTION — Volumetric light + editorial split
// ═══════════════════════════════════════════════════════════════════════
function NarrativeSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section dark>
      {/* Volumetric light cone */}
      <div
        className="absolute"
        style={{
          top: '-20%', right: '10%',
          width: '400px', height: '600px',
          background: 'conic-gradient(from 200deg at 50% 0%, transparent 38%, rgba(201,168,110,0.05) 46%, rgba(201,168,110,0.09) 50%, rgba(201,168,110,0.05) 54%, transparent 62%)',
          filter: 'blur(30px)',
          mixBlendMode: 'screen',
          opacity: 0.7,
        }}
      />

      <div ref={ref} className="relative z-10 px-6 md:px-8 lg:px-16 xl:px-24 py-16 md:py-28 lg:py-40">
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

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-20 mt-14">
            {/* Left — editorial statement */}
            <div>
              <SplitTextReveal
                text="Search gives answers. You need your answer."
                delay={0.2}
                className="tracking-[-0.03em]"
                style={{
                  fontSize: 'var(--text-h2)',
                  lineHeight: 1.1,
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.93)',
                }}
              />
            </div>

            {/* Right — story paragraphs */}
            <div className="flex flex-col justify-center gap-8">
              {[
                'Everyday challenges — work, finances, health, legal, tech — deserve more than generic search results. One focused conversation with the right expert can save you hours, money, and stress.',
                'FlyHigh is built to bridge the gap between the question you have and the expert who has lived it. Human-led guidance. AI-enhanced matching. Real outcomes.',
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.5 + i * 0.2, ease: EASE_CINE }}
                  style={{ fontSize: '16px', lineHeight: 1.9, color: 'rgba(255,255,255,0.5)' }}
                >
                  {text}
                </motion.p>
              ))}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.4, delay: 1, ease: EASE_CINE }}
                style={{
                  width: '80px', height: '2px',
                  background: 'linear-gradient(90deg, #c9a86e, transparent)',
                  transformOrigin: 'left',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// HOW IT WORKS — Process steps with connecting line
// ═══════════════════════════════════════════════════════════════════════
function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const steps = [
    { num: '01', title: 'Describe', desc: 'Tell us what you need in a few lines. No forms, no friction — just your situation.' },
    { num: '02', title: 'Match', desc: 'Our system matches you with a verified expert in the relevant field. Credentials checked, quality assured.' },
    { num: '03', title: 'Connect', desc: 'Start a session — chat, voice, or video. Whatever feels right for the conversation.' },
    { num: '04', title: 'Act', desc: 'Walk away with clear next steps you can act on immediately. Rate and improve future matches.' },
  ]

  return (
    <Section dark={false}>
      <div ref={ref} className="px-4 md:px-8 lg:px-16 xl:px-24 py-16 md:py-28 lg:py-40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE_CINE }}
              className="mb-6"
            >
              <Eyebrow light={false}>How It Works</Eyebrow>
            </motion.div>
            <SplitTextReveal
              text="From question to clarity in four steps."
              delay={0.2}
              className="tracking-[-0.03em]"
              style={{
                fontSize: 'var(--text-display)',
                lineHeight: 1.1,
                fontWeight: 300,
                color: '#2a2218',
              }}
            />
          </div>

          {/* Steps with connecting line */}
          <div className="relative">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.8, delay: 0.5, ease: EASE_CINE }}
              className="hidden md:block absolute"
              style={{
                top: '36px', left: '12.5%', right: '12.5%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(201,168,110,0.25), rgba(201,168,110,0.25), transparent)',
                transformOrigin: 'left',
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: EASE_CINE }}
                  className="text-center relative"
                >
                  {/* Step number circle */}
                  <div
                    className="w-[72px] h-[72px] rounded-full mx-auto mb-6 flex items-center justify-center transition-shadow duration-500 hover:shadow-[0_0_30px_rgba(201,168,110,0.15)]"
                    style={{
                      background: 'rgba(201,168,110,0.06)',
                      border: '1px solid rgba(201,168,110,0.15)',
                    }}
                  >
                    <span className="text-[22px] font-extralight" style={{ color: '#c9a86e' }}>
                      {step.num}
                    </span>
                  </div>
                  <h3
                    className="text-[20px] font-semibold tracking-[-0.02em] mb-3"
                    style={{ color: '#2a2218' }}
                  >
                    {step.title}
                  </h3>
                  {/* max-w-[16rem] on mobile centers the text block away from
                      the screen edges. md+ uses full column width (4-col grid). */}
                  <p className="text-[14px] leading-[1.8] mx-auto max-w-[16rem] md:max-w-none" style={{ color: 'rgba(42,34,24,0.55)' }}>
                    {step.desc}
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

// ═══════════════════════════════════════════════════════════════════════
// VALUE PILLARS — Glassmorphic cards with hover choreography
// ═══════════════════════════════════════════════════════════════════════
function ValuePillarsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  // Apr 16: mobile carousel state (same pattern as Home / Solutions carousels)
  const pillarsCarouselRef = useRef<HTMLDivElement>(null)
  const [pillarsActive, setPillarsActive] = useState(0)
  const handlePillarsScroll = () => {
    const el = pillarsCarouselRef.current
    if (!el) return
    const card = el.children[1] as HTMLElement | null
    const spacer = el.children[0] as HTMLElement | null
    if (!card || !spacer) return
    const step = card.getBoundingClientRect().width + 16
    const spacerW = spacer.getBoundingClientRect().width + 16
    const idx = Math.round(Math.max(0, el.scrollLeft - spacerW + step / 2) / step)
    setPillarsActive(Math.min(Math.max(0, idx), 3))
  }
  const scrollPillarsTo = (i: number) => {
    const el = pillarsCarouselRef.current
    if (!el) return
    const card = el.children[1] as HTMLElement | null
    const spacer = el.children[0] as HTMLElement | null
    if (!card || !spacer) return
    const step = card.getBoundingClientRect().width + 16
    const spacerW = spacer.getBoundingClientRect().width + 16
    const containerW = el.clientWidth
    const cardCenter = spacerW + i * step + step / 2 - 8
    el.scrollTo({ left: cardCenter - containerW / 2, behavior: 'smooth' })
  }

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
      {/* Atmospheric orb */}
      <div
        className="absolute"
        style={{
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '60vw', height: '40vh',
          background: 'radial-gradient(ellipse at center, rgba(201,168,110,0.05) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      <div ref={ref} className="relative z-10 px-6 md:px-8 lg:px-16 xl:px-24 py-16 md:py-28 lg:py-40">
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
            <SplitTextReveal
              text="One conversation can change everything."
              className="max-w-3xl mx-auto tracking-[-0.03em]"
              style={{
                fontSize: 'var(--text-display)',
                lineHeight: 1.1,
                fontWeight: 300,
                color: 'rgba(255,255,255,0.93)',
              }}
            />
          </div>

          {/* Shared card render for both mobile carousel and md+ grid */}
          {(() => {
            const renderCard = (pillar: typeof pillars[0], i: number) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: EASE_CINE }}
                className="relative p-6 md:p-8 rounded-2xl transition-all duration-500 group overflow-hidden h-full"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(135deg, rgba(201,168,110,0.06) 0%, transparent 50%)' }}
                />
                <div className="relative z-10">
                  <div className="mb-4 md:mb-5 opacity-70 group-hover:opacity-100 transition-opacity duration-500">{pillar.icon}</div>
                  <h3
                    className="text-[18px] md:text-[20px] font-semibold tracking-[-0.02em] mb-2 md:mb-3"
                    style={{ color: 'rgba(255,255,255,0.9)' }}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-[13px] md:text-[14px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            )
            return (
              <>
                {/* Mobile swipe carousel + dots */}
                <div className="md:hidden">
                  <div
                    ref={pillarsCarouselRef}
                    onScroll={handlePillarsScroll}
                    className="flex items-stretch overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    style={{ gap: '16px' }}
                  >
                    <div aria-hidden className="shrink-0 self-stretch" style={{ width: 'var(--spacing-gutter)' }} />
                    {pillars.map((pillar, i) => (
                      <div key={pillar.title} className="snap-center shrink-0 w-[72vw] max-w-[22rem] h-[18rem]">
                        {renderCard(pillar, i)}
                      </div>
                    ))}
                    <div aria-hidden className="shrink-0 self-stretch" style={{ width: 'var(--spacing-gutter)' }} />
                  </div>
                  <div className="flex justify-center items-center gap-2 mt-5">
                    {pillars.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => scrollPillarsTo(i)}
                        aria-label={`Go to pillar ${i + 1}`}
                        className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                        style={{
                          width: pillarsActive === i ? '24px' : '8px',
                          background: pillarsActive === i ? '#c9a86e' : 'rgba(255,255,255,0.18)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* md+ grid (unchanged) */}
                <div className="hidden md:grid md:grid-cols-2 gap-6">
                  {pillars.map((pillar, i) => renderCard(pillar, i))}
                </div>
              </>
            )
          })()}
        </div>
      </div>
    </Section>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// FIELDS SECTION — Categories with glassmorphic cards
// ═══════════════════════════════════════════════════════════════════════
function FieldsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const fieldsCarouselRef = useRef<HTMLDivElement>(null)
  const [fieldsActive, setFieldsActive] = useState(0)
  const handleFieldsScroll = () => {
    const el = fieldsCarouselRef.current
    if (!el) return
    const card = el.children[1] as HTMLElement | null
    const spacer = el.children[0] as HTMLElement | null
    if (!card || !spacer) return
    const step = card.getBoundingClientRect().width + 16
    const spacerW = spacer.getBoundingClientRect().width + 16
    const idx = Math.round(Math.max(0, el.scrollLeft - spacerW + step / 2) / step)
    setFieldsActive(Math.min(Math.max(0, idx), 7))
  }
  const scrollFieldsTo = (i: number) => {
    const el = fieldsCarouselRef.current
    if (!el) return
    const card = el.children[1] as HTMLElement | null
    const spacer = el.children[0] as HTMLElement | null
    if (!card || !spacer) return
    const step = card.getBoundingClientRect().width + 16
    const spacerW = spacer.getBoundingClientRect().width + 16
    const containerW = el.clientWidth
    const cardCenter = spacerW + i * step + step / 2 - 8
    el.scrollTo({ left: cardCenter - containerW / 2, behavior: 'smooth' })
  }

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
      {/* Apr 16: bumped mobile px-4 → px-6 so heading + tagline don't hug the
          screen edges. md+ unchanged. */}
      <div ref={ref} className="px-6 md:px-8 lg:px-16 xl:px-24 py-16 md:py-28 lg:py-40">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: EASE_CINE }}
                className="mb-6"
              >
                <Eyebrow light={false}>Fields We Support</Eyebrow>
              </motion.div>
              <SplitTextReveal
                text="Expertise across every field that matters."
                className="tracking-[-0.03em]"
                style={{
                  fontSize: 'var(--text-h2)',
                  lineHeight: 1.1,
                  fontWeight: 300,
                  color: '#2a2218',
                }}
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6, ease: EASE_CINE }}
                className="mt-6"
                style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(42,34,24,0.55)' }}
              >
                From healthcare to agriculture, from legal to tech — FlyHigh connects you
                with professionals who have lived your challenge and can guide you through it.
              </motion.p>
            </div>

            <div>
            {(() => {
              const renderField = (field: typeof fields[0], i: number) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: EASE_CINE }}
                  className="p-5 rounded-xl transition-all duration-500 group relative overflow-hidden h-full"
                  style={{
                    background: 'linear-gradient(165deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.5) 100%)',
                    border: '1px solid rgba(42,34,24,0.06)',
                    backdropFilter: 'blur(8px)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(201,168,110,0.3)'
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(201,168,110,0.1)'
                    e.currentTarget.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(42,34,24,0.06)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {/* Inner glow */}
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(135deg, rgba(201,168,110,0.06) 0%, transparent 50%)' }}
                  />
                  <div className="relative z-10">
                    <h4
                      className="text-[15px] font-semibold tracking-[-0.01em] mb-1.5"
                      style={{ color: '#2a2218' }}
                    >
                      {field.name}
                    </h4>
                    <p className="text-[13px] leading-[1.6]" style={{ color: 'rgba(42,34,24,0.45)' }}>
                      {field.desc}
                    </p>
                  </div>
                </motion.div>
              )
              return (
                <>
                  {/* Mobile carousel + dots */}
                  <div className="md:hidden">
                    <div
                      ref={fieldsCarouselRef}
                      onScroll={handleFieldsScroll}
                      className="flex items-stretch overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                      style={{ gap: '16px' }}
                    >
                      <div aria-hidden className="shrink-0 self-stretch" style={{ width: 'var(--spacing-gutter)' }} />
                      {fields.map((field, i) => (
                        <div key={field.name} className="snap-center shrink-0 w-[72vw] max-w-[20rem] h-[8rem]">
                          {renderField(field, i)}
                        </div>
                      ))}
                      <div aria-hidden className="shrink-0 self-stretch" style={{ width: 'var(--spacing-gutter)' }} />
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-5">
                      {fields.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => scrollFieldsTo(i)}
                          aria-label={`Go to field ${i + 1}`}
                          className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                          style={{
                            width: fieldsActive === i ? '24px' : '8px',
                            background: fieldsActive === i ? '#c9a86e' : 'rgba(42,34,24,0.15)',
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* sm+ grid (unchanged) */}
                  <div className="hidden sm:grid sm:grid-cols-2 gap-4">
                    {fields.map((field, i) => renderField(field, i))}
                  </div>
                </>
              )
            })()}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// FOR EXPERTS SECTION — With background image + atmospheric depth
// ═══════════════════════════════════════════════════════════════════════
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
      {/* Background image + atmospheric overlays */}
      <div className="absolute inset-0 opacity-20">
        <Image src="/spiral-bg-dark.jpg" alt="" fill className="object-cover" style={{ filter: 'blur(1px)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, transparent 30%, transparent 70%, #0a0a0a 100%)' }} />
      </div>

      {/* Volumetric light */}
      <div
        className="absolute"
        style={{
          top: '-15%', left: '50%', transform: 'translateX(-50%)',
          width: '400px', height: '500px',
          background: 'conic-gradient(from 170deg at 50% 0%, transparent 38%, rgba(201,168,110,0.04) 46%, rgba(201,168,110,0.08) 50%, rgba(201,168,110,0.04) 54%, transparent 62%)',
          filter: 'blur(35px)',
          mixBlendMode: 'screen',
        }}
      />

      <div ref={ref} className="relative z-10 px-6 md:px-8 lg:px-16 xl:px-24 py-16 md:py-28 lg:py-40">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE_CINE }}
            className="mb-6"
          >
            <Eyebrow>For Experts</Eyebrow>
          </motion.div>

          <SplitTextReveal
            text="Let your skill pay you back."
            className="max-w-3xl mx-auto mb-6 tracking-[-0.03em]"
            style={{
              fontSize: 'var(--text-display)',
              lineHeight: 1.1,
              fontWeight: 300,
              color: 'rgba(255,255,255,0.93)',
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE_CINE }}
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
                className="text-center group"
              >
                <div
                  className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(201,168,110,0.2)]"
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
                <p className="text-[14px] leading-[1.7] mx-auto max-w-[16rem] md:max-w-none" style={{ color: 'rgba(255,255,255,0.4)' }}>
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

// ═══════════════════════════════════════════════════════════════════════
// FAQ SECTION — Premium accordion with gold active states
// ═══════════════════════════════════════════════════════════════════════
function FAQSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    { q: 'When will FlyHigh launch?', a: 'We are iterating with early users and experts. Join the waitlist to receive launch updates and be among the first to experience FlyHigh.' },
    { q: 'How are experts selected and verified?', a: 'Profiles include verification signals and category-specific checks, plus ongoing ratings and feedback from users. We prioritize quality and accountability.' },
    { q: 'Is FlyHigh powered entirely by AI?', a: 'FlyHigh uses AI to improve matching speed and accuracy, but expert guidance remains human-led and accountable. Real people, real expertise.' },
    { q: 'What does a session look like?', a: 'You choose the format — chat, voice, or video. Sessions are focused, time-bounded, and end with clear next steps you can act on.' },
    { q: 'How much does it cost?', a: 'Pricing varies by field and session type. We are designing a model that keeps guidance accessible while fairly compensating experts.' },
  ]

  return (
    <Section dark={false}>
      <div ref={ref} className="px-4 md:px-8 lg:px-16 xl:px-24 py-16 md:py-28 lg:py-40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE_CINE }}
              className="mb-6"
            >
              <Eyebrow light={false}>FAQ</Eyebrow>
            </motion.div>
            <SplitTextReveal
              text="Common questions, clear answers."
              className="tracking-[-0.03em]"
              style={{
                fontSize: 'var(--text-display)',
                lineHeight: 1.1,
                fontWeight: 300,
                color: '#2a2218',
              }}
            />
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: EASE_CINE }}
                  className="rounded-2xl overflow-hidden transition-all duration-500"
                  style={{
                    background: isOpen
                      ? 'linear-gradient(165deg, rgba(201,168,110,0.08) 0%, rgba(255,255,255,0.7) 100%)'
                      : 'rgba(255,255,255,0.65)',
                    border: `1px solid ${isOpen ? 'rgba(201,168,110,0.2)' : 'rgba(42,34,24,0.06)'}`,
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-7 py-6 text-left"
                  >
                    <span
                      className="text-[16px] font-semibold tracking-[-0.01em] pr-4 transition-colors duration-300"
                      style={{ color: isOpen ? '#a0814a' : '#2a2218' }}
                    >
                      {faq.q}
                    </span>
                    <motion.svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: EASE_UI }}
                      style={{ flexShrink: 0 }}
                    >
                      <path d="M9 4v10M4 9h10" stroke="#c9a86e" strokeWidth="1.5" strokeLinecap="round" />
                    </motion.svg>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE_UI }}
                        className="overflow-hidden"
                      >
                        <div className="px-7 pb-6">
                          <p className="text-[14px] leading-[1.9]" style={{ color: 'rgba(42,34,24,0.55)' }}>
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

// ═══════════════════════════════════════════════════════════════════════
// CTA SECTION — Final call with atmospheric depth
// ═══════════════════════════════════════════════════════════════════════
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
        {/* Morphing blob */}
        <div
          className="absolute"
          style={{
            top: '40%', left: '50%', transform: 'translateX(-50%)',
            width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(201,168,110,0.06) 0%, transparent 60%)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            filter: 'blur(50px)',
            animation: 'morph-blob 12s ease-in-out infinite',
          }}
        />
      </div>

      <div ref={ref} className="relative z-10 px-4 md:px-8 lg:px-16 xl:px-24 text-center" style={{ paddingTop: 'var(--spacing-fluid-3xl)', paddingBottom: 'var(--spacing-fluid-3xl)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_CINE }}
          className="mb-6"
        >
          <Eyebrow>Early Access</Eyebrow>
        </motion.div>

        <SplitTextReveal
          text="This product is in the making."
          className="max-w-3xl mx-auto mb-6 tracking-[-0.03em]"
          style={{
            fontSize: 'var(--text-display)',
            lineHeight: 1.15,
            fontWeight: 250,
            color: 'rgba(255,255,255,0.93)',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE_CINE }}
          className="max-w-lg mx-auto mb-14"
          style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(255,255,255,0.45)' }}
        >
          FlyHigh is currently being built. Early access is open for founding users
          and founding experts who want to shape the experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE_CINE }}
          className="flex items-center justify-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 rounded-full font-semibold transition-all duration-500 hover:shadow-[0_8px_40px_rgba(201,168,110,0.35)]"
            style={{
              padding: '16px 36px',
              fontSize: '14px',
              background: 'linear-gradient(165deg, #d4bb8a 0%, #c9a86e 30%, #a0814a 100%)',
              color: '#0a0a0a',
              boxShadow: '0 4px 32px rgba(201,168,110,0.3), 0 1px 0 rgba(255,255,255,0.15) inset',
            }}
          >
            Join the Waitlist
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1, ease: EASE_CINE }}
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

// ═══════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════
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
