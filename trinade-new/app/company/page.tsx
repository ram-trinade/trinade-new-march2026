'use client'

import dynamic from 'next/dynamic'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'

const PremiumCursor = dynamic(() => import('@/components/premium-cursor'), { ssr: false })
const SolutionsNavbar = dynamic(() => import('@/components/solutions-navbar'), { ssr: false })
const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'), { ssr: false })
const SolutionsCookiePopup = dynamic(() => import('@/components/solutions-cookie-popup'), { ssr: false })
const SolutionsFooter = dynamic(() => import('@/components/solutions-footer'), { ssr: false })

const EASE = [0.32, 0.72, 0, 1] as const

/* ─── Animated counter for stats ─── */
function AnimatedStat({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!isInView) return
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ''))
    const hasDecimal = value.includes('.')
    const duration = 2000
    const start = performance.now()

    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      const current = numeric * eased

      if (hasDecimal) {
        setDisplay(current.toFixed(1))
      } else {
        setDisplay(Math.floor(current).toString())
      }

      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, value])

  return <span ref={ref}>{display}{suffix}</span>
}

/* ─── Liquid Glass Card ─── */
function GlassCard({
  children,
  className = '',
  dark = false,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  dark?: boolean
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={{
        background: dark
          ? 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.35) 100%)',
        backdropFilter: 'blur(24px) saturate(1.3)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.3)',
        border: dark
          ? '1px solid rgba(255,255,255,0.06)'
          : '1px solid rgba(255,255,255,0.7)',
        borderRadius: '24px',
        boxShadow: dark
          ? '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
          : '0 8px 32px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
        overflow: 'hidden',
      }}
    >
      {children}
    </motion.div>
  )
}

/* ─── Reveal wrapper ─── */
function RevealOnScroll({
  children,
  delay = 0,
  y = 60,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Horizontal Rule Accent ─── */
function GoldRule() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : {}}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, #c9a86e, transparent)',
        transformOrigin: 'left',
      }}
    />
  )
}

const VALUES = [
  {
    title: 'Integrity First',
    desc: 'We build trust through transparency, honest communication, and unwavering commitment to ethical AI practices.',
    num: '01',
  },
  {
    title: 'Relentless Innovation',
    desc: 'We push boundaries not for the sake of novelty, but to solve real problems that matter to our partners.',
    num: '02',
  },
  {
    title: 'Partnership Mindset',
    desc: 'Your success is our success. We invest deeply in understanding your challenges and co-creating solutions.',
    num: '03',
  },
  {
    title: 'Engineering Excellence',
    desc: 'Every line of code, every architecture decision, every deployment — we hold ourselves to the highest standard.',
    num: '04',
  },
]

const STATS = [
  { value: '500', suffix: '+', label: 'Enterprise Deployments' },
  { value: '99.9', suffix: '%', label: 'Uptime Guaranteed' },
  { value: '2.4', suffix: 'B+', label: 'Data Points Processed' },
  { value: '12', suffix: 'ms', label: 'Average Response Time' },
]

