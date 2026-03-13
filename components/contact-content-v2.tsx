'use client'

import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BlurFade } from '@/components/ui/blur-fade'
import { BorderBeam } from '@/components/ui/border-beam'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

/* ═══════════════════════════════════════════════════════════════
   CONTACT CONTENT V2 — Premium editorial redesign
   ShadCN UI + MagicUI components, Awwwards-quality dark aesthetic
   Aligned with homepage hero: Manrope, atmospheric layers, motion
   ═══════════════════════════════════════════════════════════════ */

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
  'Select a subject...',
  'General Inquiry',
  'Partnership Opportunity',
  'Technical Support',
  'Request a Demo',
  'Feedback',
]

/* ─── Noise/Grain SVG — matched to footer grain ─── */
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
        className="h-[52px] bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 text-[14px] text-white/90 focus:border-[#00d4aa]/40 focus:bg-white/[0.06] focus:outline-none transition-all duration-400 w-full flex items-center justify-between gap-1.5 hover:border-white/[0.14]"
      >
        <span className="flex items-center gap-2 truncate">
          <span className="text-[16px] leading-none">{selected.flag}</span>
          <span className="text-white/50 text-[13px]">{selected.code}</span>
        </span>
        <svg
          width="10" height="10" viewBox="0 0 12 12" fill="none"
          className={`text-white/20 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl border border-white/[0.10] bg-[#0a1a14]/95 shadow-[0_16px_48px_rgba(0,0,0,0.6)] overflow-hidden"
            style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
          >
            <div className="max-h-[240px] overflow-y-auto py-1">
              {countryCodes.map((cc) => (
                <button
                  key={cc.code} type="button"
                  onClick={() => { onChange(cc.code); setIsOpen(false) }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-[13px] transition-colors duration-200 ${
                    cc.code === value
                      ? 'bg-[#00d4aa]/10 text-[#00d4aa]'
                      : 'text-white/45 hover:bg-white/[0.04] hover:text-white/70'
                  }`}
                >
                  <span className="text-[15px] leading-none">{cc.flag}</span>
                  <span className="font-medium">{cc.name}</span>
                  <span className="text-white/20 ml-auto text-[12px] tabular-nums">{cc.code}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Custom Subject Dropdown (replacing native <select>) ─── */
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
        className={`h-[52px] bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 text-[14px] focus:border-[#00d4aa]/40 focus:bg-white/[0.06] focus:outline-none transition-all duration-400 w-full flex items-center justify-between hover:border-white/[0.14] ${
          !value ? 'text-white/20' : 'text-white/90'
        }`}
      >
        <span className="truncate">{value || 'Select a subject...'}</span>
        <svg
          width="10" height="10" viewBox="0 0 12 12" fill="none"
          className={`text-white/20 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl border border-white/[0.10] bg-[#0a1a14]/95 shadow-[0_16px_48px_rgba(0,0,0,0.6)] overflow-hidden"
            style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
          >
            <div className="py-1">
              {subjectOptions.slice(1).map((opt) => (
                <button
                  key={opt} type="button"
                  onClick={() => { onChange(opt); setIsOpen(false) }}
                  className={`w-full text-left px-5 py-2.5 text-[13px] transition-colors duration-200 ${
                    opt === value
                      ? 'bg-[#00d4aa]/10 text-[#00d4aa]'
                      : 'text-white/45 hover:bg-white/[0.04] hover:text-white/70'
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

      {/* ═══ ATMOSPHERIC BACKGROUND ═══ */}

      {/* Layer 1: Central teal emanation */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 20%, rgba(0, 212, 170, 0.06) 0%, rgba(22, 74, 50, 0.03) 40%, transparent 70%),
            radial-gradient(ellipse 40% 55% at 20% 60%, rgba(13, 80, 50, 0.05) 0%, transparent 55%),
            radial-gradient(ellipse 50% 35% at 80% 45%, rgba(0, 212, 170, 0.03) 0%, transparent 55%)
          `,
        }}
      />

      {/* Layer 2: Diagonal silk */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(145deg, transparent 25%, rgba(255, 255, 255, 0.010) 42%, rgba(255, 255, 255, 0.018) 48%, rgba(255, 255, 255, 0.010) 54%, transparent 70%)`,
        }}
      />

      {/* Layer 3: Amber accent */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-5%', left: '-3%', width: '50%', height: '40%',
          background: 'radial-gradient(ellipse at center, rgba(180, 130, 55, 0.02) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Layer 4: Grain */}
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

      {/* Layer 5: Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 75% at 50% 45%, transparent 40%, rgba(6, 14, 9, 0.35) 100%)',
        }}
      />

      {/* Layer 6: Footer transition */}
      <div
        className="absolute pointer-events-none left-0 right-0 bottom-0"
        style={{
          height: '300px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(6, 14, 9, 0.3) 40%, rgba(6, 14, 9, 0.5) 100%)',
        }}
      />

      {/* ═══ CONTENT ═══ */}
      <div className="relative z-[2]">

        {/* ===== HERO — Cinematic headline ===== */}
        <section className="pt-44 pb-20 px-[calc(12.5vw+0.8rem)]">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
              {/* Left — Headline */}
              <div>
                <BlurFade delay={0.1} duration={0.6} inView>
                  <span className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.15em] uppercase text-[#00d4aa]/60 mb-8">
                    <span className="w-8 h-px bg-[#00d4aa]/30" />
                    Contact
                  </span>
                </BlurFade>

                <BlurFade delay={0.2} duration={0.8} inView>
                  <h1 className="text-[clamp(3rem,5.5vw,5rem)] font-bold leading-[1.04] tracking-[-0.04em]">
                    <span className="text-white/95">Let&apos;s build</span>
                    <br />
                    <span className="text-white/25 font-light">something great.</span>
                  </h1>
                </BlurFade>
              </div>

              {/* Right — Contact info */}
              <BlurFade delay={0.4} duration={0.7} inView>
                <div className="flex flex-col gap-7 lg:pb-4">
                  <p className="text-[15px] text-white/30 leading-[1.7] max-w-[380px] font-light">
                    Have a project in mind or want to explore how we can help? We&apos;d love to hear from you.
                  </p>
                  <div className="flex flex-col gap-4">
                    {[
                      { href: 'mailto:info@trinade.com', label: 'info@trinade.com' },
                      { href: 'tel:+919490754923', label: '+91 949 075 4923' },
                      { href: undefined, label: 'Guntur, Andhra Pradesh, India' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3 group">
                        <span className="w-5 h-px bg-white/10 group-hover:bg-[#00d4aa]/30 group-hover:w-8 transition-all duration-500" />
                        {item.href ? (
                          <a href={item.href} className="text-[14px] text-white/45 hover:text-[#00d4aa] transition-colors duration-400 font-light">
                            {item.label}
                          </a>
                        ) : (
                          <span className="text-[14px] text-white/45 font-light">{item.label}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ===== SEPARATOR ===== */}
        <div className="px-[calc(12.5vw+0.8rem)]">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[1400px] mx-auto h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent origin-left"
          />
        </div>

        {/* ===== FORM — Premium card with BorderBeam ===== */}
        <section className="py-24 px-[calc(12.5vw+0.8rem)]">
          <div className="max-w-[680px] mx-auto">
            <BlurFade delay={0.3} duration={0.8} inView>
              <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10">
                {/* BorderBeam accent */}
                <BorderBeam
                  size={120}
                  duration={8}
                  colorFrom="#00d4aa"
                  colorTo="#164a32"
                  borderWidth={1}
                />

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-[11px] text-white/30 tracking-[0.08em] uppercase">First Name</Label>
                      <Input
                        type="text"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="h-[52px] bg-white/[0.04] border-white/[0.08] rounded-xl px-5 text-[14px] text-white/90 placeholder:text-white/15 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#00d4aa]/40 focus-visible:bg-white/[0.06] transition-all duration-400 hover:border-white/[0.14]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[11px] text-white/30 tracking-[0.08em] uppercase">Last Name</Label>
                      <Input
                        type="text"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="h-[52px] bg-white/[0.04] border-white/[0.08] rounded-xl px-5 text-[14px] text-white/90 placeholder:text-white/15 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#00d4aa]/40 focus-visible:bg-white/[0.06] transition-all duration-400 hover:border-white/[0.14]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label className="text-[11px] text-white/30 tracking-[0.08em] uppercase">Email</Label>
                    <Input
                      type="email"
                      placeholder="john@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-[52px] bg-white/[0.04] border-white/[0.08] rounded-xl px-5 text-[14px] text-white/90 placeholder:text-white/15 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#00d4aa]/40 focus-visible:bg-white/[0.06] transition-all duration-400 hover:border-white/[0.14]"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label className="text-[11px] text-white/30 tracking-[0.08em] uppercase">Phone</Label>
                    <div className="grid grid-cols-[140px_1fr] gap-3">
                      <CountryCodeDropdown value={countryCode} onChange={setCountryCode} />
                      <Input
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-[52px] bg-white/[0.04] border-white/[0.08] rounded-xl px-5 text-[14px] text-white/90 placeholder:text-white/15 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#00d4aa]/40 focus-visible:bg-white/[0.06] transition-all duration-400 hover:border-white/[0.14]"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label className="text-[11px] text-white/30 tracking-[0.08em] uppercase">Subject</Label>
                    <SubjectDropdown value={subject} onChange={setSubject} />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label className="text-[11px] text-white/30 tracking-[0.08em] uppercase">Message</Label>
                    <Textarea
                      rows={5}
                      maxLength={300}
                      placeholder="Tell us about your project or question..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-white/[0.04] border-white/[0.08] rounded-xl px-5 py-4 text-[14px] text-white/90 placeholder:text-white/15 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#00d4aa]/40 focus-visible:bg-white/[0.06] transition-all duration-400 resize-none hover:border-white/[0.14] min-h-[140px]"
                    />
                    <div className="flex justify-end">
                      <span className="text-[11px] text-white/15 tabular-nums">{message.length}/300</span>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <ShimmerButton
                      type="submit"
                      shimmerColor="#00d4aa"
                      shimmerSize="0.04em"
                      shimmerDuration="2.5s"
                      borderRadius="12px"
                      background="rgba(0, 212, 170, 0.9)"
                      className="w-full h-[52px] text-[13px] font-semibold tracking-[0.06em] uppercase text-[#030806]"
                    >
                      <span className="flex items-center gap-2.5">
                        Send Message
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </ShimmerButton>
                  </div>
                </form>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ===== COMMUNITY — Refined social cards ===== */}
        <section className="pt-8 pb-32 px-[calc(12.5vw+0.8rem)]">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col items-center text-center mb-16">
              <BlurFade delay={0.1} duration={0.6} inView>
                <span className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.15em] uppercase text-[#00d4aa]/60 mb-6">
                  <span className="w-8 h-px bg-[#00d4aa]/30" />
                  Community
                  <span className="w-8 h-px bg-[#00d4aa]/30" />
                </span>
              </BlurFade>

              <BlurFade delay={0.2} duration={0.7} inView>
                <h2 className="text-[clamp(1.8rem,3.2vw,2.8rem)] font-light text-white/80 tracking-[-0.03em]">
                  Join the conversation
                </h2>
              </BlurFade>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  name: 'Twitter / X',
                  desc: 'Follow for tips, product updates, and announcements.',
                  icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
                },
                {
                  name: 'GitHub',
                  desc: 'Contribute to our open source projects and tools.',
                  icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
                },
                {
                  name: 'Discord',
                  desc: 'Connect with the team and community members.',
                  icon: 'M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z',
                },
              ].map((card, index) => (
                <BlurFade key={card.name} delay={0.15 + index * 0.1} duration={0.6} inView>
                  <a
                    href="#"
                    className="group block border border-white/[0.05] rounded-2xl p-7 transition-all duration-500 hover:border-white/[0.10] hover:bg-white/[0.02]"
                  >
                    <div className="text-white/12 group-hover:text-[#00d4aa]/35 transition-colors duration-500 mb-5">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                        <path d={card.icon} />
                      </svg>
                    </div>
                    <h3 className="text-[15px] font-medium text-white/65 group-hover:text-white/85 transition-colors duration-500 mb-1.5">
                      {card.name}
                    </h3>
                    <p className="text-[13px] text-white/22 leading-relaxed font-light">
                      {card.desc}
                    </p>
                  </a>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
