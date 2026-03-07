'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const partners = [
  { name: 'Meridian', width: 'w-[110px]' },
  { name: 'Arclight', width: 'w-[100px]' },
  { name: 'Novus', width: 'w-[90px]' },
  { name: 'Helios', width: 'w-[95px]' },
  { name: 'Veridian', width: 'w-[115px]' },
  { name: 'Cortex', width: 'w-[100px]' },
]

function LogoPlaceholder({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-1.5 select-none">
      <div className="w-5 h-5 rounded-md bg-[#1a1f1a]/[0.06] border border-[#1a1f1a]/[0.06]" />
      <span
        className="text-[15px] font-medium tracking-[-0.01em] text-[#1a1f1a]/35"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {name}
      </span>
    </div>
  )
}

export default function TrustedBy() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-24">
      <div className="px-[calc(12.5vw+0.8rem)]">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-center text-[13px] font-medium tracking-[0.12em] uppercase text-[#1a1f1a]/30 mb-14">
            Trusted by forward-thinking teams
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
            {partners.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="transition-opacity duration-300 hover:opacity-80"
              >
                <LogoPlaceholder name={partner.name} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom subtle divider */}
      <div className="absolute bottom-0 left-[calc(12.5vw+0.8rem)] right-[calc(12.5vw+0.8rem)] h-px bg-gradient-to-r from-transparent via-[#1a1f1a]/[0.06] to-transparent" />
    </section>
  )
}
