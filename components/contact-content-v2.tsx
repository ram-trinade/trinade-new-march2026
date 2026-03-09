'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

/* ═══════════════════════════════════════════════════════════════
   CONTACT CONTENT V2 — Awwwards-quality green gradient aesthetic
   Inspired by "Green Gradient Design" reference images:
   - Soft emanation glow on deep black (Image 1)
   - Silk diagonal fold energy (Image 2)
   - Heavy film grain for cinematic texture
   ═══════════════════════════════════════════════════════════════ */

const countryCodes = [
  { code: '+1', flag: '🇺🇸', name: 'US' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+91', flag: '🇮🇳', name: 'IN' },
  { code: '+61', flag: '🇦🇺', name: 'AU' },
  { code: '+49', flag: '🇩🇪', name: 'DE' },
  { code: '+33', flag: '🇫🇷', name: 'FR' },
  { code: '+81', flag: '🇯🇵', name: 'JP' },
  { code: '+86', flag: '🇨🇳', name: 'CN' },
  { code: '+55', flag: '🇧🇷', name: 'BR' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
]

const subjectOptions = [
  'Select a subject...',
  'Give Feedback',
  'Report an Issue/Bug',
  'Request a Feature',
  'Ask for Technical Support',
  'Propose a Partnership',
]

const inputClasses =
  'bg-white/[0.05] border border-white/[0.08] rounded-2xl px-5 py-4 text-[14px] text-white/90 placeholder:text-white/20 focus:border-[#00d4aa]/40 focus:bg-white/[0.07] focus:outline-none transition-all duration-500 w-full'

const selectClasses =
  'bg-white/[0.05] border border-white/[0.08] rounded-2xl px-5 py-4 text-[14px] text-white/90 focus:border-[#00d4aa]/40 focus:bg-white/[0.07] focus:outline-none transition-all duration-500 w-full appearance-none cursor-pointer'

const labelClasses = 'text-[12px] text-white/35 tracking-[0.06em] uppercase mb-2.5 block'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
}

/* ─── Noise/Grain SVG as data URL — matched to footer grain (baseFrequency 0.85, 180px tiles) ─── */
const grainSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

/* ─── Custom Country Code Dropdown ─── */
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
        className="bg-white/[0.05] border border-white/[0.08] rounded-2xl px-4 py-4 text-[14px] text-white/90 focus:border-[#00d4aa]/40 focus:bg-white/[0.07] focus:outline-none transition-all duration-500 w-full flex items-center justify-between gap-1.5"
      >
        <span className="flex items-center gap-2 truncate">
          <span className="text-[16px] leading-none">{selected.flag}</span>
          <span className="text-white/60">{selected.code}</span>
        </span>
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          className={`text-white/25 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-2xl border border-white/[0.10] bg-[#060e09]/95 shadow-[0_12px_48px_rgba(0,0,0,0.5)] overflow-hidden"
            style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
          >
            <div className="max-h-[220px] overflow-y-auto py-1.5">
              {countryCodes.map((cc) => (
                <button
                  key={cc.code} type="button"
                  onClick={() => { onChange(cc.code); setIsOpen(false) }}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] transition-colors duration-200 ${
                    cc.code === value
                      ? 'bg-[#00d4aa]/12 text-[#00d4aa]'
                      : 'text-white/50 hover:bg-white/[0.05] hover:text-white/70'
                  }`}
                >
                  <span className="text-[16px] leading-none">{cc.flag}</span>
                  <span className="font-medium">{cc.name}</span>
                  <span className="text-white/20 ml-auto text-[12px]">{cc.code}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ContactContentV2() {
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

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: '#060e09' }}>

      {/* ═══ ATMOSPHERIC BACKGROUND — Harmonized with footer ═══ */}

      {/* Layer 1: Soft green emanation — subtle upper-center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 55% 15%, rgba(0, 212, 170, 0.07) 0%, rgba(22, 74, 50, 0.04) 40%, transparent 70%),
            radial-gradient(ellipse 45% 60% at 25% 55%, rgba(13, 80, 50, 0.06) 0%, transparent 55%),
            radial-gradient(ellipse 55% 40% at 75% 50%, rgba(0, 212, 170, 0.04) 0%, transparent 55%)
          `,
        }}
      />

      {/* Layer 2: Diagonal silk gloss — subtle specular highlight for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(145deg, transparent 25%, rgba(255, 255, 255, 0.012) 42%, rgba(255, 255, 255, 0.022) 48%, rgba(255, 255, 255, 0.012) 54%, transparent 70%)
          `,
        }}
      />

      {/* Layer 3: Warm amber accent echo — matches footer upper-left orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-5%',
          left: '-3%',
          width: '50%',
          height: '40%',
          background: 'radial-gradient(ellipse at center, rgba(180, 130, 55, 0.025) 0%, rgba(180, 130, 55, 0.008) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Layer 4: Film grain — matched to footer grain (0.85 baseFreq, 180px, overlay) */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: grainSvg,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
          opacity: 0.35,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Layer 5: Gentle vignette — lighter than before for balanced tonality */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 75% at 50% 45%, transparent 40%, rgba(6, 14, 9, 0.35) 100%)
          `,
        }}
      />

      {/* Layer 6: Bottom transition zone — seamless blend into footer */}
      <div
        className="absolute pointer-events-none left-0 right-0 bottom-0"
        style={{
          height: '300px',
          background: `
            linear-gradient(180deg,
              transparent 0%,
              rgba(6, 14, 9, 0.3) 40%,
              rgba(6, 14, 9, 0.5) 70%,
              rgba(6, 14, 9, 0.5) 100%
            )
          `,
        }}
      />

      {/* Layer 7: Bottom teal atmosphere — echoes footer teal orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '0',
          right: '-5%',
          width: '50%',
          height: '35%',
          background: 'radial-gradient(ellipse at center, rgba(0, 212, 170, 0.035) 0%, rgba(22, 74, 50, 0.02) 35%, transparent 65%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Layer 8: Bottom ribbon echo — mirrors footer top ribbon glow */}
      <div
        className="absolute pointer-events-none left-0 right-0 bottom-0"
        style={{
          height: '120px',
          background: `linear-gradient(0deg, rgba(22, 74, 50, 0.04) 0%, rgba(13, 31, 24, 0.02) 50%, transparent 100%)`,
          maskImage: 'linear-gradient(90deg, transparent 8%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 75%, transparent 92%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 8%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 75%, transparent 92%)',
        }}
      />

      {/* ═══ CONTENT ═══ */}
      <div className="relative z-[2]">

        {/* ===== HERO — Floating headline in atmospheric glow ===== */}
        <section className="pt-40 pb-16 px-[calc(12.5vw+0.8rem)]">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-end">
              {/* Left — Headline */}
              <div>
                <motion.div
                  {...fadeUp}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.15em] uppercase text-[#00d4aa]/70 mb-10">
                    <span className="w-8 h-px bg-[#00d4aa]/40" />
                    Contact
                  </span>
                </motion.div>

                <motion.h1
                  {...fadeUp}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[clamp(3rem,6vw,5.5rem)] font-extralight leading-[1.02] tracking-[-0.04em] text-white/95"
                >
                  Get in
                  <br />
                  <span className="text-white/30">touch</span>
                </motion.h1>
              </div>

              {/* Right — Minimal contact details */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-6 lg:pb-3"
              >
                <p className="text-[15px] text-white/30 leading-relaxed max-w-[360px]">
                  We&apos;d love to hear from you. Reach out and let&apos;s build something extraordinary together.
                </p>
                <div className="flex flex-col gap-3">
                  <a href="mailto:info@trinade.com" className="text-[14px] text-white/50 hover:text-[#00d4aa] transition-colors duration-500 flex items-center gap-3 group">
                    <span className="w-5 h-px bg-white/15 group-hover:bg-[#00d4aa]/40 group-hover:w-8 transition-all duration-500" />
                    info@trinade.com
                  </a>
                  <a href="tel:+919490754923" className="text-[14px] text-white/50 hover:text-[#00d4aa] transition-colors duration-500 flex items-center gap-3 group">
                    <span className="w-5 h-px bg-white/15 group-hover:bg-[#00d4aa]/40 group-hover:w-8 transition-all duration-500" />
                    +91 949 075 4923
                  </a>
                  <span className="text-[14px] text-white/50 flex items-center gap-3">
                    <span className="w-5 h-px bg-white/15" />
                    Guntur, AP, India
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== SEPARATOR LINE ===== */}
        <div className="px-[calc(12.5vw+0.8rem)]">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[1400px] mx-auto h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent origin-left"
          />
        </div>

        {/* ===== FORM — Centered, minimal glass ===== */}
        <section className="py-20 px-[calc(12.5vw+0.8rem)]">
          <div className="max-w-[640px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Name Row */}
                <motion.div
                  {...fadeUp}
                  transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <label className={labelClasses}>First Name</label>
                    <input
                      type="text" placeholder="John"
                      value={firstName} onChange={(e) => setFirstName(e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Last Name</label>
                    <input
                      type="text" placeholder="Doe"
                      value={lastName} onChange={(e) => setLastName(e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}>
                  <label className={labelClasses}>Email</label>
                  <input
                    type="email" placeholder="john@example.com"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className={inputClasses}
                  />
                </motion.div>

                {/* Phone */}
                <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                  <label className={labelClasses}>Phone</label>
                  <div className="grid grid-cols-[130px_1fr] gap-3">
                    <CountryCodeDropdown value={countryCode} onChange={setCountryCode} />
                    <input
                      type="tel" placeholder="(555) 123-4567"
                      value={phone} onChange={(e) => setPhone(e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                </motion.div>

                {/* Subject */}
                <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}>
                  <label className={labelClasses}>Subject</label>
                  <div className="relative">
                    <select
                      value={subject} onChange={(e) => setSubject(e.target.value)}
                      className={`${selectClasses} ${!subject ? 'text-white/20' : 'text-white/90'}`}
                    >
                      {subjectOptions.map((opt, i) => (
                        <option key={opt} value={i === 0 ? '' : opt} className="bg-[#060e09] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                    <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/25" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </motion.div>

                {/* Message */}
                <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                  <label className={labelClasses}>Message</label>
                  <textarea
                    rows={5} maxLength={300}
                    placeholder="Tell us about your project..."
                    value={message} onChange={(e) => setMessage(e.target.value)}
                    className={`${inputClasses} resize-none`}
                  />
                  <div className="text-[11px] text-white/15 text-right mt-1.5">{message.length}/300</div>
                </motion.div>

                {/* Submit */}
                <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}>
                  <button
                    type="submit"
                    className="w-full bg-[#00d4aa] text-[#030806] font-semibold text-[13px] tracking-[0.06em] uppercase rounded-2xl py-4.5 mt-3 inline-flex items-center justify-center gap-2.5 hover:bg-[#00e8bc] hover:shadow-[0_0_60px_rgba(0,212,170,0.15)] transition-all duration-500 cursor-pointer"
                  >
                    Send Message
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* ===== COMMUNITY — Elegant minimal ===== */}
        <section className="pt-16 pb-28 px-[calc(12.5vw+0.8rem)]">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col items-center text-center mb-16">
              <motion.span
                initial="initial" whileInView="animate" viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.15em] uppercase text-[#00d4aa]/70 mb-8"
              >
                <span className="w-8 h-px bg-[#00d4aa]/40" />
                Community
                <span className="w-8 h-px bg-[#00d4aa]/40" />
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(1.8rem,3.5vw,3rem)] font-extralight text-white/85 tracking-[-0.03em]"
              >
                Join the conversation
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { name: 'Twitter / X', desc: 'Tips, announcements, and updates.', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { name: 'GitHub', desc: 'Contribute, report, and collaborate.', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
                { name: 'Discord', desc: 'Connect, ask questions, share.', icon: 'M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z' },
              ].map((card, index) => (
                <motion.a
                  key={card.name}
                  href="#"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group border border-white/[0.06] rounded-2xl p-7 transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.02]"
                >
                  <div className="text-white/15 group-hover:text-[#00d4aa]/40 transition-colors duration-500 mb-5">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                      <path d={card.icon} />
                    </svg>
                  </div>
                  <h3 className="text-[15px] font-medium text-white/70 group-hover:text-white/90 transition-colors duration-500 mb-1.5">{card.name}</h3>
                  <p className="text-[13px] text-white/25 leading-relaxed">{card.desc}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
