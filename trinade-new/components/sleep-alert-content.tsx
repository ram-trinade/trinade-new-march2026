'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import Link from 'next/link'

// ═══════════════════════════════════════════════════════════
// SLEEP ALERT — Dedicated Product Page
// IoT anti-drowsiness device — dark, technical, cinematic
// Charcoal/Cream/Gold design system
// ═══════════════════════════════════════════════════════════

const EASE = [0.16, 1, 0.3, 1] as const

const FEATURES = [
  {
    title: 'Computer Vision Detection',
    desc: 'OpenCV-powered face and eye detection using Camera Module 3. Detects closed eyes within 5-10 seconds with precision.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M2 16s5-10 14-10 14 10 14 10-5 10-14 10S2 16 2 16z" stroke="#c9a86e" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="5" stroke="#c9a86e" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="2" fill="#c9a86e" />
      </svg>
    ),
  },
  {
    title: 'Instant Alert System',
    desc: '15-second buzzer alarm triggers the moment drowsiness is detected. Alarm persists until the driver responds.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 3v3M16 26v3M3 16h3M26 16h3" stroke="#c9a86e" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="16" r="8" stroke="#c9a86e" strokeWidth="1.5" />
        <path d="M16 12v5M16 20v1" stroke="#c9a86e" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Simple Installation',
    desc: 'Mounts near the gear area. Camera on the rear-view mirror at 30-45 degrees. Powered by car USB — starts with the engine.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="4" width="20" height="24" rx="3" stroke="#c9a86e" strokeWidth="1.5" />
        <path d="M11 14h10M11 18h6" stroke="#c9a86e" strokeWidth="1" opacity="0.4" />
        <circle cx="16" cy="9" r="2" stroke="#c9a86e" strokeWidth="1" />
      </svg>
    ),
  },
  {
    title: 'Self-Diagnostic Boot',
    desc: '5-second confirmation beep on startup verifies camera, Raspberry Pi, and buzzer are operational before every drive.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="9" width="24" height="14" rx="3" stroke="#c9a86e" strokeWidth="1.5" />
        <path d="M9 16h4l2-4 3 8 2-4h3" stroke="#c9a86e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Night Driving Support',
    desc: 'Works in low-light conditions with cabin LED illumination. Effective detection range of 1 to 1.5 meters.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M22 18a10 10 0 01-14-8A10 10 0 1022 18z" stroke="#c9a86e" strokeWidth="1.5" />
        <circle cx="23" cy="7" r="1.5" fill="#c9a86e" />
        <circle cx="26" cy="12" r="0.8" fill="#c9a86e" />
      </svg>
    ),
  },
  {
    title: 'Replacement Guarantee',
    desc: 'Faulty device replaced within 14 days. Full setup by our technical team with 24-hour response time.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4l4 4h5v5l4 4-4 4v5h-5l-4 4-4-4H7v-5l-4-4 4-4V8h5l4-4z" stroke="#c9a86e" strokeWidth="1.5" />
        <path d="M12 16l3 3 5-5" stroke="#c9a86e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const STATS = [
  { value: '5s', label: 'Detection Speed' },
  { value: '1.5m', label: 'Effective Range' },
  { value: '24hr', label: 'Support Response' },
  { value: '14d', label: 'Replacement Guarantee' },
]

const TECH_SPECS = [
  { label: 'Processor', value: 'Raspberry Pi 5' },
  { label: 'Camera', value: 'Camera Module 3' },
  { label: 'Detection', value: 'OpenCV (dlib)' },
  { label: 'Alert', value: '15s Buzzer Alarm' },
  { label: 'Power', value: 'Car USB (5V)' },
  { label: 'Range', value: '1 - 1.5 meters' },
  { label: 'Boot Time', value: '~5 seconds' },
  { label: 'Low Light', value: 'LED Illumination' },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Mount & Power',
    desc: 'Install the device near the gear area. Mount the camera on the rear-view mirror. Connect to car USB — it starts with the engine.',
  },
  {
    step: '02',
    title: 'Continuous Monitoring',
    desc: 'The camera tracks your face and eyes in real-time using computer vision. Micro-sleep patterns are detected within 5-10 seconds.',
  },
  {
    step: '03',
    title: 'Instant Alert',
    desc: 'When drowsiness is detected, a 15-second buzzer sounds immediately. The alarm persists until the driver is fully alert.',
  },
]

