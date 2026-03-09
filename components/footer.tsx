'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useInView } from 'motion/react'

const OrganicBackground = dynamic(
  () => import('@/components/organic-background'),
  { ssr: false }
)

const navColumns = [
  {
    title: 'Products',
    links: [{ name: 'Products', href: '#products' }],
  },
  {
    title: 'Solutions',
    links: [{ name: 'Solutions', href: '#solutions' }],
  },
  {
    title: 'Resources',
    links: [{ name: 'Blog', href: '#blog' }],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Team', href: '/team' },
      { name: 'Contact', href: '/contact' },
    ],
  },
]

const socialLinks = [
  { name: 'LinkedIn', href: '#' },
  { name: 'Facebook', href: '#' },
  { name: 'Twitter', href: '#' },
]

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
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Footer({ withBackground = false }: { withBackground?: boolean }) {
  const trinadeRef = useRef<HTMLDivElement>(null)
  const trinadeInView = useInView(trinadeRef, { once: true, margin: '-40px' })

  return (
    <footer className="footer-atmosphere relative bg-[#060e09]/50 overflow-hidden h-screen flex flex-col">
      {/* ===== WEBGL BACKGROUND (when embedded) ===== */}
      {withBackground && (
        <div className="absolute inset-0 z-[1] overflow-hidden">
          <OrganicBackground />
        </div>
      )}

      {/* ===== ATMOSPHERIC BACKGROUND LAYERS ===== */}

      {/* Layer 2: Large ambient orb — upper left (warm/amber tint, like hero light3) */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%',
          left: '-5%',
          width: '60%',
          height: '55%',
          background:
            'radial-gradient(ellipse at center, rgba(180,130,55,0.04) 0%, rgba(180,130,55,0.015) 35%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Layer 3: Teal glow orb — center-right (hero's main green glow) */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%',
          right: '-8%',
          width: '55%',
          height: '60%',
          background:
            'radial-gradient(ellipse at center, rgba(0,212,170,0.05) 0%, rgba(22,74,50,0.04) 30%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Layer 4: Deep green glow — bottom-left (like hero's light1 spot) */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '5%',
          left: '10%',
          width: '50%',
          height: '45%',
          background:
            'radial-gradient(ellipse at center, rgba(13,80,50,0.07) 0%, rgba(6,14,9,0.03) 40%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Layer 5: Accent glow behind TRINADE text area — teal bleed */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '35%',
          background:
            'radial-gradient(ellipse 80% 50% at 50% 60%, rgba(0,212,170,0.035) 0%, rgba(22,74,50,0.02) 40%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Layer 6: Subtle lime accent spill — top-right edge (like hero curve highlights) */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '5%',
          right: '15%',
          width: '25%',
          height: '20%',
          background:
            'radial-gradient(ellipse at center, rgba(200,230,78,0.02) 0%, transparent 60%)',
          filter: 'blur(35px)',
        }}
      />

      {/* Layer 7: Horizontal "ribbon echo" — a faint band suggesting the organic curves bleeding down */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '0',
          left: '0',
          right: '0',
          height: '180px',
          background: `
            linear-gradient(
              180deg,
              rgba(22,74,50,0.06) 0%,
              rgba(13,31,24,0.03) 40%,
              transparent 100%
            )
          `,
          maskImage: 'linear-gradient(90deg, transparent 5%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.5) 75%, transparent 95%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 5%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.5) 75%, transparent 95%)',
        }}
      />

      {/* Layer 8: Very subtle vignette (like hero's post-processing vignette) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 40%, rgba(6,14,9,0.4) 100%)',
        }}
      />

      {/* ===== END ATMOSPHERIC LAYERS ===== */}

      {/* Top separator line */}
      <div className="relative z-[2] w-full h-px bg-white/[0.08] shrink-0" />

      {/* Contact CTA area */}
      <div className="relative z-[2] px-[calc(12.5vw+0.8rem)] pt-10 pb-8 shrink-0">
        <FadeUp>
          <span className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase text-[#00d4aa] mb-4">
            <span className="text-[#00d4aa]">&#10022;</span>
            Contact Us
          </span>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className="text-[clamp(1.6rem,3.2vw,3rem)] font-light leading-[1.1] tracking-[-0.025em] max-w-[52ch]">
            <span className="text-white/95">
              Interested in working together
            </span>
            <span className="text-white/40">
              , trying out the platform or simply learning more?
            </span>
          </h2>
        </FadeUp>
      </div>

      {/* Middle row — contact + nav links */}
      <div className="relative z-[2] px-[calc(12.5vw+0.8rem)] pb-8 shrink-0">
        <div className="w-full h-px bg-white/[0.06] mb-8" />

        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Left — contact details */}
          <FadeUp delay={0.15} className="shrink-0 max-w-[320px]">
            <p className="text-sm text-white/50 tracking-[0.04em] uppercase mb-3">
              Get in Touch
            </p>
            <div className="space-y-2.5">
              <div>
                <p className="text-[13px] text-white/40 mb-0.5">Address</p>
                <p className="text-sm text-white/70 leading-snug">
                  #06, Green Valley Apartments, Gorantla,<br />
                  Guntur, Andhra Pradesh 522034, India
                </p>
              </div>
              <div>
                <p className="text-[13px] text-white/40 mb-0.5">Email</p>
                <a
                  href="mailto:info@trinade.com"
                  className="text-sm text-white/80 hover:text-[#00d4aa] transition-colors duration-300"
                >
                  info@trinade.com
                </a>
              </div>
              <div>
                <p className="text-[13px] text-white/40 mb-0.5">Phone</p>
                <a
                  href="tel:+919490754923"
                  className="text-sm text-white/80 hover:text-[#00d4aa] transition-colors duration-300"
                >
                  +91 9490754923
                </a>
              </div>
            </div>
          </FadeUp>

          {/* Right — nav columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-12">
            {navColumns.map((col, colIndex) => (
              <FadeUp key={col.title} delay={0.2 + colIndex * 0.05}>
                <h4 className="text-sm font-medium text-white/90 mb-3 tracking-[0.02em]">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-white/45 hover:text-white/80 transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* Giant TRINADE text — mt-auto pushes TRINADE+bottom bar to viewport bottom */}
      <div className="relative z-[2] px-[calc(12.5vw+0.8rem)] pt-4 pb-2 mt-auto shrink-0">
        {/* Subtle gradient glow behind text */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 55%, rgba(0,212,170,0.06) 0%, rgba(80,40,160,0.04) 40%, transparent 70%)',
          }}
        />

        <motion.div
          ref={trinadeRef}
          initial={{ opacity: 0, y: 48, scale: 0.97 }}
          animate={
            trinadeInView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 48, scale: 0.97 }
          }
          transition={{
            duration: 1,
            delay: 0.1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="relative w-full"
        >
          <h3
            className="text-[clamp(6rem,13vw,15vw)] font-bold leading-[0.85] tracking-[0.08em] text-white select-none text-center"
            style={{ fontFamily: 'var(--font-display)' }}
            aria-hidden="true"
          >
            TRINADE
          </h3>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-[2] px-[calc(12.5vw+0.8rem)] pb-4 pt-1 shrink-0">
        <div className="w-full h-px bg-white/[0.10] mb-3" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <p className="text-[13px] text-white/50">
              &copy; 2026 Trinade AI Technologies Pvt Ltd. All Rights Reserved.
            </p>
            <span className="hidden sm:block text-white/25">|</span>
            <a href="#" className="text-[13px] text-white/45 hover:text-white/70 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-[13px] text-white/45 hover:text-white/70 transition-colors duration-300">Disclaimer</a>
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-[13px] text-white/50 hover:text-white/80 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
