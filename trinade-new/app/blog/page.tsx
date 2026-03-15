'use client'

import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'

const PremiumCursor = dynamic(() => import('@/components/premium-cursor'), { ssr: false })
const SolutionsNavbar = dynamic(() => import('@/components/solutions-navbar'), { ssr: false })
const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'), { ssr: false })
const SolutionsCookiePopup = dynamic(() => import('@/components/solutions-cookie-popup'), { ssr: false })
const SolutionsFooter = dynamic(() => import('@/components/solutions-footer'), { ssr: false })

/* ─── Constants ─── */
const EASE = [0.16, 1, 0.3, 1] as const

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

/* ─── Staggered Text Reveal ─── */
function StaggeredText({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const words = text.split(' ')

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div className="flex flex-wrap gap-x-[0.3em]">
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              animate={isInView ? { y: '0%', opacity: 1 } : {}}
              transition={{
                duration: 0.9,
                delay: delay + i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── Article Data ─── */
const FEATURED_ARTICLE = {
  category: 'Enterprise AI',
  title: 'The Architecture of Enterprise Intelligence',
  excerpt: 'How we designed a modular, scalable intelligence layer that adapts to the unique topology of each organization — without requiring a complete infrastructure overhaul.',
  author: 'Arjun Mehta',
  role: 'Chief Technology Officer',
  date: 'March 8, 2026',
  readTime: '12 min read',
  gradient: 'linear-gradient(135deg, #2a1f14 0%, #1a1510 25%, #2d2218 50%, #1f1a12 75%, #0f0d09 100%)',
}

const ARTICLES = [
  {
    category: 'AI Strategy',
    title: 'Beyond Automation: AI That Augments Human Decision-Making',
    excerpt: 'The most effective enterprise AI systems do not replace human judgment. They create new layers of understanding that make better decisions inevitable.',
    author: 'Priya Sharma',
    date: 'March 1, 2026',
    readTime: '8 min read',
    gradient: 'linear-gradient(145deg, #3d2e1a 0%, #2a1f14 50%, #1a140d 100%)',
    meshAccent: 'radial-gradient(ellipse at 30% 40%, rgba(201,168,110,0.2) 0%, transparent 60%)',
  },
  {
    category: 'Engineering',
    title: 'Edge Computing Meets Machine Learning: A New Paradigm',
    excerpt: 'Deploying inference workloads at the edge dramatically reduces latency and opens new possibilities for real-time intelligent systems in manufacturing.',
    author: 'Vikram Nair',
    date: 'February 22, 2026',
    readTime: '10 min read',
    gradient: 'linear-gradient(145deg, #1f2a1a 0%, #1a2215 50%, #0d150a 100%)',
    meshAccent: 'radial-gradient(ellipse at 70% 30%, rgba(168,201,110,0.15) 0%, transparent 55%)',
  },
  {
    category: 'Responsible AI',
    title: 'Building Trust in AI: Our Approach to Responsible Innovation',
    excerpt: 'Trust is not a feature you ship. It is a design principle that must be woven into every layer of an AI system, from data governance to user experience.',
    author: 'Ananya Das',
    date: 'February 14, 2026',
    readTime: '7 min read',
    gradient: 'linear-gradient(145deg, #2a1a2a 0%, #1f1420 50%, #120d14 100%)',
    meshAccent: 'radial-gradient(ellipse at 40% 60%, rgba(180,130,200,0.15) 0%, transparent 55%)',
  },
  {
    category: 'NLP',
    title: 'The Future of Natural Language Processing in Business',
    excerpt: 'Language models are evolving from conversational toys into operational infrastructure. We explore the architectures making this possible at enterprise scale.',
    author: 'Rahul Iyer',
    date: 'February 6, 2026',
    readTime: '9 min read',
    gradient: 'linear-gradient(145deg, #1a2230 0%, #141a24 50%, #0a0f18 100%)',
    meshAccent: 'radial-gradient(ellipse at 60% 40%, rgba(110,150,201,0.18) 0%, transparent 55%)',
  },
  {
    category: 'Data Science',
    title: 'From Data to Insight: Transforming Enterprise Analytics',
    excerpt: 'The gap between raw data and actionable insight is not technological. It is architectural. Here is how we bridge it with composable analytics pipelines.',
    author: 'Meera Kulkarni',
    date: 'January 28, 2026',
    readTime: '11 min read',
    gradient: 'linear-gradient(145deg, #302a1a 0%, #241f14 50%, #18140d 100%)',
    meshAccent: 'radial-gradient(ellipse at 50% 50%, rgba(201,180,110,0.2) 0%, transparent 60%)',
  },
  {
    category: 'Research',
    title: 'Multimodal Reasoning: Teaching Systems to See, Read, and Think',
    excerpt: 'Our latest research into multimodal architectures reveals that the future of AI comprehension lies not in bigger models, but in smarter integration patterns.',
    author: 'Dr. Siddharth Rao',
    date: 'January 19, 2026',
    readTime: '14 min read',
    gradient: 'linear-gradient(145deg, #1a2a28 0%, #142220 50%, #0d1a18 100%)',
    meshAccent: 'radial-gradient(ellipse at 35% 55%, rgba(110,201,180,0.15) 0%, transparent 55%)',
  },
]

const CATEGORIES = [
  'All', 'AI Strategy', 'Engineering', 'Research', 'Enterprise', 'NLP', 'Responsible AI', 'Data Science', 'Machine Learning', 'Innovation',
]

/* ─── Article Card ─── */
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
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: EASE }}
      className="group relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(201,168,110,0.08)',
        background: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
        borderColor: hovered ? 'rgba(201,168,110,0.25)' : 'rgba(201,168,110,0.08)',
        boxShadow: hovered
          ? '0 20px 60px rgba(201,168,110,0.08), 0 0 0 1px rgba(201,168,110,0.1)'
          : '0 4px 24px rgba(0,0,0,0.03)',
      }}
    >
      {/* Image Placeholder */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: index === 0 || index === 5 ? '260px' : '200px',
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: article.gradient }}
        />
        <div
          className="absolute inset-0"
          style={{ background: article.meshAccent }}
        />
        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />
        {/* Category pill */}
        <div className="absolute top-4 left-4 z-10">
          <GoldPill>{article.category}</GoldPill>
        </div>
        {/* Read time */}
        <div className="absolute bottom-4 right-4 z-10">
          <span
            className="text-xs tracking-wide font-medium"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            {article.readTime}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <h3
          className="text-lg font-bold leading-snug tracking-tight"
          style={{ color: '#2a2218' }}
        >
          {article.title}
        </h3>
        <p
          className="text-sm leading-relaxed flex-1"
          style={{
            color: 'rgba(42,34,24,0.55)',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {article.excerpt}
        </p>

        {/* Author + Date */}
        <div
          className="flex items-center justify-between pt-3 mt-auto"
          style={{ borderTop: '1px solid rgba(201,168,110,0.1)' }}
        >
          <div className="flex items-center gap-2.5">
            {/* Author avatar placeholder */}
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background: 'linear-gradient(135deg, rgba(201,168,110,0.2), rgba(201,168,110,0.08))',
                color: '#c9a86e',
                border: '1px solid rgba(201,168,110,0.15)',
              }}
            >
              {article.author.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="text-xs font-medium" style={{ color: 'rgba(42,34,24,0.7)' }}>
              {article.author}
            </span>
          </div>
          <span className="text-xs" style={{ color: 'rgba(42,34,24,0.4)' }}>
            {article.date}
          </span>
        </div>
      </div>

      {/* Hover read-more indicator */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{
          background: 'linear-gradient(90deg, transparent, #c9a86e, transparent)',
          transformOrigin: 'left',
        }}
      />
    </motion.article>
  )
}

