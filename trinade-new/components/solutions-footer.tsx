'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const EASE = [0.25, 0.1, 0.25, 1] as const
const EASE_OUT = [0.16, 1, 0.3, 1] as const

export default function SolutionsFooter() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  const navLinks = [
    { label: 'Products', href: '#' },
    { label: 'Solutions', href: '#' },
    { label: 'Blog', href: '/blog' },
    { label: 'Company', href: '/company' },
    { label: 'Contact', href: '/contact' },
  ]

  const socials = [
    { label: 'Li', href: 'https://linkedin.com/company/trinadeai', icon: 'linkedin' as const },
    { label: 'Ig', href: 'https://instagram.com/trinadeai', icon: 'instagram' as const },
    { label: 'X', href: 'https://x.com/trinadeai', icon: 'x' as const },
  ]

  return (
    <footer ref={ref} className="relative overflow-hidden" style={{ background: '#0a0a0a', maxHeight: '100vh' }}>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .footer-marquee {
          animation: marquee 10s linear infinite;
          will-change: transform;
        }
      `}</style>

      {/* Main content */}
      <div className="px-[clamp(2rem,8vw,8rem)] py-14">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="relative rounded-[28px] p-12"
          style={{
            background: 'linear-gradient(165deg, rgba(185,155,100,0.22) 0%, rgba(165,125,60,0.16) 40%, rgba(200,175,125,0.19) 100%)',
            backdropFilter: 'blur(24px) saturate(1.5)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
            border: '1px solid rgba(180,150,95,0.25)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(130,95,30,0.08)',
          }}
        >
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-0">
            {/* LEFT — Nav */}
            <div className="lg:w-[40%] flex flex-col gap-3">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: EASE }}
                  className="group inline-block w-fit leading-none tracking-[-0.02em] transition-colors duration-300"
                  style={{
                    fontSize: 'clamp(1.4rem, 2vw, 1.75rem)',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.9)',
                  }}
                  whileHover={{ color: 'rgba(201,168,110,0.9)' } as never}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* RIGHT — Office + Social */}
            <div className="lg:w-[60%] flex flex-col sm:flex-row gap-12 lg:gap-0 lg:justify-end">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                className="lg:w-[50%]"
              >
                <p className="mb-4 uppercase tracking-[0.08em]" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>OFFICE</p>
                <p className="mb-3" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                  #06, Green Valley Apartments,<br />
                  Gorantla, Guntur,<br />
                  Andhra Pradesh 522034, India
                </p>
                <a href="tel:+919490754923" className="block mb-2 transition-colors duration-200 hover:opacity-100" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)' }}>+91 9490754923</a>
                <a href="mailto:info@trinade.com" className="block transition-colors duration-200 hover:underline hover:opacity-100" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)' }}>info@trinade.com</a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
                className="lg:w-[50%]"
              >
                <p className="mb-4 uppercase tracking-[0.08em]" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>SOCIAL</p>
                <div className="flex gap-3">
                  {socials.map(s => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        color: 'rgba(255,255,255,0.9)',
                        background: 'linear-gradient(165deg, rgba(185,155,100,0.55) 0%, rgba(165,125,60,0.42) 40%, rgba(200,175,125,0.50) 100%)',
                        backdropFilter: 'blur(12px) saturate(1.4)',
                        WebkitBackdropFilter: 'blur(12px) saturate(1.4)',
                        border: '1px solid rgba(180,150,95,0.4)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(130,95,30,0.12), 0 2px 10px rgba(130,95,30,0.2)',
                      }}
                      whileHover={{
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(130,95,30,0.18), 0 4px 20px rgba(130,95,30,0.35)',
                      } as never}
                    >
                      {s.icon === 'linkedin' && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      )}
                      {s.icon === 'instagram' && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                      )}
                      {s.icon === 'x' && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      )}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Separator */}
      <div className="mx-[clamp(2rem,8vw,8rem)]" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,110,0.3), transparent)' }} />

      {/* Bottom bar */}
      <div className="px-[clamp(2rem,8vw,8rem)] py-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-6">
          {[
            { label: 'Privacy Policy', href: '/privacy-policy' },
            { label: 'Terms of Service', href: '/terms-of-service' },
          ].map(link => (
            <a key={link.label} href={link.href} className="text-[12px] transition-opacity duration-200 hover:opacity-60" style={{ color: 'rgba(255,255,255,0.3)' }}>{link.label}</a>
          ))}
        </div>
        <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.3)' }}>&copy; 2026 Trinade AI Technologies Pvt Ltd. All rights reserved.</p>
      </div>

      {/* Scrolling TRINADE marquee — 3x bigger */}
      <div className="overflow-hidden" style={{ userSelect: 'none', pointerEvents: 'none' }}>
        <div
          className="footer-marquee flex whitespace-nowrap leading-none"
          style={{
            fontSize: 'clamp(280px, 38vw, 500px)',
            fontWeight: 900,
            color: 'rgba(255,255,255,0.06)',
            letterSpacing: '-0.04em',
          }}
        >
          <span>TRINADE&nbsp;·&nbsp;TRINADE&nbsp;·&nbsp;TRINADE&nbsp;·&nbsp;TRINADE&nbsp;·&nbsp;</span>
          <span>TRINADE&nbsp;·&nbsp;TRINADE&nbsp;·&nbsp;TRINADE&nbsp;·&nbsp;TRINADE&nbsp;·&nbsp;</span>
        </div>
      </div>
    </footer>
  )
}
