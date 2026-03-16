'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import Image from 'next/image'

// ═══════════════════════════════════════════════════════════
// PRODUCTS PAGE — Awwwards-quality showcase for FlyHigh + Sleep Alert
// Split Universe hero, numbered editorial sections, bento grids
// Charcoal/Cream/Gold design system
// ═══════════════════════════════════════════════════════════

const EASE = [0.16, 1, 0.3, 1] as const
const UI_EASE = [0.32, 0.72, 0, 1] as const

// ─── Product Data ───────────────────────────────────────

const FLYHIGH = {
  name: 'FlyHigh',
  tagline: 'Expert solutions, one conversation away.',
  category: 'CONSULTATION PLATFORM',
  description:
    'A marketplace connecting users with verified domain experts across every professional field — from healthcare and legal to agriculture and finance. Get real-time solutions via chat, voice, or video.',
  features: [
    {
      title: 'Multi-Mode Communication',
      desc: 'Chat, voice calls, and video sessions with screen sharing — choose the format that fits your query.',
      icon: 'comm',
    },
    {
      title: 'Domain Expert Network',
      desc: 'Verified specialists across IT, healthcare, legal, finance, agriculture, career counseling, and more.',
      icon: 'network',
    },
    {
      title: 'Flexible Pricing',
      desc: 'Per-day, monthly, or yearly plans. Pay per session or subscribe — solutions starting from just ₹500.',
      icon: 'pricing',
    },
    {
      title: 'Secure Payments',
      desc: 'Razorpay-integrated payments with staged disbursement. Full refund guarantee if unsatisfied.',
      icon: 'secure',
    },
    {
      title: 'Rating & Reviews',
      desc: 'Transparent expert rankings based on real user feedback. Find the right expert, fast.',
      icon: 'rating',
    },
    {
      title: 'Quality Assurance',
      desc: 'Trinade monitors all sessions and manages expert quality. Not satisfied? We arrange a replacement.',
      icon: 'quality',
    },
  ],
  stats: [
    { value: '10+', label: 'Expert Domains' },
    { value: '3', label: 'Communication Modes' },
    { value: '₹500', label: 'Starting Price / Day' },
  ],
}

const SLEEPALERT = {
  name: 'Sleep Alert',
  tagline: 'Intelligent drowsiness detection that saves lives.',
  category: 'IOT SAFETY DEVICE',
  description:
    'A hardware anti-drowsiness system powered by Raspberry Pi and computer vision. Monitors driver alertness in real-time through eye-tracking and triggers an alarm before fatigue becomes fatal.',
  features: [
    {
      title: 'Computer Vision Detection',
      desc: 'OpenCV-powered face and eye detection using Camera Module 3. Detects closed eyes within 5-10 seconds.',
      icon: 'vision',
    },
    {
      title: 'Instant Alert System',
      desc: '15-second buzzer alarm triggers the moment drowsiness is detected. Alarm persists until the driver is alert.',
      icon: 'alert',
    },
    {
      title: 'Simple Installation',
      desc: 'Mounts near the gear area. Camera on the mirror at 30-45°. Powered by car USB — starts with the engine.',
      icon: 'install',
    },
    {
      title: 'Self-Diagnostic Boot',
      desc: '5-second confirmation beep on startup verifies camera, Pi, and buzzer are operational before every drive.',
      icon: 'diagnostic',
    },
    {
      title: 'Night Driving Support',
      desc: 'Works in low-light conditions with cabin LED illumination. Effective range of 1-1.5 meters.',
      icon: 'night',
    },
    {
      title: 'Replacement Guarantee',
      desc: 'Faulty device replaced within 14 days. Full setup by our technical team with 24-hour response time.',
      icon: 'guarantee',
    },
  ],
  stats: [
    { value: '5s', label: 'Detection Speed' },
    { value: '1.5m', label: 'Effective Range' },
    { value: '24hr', label: 'Support Response' },
  ],
}

// ─── Grain Overlay ──────────────────────────────────────

function Grain({ opacity = 0.035 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10"
      style={{ opacity, mixBlendMode: 'multiply' }}
    >
      <svg width="100%" height="100%">
        <filter id="grain-products">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-products)" />
      </svg>
    </div>
  )
}

// ─── Gold Rule ──────────────────────────────────────────

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

// ─── Gold Pill ──────────────────────────────────────────

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

// ─── Feature Icon SVGs ──────────────────────────────────

