'use client'

import { useState, useEffect, useRef } from 'react'
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
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1))
          timeoutRef.current = setTimeout(tick, TYPE_SPEED + Math.random() * 30)
        } else {
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true)
            tick()
          }, PAUSE_AFTER_TYPE)
          return
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
          timeoutRef.current = setTimeout(tick, DELETE_SPEED)
        } else {
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

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  return { displayText, showCursor }
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
      {/* Giant "404" watermark — massive, layered behind content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.1, ease: EASE_CINE }}
        className="absolute inset-0 select-none pointer-events-none flex items-center justify-center"
      >
        <span
          style={{
            fontSize: 'clamp(16rem, 30vw, 34rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 0.85,
            color: 'transparent',
            WebkitTextStroke: '2px rgba(42,34,24,0.12)',
          }}
        >
          404
        </span>
      </motion.div>

      {/* Subtle atmospheric gold glow */}
      <div
        className="absolute"
        style={{
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(400px, 50vw, 800px)',
          height: 'clamp(400px, 50vw, 800px)',
          background: 'radial-gradient(circle, rgba(201,168,110,0.08) 0%, rgba(201,168,110,0.03) 40%, transparent 70%)',
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
        {/* Main headline with typewriter — TASK 4: bolder weight */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE_CINE }}
          className="tracking-[-0.04em] leading-[1.05]"
          style={{
            fontSize: 'clamp(3rem, 8vw, 7.5rem)',
            fontWeight: 400,
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
              fontWeight: 300,
              marginLeft: '2px',
            }}
          >
            |
          </span>
        </motion.h1>

        {/* Back to home — TASK 2 & 3: clean design-aligned link, no magnetic animation */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease: EASE_CINE }}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-3"
            style={{ textDecoration: 'none' }}
          >
            <span
              style={{
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                color: '#2a2218',
                paddingBottom: '3px',
                borderBottom: '1px solid rgba(42,34,24,0.3)',
                transition: 'border-color 0.4s ease, color 0.4s ease',
              }}
              className="group-hover:!border-[#c9a86e] group-hover:!text-[#a0814a]"
            >
              Back to home
            </span>
            <span
              className="flex items-center justify-center transition-all duration-400 group-hover:translate-x-[3px]"
              style={{
                color: '#2a2218',
                transition: 'color 0.4s ease, transform 0.4s ease',
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M4 9h10M10 5l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
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