// ─── Shared Components ──────────────────────────────────

function Grain({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10" style={{ opacity, mixBlendMode: 'multiply' }}>
      <svg width="100%" height="100%">
        <filter id="grain-sa">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-sa)" />
      </svg>
    </div>
  )
}

function GoldPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block rounded-full px-4 py-1.5"
      style={{
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.2em',
        color: '#c9a86e',
        background: 'rgba(201,168,110,0.1)',
        border: '1px solid rgba(201,168,110,0.2)',
      }}
    >
      {children}
    </span>
  )
}

function GoldRule({ width = '60px', delay = 0.3 }: { width?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE }}
      style={{
        width,
        height: 2,
        background: 'linear-gradient(90deg, transparent, #c9a86e, transparent)',
        transformOrigin: 'left',
      }}
    />
  )
}

// ─── Hero Section (Dark, Technical) ────────────────────────

function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center overflow-hidden"
      data-dark-section
      style={{ minHeight: '100vh', background: '#0a0a0a' }}
    >
      <Grain opacity={0.04} />

      {/* Technical grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,168,110,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,110,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Atmospheric glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: '60%',
          height: '60%',
          top: '20%',
          left: '20%',
          background: 'radial-gradient(ellipse at center, rgba(139,164,184,0.06) 0%, transparent 60%)',
        }}
      />

      {/* SLEEP ALERT watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.02 } : {}}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="pointer-events-none absolute select-none"
        style={{
          fontSize: 'clamp(6rem, 16vw, 20rem)',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-0.04em',
          lineHeight: 0.85,
        }}
      >
        ALERT
      </motion.div>

      <div className="relative z-20 flex flex-col items-center text-center px-8" style={{ maxWidth: 900 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        >
          <GoldPill>IOT SAFETY DEVICE</GoldPill>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          style={{
            fontSize: 'clamp(3rem, 7vw, 7rem)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.93)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginTop: 28,
          }}
        >
          Sleep Alert
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          style={{
            fontSize: 'clamp(16px, 1.3vw, 20px)',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.8,
            marginTop: 24,
            maxWidth: 600,
          }}
        >
          Intelligent drowsiness detection that saves lives. Powered by
          computer vision and engineered for the road.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
          style={{
            width: 60,
            height: 2,
            background: 'linear-gradient(90deg, transparent, #c9a86e, transparent)',
            transformOrigin: 'center',
            marginTop: 40,
          }}
        />

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.4 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
            Explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 1, height: 24, background: 'rgba(201,168,110,0.3)' }}
          />
        </motion.div>
      </div>
    </section>
  )
}

// ─── Stats Section ────────────────────────────────────────

function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: '#f2ede6',
        padding: 'clamp(60px, 10vh, 120px) clamp(32px, 6vw, 120px)',
      }}
    >
      <Grain opacity={0.03} />

      <div className="relative z-10 mx-auto grid grid-cols-2 md:grid-cols-4 gap-8" style={{ maxWidth: 1000 }}>
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
            className="text-center"
          >
            <div
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                fontWeight: 200,
                color: '#c9a86e',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginTop: 10,
                color: 'rgba(42,34,24,0.45)',
              }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── Technical Specs ──────────────────────────────────────

function TechSpecsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      data-dark-section
      style={{
        background: '#0a0a0a',
        padding: 'clamp(80px, 12vh, 160px) clamp(32px, 6vw, 120px)',
      }}
    >
      <Grain opacity={0.04} />

      {/* Technical grid bg */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,168,110,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,110,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto" style={{ maxWidth: 900 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-16"
        >
          <GoldPill>SPECIFICATIONS</GoldPill>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.93)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginTop: 24,
            }}
          >
            Under the hood
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TECH_SPECS.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: EASE }}
              style={{
                padding: 'clamp(20px, 2.5vw, 28px)',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: 16,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(201,168,110,0.6)',
                  marginBottom: 8,
                }}
              >
                {spec.label}
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.85)',
                  letterSpacing: '-0.01em',
                }}
              >
                {spec.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── How It Works ─────────────────────────────────────────

function HowItWorksSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: '#f2ede6',
        padding: 'clamp(80px, 12vh, 160px) clamp(32px, 6vw, 120px)',
      }}
    >
      <Grain opacity={0.03} />

      <div className="relative z-10 mx-auto" style={{ maxWidth: 1100 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-16"
        >
          <GoldPill>HOW IT WORKS</GoldPill>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 300,
              color: '#2a2218',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginTop: 24,
            }}
          >
            Protecting drivers, saving lives
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: EASE }}
              className="relative"
              style={{
                padding: 'clamp(32px, 4vw, 48px)',
                background: 'rgba(255,255,255,0.55)',
                border: '1px solid rgba(0,0,0,0.04)',
                borderRadius: 24,
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(4rem, 6vw, 5.5rem)',
                  fontWeight: 200,
                  color: 'rgba(201,168,110,0.12)',
                  lineHeight: 0.85,
                  marginBottom: 20,
                }}
              >
                {item.step}
              </div>

              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: '#2a2218',
                  letterSpacing: '-0.01em',
                  marginBottom: 12,
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: 15,
                  color: 'rgba(42,34,24,0.55)',
                  lineHeight: 1.7,
                }}
              >
                {item.desc}
              </p>

              {i < HOW_IT_WORKS.length - 1 && (
                <div
                  className="hidden md:block absolute"
                  style={{
                    right: -20,
                    top: '40%',
                    width: 40,
                    height: 1,
                    background: 'linear-gradient(90deg, rgba(201,168,110,0.2), rgba(201,168,110,0.05))',
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Features Bento Grid ──────────────────────────────────

function FeaturesSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      data-dark-section
      style={{
        background: '#0a0a0a',
        padding: 'clamp(80px, 12vh, 160px) clamp(32px, 6vw, 120px)',
      }}
    >
      <Grain opacity={0.04} />

      <div className="relative z-10 mx-auto" style={{ maxWidth: 1200 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16"
        >
          <GoldPill>CAPABILITIES</GoldPill>
          <div style={{ marginTop: 20 }}>
            <GoldRule width="60px" delay={0.2} />
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.93)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginTop: 24,
            }}
          >
            Engineered for the road
          </h2>
        </motion.div>

        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}
        >
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: EASE }}
              whileHover={{
                y: -4,
                boxShadow: '0 16px 48px rgba(0,0,0,0.35)',
              }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 20,
                padding: 'clamp(28px, 3vw, 40px)',
                transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: 'rgba(201,168,110,0.08)',
                  border: '1px solid rgba(201,168,110,0.15)',
                  marginBottom: 24,
                }}
              >
                {feature.icon}
              </div>

              <h3
                style={{
                  fontSize: 19,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.93)',
                  letterSpacing: '-0.01em',
                  marginBottom: 10,
                }}
              >
                {feature.title}
              </h3>

              <p
                style={{
                  fontSize: 15,
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.7,
                }}
              >
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Section ──────────────────────────────────────────

