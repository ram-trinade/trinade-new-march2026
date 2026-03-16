'use client'

import dynamic from 'next/dynamic'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'

const PremiumCursor = dynamic(() => import('@/components/premium-cursor'), { ssr: false })
const SolutionsNavbar = dynamic(() => import('@/components/solutions-navbar'), { ssr: false })
const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'), { ssr: false })
const SolutionsFooter = dynamic(() => import('@/components/solutions-footer'), { ssr: false })
const SolutionsCookiePopup = dynamic(() => import('@/components/solutions-cookie-popup'), { ssr: false })

// ─── Custom Subject Dropdown ───
const subjectOptions = [
  { value: '', label: 'Select a topic' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'enterprise', label: 'Enterprise Solutions' },
  { value: 'support', label: 'Technical Support' },
  { value: 'other', label: 'Other' },
]

function SubjectDropdown({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen])

  const selectedLabel = subjectOptions.find(o => o.value === value)?.label || 'Select a topic'

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'rgba(255,255,255,0.45)',
          border: isOpen ? '1px solid rgba(201,168,110,0.6)' : '1px solid rgba(201,168,110,0.3)',
          borderRadius: '14px',
          padding: '14px 18px',
          paddingRight: '44px',
          color: value ? '#2a2218' : 'rgba(90,70,40,0.45)',
          fontSize: '15px',
          width: '100%',
          textAlign: 'left',
          cursor: 'none',
          fontFamily: 'inherit',
          outline: 'none',
          transition: 'border-color 0.2s ease',
          position: 'relative',
        }}
      >
        {selectedLabel}
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: `translateY(-50%) rotate(${isOpen ? 180 : 0}deg)`,
            transition: 'transform 0.3s ease',
          }}
        >
          <path d="M1 1l5 5 5-5" stroke="rgba(90,70,40,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              right: 0,
              zIndex: 50,
              background: 'linear-gradient(165deg, rgba(201,168,110,0.45) 0%, rgba(180,130,55,0.35) 40%, rgba(220,195,150,0.40) 100%)',
              backdropFilter: 'blur(28px) saturate(1.6)',
              WebkitBackdropFilter: 'blur(28px) saturate(1.6)',
              border: '1px solid rgba(201,168,110,0.3)',
              borderRadius: '16px',
              boxShadow: '0 12px 40px rgba(160,120,50,0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
              overflow: 'hidden',
              transformOrigin: 'top center',
              padding: '4px',
            }}
          >
            {subjectOptions.map((option, i) => (
              <motion.button
                key={option.value}
                type="button"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.03, ease: [0.32, 0.72, 0, 1] }}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '11px 16px',
                  fontSize: '14px',
                  fontWeight: value === option.value ? 600 : 400,
                  color: value === option.value ? '#2a2218' : 'rgba(42,34,24,0.75)',
                  background: value === option.value ? 'rgba(255,255,255,0.3)' : 'transparent',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'none',
                  fontFamily: 'inherit',
                  transition: 'background 0.15s ease, color 0.15s ease',
                }}
                onMouseEnter={e => {
                  if (value !== option.value) {
                    ;(e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.2)'
                  }
                }}
                onMouseLeave={e => {
                  if (value !== option.value) {
                    ;(e.target as HTMLButtonElement).style.background = 'transparent'
                  }
                }}
              >
                {option.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main Page ───
export default function SolutionsContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [heroInView, setHeroInView] = useState(false)
  const [formInView, setFormInView] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const formSectionRef = useRef<HTMLDivElement>(null)

  // Hero is always visible on load — trigger animations immediately after mount
  useEffect(() => {
    const timer = setTimeout(() => setHeroInView(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Scroll-based trigger for form section (Lenis transform breaks IntersectionObserver)
  useEffect(() => {
    const checkFormVisibility = () => {
      const el = formSectionRef.current
      if (!el || formInView) return
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight + 100) {
        setFormInView(true)
      }
    }
    window.addEventListener('scroll', checkFormVisibility, { passive: true })
    // Also check after a delay in case Lenis doesn't fire native scroll
    const timer = setTimeout(checkFormVisibility, 2000)
    checkFormVisibility()
    return () => {
      window.removeEventListener('scroll', checkFormVisibility)
      clearTimeout(timer)
    }
  }, [formInView])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.45)',
    border: '1px solid rgba(201,168,110,0.3)',
    borderRadius: '14px',
    padding: '14px 18px',
    color: '#2a2218',
    fontSize: '15px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    fontFamily: 'inherit',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    color: 'rgba(90,70,40,0.55)',
    marginBottom: '8px',
  }

  // Hero headline words for staggered animation
  const line1Words = ['Have', 'a', 'project']
  const line2Words = ['in']

  return (
    <>
      <style>{`.solutions-page, .solutions-page * { cursor: none !important; }`}</style>
      <div className="solutions-page relative" style={{ cursor: 'none' }}>
        <PremiumCursor />
        <SolutionsNavbar />
        <SmoothScroll>

          {/* ══════════════════════════════════════════════
              SECTION 1: HERO — Dark cinematic
          ══════════════════════════════════════════════ */}
          <section
            ref={heroRef}
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#0a0a0a',
              textAlign: 'center',
              padding: '0 24px',
            }}
          >
            {/* Background image — spiral-lines-gold at very low opacity */}
            <div style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              pointerEvents: 'none',
            }}>
              <Image
                src="/spiral-lines-gold.jpg"
                alt=""
                fill
                style={{
                  objectFit: 'cover',
                  opacity: 0.11,
                  mixBlendMode: 'lighten',
                }}
                priority
              />
            </div>

            {/* Atmospheric gradient overlays */}
            <div style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 1,
            }}>
              <div style={{
                position: 'absolute',
                top: '-20%',
                right: '-10%',
                width: '60%',
                height: '60%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(201,168,110,0.08) 0%, transparent 70%)',
                filter: 'blur(80px)',
              }} />
              <div style={{
                position: 'absolute',
                bottom: '-20%',
                left: '-15%',
                width: '70%',
                height: '70%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(160,120,60,0.06) 0%, transparent 70%)',
                filter: 'blur(100px)',
              }} />
            </div>

            {/* Grain overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              opacity: 0.4,
              pointerEvents: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '128px 128px',
            }} />

            {/* CONTACT watermark */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 2, delay: 0.8 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: 'clamp(180px, 28vw, 420px)',
                fontWeight: 900,
                color: 'rgba(201,168,110,0.04)',
                letterSpacing: '-0.04em',
                userSelect: 'none',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                lineHeight: 1,
                zIndex: 2,
              }}
            >
              CONTACT
            </motion.div>

            {/* Hero content */}
            <div style={{ position: 'relative', zIndex: 3, maxWidth: '900px' }}>
              {/* Line 1: "Have a project" */}
              <div style={{
                fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.93)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                marginBottom: '0',
              }}>
                {line1Words.map((word, i) => (
                  <motion.span
                    key={word + i}
                    initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
                    animate={heroInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{
                      duration: 0.9,
                      delay: 0.2 + i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ display: 'inline-block', marginRight: '0.3em' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              {/* Line 2: "in mind?" */}
              <div style={{
                fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
                fontWeight: 300,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                marginBottom: '0',
              }}>
                {line2Words.map((word, i) => (
                  <motion.span
                    key={word + i}
                    initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
                    animate={heroInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{
                      duration: 0.9,
                      delay: 0.5 + i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      display: 'inline-block',
                      marginRight: '0.3em',
                      color: 'rgba(255,255,255,0.93)',
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
                <motion.span
                  initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
                  animate={heroInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                  transition={{
                    duration: 0.9,
                    delay: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #d4bb8a 0%, #c9a86e 40%, #a0814a 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  mind?
                </motion.span>
              </div>

              {/* Animated gold rule */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={heroInView ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 1.4, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: '100px',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(201,168,110,0.6), transparent)',
                  margin: '36px auto 32px',
                  transformOrigin: 'center',
                }}
              />

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: 'clamp(16px, 1.4vw, 20px)',
                  color: 'rgba(255,255,255,0.45)',
                  maxWidth: '620px',
                  margin: '0 auto',
                  lineHeight: 1.75,
                  fontWeight: 400,
                }}
              >
                We&apos;re always excited to discuss new opportunities and ideas. Whether you&apos;re
                looking to transform operations, build intelligent systems, or explore what&apos;s
                possible — reach out.
              </motion.p>
            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1.8 }}
              style={{
                position: 'absolute',
                bottom: '48px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{
                fontSize: '11px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'rgba(201,168,110,0.4)',
              }}>
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '1px',
                  height: '28px',
                  background: 'linear-gradient(180deg, rgba(201,168,110,0.4), transparent)',
                }}
              />
            </motion.div>
          </section>

          {/* ══════════════════════════════════════════════
              SECTION 2: SPLIT LAYOUT — Form + Info
          ══════════════════════════════════════════════ */}
          <section
            ref={formSectionRef}
            style={{
              backgroundColor: '#f2ede6',
              padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px)',
              position: 'relative',
            }}
          >
            {/* Grain overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.25,
              pointerEvents: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '128px 128px',
            }} />

            <div style={{
              maxWidth: '1320px',
              margin: '0 auto',
              display: 'flex',
              gap: 'clamp(24px, 3vw, 48px)',
              position: 'relative',
              zIndex: 1,
              flexWrap: 'wrap',
            }}>

              {/* ── LEFT COLUMN: Info Card ── */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={formInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  flex: '1 1 420px',
                  minWidth: '320px',
                  maxWidth: '100%',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  position: 'relative',
                  minHeight: '700px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                {/* Background image */}
                <Image
                  src="/spiral-lines-gold.jpg"
                  alt=""
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
                {/* Dark overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.82) 60%, rgba(10,10,10,0.92) 100%)',
                  zIndex: 1,
                }} />

                {/* Content on top of overlay */}
                <div style={{
                  position: 'relative',
                  zIndex: 2,
                  padding: 'clamp(32px, 4vw, 56px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '40px',
                }}>
                  {/* Headline */}
                  <div>
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        color: 'rgba(201,168,110,0.7)',
                        marginBottom: '20px',
                      }}
                    >
                      Get in touch
                    </motion.p>
                    <motion.h2
                      initial={{ opacity: 0, y: 25 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                        fontWeight: 300,
                        color: 'rgba(255,255,255,0.93)',
                        lineHeight: 1.2,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      Let&apos;s build<br />the future,<br />
                      <span style={{
                        background: 'linear-gradient(135deg, #d4bb8a 0%, #c9a86e 50%, #a0814a 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}>
                        together.
                      </span>
                    </motion.h2>
                  </div>

                  {/* Value proposition text */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={formInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      fontSize: '15px',
                      color: 'rgba(255,255,255,0.5)',
                      lineHeight: 1.8,
                      fontWeight: 400,
                    }}
                  >
                    Every great partnership starts with a conversation. Tell us about your challenges, your vision, and where you want to go — we&apos;ll show you how technology can get you there.
                  </motion.p>

                  {/* Separator */}
                  <div style={{
                    width: '100%',
                    height: '1px',
                    background: 'linear-gradient(90deg, rgba(201,168,110,0.3), rgba(201,168,110,0.08))',
                  }} />

                  {/* Response promise */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={formInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                  >
                    {[
                      { num: '01', text: 'We respond within 24 hours' },
                      { num: '02', text: 'Free initial consultation' },
                      { num: '03', text: 'No commitment required' },
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          color: 'rgba(201,168,110,0.5)',
                          letterSpacing: '0.05em',
                          fontVariantNumeric: 'tabular-nums',
                        }}>
                          {item.num}
                        </span>
                        <span style={{
                          fontSize: '14px',
                          color: 'rgba(255,255,255,0.65)',
                          fontWeight: 400,
                        }}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>

              {/* ── RIGHT COLUMN: Form Card ── */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={formInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  flex: '1.22 1 480px',
                  minWidth: '340px',
                  maxWidth: '100%',
                  background: 'linear-gradient(165deg, rgba(201,168,110,0.25) 0%, rgba(180,130,55,0.18) 40%, rgba(220,195,150,0.22) 100%)',
                  backdropFilter: 'blur(24px) saturate(1.6)',
                  WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
                  boxShadow: '0 8px 40px rgba(160,120,50,0.12), inset 0 1px 0 rgba(255,255,255,0.25)',
                  border: '1px solid rgba(201,168,110,0.2)',
                  borderRadius: '28px',
                  padding: 'clamp(32px, 4vw, 56px)',
                }}
              >
                {/* Form header */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={formInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ marginBottom: '36px' }}
                >
                  <h3 style={{
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    fontWeight: 400,
                    color: '#2a2218',
                    letterSpacing: '-0.01em',
                    marginBottom: '10px',
                  }}>
                    Send us a message
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: 'rgba(42,34,24,0.5)',
                    lineHeight: 1.6,
                  }}>
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

                  {/* Name & Email row */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '22px',
                  }}>
                    <div>
                      <label htmlFor="name" style={labelStyle}>Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        style={inputStyle}
                        onFocus={e => {
                          e.target.style.borderColor = 'rgba(201,168,110,0.6)'
                          e.target.style.boxShadow = '0 0 0 3px rgba(201,168,110,0.1)'
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = 'rgba(201,168,110,0.3)'
                          e.target.style.boxShadow = 'none'
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" style={labelStyle}>Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        style={inputStyle}
                        onFocus={e => {
                          e.target.style.borderColor = 'rgba(201,168,110,0.6)'
                          e.target.style.boxShadow = '0 0 0 3px rgba(201,168,110,0.1)'
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = 'rgba(201,168,110,0.3)'
                          e.target.style.boxShadow = 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* Phone & Subject row */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '22px',
                  }}>
                    <div>
                      <label htmlFor="phone" style={labelStyle}>Phone</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 00000 00000"
                        value={formData.phone}
                        onChange={handleChange}
                        style={inputStyle}
                        onFocus={e => {
                          e.target.style.borderColor = 'rgba(201,168,110,0.6)'
                          e.target.style.boxShadow = '0 0 0 3px rgba(201,168,110,0.1)'
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = 'rgba(201,168,110,0.3)'
                          e.target.style.boxShadow = 'none'
                        }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Subject</label>
                      <SubjectDropdown
                        value={formData.subject}
                        onChange={(val) => setFormData(prev => ({ ...prev, subject: val }))}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" style={labelStyle}>Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell us about your project or question..."
                      value={formData.message}
                      onChange={handleChange}
                      style={{
                        ...inputStyle,
                        resize: 'vertical',
                        minHeight: '140px',
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = 'rgba(201,168,110,0.6)'
                        e.target.style.boxShadow = '0 0 0 3px rgba(201,168,110,0.1)'
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = 'rgba(201,168,110,0.3)'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                    {/* Character counter */}
                    <p style={{
                      fontSize: '12px',
                      color: formData.message.length > 280
                        ? 'rgba(180,100,60,0.7)'
                        : 'rgba(90,70,40,0.35)',
                      textAlign: 'right',
                      marginTop: '6px',
                      transition: 'color 0.2s ease',
                    }}>
                      {formData.message.length} / 300
                    </p>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    style={{
                      background: '#1a1a1e',
                      color: '#ffffff',
                      fontWeight: 600,
                      borderRadius: '9999px',
                      height: '56px',
                      width: '100%',
                      border: 'none',
                      fontSize: '15px',
                      letterSpacing: '0.02em',
                      cursor: 'none',
                      transition: 'all 0.3s ease',
                      fontFamily: 'inherit',
                      marginTop: '8px',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.background = '#2a2a2e'
                      el.style.transform = 'translateY(-1px)'
                      el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.background = '#1a1a1e'
                      el.style.transform = 'translateY(0)'
                      el.style.boxShadow = 'none'
                    }}
                  >
                    Send Message
                    <span style={{
                      display: 'inline-block',
                      marginLeft: '10px',
                      transition: 'transform 0.3s ease',
                    }}>
                      &rarr;
                    </span>
                  </button>
                </form>
              </motion.div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════
              SECTION 3: Footer
          ══════════════════════════════════════════════ */}
          <SolutionsFooter />

          <SolutionsCookiePopup />

        </SmoothScroll>
      </div>
    </>
  )
}
