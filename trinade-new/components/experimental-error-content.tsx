'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'

// ═══════════════════════════════════════════════════════════════════════
// EXPERIMENTAL 404 — TYPEWRITER CYCLING ERROR PAGE
// Inspired by award-winning error page: "Something [broke/went wrong/...]"
// Adapted to Trinade brand: cream bg, charcoal + gold palette, Manrope
// ═══════════════════════════════════════════════════════════════════════

const EASE_CINE = [0.16, 1, 0.3, 1] as const

// Phrases that cycle after "Something"
const PHRASES = [
  'broke',
  'went wrong',
  'is off',
  'is missing',
  'got lost',
]

// Typing speed settings (ms)
const TYPE_SPEED = 70
const DELETE_SPEED = 45
const PAUSE_AFTER_TYPE = 2200
const PAUSE_AFTER_DELETE = 400

// ─── Typewriter hook ───
function useTypewriter(phrases: string[]) {
  const [displayText, setDisplayText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]

    const tick = () => {
      if (!isDeleting) {
        // Typing forward
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1))
          timeoutRef.current = setTimeout(tick, TYPE_SPEED + Math.random() * 30)
        } else {
          // Finished typing — pause, then start deleting
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true)
            tick()
          }, PAUSE_AFTER_TYPE)
          return
        }
      } else {
        // Deleting backward
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
          timeoutRef.current = setTimeout(tick, DELETE_SPEED)
        } else {
          // Finished deleting — move to next phrase
          setIsDeleting(false)
          setPhraseIndex((prev) => (prev + 1) % phrases.length)
          timeoutRef.current = setTimeout(tick, PAUSE_AFTER_DELETE)
          return
        }
      }
    }

    timeoutRef.current = setTimeout(tick, isDeleting ? DELETE_SPEED : TYPE_SPEED)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [displayText, isDeleting, phraseIndex, phrases])

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  return { displayText, showCursor }
}

// ─── Magnetic button ───
function MagneticLink({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPos({ x: x * 0.3, y: y * 0.3 })
  }, [])

  return (
    <motion.div
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
    >
      <Link
        ref={ref}
        href={href}
        className="inline-flex items-center gap-3 group"
        style={{ textDecoration: 'none' }}
      >
        <span
          className="text-[15px] font-medium tracking-[-0.01em] transition-colors duration-300 group-hover:text-[#a0814a]"
          style={{
            color: '#2a2218',
            borderBottom: '1.5px solid #2a2218',
            paddingBottom: '4px',
          }}
        >
          Back to home
        </span>
        {/* Arrow icon in dark square — adapted from inspiration */}
        <span
          className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center transition-all duration-400 group-hover:bg-[#a0814a]"
          style={{ background: '#2a2218' }}
        >
          <motion.svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-[2px]"
          >
            <path
              d="M2 7h10M8 3l4 4-4 4"
              stroke="#f2ede6"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </span>
      </Link>
    </motion.div>
  )
}

// ─── Main error page content ───
export default function ExperimentalErrorContent() {
  const { displayText, showCursor } = useTypewriter(PHRASES)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ background: '#f2ede6' }}
    >
      {/* Subtle atmospheric gold glow */}
      <div
        className="absolute"
        style={{
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(400px, 50vw, 800px)',
          height: 'clamp(400px, 50vw, 800px)',
          background: 'radial-gradient(circle, rgba(201,168,110,0.06) 0%, rgba(201,168,110,0.02) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
          mixBlendMode: 'overlay' as const,
        }}
      />

      {/* Content — centered */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* 404 label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE_CINE }}
          className="mb-8"
          style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
            fontWeight: 300,
            color: 'rgba(42,34,24,0.35)',
            letterSpacing: '0.05em',
          }}
        >
          404
        </motion.div>

        {/* Main headline with typewriter */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE_CINE }}
          className="tracking-[-0.04em] leading-[1.05]"
          style={{
            fontSize: 'clamp(3rem, 8vw, 7.5rem)',
            fontWeight: 250,
          }}
        >
          {/* "Something" — constant, dark */}
          <span style={{ color: '#2a2218' }}>Something </span>
          {/* Cycling text — gold accent */}
          <span style={{ color: '#c9a86e' }}>
            {displayText}
          </span>
          {/* Blinking cursor */}
          <span
            style={{
              color: '#c9a86e',
              opacity: showCursor ? 0.7 : 0,
              transition: 'opacity 0.1s ease',
              fontWeight: 200,
              marginLeft: '2px',
            }}
          >
            |
          </span>
        </motion.h1>

        {/* Back to home link */}
        <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease: EASE_CINE }}
        >
          <MagneticLink href="/">
            Back to home
          </MagneticLink>
        </motion.div>
      </div>

      {/* Bottom decorative gold rule */}
      <motion.div
        className="absolute bottom-12 left-1/2"
        initial={{ scaleX: 0, x: '-50%' }}
        animate={{ scaleX: 1, x: '-50%' }}
        transition={{ duration: 1.5, delay: 1.5, ease: EASE_CINE }}
        style={{
          width: '80px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(201,168,110,0.4), transparent)',
          transformOrigin: 'center',
        }}
      />
    </div>
  )
}
