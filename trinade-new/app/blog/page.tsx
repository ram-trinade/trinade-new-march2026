'use client'

import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'

const PremiumCursor = dynamic(() => import('@/components/premium-cursor'), { ssr: false })
const SolutionsNavbar = dynamic(() => import('@/components/solutions-navbar'), { ssr: false })
const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'), { ssr: false })
const SolutionsCookiePopup = dynamic(() => import('@/components/solutions-cookie-popup'), { ssr: false })
const SolutionsFooter = dynamic(() => import('@/components/solutions-footer'), { ssr: false })

/* ─── Constants ─── */
const EASE = [0.16, 1, 0.3, 1] as const
const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const

/* ─── Reveal Wrapper ─── */
function RevealOnScroll({
  children, delay = 0, y = 20, className = '',
}: {
  children: React.ReactNode; delay?: number; y?: number; className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Gold Rule ─── */
function GoldRule({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : {}}
      transition={{ duration: 1.2, ease: EASE }}
      className={className}
      style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, #c9a86e, transparent)',
        transformOrigin: 'left',
      }}
    />
  )
}

/* ─── Gold Glass Pill ─── */
function GoldPill({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center px-4 py-1.5 text-xs tracking-[0.15em] uppercase font-semibold ${className}`}
      style={{
        background: 'linear-gradient(165deg, rgba(185,155,100,0.15) 0%, rgba(201,168,110,0.08) 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(201,168,110,0.25)',
        borderRadius: '100px',
        color: '#c9a86e',
      }}
    >
      {children}
    </span>
  )
}

/* ─── Grain Overlay ─── */
const GRAIN_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`

/* ─── Article Data ─── */
const FEATURED_ARTICLE = {
  category: 'Enterprise AI',
  title: 'The Architecture of Enterprise Intelligence',
  excerpt: 'How we designed a modular, scalable intelligence layer that adapts to the unique topology of each organization — without requiring a complete infrastructure overhaul.',
  author: 'Arjun Mehta',
  role: 'Chief Technology Officer',
  date: 'March 8, 2026',
  readTime: '12 min read',
}

const ARTICLES = [
  {
    category: 'AI Strategy',
    title: 'Beyond Automation: AI That Augments Human Decision-Making',
    excerpt: 'The most effective enterprise AI systems do not replace human judgment. They create new layers of understanding that make better decisions inevitable.',
    author: 'Priya Sharma',
    date: 'March 1, 2026',
    readTime: '8 min read',
    number: '02',
  },
  {
    category: 'Engineering',
    title: 'Edge Computing Meets Machine Learning: A New Paradigm',
    excerpt: 'Deploying inference workloads at the edge dramatically reduces latency and opens new possibilities for real-time intelligent systems in manufacturing.',
    author: 'Vikram Nair',
    date: 'February 22, 2026',
    readTime: '10 min read',
    number: '03',
  },
  {
    category: 'Responsible AI',
    title: 'Building Trust in AI: Our Approach to Responsible Innovation',
    excerpt: 'Trust is not a feature you ship. It is a design principle that must be woven into every layer of an AI system, from data governance to user experience.',
    author: 'Ananya Das',
    date: 'February 14, 2026',
    readTime: '7 min read',
    number: '04',
  },
  {
    category: 'NLP',
    title: 'The Future of Natural Language Processing in Business',
    excerpt: 'Language models are evolving from conversational toys into operational infrastructure. We explore the architectures making this possible at enterprise scale.',
    author: 'Rahul Iyer',
    date: 'February 6, 2026',
    readTime: '9 min read',
    number: '05',
  },
  {
    category: 'Data Science',
    title: 'From Data to Insight: Transforming Enterprise Analytics',
    excerpt: 'The gap between raw data and actionable insight is not technological. It is architectural. Here is how we bridge it with composable analytics pipelines.',
    author: 'Meera Kulkarni',
    date: 'January 28, 2026',
    readTime: '11 min read',
    number: '06',
  },
  {
    category: 'Research',
    title: 'Multimodal Reasoning: Teaching Systems to See, Read, and Think',
    excerpt: 'Our latest research into multimodal architectures reveals that the future of AI comprehension lies not in bigger models, but in smarter integration patterns.',
    author: 'Dr. Siddharth Rao',
    date: 'January 19, 2026',
    readTime: '14 min read',
    number: '07',
  },
]

/* ─── Marquee Row (Cream bg version) ─── */
function MarqueeRow() {
  const text = 'insights & perspectives'
  const items = Array.from({ length: 6 }, (_, i) => i)
  return (
    <div className="relative overflow-hidden py-5" style={{ borderTop: '1px solid rgba(201,168,110,0.1)', borderBottom: '1px solid rgba(201,168,110,0.1)' }}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, '-50%'] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((i) => (
          <span key={i} className="flex items-center mx-6">
            <span
              className="text-[clamp(3.5rem,9vw,8rem)] tracking-tight uppercase"
              style={{ color: 'rgba(42,34,24,0.06)', fontWeight: 700 }}
            >
              {text}
            </span>
            <span
              className="mx-8 w-2.5 h-2.5 rounded-full"
              style={{ background: 'rgba(201,168,110,0.2)' }}
            />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ─── Vertical Article Card (Editorial Long Card) ─── */
function VerticalArticleCard({
  article,
  index,
}: {
  article: typeof ARTICLES[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.08, ease: EASE }}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'none' }}
    >
      {/* Full-width horizontal divider */}
      <div
        className="w-full"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, rgba(201,168,110,0.06), rgba(201,168,110,0.12), rgba(201,168,110,0.06))',
        }}
      />

      <div
        className="relative py-10 md:py-14 px-0 md:px-6 transition-all duration-700 overflow-hidden"
        style={{
          background: hovered ? 'rgba(201,168,110,0.03)' : 'transparent',
          borderRadius: hovered ? '16px' : '0px',
        }}
      >
        {/* Hover: subtle left gold accent bar */}
        <motion.div
          className="absolute left-0 top-[15%] bottom-[15%] w-[2px]"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE_SMOOTH }}
          style={{
            background: 'linear-gradient(to bottom, transparent, #c9a86e, transparent)',
            transformOrigin: 'top',
          }}
        />

        {/* Top row: Number + Category + Date */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="flex items-center gap-5">
            <motion.span
              className="text-xs font-semibold tracking-[0.15em]"
              animate={{ color: hovered ? '#c9a86e' : 'rgba(42,34,24,0.25)' }}
              transition={{ duration: 0.4 }}
            >
              {article.number}
            </motion.span>
            <GoldPill>{article.category}</GoldPill>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-xs tracking-wide" style={{ color: 'rgba(42,34,24,0.35)' }}>
              {article.readTime}
            </span>
            <span className="text-xs" style={{ color: 'rgba(42,34,24,0.3)' }}>
              {article.date}
            </span>
          </div>
        </div>

        {/* Main content row */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-12">
          {/* Title — takes most space */}
          <div className="lg:flex-[2]">
            <motion.h3
              className="text-[clamp(1.5rem,3.2vw,2.6rem)] font-semibold leading-[1.15] tracking-tight"
              animate={{ color: hovered ? '#2a2218' : 'rgba(42,34,24,0.75)' }}
              transition={{ duration: 0.5 }}
            >
              {article.title}
            </motion.h3>
          </div>

          {/* Excerpt — right side */}
          <div className="lg:flex-[1] flex flex-col gap-5">
            <p
              className="text-[15px] leading-relaxed"
              style={{ color: 'rgba(42,34,24,0.45)' }}
            >
              {article.excerpt}
            </p>
            {/* Author */}
            <div className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{
                  background: 'linear-gradient(135deg, rgba(201,168,110,0.2), rgba(201,168,110,0.08))',
                  color: '#c9a86e',
                  border: '1px solid rgba(201,168,110,0.15)',
                }}
              >
                {article.author.split(' ').map(n => n[0]).join('')}
              </div>
              <span className="text-xs font-medium" style={{ color: 'rgba(42,34,24,0.55)' }}>
                {article.author}
              </span>
            </div>
          </div>

          {/* Arrow indicator */}
          <motion.div
            className="hidden lg:flex items-center justify-center shrink-0"
            animate={{
              x: hovered ? 6 : 0,
              opacity: hovered ? 1 : 0.2,
              scale: hovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.4, ease: EASE_SMOOTH }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M6 22L22 6M22 6H10M22 6v12" stroke="#c9a86e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>

        {/* Hover gold underline */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1.5px]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            background: 'linear-gradient(90deg, transparent, #c9a86e, transparent)',
            transformOrigin: 'left',
          }}
        />
      </div>
    </motion.article>
  )
}


