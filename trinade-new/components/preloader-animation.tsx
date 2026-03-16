'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// ═══════════════════════════════════════════════════════════
// FRONTEND-W INSPIRED PRELOADER
// Animated gradient background with shifting warm tones,
// moving lens flare, centered tagline, large % counter
// ═══════════════════════════════════════════════════════════

type Phase = 'loading' | 'complete' | 'exit' | 'done'

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
    if (phase === 'exit' || phase === 'done') return

    const TOTAL_DURATION = 3200

    const animate = () => {
      const elapsed = Date.now() - startTime.current
      const t = Math.min(elapsed / TOTAL_DURATION, 1)
      // Custom ease: slow start, fast middle, slow end
      const eased = t < 0.12
        ? t * t * (1 / 0.0144) * 0.06
        : t < 0.65
          ? 0.06 + ((t - 0.12) / 0.53) * 0.70
          : 0.76 + ((t - 0.65) / 0.35) * 0.24
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

    // loading → complete
    timers.push(setTimeout(() => setPhase('complete'), 3400))
    // complete → exit (hold for a beat)
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
  const isComplete = phase === 'complete' || isExiting

  return (
    <AnimatePresence>
      {(
        <motion.div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10001,
            overflow: 'hidden',
            pointerEvents: isExiting ? 'none' : 'auto',
          }}
        >
          {/* ─── Animated gradient background ─── */}
          {/* Base layer: rich dark warm gradient */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
            transition={isExiting ? { duration: 0.8, ease: EASE_CINE } : undefined}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #0d0b08 0%, #1c160d 20%, #0f0d0a 40%, #201811 60%, #150f08 80%, #0d0b08 100%)',
            }}
          />

          {/* Animated color layer 1: warm gold glow — shifts position */}
          <motion.div
            initial={{ x: '-20%', y: '-10%', opacity: 0.35 }}
            animate={
              isExiting
                ? { opacity: 0 }
                : isComplete
                  ? { x: '15%', y: '-25%', opacity: 0.6, scale: 1.4 }
                  : { x: '10%', y: '-20%', opacity: 0.55, scale: 1.3 }
            }
            transition={{
              duration: isExiting ? 0.8 : 3.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{
              position: 'absolute',
              width: '130vw',
              height: '130vh',
              top: '-15vh',
              left: '-15vw',
              background: 'radial-gradient(ellipse 70% 60% at 30% 40%, rgba(180,130,55,0.3) 0%, rgba(140,100,40,0.12) 40%, transparent 70%)',
              pointerEvents: 'none',
              willChange: 'transform',
            }}
          />

          {/* Animated color layer 2: deep amber — opposite movement */}
          <motion.div
            initial={{ x: '20%', y: '10%', opacity: 0.25 }}
            animate={
              isExiting
                ? { opacity: 0 }
                : isComplete
                  ? { x: '-20%', y: '-10%', opacity: 0.5, scale: 1.3 }
                  : { x: '-15%', y: '-5%', opacity: 0.45, scale: 1.2 }
            }
            transition={{
              duration: isExiting ? 0.8 : 4.0,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{
              position: 'absolute',
              width: '110vw',
              height: '110vh',
              top: '5vh',
              right: '-10vw',
              background: 'radial-gradient(ellipse 60% 50% at 70% 60%, rgba(200,150,60,0.22) 0%, rgba(160,120,50,0.08) 50%, transparent 70%)',
              pointerEvents: 'none',
              willChange: 'transform',
            }}
          />

          {/* Animated color layer 3: subtle warm wash — adds depth */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={
              isExiting
                ? { opacity: 0 }
                : { opacity: 0.3 }
            }
            transition={{
              duration: isExiting ? 0.6 : 2.5,
              ease: [0.25, 0.1, 0.25, 1],
              delay: isExiting ? 0 : 0.5,
            }}
            style={{
              position: 'absolute',
              width: '80vw',
              height: '80vh',
              bottom: '-20vh',
              right: '-10vw',
              background: 'radial-gradient(ellipse 80% 70% at 60% 80%, rgba(160,115,50,0.15) 0%, transparent 60%)',
              pointerEvents: 'none',
            }}
          />

          {/* ─── Lens flare / light leak effect ─── */}
          <motion.div
            initial={{ x: '-30vw', y: '-20vh', opacity: 0, scale: 0.8 }}
            animate={
              isExiting
                ? { opacity: 0, scale: 1.5 }
                : isComplete
                  ? { x: '-5vw', y: '-5vh', opacity: 0.8, scale: 1.4 }
                  : { x: '-5vw', y: '-5vh', opacity: 0.65, scale: 1.2 }
            }
            transition={{
              duration: isExiting ? 0.6 : 3.0,
              ease: EASE_OUT,
            }}
            style={{
              position: 'absolute',
              width: 'clamp(350px, 55vw, 800px)',
              height: 'clamp(350px, 55vh, 800px)',
              top: '-8%',
              left: '-8%',
              background: 'radial-gradient(circle, rgba(220,195,145,0.2) 0%, rgba(201,168,110,0.1) 25%, rgba(180,140,70,0.04) 50%, transparent 70%)',
              filter: 'blur(35px)',
              pointerEvents: 'none',
              willChange: 'transform',
            }}
          />

          {/* Secondary lens flare — smaller, brighter core */}
          <motion.div
            initial={{ x: '-25vw', y: '-15vh', opacity: 0 }}
            animate={
              isExiting
                ? { opacity: 0 }
                : isComplete
                  ? { x: '0vw', y: '-2vh', opacity: 0.6 }
                  : { x: '0vw', y: '-2vh', opacity: 0.4 }
            }
            transition={{
              duration: isExiting ? 0.5 : 2.5,
              ease: EASE_OUT,
              delay: isExiting ? 0 : 0.3,
            }}
            style={{
              position: 'absolute',
              width: 'clamp(120px, 18vw, 240px)',
              height: 'clamp(120px, 18vh, 240px)',
              top: '8%',
              left: '12%',
              background: 'radial-gradient(circle, rgba(255,248,235,0.15) 0%, rgba(212,187,138,0.08) 35%, transparent 70%)',
              filter: 'blur(18px)',
              pointerEvents: 'none',
              willChange: 'transform',
            }}
          />

          {/* ─── Grain texture ─── */}
          <motion.div
            animate={isExiting ? { opacity: 0 } : { opacity: 0.05 }}
            transition={isExiting ? { duration: 0.6 } : { duration: 0.5 }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              pointerEvents: 'none',
              mixBlendMode: 'overlay',
            }}
          />

          {/* ─── Center tagline: "You Envision — We Build" ─── */}
          <motion.div
            animate={isExiting ? { opacity: 0, y: -40 } : { opacity: 1, y: 0 }}
            transition={isExiting ? { duration: 0.6, ease: EASE_CINE } : undefined}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 3vw, 40px)' }}>
              {/* "You Envision" */}
              <motion.span
                initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
                animate={
                  isExiting
                    ? { opacity: 0, x: -20, filter: 'blur(4px)' }
                    : { opacity: 0.9, x: 0, filter: 'blur(0px)' }
                }
                transition={{
                  duration: 1.0,
                  ease: EASE_OUT,
                  delay: isExiting ? 0 : 0.4,
                }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 3vw, 2.6rem)',
                  fontWeight: 200,
                  letterSpacing: '0.04em',
                  color: 'rgba(242,237,230,0.8)',
                  whiteSpace: 'nowrap',
                }}
              >
                You Envision
              </motion.span>

              {/* Em dash separator */}
              <motion.span
                initial={{ opacity: 0, scaleX: 0 }}
                animate={
                  isExiting
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 0.5, scaleX: 1 }
                }
                transition={{
                  duration: 0.8,
                  ease: EASE_OUT,
                  delay: isExiting ? 0 : 0.7,
                }}
                style={{
                  width: 'clamp(28px, 4.5vw, 60px)',
                  height: 1,
                  background: 'rgba(201,168,110,0.6)',
                  transformOrigin: 'center',
                  flexShrink: 0,
                }}
              />

              {/* "We Build" */}
              <motion.span
                initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
                animate={
                  isExiting
                    ? { opacity: 0, x: 20, filter: 'blur(4px)' }
                    : { opacity: 0.9, x: 0, filter: 'blur(0px)' }
                }
                transition={{
                  duration: 1.0,
                  ease: EASE_OUT,
                  delay: isExiting ? 0.05 : 0.5,
                }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 3vw, 2.6rem)',
                  fontWeight: 200,
                  letterSpacing: '0.04em',
                  color: 'rgba(242,237,230,0.8)',
                  whiteSpace: 'nowrap',
                }}
              >
                We Build
              </motion.span>
            </div>
          </motion.div>

          {/* ─── Bottom-right percentage counter ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={
              isExiting
                ? { opacity: 0, y: -60 }
                : { opacity: 1, y: 0 }
            }
            transition={
              isExiting
                ? { duration: 0.6, ease: EASE_CINE }
                : { duration: 0.8, ease: EASE_OUT, delay: 0.2 }
            }
            style={{
              position: 'absolute',
              bottom: 'clamp(16px, 3vh, 48px)',
              right: 'clamp(20px, 3vw, 64px)',
              pointerEvents: 'none',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontVariantNumeric: 'tabular-nums',
                fontSize: 'clamp(5rem, 12vw, 11rem)',
                fontWeight: 200,
                letterSpacing: '-0.04em',
                lineHeight: 0.82,
                color: 'rgba(242,237,230,0.12)',
                display: 'flex',
                alignItems: 'baseline',
              }}
            >
              <span>{progress}</span>
              <span
                style={{
                  fontSize: '0.35em',
                  fontWeight: 300,
                  letterSpacing: '0.02em',
                  marginLeft: '0.06em',
                  opacity: 0.8,
                }}
              >
                %
              </span>
            </div>
          </motion.div>

          {/* ─── Corner accents — subtle geometric detail ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isExiting ? { opacity: 0 } : { opacity: 0.25 }}
            transition={{ duration: isExiting ? 0.4 : 1.2, delay: isExiting ? 0 : 0.8 }}
            style={{
              position: 'absolute',
              top: 'clamp(20px, 3vh, 40px)',
              left: 'clamp(24px, 3vw, 44px)',
              width: 28,
              height: 28,
              borderLeft: '1px solid rgba(201,168,110,0.4)',
              borderTop: '1px solid rgba(201,168,110,0.4)',
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={isExiting ? { opacity: 0 } : { opacity: 0.25 }}
            transition={{ duration: isExiting ? 0.4 : 1.2, delay: isExiting ? 0 : 0.9 }}
            style={{
              position: 'absolute',
              top: 'clamp(20px, 3vh, 40px)',
              right: 'clamp(24px, 3vw, 44px)',
              width: 28,
              height: 28,
              borderRight: '1px solid rgba(201,168,110,0.4)',
              borderTop: '1px solid rgba(201,168,110,0.4)',
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={isExiting ? { opacity: 0 } : { opacity: 0.25 }}
            transition={{ duration: isExiting ? 0.4 : 1.2, delay: isExiting ? 0 : 1.0 }}
            style={{
              position: 'absolute',
              bottom: 'clamp(20px, 3vh, 40px)',
              left: 'clamp(24px, 3vw, 44px)',
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