function FeatureIcon({ type, color = '#c9a86e' }: { type: string; color?: string }) {
  const icons: Record<string, React.ReactNode> = {
    comm: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 8a4 4 0 014-4h12a4 4 0 014 4v8a4 4 0 01-4 4h-6l-4 4v-4H8a4 4 0 01-4-4V8z" stroke={color} strokeWidth="1.5" />
        <circle cx="10" cy="12" r="1" fill={color} />
        <circle cx="14" cy="12" r="1" fill={color} />
        <circle cx="18" cy="12" r="1" fill={color} />
      </svg>
    ),
    network: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="8" r="3" stroke={color} strokeWidth="1.5" />
        <circle cx="6" cy="20" r="3" stroke={color} strokeWidth="1.5" />
        <circle cx="22" cy="20" r="3" stroke={color} strokeWidth="1.5" />
        <path d="M11.5 10.5L8 17.5M16.5 10.5L20 17.5M9 20h10" stroke={color} strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    pricing: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="20" height="16" rx="3" stroke={color} strokeWidth="1.5" />
        <path d="M4 12h20" stroke={color} strokeWidth="1" opacity="0.4" />
        <circle cx="18" cy="18" r="2" stroke={color} strokeWidth="1.5" />
      </svg>
    ),
    secure: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L5 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-4z" stroke={color} strokeWidth="1.5" />
        <path d="M10 14l3 3 5-5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    rating: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4l2.47 7.6H24l-6.09 4.43 2.33 7.17L14 18.83l-6.24 4.37 2.33-7.17L4 11.6h7.53L14 4z" stroke={color} strokeWidth="1.5" />
      </svg>
    ),
    quality: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke={color} strokeWidth="1.5" />
        <path d="M10 14l3 3 5-5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    vision: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M2 14s4.5-8 12-8 12 8 12 8-4.5 8-12 8-12-8-12-8z" stroke={color} strokeWidth="1.5" />
        <circle cx="14" cy="14" r="4" stroke={color} strokeWidth="1.5" />
        <circle cx="14" cy="14" r="1.5" fill={color} />
      </svg>
    ),
    alert: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3v2M14 23v2M3 14h2M23 14h2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="14" r="6" stroke={color} strokeWidth="1.5" />
        <path d="M14 11v4M14 17.5v.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    install: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="6" y="4" width="16" height="20" rx="2" stroke={color} strokeWidth="1.5" />
        <path d="M10 12h8M10 16h5" stroke={color} strokeWidth="1" opacity="0.5" />
        <circle cx="14" cy="8" r="1.5" stroke={color} strokeWidth="1" />
      </svg>
    ),
    diagnostic: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="8" width="20" height="12" rx="2" stroke={color} strokeWidth="1.5" />
        <path d="M8 14h3l2-3 2 6 2-3h3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    night: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M20 16a8 8 0 01-12-6.84A8 8 0 1020 16z" stroke={color} strokeWidth="1.5" />
        <circle cx="20" cy="6" r="1" fill={color} />
        <circle cx="23" cy="10" r="0.5" fill={color} />
      </svg>
    ),
    guarantee: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4l3 3h4v4l3 3-3 3v4h-4l-3 3-3-3H7v-4l-3-3 3-3V7h4l3-3z" stroke={color} strokeWidth="1.5" />
        <path d="M10 14l3 3 5-5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  }
  return <div className="flex items-center justify-center">{icons[type] || icons.quality}</div>
}

// ─── Animated Counter ───────────────────────────────────

function AnimCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE }}
      className="text-center"
    >
      <div
        style={{
          fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
          fontWeight: 200,
          color: '#c9a86e',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
          marginTop: 8,
          opacity: 0.5,
        }}
      >
        {label}
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════
// HERO SECTION — Cinematic opening
// ═══════════════════════════════════════════════════════════

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

      {/* Atmospheric orbs */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: '60%',
          height: '60%',
          top: '15%',
          left: '20%',
          background: 'radial-gradient(ellipse at center, rgba(201,168,110,0.08) 0%, transparent 70%)',
        }}
      />

      {/* PRODUCTS watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.03 } : {}}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="pointer-events-none absolute select-none"
        style={{
          fontSize: 'clamp(8rem, 22vw, 28rem)',
          fontWeight: 800,
          color: '#2a2218',
          letterSpacing: '-0.04em',
          lineHeight: 0.85,
        }}
      >
        PRODUCTS
      </motion.div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        >
          <GoldPill>WHAT WE BUILD</GoldPill>
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
            maxWidth: 900,
          }}
        >
          Technology built for{' '}
          <em style={{ fontStyle: 'italic', color: '#a0814a' }}>what matters</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          style={{
            fontSize: 'clamp(15px, 1.2vw, 18px)',
            fontWeight: 400,
            color: '#2a2218',
            opacity: 0.55,
            lineHeight: 1.8,
            marginTop: 24,
            maxWidth: 560,
          }}
        >
          From expert consultation platforms to life-saving IoT devices — products
          engineered with precision, delivered with conviction.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          style={{
            width: 60,
            height: 2,
            background: 'linear-gradient(90deg, transparent, #c9a86e, transparent)',
            transformOrigin: 'center',
            marginTop: 40,
          }}
        />
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.4 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#2a2218' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 24, background: 'rgba(201,168,110,0.4)' }}
        />
      </motion.div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SPLIT UNIVERSE — Two products, one viewport
// ═══════════════════════════════════════════════════════════

function SplitUniverse() {
  const [hovered, setHovered] = useState<'left' | 'right' | null>(null)
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight: '85vh', background: '#f2ede6' }}
    >
      <div
        className="flex"
        style={{
          minHeight: '85vh',
          transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* ─── FlyHigh Side ─── */}
        <motion.div
          onMouseEnter={() => setHovered('left')}
          onMouseLeave={() => setHovered(null)}
          className="relative flex flex-col justify-end overflow-hidden"
          style={{
            flex: hovered === 'left' ? 1.5 : hovered === 'right' ? 0.7 : 1,
            transition: 'flex 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
            padding: 'clamp(40px, 5vw, 80px)',
            paddingBottom: 'clamp(60px, 8vh, 120px)',
            background: 'linear-gradient(165deg, #f2ede6 0%, #ebe5db 50%, rgba(201,168,110,0.08) 100%)',
            borderRight: '1px solid rgba(201,168,110,0.15)',
          }}
        >
          <Grain opacity={0.025} />

          {/* Large decorative number */}
          <div
            className="pointer-events-none absolute select-none"
            style={{
              fontSize: 'clamp(10rem, 18vw, 20rem)',
              fontWeight: 200,
              color: 'rgba(201,168,110,0.06)',
              right: -20,
              top: '10%',
              lineHeight: 0.85,
            }}
          >
            01
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="relative z-10"
          >
            <GoldPill>{FLYHIGH.category}</GoldPill>

            <h2
              style={{
                fontSize: 'clamp(2.6rem, 5vw, 4.8rem)',
                fontWeight: 300,
                color: '#2a2218',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                marginTop: 20,
              }}
            >
              {FLYHIGH.name}
            </h2>

            <p
              style={{
                fontSize: 16,
                color: '#2a2218',
                opacity: 0.55,
                lineHeight: 1.7,
                marginTop: 16,
                maxWidth: 420,
              }}
            >
              {FLYHIGH.tagline}
            </p>

            <motion.a
              href="/products/flyhigh"
              whileHover={{ x: 4 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginTop: 28,
                fontSize: 14,
                fontWeight: 600,
                color: '#a0814a',
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
            >
              Explore
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#a0814a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ─── Sleep Alert Side ─── */}
        <motion.div
          onMouseEnter={() => setHovered('right')}
          onMouseLeave={() => setHovered(null)}
          className="relative flex flex-col justify-end overflow-hidden"
          data-dark-section
          style={{
            flex: hovered === 'right' ? 1.5 : hovered === 'left' ? 0.7 : 1,
            transition: 'flex 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
            padding: 'clamp(40px, 5vw, 80px)',
            paddingBottom: 'clamp(60px, 8vh, 120px)',
            background: 'linear-gradient(165deg, #1a1a1e 0%, #141416 50%, rgba(139,164,184,0.06) 100%)',
          }}
        >
          <Grain opacity={0.04} />

          {/* Atmospheric orb */}
          <div
            className="pointer-events-none absolute"
            style={{
              width: '50%',
              height: '50%',
              bottom: '10%',
              right: '10%',
              background: 'radial-gradient(ellipse at center, rgba(139,164,184,0.08) 0%, transparent 70%)',
            }}
          />

          {/* Large decorative number */}
          <div
            className="pointer-events-none absolute select-none"
            style={{
              fontSize: 'clamp(10rem, 18vw, 20rem)',
              fontWeight: 200,
              color: 'rgba(255,255,255,0.03)',
              right: -20,
              top: '10%',
              lineHeight: 0.85,
            }}
          >
            02
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="relative z-10"
          >
            <GoldPill>{SLEEPALERT.category}</GoldPill>

            <h2
              style={{
                fontSize: 'clamp(2.6rem, 5vw, 4.8rem)',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.93)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                marginTop: 20,
              }}
            >
              {SLEEPALERT.name}
            </h2>

            <p
              style={{
                fontSize: 16,
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.7,
                marginTop: 16,
                maxWidth: 420,
              }}
            >
              {SLEEPALERT.tagline}
            </p>

            <motion.a
              href="/products/sleep-alert"
              whileHover={{ x: 4 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginTop: 28,
                fontSize: 14,
                fontWeight: 600,
                color: '#d4bb8a',
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
            >
              Explore
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#d4bb8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// PRODUCT DEEP DIVE SECTION
// ═══════════════════════════════════════════════════════════

function ProductDeepDive({
  product,
  number,
  isDark,
  id,
}: {
  product: typeof FLYHIGH
  number: string
  isDark: boolean
  id: string
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const textColor = isDark ? 'rgba(255,255,255,0.93)' : '#2a2218'
  const bodyColor = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(42,34,24,0.55)'
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.65)'
  const cardBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
  const bg = isDark ? '#0a0a0a' : '#f2ede6'

  return (
    <section
      ref={ref}
      id={id}
      className="relative overflow-hidden"
      data-dark-section={isDark ? '' : undefined}
      style={{ background: bg, padding: 'clamp(80px, 12vh, 160px) clamp(32px, 6vw, 120px)' }}
    >
      <Grain opacity={isDark ? 0.04 : 0.03} />

      {/* Atmospheric orb */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: '50%',
          height: '60%',
          top: '10%',
          right: isDark ? '5%' : 'auto',
          left: isDark ? 'auto' : '5%',
          background: isDark
            ? 'radial-gradient(ellipse at center, rgba(139,164,184,0.06) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at center, rgba(201,168,110,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Large watermark number */}
      <div
        className="pointer-events-none absolute select-none"
        style={{
          fontSize: 'clamp(12rem, 20vw, 26rem)',
          fontWeight: 200,
          color: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(42,34,24,0.03)',
          right: isDark ? '5%' : 'auto',
          left: isDark ? 'auto' : '5%',
          top: '5%',
          lineHeight: 0.85,
        }}
      >
        {number}
      </div>

      <div className="relative z-10 mx-auto" style={{ maxWidth: 1200 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <GoldPill>{product.category}</GoldPill>

          <div style={{ marginTop: 20 }}>
            <GoldRule width="60px" delay={0.2} />
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
              fontWeight: 300,
              color: textColor,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              marginTop: 24,
            }}
          >
            {product.name}
          </h2>

          <p
            style={{
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              color: bodyColor,
              lineHeight: 1.8,
              marginTop: 20,
              maxWidth: 600,
            }}
          >
            {product.description}
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="flex gap-12 flex-wrap"
          style={{ marginTop: 48, color: textColor }}
        >
          {product.stats.map((stat, i) => (
            <AnimCounter key={i} value={stat.value} label={stat.label} />
          ))}
        </motion.div>

        {/* Bento Feature Grid */}
        <div
          className="grid gap-4"
          style={{
            marginTop: 64,
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          }}
        >
          {product.features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: EASE }}
              whileHover={{
                y: -4,
                boxShadow: isDark
                  ? '0 12px 40px rgba(0,0,0,0.3)'
                  : '0 12px 40px rgba(0,0,0,0.08)',
              }}
              style={{
                background: cardBg,
                border: `1px solid ${cardBorder}`,
                borderRadius: 20,
                padding: 'clamp(24px, 3vw, 36px)',
                transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: isDark ? 'rgba(201,168,110,0.08)' : 'rgba(201,168,110,0.1)',
                  border: '1px solid rgba(201,168,110,0.15)',
                  marginBottom: 20,
                }}
              >
                <FeatureIcon type={feature.icon} color="#c9a86e" />
              </div>

              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: textColor,
                  letterSpacing: '-0.01em',
                  marginBottom: 8,
                }}
              >
                {feature.title}
              </h3>

              <p
                style={{
                  fontSize: 15,
                  color: bodyColor,
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

// ═══════════════════════════════════════════════════════════
// CTA SECTION
// ═══════════════════════════════════════════════════════════

function CTASection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

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
          Interested in our products?
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
            maxWidth: 500,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Whether you need expert consultation via FlyHigh or fleet safety with Sleep Alert —
          let&apos;s start a conversation.
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
              letterSpacing: '-0.01em',
            }}
          >
            Start a conversation
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>

          <motion.a
            href="/solutions"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full px-8 py-4"
            style={{
              background: 'transparent',
              color: '#2a2218',
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              border: '1px solid rgba(42,34,24,0.15)',
            }}
          >
            View solutions
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════

export default function ProductsContent() {
  return (
    <main>
      <HeroSection />
      <SplitUniverse />
      <CTASection />
    </main>
  )
}