export default function SolutionsCompanyPage() {

  return (
    <>
      <style>{`
        .solutions-page, .solutions-page * { cursor: none !important; }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          30% { transform: translate(3%, -15%); }
          50% { transform: translate(12%, 9%); }
          70% { transform: translate(9%, 4%); }
          90% { transform: translate(-1%, 7%); }
        }
      `}</style>
      <div className="solutions-page relative bg-[#f2ede6]">
        <PremiumCursor />
        <SolutionsNavbar />
        <SmoothScroll>

          {/* ══════════════════════════════════════════════
              HERO — Giant "Est 2025" + Statement
              ══════════════════════════════════════════════ */}
          <section
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f2ede6',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Subtle grain overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.03,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: '128px',
                animation: 'grain 8s steps(10) infinite',
                pointerEvents: 'none',
              }}
            />

            {/* Ambient gold glow */}
            <div
              style={{
                position: 'absolute',
                top: '20%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60vw',
                height: '60vw',
                maxWidth: '800px',
                maxHeight: '800px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(201,168,110,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'rgba(42,34,24,0.4)',
                  textAlign: 'center',
                  marginBottom: '32px',
                }}
              >
                Our Story
              </motion.p>

              {/* Giant "Est 2025" gradient text */}
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: 'clamp(80px, 18vw, 280px)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.9,
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #c9a86e 0%, #d4bb8a 30%, #a0814a 60%, #c9a86e 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer 8s linear infinite',
                  padding: '0 24px',
                  userSelect: 'none',
                }}
              >
                Est 2021
              </motion.h1>

              {/* Thin gold line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: '120px',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, #c9a86e, transparent)',
                  margin: '40px auto',
                  transformOrigin: 'center',
                }}
              />

              {/* Sub-statement */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: 'clamp(16px, 1.8vw, 20px)',
                  color: 'rgba(42,34,24,0.5)',
                  textAlign: 'center',
                  maxWidth: '500px',
                  margin: '0 auto',
                  lineHeight: 1.7,
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                }}
              >
                Trinade AI Technologies — engineering intelligence for the enterprise of tomorrow.
              </motion.p>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
              style={{
                position: 'absolute',
                bottom: '48px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(42,34,24,0.3)' }}>
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '1px', height: '32px', background: 'linear-gradient(180deg, rgba(201,168,110,0.5), transparent)' }}
              />
            </motion.div>
          </section>

          {/* ══════════════════════════════════════════════
              BOLD STATEMENT — Full-width cinematic text
              ══════════════════════════════════════════════ */}
          <section
            style={{
              padding: 'clamp(80px, 14vh, 160px) clamp(24px, 8vw, 120px)',
              backgroundColor: '#f2ede6',
              position: 'relative',
            }}
          >
            <GoldRule />
            <div style={{ padding: 'clamp(60px, 10vh, 120px) 0' }}>
              <RevealOnScroll>
                <h2
                  style={{
                    fontSize: 'clamp(28px, 4.5vw, 64px)',
                    fontWeight: 300,
                    lineHeight: 1.15,
                    letterSpacing: '-0.03em',
                    color: '#2a2218',
                    maxWidth: '1200px',
                  }}
                >
                  We thrive on working with founders and visionaries who will put everything on the line to make their dream a reality.{' '}
                  <span style={{ color: 'rgba(42,34,24,0.35)' }}>
                    We get to help them build that — with intelligence that scales.
                  </span>
                </h2>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <p
                  style={{
                    fontSize: 'clamp(15px, 1.3vw, 18px)',
                    lineHeight: 1.8,
                    color: 'rgba(42,34,24,0.55)',
                    maxWidth: '680px',
                    marginTop: '48px',
                  }}
                >
                  We build adaptive AI solutions that transform how businesses operate, compete, and grow. From foundation to deployment,
                  every system we create is designed to amplify human potential and drive measurable outcomes across the enterprise.
                </p>
              </RevealOnScroll>
            </div>
            <GoldRule />
          </section>

          {/* ══════════════════════════════════════════════
              MISSION — Dark cinematic section
              ══════════════════════════════════════════════ */}
          <section
            style={{
              padding: 'clamp(80px, 14vh, 180px) clamp(24px, 8vw, 120px)',
              backgroundColor: '#0a0a0a',
              color: 'rgba(255,255,255,0.9)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Ambient glow */}
            <div
              style={{
                position: 'absolute',
                top: '-20%',
                right: '-10%',
                width: '50vw',
                height: '50vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(201,168,110,0.04) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: '64px' }}>
              <div>
                <RevealOnScroll>
                  <p style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: '#c9a86e',
                    marginBottom: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                  }}>
                    <span style={{ width: '40px', height: '1px', background: '#c9a86e', display: 'inline-block' }} />
                    Our Mission
                  </p>
                </RevealOnScroll>

                <RevealOnScroll delay={0.1}>
                  <h2 style={{
                    fontSize: 'clamp(30px, 4.5vw, 56px)',
                    fontWeight: 300,
                    lineHeight: 1.2,
                    letterSpacing: '-0.03em',
                    maxWidth: '900px',
                    marginBottom: '40px',
                  }}>
                    To deliver AI solutions that are not just intelligent, but trustworthy, scalable, and deeply integrated into the fabric of modern enterprise.
                  </h2>
                </RevealOnScroll>

                <RevealOnScroll delay={0.2}>
                  <p style={{
                    fontSize: '16px',
                    lineHeight: 1.9,
                    color: 'rgba(255,255,255,0.45)',
                    maxWidth: '640px',
                  }}>
                    Founded with the conviction that AI should empower, not replace — we partner with organizations to build systems that amplify human potential and drive measurable outcomes. Every solution we craft is designed for the real world, where reliability is non-negotiable and performance defines success.
                  </p>
                </RevealOnScroll>
              </div>

              {/* Two glass feature cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '20px' }}>
                <GlassCard dark delay={0.3}>
                  <div style={{ padding: '40px 36px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, rgba(201,168,110,0.15), rgba(201,168,110,0.05))',
                      border: '1px solid rgba(201,168,110,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '24px',
                      fontSize: '20px',
                    }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,110,0.7)" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px', letterSpacing: '-0.01em' }}>
                      Enterprise-Grade
                    </h3>
                    <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.4)' }}>
                      Built from the ground up for production environments. Our systems handle billions of data points with sub-millisecond response times.
                    </p>
                  </div>
                </GlassCard>

                <GlassCard dark delay={0.4}>
                  <div style={{ padding: '40px 36px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, rgba(201,168,110,0.15), rgba(201,168,110,0.05))',
                      border: '1px solid rgba(201,168,110,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '24px',
                    }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,110,0.7)" strokeWidth="1.5" strokeLinecap="round">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                      </svg>
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px', letterSpacing: '-0.01em' }}>
                      Human-Centered
                    </h3>
                    <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.4)' }}>
                      AI that augments decision-making, not replaces it. We design for collaboration between human expertise and machine intelligence.
                    </p>
                  </div>
                </GlassCard>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════
              STATS — Glassmorphism cards on cream
              ══════════════════════════════════════════════ */}
          <section
            style={{
              padding: 'clamp(80px, 14vh, 160px) clamp(24px, 8vw, 120px)',
              backgroundColor: '#f2ede6',
              position: 'relative',
            }}
          >
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <RevealOnScroll>
                <p style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: 'rgba(42,34,24,0.4)',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}>
                  <span style={{ width: '40px', height: '1px', background: 'rgba(42,34,24,0.2)', display: 'inline-block' }} />
                  By the Numbers
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <h2 style={{
                  fontSize: 'clamp(26px, 3.5vw, 44px)',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  color: '#2a2218',
                  marginBottom: '60px',
                  maxWidth: '500px',
                }}>
                  Performance that speaks for itself.
                </h2>
              </RevealOnScroll>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                {STATS.map((s, i) => (
                  <GlassCard key={s.label} delay={i * 0.1}>
                    <div style={{ padding: '44px 36px', textAlign: 'center' }}>
                      <p style={{
                        fontSize: 'clamp(40px, 5vw, 60px)',
                        fontWeight: 200,
                        letterSpacing: '-0.04em',
                        background: 'linear-gradient(135deg, #c9a86e, #a0814a)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginBottom: '12px',
                        lineHeight: 1,
                      }}>
                        <AnimatedStat value={s.value} suffix={s.suffix} />
                      </p>
                      <p style={{
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: 'rgba(42,34,24,0.4)',
                        fontWeight: 600,
                      }}>
                        {s.label}
                      </p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════
              VALUES — Elegant numbered cards on dark
              ══════════════════════════════════════════════ */}
          <section
            style={{
              padding: 'clamp(80px, 14vh, 180px) clamp(24px, 8vw, 120px)',
              backgroundColor: '#0a0a0a',
              color: 'rgba(255,255,255,0.9)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Subtle bottom-left glow */}
            <div
              style={{
                position: 'absolute',
                bottom: '-10%',
                left: '-5%',
                width: '40vw',
                height: '40vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(201,168,110,0.03) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <RevealOnScroll>
                <p style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: '#c9a86e',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}>
                  <span style={{ width: '40px', height: '1px', background: '#c9a86e', display: 'inline-block' }} />
                  Our Values
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <h2 style={{
                  fontSize: 'clamp(26px, 3.5vw, 44px)',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  marginBottom: '72px',
                  maxWidth: '500px',
                }}>
                  Principles that guide every decision.
                </h2>
              </RevealOnScroll>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {VALUES.map((v, i) => (
                  <GlassCard key={v.title} dark delay={i * 0.12}>
                    <div style={{ padding: '44px 36px', position: 'relative', minHeight: '260px', display: 'flex', flexDirection: 'column' }}>
                      {/* Large faded number */}
                      <span style={{
                        position: 'absolute',
                        top: '20px',
                        right: '28px',
                        fontSize: '72px',
                        fontWeight: 200,
                        color: 'rgba(201,168,110,0.06)',
                        lineHeight: 1,
                        letterSpacing: '-0.04em',
                        userSelect: 'none',
                      }}>
                        {v.num}
                      </span>

                      <div style={{
                        width: '4px',
                        height: '32px',
                        background: 'linear-gradient(180deg, #c9a86e, transparent)',
                        borderRadius: '2px',
                        marginBottom: '28px',
                      }} />

                      <h3 style={{
                        fontSize: '21px',
                        fontWeight: 600,
                        marginBottom: '16px',
                        letterSpacing: '-0.01em',
                      }}>
                        {v.title}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        lineHeight: 1.8,
                        color: 'rgba(255,255,255,0.4)',
                        marginTop: 'auto',
                      }}>
                        {v.desc}
                      </p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════
              APPROACH — Editorial split on cream
              ══════════════════════════════════════════════ */}
          <section
            style={{
              padding: 'clamp(80px, 14vh, 160px) clamp(24px, 8vw, 120px)',
              backgroundColor: '#f2ede6',
              position: 'relative',
            }}
          >
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <GoldRule />
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: 'clamp(40px, 6vw, 100px)',
                padding: 'clamp(60px, 10vh, 120px) 0',
              }}>
                <RevealOnScroll>
                  <div>
                    <p style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em',
                      color: 'rgba(42,34,24,0.4)',
                      marginBottom: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                    }}>
                      <span style={{ width: '40px', height: '1px', background: 'rgba(42,34,24,0.2)', display: 'inline-block' }} />
                      Our Approach
                    </p>
                    <h2 style={{
                      fontSize: 'clamp(28px, 4vw, 48px)',
                      fontWeight: 300,
                      lineHeight: 1.2,
                      letterSpacing: '-0.03em',
                      color: '#2a2218',
                    }}>
                      We don&apos;t just build technology.{' '}
                      <span style={{
                        background: 'linear-gradient(135deg, #c9a86e, #a0814a)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}>
                        We architect futures.
                      </span>
                    </h2>
                  </div>
                </RevealOnScroll>

                <RevealOnScroll delay={0.15}>
                  <div>
                    <p style={{
                      fontSize: '15px',
                      lineHeight: 1.9,
                      color: 'rgba(42,34,24,0.55)',
                      marginBottom: '28px',
                    }}>
                      Every engagement begins with deep understanding. We immerse ourselves in your domain, your challenges, your ambitions — and then we design AI systems that are as unique as the problems they solve.
                    </p>
                    <p style={{
                      fontSize: '15px',
                      lineHeight: 1.9,
                      color: 'rgba(42,34,24,0.55)',
                      marginBottom: '28px',
                    }}>
                      Our team brings together expertise in machine learning, distributed systems, and enterprise architecture. We move fast without breaking things — because in production, reliability is everything.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '32px' }}>
                      {['Machine Learning', 'NLP', 'Computer Vision', 'Edge AI', 'MLOps', 'Data Engineering'].map((tag) => (
                        <span
                          key={tag}
                          style={{
                            padding: '8px 18px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: 500,
                            letterSpacing: '0.04em',
                            color: 'rgba(42,34,24,0.5)',
                            border: '1px solid rgba(42,34,24,0.12)',
                            background: 'rgba(255,255,255,0.4)',
                            backdropFilter: 'blur(8px)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </RevealOnScroll>
              </div>
              <GoldRule />
            </div>
          </section>

          {/* ══════════════════════════════════════════════
              CTA — Cinematic dark close
              ══════════════════════════════════════════════ */}
          <section
            style={{
              padding: 'clamp(100px, 16vh, 200px) clamp(24px, 8vw, 120px)',
              backgroundColor: '#0a0a0a',
              color: 'rgba(255,255,255,0.9)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Center glow */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60vw',
                height: '60vw',
                maxWidth: '700px',
                maxHeight: '700px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(201,168,110,0.05) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <RevealOnScroll>
              <p style={{
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#c9a86e',
                marginBottom: '32px',
              }}>
                Let&apos;s Build Together
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h2 style={{
                fontSize: 'clamp(32px, 5vw, 64px)',
                fontWeight: 200,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                maxWidth: '800px',
                margin: '0 auto 24px',
              }}>
                Ready to engineer your{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #c9a86e, #d4bb8a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  next breakthrough?
                </span>
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p style={{
                fontSize: '17px',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.4)',
                maxWidth: '520px',
                margin: '0 auto 48px',
              }}>
                Let&apos;s discuss how Trinade can accelerate your enterprise AI journey.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <a
                href="contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '18px 44px',
                  background: 'linear-gradient(135deg, rgba(201,168,110,0.12), rgba(201,168,110,0.04))',
                  border: '1px solid rgba(201,168,110,0.25)',
                  color: '#d4bb8a',
                  borderRadius: '9999px',
                  fontSize: '15px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  letterSpacing: '0.03em',
                  backdropFilter: 'blur(16px)',
                  transition: 'all 0.4s ease',
                }}
              >
                Get in Touch
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </RevealOnScroll>
          </section>

          <SolutionsFooter />

        </SmoothScroll>
        <SolutionsCookiePopup />
      </div>
    </>
  )
}
