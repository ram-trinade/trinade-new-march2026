'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'motion/react'
import Link from 'next/link'

// ═══════════════════════════════════════════════════════════════════════
// SLEEP ALERT DEVICE — PRODUCT PAGE
// Awwwards-quality showcase: "Nocturnal Intelligence" aesthetic
// Cinematic, tech-forward, SaaS product page with meaningful motion
// ═══════════════════════════════════════════════════════════════════════

const EASE_CINE = [0.16, 1, 0.3, 1] as const
const EASE_OUT = [0.22, 1, 0.36, 1] as const

// ─── Grain Overlay ───
function GrainOverlay({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
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

// ─── Gold Eyebrow Pill ───
function GoldPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block"
      style={{
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.22em',
        textTransform: 'uppercase' as const,
        color: '#c9a86e',
        padding: '7px 20px',
        borderRadius: '100px',
        background: 'rgba(201,168,110,0.08)',
        border: '1px solid rgba(201,168,110,0.18)',
      }}
    >
      {children}
    </span>
  )
}

// ─── Gold Rule Divider ───
function GoldRule() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : {}}
      transition={{ duration: 1.2, ease: EASE_CINE }}
      style={{
        width: '80px',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,110,0.5), transparent)',
        transformOrigin: 'center',
        margin: '0 auto',
      }}
    />
  )
}

// ─── Animated Section Wrapper ───
function RevealSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: EASE_CINE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Staggered Word Reveal ───
function WordReveal({
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
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const words = text.split(' ')

  return (
    <div ref={ref} className={className} style={{ ...style, overflow: 'hidden' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.06,
            ease: EASE_OUT,
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

// ─── Animated Counter ───
function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    if (!inView) return
    // Extract numeric part
    const numericMatch = value.match(/[\d.]+/)
    if (!numericMatch) {
      setDisplayValue(value)
      return
    }
    const target = parseFloat(numericMatch[0])
    const prefix = value.slice(0, numericMatch.index)
    const rest = value.slice((numericMatch.index || 0) + numericMatch[0].length)
    const isFloat = numericMatch[0].includes('.')
    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * target
      const formatted = isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString()
      setDisplayValue(prefix + formatted + rest)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [inView, value])

  return <span ref={ref}>{displayValue}{suffix}</span>
}

// ─── 3D Tilt Card ───
function TiltCard({
  children,
  className = '',
  style = {},
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], [4, -4])
  const rotateY = useTransform(x, [-0.5, 0.5], [-4, 4])
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }, [x, y])

  const handleLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 800,
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}


