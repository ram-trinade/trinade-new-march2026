'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'

// ═══════════════════════════════════════════════════════════════════════
// GOD MODE — EXPERIMENTAL PRODUCT PAGE
// Award-winning techniques: aurora gradients, split-text 3D reveals,
// magnetic buttons, volumetric light, morphing blobs, bento grid,
// multi-step hover choreography, glassmorphic depth, scroll-driven motion
// ═══════════════════════════════════════════════════════════════════════

const EASE_CINE = [0.16, 1, 0.3, 1] as const
const EASE_UI = [0.32, 0.72, 0, 1] as const

// ─── Animated grain overlay with shift ───
function AnimatedGrain({ opacity = 0.035 }: { opacity?: number }) {
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
function Section({ children, dark = true, className = '', id }: { children: React.ReactNode; dark?: boolean; className?: string; id?: string }) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden ${className}`}
      style={{ background: dark ? '#0a0a0a' : '#f2ede6' }}
      data-dark-section={dark ? '' : undefined}
    >
      <AnimatedGrain opacity={dark ? 0.035 : 0.02} />
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
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]" style={{ perspective: '800px' }}>
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
// HERO SECTION — Aurora gradients, split-text 3D, morphing blobs
// ═══════════════════════════════════════════════════════════════════════
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <Section dark className="min-h-screen flex flex-col justify-between relative">
      {/* ── Aurora gradient background ── */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Aurora blob 1 — warm gold */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 3, ease: EASE_CINE }}
          className="absolute"
          style={{
            top: '10%', left: '20%',
            width: '60vw', height: '60vh',
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
            top: '20%', right: '15%',
            width: '50vw', height: '50vh',
            background: 'radial-gradient(ellipse 60% 40% at 60% 50%, rgba(180,130,55,0.09) 0%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'aurora-drift-2 22s ease-in-out infinite alternate',
          }}
        />
        {/* Morphing blob — organic, alive */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute"
          style={{
            top: '30%', left: '50%', transform: 'translateX(-50%)',
            width: 'min(600px, 45vw)', height: 'min(600px, 45vw)',
            background: 'radial-gradient(circle, rgba(201,168,110,0.1) 0%, transparent 60%)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            filter: 'blur(60px)',
            animation: 'morph-blob 12s ease-in-out infinite',
          }}
        />
        {/* Volumetric light cone — top center */}
        <div
          className="absolute"
          style={{
            top: '-10%', left: '50%', transform: 'translateX(-50%)',
            width: '500px', height: '700px',
            background: 'conic-gradient(from 170deg at 50% 0%, transparent 35%, rgba(201,168,110,0.06) 45%, rgba(201,168,110,0.12) 50%, rgba(201,168,110,0.06) 55%, transparent 65%)',
            filter: 'blur(40px)',
            mixBlendMode: 'screen',
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
        {/* Concentric rings — cinematic depth */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2.5, delay: 0.6, ease: EASE_CINE }}
          className="absolute"
          style={{
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: 'min(550px, 42vw)', height: 'min(550px, 42vw)',
            borderRadius: '50%',
            border: '1px solid rgba(201,168,110,0.06)',
            boxShadow: 'inset 0 0 120px rgba(201,168,110,0.03)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2.5, delay: 0.9, ease: EASE_CINE }}
          className="absolute"
          style={{
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: 'min(350px, 27vw)', height: 'min(350px, 27vw)',
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
            width: 'min(180px, 14vw)', height: 'min(180px, 14vw)',
            borderRadius: '50%',
            border: '1px solid rgba(201,168,110,0.03)',
          }}
        />
      </div>

      {/* Main content */}
      <div ref={ref} className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 md:px-16 pt-32 pb-16">
        {/* Product badge — glass pill */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1, delay: 0.2, ease: EASE_CINE }}
          className="mb-12"
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
            Experimental Product
          </span>
        </motion.div>

        {/* Hero headline — split-text 3D reveal */}
        <SplitTextReveal
          text="Intelligence Reimagined"
          delay={0.5}
          className="tracking-[-0.05em] mb-8"
          style={{
            fontSize: 'clamp(4.5rem, 13vw, 12rem)',
            lineHeight: 0.9,
            fontWeight: 200,
            color: 'rgba(255,255,255,0.95)',
          }}
        />

        {/* Animated gradient subline */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1, delay: 1.2, ease: EASE_CINE }}
          className="max-w-2xl mb-5"
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            lineHeight: 1.6,
            fontWeight: 300,
            letterSpacing: '-0.01em',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.55), rgba(201,168,110,0.7), rgba(255,255,255,0.55))',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'gradient-text-shift 6s ease infinite',
          }}
        >
          Where human expertise meets artificial precision.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5, ease: EASE_CINE }}
          className="max-w-lg mb-14"
          style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(255,255,255,0.3)' }}
        >
          A next-generation platform blending AI with verified human wisdom —
          delivering guidance that adapts, learns, and truly understands.
        </motion.p>

        {/* Magnetic CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.7, ease: EASE_CINE }}
          className="flex items-center gap-4 flex-wrap justify-center"
        >
          <MagneticButton href="#waitlist" variant="primary">
            Request Early Access
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
          <MagneticButton href="#features" variant="secondary">
            Explore Features
          </MagneticButton>
        </motion.div>
      </div>

      {/* Bottom stats bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2, ease: EASE_CINE }}
        className="relative z-10 px-8 md:px-16 lg:px-24 pb-10"
      >
        <div
          className="flex items-center justify-between py-5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-10 flex-wrap">
            {[
              { label: 'Status', value: 'In Development' },
              { label: 'Architecture', value: 'AI + Human Hybrid' },
              { label: 'Coverage', value: '8+ Domains' },
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
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: 'rgba(255,255,255,0.2)' }}>Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 1, height: 20, background: 'linear-gradient(180deg, rgba(201,168,110,0.35), transparent)' }}
            />
          </div>
        </div>
      </motion.div>

      {/* CSS Keyframes injected */}
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
// NARRATIVE SECTION — Editorial split with volumetric light
// ═══════════════════════════════════════════════════════════════════════
function NarrativeSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section dark>
      {/* Volumetric light cone — atmospheric depth */}
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

      <div ref={ref} className="relative z-10 px-8 md:px-16 lg:px-24 py-28 md:py-40">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE_CINE }}
            className="mb-6"
          >
            <Eyebrow>The Philosophy</Eyebrow>
          </motion.div>
          <GoldRule />

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-20 mt-14">
            {/* Left — massive editorial statement */}
            <div>
              <SplitTextReveal
                text="Beyond search. Beyond AI. Into understanding."
                delay={0.2}
                className="tracking-[-0.03em]"
                style={{
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                  lineHeight: 1.1,
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.93)',
                }}
              />
            </div>

            {/* Right — story with staggered reveals */}
            <div className="flex flex-col justify-center gap-8">
              {[
                'The age of generic answers is over. Every question deserves context — your context. Not an algorithm\'s best guess, but a human mind that has walked your path.',
                'We are building the bridge between what AI can process and what only human experience can understand. The result is guidance that adapts, resonates, and transforms.',
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.5 + i * 0.2, ease: EASE_CINE }}
                  style={{
                    fontSize: '16px',
                    lineHeight: 1.9,
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  {text}
                </motion.p>
              ))}
              {/* Gold accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.4, delay: 1, ease: EASE_CINE }}
                style={{
                  width: '80px',
                  height: '2px',
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
// BENTO GRID — Feature showcase with glassmorphic depth + hover choreography
// ═══════════════════════════════════════════════════════════════════════
function BentoSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const features = [
    {
      span: 'col-span-1 md:col-span-2 row-span-2',
      title: 'Intelligent Matching',
      desc: 'Our AI analyzes your query context, past interactions, and expert specializations to find the perfect match — in under 3 seconds.',
      accent: true,
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="12" cy="12" r="8" stroke="#c9a86e" strokeWidth="1.2" opacity="0.6" />
          <circle cx="20" cy="20" r="8" stroke="#c9a86e" strokeWidth="1.2" opacity="0.6" />
          <path d="M16 12a8 8 0 010 8" stroke="#c9a86e" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      span: 'col-span-1',
      title: 'Voice & Video',
      desc: 'Crystal-clear real-time sessions. Choose the format that fits your question.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="6" y="4" width="16" height="20" rx="3" stroke="#c9a86e" strokeWidth="1.2" opacity="0.6" />
          <circle cx="14" cy="17" r="2" stroke="#c9a86e" strokeWidth="1.2" />
        </svg>
      ),
    },
    {
      span: 'col-span-1',
      title: 'Verified Experts',
      desc: 'Every professional goes through rigorous credential checks and ongoing quality monitoring.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 3l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" stroke="#c9a86e" strokeWidth="1.2" opacity="0.6" />
        </svg>
      ),
    },
    {
      span: 'col-span-1',
      title: 'Multi-Domain',
      desc: 'Finance, health, legal, tech, agriculture — 8+ specialized categories.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="4" y="4" width="9" height="9" rx="2" stroke="#c9a86e" strokeWidth="1.2" opacity="0.6" />
          <rect x="15" y="4" width="9" height="9" rx="2" stroke="#c9a86e" strokeWidth="1.2" opacity="0.6" />
          <rect x="4" y="15" width="9" height="9" rx="2" stroke="#c9a86e" strokeWidth="1.2" opacity="0.6" />
          <rect x="15" y="15" width="9" height="9" rx="2" stroke="#c9a86e" strokeWidth="1.2" opacity="0.6" />
        </svg>
      ),
    },
    {
      span: 'col-span-1 md:col-span-2',
      title: 'Actionable Outcomes',
      desc: 'Every session ends with concrete, documented next steps. Not just advice — a plan you can execute immediately. Follow-up support ensures nothing falls through the cracks.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M8 14l4 4 8-8" stroke="#c9a86e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="14" cy="14" r="11" stroke="#c9a86e" strokeWidth="1" opacity="0.4" />
        </svg>
      ),
    },
    {
      span: 'col-span-1',
      title: 'Privacy-First',
      desc: 'End-to-end encryption. Your data stays yours. Always.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="7" y="12" width="14" height="12" rx="2" stroke="#c9a86e" strokeWidth="1.2" opacity="0.6" />
          <path d="M10 12V9a4 4 0 018 0v3" stroke="#c9a86e" strokeWidth="1.2" />
        </svg>
      ),
    },
  ]

  return (
    <Section dark={false} id="features">
      <div ref={ref} className="px-8 md:px-16 lg:px-24 py-28 md:py-40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE_CINE }}
              className="mb-6"
            >
              <Eyebrow light={false}>Core Capabilities</Eyebrow>
            </motion.div>
            <SplitTextReveal
              text="Built different. By design."
              delay={0.2}
              className="max-w-3xl mx-auto tracking-[-0.03em]"
              style={{
                fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)',
                lineHeight: 1.1,
                fontWeight: 300,
                color: '#2a2218',
              }}
            />
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 35 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease: EASE_CINE }}
                className={`${feat.span} group relative rounded-2xl overflow-hidden transition-all duration-500`}
                style={{
                  background: feat.accent
                    ? 'linear-gradient(165deg, rgba(201,168,110,0.08) 0%, rgba(201,168,110,0.02) 100%)'
                    : 'rgba(255,255,255,0.65)',
                  border: `1px solid ${feat.accent ? 'rgba(201,168,110,0.15)' : 'rgba(42,34,24,0.06)'}`,
                  padding: feat.accent ? '48px 40px' : '32px 28px',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(201,168,110,0.35)'
                  el.style.boxShadow = '0 8px 40px rgba(201,168,110,0.12)'
                  el.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = feat.accent ? 'rgba(201,168,110,0.15)' : 'rgba(42,34,24,0.06)'
                  el.style.boxShadow = 'none'
                  el.style.transform = 'translateY(0)'
                }}
              >
                {/* Inner glow — glass highlight */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(201,168,110,0.08) 0%, transparent 50%)',
                  }}
                />
                <div className="relative z-10">
                  <div className="mb-5 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                    {feat.icon}
                  </div>
                  <h3
                    className="text-[18px] font-semibold tracking-[-0.02em] mb-3"
                    style={{ color: '#2a2218' }}
                  >
                    {feat.title}
                  </h3>
                  <p
                    className="text-[14px] leading-[1.8]"
                    style={{ color: 'rgba(42,34,24,0.55)' }}
                  >
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// PROCESS SECTION — Horizontal numbered steps with connecting lines
// ═══════════════════════════════════════════════════════════════════════
function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const steps = [
    { num: '01', title: 'Describe', desc: 'Tell us your challenge in a few lines. No forms, no friction.' },
    { num: '02', title: 'Match', desc: 'AI matches you with a verified expert. Credentials checked, quality assured.' },
    { num: '03', title: 'Connect', desc: 'Start a live session — chat, voice, or video. Your choice.' },
    { num: '04', title: 'Act', desc: 'Walk away with documented next steps you can execute immediately.' },
  ]

  return (
    <Section dark>
      {/* Atmospheric background orb */}
      <div
        className="absolute"
        style={{
          bottom: '-20%', left: '50%', transform: 'translateX(-50%)',
          width: '80vw', height: '50vh',
          background: 'radial-gradient(ellipse at center, rgba(201,168,110,0.06) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      <div ref={ref} className="relative z-10 px-8 md:px-16 lg:px-24 py-28 md:py-40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE_CINE }}
              className="mb-6"
            >
              <Eyebrow>The Process</Eyebrow>
            </motion.div>
            <SplitTextReveal
              text="From question to clarity."
              delay={0.2}
              className="tracking-[-0.03em]"
              style={{
                fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)',
                lineHeight: 1.1,
                fontWeight: 300,
                color: 'rgba(255,255,255,0.93)',
              }}
            />
          </div>

          {/* Steps — horizontal layout with connecting line */}
          <div className="relative">
            {/* Connecting line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.8, delay: 0.5, ease: EASE_CINE }}
              className="hidden md:block absolute"
              style={{
                top: '36px',
                left: '12.5%',
                right: '12.5%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(201,168,110,0.2), rgba(201,168,110,0.2), transparent)',
                transformOrigin: 'left',
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
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
                    className="w-[72px] h-[72px] rounded-full mx-auto mb-6 flex items-center justify-center relative"
                    style={{
                      background: 'rgba(201,168,110,0.06)',
                      border: '1px solid rgba(201,168,110,0.15)',
                    }}
                  >
                    <span
                      className="text-[22px] font-extralight"
                      style={{ color: '#c9a86e' }}
                    >
                      {step.num}
                    </span>
                    {/* Subtle glow on hover */}
                    <div
                      className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500"
                      style={{ boxShadow: '0 0 30px rgba(201,168,110,0.15)' }}
                    />
                  </div>
                  <h3
                    className="text-[18px] font-semibold tracking-[-0.02em] mb-3"
                    style={{ color: 'rgba(255,255,255,0.9)' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[14px] leading-[1.8]"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
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
// TESTIMONIAL / SOCIAL PROOF — Glassmorphic quote cards
// ═══════════════════════════════════════════════════════════════════════
function TestimonialSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const quotes = [
    {
      text: 'One 20-minute session saved me weeks of research. The expert didn\'t just answer my question — they reframed how I thought about the problem.',
      author: 'Arjun M.',
      role: 'Product Manager, Bangalore',
    },
    {
      text: 'I\'ve been consulting for 15 years. FlyHigh gave me a way to share that experience on my own terms, with people who genuinely need it.',
      author: 'Priya S.',
      role: 'Financial Advisor, Mumbai',
    },
    {
      text: 'The matching was eerily accurate. Within minutes I was talking to someone who had dealt with exactly my situation. Game-changing.',
      author: 'Karthik R.',
      role: 'Startup Founder, Hyderabad',
    },
  ]

  return (
    <Section dark={false}>
      {/* Subtle warm radial glow */}
      <div
        className="absolute"
        style={{
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '80vw', height: '60vh',
          background: 'radial-gradient(ellipse at center, rgba(201,168,110,0.05) 0%, transparent 70%)',
        }}
      />

      <div ref={ref} className="relative z-10 px-8 md:px-16 lg:px-24 py-28 md:py-40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE_CINE }}
              className="mb-6"
            >
              <Eyebrow light={false}>Voices</Eyebrow>
            </motion.div>
            <SplitTextReveal
              text="What early users are saying."
              delay={0.2}
              className="tracking-[-0.03em]"
              style={{
                fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)',
                lineHeight: 1.1,
                fontWeight: 300,
                color: '#2a2218',
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quotes.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 35 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: EASE_CINE }}
                className="relative p-8 rounded-2xl group transition-all duration-500"
                style={{
                  background: 'linear-gradient(165deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 100%)',
                  border: '1px solid rgba(42,34,24,0.06)',
                  backdropFilter: 'blur(12px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,110,0.25)'
                  e.currentTarget.style.boxShadow = '0 12px 48px rgba(201,168,110,0.1)'
                  e.currentTarget.style.transform = 'translateY(-6px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(42,34,24,0.06)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Opening quote mark */}
                <div
                  className="text-[48px] font-light leading-none mb-4"
                  style={{ color: 'rgba(201,168,110,0.3)' }}
                >
                  &ldquo;
                </div>
                <p
                  className="text-[15px] leading-[1.8] mb-8"
                  style={{ color: 'rgba(42,34,24,0.65)' }}
                >
                  {q.text}
                </p>
                <div style={{ borderTop: '1px solid rgba(42,34,24,0.06)', paddingTop: '16px' }}>
                  <div className="text-[14px] font-semibold" style={{ color: '#2a2218' }}>
                    {q.author}
                  </div>
                  <div className="text-[12px]" style={{ color: 'rgba(42,34,24,0.4)' }}>
                    {q.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// FAQ SECTION — Accordion with premium transitions
// ═══════════════════════════════════════════════════════════════════════
function FAQSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    { q: 'When will the platform launch?', a: 'We are iterating with early users and experts. Join the waitlist to get launch updates and early access.' },
    { q: 'How are experts verified?', a: 'Every expert undergoes category-specific credential checks, background verification, and ongoing quality monitoring through user ratings.' },
    { q: 'Is this powered entirely by AI?', a: 'AI handles matching and optimization. Expert guidance is always human-led, accountable, and personal.' },
    { q: 'What does a session look like?', a: 'You choose the format — chat, voice, or video. Sessions are focused, time-bounded, and conclude with documented next steps.' },
    { q: 'How much will it cost?', a: 'Pricing varies by field and session type. We are designing a model that keeps guidance accessible while fairly compensating experts.' },
  ]

  return (
    <Section dark>
      <div ref={ref} className="relative z-10 px-8 md:px-16 lg:px-24 py-28 md:py-40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE_CINE }}
              className="mb-6"
            >
              <Eyebrow>FAQ</Eyebrow>
            </motion.div>
            <SplitTextReveal
              text="Common questions, clear answers."
              delay={0.2}
              className="tracking-[-0.03em]"
              style={{
                fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)',
                lineHeight: 1.1,
                fontWeight: 300,
                color: 'rgba(255,255,255,0.93)',
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
                    background: isOpen ? 'rgba(201,168,110,0.06)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isOpen ? 'rgba(201,168,110,0.15)' : 'rgba(255,255,255,0.06)'}`,
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-7 py-6 text-left transition-colors duration-300"
                  >
                    <span
                      className="text-[16px] font-semibold tracking-[-0.01em] pr-4"
                      style={{ color: isOpen ? '#c9a86e' : 'rgba(255,255,255,0.8)' }}
                    >
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: EASE_UI }}
                      className="flex-shrink-0"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M9 4v10M4 9h10" stroke="#c9a86e" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </motion.div>
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
                          <p className="text-[14px] leading-[1.9]" style={{ color: 'rgba(255,255,255,0.45)' }}>
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
    <Section dark={false} id="waitlist">
      {/* Atmospheric golden orb */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute"
          style={{
            top: '30%', left: '50%', transform: 'translateX(-50%)',
            width: '70vw', height: '50vh',
            background: 'radial-gradient(ellipse at center, rgba(201,168,110,0.08) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div ref={ref} className="relative z-10 px-8 md:px-16 lg:px-24 py-28 md:py-44 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_CINE }}
          className="mb-6"
        >
          <Eyebrow light={false}>Early Access</Eyebrow>
        </motion.div>

        <SplitTextReveal
          text="The future of guidance starts here."
          delay={0.2}
          className="max-w-4xl mx-auto tracking-[-0.03em] mb-8"
          style={{
            fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
            lineHeight: 1.05,
            fontWeight: 250,
            color: '#2a2218',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE_CINE }}
          className="max-w-lg mx-auto mb-14"
          style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(42,34,24,0.5)' }}
        >
          We are building something that has never existed before.
          Join the founding community of users and experts.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE_CINE }}
          className="flex items-center justify-center gap-5 flex-wrap"
        >
          <MagneticButton
            href="mailto:info@trinade.com?subject=Early%20Access"
            variant="primary"
            className="!bg-[#2a2218] !text-[#f2ede6]"
          >
            Join the Waitlist
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
          <MagneticButton
            href="mailto:info@trinade.com?subject=Expert%20Application"
            variant="secondary"
            className="!border-[rgba(42,34,24,0.15)] !text-[rgba(42,34,24,0.6)]"
          >
            Apply as Expert
          </MagneticButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2, ease: EASE_CINE }}
          className="mt-12"
          style={{ fontSize: '13px', color: 'rgba(42,34,24,0.3)' }}
        >
          Or reach us directly at{' '}
          <a href="mailto:info@trinade.com" style={{ color: '#c9a86e', textDecoration: 'none' }}>
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
export default function NewProductExperimentContent() {
  return (
    <div data-dark-section>
      <HeroSection />
      <NarrativeSection />
      <BentoSection />
      <ProcessSection />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
    </div>
  )
}