function CTASection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: '#f2ede6',
        padding: 'clamp(80px, 14vh, 180px) clamp(32px, 6vw, 120px)',
      }}
    >
      <Grain opacity={0.03} />

      <div
        className="pointer-events-none absolute"
        style={{
          width: '60%',
          height: '60%',
          top: '20%',
          left: '20%',
          background: 'radial-gradient(ellipse at center, rgba(201,168,110,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto text-center" style={{ maxWidth: 700 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <GoldPill>GET IN TOUCH</GoldPill>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            fontWeight: 300,
            color: '#2a2218',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginTop: 28,
          }}
        >
          Protect your fleet today
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          style={{
            fontSize: 16,
            color: 'rgba(42,34,24,0.55)',
            lineHeight: 1.8,
            marginTop: 20,
            maxWidth: 480,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Equip your vehicles with intelligent drowsiness detection.
          Let&apos;s discuss how Sleep Alert can safeguard your drivers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
          className="flex items-center justify-center gap-4 flex-wrap"
          style={{ marginTop: 40 }}
        >
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full px-8 py-4"
            style={{
              background: '#1a1a1e',
              color: '#fff',
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Start a conversation
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4"
            style={{
              background: 'transparent',
              color: '#2a2218',
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid rgba(42,34,24,0.15)',
            }}
          >
            Back to Products
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════

export default function SleepAlertContent() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <TechSpecsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CTASection />
    </main>
  )
}
