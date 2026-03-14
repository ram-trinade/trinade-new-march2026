'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { BlurFade } from '@/components/ui/blur-fade'
import { cn } from '@/lib/utils'

/* ─── Data ─── */

const countryCodes = [
  { code: '+1', flag: '🇺🇸', name: 'United States' },
  { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: '+33', flag: '🇫🇷', name: 'France' },
  { code: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: '+86', flag: '🇨🇳', name: 'China' },
  { code: '+55', flag: '🇧🇷', name: 'Brazil' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
]

const subjectOptions = [
  'General Inquiry',
  'Partnership Opportunity',
  'Technical Support',
  'Enterprise Sales',
  'Feature Request',
  'Report an Issue',
]

const communityCards = [
  {
    name: 'Twitter / X',
    handle: '@trinadeai',
    url: 'https://x.com/trinadeai',
    description: 'Follow for product updates, AI insights, and announcements.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    handle: '@trinadeai',
    url: 'https://www.instagram.com/trinadeai',
    description: 'Behind the scenes, team culture, and visual stories from Trinade.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: 'trinadeai',
    url: 'https://www.linkedin.com/in/trinadeai/',
    description: 'Professional updates, careers, and enterprise AI thought leadership.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

/* ─── Country Code Dropdown ─── */

function CountryCodeDropdown({
  value,
  onChange,
}: {
  value: string
  onChange: (code: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selected = countryCodes.find((cc) => cc.code === value) || countryCodes[0]

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/[0.05] border border-white/[0.10] rounded-xl px-3.5 h-[56px] text-[14px] text-white/90 focus:border-[#00d4aa]/40 focus:outline-none transition-all duration-300 w-full flex items-center justify-between gap-1.5"
      >
        <span className="flex items-center gap-2">
          <span className="text-[15px] leading-[1] translate-y-[0.5px]">{selected.flag}</span>
          <span className="text-white/70 leading-[1]">{selected.code}</span>
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`text-white/40 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute left-0 w-full top-full mt-1.5 z-50 rounded-xl border border-white/[0.10] bg-[#0a1a14]/95 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
          >
            <div className="max-h-[220px] overflow-y-auto py-1.5 scrollbar-premium">
              {countryCodes.map((cc) => (
                <button
                  key={cc.code}
                  type="button"
                  onClick={() => {
                    onChange(cc.code)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-[13px] leading-[1] transition-colors duration-200 whitespace-nowrap ${
                    cc.code === value
                      ? 'bg-[#00d4aa]/10 text-[#00d4aa]'
                      : 'text-white/60 hover:bg-white/[0.05] hover:text-white/80'
                  }`}
                >
                  <span className="text-[15px] leading-[1] translate-y-[0.5px] shrink-0">{cc.flag}</span>
                  <span className="font-medium leading-[1]">{cc.name}</span>
                  <span className="text-white/30 ml-auto pl-2 text-[11px] leading-[1]">{cc.code}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Subject Dropdown ─── */

function SubjectDropdown({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/[0.05] border border-white/[0.10] rounded-xl px-4 h-[56px] text-[15px] focus:border-[#00d4aa]/40 focus:outline-none transition-all duration-300 w-full flex items-center justify-between"
      >
        <span className={value ? 'text-white/90' : 'text-white/25'}>
          {value || 'Select a subject...'}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`text-white/40 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-xl border border-white/[0.10] bg-[#0a1a14]/95 shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden"
            style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
          >
            <div className="py-1.5">
              {subjectOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors duration-200 ${
                    opt === value
                      ? 'bg-[#00d4aa]/10 text-[#00d4aa]'
                      : 'text-white/60 hover:bg-white/[0.05] hover:text-white/80'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Main Contact Content V3 ─── */

export default function ContactContentV3() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [countryCode, setCountryCode] = useState('+1')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const inputClasses =
    'bg-white/[0.05] border border-white/[0.10] rounded-xl px-4 h-[56px] text-[15px] text-white/90 placeholder:text-white/25 focus:border-[#00d4aa]/40 focus:bg-white/[0.07] focus:outline-none transition-all duration-300 w-full'

  const labelClasses =
    'text-[12px] text-white/50 tracking-[0.08em] uppercase mb-2.5 block font-medium'

  return (
    <div className="relative overflow-hidden">
      {/* ── Premium atmospheric background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Lightweight CSS dot pattern — single SVG pattern tile, no JS animation */}
        <div
          className={cn(
            'absolute inset-0 opacity-[0.35]',
            '[mask-image:radial-gradient(ellipse_70%_50%_at_50%_30%,white_10%,transparent_70%)]'
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='28' height='28' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%2300d4aa' opacity='0.14'/%3E%3C/svg%3E")`,
            backgroundSize: '28px 28px',
          }}
        />

        {/* Teal luminous bloom — top-left */}
        <div
          className="absolute -top-[20%] -left-[15%] w-[60%] h-[60%] rounded-full opacity-[0.04]"
          style={{
            background: 'radial-gradient(ellipse at 45% 45%, #00d4aa 0%, #0a3d2a 30%, transparent 65%)',
            filter: 'blur(90px)',
          }}
        />

        {/* Warm amber undertone — center-right, subtle depth */}
        <div
          className="absolute top-[20%] -right-[10%] w-[45%] h-[50%] rounded-full opacity-[0.025]"
          style={{
            background: 'radial-gradient(ellipse at 55% 50%, #b48237 0%, #1a1408 40%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />

        {/* Deep emerald atmosphere — bottom */}
        <div
          className="absolute -bottom-[10%] left-[15%] w-[70%] h-[40%] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(ellipse at 50% 75%, #0d5e3f 0%, transparent 60%)',
            filter: 'blur(110px)',
          }}
        />

        {/* Cinematic vignette */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: 'radial-gradient(ellipse 80% 70% at 50% 35%, transparent 30%, #060e09 100%)',
          }}
        />

        {/* Fine grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <section className="pt-44 pb-20 px-[calc(12.5vw+0.8rem)]">
        <div className="max-w-[1400px] mx-auto">
          <BlurFade delay={0.1} inView>
            <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#00d4aa]/20 bg-[#00d4aa]/[0.06] text-[12px] tracking-[0.1em] uppercase text-[#00d4aa] font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa]" />
              Contact
            </span>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h1
              className="font-bold text-white/95 leading-[1.02] tracking-[-0.03em] max-w-[800px]"
              style={{ fontSize: 'clamp(3.5rem, 7vw, 7rem)' }}
            >
              Get in touch
            </h1>
          </BlurFade>

          <BlurFade delay={0.35} inView>
            <p className="text-[18px] text-white/60 leading-[1.65] max-w-[520px] mt-8">
              Whether you&apos;re exploring enterprise AI solutions or want to discuss a
              partnership, we&apos;d love to hear from you. Our team typically responds within
              24 hours.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Separator line */}
      <div className="px-[calc(12.5vw+0.8rem)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SPLIT LAYOUT — EDITORIAL + FORM
      ═══════════════════════════════════════════ */}
      <section className="pt-20 pb-32 px-[calc(12.5vw+0.8rem)]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-20 lg:gap-24">
          {/* ── Left Column — Editorial ── */}
          <div className="flex flex-col justify-between">
            <div>
              <BlurFade delay={0.15} inView>
                <h2 className="text-[clamp(1.5rem,2.5vw,2.2rem)] font-semibold text-white/95 leading-[1.2] tracking-[-0.02em]">
                  Why reach out?
                </h2>
              </BlurFade>

              <div className="mt-10 space-y-8">
                {[
                  {
                    title: 'Enterprise Solutions',
                    desc: 'Custom AI deployments tailored to your infrastructure, compliance requirements, and scale.',
                  },
                  {
                    title: 'Partnership & Integration',
                    desc: 'Explore API integrations, reseller programs, and strategic technology partnerships.',
                  },
                  {
                    title: 'Technical Support',
                    desc: 'Get help from our engineering team on implementation, optimization, and troubleshooting.',
                  },
                ].map((item, i) => (
                  <BlurFade key={item.title} delay={0.2 + i * 0.1} inView>
                    <div className="group">
                      <h3 className="text-[15px] font-semibold text-white/90 mb-2 flex items-center gap-3">
                        <span className="w-1 h-1 rounded-full bg-[#00d4aa] shrink-0" />
                        {item.title}
                      </h3>
                      <p className="text-[14px] text-white/50 leading-[1.7] pl-4">
                        {item.desc}
                      </p>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>

            {/* Office info */}
            <BlurFade delay={0.5} inView>
              <div className="mt-16 pt-8 border-t border-white/[0.06]">
                <p className="text-[12px] text-white/40 tracking-[0.08em] uppercase mb-4 font-medium">
                  Direct Contact
                </p>
                <a
                  href="mailto:info@trinade.com"
                  className="text-[16px] text-[#00d4aa] hover:text-[#00e4b8] transition-colors duration-300"
                >
                  info@trinade.com
                </a>
                <div className="mt-6">
                  <p className="text-[12px] text-white/40 tracking-[0.08em] uppercase mb-3 font-medium">
                    Headquarters
                  </p>
                  <p className="text-[14px] text-white/60 leading-[1.7]">
                    #06, Green Valley Apartments, Gorantla,<br />
                    Guntur, Andhra Pradesh 522034, India
                  </p>
                </div>
                <div className="mt-6">
                  <p className="text-[12px] text-white/40 tracking-[0.08em] uppercase mb-3 font-medium">
                    Phone
                  </p>
                  <a
                    href="tel:+919490754923"
                    className="text-[14px] text-white/60 hover:text-[#00d4aa] transition-colors duration-300"
                  >
                    +91 9490754923
                  </a>
                </div>
              </div>
            </BlurFade>
          </div>

          {/* ── Right Column — Form ── */}
          <BlurFade delay={0.25} inView>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 sm:p-10">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Row: First Name + Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className={labelClasses}>Email Address</label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClasses}
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className={labelClasses}>Phone Number</label>
                  <div className="grid grid-cols-[160px_1fr] gap-3">
                    <CountryCodeDropdown
                      value={countryCode}
                      onChange={setCountryCode}
                    />
                    <input
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className={labelClasses}>Subject</label>
                  <SubjectDropdown value={subject} onChange={setSubject} />
                </div>

                {/* Message */}
                <div>
                  <label className={labelClasses}>Message</label>
                  <textarea
                    rows={5}
                    maxLength={300}
                    placeholder="Tell us about your project or inquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-white/[0.05] border border-white/[0.10] rounded-xl px-4 py-4 text-[15px] text-white/90 placeholder:text-white/25 focus:border-[#00d4aa]/40 focus:bg-white/[0.07] focus:outline-none transition-all duration-300 w-full resize-none"
                  />
                  <div className="flex justify-end mt-1.5">
                    <span className={`text-[11px] ${message.length >= 280 ? 'text-[#00d4aa]/70' : 'text-white/25'} tabular-nums transition-colors duration-200`}>
                      {message.length}/300
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-[#00d4aa] text-[#030806] font-semibold text-[14px] tracking-[0.04em] uppercase rounded-xl h-[56px] mt-2 inline-flex items-center justify-center gap-2.5 hover:bg-[#00e4b8] hover:shadow-[0_0_48px_rgba(0,212,170,0.15)] active:scale-[0.985] transition-all duration-300 cursor-pointer"
                >
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Separator line */}
      <div className="px-[calc(12.5vw+0.8rem)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          COMMUNITY SECTION
      ═══════════════════════════════════════════ */}
      <section className="pt-24 pb-32 px-[calc(12.5vw+0.8rem)]">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <BlurFade delay={0.1} inView>
              <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#00d4aa]/20 bg-[#00d4aa]/[0.06] text-[12px] tracking-[0.1em] uppercase text-[#00d4aa] font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa]" />
                Community
              </span>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <h2
                className="font-bold text-white/95 leading-[1.08] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                Join Our Community
              </h2>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <p className="text-[16px] text-white/50 max-w-[460px] mx-auto mt-5 leading-[1.6]">
                Connect with fellow developers and stay up to date with the latest from Trinade.
              </p>
            </BlurFade>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {communityCards.map((card, index) => (
              <BlurFade key={card.name} delay={0.15 + index * 0.1} inView>
                <a href={card.url} target="_blank" rel="noopener noreferrer" className="group relative block bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 transition-all duration-400 hover:bg-white/[0.04] hover:border-white/[0.10] cursor-pointer">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/40 group-hover:text-white/60 group-hover:border-white/[0.12] transition-all duration-300">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-white/90">
                        {card.name}
                      </h3>
                      <p className="text-[12px] text-white/35">{card.handle}</p>
                    </div>
                  </div>
                  <p className="text-[14px] text-white/45 leading-[1.65]">
                    {card.description}
                  </p>
                  {/* Arrow indicator */}
                  <div className="absolute top-8 right-8 text-white/20 group-hover:text-white/40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M4 10L10 4M10 4H5M10 4V9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </a>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
