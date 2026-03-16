'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import Link from 'next/link'

// ═══════════════════════════════════════════════════════════
// FLYHIGH — Dedicated Product Page
// Expert consultation marketplace — premium editorial layout
// Charcoal/Cream/Gold design system
// ═══════════════════════════════════════════════════════════

const EASE = [0.16, 1, 0.3, 1] as const

const FEATURES = [
  {
    title: 'Multi-Mode Communication',
    desc: 'Chat, voice calls, and video sessions with screen sharing — choose the format that fits your query.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 9a4 4 0 014-4h16a4 4 0 014 4v10a4 4 0 01-4 4h-8l-5 5v-5H8a4 4 0 01-4-4V9z" stroke="#c9a86e" strokeWidth="1.5" />
        <circle cx="12" cy="14" r="1.2" fill="#c9a86e" />
        <circle cx="16" cy="14" r="1.2" fill="#c9a86e" />
        <circle cx="20" cy="14" r="1.2" fill="#c9a86e" />
      </svg>
    ),
  },
  {
    title: 'Domain Expert Network',
    desc: 'Verified specialists across IT, healthcare, legal, finance, agriculture, career counseling, and 10+ professional domains.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="9" r="3.5" stroke="#c9a86e" strokeWidth="1.5" />
        <circle cx="7" cy="22" r="3" stroke="#c9a86e" strokeWidth="1.5" />
        <circle cx="25" cy="22" r="3" stroke="#c9a86e" strokeWidth="1.5" />
        <path d="M13 12l-4 7M19 12l4 7M10 22h12" stroke="#c9a86e" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
  },
  {
    title: 'Flexible Pricing Models',
    desc: 'Per-day, monthly, or yearly plans. Pay per session or subscribe — solutions starting from just ₹500.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="7" width="24" height="18" rx="3" stroke="#c9a86e" strokeWidth="1.5" />
        <path d="M4 13h24" stroke="#c9a86e" strokeWidth="1" opacity="0.3" />
        <circle cx="21" cy="20" r="2.5" stroke="#c9a86e" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: 'Secure Razorpay Payments',
    desc: 'Staged disbursement protects both parties. Full refund guarantee if the consultation doesn\'t meet your standards.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 3L6 8v7c0 6.4 4.4 12.4 10 14 5.6-1.6 10-7.6 10-14V8L16 3z" stroke="#c9a86e" strokeWidth="1.5" />
        <path d="M11 16l4 4 6-6" stroke="#c9a86e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Transparent Ratings',
    desc: 'Expert rankings based on real user feedback. Verified reviews ensure you always find the right specialist.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4l3 9h9l-7.3 5.3 2.8 8.7L16 21.6l-7.5 5.4 2.8-8.7L4 13h9l3-9z" stroke="#c9a86e" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: 'Quality Assurance',
    desc: 'Trinade monitors every session. Not satisfied? We arrange a replacement expert at no extra cost.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="#c9a86e" strokeWidth="1.5" />
        <path d="M11 16l4 4 6-6" stroke="#c9a86e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const DOMAINS = [
  'Information Technology',
  'Healthcare & Medicine',
  'Legal Advisory',
  'Financial Planning',
  'Agriculture',
  'Career Counseling',
  'Real Estate',
  'Education',
  'Business Strategy',
  'Mental Wellness',
]

const STATS = [
  { value: '10+', label: 'Expert Domains', suffix: '' },
  { value: '3', label: 'Communication Modes', suffix: '' },
  { value: '₹500', label: 'Starting Rate / Day', suffix: '' },
  { value: '100%', label: 'Refund Guarantee', suffix: '' },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Choose Your Domain', desc: 'Browse 10+ professional categories and find verified experts in your field of need.' },
  { step: '02', title: 'Book a Session', desc: 'Select your preferred mode — chat, voice, or video — and pick a time that works.' },
  { step: '03', title: 'Get Expert Solutions', desc: 'Connect in real-time with your specialist. Pay securely only when you\'re satisfied.' },
]

// ─── Shared Components ──────────────────────────────────

