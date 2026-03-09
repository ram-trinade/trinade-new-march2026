'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED DATA
   ═══════════════════════════════════════════════════════════════════════════ */

const navColumns = [
  { title: 'Products', links: ['Trinade Core', 'Insight Engine', 'Connect API', 'Shield'] },
  { title: 'Solutions', links: ['Enterprise AI', 'Data Platform', 'Custom Dev'] },
  { title: 'Resources', links: ['Blog', 'Docs', 'Case Studies'] },
  { title: 'Company', links: ['About', 'Team', 'Careers', 'Contact'] },
]

const contact = {
  address: '#06, Green Valley Apartments, Gorantla, Guntur, AP 522034, India',
  email: 'info@trinade.com',
  phone: '+91 9490754923',
}

/* ═══════════════════════════════════════════════════════════════════════════
   SVG ICONS
   ═══════════════════════════════════════════════════════════════════════════ */

function LinkedInIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FacebookIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function VariantLabel({ number, name }: { number: string; name: string }) {
  return (
    <div className="absolute top-6 left-[calc(12.5vw+0.8rem)] z-30 flex items-center gap-3">
      <span className="text-[#00d4aa] text-xs tracking-[0.2em] uppercase font-bold">{number}</span>
      <span className="w-8 h-px bg-[#00d4aa]/40" />
      <span className="text-white/50 text-xs tracking-[0.12em] uppercase font-medium">{name}</span>
    </div>
  )
}

function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {[
        { Icon: LinkedInIcon, label: 'LinkedIn', size: 'w-[18px] h-[18px]' },
        { Icon: XIcon, label: 'X', size: 'w-4 h-4' },
        { Icon: FacebookIcon, label: 'Facebook', size: 'w-[18px] h-[18px]' },
      ].map(({ Icon, label, size }) => (
        <a
          key={label}
          href="#"
          className="group w-10 h-10 rounded-full border border-white/[0.10] flex items-center justify-center hover:border-[#00d4aa]/30 hover:bg-white/[0.03] transition-all duration-300"
          aria-label={label}
        >
          <Icon className={`${size} text-white/40 group-hover:text-[#00d4aa] transition-colors duration-300`} />
        </a>
      ))}
    </div>
  )
}

