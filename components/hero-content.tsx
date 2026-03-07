'use client'

import { motion } from 'motion/react'

const headlineLines = [
  'Built for What\'s Next.',
]

export default function HeroContent() {
  return (
    <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-16 pb-32 text-center">
      {/* Hero Headline — centered */}
      <div>
        <h1 className="hero-headline">
          {headlineLines.map((line, lineIdx) => (
            <span key={lineIdx} className="block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{
                  duration: 1.0,
                  delay: 0.6 + lineIdx * 0.15,
                  ease: [0.25, 0.0, 0.15, 1],
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
      </div>

      {/* Sub headline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          delay: 1.2,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="mt-6 max-w-[600px] text-[16px] leading-[1.7] font-light tracking-[0.01em] text-white/55 lg:text-[18px]"
      >
        From intelligent products to enterprise services — engineered
        thoughtfully, delivered confidently, everywhere it ships.
      </motion.p>

      {/* Book a Demo CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1.6,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="mt-10"
      >
        <a
          href="#solutions"
          className="group relative inline-flex items-center gap-3 rounded-full bg-white/[0.08] px-8 py-4 text-[14px] font-medium tracking-[0.04em] text-white backdrop-blur-sm border border-white/[0.12] transition-all duration-400 hover:bg-white/[0.14] hover:border-white/[0.22] hover:shadow-[0_0_40px_rgba(200,230,78,0.08)]"
        >
          <span>Explore Solutions</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </motion.div>
    </div>
  )
}