/* ══════════════════════════════════════════════════════════════
   BLOG PAGE
   ══════════════════════════════════════════════════════════════ */

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [email, setEmail] = useState('')

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
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Atmospheric gradient orbs */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute"
                style={{
                  width: '50vw',
                  height: '50vw',
                  maxWidth: '800px',
                  maxHeight: '800px',
                  top: '5%',
                  right: '-10%',
                  background: 'radial-gradient(ellipse, rgba(201,168,110,0.08) 0%, transparent 70%)',
                  filter: 'blur(60px)',
                }}
              />
              <div
                className="absolute"
                style={{
                  width: '40vw',
                  height: '40vw',
                  maxWidth: '600px',
                  maxHeight: '600px',
                  bottom: '10%',
                  left: '-5%',
                  background: 'radial-gradient(ellipse, rgba(185,155,100,0.06) 0%, transparent 70%)',
                  filter: 'blur(80px)',
                }}
              />
            </div>

            {/* Grain */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.035]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
                backgroundSize: '256px 256px',
              }}
            />

            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
              {/* Eyebrow */}
              <RevealOnScroll delay={0.2}>
                <GoldPill className="mb-8">Journal</GoldPill>
              </RevealOnScroll>

              {/* Headline */}
              <StaggeredText
                text="Stories & Insights"
                className="font-bold tracking-tight leading-[0.95]"
                delay={0.3}
              />
              <style>{`
                .solutions-page section:first-of-type .overflow-hidden .flex {
                  justify-content: center;
                }
                .solutions-page section:first-of-type .overflow-hidden .flex span span {
                  font-size: clamp(3.5rem, 8vw, 8rem);
                  color: #2a2218;
                  font-weight: 700;
                }
              `}</style>

              {/* Subheadline */}
              <RevealOnScroll delay={0.7} className="mt-8">
                <p
                  className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                  style={{ color: 'rgba(42,34,24,0.55)' }}
                >
                  Explorations in artificial intelligence, engineering craft,
                  and the quiet architecture of systems that think.
                </p>
              </RevealOnScroll>

              {/* Decorative gold line */}
              <div className="mt-12 max-w-xs mx-auto">
                <GoldRule />
              </div>
            </div>

            {/* Scroll hint */}
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1 }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
                style={{ border: '1.5px solid rgba(201,168,110,0.3)' }}
              >
                <motion.div
                  className="w-1 h-1.5 rounded-full"
                  style={{ background: '#c9a86e' }}
                />
              </motion.div>
            </motion.div>
          </section>

          {/* ═══════════════ FEATURED ARTICLE ═══════════════ */}
          <section className="relative px-6 md:px-12 lg:px-20 xl:px-32 pb-24">
            <RevealOnScroll>
              <div className="max-w-[1400px] mx-auto">
                <div className="flex items-center gap-4 mb-8">
                  <span
                    className="text-xs tracking-[0.2em] uppercase font-semibold"
                    style={{ color: '#c9a86e' }}
                  >
                    Featured
                  </span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(201,168,110,0.15)' }} />
                </div>

                <FeaturedCard article={FEATURED_ARTICLE} />
              </div>
            </RevealOnScroll>
          </section>

          {/* ═══════════════ CATEGORIES ═══════════════ */}
          <section className="relative px-6 md:px-12 lg:px-20 xl:px-32 pb-16">
            <div className="max-w-[1400px] mx-auto">
              <RevealOnScroll>
                <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="shrink-0 px-5 py-2 text-sm font-medium tracking-wide transition-all duration-300"
                      style={{
                        borderRadius: '100px',
                        background: activeCategory === cat
                          ? 'linear-gradient(165deg, rgba(185,155,100,0.2) 0%, rgba(201,168,110,0.1) 100%)'
                          : 'rgba(255,255,255,0.4)',
                        border: activeCategory === cat
                          ? '1px solid rgba(201,168,110,0.35)'
                          : '1px solid rgba(201,168,110,0.08)',
                        color: activeCategory === cat ? '#c9a86e' : 'rgba(42,34,24,0.5)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </RevealOnScroll>
              <div className="mt-6">
                <GoldRule />
              </div>
            </div>
          </section>

          {/* ═══════════════ ARTICLE GRID ═══════════════ */}
          <section className="relative px-6 md:px-12 lg:px-20 xl:px-32 pb-32">
            <div className="max-w-[1400px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ARTICLES.map((article, i) => (
                  <ArticleCard key={article.title} article={article} index={i} />
                ))}
              </div>

              {/* Load more */}
              <RevealOnScroll delay={0.3} className="flex justify-center mt-16">
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

          {/* ═══════════════ NEWSLETTER CTA ═══════════════ */}
          <section
            className="relative py-32 overflow-hidden"
            style={{ background: '#1a1a1e' }}
          >
            {/* Atmospheric orbs */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute"
                style={{
                  width: '60vw',
                  height: '60vw',
                  maxWidth: '900px',
                  maxHeight: '900px',
                  top: '-20%',
                  left: '-15%',
                  background: 'radial-gradient(ellipse, rgba(201,168,110,0.06) 0%, transparent 70%)',
                  filter: 'blur(80px)',
                }}
              />
              <div
                className="absolute"
                style={{
                  width: '40vw',
                  height: '40vw',
                  maxWidth: '600px',
                  maxHeight: '600px',
                  bottom: '-10%',
                  right: '-5%',
                  background: 'radial-gradient(ellipse, rgba(185,155,100,0.05) 0%, transparent 65%)',
                  filter: 'blur(60px)',
                }}
              />
            </div>

            {/* Grain */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
                backgroundSize: '256px 256px',
              }}
            />

            <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-32 max-w-[1400px] mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                {/* Left: Editorial Copy */}
                <div className="flex-1 text-center lg:text-left">
                  <RevealOnScroll>
                    <GoldPill className="mb-6">Newsletter</GoldPill>
                  </RevealOnScroll>
                  <RevealOnScroll delay={0.1}>
                    <h2
                      className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6"
                      style={{ color: 'rgba(255,255,255,0.93)' }}
                    >
                      Stay at the
                      <br />
                      <span style={{ color: '#c9a86e' }}>frontier.</span>
                    </h2>
                  </RevealOnScroll>
                  <RevealOnScroll delay={0.2}>
                    <p
                      className="text-base md:text-lg leading-relaxed max-w-md"
                      style={{ color: 'rgba(255,255,255,0.45)' }}
                    >
                      A monthly distillation of our latest thinking on enterprise AI,
                      engineering craft, and responsible innovation. No noise, just signal.
                    </p>
                  </RevealOnScroll>
                </div>

                {/* Right: Glass Card with Form */}
                <RevealOnScroll delay={0.3} className="w-full lg:w-auto">
                  <div
                    className="relative p-8 md:p-10 w-full lg:w-[480px]"
                    style={{
                      background: 'linear-gradient(165deg, rgba(185,155,100,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                      backdropFilter: 'blur(32px) saturate(1.2)',
                      WebkitBackdropFilter: 'blur(32px) saturate(1.2)',
                      border: '1px solid rgba(201,168,110,0.12)',
                      borderRadius: '24px',
                      boxShadow: '0 24px 80px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
                    }}
                  >
                    <p
                      className="text-sm font-medium mb-6 tracking-wide"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                      Join 2,400+ leaders in AI and engineering
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="flex-1 px-5 py-3.5 text-sm outline-none placeholder:text-white/25"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '14px',
                          color: 'rgba(255,255,255,0.9)',
                          transition: 'border-color 0.3s ease',
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,110,0.35)' }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                      />
                      <button
                        className="px-7 py-3.5 text-sm font-semibold tracking-[0.08em] uppercase shrink-0"
                        style={{
                          background: 'linear-gradient(165deg, rgba(201,168,110,0.9) 0%, rgba(185,155,100,0.8) 100%)',
                          borderRadius: '14px',
                          color: '#1a1a1e',
                          border: 'none',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 20px rgba(201,168,110,0.2)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 8px 30px rgba(201,168,110,0.35)'
                          e.currentTarget.style.transform = 'translateY(-1px)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,168,110,0.2)'
                          e.currentTarget.style.transform = 'translateY(0)'
                        }}
                      >
                        Subscribe
                      </button>
                    </div>

                    <p
                      className="text-xs mt-4"
                      style={{ color: 'rgba(255,255,255,0.25)' }}
                    >
                      Delivered monthly. Unsubscribe anytime. We respect your inbox.
                    </p>
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </section>

          {/* ═══════════════ TOPICS ═══════════════ */}
          <section className="relative py-24 px-6 md:px-12 lg:px-20 xl:px-32">
            <div className="max-w-[1400px] mx-auto">
              <RevealOnScroll>
                <div className="flex items-center gap-4 mb-12">
                  <span
                    className="text-xs tracking-[0.2em] uppercase font-semibold"
                    style={{ color: '#c9a86e' }}
                  >
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

