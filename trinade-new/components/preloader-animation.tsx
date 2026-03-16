'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

type Phase = 'loading' | 'transitioning' | 'complete'

const LETTERS = 'TRINADE'.split('')
const LOAD_DURATION = 2800 // ms
const TRANSITION_DURATION = 1200 // ms

// Generate gold particles with random trajectories
const particles = Array.from({ length: 8 }, (_, i) => {
  const angle = (i / 8) * 360 + (Math.random() * 30 - 15)
  const distance = 120 + Math.random() * 200
  const rad = (angle * Math.PI) / 180
  const tx = Math.cos(rad) * distance
  const ty = Math.sin(rad) * distance
  const size = 3 + Math.random() * 5
  const delay = Math.random() * 0.15
  return { tx, ty, size, delay, angle, id: i }
})

export default function PreloaderAnimation() {
  const [phase, setPhase] = useState<Phase>('loading')
  const [progress, setProgress] = useState(0)
  const [lettersRevealed, setLettersRevealed] = useState(0)
  const startTime = useRef(Date.now())
  const rafRef = useRef<number>(0)

  // Animate progress counter
  useEffect(() => {
    if (phase !== 'loading') return

    const animate = () => {
      const elapsed = Date.now() - startTime.current
      const p = Math.min(elapsed / LOAD_DURATION, 1)
      // Ease out cubic for a natural feel
      const eased = 1 - Math.pow(1 - p, 3)
      setProgress(Math.round(eased * 100))

      // Stagger letter reveals over first 1.8s
      const letterProgress = Math.min(elapsed / 1800, 1)
      const count = Math.floor(letterProgress * LETTERS.length)
      setLettersRevealed(Math.min(count + (letterProgress > 0 ? 1 : 0), LETTERS.length))

      if (p < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [phase])

  // Phase progression
  useEffect(() => {
    if (phase === 'loading') {
      const timer = setTimeout(() => setPhase('transitioning'), LOAD_DURATION)
      return () => clearTimeout(timer)
    }
    if (phase === 'transitioning') {
      const timer = setTimeout(() => setPhase('complete'), TRANSITION_DURATION)
      return () => clearTimeout(timer)
    }
  }, [phase])

  // Store in sessionStorage when complete
  useEffect(() => {
    if (phase === 'complete') {
      try {
        sessionStorage.setItem('trinade-preloader-seen', 'true')
      } catch {}
    }
  }, [phase])

  if (phase === 'complete') return null

  return (
    <AnimatePresence>
      {(phase as Phase) !== 'complete' && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            pointerEvents: phase === 'transitioning' ? 'none' : 'auto',
          }}
        >
          {/* Top half */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50%',
              backgroundColor: '#1a1a1e',
              willChange: 'transform',
              zIndex: 2,
            }}
            animate={
              phase === 'transitioning'
                ? { y: '-100%' }
                : { y: 0 }
            }
            transition={
              phase === 'transitioning'
                ? { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
                : undefined
            }
          />

          {/* Bottom half */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              backgroundColor: '#1a1a1e',
              willChange: 'transform',
              zIndex: 2,
            }}
            animate={
              phase === 'transitioning'
                ? { y: '100%' }
                : { y: 0 }
            }
            transition={
              phase === 'transitioning'
                ? { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
                : undefined
            }
          />

          {/* Center content — text, rule, glow, particles */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 3,
              willChange: 'transform, opacity',
            }}
            animate={
              phase === 'transitioning'
                ? { scale: 12, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            transition={
              phase === 'transitioning'
                ? { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                : undefined
            }
          >
            {/* Gold glow behind text */}
            <div
              className="preloader-glow"
              style={{
                position: 'absolute',
                width: '400px',
                height: '120px',
                borderRadius: '50%',
                background:
                  'radial-gradient(ellipse at center, rgba(201,168,110,0.18) 0%, rgba(201,168,110,0.06) 50%, transparent 70%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* TRINADE letters */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.06em',
                  fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '0.18em',
                  color: '#f2ede6',
                  lineHeight: 1,
                }}
              >
                {LETTERS.map((letter, i) => {
                  const isRevealed = i < lettersRevealed
                  const staggerDelay = i * 0.12
                  return (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 40 }}
                      animate={
                        isRevealed
                          ? {
                              opacity: 1,
                              y: 0,
                              fontWeight: 700,
                            }
                          : { opacity: 0, y: 40, fontWeight: 200 }
                      }
                      transition={{
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1],
                        fontWeight: { duration: 1.2, delay: 0.1 },
                      }}
                      style={{
                        display: 'inline-block',
                        willChange: 'transform, opacity',
                      }}
                    >
                      {letter}
                    </motion.span>
                  )
                })}
              </div>

              {/* Gold horizontal rule */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={
                  lettersRevealed >= LETTERS.length
                    ? { scaleX: 1, opacity: 1 }
                    : { scaleX: 0, opacity: 0 }
                }
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.1,
                }}
                style={{
                  marginTop: '1rem',
                  width: '80px',
                  height: '1.5px',
                  background:
                    'linear-gradient(90deg, transparent, #c9a86e 20%, #d4bb8a 50%, #c9a86e 80%, transparent)',
                  transformOrigin: 'center',
                  willChange: 'transform, opacity',
                }}
              />
            </div>
          </motion.div>

          {/* Gold particles — only during transition */}
          {phase === 'transitioning' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 4,
                pointerEvents: 'none',
                overflow: 'hidden',
              }}
            >
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{
                    x: '-50%',
                    y: '-50%',
                    opacity: 1,
                    scale: 1,
                  }}
                  animate={{
                    x: p.tx,
                    y: p.ty,
                    opacity: 0,
                    scale: 0.3,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                    delay: p.delay,
                  }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: p.size,
                    height: p.size,
                    borderRadius: '50%',
                    background:
                      'radial-gradient(circle, #d4bb8a 0%, #c9a86e 60%, transparent 100%)',
                    boxShadow: '0 0 6px 2px rgba(201,168,110,0.4)',
                    willChange: 'transform, opacity',
                  }}
                />
              ))}
            </div>
          )}

          {/* Progress bar at bottom */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '2px',
              backgroundColor: '#c9a86e',
              zIndex: 5,
              willChange: 'width',
            }}
            animate={
              phase === 'transitioning'
                ? { opacity: 0 }
                : { width: `${progress}%`, opacity: 1 }
            }
            transition={
              phase === 'transitioning'
                ? { duration: 0.3 }
                : { duration: 0.1 }
            }
          />

          {/* Counter in bottom-right */}
          <motion.div
            animate={
              phase === 'transitioning'
                ? { opacity: 0, y: -20 }
                : { opacity: 1, y: 0 }
            }
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              bottom: '2rem',
              right: '2.5rem',
              zIndex: 5,
              fontFamily: 'var(--font-sans)',
              fontVariantNumeric: 'tabular-nums',
              fontSize: '13px',
              fontWeight: 400,
              letterSpacing: '0.08em',
              color: 'rgba(242,237,230,0.45)',
            }}
          >
            {String(progress).padStart(3, '0')}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
