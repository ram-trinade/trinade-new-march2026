'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const testimonials = [
  {
    quote:
      'Trinade transformed our data pipeline from a bottleneck into a competitive advantage. The platform practically runs itself.',
    name: 'Sarah Chen',
    title: 'VP Engineering',
    company: 'Meridian Health',
    avatar: 'SC',
  },
  {
    quote:
      'We evaluated six platforms before choosing Trinade. Nothing else came close in terms of speed, reliability, and developer experience.',
    name: 'Marcus Rivera',
    title: 'CTO',
    company: 'Novus Financial',
    avatar: 'MR',
  },
  {
    quote:
      'The API is beautifully designed. Our team was productive within hours, not weeks. That kind of DX is rare.',
    name: 'Aisha Patel',
    title: 'Lead Architect',
    company: 'Arclight Systems',
    avatar: 'AP',
  },
]

function TestimonialCard({
  item,
  index,
  isInView,
}: {
  item: (typeof testimonials)[0]
  index: number
  isInView: boolean
}) {
  const accentColors = ['#c8e64e', '#00d4aa', '#b48237']
  const accent = accentColors[index % accentColors.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group relative rounded-2xl border border-black/[0.06] bg-black/[0.02] p-8 transition-all duration-500 hover:border-black/[0.10] hover:bg-black/[0.035]"
    >
      {/* Quote mark */}
      <svg
        width="32"
        height="24"
        viewBox="0 0 32 24"
        fill="none"
        className="mb-6 opacity-20"
      >
        <path
          d="M0 14.4C0 6.4 4.8 1.2 12.8 0L14 2.8C9.2 4.4 7.2 7.2 6.8 10.4H12V24H0V14.4ZM18 14.4C18 6.4 22.8 1.2 30.8 0L32 2.8C27.2 4.4 25.2 7.2 24.8 10.4H30V24H18V14.4Z"
          fill={accent}
        />
      </svg>

      {/* Quote text */}
      <p className="text-[16px] leading-[1.75] text-[#1a1f1a]/60 font-light mb-8">
        {item.quote}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold"
          style={{
            background: `${accent}15`,
            color: `${accent}aa`,
            border: `1px solid ${accent}25`,
          }}
        >
          {item.avatar}
        </div>
        <div>
          <p className="text-[14px] font-medium text-[#1a1f1a]/80">{item.name}</p>
          <p className="text-[13px] text-[#1a1f1a]/40">
            {item.title}, {item.company}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-32">
      <div className="px-[calc(12.5vw+0.8rem)]">
        {/* Section header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase text-[#b48237] mb-6"
          >
            <span>&#10022;</span>
            Testimonials
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(2rem,4vw,3.8rem)] font-light leading-[1.12] tracking-[-0.025em] max-w-[36ch]"
          >
            <span className="text-[#1a1f1a]/95">Trusted by builders</span>
            <span className="text-[#1a1f1a]/35">{' '}who ship at scale.</span>
          </motion.h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <TestimonialCard key={item.name} item={item} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