function Grain({ opacity = 0.035 }: { opacity?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10" style={{ opacity, mixBlendMode: 'multiply' }}>
      <svg width="100%" height="100%">
        <filter id="grain-fh">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-fh)" />
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

// ─── Hero Section ────────────────────────────────────────

function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '100vh', background: '#f2ede6' }}
    >
      <Grain opacity={0.03} />

      {/* Atmospheric orb */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: '70%',
          height: '60%',
          top: '15%',
          left: '15%',
          background: 'radial-gradient(ellipse at center, rgba(201,168,110,0.07) 0%, transparent 60%)',
        }}
      />

      {/* FLYHIGH watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.025 } : {}}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="pointer-events-none absolute select-none"
        style={{
          fontSize: 'clamp(8rem, 20vw, 24rem)',
          fontWeight: 800,
          color: '#2a2218',
          letterSpacing: '-0.04em',
          lineHeight: 0.85,
        }}
      >
        FLYHIGH
      </motion.div>

      <div className="relative z-20 flex flex-col items-center text-center px-8" style={{ maxWidth: 900 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        >
          <GoldPill>CONSULTATION PLATFORM</GoldPill>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          style={{
            fontSize: 'clamp(3rem, 7vw, 7rem)',
            fontWeight: 300,
            color: '#2a2218',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginTop: 28,
          }}
        >
          FlyHigh
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          style={{
            fontSize: 'clamp(16px, 1.3vw, 20px)',
            fontWeight: 400,
            color: '#2a2218',
            opacity: 0.55,
            lineHeight: 1.8,
            marginTop: 24,
            maxWidth: 600,
          }}
        >
          Expert solutions, one conversation away. A marketplace connecting users with
          verified domain experts across every professional field.
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
          <span style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2a2218' }}>
            Discover
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 1, height: 24, background: 'rgba(201,168,110,0.4)' }}
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
      data-dark-section
      style={{
        background: '#0a0a0a',
        padding: 'clamp(60px, 10vh, 120px) clamp(32px, 6vw, 120px)',
      }}
    >
      <Grain opacity={0.04} />

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
                color: 'rgba(255,255,255,0.4)',
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

      {/* Atmospheric orb */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: '50%',
          height: '50%',
          top: '20%',
          left: '25%',
          background: 'radial-gradient(ellipse at center, rgba(201,168,110,0.06) 0%, transparent 70%)',
        }}
      />

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
            Three steps to expert guidance
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
              {/* Step number */}
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

              {/* Connector line between cards */}
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

      {/* Atmospheric orb */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: '50%',
          height: '60%',
          top: '10%',
          right: '5%',
          background: 'radial-gradient(ellipse at center, rgba(139,164,184,0.05) 0%, transparent 70%)',
        }}
      />

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
            Built for meaningful connections
          </h2>
          <p
            style={{
              fontSize: 'clamp(15px, 1.2vw, 17px)',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.8,
              marginTop: 16,
              maxWidth: 560,
            }}
          >
            Every feature designed to bridge the gap between knowledge seekers
            and verified domain experts.
          </p>
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

// ─── Domain Expertise Grid ─────────────────────────────────

function DomainsSection() {
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
          <GoldPill>DOMAINS</GoldPill>
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
            Expertise across every field
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {DOMAINS.map((domain, i) => (
            <motion.div
              key={domain}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: EASE }}
              whileHover={{
                y: -2,
                background: 'rgba(201,168,110,0.12)',
                borderColor: 'rgba(201,168,110,0.3)',
              }}
              style={{
                padding: 'clamp(16px, 2vw, 24px)',
                background: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: 16,
                textAlign: 'center',
                fontSize: 14,
                fontWeight: 500,
                color: '#2a2218',
                letterSpacing: '-0.01em',
                transition: 'all 0.3s ease',
              }}
            >
              {domain}
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
      data-dark-section
      style={{
        background: '#1a1a1e',
        padding: 'clamp(80px, 14vh, 180px) clamp(32px, 6vw, 120px)',
      }}
    >
      <Grain opacity={0.04} />

      {/* Atmospheric orb */}
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
          <GoldPill>GET STARTED</GoldPill>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.93)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginTop: 28,
          }}
        >
          Ready for expert guidance?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.8,
            marginTop: 20,
            maxWidth: 480,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Connect with verified domain experts and get real-time solutions.
          Start a conversation today.
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
              background: 'linear-gradient(135deg, #c9a86e 0%, #a0814a 100%)',
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
              color: 'rgba(255,255,255,0.7)',
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.12)',
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

export default function FlyHighContent() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <DomainsSection />
      <CTASection />
    </main>
  )
}