// ═══════════════════════════════════════════════════════════════════════
// SECTION 1 — HERO with radar scanning animation
// ═══════════════════════════════════════════════════════════════════════
function HeroSection() {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ background: '#0a0a0a' }}
    >
      {/* Animated radar rings — pulsing outward from center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${200 + i * 180}px`,
              height: `${200 + i * 180}px`,
              border: '1px solid rgba(201,168,110,0.06)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.15, 0],
              scale: [0.9, 1.1, 1.3],
            }}
            transition={{
              duration: 4,
              delay: i * 0.8,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
        {/* Static ring grid for depth */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={`static-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${150 + i * 160}px`,
              height: `${150 + i * 160}px`,
              border: `1px solid rgba(201,168,110,${0.04 - i * 0.005})`,
            }}
          />
        ))}
      </div>

      {/* Scanning sweep line — rotates 360° */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          top: '50%',
          left: '50%',
          marginTop: '-250px',
          marginLeft: '-250px',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '250px',
            height: '2px',
            transformOrigin: 'left center',
            background: 'linear-gradient(90deg, rgba(201,168,110,0.3), transparent)',
          }}
        />
      </motion.div>

      {/* Central glow */}
      <div
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(201,168,110,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Atmospheric gradient orbs */}
      <div
        className="absolute"
        style={{
          top: '15%',
          left: '20%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(201,168,110,0.08) 0%, transparent 65%)',
          filter: 'blur(120px)',
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: '10%',
          right: '15%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(201,168,110,0.05) 0%, transparent 60%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)',
        }}
      />
      <GrainOverlay opacity={0.04} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE_CINE }}
        >
          <GoldPill>Sleep Alert Device</GoldPill>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6, ease: EASE_CINE }}
          className="mt-10 tracking-[-0.04em] leading-[0.92]"
          style={{
            fontSize: 'clamp(3.2rem, 8vw, 7.5rem)',
            fontWeight: 200,
            color: 'rgba(255,255,255,0.93)',
          }}
        >
          Your Smart Co‑Driver,{' '}
          <br className="hidden md:block" />
          <motion.span
            style={{ color: '#c9a86e' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
          >
            to Keep You Safe
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0, ease: EASE_CINE }}
          className="mt-8 mx-auto"
          style={{
            fontSize: 'clamp(16px, 1.3vw, 20px)',
            fontWeight: 400,
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.4)',
            maxWidth: '600px',
          }}
        >
          An intelligent fatigue monitoring system that watches for drowsiness
          and triggers a clear alert — so you stay focused on the road.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4, ease: EASE_CINE }}
          className="mt-12 flex items-center justify-center gap-5"
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 overflow-hidden transition-all duration-500"
            style={{
              padding: '14px 36px',
              borderRadius: '100px',
              background: 'linear-gradient(135deg, #c9a86e, #a0814a)',
              color: '#0a0a0a',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              textDecoration: 'none',
            }}
          >
            {/* Shine sweep */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
              }}
            />
            <span className="relative">Talk to Trinade</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="relative transition-transform duration-300 group-hover:translate-x-[3px]">
              <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center transition-all duration-500 hover:border-[rgba(201,168,110,0.5)]"
            style={{
              padding: '14px 32px',
              borderRadius: '100px',
              border: '1px solid rgba(201,168,110,0.2)',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.04em',
              textDecoration: 'none',
            }}
          >
            How It Works
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
              Scroll
            </span>
            <div style={{ width: '1px', height: '24px', background: 'linear-gradient(180deg, rgba(201,168,110,0.3), transparent)' }} />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gold rule fade */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1.5 }}
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 10%, rgba(201,168,110,0.2) 50%, transparent 90%)',
        }}
      />
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 2 — THE SILENT DANGER (Problem/Insight) with counters
// ═══════════════════════════════════════════════════════════════════════
function ProblemSection() {
  const stats = [
    { value: '1 in 25', label: 'adults report falling asleep at the wheel in the past 30 days' },
    { value: '100,000', suffix: '+', label: 'crashes annually are caused by drowsy driving' },
    { value: '3 sec', label: 'of microsleep at 100km/h covers the length of a football field' },
  ]

  return (
    <section
      className="relative py-32 lg:py-40 overflow-hidden"
      style={{ background: '#f2ede6' }}
    >
      <GrainOverlay opacity={0.02} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <RevealSection className="text-center mb-20">
          <GoldPill>The Silent Danger</GoldPill>
          <WordReveal
            text="A few seconds of microsleep can change everything"
            className="mt-8"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#2a2218',
            }}
            delay={0.2}
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-6 mx-auto"
            style={{
              fontSize: '16px',
              lineHeight: 1.8,
              color: 'rgba(42,34,24,0.5)',
              maxWidth: '560px',
            }}
          >
            Late-night drives, early mornings, and long routes can reduce alertness
            without warning. When fatigue sets in, reaction time drops and the road
            becomes unforgiving.
          </motion.p>
        </RevealSection>

        {/* Stats grid with animated counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <RevealSection key={i} delay={0.15 * i}>
              <TiltCard
                className="text-center p-10 lg:p-12 rounded-2xl cursor-default group"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 100%)',
                  border: '1px solid rgba(42,34,24,0.06)',
                  backdropFilter: 'blur(12px)',
                  transition: 'box-shadow 0.5s ease, border-color 0.5s ease',
                }}
              >
                {/* Hover top glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, rgba(201,168,110,0.08) 0%, transparent 50%)',
                  }}
                />
                <div
                  className="relative"
                  style={{
                    fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
                    fontWeight: 200,
                    color: '#c9a86e',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div
                  className="mt-5"
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.7,
                    color: 'rgba(42,34,24,0.45)',
                    fontWeight: 400,
                  }}
                >
                  {stat.label}
                </div>
              </TiltCard>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 3 — HOW IT WORKS (Horizontal timeline)
// ═══════════════════════════════════════════════════════════════════════
function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Detect',
      desc: 'An in-cabin camera identifies the driver\'s face and locks onto eye position in real time.',
    },
    {
      num: '02',
      title: 'Track',
      desc: 'The system continuously monitors eye openness, measuring blink patterns and closure duration.',
    },
    {
      num: '03',
      title: 'Alert',
      desc: 'When eye-closure crosses a configurable threshold, an audible alarm activates instantly.',
    },
    {
      num: '04',
      title: 'Resume',
      desc: 'Once eyes reopen, the alert stops and seamless background monitoring continues throughout the trip.',
    },
  ]

  const sectionRef = useRef<HTMLDivElement>(null)
  const lineInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="how-it-works"
      className="relative py-32 lg:py-40 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Atmospheric glow */}
      <div
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1000px',
          height: '600px',
          background: 'radial-gradient(ellipse, rgba(201,168,110,0.04) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />
      <GrainOverlay opacity={0.04} />

      <div ref={sectionRef} className="relative z-10 max-w-[1200px] mx-auto px-6">
        <RevealSection className="text-center mb-20 lg:mb-24">
          <GoldPill>How It Works</GoldPill>
          <WordReveal
            text="Intelligent monitoring, instant response"
            className="mt-8"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: 'rgba(255,255,255,0.93)',
            }}
            delay={0.2}
          />
        </RevealSection>

        {/* Horizontal timeline for desktop, vertical for mobile */}
        <div className="relative">
          {/* Connecting line — horizontal on desktop */}
          <motion.div
            className="hidden md:block absolute top-[28px] left-[8%] right-[8%] h-[1px]"
            initial={{ scaleX: 0 }}
            animate={lineInView ? { scaleX: 1 } : {}}
            transition={{ duration: 2, delay: 0.5, ease: EASE_CINE }}
            style={{
              background: 'linear-gradient(90deg, rgba(201,168,110,0.05), rgba(201,168,110,0.25), rgba(201,168,110,0.25), rgba(201,168,110,0.05))',
              transformOrigin: 'left',
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
            {steps.map((step, i) => (
              <RevealSection key={i} delay={0.2 + i * 0.15}>
                <div className="relative text-center md:text-left group">
                  {/* Number circle with pulse */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    {/* Pulse ring on hover */}
                    <div
                      className="absolute w-[56px] h-[56px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        border: '1px solid rgba(201,168,110,0.15)',
                        transform: 'scale(1.4)',
                      }}
                    />
                    <div
                      className="relative w-[56px] h-[56px] rounded-full flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(201,168,110,0.15)]"
                      style={{
                        background: 'rgba(201,168,110,0.08)',
                        border: '1px solid rgba(201,168,110,0.18)',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '14px',
                          fontWeight: 600,
                          color: '#c9a86e',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {step.num}
                      </span>
                    </div>
                  </div>

                  <h3
                    className="mb-3"
                    style={{
                      fontSize: '22px',
                      fontWeight: 400,
                      color: 'rgba(255,255,255,0.93)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.8,
                      color: 'rgba(255,255,255,0.35)',
                      maxWidth: '260px',
                      margin: '0 auto',
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 4 — KEY FEATURES (Bento-style with 3D tilt)
// ═══════════════════════════════════════════════════════════════════════
function FeaturesSection() {
  const features = [
    {
      title: 'Catches the Silent Drift',
      desc: 'Detects unusually prolonged eye-closure patterns that signal the onset of microsleep — before the driver is even aware.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M3 16s5.5-10 13-10 13 10 13 10-5.5 10-13 10S3 16 3 16z" stroke="#c9a86e" strokeWidth="1.2" />
          <circle cx="16" cy="16" r="4" stroke="#c9a86e" strokeWidth="1.2" />
          <circle cx="16" cy="16" r="1.5" fill="#c9a86e" opacity="0.4" />
        </svg>
      ),
      span: 'md:col-span-2', // wide card
    },
    {
      title: 'Prompts a Quick Reset',
      desc: 'Triggers a clear, audible alert that cuts through fatigue and brings the driver\'s focus back to the road instantly.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 4v8l6 3.5" stroke="#c9a86e" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="16" cy="16" r="11" stroke="#c9a86e" strokeWidth="1.2" />
        </svg>
      ),
      span: '',
    },
    {
      title: 'Stays in the Background',
      desc: 'Once activated, the system monitors continuously through the entire trip — no interaction needed, no distraction added.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="8" width="24" height="16" rx="3" stroke="#c9a86e" strokeWidth="1.2" />
          <circle cx="16" cy="16" r="4" stroke="#c9a86e" strokeWidth="1.2" />
          <path d="M4 16h4M24 16h4" stroke="#c9a86e" strokeWidth="1.2" />
        </svg>
      ),
      span: '',
    },
    {
      title: 'Works Day and Night',
      desc: 'Infrared-compatible camera module ensures reliable face detection and eye tracking in any lighting condition — from bright sun to pitch dark tunnels.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="6" stroke="#c9a86e" strokeWidth="1.2" />
          <path d="M16 4v3M16 25v3M4 16h3M25 16h3M8.5 8.5l2 2M21.5 21.5l2 2M8.5 23.5l2-2M21.5 10.5l2-2" stroke="#c9a86e" strokeWidth="1" opacity="0.5" />
        </svg>
      ),
      span: 'md:col-span-2', // wide card
    },
  ]

  return (
    <section
      className="relative py-32 lg:py-40 overflow-hidden"
      style={{ background: '#f2ede6' }}
    >
      <GrainOverlay opacity={0.02} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <RevealSection className="text-center mb-20">
          <GoldPill>Why You&apos;ll Want This</GoldPill>
          <WordReveal
            text="Protection that works while you drive"
            className="mt-8"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#2a2218',
            }}
            delay={0.2}
          />
        </RevealSection>

        {/* Bento grid — 2+1 / 1+2 layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <RevealSection key={i} delay={0.1 * i} className={feature.span}>
              <TiltCard
                className="group relative p-10 lg:p-12 rounded-2xl h-full cursor-default"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.35) 100%)',
                  border: '1px solid rgba(42,34,24,0.06)',
                  backdropFilter: 'blur(16px)',
                  transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
                }}
              >
                {/* Hover gradient glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(201,168,110,0.06) 0%, transparent 50%)',
                  }}
                />
                <div className="relative">
                  {/* Icon box with animated border */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-7 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(201,168,110,0.1)]"
                    style={{
                      background: 'rgba(201,168,110,0.06)',
                      border: '1px solid rgba(201,168,110,0.12)',
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3
                    className="mb-4"
                    style={{
                      fontSize: '20px',
                      fontWeight: 500,
                      color: '#2a2218',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '15px',
                      lineHeight: 1.8,
                      color: 'rgba(42,34,24,0.45)',
                    }}
                  >
                    {feature.desc}
                  </p>
                </div>
              </TiltCard>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 5 — THOUGHTFUL TECHNOLOGY (Values with glowing borders)
// ═══════════════════════════════════════════════════════════════════════
function TechnologySection() {
  const values = [
    {
      num: '01',
      title: 'Purpose-First Design',
      desc: 'Built to reduce risk, not add distraction. Every design decision serves the driver\'s safety.',
    },
    {
      num: '02',
      title: 'Human Control',
      desc: 'Drivers stay in charge. The device provides timely prompts, not decisions — augmenting awareness, never replacing it.',
    },
    {
      num: '03',
      title: 'Clear Boundaries',
      desc: 'Simple behavior, predictable alerts, and responsible use of AI where it adds genuine value.',
    },
  ]

  return (
    <section
      className="relative py-32 lg:py-40 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Atmospheric orb */}
      <div
        className="absolute"
        style={{
          top: '30%',
          right: '-10%',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(201,168,110,0.05) 0%, transparent 55%)',
          filter: 'blur(100px)',
        }}
      />
      <GrainOverlay opacity={0.04} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — headline */}
          <RevealSection className="lg:sticky lg:top-32">
            <GoldPill>Our Approach</GoldPill>
            <WordReveal
              text="Thoughtful technology, carefully introduced into daily life"
              className="mt-8"
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 3rem)',
                fontWeight: 300,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                color: 'rgba(255,255,255,0.93)',
              }}
              delay={0.2}
            />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.6, ease: EASE_CINE }}
              className="mt-8"
              style={{
                width: '60px',
                height: '2px',
                background: 'linear-gradient(90deg, #c9a86e, transparent)',
                transformOrigin: 'left',
              }}
            />
          </RevealSection>

          {/* Right — values cards */}
          <div className="space-y-6">
            {values.map((value, i) => (
              <RevealSection key={i} delay={0.15 * i}>
                <div
                  className="group relative p-8 rounded-2xl transition-all duration-500 cursor-default"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {/* Hover border glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      boxShadow: 'inset 0 0 0 1px rgba(201,168,110,0.15), 0 0 30px rgba(201,168,110,0.05)',
                    }}
                  />
                  <div className="relative flex items-start gap-6">
                    <span
                      className="flex-shrink-0 mt-1"
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'rgba(201,168,110,0.5)',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {value.num}
                    </span>
                    <div>
                      <h3
                        className="mb-3 transition-colors duration-500 group-hover:text-[#c9a86e]"
                        style={{
                          fontSize: '18px',
                          fontWeight: 500,
                          color: 'rgba(255,255,255,0.85)',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {value.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '15px',
                          lineHeight: 1.8,
                          color: 'rgba(255,255,255,0.35)',
                        }}
                      >
                        {value.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 6 — BUILT FOR FLEETS (with gradient border cards)
// ═══════════════════════════════════════════════════════════════════════
function FleetSection() {
  const capabilities = [
    {
      label: 'Night Routes',
      desc: 'Optimized for low-light conditions with infrared-compatible monitoring',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="#c9a86e" strokeWidth="1.2" />
        </svg>
      ),
    },
    {
      label: 'Long Hauls',
      desc: 'Continuous monitoring through extended duty hours without driver intervention',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M12 5l7 7-7 7" stroke="#c9a86e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: 'Fleet Scale',
      desc: 'Pilot-first rollout — validate in a small set of vehicles, then deploy across the fleet',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#c9a86e" strokeWidth="1.2" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="#c9a86e" strokeWidth="1.2" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="#c9a86e" strokeWidth="1.2" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="#c9a86e" strokeWidth="1.2" />
        </svg>
      ),
    },
  ]

  return (
    <section
      className="relative py-32 lg:py-40 overflow-hidden"
      style={{ background: '#f2ede6' }}
    >
      <GrainOverlay opacity={0.02} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <RevealSection className="text-center mb-20">
          <GoldPill>Enterprise</GoldPill>
          <WordReveal
            text="Built for drivers. Ready for fleets."
            className="mt-8"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#2a2218',
            }}
            delay={0.2}
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-6 mx-auto"
            style={{
              fontSize: '16px',
              lineHeight: 1.8,
              color: 'rgba(42,34,24,0.5)',
              maxWidth: '540px',
            }}
          >
            Designed for practical installation and day-to-day operation inside
            vehicles. Start with a pilot, scale with confidence.
          </motion.p>
        </RevealSection>

        {/* Capability cards with gradient border */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {capabilities.map((cap, i) => (
            <RevealSection key={i} delay={0.12 * i}>
              <div
                className="group relative p-[1px] rounded-2xl transition-all duration-700"
                style={{
                  background: 'linear-gradient(135deg, rgba(201,168,110,0.15), rgba(10,10,10,1), rgba(201,168,110,0.1))',
                }}
              >
                {/* Hover gradient shift */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: 'linear-gradient(135deg, rgba(201,168,110,0.35), rgba(10,10,10,1), rgba(201,168,110,0.25))',
                  }}
                />
                <div
                  className="relative p-8 lg:p-10 rounded-[15px] text-center h-full"
                  style={{ background: '#0a0a0a' }}
                >
                  {/* Hover top glow inside card */}
                  <div
                    className="absolute inset-0 rounded-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,110,0.06) 0%, transparent 60%)',
                    }}
                  />
                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-6"
                      style={{
                        background: 'rgba(201,168,110,0.06)',
                        border: '1px solid rgba(201,168,110,0.12)',
                      }}
                    >
                      {cap.icon}
                    </div>
                    <div
                      className="mb-4"
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase' as const,
                        color: '#c9a86e',
                      }}
                    >
                      {cap.label}
                    </div>
                    <p
                      style={{
                        fontSize: '14px',
                        lineHeight: 1.7,
                        color: 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {cap.desc}
                    </p>
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 7 — SPECS (with hover highlight rows)
// ═══════════════════════════════════════════════════════════════════════
function SpecsSection() {
  const specs = [
    { label: 'Processor', value: 'Raspberry Pi 5' },
    { label: 'Camera', value: 'Camera Module 3' },
    { label: 'Alert', value: 'Buzzer Alarm System' },
    { label: 'Power', value: '5.1V 5A via USB' },
    { label: 'Range', value: '1 – 1.5m face detection' },
    { label: 'Support', value: '24h response + 14-day replacement' },
  ]

  return (
    <section
      className="relative py-32 lg:py-40 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      <GrainOverlay opacity={0.04} />

      <div className="relative z-10 max-w-[900px] mx-auto px-6">
        <RevealSection className="text-center mb-16">
          <GoldPill>Technical</GoldPill>
          <h2
            className="mt-8"
            style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              color: 'rgba(255,255,255,0.93)',
            }}
          >
            Under the Hood
          </h2>
        </RevealSection>

        <div className="space-y-0">
          {specs.map((spec, i) => (
            <RevealSection key={i} delay={0.08 * i}>
              <div
                className="group flex items-center justify-between py-6 transition-all duration-400 cursor-default relative"
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {/* Hover background highlight */}
                <div
                  className="absolute inset-0 -mx-4 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'rgba(201,168,110,0.03)',
                  }}
                />
                <span
                  className="relative transition-colors duration-500 group-hover:text-[rgba(201,168,110,0.7)]"
                  style={{
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase' as const,
                    color: 'rgba(255,255,255,0.3)',
                  }}
                >
                  {spec.label}
                </span>
                <span
                  className="relative transition-colors duration-500 group-hover:text-[rgba(255,255,255,0.9)]"
                  style={{
                    fontSize: '15px',
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  {spec.value}
                </span>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 8 — CTA (Dramatic scale)
// ═══════════════════════════════════════════════════════════════════════
function CTASection() {
  return (
    <section
      className="relative py-32 lg:py-40 overflow-hidden"
      style={{ background: '#f2ede6' }}
    >
      {/* Atmospheric orb */}
      <div
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(201,168,110,0.08) 0%, transparent 60%)',
          filter: 'blur(100px)',
        }}
      />
      <GrainOverlay opacity={0.02} />

      <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
        <RevealSection>
          <GoldRule />
          <WordReveal
            text="Stay alert. Stay alive."
            className="mt-10"
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              fontWeight: 200,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: '#2a2218',
            }}
            delay={0.2}
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-6 mx-auto"
            style={{
              fontSize: '16px',
              lineHeight: 1.8,
              color: 'rgba(42,34,24,0.5)',
              maxWidth: '480px',
            }}
          >
            Ready to bring intelligent fatigue monitoring to your fleet?
            Let&apos;s start with a conversation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.8, ease: EASE_CINE }}
            className="mt-10"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden transition-all duration-500 hover:shadow-[0_8px_40px_rgba(201,168,110,0.2)]"
              style={{
                padding: '16px 44px',
                borderRadius: '100px',
                background: 'linear-gradient(135deg, #c9a86e, #a0814a)',
                color: '#0a0a0a',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                textDecoration: 'none',
              }}
            >
              {/* Shine sweep */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                }}
              />
              <span className="relative">Talk to Trinade</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="relative transition-transform duration-300 group-hover:translate-x-[3px]">
                <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </RevealSection>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════
export default function SleepAlertContent() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TechnologySection />
      <FleetSection />
      <SpecsSection />
      <CTASection />
    </main>
  )
}
