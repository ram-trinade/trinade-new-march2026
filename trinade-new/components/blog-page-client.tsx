'use client'

import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

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

/* ─── Marquee Row ─── */
function MarqueeRow() {
  const text = 'Trinade Blog Post'
  const items = Array.from({ length: 6 }, (_, i) => i)
  return (
    <div className="relative overflow-hidden py-5" style={{ borderTop: '1px solid rgba(201,168,110,0.1)', borderBottom: '1px solid rgba(201,168,110,0.1)' }}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, '-50%'] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((i) => (
          <span key={i} className="flex items-center">
            <span
              className="text-[clamp(3.5rem,9vw,8rem)] tracking-tight uppercase"
              style={{ color: 'rgba(42,34,24,0.06)', fontWeight: 700 }}
            >
              {text}
            </span>
            <span
              className="w-3.5 h-3.5 rounded-full shrink-0 mx-[clamp(1.5rem,3vw,3rem)]"
              style={{ background: 'rgba(201,168,110,0.25)' }}
            />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

import { ARTICLES, FEATURED_ARTICLE } from '@/data/articles'


/* ═══════════════════════════════════════════════════════════════
   VERTICAL ARTICLE CARD — Image top, info bottom, 3-col grid
   ═══════════════════════════════════════════════════════════════ */
function ArticleCard({
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
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: (index % 3) * 0.12, ease: EASE }}
      className="group relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/blog/${article.slug}`} className="block flex-1 flex flex-col">
        <div
          className="relative overflow-hidden transition-all duration-700 flex-1 flex flex-col"
          style={{
            borderRadius: '20px',
            border: '1px solid rgba(201,168,110,0.1)',
            boxShadow: hovered
              ? '0 24px 64px rgba(42,34,24,0.1), 0 8px 24px rgba(42,34,24,0.05)'
              : '0 2px 16px rgba(42,34,24,0.03)',
            background: 'rgba(255,255,255,0.35)',
          }}
        >
          {/* ── TOP: Image ── */}
          <div className="relative overflow-hidden" style={{ height: 'clamp(220px, 22vw, 300px)' }}>
            <motion.div
              className="absolute inset-0"
              animate={{ scale: hovered ? 1.06 : 1 }}
              transition={{ duration: 1.4, ease: EASE_SMOOTH }}
            >
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </motion.div>

            {/* Grain on image */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.12]"
              style={{ backgroundImage: GRAIN_BG, backgroundSize: '128px 128px', mixBlendMode: 'overlay' }}
            />

            {/* Bottom fade for smooth transition to info */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.15) 0%, transparent 40%)' }}
            />

            {/* Big number — overlaid on image */}
            <motion.span
              className="absolute bottom-3 right-4 tabular-nums leading-none select-none pointer-events-none"
              style={{
                fontSize: 'clamp(3rem, 5vw, 5rem)',
                fontWeight: 200,
                letterSpacing: '-0.04em',
                color: 'rgba(255,255,255,0.35)',
                textShadow: '0 2px 16px rgba(0,0,0,0.3)',
              }}
              animate={{ opacity: hovered ? 0.6 : 0.35 }}
              transition={{ duration: 0.5 }}
            >
              {article.number}
            </motion.span>
          </div>

          {/* ── BOTTOM: Article Info ── */}
          <div className="flex flex-col flex-1 justify-between p-6 md:p-7 relative">
            <div>
              {/* Title */}
              <motion.h3
                className="text-[clamp(1.1rem,1.8vw,1.45rem)] font-medium leading-[1.2] tracking-tight mb-3"
                animate={{ color: hovered ? '#2a2218' : 'rgba(42,34,24,0.75)' }}
                transition={{ duration: 0.5 }}
              >
                {article.title}
              </motion.h3>

              {/* Excerpt — 2 lines max */}
              <p
                className="text-[13px] leading-[1.75] mb-5"
                style={{
                  color: 'rgba(42,34,24,0.4)',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {article.excerpt}
              </p>
            </div>

            {/* Bottom: Date + "Read Article" arrow */}
            <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: '1px solid rgba(201,168,110,0.08)' }}>
              <span className="text-[11px] tracking-wide" style={{ color: 'rgba(42,34,24,0.35)' }}>
                {article.date}
              </span>

              {/* "Read Article" + arrow */}
              <motion.div
                className="flex items-center gap-2"
                animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.3 }}
                transition={{ duration: 0.5, ease: EASE_SMOOTH }}
              >
                <span className="text-[10px] tracking-[0.15em] uppercase font-semibold" style={{ color: '#c9a86e' }}>
                  Read Article
                </span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M5 19L19 5M19 5H9M19 5v10" stroke="#c9a86e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}


/* ═══════════════════════════════════════════════════════════════
   FEATURED CARD — Split layout: image LEFT + info RIGHT
   ═══════════════════════════════════════════════════════════════ */
