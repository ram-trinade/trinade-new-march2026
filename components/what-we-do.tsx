'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const capabilities = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="rgba(200,230,78,0.6)" strokeWidth="1.2" />
        <circle cx="14" cy="14" r="5" stroke="rgba(200,230,78,0.4)" strokeWidth="1" />
        <circle cx="14" cy="14" r="1.5" fill="rgba(200,230,78,0.8)" />
        <line x1="14" y1="4" x2="14" y2="8" stroke="rgba(200,230,78,0.3)" strokeWidth="0.8" />
        <line x1="14" y1="20" x2="14" y2="24" stroke="rgba(200,230,78,0.3)" strokeWidth="0.8" />
        <line x1="4" y1="14" x2="8" y2="14" stroke="rgba(200,230,78,0.3)" strokeWidth="0.8" />
        <line x1="20" y1="14" x2="24" y2="14" stroke="rgba(200,230,78,0.3)" strokeWidth="0.8" />
      </svg>
    ),
    title: 'AI-Native Products',
    description:
      'Purpose-built intelligence woven into every layer. Not bolted on — engineered from the ground up to think, learn, and adapt.',
    accent: 'rgba(200,230,78,0.08)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20L10 14L16 18L24 8" stroke="rgba(0,212,170,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="14" r="2" stroke="rgba(0,212,170,0.4)" strokeWidth="0.8" fill="rgba(0,212,170,0.1)" />
        <circle cx="16" cy="18" r="2" stroke="rgba(0,212,170,0.4)" strokeWidth="0.8" fill="rgba(0,212,170,0.1)" />
        <circle cx="24" cy="8" r="2" stroke="rgba(0,212,170,0.4)" strokeWidth="0.8" fill="rgba(0,212,170,0.1)" />
        <circle cx="4" cy="20" r="2" stroke="rgba(0,212,170,0.4)" strokeWidth="0.8" fill="rgba(0,212,170,0.1)" />
      </svg>
    ),
    title: 'Enterprise Intelligence',
    description:
      'Scalable AI solutions that integrate with existing workflows — transforming raw data into strategic clarity for decision-makers.',
    accent: 'rgba(0,212,170,0.08)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="8" height="8" rx="2" stroke="rgba(180,130,55,0.6)" strokeWidth="1.2" />
        <rect x="16" y="4" width="8" height="8" rx="2" stroke="rgba(180,130,55,0.6)" strokeWidth="1.2" />
        <rect x="4" y="16" width="8" height="8" rx="2" stroke="rgba(180,130,55,0.6)" strokeWidth="1.2" />
        <rect x="16" y="16" width="8" height="8" rx="2" stroke="rgba(180,130,55,0.6)" strokeWidth="1.2" />
        <line x1="12" y1="8" x2="16" y2="8" stroke="rgba(180,130,55,0.3)" strokeWidth="0.8" />
        <line x1="8" y1="12" x2="8" y2="16" stroke="rgba(180,130,55,0.3)" strokeWidth="0.8" />
        <line x1="20" y1="12" x2="20" y2="16" stroke="rgba(180,130,55,0.3)" strokeWidth="0.8" />
        <line x1="12" y1="20" x2="16" y2="20" stroke="rgba(180,130,55,0.3)" strokeWidth="0.8" />
      </svg>
    ),
    title: 'Modular Architecture',
    description:
      'Composable building blocks that snap together. Deploy the full stack or just the pieces you need — zero vendor lock-in.',
    accent: 'rgba(180,130,55,0.08)',
  },
]

function CapabilityCard({
  item,
  index,
  isInView,
}: {
  item: (typeof capabilities)[0]
  index: number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.7,
        delay: 0.2 + index * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group relative rounded-2xl border border-black/[0.06] bg-black/[0.02] p-8 transition-all duration-500 hover:border-black/[0.10] hover:bg-black/[0.04]"
    >
      {/* Subtle hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 20%, ${item.accent}, transparent 70%)` }}
      />

      <div className="relative">
        <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black/[0.04] border border-black/[0.06]">
          {item.icon}
        </div>

        <h3
          className="text-[22px] font-semibold text-[#1a1f1a]/95 mb-3 tracking-[-0.01em]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {item.title}
        </h3>

        <p className="text-[16px] leading-[1.7] text-[#1a1f1a]/55 font-light">
          {item.description}
        </p>

        {/* Learn more link */}
        <div className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#1a1f1a]/30 transition-colors duration-300 group-hover:text-[#1a1f1a]/60">
          <span>Learn more</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

export default function WhatWeDo() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-32">
      <div className="px-[calc(12.5vw+0.8rem)]">
        {/* Section header */}
        <div className="mb-20">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase text-[#00d4aa] mb-6"
          >
            <span>&#10022;</span>
            What We Do
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[clamp(2.4rem,4.5vw,4.2rem)] font-light leading-[1.12] tracking-[-0.025em] max-w-[42ch]"
          >
            <span className="text-[#1a1f1a]/95">Technology that thinks ahead</span>
            <span className="text-[#1a1f1a]/35">{' '}— so your teams can focus on what matters most.</span>
          </motion.h2>
        </div>

        {/* Capability cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((item, i) => (
            <CapabilityCard key={item.title} item={item} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
