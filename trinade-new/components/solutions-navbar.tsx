'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'

// ═══════════════════════════════════════════════════════════
// FOURMULA-STYLE NAVBAR — Logo left + Floating centered dark pill
// Pill-inside-panel architecture + Scroll indicator (5 segments)
// For Solutions page only (experimental)
// ═══════════════════════════════════════════════════════════

const EASE = [0.32, 0.72, 0, 1] as const
const PANEL_WIDTH = 340
const SCROLL_SEGMENTS = 5

const menuLinks = [
  { label: 'Products', href: '/solutions', noActiveDot: true },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Blog', href: '/blog' },
  { label: 'Company', href: '/company' },
  { label: 'Contact', href: '/contact' },
]

const otherLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/trinadeai' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/trinadeai' },
  { label: 'X', href: 'https://x.com/trinadeai' },
]

export default function SolutionsNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrollPercent, setScrollPercent] = useState(0)
  const [isOnDark, setIsOnDark] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Track scroll percentage + detect dark backgrounds
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const percent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0
      setScrollPercent(Math.min(100, Math.max(0, percent)))

      // Sample background color at the TRINADE text position (top-left area)
      const sampleX = 40
      const sampleY = 40
      const els = document.elementsFromPoint(sampleX, sampleY)
      let dark = false
      for (const el of els) {
        if (el.closest('[data-navbar]')) continue // skip navbar elements
        const bg = getComputedStyle(el).backgroundColor
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          const match = bg.match(/\d+/g)
          if (match) {
            const [r, g, b] = match.map(Number)
            // Luminance check: dark if below threshold
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b)
            dark = luminance < 80
          }
          break
        }
      }
      setIsOnDark(dark)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen])

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen])

  // Active scroll segment (0-4)
  const activeSegment =
    scrollPercent >= 100
      ? SCROLL_SEGMENTS - 1
      : Math.floor((scrollPercent / 100) * SCROLL_SEGMENTS)

  return (
    <>
      {/* ─── Trinade text on the left (inertia-style) ─── */}
      <a
        href="/"
        className="fixed top-5 left-8 z-[9999] flex items-center"
        data-navbar
        style={{ pointerEvents: 'auto', textDecoration: 'none' }}
      >
        <span
          style={{
            fontSize: '28px',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: isOnDark ? '#d4bb8a' : '#2a2218',
            lineHeight: 1,
            transition: 'color 0.5s ease',
          }}
        >
          TRINADE
        </span>
      </a>

      {/* ─── Logo on the top right ─── */}
      <a
        href="/"
        className="fixed top-5 right-8 z-[9999] flex items-center"
        data-navbar
        style={{ pointerEvents: 'auto' }}
      >
        <Image
          src="/logo-transparent.png"
          alt="Trinade"
          width={120}
          height={120}
          className="object-contain"
          style={{
            width: '36px',
            height: '36px',
            filter: isOnDark ? 'brightness(1.2) sepia(1) hue-rotate(-10deg) saturate(0.6)' : 'brightness(0)',
            opacity: 0.85,
            transition: 'filter 0.5s ease',
          }}
        />
      </a>

      {/* ─── Floating Navbar (centered pill) ─── */}
      <div
        className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] flex justify-center"
        style={{ pointerEvents: 'none' }}
      >
        <div
          ref={navRef}
          style={{
            pointerEvents: isOpen ? 'auto' : 'none',
            width: PANEL_WIDTH,
            borderRadius: 28,
            background: isOpen
              ? 'linear-gradient(165deg, rgba(210,192,158,0.95) 0%, rgba(195,172,132,0.93) 40%, rgba(215,198,165,0.94) 100%)'
              : 'transparent',
            backdropFilter: isOpen ? 'blur(32px) saturate(1.8)' : 'none',
            WebkitBackdropFilter: isOpen ? 'blur(32px) saturate(1.8)' : 'none',
            boxShadow: isOpen
              ? '0 8px 32px rgba(130,95,30,0.22), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(130,95,30,0.12)'
              : 'none',
            border: isOpen ? '1px solid rgba(180,150,95,0.35)' : '1px solid transparent',
            padding: isOpen ? 10 : 0,
            transition: [
              'background 0.55s cubic-bezier(0.32,0.72,0,1)',
              'backdrop-filter 0.55s cubic-bezier(0.32,0.72,0,1)',
              'box-shadow 0.55s cubic-bezier(0.32,0.72,0,1)',
              'border 0.55s cubic-bezier(0.32,0.72,0,1)',
              'padding 0.55s cubic-bezier(0.32,0.72,0,1)',
            ].join(', '),
          }}
        >
          {/* Dark Pill — always visible */}
          <div className="flex justify-center">
            <div
              className="flex items-center justify-between py-2.5 pl-2 pr-2 select-none"
              style={{
                background: '#1a1a1e',
                borderRadius: 22,
                pointerEvents: 'auto',
                minWidth: 200,
              }}
            >
              {/* Hamburger / X button — left side */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 pl-2.5 pr-2 py-1.5 rounded-full transition-colors hover:bg-white/[0.06]"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <motion.span
                    className="absolute w-[18px] h-[2px] bg-white rounded-full"
                    animate={{
                      rotate: isOpen ? 45 : 0,
                      y: isOpen ? 0 : -3,
                    }}
                    transition={{ duration: 0.45, ease: EASE, delay: 0.06 }}
                  />
                  <motion.span
                    className="absolute w-[18px] h-[2px] bg-white rounded-full"
                    animate={{
                      rotate: isOpen ? -45 : 0,
                      y: isOpen ? 0 : 3,
                    }}
                    transition={{ duration: 0.45, ease: EASE, delay: 0.06 }}
                  />
                </div>

                <span className="text-[14px] font-semibold text-white tracking-[-0.01em] min-w-[42px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isOpen ? 'close' : 'menu'}
                      initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="block"
                    >
                      {isOpen ? 'Close' : 'Menu'}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </button>

              {/* Scroll Percentage — brown gold liquid glass — right side */}
              <div
                className="flex items-center justify-center rounded-full text-[13px] font-semibold text-white tabular-nums"
                style={{
                  background: 'linear-gradient(165deg, rgba(185,155,100,0.7) 0%, rgba(165,125,60,0.55) 40%, rgba(200,175,125,0.65) 100%)',
                  backdropFilter: 'blur(12px) saturate(1.4)',
                  WebkitBackdropFilter: 'blur(12px) saturate(1.4)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(130,95,30,0.15), 0 2px 10px rgba(130,95,30,0.25)',
                  border: '1px solid rgba(180,150,95,0.4)',
                  width: 56,
                  height: 34,
                }}
              >
                {scrollPercent}%
              </div>
            </div>
          </div>

          {/* ─── Expandable Content ─── */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="px-7 pt-6 pb-8">
                  {/* Menu Section */}
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.08em] mb-4"
                    style={{ color: 'rgba(90,70,40,0.6)' }}
                  >
                    Menu
                  </p>
                  <div className="space-y-0.5">
                    {menuLinks.map((link, i) => {
                      const isActive = link.noActiveDot
                        ? false
                        : link.href === '/'
                          ? pathname === '/' || pathname === '/home'
                          : pathname === link.href
                      return (
                        <motion.a
                          key={link.label}
                          href={link.href}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.1 + i * 0.05,
                            ease: EASE,
                          }}
                          className="flex items-center text-[22px] font-semibold tracking-[-0.02em] py-1 transition-colors hover:text-[#999]"
                          style={{ color: '#2a2218' }}
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                          {isActive && (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.35, ease: EASE }}
                              style={{
                                display: 'inline-block',
                                width: 9,
                                height: 9,
                                marginLeft: 8,
                                borderRadius: '50%',
                                background: 'linear-gradient(165deg, #8b6914 0%, #6b4f0e 40%, #a07820 100%)',
                                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(60,40,10,0.3), 0 2px 8px rgba(100,70,15,0.5), 0 0 3px rgba(160,120,30,0.3)',
                                border: '1px solid rgba(120,85,20,0.6)',
                                flexShrink: 0,
                              }}
                            />
                          )}
                        </motion.a>
                      )
                    })}
                  </div>

                  {/* Separator */}
                  <div
                    className="h-[1px] my-5"
                    style={{ background: 'rgba(160,120,50,0.2)' }}
                  />

                  {/* Other Section */}
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.08em] mb-3"
                    style={{ color: 'rgba(90,70,40,0.6)' }}
                  >
                    Other
                  </p>
                  <div className="space-y-0.5">
                    {otherLinks.map((link, i) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: 0.25 + i * 0.04,
                          ease: EASE,
                        }}
                        className="block text-[15px] font-medium py-0.5 transition-colors hover:text-[#999]"
                        style={{ color: '#2a2218' }}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </motion.a>
                    ))}
                  </div>

                  {/* Separator */}
                  <div
                    className="h-[1px] my-5"
                    style={{ background: 'rgba(160,120,50,0.2)' }}
                  />

                  {/* Social Media Section */}
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.08em] mb-3"
                    style={{ color: 'rgba(90,70,40,0.6)' }}
                  >
                    Social media
                  </p>
                  <div className="space-y-0.5">
                    {socialLinks.map((link, i) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: 0.35 + i * 0.04,
                          ease: EASE,
                        }}
                        className="block text-[15px] font-medium py-0.5 transition-colors hover:text-[#999]"
                        style={{ color: '#2a2218' }}
                      >
                        {link.label}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ─── Scroll Indicator (5 segments) — adaptive glassmorphism ─── */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[9998]">
        <div
          className="flex flex-col items-center gap-[6px] px-[10px] py-3"
          style={{
            background: 'linear-gradient(165deg, rgba(185,155,100,0.6) 0%, rgba(165,125,60,0.48) 40%, rgba(200,175,125,0.55) 100%)',
            backdropFilter: 'blur(28px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(28px) saturate(1.8)',
            borderRadius: 20,
            boxShadow: '0 4px 24px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(130,95,30,0.12)',
            border: '1px solid rgba(180,150,95,0.35)',
          }}
        >
          {Array.from({ length: SCROLL_SEGMENTS }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                height: i === activeSegment ? 22 : 6,
                backgroundColor: i === activeSegment ? '#1a1a1e' : '#2a2218',
              }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ width: 6, borderRadius: 3, opacity: i === activeSegment ? 1 : 0.35 }}
            />
          ))}
        </div>
      </div>
    </>
  )
}