function FeaturedCard({ article }: { article: typeof FEATURED_ARTICLE }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: EASE }}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-5 mb-12">
        <span className="text-[11px] tracking-[0.25em] uppercase font-semibold" style={{ color: '#c9a86e' }}>
          Featured Story
        </span>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
          className="flex-1 h-px"
          style={{ background: 'linear-gradient(90deg, rgba(201,168,110,0.25), rgba(201,168,110,0.06))', transformOrigin: 'left' }}
        />
        <span className="text-[11px] tracking-[0.15em] uppercase font-medium" style={{ color: 'rgba(42,34,24,0.3)' }}>01</span>
      </div>

      <Link href="/blog" className="block">
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: '24px',
            transition: 'box-shadow 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: hovered
              ? '0 48px 100px rgba(42,34,24,0.12), 0 24px 48px rgba(42,34,24,0.06)'
              : '0 8px 40px rgba(42,34,24,0.04)',
            background: 'rgba(255,255,255,0.35)',
            border: '1px solid rgba(201,168,110,0.1)',
          }}
        >
          <div className="flex flex-col lg:flex-row" style={{ minHeight: 'clamp(400px, 50vh, 580px)' }}>
            {/* ── LEFT: Image Column ── */}
            <div className="relative lg:w-[38%] overflow-hidden" style={{ minHeight: 'clamp(280px, 35vw, 420px)' }}>
              <motion.div
                className="absolute inset-0"
                animate={{ scale: hovered ? 1.04 : 1 }}
                transition={{ duration: 1.2, ease: EASE_SMOOTH }}
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  priority
                />
              </motion.div>

              {/* Grain */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: GRAIN_BG, backgroundSize: '128px 128px', mixBlendMode: 'overlay' }}
              />

              {/* Edge fade toward info side */}
              <div
                className="absolute inset-0 pointer-events-none hidden lg:block"
                style={{ background: 'linear-gradient(90deg, transparent 60%, rgba(255,255,255,0.08) 100%)' }}
              />

              {/* Big 01 number */}
              <motion.span
                className="absolute bottom-6 left-6 tabular-nums leading-none select-none pointer-events-none"
                style={{
                  fontSize: 'clamp(5rem, 10vw, 9rem)',
                  fontWeight: 200,
                  letterSpacing: '-0.04em',
                  color: 'rgba(255,255,255,0.3)',
                  textShadow: '0 2px 24px rgba(0,0,0,0.25)',
                }}
                animate={{ opacity: hovered ? 0.55 : 0.3 }}
                transition={{ duration: 0.5 }}
              >
                01
              </motion.span>
            </div>

            {/* ── RIGHT: Article Info Column ── */}
            <div className="lg:w-[62%] flex flex-col justify-between p-8 md:p-10 lg:p-14">
              <div>
                <motion.h2
                  className="text-[clamp(1.8rem,3.5vw,3rem)] font-light tracking-tight leading-[1.1] mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: 0.5, ease: EASE }}
                  style={{ color: '#2a2218' }}
                >
                  {article.title}
                </motion.h2>

                <motion.p
                  className="text-[15px] leading-[1.8] mb-8"
                  initial={{ opacity: 0, y: 14 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
                  style={{ color: 'rgba(42,34,24,0.45)' }}
                >
                  {article.excerpt}
                </motion.p>
              </div>

              <motion.div
                className="flex items-center justify-between pt-6"
                style={{ borderTop: '1px solid rgba(201,168,110,0.1)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
              >
                <span className="text-[11px] tracking-wide" style={{ color: 'rgba(42,34,24,0.35)' }}>
                  {article.date}
                </span>

                <motion.div
                  className="hidden md:flex items-center gap-3"
                  animate={{ x: hovered ? 6 : 0, opacity: hovered ? 1 : 0.3 }}
                  transition={{ duration: 0.5, ease: EASE_SMOOTH }}
                >
                  <span className="text-[11px] tracking-[0.15em] uppercase font-semibold" style={{ color: '#c9a86e' }}>
                    Read Article
                  </span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 19L19 5M19 5H9M19 5v10" stroke="#c9a86e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}


/* ══════════════════════════════════════════════════════════════
   BLOG PAGE — Photo + Info Split Cards (V2 Design)
   ══════════════════════════════════════════════════════════════ */

export default function BlogPageClient() {
  return (
    <>
      <style>{`
        .solutions-page, .solutions-page * { cursor: none !important; }
      `}</style>

      <div className="solutions-page relative" style={{ background: '#f2ede6' }}>
        <PremiumCursor />
        <SolutionsNavbar />

        <SmoothScroll>
          {/* ═══════════════ HERO ═══════════════ */}
          <section
            className="relative min-h-screen flex flex-col justify-between overflow-hidden"
            style={{ background: '#f2ede6' }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute" style={{
                width: '55vw', height: '55vw', maxWidth: '850px', maxHeight: '850px',
                top: '-10%', right: '-10%',
                background: 'radial-gradient(ellipse, rgba(201,168,110,0.07) 0%, transparent 65%)',
                filter: 'blur(80px)',
              }} />
              <div className="absolute" style={{
                width: '40vw', height: '40vw', maxWidth: '600px', maxHeight: '600px',
                bottom: '10%', left: '-5%',
                background: 'radial-gradient(ellipse, rgba(185,155,100,0.05) 0%, transparent 60%)',
                filter: 'blur(100px)',
              }} />
            </div>

            <div
              className="absolute inset-0 pointer-events-none opacity-[0.035]"
              style={{ backgroundImage: GRAIN_BG, backgroundSize: '256px 256px' }}
            />

            <div className="relative z-10 flex-1 flex items-center px-[clamp(1.5rem,5vw,8rem)] pt-[clamp(5rem,10vh,8rem)]">
              <div className="max-w-[1400px] mx-auto w-full">
                <div className="flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-20">
                  <div className="lg:flex-[1]">
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, ease: EASE }}
                    >
                      <span className="text-xs tracking-[0.2em] uppercase font-semibold block mb-6" style={{ color: '#c9a86e' }}>
                        Journal
                      </span>
                      <h1
                        className="text-[clamp(3.5rem,10vw,12rem)] font-bold leading-[0.85] tracking-tighter"
                        style={{ color: '#2a2218' }}
                      >
                        Blog
                      </h1>
                    </motion.div>
                  </div>

                  <div className="lg:flex-[1] pb-4">
                    <RevealOnScroll delay={0.3}>
                      <p
                        className="text-[clamp(1.1rem,2.2vw,1.6rem)] leading-[1.6] font-light"
                        style={{ color: 'rgba(42,34,24,0.55)' }}
                      >
                        Perspectives from Trinade — an AI-first company
                        building intelligent solutions across healthcare,
                        legal, finance, manufacturing, and beyond.
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

            <div className="relative z-10 mt-16">
              <MarqueeRow />
            </div>
          </section>


          {/* ═══════════════ FEATURED ARTICLE ═══════════════ */}
          <section className="relative px-[clamp(1.5rem,5vw,8rem)] py-[clamp(4rem,6vh,7rem)]" style={{ background: '#f2ede6' }}>
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{ backgroundImage: GRAIN_BG, backgroundSize: '256px 256px' }}
            />
            <div className="relative z-10 max-w-[1400px] mx-auto">
              <FeaturedCard article={FEATURED_ARTICLE} />
            </div>
          </section>


          {/* ═══════════════ ARTICLES — Photo + Info Split Cards ═══════════════ */}
          <section className="relative py-12 md:py-20 px-[clamp(1.5rem,5vw,8rem)]" style={{ background: '#f2ede6' }}>
            {/* Subtle spiral background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
              <svg className="absolute w-full h-full" viewBox="0 0 1200 900" fill="none" preserveAspectRatio="xMidYMid slice">
                <path d="M200 450 C200 250, 400 100, 600 100 C800 100, 1000 250, 1000 450 C1000 650, 800 800, 600 800 C450 800, 350 700, 350 550 C350 420, 430 340, 550 340 C650 340, 720 400, 720 480" stroke="#c9a86e" strokeWidth="1" fill="none" />
                <path d="M100 200 C300 50, 600 0, 900 100 C1100 180, 1200 350, 1150 550" stroke="#c9a86e" strokeWidth="0.8" fill="none" />
                <circle cx="600" cy="450" r="300" stroke="#c9a86e" strokeWidth="0.5" fill="none" strokeDasharray="8 16" />
              </svg>
            </div>

            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{ backgroundImage: GRAIN_BG, backgroundSize: '256px 256px' }}
            />

            <div className="relative z-10 max-w-[1400px] mx-auto">
              {/* Section Header */}
              <RevealOnScroll>
                <div className="flex items-center gap-6 mb-12">
                  <span className="text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: '#c9a86e' }}>
                    All Articles
                  </span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(201,168,110,0.15)' }} />
                  <span className="text-xs font-medium" style={{ color: 'rgba(42,34,24,0.3)' }}>
                    {ARTICLES.length} stories
                  </span>
                </div>
              </RevealOnScroll>

              {/* 3-column grid — vertical cards with image on top */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
                {ARTICLES.map((article, i) => (
                  <ArticleCard
                    key={article.title}
                    article={article}
                    index={i}
                  />
                ))}
              </div>

              {/* Load more */}
              <RevealOnScroll delay={0.2} className="flex justify-center mt-20">
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


          <SolutionsFooter />
        </SmoothScroll>

        <SolutionsCookiePopup />
      </div>
    </>
  )
}