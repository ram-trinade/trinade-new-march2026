'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { BlurFade } from '@/components/ui/blur-fade'

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
    handle: '@trinade_ai',
    description: 'Follow for product updates, AI insights, and announcements.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    handle: 'trinade-ai',
    description: 'Explore our open-source projects, report bugs, and contribute.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'Discord',
    handle: 'Join the server',
    description: 'Chat with the team, ask questions, and connect with the community.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
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
        className="bg-white/[0.05] border border-white/[0.10] rounded-xl px-3.5 h-[56px] text-[15px] text-white/90 focus:border-[#00d4aa]/40 focus:outline-none transition-all duration-300 w-full flex items-center justify-between gap-1.5"
      >
        <span className="flex items-center gap-2 truncate">
          <span className="text-[16px] leading-none">{selected.flag}</span>
          <span className="text-white/70">{selected.code}</span>
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
            <div className="max-h-[220px] overflow-y-auto py-1.5">
              {countryCodes.map((cc) => (
                <button
                  key={cc.code}
                  type="button"
                  onClick={() => {
                    onChange(cc.code)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] transition-colors duration-200 ${
                    cc.code === value
                      ? 'bg-[#00d4aa]/10 text-[#00d4aa]'
                      : 'text-white/60 hover:bg-white/[0.05] hover:text-white/80'
                  }`}
                >
                  <span className="text-[16px] leading-none">{cc.flag}</span>
                  <span className="font-medium">{cc.name}</span>
                  <span className="text-white/30 ml-auto text-[12px]">{cc.code}</span>
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
      {/* ── Atmospheric background layers ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Teal ambient glow — top left */}
        <div
          className="absolute -top-[30%] -left-[15%] w-[60%] h-[60%] rounded-full opacity-[0.04]"
          style={{
            background:
              'radial-gradient(circle, #00d4aa 0%, transparent 70%)',
          }}
        />
        {/* Green ambient glow — bottom right */}
        <div
          className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full opacity-[0.03]"
          style={{
            background:
              'radial-gradient(circle, #1a6b4a 0%, transparent 70%)',
          }}
        />
        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
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
                  href="mailto:hello@trinade.ai"
                  className="text-[16px] text-[#00d4aa] hover:text-[#00e4b8] transition-colors duration-300"
                >
                  hello@trinade.ai
                </a>
                <div className="mt-6">
                  <p className="text-[12px] text-white/40 tracking-[0.08em] uppercase mb-3 font-medium">
                    Headquarters
                  </p>
                  <p className="text-[14px] text-white/60 leading-[1.7]">
                    Hyderabad, Telangana<br />
                    India
                  </p>
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
                  <div className="grid grid-cols-[140px_1fr] gap-3">
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
                <div className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 transition-all duration-400 hover:bg-white/[0.04] hover:border-white/[0.10] cursor-pointer">
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
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
