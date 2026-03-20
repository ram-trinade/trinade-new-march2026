'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

// ═══════════════════════════════════════════════════════════════════════
// SLEEP ALERT DEVICE — PRODUCT PAGE
// Awwwards-quality showcase: nocturnal guardian aesthetic
// Charcoal/cream/gold palette with night-driving atmosphere
// ═══════════════════════════════════════════════════════════════════════

const EASE_CINE = [0.16, 1, 0.3, 1] as const
const EASE_TEXT = [0.22, 1, 0.36, 1] as const

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
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.2em',
        textTransform: 'uppercase' as const,
        color: '#c9a86e',
        padding: '6px 18px',
        borderRadius: '100px',
        background: 'rgba(201,168,110,0.08)',
        border: '1px solid rgba(201,168,110,0.15)',
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
            ease: EASE_TEXT,
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ═══════════════════════════════════════════════════════════════════════
function HeroSection() {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ background: '#0a0a0a' }}
    >
      {/* Atmospheric gradient orbs — nocturnal gold */}
      <div
        className="absolute"
        style={{
          top: '20%',
          left: '25%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(201,168,110,0.12) 0%, transparent 65%)',
          filter: 'blur(100px)',
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: '10%',
          right: '20%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(201,168,110,0.06) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Subtle radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
        }}
      />
      <GrainOverlay opacity={0.04} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE_CINE }}
        >
          <GoldPill>Sleep Alert Device</GoldPill>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: EASE_CINE }}
          className="mt-10 tracking-[-0.04em] leading-[0.95]"
          style={{
            fontSize: 'clamp(3.2rem, 7.5vw, 7rem)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.93)',
          }}
        >
          Your Smart Co‑Driver,{' '}
          <span style={{ color: '#c9a86e' }}>
            to Keep You Safe
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: EASE_CINE }}
          className="mt-8 mx-auto"
          style={{
            fontSize: 'clamp(16px, 1.3vw, 20px)',
            fontWeight: 400,
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.45)',
            maxWidth: '640px',
          }}
        >
          An intelligent fatigue monitoring system that watches for drowsiness
          and triggers a clear alert — so you stay focused on the road.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease: EASE_CINE }}
          className="mt-12 flex items-center justify-center gap-5"
        >
          <a
            href="/contact"
            className="group inline-flex items-center gap-3 transition-all duration-500"
            style={{
              padding: '14px 36px',
              borderRadius: '100px',
              background: 'linear-gradient(135deg, #c9a86e, #a0814a)',
              color: '#0a0a0a',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase' as const,
              textDecoration: 'none',
            }}
          >
            Talk to Trinade
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-[3px]">
              <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center transition-all duration-400"
            style={{
              padding: '14px 32px',
              borderRadius: '100px',
              border: '1px solid rgba(201,168,110,0.25)',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.04em',
              textDecoration: 'none',
            }}
          >
            How It Works
          </a>
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
// SECTION 2 — THE SILENT DANGER (Problem/Insight)
// ═══════════════════════════════════════════════════════════════════════
function ProblemSection() {
  const stats = [
    { value: '1 in 25', label: 'adults report falling asleep at the wheel in the past 30 days' },
    { value: '100,000+', label: 'crashes annually are caused by drowsy driving' },
    { value: '3 sec', label: 'of microsleep at 100km/h covers the length of a football field' },
  ]

  return (
    <section
      className="relative py-32 overflow-hidden"
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
              color: 'rgba(42,34,24,0.55)',
              maxWidth: '560px',
            }}
          >
            Late-night drives, early mornings, and long routes can reduce alertness
            without warning. When fatigue sets in, reaction time drops and the road
            becomes unforgiving.
          </motion.p>
        </RevealSection>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <RevealSection key={i} delay={0.15 * i}>
              <div
                className="text-center p-10 rounded-2xl transition-all duration-500 hover:shadow-lg"
                style={{
                  background: 'rgba(255,255,255,0.55)',
                  border: '1px solid rgba(42,34,24,0.06)',
                }}
              >
                <div
                  style={{
                    fontSize: 'clamp(2.4rem, 4vw, 3.2rem)',
                    fontWeight: 300,
                    color: '#c9a86e',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="mt-4"
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.7,
                    color: 'rgba(42,34,24,0.5)',
                    fontWeight: 400,
                  }}
                >
                  {stat.label}
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
// SECTION 3 — HOW IT WORKS (Step Flow)
// ═══════════════════════════════════════════════════════════════════════
function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Detect',
      desc: 'An in-cabin camera identifies the driver\'s face and locks onto eye position in real time.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="10" stroke="rgba(201,168,110,0.5)" strokeWidth="1" />
          <circle cx="16" cy="16" r="4" fill="rgba(201,168,110,0.3)" />
          <path d="M6 16c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="rgba(201,168,110,0.3)" strokeWidth="1" />
        </svg>
      ),
    },
    {
      num: '02',
      title: 'Track',
      desc: 'The system continuously monitors eye openness, measuring blink patterns and closure duration.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M4 16s5-8 12-8 12 8 12 8-5 8-12 8-12-8-12-8z" stroke="rgba(201,168,110,0.5)" strokeWidth="1" />
          <circle cx="16" cy="16" r="4" stroke="rgba(201,168,110,0.5)" strokeWidth="1" />
          <circle cx="16" cy="16" r="1.5" fill="rgba(201,168,110,0.4)" />
        </svg>
      ),
    },
    {
      num: '03',
      title: 'Alert',
      desc: 'When eye-closure crosses a configurable threshold, an audible alarm activates instantly.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 4v4M16 24v4M8 16H4M28 16h-4" stroke="rgba(201,168,110,0.5)" strokeWidth="1" />
          <circle cx="16" cy="16" r="6" stroke="rgba(201,168,110,0.5)" strokeWidth="1" />
          <circle cx="16" cy="16" r="2" fill="rgba(201,168,110,0.4)" />
          <path d="M10 10l2 2M20 20l2 2M10 22l2-2M20 10l2 2" stroke="rgba(201,168,110,0.3)" strokeWidth="1" />
        </svg>
      ),
    },
    {
      num: '04',
      title: 'Resume',
      desc: 'Once eyes reopen, the alert stops and seamless background monitoring continues throughout the trip.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M8 16a8 8 0 1116 0" stroke="rgba(201,168,110,0.5)" strokeWidth="1" />
          <path d="M24 16a8 8 0 01-16 0" stroke="rgba(201,168,110,0.3)" strokeWidth="1" strokeDasharray="3 3" />
          <polygon points="20,12 26,16 20,20" fill="rgba(201,168,110,0.3)" />
        </svg>
      ),
    },
  ]

  return (
    <section
      id="how-it-works"
      className="relative py-32 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Atmospheric glow */}
      <div
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '900px',
          background: 'radial-gradient(circle, rgba(201,168,110,0.05) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />
      <GrainOverlay opacity={0.04} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <RevealSection className="text-center mb-20">
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

        {/* Steps — vertical flow with connecting line */}
        <div className="relative max-w-[700px] mx-auto">
          {/* Connecting line */}
          <motion.div
            className="absolute left-[28px] top-0 bottom-0 w-[1px]"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.3, ease: EASE_CINE }}
            style={{
              background: 'linear-gradient(180deg, rgba(201,168,110,0.3), rgba(201,168,110,0.05))',
              transformOrigin: 'top',
            }}
          />

          {steps.map((step, i) => (
            <RevealSection key={i} delay={0.15 * i} className="relative mb-16 last:mb-0">
              <div className="flex items-start gap-8 pl-0">
                {/* Number circle */}
                <div
                  className="relative flex-shrink-0 w-[56px] h-[56px] rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(201,168,110,0.08)',
                    border: '1px solid rgba(201,168,110,0.15)',
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

                {/* Content */}
                <div className="pt-2">
                  <div className="flex items-center gap-4 mb-3">
                    {step.icon}
                    <h3
                      style={{
                        fontSize: '24px',
                        fontWeight: 400,
                        color: 'rgba(255,255,255,0.93)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontSize: '15px',
                      lineHeight: 1.8,
                      color: 'rgba(255,255,255,0.4)',
                      maxWidth: '480px',
                    }}
                  >
                    {step.desc}
                  </p>
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
// SECTION 4 — KEY FEATURES
// ═══════════════════════════════════════════════════════════════════════
function FeaturesSection() {
  const features = [
    {
      title: 'Catches the Silent Drift',
      desc: 'Detects unusually prolonged eye-closure patterns that signal the onset of microsleep — before the driver is even aware.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M3 14s4.5-8 11-8 11 8 11 8-4.5 8-11 8-11-8-11-8z" stroke="#c9a86e" strokeWidth="1.2" />
          <circle cx="14" cy="14" r="3.5" stroke="#c9a86e" strokeWidth="1.2" />
        </svg>
      ),
    },
    {
      title: 'Prompts a Quick Reset',
      desc: 'Triggers a clear, audible alert that cuts through fatigue and brings the driver\'s focus back to the road instantly.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 4v7l5 3" stroke="#c9a86e" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="14" cy="14" r="10" stroke="#c9a86e" strokeWidth="1.2" />
        </svg>
      ),
    },
    {
      title: 'Stays in the Background',
      desc: 'Once activated, the system monitors continuously through the entire trip — no interaction needed, no distraction added.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="4" y="8" width="20" height="12" rx="2" stroke="#c9a86e" strokeWidth="1.2" />
          <circle cx="14" cy="14" r="3" stroke="#c9a86e" strokeWidth="1.2" />
          <path d="M4 14h3M21 14h3" stroke="#c9a86e" strokeWidth="1.2" />
        </svg>
      ),
    },
  ]

  return (
    <section
      className="relative py-32 overflow-hidden"
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
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-6 mx-auto"
            style={{
              fontSize: '16px',
              lineHeight: 1.8,
              color: 'rgba(42,34,24,0.55)',
              maxWidth: '520px',
            }}
          >
            Late-night drives, early mornings, and long routes can reduce alertness
            without warning. Sleep Alert adds a practical layer of protection.
          </motion.p>
        </RevealSection>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <RevealSection key={i} delay={0.12 * i}>
              <div
                className="group relative p-10 rounded-2xl transition-all duration-500 h-full"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.35) 100%)',
                  border: '1px solid rgba(42,34,24,0.06)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Hover inner glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: 'linear-gradient(180deg, rgba(201,168,110,0.06) 0%, transparent 60%)',
                  }}
                />
                <div className="relative">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:shadow-md"
                    style={{
                      background: 'rgba(201,168,110,0.08)',
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
                      color: 'rgba(42,34,24,0.5)',
                    }}
                  >
                    {feature.desc}
                  </p>
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
// SECTION 5 — THOUGHTFUL TECHNOLOGY (Values)
// ═══════════════════════════════════════════════════════════════════════
function TechnologySection() {
  const values = [
    {
      title: 'Purpose-First Design',
      desc: 'Built to reduce risk, not add distraction. Every design decision serves the driver\'s safety.',
    },
    {
      title: 'Human Control',
      desc: 'Drivers stay in charge. The device provides timely prompts, not decisions — augmenting awareness, never replacing it.',
    },
    {
      title: 'Clear Boundaries',
      desc: 'Simple behavior, predictable alerts, and responsible use of AI where it adds genuine value.',
    },
  ]

  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Wide atmospheric orb */}
      <div
        className="absolute"
        style={{
          top: '30%',
          right: '-10%',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(201,168,110,0.06) 0%, transparent 55%)',
          filter: 'blur(100px)',
        }}
      />
      <GrainOverlay opacity={0.04} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left — headline */}
          <RevealSection>
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

          {/* Right — values list */}
          <div className="space-y-10 pt-4">
            {values.map((value, i) => (
              <RevealSection key={i} delay={0.15 * i}>
                <div
                  className="pl-8"
                  style={{
                    borderLeft: '1px solid rgba(201,168,110,0.2)',
                  }}
                >
                  <h3
                    className="mb-3"
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
                      color: 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {value.desc}
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
// SECTION 6 — BUILT FOR FLEETS
// ═══════════════════════════════════════════════════════════════════════
function FleetSection() {
  const capabilities = [
    { label: 'Night Routes', desc: 'Optimized for low-light conditions with infrared-compatible monitoring' },
    { label: 'Long Hauls', desc: 'Continuous monitoring through extended duty hours without driver intervention' },
    { label: 'Fleet Scale', desc: 'Pilot-first rollout — validate in a small set of vehicles, then deploy across the fleet' },
  ]

  return (
    <section
      className="relative py-32 overflow-hidden"
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
              color: 'rgba(42,34,24,0.55)',
              maxWidth: '540px',
            }}
          >
            Designed for practical installation and day-to-day operation inside
            vehicles. Start with a pilot, scale with confidence.
          </motion.p>
        </RevealSection>

        {/* Capability cards — horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <RevealSection key={i} delay={0.12 * i}>
              <div
                className="group relative p-8 rounded-2xl transition-all duration-500 text-center"
                style={{
                  background: '#0a0a0a',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(201,168,110,0.08) 0%, transparent 60%)',
                  }}
                />
                <div className="relative">
                  <div
                    className="inline-block mb-5"
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
                      fontSize: '15px',
                      lineHeight: 1.7,
                      color: 'rgba(255,255,255,0.45)',
                    }}
                  >
                    {cap.desc}
                  </p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>

        {/* Pilot CTA */}
        <RevealSection className="text-center mt-16" delay={0.3}>
          <div
            className="inline-block p-8 rounded-2xl"
            style={{
              background: 'rgba(201,168,110,0.06)',
              border: '1px solid rgba(201,168,110,0.12)',
            }}
          >
            <p
              style={{
                fontSize: '15px',
                color: 'rgba(42,34,24,0.6)',
                lineHeight: 1.7,
              }}
            >
              <span style={{ fontWeight: 500, color: '#2a2218' }}>Pilot outcome:</span>{' '}
              A clear go/no-go recommendation for broader deployment, with improvement notes.
            </p>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 7 — SPECS
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
      className="relative py-32 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      <GrainOverlay opacity={0.04} />

      <div className="relative z-10 max-w-[900px] mx-auto px-6">
        <RevealSection className="text-center mb-16">
          <GoldPill>Technical</GoldPill>
          <h2
            className="mt-8"
            style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
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
                className="flex items-center justify-between py-5 transition-colors duration-300"
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase' as const,
                    color: 'rgba(255,255,255,0.35)',
                  }}
                >
                  {spec.label}
                </span>
                <span
                  style={{
                    fontSize: '15px',
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.7)',
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
// SECTION 8 — CTA
// ═══════════════════════════════════════════════════════════════════════
function CTASection() {
  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{ background: '#f2ede6' }}
    >
      {/* Atmospheric orb */}
      <div
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(201,168,110,0.08) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />
      <GrainOverlay opacity={0.02} />

      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        <RevealSection>
          <GoldRule />
          <WordReveal
            text="Stay alert. Stay alive."
            className="mt-10"
            style={{
              fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)',
              fontWeight: 300,
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
              color: 'rgba(42,34,24,0.55)',
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
            <a
              href="/contact"
              className="group inline-flex items-center gap-3 transition-all duration-500 hover:shadow-lg"
              style={{
                padding: '16px 40px',
                borderRadius: '100px',
                background: 'linear-gradient(135deg, #c9a86e, #a0814a)',
                color: '#0a0a0a',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase' as const,
                textDecoration: 'none',
              }}
            >
              Talk to Trinade
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-[3px]">
                <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
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
