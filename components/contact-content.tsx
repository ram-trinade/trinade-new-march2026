'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

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
  'bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-[14px] text-white placeholder:text-white/30 focus:border-[#00d4aa]/40 focus:bg-white/[0.06] focus:outline-none transition-all duration-300 w-full'

const selectClasses =
  'bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-[14px] text-white focus:border-[#00d4aa]/40 focus:bg-white/[0.06] focus:outline-none transition-all duration-300 w-full appearance-none cursor-pointer'

const labelClasses = 'text-[13px] text-white/60 tracking-[0.02em] mb-2 block'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

const communityCards = [
  {
    name: 'Twitter / X',
    description: 'Stay updated with tips, announcements, and general info.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    description: 'Report bugs, request features and contribute to the project.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'Discord',
    description: 'Join the community, ask questions, and share tips.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
      </svg>
    ),
  },
]

/* --- Custom Country Code Dropdown --- */
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

  // Click-outside handler
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
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-3.5 py-3.5 text-[14px] text-white focus:border-[#00d4aa]/40 focus:bg-white/[0.06] focus:outline-none transition-all duration-300 w-full flex items-center justify-between gap-1.5"
      >
        <span className="flex items-center gap-2 truncate">
          <span className="text-[16px] leading-none">{selected.flag}</span>
          <span className="text-white/80">{selected.code}</span>
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

      {/* Dropdown Panel */}
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
            <div className="max-h-[220px] overflow-y-auto py-1.5 scrollbar-thin">
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
                      : 'text-white/70 hover:bg-white/[0.06] hover:text-white/90'
                  }`}
                >
                  <span className="text-[16px] leading-none">{cc.flag}</span>
                  <span className="font-medium">{cc.name}</span>
                  <span className="text-white/35 ml-auto text-[12px]">{cc.code}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ContactContent() {
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
    <div className="relative">
      {/* Atmospheric overlays */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: '10%',
          right: '10%',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(ellipse, rgba(0,212,170,0.04), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          top: '20%',
          left: '-5%',
          width: '40%',
          height: '40%',
          background: 'radial-gradient(ellipse, rgba(180,130,55,0.03), transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* ===== Section 1: Contact Form ===== */}
      <section className="pt-40 pb-24 px-[calc(12.5vw+0.8rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 max-w-[1400px] mx-auto">
          {/* Left Column — Heading + Context */}
          <div>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase text-[#00d4aa] mb-8">
                <span>&#10022;</span>
                Contact Us
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[clamp(2.4rem,5vw,4.2rem)] font-light leading-[1.08] tracking-[-0.025em]"
            >
              <span className="text-white/95">Let&apos;s Get</span>{' '}
              <span className="text-white/40">In Touch.</span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[15px] text-white/45 leading-relaxed max-w-[420px] mt-6"
            >
              Have a question, idea, or just want to say hello? Fill out the form and we&apos;ll get
              back to you as soon as possible. We&apos;d love to hear from you.
            </motion.p>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[15px] text-white/45 leading-relaxed mt-4"
            >
              Or just reach out manually to{' '}
              <a
                href="mailto:hello@trinade.ai"
                className="text-[#00d4aa] hover:underline transition-all duration-300"
              >
                hello@trinade.ai
              </a>
            </motion.p>
          </div>

          {/* Right Column — The Form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Row 1: First Name + Last Name */}
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="grid grid-cols-2 gap-4"
              >
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
              </motion.div>

              {/* Row 2: Email */}
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <label className={labelClasses}>Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClasses}
                />
              </motion.div>

              {/* Row 3: Phone Number */}
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <label className={labelClasses}>Phone Number</label>
                <div className="grid grid-cols-[130px_1fr] gap-3">
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
              </motion.div>

              {/* Row 4: Subject */}
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <label className={labelClasses}>Subject</label>
                <div className="relative">
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={`${selectClasses} ${!subject ? 'text-white/30' : 'text-white'}`}
                  >
                    {subjectOptions.map((opt, i) => (
                      <option
                        key={opt}
                        value={i === 0 ? '' : opt}
                        className="bg-[#0d1f18] text-white"
                      >
                        {opt}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </motion.div>

              {/* Row 5: Message */}
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <label className={labelClasses}>Message</label>
                <textarea
                  rows={5}
                  maxLength={300}
                  placeholder="Tell us more about your inquiry..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputClasses} resize-none`}
                />
                <div className="text-[12px] text-white/30 text-right mt-1">
                  {message.length}/300
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <button
                  type="submit"
                  className="w-full bg-[#00d4aa] text-[#060e09] font-semibold text-[14px] tracking-[0.04em] rounded-xl py-4 mt-2 inline-flex items-center justify-center gap-2 hover:bg-[#00e4b8] hover:shadow-[0_0_40px_rgba(0,212,170,0.15)] transition-all duration-300 cursor-pointer"
                >
                  Send Message
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ===== Section 2: Join Our Community ===== */}
      <section className="mt-32 pb-24 px-[calc(12.5vw+0.8rem)]">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center">
            <motion.span
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
              whileInView="animate"
              initial="initial"
              className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase text-[#00d4aa] mb-8"
            >
              <span>&#10022;</span>
              Community
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[clamp(2rem,4vw,3.5rem)] font-light text-white/95 text-center"
            >
              Join Our Community
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[15px] text-white/45 text-center max-w-[500px] mx-auto mt-4"
            >
              Connect, learn, and grow with fellow designers and developers.
            </motion.p>
          </div>

          {/* Community Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {communityCards.map((card, index) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 text-center transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.10] group cursor-pointer"
              >
                <div className="text-white/25 group-hover:text-white/40 transition-colors duration-300 mx-auto mb-5 flex justify-center">
                  {card.icon}
                </div>
                <h3 className="text-[16px] font-medium text-white/90 mb-2">{card.name}</h3>
                <p className="text-[13px] text-white/45 leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Bottom Text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[13px] text-white/25 text-center mt-10"
          >
            Be part of a community that connects, learns, and grows together.
          </motion.p>
        </div>
      </section>
    </div>
  )
}
