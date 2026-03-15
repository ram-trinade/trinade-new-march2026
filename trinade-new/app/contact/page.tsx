'use client'

import dynamic from 'next/dynamic'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const PremiumCursor = dynamic(() => import('@/components/premium-cursor'), { ssr: false })
const SolutionsNavbar = dynamic(() => import('@/components/solutions-navbar'), { ssr: false })
const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'), { ssr: false })
const SolutionsFooter = dynamic(() => import('@/components/solutions-footer'), { ssr: false })

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

  // Close on click outside
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

  // Close on Escape
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
      {/* Trigger button */}
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
        {/* Chevron */}
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

      {/* Dropdown panel */}
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

export default function SolutionsContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

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
    transition: 'border-color 0.2s ease',
    fontFamily: 'inherit',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
    color: 'rgba(90,70,40,0.6)',
    marginBottom: '8px',
  }

  return (
    <>
      <style>{`.solutions-page, .solutions-page * { cursor: none !important; }`}</style>
      <div className="solutions-page relative bg-[#f2ede6]" style={{ cursor: 'none' }}>
        <PremiumCursor />
        <SolutionsNavbar />
        <SmoothScroll>

          {/* Hero Section */}
          <section
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#f2ede6',
              textAlign: 'center',
              padding: '0 24px',
            }}
          >
            {/* Atmospheric CSS background */}
            <div style={{
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
              pointerEvents: 'none',
            }}>
              {/* Radial gradient orbs */}
              <div style={{
                position: 'absolute',
                top: '-20%',
                right: '-10%',
                width: '70%',
                height: '70%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(201,168,110,0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }} />
              <div style={{
                position: 'absolute',
                bottom: '-30%',
                left: '-15%',
                width: '80%',
                height: '80%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(220,195,150,0.12) 0%, transparent 70%)',
                filter: 'blur(80px)',
              }} />
              <div style={{
                position: 'absolute',
                top: '30%',
                left: '40%',
                width: '40%',
                height: '40%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(185,155,100,0.08) 0%, transparent 60%)',
                filter: 'blur(50px)',
              }} />
              {/* Grain overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.35,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '128px 128px',
              }} />
            </div>

            {/* CONTACT watermark */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 'clamp(220px, 35vw, 450px)',
              fontWeight: 900,
              color: 'rgba(201,168,110,0.05)',
              letterSpacing: '-0.04em',
              userSelect: 'none',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              lineHeight: 1,
            }}>
              CONTACT
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative', zIndex: 1 }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: 'clamp(4rem, 8vw, 7rem)',
                  fontWeight: 600,
                  color: '#2a2218',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  margin: '0 0 20px',
                }}
              >
                Get in touch
              </motion.h1>

              {/* Animated gold line */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '80px', opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(201,168,110,0.6), transparent)',
                  margin: '0 auto 24px',
                }}
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: 'clamp(18px, 1.5vw, 22px)',
                  color: 'rgba(42,34,24,0.7)',
                  maxWidth: '600px',
                  margin: '0 auto',
                  lineHeight: 1.6,
                }}
              >
                We&apos;d love to hear from you. Let&apos;s discuss how our solutions can transform your enterprise.
              </motion.p>
            </motion.div>
          </section>

          {/* Form Section */}
          <section
            style={{
              padding: '80px 24px 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 48, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%',
                maxWidth: '640px',
                background: 'linear-gradient(165deg, rgba(201,168,110,0.35) 0%, rgba(180,130,55,0.25) 40%, rgba(220,195,150,0.30) 100%)',
                backdropFilter: 'blur(24px) saturate(1.6)',
                WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
                boxShadow: '0 8px 32px rgba(160,120,50,0.15), inset 0 1px 0 rgba(255,255,255,0.25)',
                border: '1px solid rgba(201,168,110,0.25)',
                borderRadius: '28px',
                padding: '48px',
              }}
            >
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                {/* Name */}
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
                    onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(201,168,110,0.6)' }}
                    onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(201,168,110,0.3)' }}
                  />
                </div>

                {/* Email */}
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
                    onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(201,168,110,0.6)' }}
                    onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(201,168,110,0.3)' }}
                  />
                </div>

                {/* Phone */}
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
                    onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(201,168,110,0.6)' }}
                    onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(201,168,110,0.3)' }}
                  />
                </div>

                {/* Subject — Custom Dropdown */}
                <div>
                  <label style={labelStyle}>Subject</label>
                  <SubjectDropdown
                    value={formData.subject}
                    onChange={(val) => setFormData(prev => ({ ...prev, subject: val }))}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" style={labelStyle}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us about your project or question…"
                    value={formData.message}
                    onChange={handleChange}
                    style={{
                      ...inputStyle,
                      resize: 'vertical',
                      minHeight: '120px',
                    }}
                    onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(201,168,110,0.6)' }}
                    onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(201,168,110,0.3)' }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  style={{
                    background: '#1a1a1e',
                    color: '#ffffff',
                    fontWeight: 600,
                    borderRadius: '9999px',
                    height: '52px',
                    width: '100%',
                    border: 'none',
                    fontSize: '15px',
                    letterSpacing: '0.01em',
                    cursor: 'none',
                    transition: 'background 0.2s ease',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = '#2a2a2e' }}
                  onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = '#1a1a1e' }}
                >
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Direct contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginTop: '48px',
                textAlign: 'center',
                opacity: 0.5,
                color: '#2a2218',
              }}
            >
              <p style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
                Or reach us directly
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.8 }}>
                <a href="mailto:info@trinade.com" style={{ color: 'inherit', textDecoration: 'none' }}>info@trinade.com</a>
                <br />
                <a href="tel:+919490754923" style={{ color: 'inherit', textDecoration: 'none' }}>+91 9490754923</a>
              </p>
            </motion.div>

            <div style={{ height: '120px' }} />
          </section>

          {/* Footer */}
          <SolutionsFooter />

        </SmoothScroll>
      </div>
    </>
  )
}
