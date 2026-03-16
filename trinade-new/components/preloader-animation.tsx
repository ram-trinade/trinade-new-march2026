'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'

// ═══════════════════════════════════════════════════════════
// HATAMEX-INSPIRED PRELOADER — Logo + synced line + percentage
// Phase 1: Logo centered, line grows under it, large % bottom-right
// Phase 2: "TRINADE" text slides in next to logo
// Phase 3: Everything slides up to reveal page
// ═══════════════════════════════════════════════════════════

type Phase = 'loading' | 'complete' | 'brandReveal' | 'exit' | 'done'

const EASE_CINE = [0.76, 0, 0.24, 1] as const
const EASE_OUT = [0.16, 1, 0.3, 1] as const

interface PreloaderProps {
  onComplete?: () => void
}

export default function PreloaderAnimation({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<Phase>('loading')
  const [progress, setProgress] = useState(0)
  const startTime = useRef(Date.now())
  const rafRef = useRef<number>(0)

  // Smooth progress counter 0→100
  useEffect(() => {
    if (phase === 'brandReveal' || phase === 'exit' || phase === 'done') return

    const TOTAL_DURATION = 2600

    const animate = () => {
      const elapsed = Date.now() - startTime.current
      const t = Math.min(elapsed / TOTAL_DURATION, 1)
      // Custom ease: slow start, fast middle, slow end
      const eased = t < 0.15
        ? t * t * (1 / 0.0225) * 0.08
        : t < 0.7
          ? 0.08 + ((t - 0.15) / 0.55) * 0.72
          : 0.8 + ((t - 0.7) / 0.3) * 0.2
      setProgress(Math.min(Math.round(eased * 100), 100))

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [phase])

  // Phase state machine
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    // loading → complete (counter finishes)
    timers.push(setTimeout(() => setPhase('complete'), 2700))
    // complete → brandReveal (brief hold, then TRINADE text appears)
    timers.push(setTimeout(() => setPhase('brandReveal'), 3200))
    // brandReveal → exit (text shown, now slide everything away)
    timers.push(setTimeout(() => setPhase('exit'), 4200))
    // exit → done
    timers.push(setTimeout(() => setPhase('done'), 5200))

    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (phase === 'done' && onComplete) {
      onComplete()
    }
  }, [phase, onComplete])

  if (phase === 'done') return null

  const isExiting = phase === 'exit'
  const isBrandRevealed = phase === 'brandReveal' || phase === 'exit'
  const isComplete = phase === 'complete' || isBrandRevealed

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10001,
            overflow: 'hidden',
            pointerEvents: isExiting ? 'none' : 'auto',
          }}
        >
          {/* ─── Background — warm dark gold gradient ─── */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #1a1610 0%, #2a1f14 40%, #1e1810 70%, #1a1610 100%)',
            }}
            animate={isExiting ? {
              y: '-100%',
            } : {
              y: '0%',
            }}
            transition={isExiting ? {
              duration: 0.9,
              ease: EASE_CINE,
              delay: 0.15,
            } : undefined}
          />

          {/* ─── Gold glass radial overlay ─── */}
          <motion.div
            animate={isExiting ? { y: '-100%' } : { y: '0%' }}
            transition={isExiting ? { duration: 0.9, ease: EASE_CINE, delay: 0.15 } : undefined}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,110,0.08) 0%, rgba(160,129,74,0.04) 40%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* ─── Subtle warm vignette ─── */}
          <motion.div
            animate={isExiting ? { y: '-100%' } : { y: '0%' }}
            transition={isExiting ? { duration: 0.9, ease: EASE_CINE, delay: 0.15 } : undefined}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(15,12,8,0.5) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* ─── Subtle grain texture ─── */}
          <motion.div
            animate={isExiting ? { y: '-100%' } : { y: '0%' }}
            transition={isExiting ? { duration: 0.9, ease: EASE_CINE, delay: 0.15 } : undefined}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.03,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              pointerEvents: 'none',
            }}
          />

          {/* ─── Center: Logo + Progress Line ─── */}
          <motion.div
            animate={isExiting ? { y: '-100%' } : { y: '0%' }}
            transition={isExiting ? { duration: 0.9, ease: EASE_CINE, delay: 0.1 } : undefined}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            {/* Logo image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={
                isBrandRevealed
                  ? { opacity: 0, scale: 0.9, y: -20 }
                  : { opacity: 1, scale: 1, y: 0 }
              }
              transition={
                isBrandRevealed
                  ? { duration: 0.5, ease: EASE_CINE }
                  : { duration: 0.8, ease: EASE_OUT, delay: 0.1 }
              }
              style={{
                width: 'clamp(52px, 6vw, 80px)',
                height: 'clamp(52px, 6vw, 80px)',
                position: 'relative',
              }}
            >
              <Image
                src="/logo-transparent.png"
                alt="Trinade"
                fill
                style={{
                  objectFit: 'contain',
                  filter: 'brightness(1.2) sepia(0.3) hue-rotate(-10deg) saturate(0.8)',
                }}
                priority
              />
            </motion.div>

            {/* Gold progress line under logo — synced with percentage */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={
                isBrandRevealed
                  ? { scaleX: 0, opacity: 0 }
                  : { scaleX: progress / 100, opacity: 1 }
              }
              transition={
                isBrandRevealed
                  ? { duration: 0.4, ease: EASE_CINE }
                  : { duration: 0.1, ease: 'linear' }
              }
              style={{
                width: 'clamp(160px, 20vw, 280px)',
                height: 1.5,
                background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,110,0.5) 20%, rgba(212,187,138,0.8) 50%, rgba(201,168,110,0.5) 80%, transparent 100%)',
                marginTop: 'clamp(16px, 2vw, 24px)',
                transformOrigin: 'center',
                willChange: 'transform',
              }}
            />

            {/* Glow behind line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={
                isBrandRevealed
                  ? { opacity: 0 }
                  : isComplete
                    ? { opacity: 0.6 }
                    : { opacity: progress > 20 ? 0.3 : 0 }
              }
              transition={{ duration: 0.5 }}
              style={{
                width: 'clamp(120px, 16vw, 220px)',
                height: 40,
                background: 'radial-gradient(ellipse at center, rgba(201,168,110,0.12) 0%, transparent 70%)',
                filter: 'blur(16px)',
                marginTop: -20,
                pointerEvents: 'none',
              }}
            />

            {/* ─── "TRINADE" brand text reveal ─── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={
                isBrandRevealed
                  ? { opacity: 1, y: -60 }
                  : { opacity: 0, y: 0 }
              }
              transition={{
                duration: 0.6,
                ease: EASE_OUT,
              }}
              style={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(12px, 1.5vw, 20px)',
              }}
            >
              {/* Logo next to text */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(6px)' }}
                animate={
                  isBrandRevealed
                    ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
                    : { opacity: 0, scale: 0.8, filter: 'blur(6px)' }
                }
                transition={{ duration: 0.6, ease: EASE_OUT }}
                style={{
                  width: 'clamp(40px, 4.5vw, 60px)',
                  height: 'clamp(40px, 4.5vw, 60px)',
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/logo-transparent.png"
                  alt=""
                  fill
                  style={{
                    objectFit: 'contain',
                    filter: 'brightness(1.2) sepia(0.3) hue-rotate(-10deg) saturate(0.8)',
                  }}
                  priority
                />
              </motion.div>

              {/* Letter-by-letter stagger with blur-to-sharp + gold shimmer */}
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 300,
                  letterSpacing: '0.12em',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  position: 'relative',
                }}
              >
                {'Trinade'.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
                    animate={
                      isBrandRevealed
                        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                        : { opacity: 0, y: 20, filter: 'blur(12px)' }
                    }
                    transition={{
                      duration: 0.5,
                      ease: EASE_OUT,
                      delay: isBrandRevealed ? i * 0.06 : 0,
                    }}
                    style={{
                      display: 'inline-block',
                      color: 'rgba(242,237,230,0.93)',
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}

                {/* Gold shimmer sweep overlay */}
                <motion.span
                  initial={{ x: '-120%' }}
                  animate={isBrandRevealed ? { x: '120%' } : { x: '-120%' }}
                  transition={{
                    duration: 0.8,
                    ease: EASE_CINE,
                    delay: isBrandRevealed ? 0.3 : 0,
                  }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,110,0.35) 45%, rgba(212,187,138,0.5) 50%, rgba(201,168,110,0.35) 55%, transparent 100%)',
                    pointerEvents: 'none',
                    mixBlendMode: 'screen',
                  }}
                />
              </span>
            </motion.div>
          </motion.div>

          {/* ─── Bottom-right percentage counter ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              isExiting
                ? { opacity: 0, y: '-100vh' }
                : isBrandRevealed
                  ? { opacity: 0, y: 20 }
                  : { opacity: 1, y: 0 }
            }
            transition={
              isExiting
                ? { duration: 0.9, ease: EASE_CINE, delay: 0.1 }
                : isBrandRevealed
                  ? { duration: 0.4, ease: EASE_CINE }
                  : { duration: 0.6, ease: EASE_OUT, delay: 0.2 }
            }
            style={{
              position: 'absolute',
              bottom: 'clamp(24px, 4vh, 56px)',
              right: 'clamp(28px, 4vw, 72px)',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontVariantNumeric: 'tabular-nums',
                fontSize: 'clamp(4rem, 9vw, 8.5rem)',
                fontWeight: 200,
                letterSpacing: '-0.03em',
                lineHeight: 0.85,
                color: 'rgba(242,237,230,0.12)',
                display: 'flex',
                alignItems: 'baseline',
              }}
            >
              <span>{String(progress).padStart(2, '0')}</span>
              <span
                style={{
                  fontSize: '0.4em',
                  fontWeight: 300,
                  letterSpacing: '0.02em',
                  marginLeft: '0.08em',
                  opacity: 0.7,
                }}
              >
                %
              </span>
            </div>
          </motion.div>

          {/* ─── Corner accents ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={
              isExiting
                ? { opacity: 0, y: '-100vh' }
                : { opacity: 0.25 }
            }
            transition={
              isExiting
                ? { duration: 0.9, ease: EASE_CINE, delay: 0.1 }
                : { duration: 1.0, delay: 0.6 }
            }
            style={{
              position: 'absolute',
              top: 'clamp(24px, 3vh, 48px)',
              left: 'clamp(28px, 3vw, 48px)',
              width: 28,
              height: 28,
              borderLeft: '1px solid rgba(201,168,110,0.4)',
              borderTop: '1px solid rgba(201,168,110,0.4)',
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={
              isExiting
                ? { opacity: 0, y: '-100vh' }
                : { opacity: 0.25 }
            }
            transition={
              isExiting
                ? { duration: 0.9, ease: EASE_CINE, delay: 0.1 }
                : { duration: 1.0, delay: 0.7 }
            }
            style={{
              position: 'absolute',
              bottom: 'clamp(24px, 3vh, 48px)',
              left: 'clamp(28px, 3vw, 48px)',
              width: 28,
              height: 28,
              borderLeft: '1px solid rgba(201,168,110,0.4)',
              borderBottom: '1px solid rgba(201,168,110,0.4)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