function BottomBar() {
  return (
    <div className="relative z-10 px-[calc(12.5vw+0.8rem)] pb-5 shrink-0">
      <div className="w-full h-px bg-white/[0.10] mb-3" />
      <div className="flex justify-between items-center">
        <p className="text-[13px] text-white/40">
          &copy; 2026 Trinade AI Technologies Pvt Ltd.
        </p>
        <div className="flex items-center gap-5">
          {['Privacy', 'Terms', 'Disclaimer'].map((item, i) => (
            <span key={item} className="flex items-center gap-5">
              {i > 0 && <span className="text-white/15">·</span>}
              <a href="#" className="text-[13px] text-white/35 hover:text-white/60 transition-colors duration-300">
                {item}
              </a>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function NavColumns({ className = '' }: { className?: string }) {
  return (
    <div className={`grid grid-cols-4 gap-10 ${className}`}>
      {navColumns.map((col) => (
        <div key={col.title}>
          <h4 className="text-sm font-medium text-white/80 mb-3 tracking-[0.02em]">{col.title}</h4>
          <ul className="space-y-2">
            {col.links.map((link) => (
              <li key={link}>
                <a href="#" className="text-sm text-white/40 hover:text-white/70 transition-colors duration-300">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   VARIATION 01 — HORIZON
   Defining feature: Glowing teal horizon line between content and TRINADE
   ═══════════════════════════════════════════════════════════════════════════ */

function FooterHorizon() {
  const trinadeRef = useRef<HTMLDivElement>(null)
  const trinadeInView = useInView(trinadeRef, { once: true, margin: '-40px' })

  return (
    <footer className="footer-atmosphere relative bg-[#060e09] overflow-hidden h-screen flex flex-col">
      <VariantLabel number="01" name="Horizon" />

      {/* Atmospheric: warm amber top-left */}
      <div className="absolute pointer-events-none" style={{ top: '-10%', left: '-5%', width: '55%', height: '50%', background: 'radial-gradient(ellipse at center, rgba(180,130,55,0.04) 0%, transparent 65%)', filter: 'blur(50px)' }} />
      {/* Atmospheric: teal glow behind horizon */}
      <div className="absolute pointer-events-none" style={{ bottom: '15%', left: '20%', width: '60%', height: '30%', background: 'radial-gradient(ellipse at center, rgba(0,212,170,0.07) 0%, transparent 60%)', filter: 'blur(60px)' }} />
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(6,14,9,0.5) 100%)' }} />

      {/* Top separator */}
      <div className="relative z-10 w-full h-px bg-white/[0.08] shrink-0" />

      {/* CTA Section */}
      <div className="relative z-10 px-[calc(12.5vw+0.8rem)] pt-12 pb-8 shrink-0">
        <FadeUp>
          <span className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase text-[#00d4aa] mb-4">
            <span>&#10022;</span> Let&apos;s Connect
          </span>
        </FadeUp>
        <div className="flex items-start justify-between">
          <FadeUp delay={0.1}>
            <h2 className="text-[clamp(1.8rem,3.5vw,3.2rem)] font-light leading-[1.1] tracking-[-0.025em]">
              <span className="text-white/95">The next satisfying step starts here</span>
              <span className="text-white/35">&nbsp;— let&apos;s make it count.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <SocialLinks className="pt-2" />
          </FadeUp>
        </div>
      </div>

      {/* Contact + Nav */}
      <div className="relative z-10 px-[calc(12.5vw+0.8rem)] pb-6 shrink-0">
        <div className="w-full h-px bg-white/[0.06] mb-6" />
        <div className="flex justify-between gap-12">
          <FadeUp delay={0.15} className="shrink-0">
            <p className="text-xs text-white/40 tracking-[0.06em] uppercase mb-2">Get in Touch</p>
            <p className="text-sm text-white/60 leading-relaxed max-w-[280px] mb-2">{contact.address}</p>
            <a href={`mailto:${contact.email}`} className="text-sm text-white/70 hover:text-[#00d4aa] transition-colors block">{contact.email}</a>
          </FadeUp>
          <FadeUp delay={0.2}>
            <NavColumns />
          </FadeUp>
        </div>
      </div>

      {/* Flex spacer */}
      <div className="flex-1" />

      {/* ★ HERO ELEMENT: Glowing horizon line */}
      <div className="relative z-10 px-[calc(12.5vw+0.8rem)] shrink-0">
        <div className="relative h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00d4aa]/50 to-transparent" />
          <div className="absolute -top-8 left-0 right-0 h-16 bg-gradient-to-t from-[#00d4aa]/[0.04] to-transparent" />
          <div className="absolute -bottom-8 left-0 right-0 h-16 bg-gradient-to-b from-[#00d4aa]/[0.04] to-transparent" />
        </div>
      </div>

      {/* TRINADE */}
      <motion.div
        ref={trinadeRef}
        initial={{ opacity: 0, y: 40 }}
        animate={trinadeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 px-[calc(12.5vw+0.8rem)] pt-6 pb-4 shrink-0"
      >
        <h3
          className="text-[clamp(5rem,12vw,14vw)] font-extrabold leading-[0.82] text-white select-none text-center uppercase"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.18em', fontStretch: 'expanded' }}
          aria-hidden="true"
        >
          TRINADE
        </h3>
      </motion.div>

      <BottomBar />
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   VARIATION 02 — MARQUEE
   Defining feature: Infinite scrolling TRINADE text rows at varying speeds
   ═══════════════════════════════════════════════════════════════════════════ */

function FooterMarquee() {
  return (
    <footer className="footer-atmosphere relative bg-[#060e09] overflow-hidden h-screen flex flex-col">
      <VariantLabel number="02" name="Marquee" />

      {/* Subtle atmospheric */}
      <div className="absolute pointer-events-none" style={{ top: '30%', left: '0', width: '100%', height: '40%', background: 'radial-gradient(ellipse at center, rgba(0,212,170,0.03) 0%, transparent 60%)', filter: 'blur(80px)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(6,14,9,0.6) 100%)' }} />

      {/* Top separator */}
      <div className="relative z-10 w-full h-px bg-white/[0.08] shrink-0" />

      {/* Compact top bar — CTA + contact + nav */}
      <div className="relative z-10 px-[calc(12.5vw+0.8rem)] pt-10 pb-6 shrink-0">
        <div className="flex items-start justify-between gap-12">
          <FadeUp className="flex-1">
            <span className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase text-[#00d4aa] mb-3">
              <span>&#10022;</span> Let&apos;s Connect
            </span>
            <h2 className="text-[clamp(1.4rem,2.5vw,2.2rem)] font-light leading-[1.15] tracking-[-0.02em]">
              <span className="text-white/90">Ready to build something extraordinary?</span>
            </h2>
            <div className="flex items-center gap-6 mt-4">
              <a href={`mailto:${contact.email}`} className="text-sm text-white/50 hover:text-[#00d4aa] transition-colors">{contact.email}</a>
              <SocialLinks />
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <NavColumns />
          </FadeUp>
        </div>
      </div>

      <div className="w-full h-px bg-white/[0.06] shrink-0" />

      {/* ★ HERO ELEMENT: Marquee rows */}
      <div className="flex-1 flex flex-col justify-center overflow-hidden relative z-10">
        {[
          { opacity: 'text-white', speed: '35s', direction: 'slide-right', size: 'text-[clamp(4rem,10vw,12vw)]' },
          { opacity: 'text-white/[0.08]', speed: '50s', direction: 'slide-left', size: 'text-[clamp(5rem,12vw,15vw)]' },
          { opacity: 'text-white/[0.04]', speed: '28s', direction: 'slide-right', size: 'text-[clamp(3rem,7vw,9vw)]' },
        ].map((row, idx) => (
          <div key={idx} className="overflow-hidden whitespace-nowrap">
            <div
              className="inline-flex"
              style={{ animation: `${row.direction} ${row.speed} linear infinite` }}
            >
              {Array(10).fill(null).map((_, i) => (
                <span
                  key={i}
                  className={`${row.size} ${row.opacity} font-extrabold uppercase select-none inline-block px-[3vw]`}
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.15em', fontStretch: 'expanded' }}
                >
                  TRINADE
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <BottomBar />
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   VARIATION 03 — MONOLITH
   Defining feature: TRINADE at ~25vw — so massive it becomes architecture
   ═══════════════════════════════════════════════════════════════════════════ */

function FooterMonolith() {
  const textRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(textRef, { once: true, margin: '-20px' })

  return (
    <footer className="footer-atmosphere relative bg-[#060e09] overflow-hidden h-screen flex flex-col">
      <VariantLabel number="03" name="Monolith" />

      {/* Centered spotlight gradient */}
      <div className="absolute pointer-events-none" style={{ top: '20%', left: '15%', width: '70%', height: '60%', background: 'radial-gradient(ellipse at 50% 60%, rgba(0,212,170,0.05) 0%, rgba(180,130,55,0.02) 40%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 55%, transparent 30%, rgba(6,14,9,0.6) 100%)' }} />

      {/* Top separator */}
      <div className="relative z-10 w-full h-px bg-white/[0.08] shrink-0" />

      {/* Minimal info bar */}
      <div className="relative z-10 px-[calc(12.5vw+0.8rem)] pt-8 pb-4 shrink-0">
        <FadeUp>
          <div className="flex items-center justify-between text-sm text-white/40">
            <div className="flex items-center gap-8">
              <a href={`mailto:${contact.email}`} className="hover:text-[#00d4aa] transition-colors">{contact.email}</a>
              <span className="text-white/15">·</span>
              <span>{contact.phone}</span>
            </div>
            <SocialLinks />
          </div>
        </FadeUp>
      </div>

      {/* Compact nav row */}
      <div className="relative z-10 px-[calc(12.5vw+0.8rem)] pb-4 shrink-0">
        <FadeUp delay={0.1}>
          <div className="flex items-center gap-8 text-sm">
            {navColumns.flatMap(col => col.links).map((link) => (
              <a key={link} href="#" className="text-white/30 hover:text-white/60 transition-colors duration-300">{link}</a>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* ★ HERO ELEMENT: Monolithic TRINADE text filling the space */}
      <div className="flex-1 flex items-end justify-center relative z-10 px-4">
        <motion.div
          ref={textRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full text-center pb-2"
        >
          <h3
            className="text-[clamp(8rem,22vw,28vw)] font-extrabold leading-[0.75] select-none uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.08em',
              fontStretch: 'expanded',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            aria-hidden="true"
          >
            TRINADE
          </h3>
        </motion.div>
      </div>

      <BottomBar />
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   VARIATION 04 — GRID NOIR
   Defining feature: Bordered editorial grid with numbered sections
   ═══════════════════════════════════════════════════════════════════════════ */

function FooterGridNoir() {
  const trinadeRef = useRef<HTMLDivElement>(null)
  const trinadeInView = useInView(trinadeRef, { once: true, margin: '-40px' })

  return (
    <footer className="footer-atmosphere relative bg-[#060e09] overflow-hidden h-screen flex flex-col">
      <VariantLabel number="04" name="Grid Noir" />

      {/* Minimal atmospheric */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(6,14,9,0.4) 100%)' }} />

      {/* Top separator */}
      <div className="relative z-10 w-full h-px bg-white/[0.08] shrink-0" />

      {/* ★ HERO ELEMENT: 2×2 editorial grid */}
      <div className="relative z-10 px-[calc(12.5vw+0.8rem)] pt-14 flex-1 flex flex-col">
        <div className="grid grid-cols-2 grid-rows-2 flex-1 border border-white/[0.08]">
          {/* Cell 01 — Connect */}
          <FadeUp className="p-8 border-r border-b border-white/[0.08] flex flex-col">
            <span className="text-[#00d4aa] text-xs tracking-[0.2em] uppercase font-bold mb-6">01 — Connect</span>
            <h2 className="text-[clamp(1.4rem,2.8vw,2.6rem)] font-light leading-[1.1] tracking-[-0.02em] mb-4">
              <span className="text-white/90">Let&apos;s build something</span><br />
              <span className="text-white/35">extraordinary together.</span>
            </h2>
            <a href="/contact" className="mt-auto inline-flex items-center gap-2 text-[#00d4aa] text-sm tracking-[0.04em] hover:gap-3 transition-all duration-300">
              Get in touch <span className="text-lg">→</span>
            </a>
          </FadeUp>

          {/* Cell 02 — Navigate */}
          <FadeUp delay={0.1} className="p-8 border-b border-white/[0.08] flex flex-col">
            <span className="text-[#00d4aa] text-xs tracking-[0.2em] uppercase font-bold mb-6">02 — Navigate</span>
            <NavColumns className="gap-6" />
          </FadeUp>

          {/* Cell 03 — Reach */}
          <FadeUp delay={0.15} className="p-8 border-r border-white/[0.08] flex flex-col">
            <span className="text-[#00d4aa] text-xs tracking-[0.2em] uppercase font-bold mb-6">03 — Reach</span>
            <div className="space-y-4">
              <div>
                <p className="text-[11px] text-white/30 tracking-[0.1em] uppercase mb-1">Location</p>
                <p className="text-sm text-white/60 leading-relaxed">{contact.address}</p>
              </div>
              <div>
                <p className="text-[11px] text-white/30 tracking-[0.1em] uppercase mb-1">Email</p>
                <a href={`mailto:${contact.email}`} className="text-sm text-white/70 hover:text-[#00d4aa] transition-colors">{contact.email}</a>
              </div>
              <div>
                <p className="text-[11px] text-white/30 tracking-[0.1em] uppercase mb-1">Phone</p>
                <span className="text-sm text-white/60">{contact.phone}</span>
              </div>
            </div>
          </FadeUp>

          {/* Cell 04 — Follow */}
          <FadeUp delay={0.2} className="p-8 flex flex-col">
            <span className="text-[#00d4aa] text-xs tracking-[0.2em] uppercase font-bold mb-6">04 — Follow</span>
            <SocialLinks className="mb-auto" />
            <div className="mt-auto">
              <p className="text-xs text-white/30 tracking-[0.06em] uppercase">Est. 2020 · Guntur, India</p>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* TRINADE below grid */}
      <motion.div
        ref={trinadeRef}
        initial={{ opacity: 0, y: 30 }}
        animate={trinadeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 px-[calc(12.5vw+0.8rem)] pt-5 pb-3 shrink-0"
      >
        <h3
          className="text-[clamp(4rem,10vw,12vw)] font-extrabold leading-[0.82] text-white select-none text-center uppercase"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.18em', fontStretch: 'expanded' }}
          aria-hidden="true"
        >
          TRINADE
        </h3>
      </motion.div>

      <BottomBar />
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   VARIATION 05 — SPLIT PANE
   Defining feature: Dramatic 60/40 vertical split with teal accent line
   ═══════════════════════════════════════════════════════════════════════════ */

function FooterSplit() {
  const trinadeRef = useRef<HTMLDivElement>(null)
  const trinadeInView = useInView(trinadeRef, { once: true, margin: '-40px' })

  return (
    <footer className="footer-atmosphere relative bg-[#060e09] overflow-hidden h-screen flex flex-col">
      <VariantLabel number="05" name="Split Pane" />

      {/* Atmospheric — subtle left-right glow */}
      <div className="absolute pointer-events-none" style={{ top: '10%', left: '-5%', width: '50%', height: '60%', background: 'radial-gradient(ellipse at center, rgba(0,212,170,0.04) 0%, transparent 60%)', filter: 'blur(60px)' }} />
      <div className="absolute pointer-events-none" style={{ top: '20%', right: '-5%', width: '40%', height: '50%', background: 'radial-gradient(ellipse at center, rgba(180,130,55,0.03) 0%, transparent 60%)', filter: 'blur(50px)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 35%, rgba(6,14,9,0.5) 100%)' }} />

      {/* Top separator */}
      <div className="relative z-10 w-full h-px bg-white/[0.08] shrink-0" />

      {/* ★ HERO ELEMENT: Vertical split layout */}
      <div className="relative z-10 px-[calc(12.5vw+0.8rem)] pt-12 flex-1 flex">
        {/* Left — 60% CTA area */}
        <div className="flex-[3] pr-12 flex flex-col">
          <FadeUp>
            <span className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase text-[#00d4aa] mb-6">
              <span>&#10022;</span> Let&apos;s Connect
            </span>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="text-[clamp(2rem,4vw,4rem)] font-light leading-[1.05] tracking-[-0.03em] mb-6">
              <span className="text-white/95">Building the future</span><br />
              <span className="text-white/95">of enterprise</span><br />
              <span className="text-white/35">intelligence.</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.15}>
            <p className="text-base text-white/40 leading-relaxed max-w-[420px] mb-8">
              From AI-powered platforms to enterprise software — engineered thoughtfully, delivered confidently.
            </p>
          </FadeUp>

          <FadeUp delay={0.2} className="mt-auto pb-6">
            <SocialLinks />
          </FadeUp>
        </div>

        {/* Teal vertical accent line */}
        <div className="w-px bg-gradient-to-b from-[#00d4aa]/40 via-[#00d4aa]/15 to-transparent shrink-0" />

        {/* Right — 40% structured data */}
        <div className="flex-[2] pl-12 flex flex-col pt-2">
          <FadeUp delay={0.15}>
            <NavColumns className="grid-cols-2 gap-8 mb-10" />
          </FadeUp>

          <FadeUp delay={0.2} className="mt-auto pb-6">
            <p className="text-xs text-white/30 tracking-[0.06em] uppercase mb-3">Contact</p>
            <p className="text-sm text-white/50 leading-relaxed mb-2">{contact.address}</p>
            <a href={`mailto:${contact.email}`} className="text-sm text-white/60 hover:text-[#00d4aa] transition-colors">{contact.email}</a>
          </FadeUp>
        </div>
      </div>

      {/* TRINADE */}
      <motion.div
        ref={trinadeRef}
        initial={{ opacity: 0, y: 36 }}
        animate={trinadeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 px-[calc(12.5vw+0.8rem)] pt-4 pb-3 shrink-0"
      >
        <h3
          className="text-[clamp(5rem,12vw,14vw)] font-extrabold leading-[0.82] text-white select-none text-center uppercase"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.18em', fontStretch: 'expanded' }}
          aria-hidden="true"
        >
          TRINADE
        </h3>
      </motion.div>

      <BottomBar />
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   VARIATION 06 — DEPTH STACK
   Defining feature: Multiple layered TRINADE texts creating 3D depth illusion
   ═══════════════════════════════════════════════════════════════════════════ */

function FooterDepth() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-40px' })

  return (
    <footer className="footer-atmosphere relative bg-[#060e09] overflow-hidden h-screen flex flex-col">
      <VariantLabel number="06" name="Depth Stack" />

      {/* Atmospheric — deep center glow */}
      <div className="absolute pointer-events-none" style={{ top: '30%', left: '10%', width: '80%', height: '50%', background: 'radial-gradient(ellipse at center, rgba(0,212,170,0.04) 0%, transparent 55%)', filter: 'blur(70px)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 65% at 50% 60%, transparent 30%, rgba(6,14,9,0.5) 100%)' }} />

      {/* Top separator */}
      <div className="relative z-10 w-full h-px bg-white/[0.08] shrink-0" />

      {/* Content — compact at top */}
      <div className="relative z-10 px-[calc(12.5vw+0.8rem)] pt-10 pb-6 shrink-0">
        <div className="flex items-start justify-between gap-12">
          <FadeUp className="flex-1">
            <span className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase text-[#00d4aa] mb-3">
              <span>&#10022;</span> Let&apos;s Connect
            </span>
            <h2 className="text-[clamp(1.4rem,2.5vw,2.2rem)] font-light leading-[1.15] tracking-[-0.02em] mb-4">
              <span className="text-white/90">The next satisfying step starts here.</span>
            </h2>
            <div className="flex items-center gap-6">
              <a href={`mailto:${contact.email}`} className="text-sm text-white/50 hover:text-[#00d4aa] transition-colors">{contact.email}</a>
              <SocialLinks />
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <NavColumns />
          </FadeUp>
        </div>
      </div>

      {/* ★ HERO ELEMENT: Stacked depth TRINADE */}
      <div ref={containerRef} className="flex-1 relative z-10 overflow-hidden flex items-end justify-center">
        {/* Background layers — furthest back */}
        {[
          { scale: 1.8, opacity: 0.025, offset: -60 },
          { scale: 1.5, opacity: 0.04, offset: -40 },
          { scale: 1.25, opacity: 0.06, offset: -20 },
          { scale: 1.1, opacity: 0.10, offset: -8 },
        ].map((layer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: layer.offset + 30 }}
            animate={isInView ? { opacity: layer.opacity, y: layer.offset } : { opacity: 0, y: layer.offset + 30 }}
            transition={{ duration: 1.2, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 bottom-0 text-center pointer-events-none"
            style={{ transform: `scale(${layer.scale})`, transformOrigin: 'bottom center' }}
          >
            <span
              className="text-[clamp(5rem,12vw,14vw)] font-extrabold uppercase select-none text-white"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.15em', fontStretch: 'expanded' }}
            >
              TRINADE
            </span>
          </motion.div>
        ))}

        {/* Front layer — full opacity */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 pb-3 w-full text-center"
        >
          <h3
            className="text-[clamp(5rem,12vw,14vw)] font-extrabold leading-[0.82] text-white select-none uppercase"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.18em', fontStretch: 'expanded' }}
            aria-hidden="true"
          >
            TRINADE
          </h3>
        </motion.div>
      </div>

      <BottomBar />
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   VARIATION 07 — THE INDEX
   Defining feature: Archival/data aesthetic with structured label-value rows
   ═══════════════════════════════════════════════════════════════════════════ */

function FooterIndex() {
  const trinadeRef = useRef<HTMLDivElement>(null)
  const trinadeInView = useInView(trinadeRef, { once: true, margin: '-40px' })

  const rows = [
    { label: 'LOC', value: contact.address },
    { label: 'TEL', value: contact.phone },
    { label: 'WEB', value: contact.email, isLink: true },
    { label: 'NAV', value: navColumns.flatMap(c => c.links).join(' · ') },
  ]

  return (
    <footer className="footer-atmosphere relative bg-[#060e09] overflow-hidden h-screen flex flex-col">
      <VariantLabel number="07" name="The Index" />

      {/* Subtle atmospheric */}
      <div className="absolute pointer-events-none" style={{ top: '40%', right: '10%', width: '40%', height: '35%', background: 'radial-gradient(ellipse at center, rgba(0,212,170,0.03) 0%, transparent 60%)', filter: 'blur(50px)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 40%, rgba(6,14,9,0.4) 100%)' }} />

      {/* Top separator */}
      <div className="relative z-10 w-full h-px bg-white/[0.08] shrink-0" />

      {/* Header bar */}
      <div className="relative z-10 px-[calc(12.5vw+0.8rem)] pt-10 pb-8 shrink-0">
        <FadeUp>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-[#00d4aa] text-xs tracking-[0.2em] uppercase font-bold">Index</span>
              <span className="w-6 h-px bg-white/[0.15]" />
              <span className="text-white/30 text-xs tracking-[0.12em] uppercase">Trinade Footer</span>
              <span className="w-6 h-px bg-white/[0.15]" />
              <span className="text-white/30 text-xs tracking-[0.12em] uppercase">2026</span>
            </div>
            <SocialLinks />
          </div>
        </FadeUp>
      </div>

      {/* ★ HERO ELEMENT: Data-table style rows */}
      <div className="relative z-10 px-[calc(12.5vw+0.8rem)] flex-1 flex flex-col justify-center">
        {rows.map((row, idx) => (
          <FadeUp key={row.label} delay={idx * 0.06}>
            <div className="border-t border-white/[0.06] py-5 grid grid-cols-[80px_1fr] gap-8 items-start">
              <span
                className="text-[#00d4aa]/60 text-xs tracking-[0.25em] uppercase font-bold pt-0.5"
                style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}
              >
                {row.label}
              </span>
              {row.isLink ? (
                <a href={`mailto:${row.value}`} className="text-sm text-white/60 hover:text-[#00d4aa] transition-colors leading-relaxed">
                  {row.value}
                </a>
              ) : (
                <p className="text-sm text-white/60 leading-relaxed">{row.value}</p>
              )}
            </div>
          </FadeUp>
        ))}
        <div className="border-t border-white/[0.06]" />
      </div>

      {/* TRINADE */}
      <motion.div
        ref={trinadeRef}
        initial={{ opacity: 0, y: 32 }}
        animate={trinadeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 px-[calc(12.5vw+0.8rem)] pt-6 pb-3 shrink-0"
      >
        <div className="flex items-center gap-6">
          <span className="text-[#00d4aa]/40 text-xs tracking-[0.25em] uppercase" style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>→</span>
          <h3
            className="text-[clamp(5rem,12vw,14vw)] font-extrabold leading-[0.82] text-white select-none uppercase"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.18em', fontStretch: 'expanded' }}
            aria-hidden="true"
          >
            TRINADE
          </h3>
        </div>
      </motion.div>

      <BottomBar />
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   VARIATION 08 — ASCENDING
   Defining feature: Reversed flow — content rises from TRINADE at the bottom
   ═══════════════════════════════════════════════════════════════════════════ */

function FooterAscending() {
  const trinadeRef = useRef<HTMLDivElement>(null)
  const trinadeInView = useInView(trinadeRef, { once: true, margin: '-40px' })

  return (
    <footer className="footer-atmosphere relative bg-[#060e09] overflow-hidden h-screen flex flex-col-reverse">
      <VariantLabel number="08" name="Ascending" />

      {/* Atmospheric — bottom-heavy glow */}
      <div className="absolute pointer-events-none" style={{ bottom: '0', left: '10%', width: '80%', height: '45%', background: 'radial-gradient(ellipse at 50% 80%, rgba(0,212,170,0.06) 0%, transparent 60%)', filter: 'blur(60px)' }} />
      <div className="absolute pointer-events-none" style={{ top: '10%', right: '5%', width: '40%', height: '30%', background: 'radial-gradient(ellipse at center, rgba(180,130,55,0.03) 0%, transparent 60%)', filter: 'blur(40px)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 75% 70% at 50% 70%, transparent 30%, rgba(6,14,9,0.5) 100%)' }} />

      {/* Bottom layer: TRINADE text (renders first due to flex-col-reverse) */}
      <motion.div
        ref={trinadeRef}
        initial={{ opacity: 0 }}
        animate={trinadeInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 shrink-0"
      >
        <div className="px-[calc(12.5vw+0.8rem)] pb-3 pt-4">
          <h3
            className="text-[clamp(5rem,12vw,14vw)] font-extrabold leading-[0.82] text-white select-none text-center uppercase"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.18em', fontStretch: 'expanded' }}
            aria-hidden="true"
          >
            TRINADE
          </h3>
        </div>
        {/* Bottom bar inline */}
        <div className="px-[calc(12.5vw+0.8rem)] pb-5">
          <div className="w-full h-px bg-white/[0.10] mb-3" />
          <div className="flex justify-between items-center">
            <p className="text-[13px] text-white/40">&copy; 2026 Trinade AI Technologies Pvt Ltd.</p>
            <div className="flex items-center gap-5">
              {['Privacy', 'Terms', 'Disclaimer'].map((item, i) => (
                <span key={item} className="flex items-center gap-5">
                  {i > 0 && <span className="text-white/15">·</span>}
                  <a href="#" className="text-[13px] text-white/35 hover:text-white/60 transition-colors">{item}</a>
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Separator */}
      <div className="relative z-10 px-[calc(12.5vw+0.8rem)] shrink-0">
        <div className="w-full h-px bg-white/[0.06]" />
      </div>

      {/* Content — builds upward */}
      <div className="relative z-10 px-[calc(12.5vw+0.8rem)] flex-1 flex flex-col justify-end pb-8">
        {/* Nav links */}
        <FadeUp delay={0.15} className="mb-8">
          <NavColumns />
        </FadeUp>

        <div className="w-full h-px bg-white/[0.06] mb-8" />

        {/* Contact + Social row */}
        <FadeUp delay={0.1} className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-white/30 tracking-[0.06em] uppercase mb-2">Contact</p>
              <p className="text-sm text-white/50 leading-relaxed max-w-[300px] mb-1">{contact.address}</p>
              <a href={`mailto:${contact.email}`} className="text-sm text-white/60 hover:text-[#00d4aa] transition-colors">{contact.email}</a>
            </div>
            <SocialLinks />
          </div>
        </FadeUp>

        <div className="w-full h-px bg-white/[0.06] mb-8" />

        {/* CTA at very top */}
        <FadeUp className="mb-0">
          <span className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase text-[#00d4aa] mb-4">
            <span>&#10022;</span> Let&apos;s Connect
          </span>
          <h2 className="text-[clamp(1.6rem,3vw,2.8rem)] font-light leading-[1.1] tracking-[-0.025em]">
            <span className="text-white/95">Ready to shape what&apos;s next?</span>
          </h2>
        </FadeUp>
      </div>

      {/* Top separator */}
      <div className="relative z-10 w-full h-px bg-white/[0.08] shrink-0" />
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   VARIATION 09 — AURORA
   Defining feature: Dramatic atmospheric lighting with aurora-like glow bands
   ═══════════════════════════════════════════════════════════════════════════ */

function FooterAurora() {
  const trinadeRef = useRef<HTMLDivElement>(null)
  const trinadeInView = useInView(trinadeRef, { once: true, margin: '-40px' })

  return (
    <footer className="footer-atmosphere relative bg-[#060e09] overflow-hidden h-screen flex flex-col">
      <VariantLabel number="09" name="Aurora" />

      {/* ★ HERO ELEMENT: Dramatic aurora atmospheric layers */}
      {/* Large teal orb — center */}
      <div className="absolute pointer-events-none" style={{ top: '25%', left: '15%', width: '70%', height: '55%', background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,212,170,0.10) 0%, rgba(0,212,170,0.03) 40%, transparent 65%)', filter: 'blur(50px)' }} />
      {/* Amber counter-glow */}
      <div className="absolute pointer-events-none" style={{ top: '-5%', right: '0', width: '50%', height: '40%', background: 'radial-gradient(ellipse at 70% 30%, rgba(180,130,55,0.08) 0%, rgba(180,130,55,0.02) 40%, transparent 65%)', filter: 'blur(60px)' }} />
      {/* Bottom teal wash */}
      <div className="absolute pointer-events-none" style={{ bottom: '0', left: '0', width: '100%', height: '35%', background: 'radial-gradient(ellipse 90% 60% at 50% 100%, rgba(0,212,170,0.08) 0%, rgba(22,74,50,0.04) 40%, transparent 70%)', filter: 'blur(40px)' }} />
      {/* Aurora band 1 */}
      <div className="absolute pointer-events-none" style={{ top: '20%', left: '0', right: '0', height: '2px', background: 'linear-gradient(90deg, transparent 10%, rgba(0,212,170,0.15) 30%, rgba(0,212,170,0.25) 50%, rgba(200,230,78,0.10) 70%, transparent 90%)', filter: 'blur(6px)' }} />
      {/* Aurora band 2 */}
      <div className="absolute pointer-events-none" style={{ top: '35%', left: '0', right: '0', height: '1px', background: 'linear-gradient(90deg, transparent 20%, rgba(0,212,170,0.10) 40%, rgba(180,130,55,0.08) 60%, transparent 80%)', filter: 'blur(4px)' }} />
      {/* Fog at bottom */}
      <div className="absolute pointer-events-none" style={{ bottom: '0', left: '0', right: '0', height: '200px', background: 'linear-gradient(to top, rgba(0,212,170,0.03) 0%, transparent 100%)' }} />
      {/* Deep vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 50%, transparent 25%, rgba(6,14,9,0.6) 100%)' }} />

      {/* Top separator */}
      <div className="relative z-10 w-full h-px bg-white/[0.08] shrink-0" />

      {/* CTA */}
      <div className="relative z-10 px-[calc(12.5vw+0.8rem)] pt-12 pb-8 shrink-0">
        <FadeUp>
          <span className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase text-[#00d4aa] mb-4">
            <span>&#10022;</span> Let&apos;s Connect
          </span>
        </FadeUp>
        <div className="flex items-start justify-between">
          <FadeUp delay={0.1}>
            <h2 className="text-[clamp(1.8rem,3.5vw,3.2rem)] font-light leading-[1.1] tracking-[-0.025em]">
              <span className="text-white/95">Shape the future with us</span>
              <span className="text-white/35">&nbsp;— let&apos;s begin.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <SocialLinks className="pt-2" />
          </FadeUp>
        </div>
      </div>

      {/* Contact + Nav */}
      <div className="relative z-10 px-[calc(12.5vw+0.8rem)] pb-6 shrink-0">
        <div className="w-full h-px bg-white/[0.06] mb-6" />
        <div className="flex justify-between gap-12">
          <FadeUp delay={0.15} className="shrink-0">
            <p className="text-xs text-white/35 tracking-[0.06em] uppercase mb-2">Get in Touch</p>
            <p className="text-sm text-white/50 leading-relaxed max-w-[280px] mb-2">{contact.address}</p>
            <a href={`mailto:${contact.email}`} className="text-sm text-white/60 hover:text-[#00d4aa] transition-colors">{contact.email}</a>
          </FadeUp>
          <FadeUp delay={0.2}>
            <NavColumns />
          </FadeUp>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* TRINADE with glow */}
      <motion.div
        ref={trinadeRef}
        initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
        animate={trinadeInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 40, filter: 'blur(8px)' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 px-[calc(12.5vw+0.8rem)] pt-4 pb-4 shrink-0"
      >
        <h3
          className="text-[clamp(5rem,12vw,14vw)] font-extrabold leading-[0.82] text-white select-none text-center uppercase"
          style={{
            fontFamily: 'var(--font-display)',
            letterSpacing: '0.18em',
            fontStretch: 'expanded',
            textShadow: '0 0 60px rgba(0,212,170,0.15), 0 0 120px rgba(0,212,170,0.05)',
          }}
          aria-hidden="true"
        >
          TRINADE
        </h3>
      </motion.div>

      <BottomBar />
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   VARIATION 10 — OUTLINED
   Defining feature: TRINADE in stroke/outline with one filled accent letter
   ═══════════════════════════════════════════════════════════════════════════ */

function FooterOutlined() {
  const trinadeRef = useRef<HTMLDivElement>(null)
  const trinadeInView = useInView(trinadeRef, { once: true, margin: '-40px' })

  const letters = ['T', 'R', 'I', 'N', 'A', 'D', 'E']

  return (
    <footer className="footer-atmosphere relative bg-[#060e09] overflow-hidden h-screen flex flex-col">
      <VariantLabel number="10" name="Outlined" />

      {/* Atmospheric */}
      <div className="absolute pointer-events-none" style={{ bottom: '15%', left: '30%', width: '40%', height: '30%', background: 'radial-gradient(ellipse at center, rgba(0,212,170,0.05) 0%, transparent 60%)', filter: 'blur(50px)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 75% 65% at 50% 55%, transparent 35%, rgba(6,14,9,0.5) 100%)' }} />

      {/* Top separator */}
      <div className="relative z-10 w-full h-px bg-white/[0.08] shrink-0" />

      {/* CTA Section */}
      <div className="relative z-10 px-[calc(12.5vw+0.8rem)] pt-12 pb-8 shrink-0">
        <div className="flex items-start justify-between gap-12">
          <FadeUp className="flex-1">
            <span className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase text-[#00d4aa] mb-4">
              <span>&#10022;</span> Let&apos;s Connect
            </span>
            <h2 className="text-[clamp(1.6rem,3vw,2.8rem)] font-light leading-[1.1] tracking-[-0.025em]">
              <span className="text-white/95">Partner with a team that delivers.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <SocialLinks className="pt-2" />
          </FadeUp>
        </div>
      </div>

      {/* Contact + Nav */}
      <div className="relative z-10 px-[calc(12.5vw+0.8rem)] pb-6 shrink-0">
        <div className="w-full h-px bg-white/[0.06] mb-6" />
        <div className="flex justify-between gap-12">
          <FadeUp delay={0.1} className="shrink-0">
            <p className="text-xs text-white/35 tracking-[0.06em] uppercase mb-2">Contact</p>
            <p className="text-sm text-white/50 leading-relaxed max-w-[280px] mb-2">{contact.address}</p>
            <a href={`mailto:${contact.email}`} className="text-sm text-white/60 hover:text-[#00d4aa] transition-colors">{contact.email}</a>
          </FadeUp>
          <FadeUp delay={0.15}>
            <NavColumns />
          </FadeUp>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* ★ HERO ELEMENT: Outlined TRINADE with filled accent letter */}
      <motion.div
        ref={trinadeRef}
        initial={{ opacity: 0 }}
        animate={trinadeInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 px-[calc(12.5vw+0.8rem)] pt-4 pb-4 shrink-0"
      >
        <div className="flex items-center justify-center" aria-hidden="true">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={trinadeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[clamp(5rem,12vw,14vw)] font-extrabold leading-[0.82] select-none uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.12em',
                fontStretch: 'expanded',
                ...(letter === 'A'
                  ? { color: '#00d4aa' }
                  : {
                      color: 'transparent',
                      WebkitTextStroke: '1.5px rgba(255,255,255,0.4)',
                    }),
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <BottomBar />
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   INTRO SECTION
   ═══════════════════════════════════════════════════════════════════════════ */

function IntroSection() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#030806] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute pointer-events-none" style={{ top: '30%', left: '25%', width: '50%', height: '40%', background: 'radial-gradient(ellipse at center, rgba(0,212,170,0.06) 0%, transparent 60%)', filter: 'blur(80px)' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-center relative z-10"
      >
        <span className="inline-flex items-center gap-2 text-sm tracking-[0.12em] uppercase text-[#00d4aa] mb-6">
          <span>&#10022;</span> Footer Concepts
        </span>
        <h1 className="text-white text-[clamp(2.5rem,5vw,5rem)] font-bold tracking-[-0.03em] leading-[1.05] mb-4">
          10 Distinct Variations
        </h1>
        <p className="text-white/40 text-lg font-light tracking-[-0.01em] mb-12">
          Scroll to explore each concept
        </p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg className="w-6 h-6 text-white/20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SEPARATOR BETWEEN VARIATIONS
   ═══════════════════════════════════════════════════════════════════════════ */

function VariantSeparator() {
  return (
    <div className="h-20 bg-[#020503] flex items-center justify-center">
      <div className="w-12 h-px bg-white/[0.08]" />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

export default function FooterConcepts() {
  return (
    <div className="bg-[#030806]">
      <style>{`
        @keyframes slide-right {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes slide-left {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>

      <IntroSection />

      <VariantSeparator />
      <FooterHorizon />
      <VariantSeparator />
      <FooterMarquee />
      <VariantSeparator />
      <FooterMonolith />
      <VariantSeparator />
      <FooterGridNoir />
      <VariantSeparator />
      <FooterSplit />
      <VariantSeparator />
      <FooterDepth />
      <VariantSeparator />
      <FooterIndex />
      <VariantSeparator />
      <FooterAscending />
      <VariantSeparator />
      <FooterAurora />
      <VariantSeparator />
      <FooterOutlined />
    </div>
  )
}
