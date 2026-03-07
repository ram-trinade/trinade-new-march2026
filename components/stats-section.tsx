'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'motion/react'

const stats = [
  { value: 500, suffix: '+', label: 'Enterprise Clients', sublabel: 'across 40+ countries' },
  { value: 99.9, suffix: '%', label: 'Platform Uptime', sublabel: 'SLA-guaranteed reliability' },
  { value: 2.4, suffix: 'B+', label: 'API Calls / Month', sublabel: 'processed in real-time' },
  { value: 12, suffix: 'ms', label: 'Avg Response Time', sublabel: 'at the 95th percentile' },
]

function AnimatedNumber({
  value,
  suffix,
  isInView,
}: {
  value: number
  suffix: string
  isInView: boolean
}) {
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const startTime = performance.now()
    const startValue = 0

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startValue + (value - startValue) * eased

      setDisplayed(current)

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [isInView, value])

  const format = (n: number) => {
    if (value >= 100) return Math.round(n).toLocaleString()
    if (value >= 10) return n.toFixed(1)
    return n.toFixed(1)
  }

  return (
    <span>
      {format(displayed)}
      <span className="text-[#00d4aa]">{suffix}</span>
    </span>
  )
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-32 bg-[#060e09]">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,170,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative px-[calc(12.5vw+0.8rem)]">
        {/* Section header */}
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase text-[#00d4aa] mb-6"
          >
            <span>&#10022;</span>
            By The Numbers
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(2rem,4vw,3.8rem)] font-light leading-[1.12] tracking-[-0.025em]"
          >
            <span className="text-white/95">Scale that speaks</span>
            <span className="text-white/35">{' '}for itself.</span>
          </motion.h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="relative text-center"
            >
              {/* Divider between items */}
              {i > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-16 w-px bg-white/[0.06]" />
              )}

              <div
                className="text-[clamp(2.2rem,4vw,3.6rem)] font-bold tracking-[-0.03em] text-white/95 mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <AnimatedNumber value={stat.value} suffix={stat.suffix} isInView={isInView} />
              </div>

              <p className="text-[15px] font-medium text-white/60 mb-1">
                {stat.label}
              </p>

              <p className="text-[13px] text-white/30">
                {stat.sublabel}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
