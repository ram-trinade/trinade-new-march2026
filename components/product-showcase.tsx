'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const products = [
  {
    tag: 'Platform',
    title: 'Trinade Core',
    description: 'The foundation layer. A unified AI platform that orchestrates models, data pipelines, and deployment — all from one control plane.',
    features: ['Model Orchestration', 'Auto-scaling', 'Real-time Monitoring', 'Multi-cloud'],
    gradient: 'from-[#0a2a1a] via-[#164a32] to-[#0d1f18]',
    accent: '#c8e64e',
    span: 'md:col-span-2',
    height: 'min-h-[380px]',
    visual: (
      <div className="absolute top-8 right-8 w-[260px] h-[200px] opacity-[0.12]">
        <svg viewBox="0 0 260 200" fill="none" className="w-full h-full">
          {/* Abstract dashboard wireframe */}
          <rect x="10" y="10" width="240" height="24" rx="4" stroke="rgba(200,230,78,0.5)" strokeWidth="0.8" />
          <rect x="10" y="48" width="115" height="140" rx="6" stroke="rgba(200,230,78,0.4)" strokeWidth="0.8" />
          <rect x="135" y="48" width="115" height="65" rx="6" stroke="rgba(200,230,78,0.4)" strokeWidth="0.8" />
          <rect x="135" y="123" width="115" height="65" rx="6" stroke="rgba(200,230,78,0.4)" strokeWidth="0.8" />
          {/* Bar chart inside left panel */}
          <rect x="24" y="120" width="12" height="52" rx="2" fill="rgba(200,230,78,0.25)" />
          <rect x="42" y="100" width="12" height="72" rx="2" fill="rgba(200,230,78,0.35)" />
          <rect x="60" y="130" width="12" height="42" rx="2" fill="rgba(200,230,78,0.2)" />
          <rect x="78" y="85" width="12" height="87" rx="2" fill="rgba(200,230,78,0.3)" />
          <rect x="96" y="110" width="12" height="62" rx="2" fill="rgba(200,230,78,0.28)" />
          {/* Circles in right panels */}
          <circle cx="192" cy="80" r="18" stroke="rgba(200,230,78,0.3)" strokeWidth="0.8" />
          <circle cx="192" cy="80" r="10" stroke="rgba(200,230,78,0.2)" strokeWidth="0.6" />
          <path d="M152 155 L172 145 L192 152 L212 140 L232 148" stroke="rgba(200,230,78,0.4)" strokeWidth="0.8" fill="none" />
        </svg>
      </div>
    ),
  },
  {
    tag: 'Analytics',
    title: 'Insight Engine',
    description: 'Real-time analytics that surface patterns humans miss. From anomaly detection to predictive forecasting.',
    features: ['Predictive Models', 'Anomaly Detection', 'Custom Dashboards'],
    gradient: 'from-[#0a1a2a] via-[#163250] to-[#0d1825]',
    accent: '#00d4aa',
    span: 'md:col-span-1',
    height: 'min-h-[380px]',
    visual: (
      <div className="absolute bottom-8 right-8 w-[140px] h-[140px] opacity-[0.15]">
        <svg viewBox="0 0 140 140" fill="none" className="w-full h-full">
          <circle cx="70" cy="70" r="55" stroke="rgba(0,212,170,0.4)" strokeWidth="0.8" />
          <circle cx="70" cy="70" r="38" stroke="rgba(0,212,170,0.3)" strokeWidth="0.6" />
          <circle cx="70" cy="70" r="20" stroke="rgba(0,212,170,0.5)" strokeWidth="0.8" />
          <circle cx="70" cy="70" r="4" fill="rgba(0,212,170,0.6)" />
          <line x1="70" y1="15" x2="70" y2="32" stroke="rgba(0,212,170,0.2)" strokeWidth="0.6" />
          <line x1="70" y1="108" x2="70" y2="125" stroke="rgba(0,212,170,0.2)" strokeWidth="0.6" />
          <line x1="15" y1="70" x2="32" y2="70" stroke="rgba(0,212,170,0.2)" strokeWidth="0.6" />
          <line x1="108" y1="70" x2="125" y2="70" stroke="rgba(0,212,170,0.2)" strokeWidth="0.6" />
        </svg>
      </div>
    ),
  },
  {
    tag: 'Integration',
    title: 'Connect API',
    description: 'One API to bridge your entire stack. Plug into any data source, any model, any downstream system.',
    features: ['REST & GraphQL', '200+ Connectors', 'Webhook Events'],
    gradient: 'from-[#1a1a0a] via-[#2a2a14] to-[#1a180d]',
    accent: '#b48237',
    span: 'md:col-span-1',
    height: 'min-h-[380px]',
    visual: (
      <div className="absolute bottom-8 right-8 w-[140px] h-[140px] opacity-[0.15]">
        <svg viewBox="0 0 140 140" fill="none" className="w-full h-full">
          {/* Node graph */}
          <circle cx="70" cy="30" r="10" stroke="rgba(180,130,55,0.5)" strokeWidth="0.8" />
          <circle cx="30" cy="80" r="10" stroke="rgba(180,130,55,0.5)" strokeWidth="0.8" />
          <circle cx="110" cy="80" r="10" stroke="rgba(180,130,55,0.5)" strokeWidth="0.8" />
          <circle cx="70" cy="110" r="10" stroke="rgba(180,130,55,0.5)" strokeWidth="0.8" />
          <line x1="70" y1="40" x2="35" y2="72" stroke="rgba(180,130,55,0.3)" strokeWidth="0.8" />
          <line x1="70" y1="40" x2="105" y2="72" stroke="rgba(180,130,55,0.3)" strokeWidth="0.8" />
          <line x1="35" y1="88" x2="62" y2="105" stroke="rgba(180,130,55,0.3)" strokeWidth="0.8" />
          <line x1="105" y1="88" x2="78" y2="105" stroke="rgba(180,130,55,0.3)" strokeWidth="0.8" />
          <circle cx="70" cy="30" r="3" fill="rgba(180,130,55,0.5)" />
          <circle cx="30" cy="80" r="3" fill="rgba(180,130,55,0.5)" />
          <circle cx="110" cy="80" r="3" fill="rgba(180,130,55,0.5)" />
          <circle cx="70" cy="110" r="3" fill="rgba(180,130,55,0.5)" />
        </svg>
      </div>
    ),
  },
  {
    tag: 'Security',
    title: 'Shield',
    description: 'Enterprise-grade security layer. SOC2 compliant, zero-trust architecture, end-to-end encryption at rest and in transit.',
    features: ['SOC2 Type II', 'Zero-Trust', 'E2E Encryption', 'Audit Logs'],
    gradient: 'from-[#0e1a0e] via-[#1a3a28] to-[#0a1a12]',
    accent: '#00d4aa',
    span: 'md:col-span-2',
    height: 'min-h-[380px]',
    visual: (
      <div className="absolute top-8 right-8 w-[200px] h-[160px] opacity-[0.12]">
        <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
          {/* Shield shape */}
          <path d="M100 10 L170 40 L170 90 Q170 140 100 155 Q30 140 30 90 L30 40 Z" stroke="rgba(0,212,170,0.4)" strokeWidth="1" fill="none" />
          <path d="M100 30 L150 52 L150 88 Q150 124 100 136 Q50 124 50 88 L50 52 Z" stroke="rgba(0,212,170,0.25)" strokeWidth="0.8" fill="none" />
          {/* Checkmark */}
          <path d="M78 82 L95 99 L125 65" stroke="rgba(0,212,170,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
    ),
  },
]

