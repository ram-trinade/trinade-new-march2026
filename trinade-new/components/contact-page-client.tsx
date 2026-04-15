'use client'

import dynamic from 'next/dynamic'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import emailjs from '@emailjs/browser'

const PremiumCursor = dynamic(() => import('@/components/premium-cursor'), { ssr: false })
const SolutionsNavbar = dynamic(() => import('@/components/solutions-navbar'), { ssr: false })
const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'), { ssr: false })
const SolutionsFooter = dynamic(() => import('@/components/solutions-footer'), { ssr: false })
const SolutionsCookiePopup = dynamic(() => import('@/components/solutions-cookie-popup'), { ssr: false })

// ─── Country codes for phone dropdown ───
const countryCodes = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+7', country: 'Russia', flag: '🇷🇺' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+52', country: 'Mexico', flag: '🇲🇽' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
]

function CountryCodeDropdown({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen])

  const selected = countryCodes.find(c => c.code === value) || countryCodes[0]

  return (
    <div ref={ref} style={{ position: 'relative', width: '110px', flexShrink: 0 }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'rgba(255,255,255,0.45)',
          border: isOpen ? '1px solid rgba(201,168,110,0.6)' : '1px solid rgba(201,168,110,0.3)',
          borderRadius: '14px',
          padding: '14px 12px',
          paddingRight: '28px',
          color: '#2a2218',
          fontSize: '14px',
          width: '100%',
          textAlign: 'left',
          cursor: 'none',
          fontFamily: 'inherit',
          outline: 'none',
          transition: 'border-color 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          position: 'relative',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: '16px' }}>{selected.flag}</span>
        <span style={{ fontWeight: 500 }}>{selected.code}</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
          style={{ position: 'absolute', right: '10px', top: '50%', transform: `translateY(-50%) rotate(${isOpen ? 180 : 0}deg)`, transition: 'transform 0.3s ease' }}>
          <path d="M1 1l4 4 4-4" stroke="rgba(90,70,40,0.5)" strokeWidth="1.5" strokeLinecap="round" />
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
              width: '240px',
              zIndex: 50,
              background: 'linear-gradient(165deg, rgba(201,168,110,0.45) 0%, rgba(180,130,55,0.35) 40%, rgba(220,195,150,0.40) 100%)',
              backdropFilter: 'blur(28px) saturate(1.6)',
              WebkitBackdropFilter: 'blur(28px) saturate(1.6)',
              border: '1px solid rgba(201,168,110,0.3)',
              borderRadius: '16px',
              boxShadow: '0 12px 40px rgba(160,120,50,0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
              transformOrigin: 'top left',
              padding: '4px',
            }}
          >
            <div
              ref={listRef}
              data-lenis-prevent
              onWheel={e => { e.stopPropagation(); if (listRef.current) listRef.current.scrollTop += e.deltaY }}
              style={{
                maxHeight: '240px',
                overflowY: 'auto',
                overscrollBehavior: 'contain',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(201,168,110,0.3) transparent',
              }}
            >
              {countryCodes.map((cc, i) => (
                <motion.button
                  key={cc.code}
                  type="button"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15, delay: i * 0.015, ease: [0.32, 0.72, 0, 1] }}
                  onClick={() => { onChange(cc.code); setIsOpen(false) }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 12px',
                    fontSize: '13px',
                    fontWeight: value === cc.code ? 600 : 450,
                    color: value === cc.code ? '#2a2218' : 'rgba(42,34,24,0.92)',
                    background: value === cc.code ? 'rgba(255,255,255,0.3)' : 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'none',
                    fontFamily: 'inherit',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={e => { if (value !== cc.code) (e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.2)' }}
                  onMouseLeave={e => { if (value !== cc.code) (e.target as HTMLButtonElement).style.background = 'transparent' }}
                >
                  <span style={{ fontSize: '16px' }}>{cc.flag}</span>
                  <span style={{ flex: 1 }}>{cc.country}</span>
                  <span style={{ fontSize: '12px', opacity: 0.75, fontWeight: 500 }}>{cc.code}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Custom Subject Dropdown ───
const subjectOptions = [
  { value: '', label: 'Select a topic' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'enterprise', label: 'Enterprise Solutions' },
  { value: 'support', label: 'Technical Support' },
  { value: 'careers', label: 'Careers' },
  { value: 'media', label: 'Media & Press' },
  { value: 'billing', label: 'Billing & Accounts' },
  { value: 'feedback', label: 'Feedback' },
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
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false) }
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
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none"
          style={{ position: 'absolute', right: '16px', top: '50%', transform: `translateY(-50%) rotate(${isOpen ? 180 : 0}deg)`, transition: 'transform 0.3s ease' }}>
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
              transformOrigin: 'top center',
              padding: '4px',
            }}
          >
            <div
              ref={listRef}
              data-lenis-prevent
              onWheel={e => { e.stopPropagation(); if (listRef.current) listRef.current.scrollTop += e.deltaY }}
              style={{
                maxHeight: '220px',
                overflowY: 'auto',
                overscrollBehavior: 'contain',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(201,168,110,0.3) transparent',
              }}
            >
              {subjectOptions.map((option, i) => (
                <motion.button
                  key={option.value}
                  type="button"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.03, ease: [0.32, 0.72, 0, 1] }}
                  onClick={() => { onChange(option.value); setIsOpen(false) }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '11px 16px',
                    fontSize: '14px',
                    fontWeight: value === option.value ? 600 : 450,
                    color: value === option.value ? '#2a2218' : 'rgba(42,34,24,0.92)',
                    background: value === option.value ? 'rgba(255,255,255,0.3)' : 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'none',
                    fontFamily: 'inherit',
                    transition: 'background 0.15s ease, color 0.15s ease',
                  }}
                  onMouseEnter={e => { if (value !== option.value) (e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.2)' }}
                  onMouseLeave={e => { if (value !== option.value) (e.target as HTMLButtonElement).style.background = 'transparent' }}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
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
    countryCode: '+91',
    phone: '',
    subject: '',
    message: '',
    agreed: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [activeField, setActiveField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const hints: Record<string, string> = {
    name: '3+ alphabetic characters',
    email: 'Valid format without spaces',
    phone: 'Exactly 10 numeric digits',
    message: 'Min 5 characters',
  }

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

  const validate = () => {
    const newErrors: Record<string, string> = {}

    // Name: Must contain only alphabetic characters, min 3 chars
    // We allow spaces for names like "John Doe" but user said "only alphabetic characters".
    // I will allow spaces just in case, but keep it strict as per request if needed.
    // Let's use /^[A-Za-z\s]+$/ to allow spaces while keeping it alphabetic.
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name must only contain letters'
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters long'
    }

    // Email: Valid format, no spaces
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (formData.email.includes(' ')) {
      newErrors.email = 'Email cannot contain spaces'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., example@domain.com)'
    }

    // Phone: Exactly 10 digits, numeric, not all same
    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must only contain digits'
    } else if (formData.phone.length !== 10) {
      newErrors.phone = 'Phone number must be exactly 10 digits'
    } else if (new Set(formData.phone).size === 1) {
      newErrors.phone = 'Phone number cannot have all identical digits'
    }

    // Message: Min 5 characters, not empty
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Message must be at least 5 characters long'
    }

    // Terms & Privacy Agreement
    if (!formData.agreed) {
      newErrors.agreed = 'You must agree to the Terms and Privacy Policy'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setIsSubmitting(true)

      try {
        // Prepare template parameters
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          subject: formData.subject,
          message: formData.message,
          to_email: 'info@trinade.com', // Explicitly setting recipient if template uses it
        }

        // Send actual email via EmailJS
        const response = await emailjs.send(
          'service_sc3w2k2',
          'template_9v224wy',
          templateParams,
          'fiOMriJ9DW4GyN6G4'
        )

        console.group('%c Form Submission (EmailJS)', 'color: #c9a86e; font-weight: bold; font-size: 1.2em;')
        console.log('Status:', response.status, response.text)
        console.log('Recipient:', 'info@trinade.com')
        console.log('Payload:', templateParams)
        console.groupEnd()

        setIsSubmitting(false)
        setIsSuccess(true)
      } catch (error) {
        console.error('EmailJS Error:', error)
        setIsSubmitting(false)
        alert('Failed to send message. Please try again or contact us directly at info@trinade.com')
      }
    }
  }

  const resetForm = () => {
    setIsSuccess(false)
    setFormData({
      name: '',
      email: '',
      countryCode: '+91',
      phone: '',
      subject: '',
      message: '',
      agreed: false,
    })
    setErrors({})
    setActiveField(null)
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
            data-dark-section
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
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.div
                      key="contact-form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
                        style={{
                          ...inputStyle,
                          borderColor: errors.name ? 'rgba(217, 48, 37, 0.4)' : 'rgba(201,168,110,0.3)',
                          boxShadow: errors.name ? '0 0 0 3px rgba(217, 48, 37, 0.05)' : 'none',
                        }}
                        onFocus={e => {
                          setActiveField('name')
                          e.target.style.borderColor = errors.name ? 'rgba(217, 48, 37, 0.6)' : 'rgba(201,168,110,0.6)'
                          e.target.style.boxShadow = errors.name ? '0 0 0 3px rgba(217, 48, 37, 0.1)' : '0 0 0 3px rgba(201,168,110,0.1)'
                        }}
                        onBlur={e => {
                          setActiveField(null)
                          e.target.style.borderColor = errors.name ? 'rgba(217, 48, 37, 0.4)' : 'rgba(201,168,110,0.3)'
                          e.target.style.boxShadow = errors.name ? '0 0 0 3px rgba(217, 48, 37, 0.05)' : 'none'
                        }}
                      />
                      <AnimatePresence mode="wait">
                        {errors.name ? (
                          <motion.p
                            key="error-name"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            style={{ color: '#d93025', fontSize: '12px', marginTop: '6px', fontWeight: 500 }}
                          >
                            {errors.name}
                          </motion.p>
                        ) : activeField === 'name' ? (
                          <motion.p
                            key="hint-name"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            style={{ color: 'rgba(90,70,40,0.45)', fontSize: '11px', marginTop: '6px', fontWeight: 500, letterSpacing: '0.02em' }}
                          >
                            Requirement: {hints.name}
                          </motion.p>
                        ) : null}
                      </AnimatePresence>
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
                        style={{
                          ...inputStyle,
                          borderColor: errors.email ? 'rgba(217, 48, 37, 0.4)' : 'rgba(201,168,110,0.3)',
                          boxShadow: errors.email ? '0 0 0 3px rgba(217, 48, 37, 0.05)' : 'none',
                        }}
                        onFocus={e => {
                          setActiveField('email')
                          e.target.style.borderColor = errors.email ? 'rgba(217, 48, 37, 0.6)' : 'rgba(201,168,110,0.6)'
                          e.target.style.boxShadow = errors.email ? '0 0 0 3px rgba(217, 48, 37, 0.1)' : '0 0 0 3px rgba(201,168,110,0.1)'
                        }}
                        onBlur={e => {
                          setActiveField(null)
                          e.target.style.borderColor = errors.email ? 'rgba(217, 48, 37, 0.4)' : 'rgba(201,168,110,0.3)'
                          e.target.style.boxShadow = errors.email ? '0 0 0 3px rgba(217, 48, 37, 0.05)' : 'none'
                        }}
                      />
                      <AnimatePresence mode="wait">
                        {errors.email ? (
                          <motion.p
                            key="error-email"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            style={{ color: '#d93025', fontSize: '12px', marginTop: '6px', fontWeight: 500 }}
                          >
                            {errors.email}
                          </motion.p>
                        ) : activeField === 'email' ? (
                          <motion.p
                            key="hint-email"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            style={{ color: 'rgba(90,70,40,0.45)', fontSize: '11px', marginTop: '6px', fontWeight: 500, letterSpacing: '0.02em' }}
                          >
                            Requirement: {hints.email}
                          </motion.p>
                        ) : null}
                      </AnimatePresence>
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
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <CountryCodeDropdown
                          value={formData.countryCode}
                          onChange={(val) => setFormData(prev => ({ ...prev, countryCode: val }))}
                        />
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="00000 00000"
                          value={formData.phone}
                          onChange={handleChange}
                          style={{
                            ...inputStyle,
                            flex: 1,
                            borderColor: errors.phone ? 'rgba(217, 48, 37, 0.4)' : 'rgba(201,168,110,0.3)',
                            boxShadow: errors.phone ? '0 0 0 3px rgba(217, 48, 37, 0.05)' : 'none',
                          }}
                          onFocus={e => {
                            setActiveField('phone')
                            e.target.style.borderColor = errors.phone ? 'rgba(217, 48, 37, 0.6)' : 'rgba(201,168,110,0.6)'
                            e.target.style.boxShadow = errors.phone ? '0 0 0 3px rgba(217, 48, 37, 0.1)' : '0 0 0 3px rgba(201,168,110,0.1)'
                          }}
                          onBlur={e => {
                            setActiveField(null)
                            e.target.style.borderColor = errors.phone ? 'rgba(217, 48, 37, 0.4)' : 'rgba(201,168,110,0.3)'
                            e.target.style.boxShadow = errors.phone ? '0 0 0 3px rgba(217, 48, 37, 0.05)' : 'none'
                          }}
                        />
                      </div>
                      <AnimatePresence mode="wait">
                        {errors.phone ? (
                          <motion.p
                            key="error-phone"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            style={{ color: '#d93025', fontSize: '12px', marginTop: '6px', fontWeight: 500 }}
                          >
                            {errors.phone}
                          </motion.p>
                        ) : activeField === 'phone' ? (
                          <motion.p
                            key="hint-phone"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            style={{ color: 'rgba(90,70,40,0.45)', fontSize: '11px', marginTop: '6px', fontWeight: 500, letterSpacing: '0.02em' }}
                          >
                            Requirement: {hints.phone}
                          </motion.p>
                        ) : null}
                      </AnimatePresence>
                    </div>
                    <div>
                      <label style={labelStyle}>Subject</label>
                      <SubjectDropdown
                        value={formData.subject}
                        onChange={(val) => setFormData(prev => ({ ...prev, subject: val }))}
                      />
                    </div>
                  </div>

                  {/* Message field */}
                  <div>
                    <label htmlFor="message" style={labelStyle}>Message</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      style={{
                        ...inputStyle,
                        resize: 'none',
                        borderColor: errors.message ? 'rgba(217, 48, 37, 0.4)' : 'rgba(201,168,110,0.3)',
                        boxShadow: errors.message ? '0 0 0 3px rgba(217, 48, 37, 0.05)' : 'none',
                      }}
                      onFocus={e => {
                        setActiveField('message')
                        e.target.style.borderColor = errors.message ? 'rgba(217, 48, 37, 0.6)' : 'rgba(201,168,110,0.6)'
                        e.target.style.boxShadow = errors.message ? '0 0 0 3px rgba(217, 48, 37, 0.1)' : '0 0 0 3px rgba(201,168,110,0.1)'
                      }}
                      onBlur={e => {
                        setActiveField(null)
                        e.target.style.borderColor = errors.message ? 'rgba(217, 48, 37, 0.4)' : 'rgba(201,168,110,0.3)'
                        e.target.style.boxShadow = errors.message ? '0 0 0 3px rgba(217, 48, 37, 0.05)' : 'none'
                      }}
                    />
                    <AnimatePresence mode="wait">
                      {errors.message ? (
                        <motion.p
                          key="error-message"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          style={{ color: '#d93025', fontSize: '12px', marginTop: '6px', fontWeight: 500 }}
                        >
                          {errors.message}
                        </motion.p>
                      ) : activeField === 'message' ? (
                        <motion.p
                          key="hint-message"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          style={{ color: 'rgba(90,70,40,0.45)', fontSize: '11px', marginTop: '6px', fontWeight: 500, letterSpacing: '0.02em' }}
                        >
                          Requirement: {hints.message}
                        </motion.p>
                      ) : null}
                    </AnimatePresence>
                    {/* Character counter */}
                    <p style={{
                      fontSize: '12px',
                      color: 'rgba(42,34,24,0.4)',
                      textAlign: 'right',
                      marginTop: '8px',
                      fontWeight: 500,
                    }}>
                      {formData.message.length} characters
                    </p>
                  </div>

                  {/* Terms & Privacy checkbox */}
                  <div style={{ marginTop: '4px' }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      cursor: 'none',
                      userSelect: 'none',
                    }}>
                      <div style={{ position: 'relative', marginTop: '2px' }}>
                        <input
                          type="checkbox"
                          checked={formData.agreed}
                          onChange={(e) => setFormData(prev => ({ ...prev, agreed: e.target.checked }))}
                          style={{
                            width: '20px',
                            height: '20px',
                            opacity: 0,
                            position: 'absolute',
                            cursor: 'none',
                            zIndex: 2,
                          }}
                        />
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '6px',
                          border: `2px solid ${errors.agreed ? 'rgba(217, 48, 37, 0.6)' : formData.agreed ? '#c9a86e' : 'rgba(201,168,110,0.3)'}`,
                          background: formData.agreed ? '#c9a86e' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                        }}>
                          {formData.agreed && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span style={{
                        fontSize: '14px',
                        color: 'rgba(42,34,24,0.65)',
                        lineHeight: 1.5,
                      }}>
                        I agree to the{' '}
                        <a href="/terms-of-service" style={{ color: '#c9a86e', textDecoration: 'none', fontWeight: 500 }}>Terms & Conditions</a>
                        {' '}and{' '}
                        <a href="/privacy-policy" style={{ color: '#c9a86e', textDecoration: 'none', fontWeight: 500 }}>Privacy Policy</a>
                      </span>
                    </label>
                    <AnimatePresence mode="wait">
                      {errors.agreed && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          style={{ color: '#d93025', fontSize: '12px', marginTop: '8px', fontWeight: 500, marginLeft: '32px' }}
                        >
                          {errors.agreed}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      background: isSubmitting ? '#2a2a2e' : '#1a1a1e',
                      color: '#ffffff',
                      fontWeight: 600,
                      borderRadius: '9999px',
                      height: '56px',
                      width: '100%',
                      border: 'none',
                      fontSize: '15px',
                      letterSpacing: '0.02em',
                      cursor: isSubmitting ? 'wait' : 'none',
                      transition: 'all 0.3s ease',
                      fontFamily: 'inherit',
                      marginTop: '8px',
                      position: 'relative',
                      overflow: 'hidden',
                      opacity: isSubmitting ? 0.8 : 1,
                    }}
                    onMouseEnter={e => {
                      if (isSubmitting) return
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.background = '#2a2a2e'
                      el.style.transform = 'translateY(-1px)'
                      el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'
                    }}
                    onMouseLeave={e => {
                      if (isSubmitting) return
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.background = isSubmitting ? '#2a2a2e' : '#1a1a1e'
                      el.style.transform = 'translateY(0)'
                      el.style.boxShadow = 'none'
                    }}
                  >
                    {isSubmitting ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          style={{
                            width: '16px',
                            height: '16px',
                            border: '2px solid rgba(255,255,255,0.3)',
                            borderTopColor: '#ffffff',
                            borderRadius: '50%',
                          }}
                        />
                        Sending...
                      </div>
                    ) : (
                      <>
                        Send Message
                        <span style={{
                          display: 'inline-block',
                          marginLeft: '10px',
                          transition: 'transform 0.3s ease',
                        }}>
                          &rarr;
                        </span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '40px 0',
                  minHeight: '400px',
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'rgba(201,168,110,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '32px',
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2a2218" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
                <h3 style={{
                  fontSize: '28px',
                  color: '#2a2218',
                  marginBottom: '16px',
                  fontWeight: 400,
                }}>
                  Message sent successfully!
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: 'rgba(42,34,24,0.6)',
                  lineHeight: 1.6,
                  maxWidth: '320px',
                  marginBottom: '40px',
                }}>
                  Thank you for reaching out. We&apos;ve received your message and will get back to you within 24 hours.
                </p>
                <button
                  onClick={resetForm}
                  style={{
                    background: '#1a1a1e',
                    color: '#ffffff',
                    padding: '14px 28px',
                    borderRadius: '9999px',
                    fontSize: '14px',
                    fontWeight: 500,
                    border: 'none',
                    cursor: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-1px)'
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
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