/* ══════════════════════════════════════════════════════════════
   BLOG PAGE
   ══════════════════════════════════════════════════════════════ */

export default function BlogPage() {
  return (
    <>
      <style>{`
        .solutions-page, .solutions-page * { cursor: none !important; }
      `}</style>

      <div className="solutions-page relative" style={{ background: '#f2ede6' }}>
        <PremiumCursor />
        <SolutionsNavbar />

        <SmoothScroll>
          {/* ═══════════════ HERO — Cream Editorial ═══════════════ */}
          <section
            className="relative min-h-screen flex flex-col justify-between overflow-hidden"
            style={{ background: '#f2ede6' }}
          >
            {/* Atmospheric warm glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute"
                style={{
                  width: '55vw', height: '55vw', maxWidth: '850px', maxHeight: '850px',
                  top: '-10%', right: '-10%',
                  background: 'radial-gradient(ellipse, rgba(201,168,110,0.07) 0%, transparent 65%)',
                  filter: 'blur(80px)',
                }}
              />
              <div
                className="absolute"
                style={{
                  width: '40vw', height: '40vw', maxWidth: '600px', maxHeight: '600px',
                  bottom: '10%', left: '-5%',
                  background: 'radial-gradient(ellipse, rgba(185,155,100,0.05) 0%, transparent 60%)',
                  filter: 'blur(100px)',
                }}
              />
            </div>

            {/* Grain */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.035]"
              style={{ backgroundImage: GRAIN_BG, backgroundSize: '256px 256px' }}
            />

            {/* Main content — "Blog" title + description */}
            <div className="relative z-10 flex-1 flex items-center px-6 md:px-12 lg:px-20 xl:px-32 pt-32">
              <div className="max-w-[1400px] mx-auto w-full">
                {/* Two-column layout: "Blog" left, description right */}
                <div className="flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-20">
                  {/* Left: "Blog" — oversized editorial title */}
                  <div className="lg:flex-[1]">
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, ease: EASE }}
                    >
                      <span
                        className="text-xs tracking-[0.2em] uppercase font-semibold block mb-6"
                        style={{ color: '#c9a86e' }}
                      >
                        Journal
                      </span>
                      <h1
                        className="text-[clamp(5rem,14vw,12rem)] font-bold leading-[0.85] tracking-tighter"
                        style={{ color: '#2a2218' }}
                      >
                        Blog
                      </h1>
                    </motion.div>
                  </div>

                  {/* Right: Description */}
                  <div className="lg:flex-[1] pb-4">
                    <RevealOnScroll delay={0.3}>
                      <p
                        className="text-[clamp(1.1rem,2.2vw,1.6rem)] leading-[1.6] font-light"
                        style={{ color: 'rgba(42,34,24,0.55)' }}
                      >
                        Our journal explores AI strategy, product design
                        decisions, and how enterprises can build better
                        intelligent systems. Practitioner-led insights on
                        engineering craft and responsible innovation.
                      </p>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.5}>
                      <div className="mt-8 max-w-[200px]">
                        <GoldRule />
                      </div>
                    </RevealOnScroll>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrolling marquee */}
            <div className="relative z-10 mt-16">
              <MarqueeRow />
            </div>
          </section>


          {/* ═══════════════ FEATURED ARTICLE ═══════════════ */}
          <section className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-20 md:py-28" style={{ background: '#f2ede6' }}>
            {/* Grain */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{ backgroundImage: GRAIN_BG, backgroundSize: '256px 256px' }}
            />

            <div className="relative z-10 max-w-[1400px] mx-auto">
              <FeaturedCard article={FEATURED_ARTICLE} />
            </div>
          </section>


          {/* ═══════════════ ARTICLES — Vertical Editorial List ═══════════════ */}
          <section className="relative py-12 md:py-20 px-6 md:px-12 lg:px-20 xl:px-32" style={{ background: '#f2ede6' }}>
            {/* Grain */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{ backgroundImage: GRAIN_BG, backgroundSize: '256px 256px' }}
            />

            <div className="relative z-10 max-w-[1400px] mx-auto">
              {/* Section Header */}
              <RevealOnScroll>
                <div className="flex items-center gap-6 mb-4">
                  <span
                    className="text-xs tracking-[0.2em] uppercase font-semibold"
                    style={{ color: '#c9a86e' }}
                  >
                    All Articles
                  </span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(201,168,110,0.15)' }} />
                  <span className="text-xs font-medium" style={{ color: 'rgba(42,34,24,0.3)' }}>
                    {ARTICLES.length} stories
                  </span>
                </div>
              </RevealOnScroll>

              {/* Vertical article cards */}
              <div>
                {ARTICLES.map((article, i) => (
                  <VerticalArticleCard key={article.title} article={article} index={i} />
                ))}
              </div>

              {/* Final divider */}
              <div
                className="w-full"
                style={{
                  height: '1px',
                  background: 'linear-gradient(90deg, rgba(201,168,110,0.06), rgba(201,168,110,0.12), rgba(201,168,110,0.06))',
                }}
              />

              {/* Load more */}
              <RevealOnScroll delay={0.2} className="flex justify-center mt-16">
                <button
                  className="group relative px-10 py-4 text-sm font-semibold tracking-[0.12em] uppercase overflow-hidden"
                  style={{
                    borderRadius: '100px',
                    border: '1px solid rgba(201,168,110,0.25)',
                    color: '#c9a86e',
                    background: 'rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    transition: 'all 0.5s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(201,168,110,0.1)'
                    e.currentTarget.style.borderColor = 'rgba(201,168,110,0.45)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.3)'
                    e.currentTarget.style.borderColor = 'rgba(201,168,110,0.25)'
                  }}
                >
                  Load More Articles
                </button>
              </RevealOnScroll>
            </div>
          </section>


          {/* ═══════════════ OUR THINKING — Premium CTA (replaces Newsletter) ═══════════════ */}
          <section
            className="relative py-32 overflow-hidden"
            style={{ background: '#0a0a0a' }}
          >
            {/* Atmospheric orbs */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute"
                style={{
                  width: '50vw', height: '50vw', maxWidth: '800px', maxHeight: '800px',
                  top: '-20%', left: '20%',
                  background: 'radial-gradient(ellipse, rgba(201,168,110,0.05) 0%, transparent 70%)',
                  filter: 'blur(100px)',
                }}
              />
            </div>

            {/* Grain */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{ backgroundImage: GRAIN_BG, backgroundSize: '256px 256px' }}
            />

            <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-32 max-w-[1400px] mx-auto text-center">
              <RevealOnScroll>
                <span
                  className="text-xs tracking-[0.25em] uppercase font-semibold block mb-8"
                  style={{ color: '#c9a86e' }}
                >
                  Our Thinking
                </span>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <h2
                  className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold tracking-tight leading-[1.05] mb-8 max-w-4xl mx-auto"
                  style={{ color: 'rgba(255,255,255,0.93)' }}
                >
                  We believe the best AI systems
                  are built with <span style={{ color: '#c9a86e' }}>craft</span>,
                  not just code.
                </h2>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <p
                  className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  Every article is written by the people who build our products.
                  No ghostwriters. No hype. Just honest engineering insights
                  from the teams shaping enterprise intelligence.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.3}>
                <div className="max-w-xs mx-auto mb-16">
                  <GoldRule />
                </div>
              </RevealOnScroll>

              {/* Stats row */}
              <RevealOnScroll delay={0.4}>
                <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
                  {[
                    { value: '24+', label: 'Published Articles' },
                    { value: '8', label: 'Contributing Authors' },
                    { value: '12k+', label: 'Monthly Readers' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div
                        className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight mb-2"
                        style={{ color: '#c9a86e' }}
                      >
                        {stat.value}
                      </div>
                      <div
                        className="text-xs tracking-[0.12em] uppercase font-medium"
                        style={{ color: 'rgba(255,255,255,0.3)' }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </RevealOnScroll>
            </div>
          </section>

          {/* ═══════════════ TOPICS ═══════════════ */}
          <section className="relative py-24 px-6 md:px-12 lg:px-20 xl:px-32" style={{ background: '#f2ede6' }}>
            <div className="max-w-[1400px] mx-auto">
              <RevealOnScroll>
                <div className="flex items-center gap-4 mb-12">
                  <span className="text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: '#c9a86e' }}>
                    Explore Topics
                  </span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(201,168,110,0.15)' }} />
                </div>
              </RevealOnScroll>

              <div className="flex flex-wrap gap-4">
                {[
                  'Artificial Intelligence', 'Machine Learning', 'Enterprise Architecture',
                  'Innovation', 'Technology', 'Engineering', 'Research',
                  'Natural Language Processing', 'Computer Vision', 'Data Governance',
                  'Edge Computing', 'Responsible AI',
                ].map((tag, i) => (
                  <RevealOnScroll key={tag} delay={i * 0.04}>
                    <a
                      href="#"
                      className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-wide"
                      style={{
                        borderRadius: '100px',
                        background: 'linear-gradient(165deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 100%)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(201,168,110,0.1)',
                        color: 'rgba(42,34,24,0.6)',
                        transition: 'all 0.4s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(201,168,110,0.35)'
                        e.currentTarget.style.color = '#c9a86e'
                        e.currentTarget.style.background = 'linear-gradient(165deg, rgba(185,155,100,0.12) 0%, rgba(201,168,110,0.05) 100%)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(201,168,110,0.1)'
                        e.currentTarget.style.color = 'rgba(42,34,24,0.6)'
                        e.currentTarget.style.background = 'linear-gradient(165deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 100%)'
                      }}
                    >
                      {tag}
                      <svg
                        width="12" height="12" viewBox="0 0 12 12" fill="none"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </section>

          <SolutionsFooter />
        </SmoothScroll>

        <SolutionsCookiePopup />
      </div>
    </>
  )
}


/* ─── Featured Article Card — Cream bg version ─── */
function FeaturedCard({ article }: { article: typeof FEATURED_ARTICLE }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: EASE }}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Label */}
      <div className="flex items-center gap-4 mb-10">
        <span className="text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: '#c9a86e' }}>
          01 — Featured
        </span>
        <div className="flex-1 h-px" style={{ background: 'rgba(201,168,110,0.15)' }} />
      </div>

      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: '24px',
          border: '1px solid rgba(201,168,110,0.1)',
          transition: 'border-color 0.6s ease, box-shadow 0.6s ease',
          borderColor: hovered ? 'rgba(201,168,110,0.3)' : 'rgba(201,168,110,0.1)',
          boxShadow: hovered
            ? '0 32px 80px rgba(42,34,24,0.08), 0 0 0 1px rgba(201,168,110,0.08)'
            : '0 8px 40px rgba(42,34,24,0.03)',
        }}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Image side — warm editorial gradient */}
          <div className="relative lg:w-[55%] overflow-hidden" style={{ minHeight: '380px' }}>
            <motion.div
              className="absolute inset-0"
              animate={{ scale: hovered ? 1.04 : 1 }}
              transition={{ duration: 0.8, ease: EASE_SMOOTH }}
              style={{
                background: 'linear-gradient(135deg, #2a1f14 0%, #1a1510 25%, #2d2218 50%, #1f1a12 75%, #0f0d09 100%)',
              }}
            />
            {/* Mesh accent */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 60% 40%, rgba(201,168,110,0.12) 0%, transparent 60%)',
              }}
            />
            {/* Grain */}
            <div
              className="absolute inset-0 opacity-25"
              style={{ backgroundImage: GRAIN_BG, backgroundSize: '128px 128px' }}
            />
            {/* Category pill */}
            <div className="absolute top-6 left-6 z-10">
              <GoldPill>{article.category}</GoldPill>
            </div>
            {/* Decorative line */}
            <div
              className="absolute bottom-8 left-8 right-8"
              style={{
                height: '1px',
                background: 'linear-gradient(90deg, rgba(201,168,110,0.25), transparent)',
              }}
            />
          </div>

          {/* Content side — light glass */}
          <div
            className="lg:w-[45%] p-8 md:p-10 lg:p-12 flex flex-col justify-center"
            style={{
              background: 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <span
              className="text-xs tracking-[0.15em] uppercase font-medium mb-6"
              style={{ color: 'rgba(42,34,24,0.4)' }}
            >
              {article.readTime}
            </span>

            <h2
              className="text-2xl md:text-3xl lg:text-[2.2rem] font-bold tracking-tight leading-[1.15] mb-5"
              style={{ color: '#2a2218' }}
            >
              {article.title}
            </h2>

            <p
              className="text-sm md:text-base leading-relaxed mb-8"
              style={{ color: 'rgba(42,34,24,0.5)' }}
            >
              {article.excerpt}
            </p>

            <div
              className="flex items-center gap-4 pt-6"
              style={{ borderTop: '1px solid rgba(201,168,110,0.12)' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  background: 'linear-gradient(135deg, rgba(201,168,110,0.2), rgba(201,168,110,0.08))',
                  color: '#c9a86e',
                  border: '1px solid rgba(201,168,110,0.2)',
                }}
              >
                {article.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#2a2218' }}>
                  {article.author}
                </p>
                <p className="text-xs" style={{ color: 'rgba(42,34,24,0.4)' }}>
                  {article.role} &middot; {article.date}
                </p>
              </div>
              <motion.div
                className="ml-auto"
                animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.4 }}
                transition={{ duration: 0.3 }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 16L16 4M16 4H8M16 4v8" stroke="#c9a86e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