/* ─── Featured Article Card ─── */
function FeaturedCard({ article }: { article: typeof FEATURED_ARTICLE }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="group relative overflow-hidden"
      style={{
        borderRadius: '28px',
        border: '1px solid rgba(201,168,110,0.1)',
        transition: 'border-color 0.6s ease, box-shadow 0.6s ease',
        borderColor: hovered ? 'rgba(201,168,110,0.25)' : 'rgba(201,168,110,0.1)',
        boxShadow: hovered
          ? '0 32px 80px rgba(201,168,110,0.08), 0 0 0 1px rgba(201,168,110,0.08)'
          : '0 8px 40px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Image Side */}
        <div className="relative lg:w-[55%] overflow-hidden" style={{ minHeight: '340px' }}>
          <motion.div
            className="absolute inset-0"
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: article.gradient }}
          />
          {/* Mesh accent */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 60% 40%, rgba(201,168,110,0.15) 0%, transparent 60%)',
            }}
          />
          {/* Grain */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: '128px 128px',
            }}
          />
          {/* Featured badge */}
          <div className="absolute top-6 left-6 z-10">
            <GoldPill>{article.category}</GoldPill>
          </div>
          {/* Decorative elements */}
          <div
            className="absolute bottom-8 left-8 right-8"
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, rgba(201,168,110,0.3), transparent)',
            }}
          />
        </div>

        {/* Content Side */}
        <div
          className="lg:w-[45%] p-8 md:p-10 lg:p-12 flex flex-col justify-center"
          style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)' }}
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
            {/* Author avatar */}
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
            {/* Arrow */}
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
  )
}
