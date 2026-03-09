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

/* ─── Social SVG Icons ─── */

function LinkedInIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FacebookIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

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

      {/* Layer 2: Large ambient orb — upper left */}
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

      {/* Layer 3: Teal glow orb — center-right */}
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

      {/* Layer 4: Deep green glow — bottom-left */}
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

      {/* Layer 5: Accent glow behind TRINADE text area */}
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

      {/* Layer 6: Subtle lime accent spill */}
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

      {/* Layer 7: Horizontal ribbon echo */}
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

      {/* Layer 8: Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 40%, rgba(6,14,9,0.4) 100%)',
        }}
      />

      {/* ===== END ATMOSPHERIC LAYERS ===== */}

      {/* Top separator line — softened for seamless content-to-footer flow */}
      <div className="relative z-[2] w-full h-px shrink-0" style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.06) 70%, transparent 90%)' }} />

      {/* ===== CTA + Social row ===== */}
      <div className="relative z-[2] px-[calc(12.5vw+0.8rem)] pt-10 pb-6 shrink-0">
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            <FadeUp>
              <span className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase text-[#00d4aa] mb-4">
                <span className="text-[#00d4aa]">&#10022;</span>
                Let&apos;s Connect
              </span>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2 className="text-[clamp(1.6rem,3.2vw,3rem)] font-light leading-[1.1] tracking-[-0.025em] max-w-[40ch]">
                <span className="text-white/95">
                  The next satisfying step starts here
                </span>
                <span className="text-white/40">
                  &nbsp;— let&apos;s make it count.
                </span>
              </h2>
            </FadeUp>
          </div>

          {/* Social icons — floating right, vertically centered */}
          <FadeUp delay={0.2} className="hidden lg:flex items-center gap-5 pt-10">
            <a
              href="#"
              className="group relative w-10 h-10 rounded-full border border-white/[0.12] flex items-center justify-center hover:border-[#00d4aa]/40 hover:bg-white/[0.04] transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-[18px] h-[18px] text-white/50 group-hover:text-[#00d4aa] transition-colors duration-300" />
            </a>
            <a
              href="#"
              className="group relative w-10 h-10 rounded-full border border-white/[0.12] flex items-center justify-center hover:border-[#00d4aa]/40 hover:bg-white/[0.04] transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-[18px] h-[18px] text-white/50 group-hover:text-[#00d4aa] transition-colors duration-300" />
            </a>
            <a
              href="#"
              className="group relative w-10 h-10 rounded-full border border-white/[0.12] flex items-center justify-center hover:border-[#00d4aa]/40 hover:bg-white/[0.04] transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
            >
              <XIcon className="w-[16px] h-[16px] text-white/50 group-hover:text-[#00d4aa] transition-colors duration-300" />
            </a>
          </FadeUp>
        </div>
      </div>

      {/* ===== Middle row — contact + nav links ===== */}
      <div className="relative z-[2] px-[calc(12.5vw+0.8rem)] pb-6 shrink-0">
        <div className="w-full h-px bg-white/[0.06] mb-6" />

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

      {/* ===== Giant TRINADE text — mt-auto pushes to viewport bottom ===== */}
      <div className="relative z-[2] px-[calc(12.5vw+0.8rem)] pt-4 pb-5 mt-auto shrink-0">
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
            className="text-[clamp(7rem,15.7vw,19vw)] leading-[0.80] text-white select-none text-center uppercase"
            style={{
              fontFamily: 'var(--font-trinade)',
              fontWeight: 900,
              letterSpacing: '0.02em',
            }}
            aria-hidden="true"
          >
            TRINADE
          </h3>
        </motion.div>
      </div>

      {/* ===== Bottom bar ===== */}
      <div className="relative z-[2] px-[calc(12.5vw+0.8rem)] pb-5 shrink-0">
        <div className="w-full h-px bg-white/[0.12] mb-3" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[13px] text-white/45">
            &copy; 2026 Trinade AI Technologies Pvt Ltd. All Rights Reserved.
          </p>

          <div className="flex items-center gap-5">
            <a href="#" className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300">Privacy Policy</a>
            <span className="text-white/20">·</span>
            <a href="#" className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300">Terms of Service</a>
            <span className="text-white/20">·</span>
            <a href="#" className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
