'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// ═══════════════════════════════════════════════════════════
// MINIMAL PRELOADER — Typographic percentage + thin progress
// Clean, elegant, no brand text. Just a beautiful counter
// that builds to 100, then a smooth curtain reveal.
// ═══════════════════════════════════════════════════════════

type Phase = 'loading' | 'complete' | 'reveal' | 'done'

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

  // Smooth progress counter
  useEffect(() => {
    if (phase === 'reveal' || phase === 'done') return

    const TOTAL_DURATION = 2400

    const animate = () => {
      const elapsed = Date.now() - startTime.current
      const t = Math.min(elapsed / TOTAL_DURATION, 1)
      // Ease: slow start, cruise, slow finish
      const eased = t < 0.2
        ? t * t * 25 * 0.1            // slow ramp 0-10%
        : t < 0.75
          ? 0.1 + ((t - 0.2) / 0.55) * 0.75  // cruise 10-85%
          : 0.85 + ((t - 0.75) / 0.25) * 0.15 // slow finish 85-100%
      setProgress(Math.min(Math.round(eased * 100), 100))

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [phase])

  // Phase transitions
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    // loading → complete (counter hits 100)
    timers.push(setTimeout(() => setPhase('complete'), 2500))
    // complete → reveal (brief hold at 100)
    timers.push(setTimeout(() => setPhase('reveal'), 3000))
    // reveal → done (curtain finished)
    timers.push(setTimeout(() => setPhase('done'), 4000))

    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (phase === 'done' && onComplete) {
      onComplete()
    }
  }, [phase, onComplete])

  if (phase === 'done') return null

  const isRevealing = phase === 'reveal'
  const isComplete = phase === 'complete' || phase === 'reveal'

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10001,
            overflow: 'hidden',
            pointerEvents: isRevealing ? 'none' : 'auto',
          }}
        >
          {/* ─── Background ─── */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#0a0a0a',
            }}
            animate={isRevealing ? {
              clipPath: 'inset(0 0 100% 0)',
            } : {
              clipPath: 'inset(0 0 0% 0)',
            }}
            transition={isRevealing ? {
              duration: 0.85,
              ease: EASE_CINE,
              delay: 0.1,
            } : undefined}
          />

          {/* ─── Percentage Counter (centered, large, elegant) ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={
              isRevealing
                ? { opacity: 0, y: -40 }
                : { opacity: 1, y: 0 }
            }
            transition={
              isRevealing
                ? { duration: 0.4, ease: EASE_CINE }
                : { duration: 0.8, delay: 0.1, ease: EASE_OUT }
            }
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              {/* Large number */}
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontVariantNumeric: 'tabular-nums',
                  fontSize: 'clamp(4.5rem, 10vw, 9rem)',
                  fontWeight: 200,
                  letterSpacing: '-0.02em',
                  color: 'rgba(242,237,230,0.9)',
                  lineHeight: 1,
                }}
              >
                {progress}
              </div>

              {/* Thin gold rule below number */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={
                  isRevealing
                    ? { scaleX: 0, opacity: 0 }
                    : { scaleX: 1, opacity: 1 }
                }
                transition={
                  isRevealing
                    ? { duration: 0.3 }
                    : { duration: 1.2, ease: EASE_OUT, delay: 0.3 }
                }
                style={{
                  width: 'clamp(40px, 6vw, 64px)',
                  height: 1,
                  background: 'rgba(201,168,110,0.4)',
                  margin: '16px auto 0',
                  transformOrigin: 'center',
                }}
              />
            </div>
          </motion.div>

          {/* ─── Bottom progress bar (full width, very thin) ─── */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
              background: 'rgba(201,168,110,0.08)',
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={
                isRevealing
                  ? { scaleX: 1, opacity: 0 }
                  : { scaleX: progress / 100 }
              }
              transition={
                isRevealing
                  ? { duration: 0.4 }
                  : { duration: 0.15, ease: 'linear' }
              }
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, rgba(201,168,110,0.3) 0%, rgba(201,168,110,0.7) 100%)',
                transformOrigin: 'left',
                willChange: 'transform',
              }}
            />
          </div>

          {/* ─── Flash overlay on reveal ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={
              isRevealing
                ? { opacity: [0, 0.15, 0] }
                : { opacity: 0 }
            }
            transition={
              isRevealing
                ? { duration: 0.7, ease: 'easeOut', times: [0, 0.12, 1] }
                : undefined
            }
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(242,237,230,0.1)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