function ProductCard({
  product,
  index,
  isInView,
}: {
  product: (typeof products)[0]
  index: number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br ${product.gradient} ${product.span} ${product.height} p-8 transition-all duration-500 hover:border-white/[0.12]`}
    >
      {/* Background visual */}
      {product.visual}

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, ${product.accent}08, transparent 60%)`,
        }}
      />

      <div className="relative flex flex-col h-full">
        {/* Tag */}
        <span
          className="inline-flex self-start items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.08em] uppercase mb-6"
          style={{
            background: `${product.accent}12`,
            color: `${product.accent}cc`,
            border: `1px solid ${product.accent}20`,
          }}
        >
          {product.tag}
        </span>

        {/* Title */}
        <h3
          className="text-[clamp(1.5rem,2.5vw,2.2rem)] font-semibold text-white/95 tracking-[-0.02em] mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-[15px] leading-[1.7] text-white/45 font-light max-w-[480px] mb-auto">
          {product.description}
        </p>

        {/* Feature tags */}
        <div className="flex flex-wrap gap-2 mt-8">
          {product.features.map((f) => (
            <span
              key={f}
              className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-white/35 bg-white/[0.04] border border-white/[0.05]"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function ProductShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-32 bg-[#060e09]">
      <div className="px-[calc(12.5vw+0.8rem)]">
        {/* Section header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase text-[#c8e64e] mb-6"
          >
            <span>&#10022;</span>
            Products
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[clamp(2rem,4vw,3.8rem)] font-light leading-[1.12] tracking-[-0.025em] max-w-[36ch]"
          >
            <span className="text-white/95">Everything you need</span>
            <span className="text-white/35">{' '}— nothing you don&apos;t.</span>
          </motion.h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {products.map((product, i) => (
            <ProductCard key={product.title} product={product} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
