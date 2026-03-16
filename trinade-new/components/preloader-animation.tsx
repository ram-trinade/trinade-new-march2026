'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// ═══════════════════════════════════════════════════════════
// THE GOLDEN THREAD — Cinematic Preloader
// A gold line draws across the screen, TRINADE letters
// crystallize above it, percentage counter ascends,
// then a dramatic clip-path reveal unveils the page.
// ═══════════════════════════════════════════════════════════

type Phase = 'thread' | 'crystallize' | 'hold' | 'reveal' | 'done'

const LETTERS = 'TRINADE'.split('')
const EASE_CINE = [0.76, 0, 0.24, 1] as const
const EASE_EXPO = [0.16, 1, 0.3, 1] as const

// Each letter has a unique origin position (scattered) they'll animate FROM
const LETTER_ORIGINS = [
  { x: -120, y: -80, rotate: -15 },   // T
  { x: -60, y: 60, rotate: 12 },      // R
  { x: -30, y: -50, rotate: -8 },     // I
  { x: 20, y: 70, rotate: 10 },       // N
  { x: 60, y: -60, rotate: -12 },     // A
  { x: 100, y: 40, rotate: 8 },       // D
  { x: 140, y: -40, rotate: -6 },     // E
]

// Gold particle constellation — subtle ambient dots
const CONSTELLATION_POINTS = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1.5 + Math.random() * 2.5,
  delay: Math.random() * 2,
  duration: 3 + Math.random() * 4,
}))

