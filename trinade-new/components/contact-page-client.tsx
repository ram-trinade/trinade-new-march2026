'use client'

import dynamic from 'next/dynamic'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { useGeolocation } from '@/components/geolocation-context'

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
          padding: '12px 16px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          fontWeight: 500,
          color: '#2a2218',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <span style={{ fontSize: '16px' }}>{selected.flag}</span>
        <span>{selected.code}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            marginLeft: 'auto',
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={listRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              right: 0,
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid rgba(201,168,110,0.3)',
              borderRadius: '14px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 20px 40px rgba(42,34,24,0.1)',
              zIndex: 1000,
              maxHeight: '200px',
              overflowY: 'auto',
            }}
          >
            {countryCodes.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onChange(country.code)
                  setIsOpen(false)
                }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#2a2218',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(201,168,110,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none'
                }}
              >
                <span style={{ fontSize: '16px' }}>{country.flag}</span>
                <span>{country.code}</span>
                <span style={{ color: 'rgba(42,34,24,0.6)', marginLeft: 'auto' }}>{country.country}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ContactPageClient() {
  const { location, requestLocation, isLoading: locationLoading } = useGeolocation()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    countryCode: '+91',
    phone: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Map country names to country codes
  const getCountryCodeFromCountry = (countryName: string): string => {
    const countryMap: { [key: string]: string } = {
      'India': '+91',
      'United States': '+1',
      'United Kingdom': '+44',
      'Australia': '+61',
      'Germany': '+49',
      'France': '+33',
      'Japan': '+81',
      'China': '+86',
      'UAE': '+971',
      'United Arab Emirates': '+971',
      'Singapore': '+65',
      'Saudi Arabia': '+966',
      'Brazil': '+55',
      'South Korea': '+82',
      'Italy': '+39',
      'Spain': '+34',
      'Russia': '+7',
      'South Africa': '+27',
      'Mexico': '+52',
      'Malaysia': '+60',
      'Indonesia': '+62',
    }
    return countryMap[countryName] || '+91' // Default to India
  }

  // Auto-detect and set country code based on location
  useEffect(() => {
    if (location?.country && !formData.phone) { // Only auto-set if phone is empty
      const detectedCode = getCountryCodeFromCountry(location.country)
      setFormData(prev => ({ ...prev, countryCode: detectedCode }))
    }
  }, [location, formData.phone])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <>
      <style>{`
        .contact-page, .contact-page * { cursor: none !important; }
      `}</style>

      <div className="contact-page relative" style={{ background: '#f2ede6' }}>
        <PremiumCursor />
        <SolutionsNavbar />
        <SmoothScroll>

          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #1a1510 0%, #2a1f14 25%, #1f1a12 50%, #2d2218 75%, #0f0d09 100%)',
              }}
            />

            {/* Content */}
            <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-32 text-center max-w-4xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3rem,8vw,6rem)] font-light tracking-tight leading-[0.9] mb-8"
                style={{ color: 'rgba(255,255,255,0.95)' }}
              >
                Get in Touch
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(1.1rem,2vw,1.4rem)] leading-[1.8] font-light mb-12"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                Ready to transform your business with AI? Let's discuss how Trinade can help you achieve your goals.
              </motion.p>
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="relative py-20 md:py-32">
            <div className="px-6 md:px-12 lg:px-20 xl:px-32">
              <div className="max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#2a2218' }}>
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => handleChange('firstName', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                          style={{
                            background: 'rgba(255,255,255,0.8)',
                            border: '1px solid rgba(201,168,110,0.3)',
                            color: '#2a2218',
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#2a2218' }}>
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => handleChange('lastName', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                          style={{
                            background: 'rgba(255,255,255,0.8)',
                            border: '1px solid rgba(201,168,110,0.3)',
                            color: '#2a2218',
                          }}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#2a2218' }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                        style={{
                          background: 'rgba(255,255,255,0.8)',
                          border: '1px solid rgba(201,168,110,0.3)',
                          color: '#2a2218',
                        }}
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#2a2218' }}>
                        Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                        style={{
                          background: 'rgba(255,255,255,0.8)',
                          border: '1px solid rgba(201,168,110,0.3)',
                          color: '#2a2218',
                        }}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium" style={{ color: '#2a2218' }}>
                          Phone
                        </label>
                        <button
                          type="button"
                          onClick={requestLocation}
                          disabled={locationLoading}
                          className="text-xs px-3 py-1 rounded-full border transition-colors disabled:opacity-50"
                          style={{
                            background: 'rgba(201,168,110,0.1)',
                            border: '1px solid rgba(201,168,110,0.3)',
                            color: '#c9a86e',
                          }}
                        >
                          {locationLoading ? 'Detecting...' : '📍 Detect Location'}
                        </button>
                      </div>
                      <div className="flex gap-3">
                        <CountryCodeDropdown
                          value={formData.countryCode}
                          onChange={(code) => handleChange('countryCode', code)}
                        />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                          style={{
                            background: 'rgba(255,255,255,0.8)',
                            border: '1px solid rgba(201,168,110,0.3)',
                            color: '#2a2218',
                          }}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#2a2218' }}>
                        Message *
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 resize-none"
                        style={{
                          background: 'rgba(255,255,255,0.8)',
                          border: '1px solid rgba(201,168,110,0.3)',
                          color: '#2a2218',
                        }}
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 px-8 rounded-lg font-medium text-white disabled:opacity-50"
                      style={{
                        background: 'linear-gradient(135deg, #c9a86e, #d4bb8a)',
                        border: 'none',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </motion.button>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-4 px-6 rounded-lg"
                        style={{
                          background: 'rgba(201,168,110,0.1)',
                          border: '1px solid rgba(201,168,110,0.3)',
                          color: '#c9a86e',
                        }}
                      >
                        Thank you! We'll get back to you soon.
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-4 px-6 rounded-lg"
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#dc2626',
                        }}
                      >
                        Something went wrong. Please try again.
                      </motion.div>
                    )}
                  </form>
                </motion.div>
              </div>
            </div>
          </section>

          <SolutionsFooter />
        </SmoothScroll>

        <SolutionsCookiePopup />
      </div>
    </>
  )
}