export default function PreloaderAnimation() {
  const [phase, setPhase] = useState<Phase>('thread')
  const [progress, setProgress] = useState(0)
  const startTime = useRef(Date.now())
  const rafRef = useRef<number>(0)

  // Smooth progress counter with eased timing
  useEffect(() => {
    if (phase === 'reveal' || phase === 'done') return

    const TOTAL_DURATION = 3200 // total loading time ms

    const animate = () => {
      const elapsed = Date.now() - startTime.current
      const t = Math.min(elapsed / TOTAL_DURATION, 1)
      // Custom ease: slow start, fast middle, slow end
      const eased = t < 0.3
        ? t * t * (1 / 0.09) * 0.15  // slow ramp
        : t < 0.8
          ? 0.15 + ((t - 0.3) / 0.5) * 0.7  // fast middle
          : 0.85 + ((t - 0.8) / 0.2) * 0.15  // slow finish
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

    // thread → crystallize (after thread draws)
    timers.push(setTimeout(() => setPhase('crystallize'), 600))
    // crystallize → hold (letters assembled)
    timers.push(setTimeout(() => setPhase('hold'), 2400))
    // hold → reveal (dramatic pause then reveal)
    timers.push(setTimeout(() => setPhase('reveal'), 3400))
    // reveal → done
    timers.push(setTimeout(() => setPhase('done'), 4600))

    return () => timers.forEach(clearTimeout)
  }, [])

  if (phase === 'done') return null

  const isRevealing = phase === 'reveal'
  const isCrystallized = phase === 'crystallize' || phase === 'hold' || phase === 'reveal'

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
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
              duration: 1.0,
              ease: EASE_CINE,
              delay: 0.15,
            } : undefined}
          />

          {/* ─── Ambient Gold Constellation ─── */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
              pointerEvents: 'none',
            }}
          >
            {CONSTELLATION_POINTS.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={
                  isRevealing
                    ? { opacity: 0 }
                    : { opacity: [0, 0.6, 0] }
                }
                transition={
                  isRevealing
                    ? { duration: 0.3 }
                    : {
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'easeInOut',
                      }
                }
                style={{
                  position: 'absolute',
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  borderRadius: '50%',
                  background: '#c9a86e',
                  boxShadow: '0 0 4px rgba(201,168,110,0.4)',
                }}
              />
            ))}
          </div>

          {/* ─── Golden Thread (horizontal line) ─── */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={
              isRevealing
                ? { scaleX: 1, opacity: 0, scaleY: 40 }
                : { scaleX: 1, opacity: 1, scaleY: 1 }
            }
            transition={
              isRevealing
                ? { duration: 0.6, ease: EASE_CINE }
                : { duration: 1.4, ease: EASE_EXPO, delay: 0.1 }
            }
            style={{
              position: 'absolute',
              left: '15%',
              right: '15%',
              top: '50%',
              height: 1,
              background: 'linear-gradient(90deg, transparent 0%, #c9a86e 15%, #d4bb8a 50%, #c9a86e 85%, transparent 100%)',
              transformOrigin: 'center',
              willChange: 'transform, opacity',
            }}
          />

          {/* ─── Glow behind thread ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={
              isRevealing
                ? { opacity: 0 }
                : isCrystallized
                  ? { opacity: 1 }
                  : { opacity: 0.3 }
            }
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: '20%',
              right: '20%',
              top: 'calc(50% - 40px)',
              height: 80,
              background: 'radial-gradient(ellipse at center, rgba(201,168,110,0.12) 0%, transparent 70%)',
              filter: 'blur(20px)',
              pointerEvents: 'none',
            }}
          />

          {/* ─── TRINADE Letters ─── */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, calc(-50% - 28px))',
              display: 'flex',
              gap: '0.04em',
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.22em',
              fontWeight: 700,
              color: '#f2ede6',
              lineHeight: 1,
              willChange: 'transform, opacity',
            }}
          >
            {LETTERS.map((letter, i) => {
              const origin = LETTER_ORIGINS[i]
              return (
                <motion.span
                  key={i}
                  initial={{
                    opacity: 0,
                    x: origin.x,
                    y: origin.y,
                    rotate: origin.rotate,
                    filter: 'blur(8px)',
                  }}
                  animate={
                    isRevealing
                      ? {
                          opacity: 0,
                          y: -60,
                          filter: 'blur(12px)',
                        }
                      : isCrystallized
                        ? {
                            opacity: 1,
                            x: 0,
                            y: 0,
                            rotate: 0,
                            filter: 'blur(0px)',
                          }
                        : {
                            opacity: 0,
                            x: origin.x,
                            y: origin.y,
                            rotate: origin.rotate,
                            filter: 'blur(8px)',
                          }
                  }
                  transition={
                    isRevealing
                      ? { duration: 0.5, ease: EASE_CINE, delay: i * 0.03 }
                      : {
                          duration: 1.0,
                          ease: EASE_EXPO,
                          delay: 0.4 + i * 0.1,
                          filter: { duration: 0.6 },
                        }
                  }
                  style={{
                    display: 'inline-block',
                    willChange: 'transform, opacity, filter',
                    textShadow: isCrystallized ? '0 0 30px rgba(201,168,110,0.15)' : 'none',
                  }}
                >
                  {letter}
                </motion.span>
              )
            })}
          </div>

          {/* ─── Tagline below thread ─── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={
              isRevealing
                ? { opacity: 0, y: 20 }
                : isCrystallized
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 10 }
            }
            transition={
              isRevealing
                ? { duration: 0.3 }
                : { duration: 0.8, ease: EASE_EXPO, delay: 1.6 }
            }
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, 24px)',
              fontSize: 'clamp(11px, 1vw, 14px)',
              fontFamily: 'var(--font-sans)',
              fontWeight: 400,
              letterSpacing: '0.35em',
              textTransform: 'uppercase' as const,
              color: 'rgba(201,168,110,0.5)',
              whiteSpace: 'nowrap' as const,
            }}
          >
            AI Technologies
          </motion.div>

          {/* ─── Progress Ring ─── */}
          <motion.svg
            initial={{ opacity: 0, rotate: -90 }}
            animate={
              isRevealing
                ? { opacity: 0, scale: 2 }
                : { opacity: 1, rotate: -90, scale: 1 }
            }
            transition={
              isRevealing
                ? { duration: 0.4 }
                : { duration: 0.6, delay: 0.3 }
            }
            width="64"
            height="64"
            viewBox="0 0 64 64"
            style={{
              position: 'absolute',
              bottom: 'clamp(40px, 6vh, 80px)',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            {/* Track */}
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="rgba(201,168,110,0.1)"
              strokeWidth="1"
            />
            {/* Progress arc */}
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="#c9a86e"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 28}
              strokeDashoffset={2 * Math.PI * 28 * (1 - progress / 100)}
              style={{ transition: 'stroke-dashoffset 0.15s ease-out' }}
            />
          </motion.svg>

          {/* ─── Percentage Counter (inside ring) ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={
              isRevealing
                ? { opacity: 0, y: -10 }
                : { opacity: 1, y: 0 }
            }
            transition={
              isRevealing
                ? { duration: 0.3 }
                : { duration: 0.5, delay: 0.4 }
            }
            style={{
              position: 'absolute',
              bottom: 'clamp(52px, 6vh, 92px)',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-sans)',
              fontVariantNumeric: 'tabular-nums',
              fontSize: '14px',
              fontWeight: 300,
              letterSpacing: '0.06em',
              color: 'rgba(242,237,230,0.6)',
              textAlign: 'center' as const,
            }}
          >
            {String(progress).padStart(3, '0')}
          </motion.div>

          {/* ─── Corner Accents ─── */}
          {/* Top-left */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isRevealing
                ? { opacity: 0 }
                : isCrystallized
                  ? { opacity: 0.3, scale: 1 }
                  : { opacity: 0, scale: 0 }
            }
            transition={{ duration: 0.8, delay: 1.0, ease: EASE_EXPO }}
            style={{
              position: 'absolute',
              top: 'clamp(24px, 3vh, 48px)',
              left: 'clamp(24px, 3vw, 48px)',
              width: 32,
              height: 32,
              borderLeft: '1px solid rgba(201,168,110,0.3)',
              borderTop: '1px solid rgba(201,168,110,0.3)',
            }}
          />
          {/* Bottom-right */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isRevealing
                ? { opacity: 0 }
                : isCrystallized
                  ? { opacity: 0.3, scale: 1 }
                  : { opacity: 0, scale: 0 }
            }
            transition={{ duration: 0.8, delay: 1.1, ease: EASE_EXPO }}
            style={{
              position: 'absolute',
              bottom: 'clamp(24px, 3vh, 48px)',
              right: 'clamp(24px, 3vw, 48px)',
              width: 32,
              height: 32,
              borderRight: '1px solid rgba(201,168,110,0.3)',
              borderBottom: '1px solid rgba(201,168,110,0.3)',
            }}
          />

          {/* ─── Flash overlay on reveal ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={
              isRevealing
                ? { opacity: [0, 0.25, 0] }
                : { opacity: 0 }
            }
            transition={
              isRevealing
                ? { duration: 0.8, ease: 'easeOut', times: [0, 0.15, 1] }
                : undefined
            }
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, rgba(201,168,110,0.6) 0%, rgba(201,168,110,0.1) 50%, transparent 80%)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
