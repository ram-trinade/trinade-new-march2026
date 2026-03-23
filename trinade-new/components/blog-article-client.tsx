'use client'

import dynamic from 'next/dynamic'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import Link from 'next/link'

const MotionLink = motion.create(Link)

const PremiumCursor = dynamic(() => import('@/components/premium-cursor'), { ssr: false })
const SolutionsNavbar = dynamic(() => import('@/components/solutions-navbar'), { ssr: false })
const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'), { ssr: false })
const SolutionsCookiePopup = dynamic(() => import('@/components/solutions-cookie-popup'), { ssr: false })
const SolutionsFooter = dynamic(() => import('@/components/solutions-footer'), { ssr: false })

/* ─── Constants ─── */
const EASE = [0.16, 1, 0.3, 1] as const
const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const
const GRAIN_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`

/* ─── Article Data ─── */
const ARTICLE = {
  category: 'Healthcare AI',
  title: 'AI in Healthcare: From Diagnostics to Patient-Centric Care',
  author: 'Priya Sharma',
  role: 'Healthcare AI Lead',
  date: 'March 1, 2026',
  readTime: '8 min read',
}

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

/* ─── Read Progress Bar ─── */
function ReadProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #c9a86e, #d4bb8a)',
      }}
    />
  )
}

/* ─── Floating Back Arrow ─── */
function FloatingBackArrow() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <MotionLink
      href="/blog"
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
      transition={{ duration: 0.4, ease: EASE_SMOOTH }}
      whileHover={{ scale: 1.1 }}
      style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(201,168,110,0.2), rgba(185,155,100,0.1))',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(201,168,110,0.3)',
        boxShadow: '0 8px 32px rgba(42,34,24,0.1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M19 12H5M5 12l6-6M5 12l6 6" stroke="#c9a86e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </MotionLink>
  )
}

/* ─── Article Content Sections ─── */
const SECTIONS = [
  {
    heading: 'The Diagnostic Revolution',
    content: `Medical diagnostics has entered a new era. Machine learning models trained on millions of medical images can now detect early-stage cancers, retinal diseases, and cardiac anomalies with accuracy that matches — and sometimes exceeds — seasoned specialists.\n\nAt Trinade, we approach diagnostic AI not as a replacement for clinical judgment, but as an augmentation layer. Our systems surface patterns that human eyes might miss during high-volume screening sessions, flagging anomalies for expert review while maintaining transparent confidence scores.\n\nThe key insight is that diagnostic AI works best when it respects the clinical workflow rather than disrupting it. Integration into existing PACS systems, DICOM-compatible pipelines, and EMR platforms means radiologists and pathologists can leverage AI without changing how they work.`,
  },
  {
    heading: 'Patient-Centric Intelligence',
    content: `Healthcare is fundamentally personal. Every patient brings a unique combination of genetics, lifestyle, medical history, and preferences. AI-first healthcare acknowledges this complexity and uses it as a design principle.\n\nOur patient-centric AI systems analyze longitudinal health data to create personalized care pathways. Rather than one-size-fits-all treatment protocols, these systems help clinicians tailor interventions based on predicted outcomes for specific patient profiles.\n\nThis extends beyond treatment into communication. Natural language processing enables more accessible health information, automated appointment scheduling that respects patient preferences, and proactive outreach based on predictive models that identify patients at risk of missing critical follow-ups.`,
  },
  {
    heading: 'Compliance Without Compromise',
    content: `Healthcare AI operates in one of the most regulated environments in technology. HIPAA, GDPR, and regional health data regulations create a complex compliance landscape that many AI initiatives fail to navigate.\n\nTrinade's approach embeds compliance into the architecture from day one. Our systems use federated learning approaches that keep patient data within institutional boundaries while still benefiting from collective intelligence. Differential privacy techniques ensure that individual patient information can never be reverse-engineered from model outputs.\n\nAudit trails, explainable AI interfaces for regulatory review, and automated compliance reporting are not afterthoughts — they are core features that enable healthcare organizations to adopt AI with confidence.`,
  },
  {
    heading: 'The Future of Clinical Workflows',
    content: `The next wave of healthcare AI moves beyond isolated use cases toward integrated clinical intelligence. Imagine a system that connects diagnostic imaging, lab results, patient history, and real-time vital signs into a unified decision support layer.\n\nThis is where multi-modal AI architectures become essential. By combining computer vision for imaging, NLP for clinical notes, and time-series analysis for monitoring data, we can build systems that understand patient health holistically rather than through narrow diagnostic windows.\n\nThe result is not just better diagnoses, but better care coordination, reduced administrative burden, and clinical teams that can focus their expertise where it matters most — at the patient's bedside.`,
  },
]

/* ─── Pull Quote ─── */
function PullQuote({ text }: { text: string }) {
  return (
    <RevealOnScroll className="my-16 md:my-24">
      <div className="relative pl-8 md:pl-12">
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px]"
          style={{
            background: 'linear-gradient(to bottom, #c9a86e, rgba(201,168,110,0.2))',
          }}
        />
        <p
          className="text-[clamp(1.4rem,2.8vw,2.2rem)] font-light leading-[1.5] tracking-tight italic"
          style={{ color: 'rgba(42,34,24,0.7)' }}
        >
          {text}
        </p>
      </div>
    </RevealOnScroll>
  )
}

/* ══════════════════════════════════════════════════════════════
   ARTICLE PAGE
   ══════════════════════════════════════════════════════════════ */

export default function ArticlePageClient() {
  return (
    <>
      <style>{`
        .solutions-page, .solutions-page * { cursor: none !important; }
      `}</style>

      <div className="solutions-page relative" style={{ background: '#f2ede6' }}>
        <PremiumCursor />
        <SolutionsNavbar />
        <ReadProgressBar />
        <FloatingBackArrow />

        <SmoothScroll>
          {/* ═══════════════ HERO — Cinematic Article Header ═══════════════ */}
          <section
            className="relative min-h-[85vh] flex flex-col justify-end overflow-hidden"
            style={{
              background: 'linear-gradient(155deg, #1a1510 0%, #2a1f14 25%, #1f1a12 50%, #2d2218 75%, #0f0d09 100%)',
            }}
          >
            {/* Atmospheric gradient orbs */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute"
                style={{
                  width: '60%', height: '70%',
                  top: '5%', left: '20%',
                  background: 'radial-gradient(ellipse, rgba(201,168,110,0.08) 0%, transparent 60%)',
                  filter: 'blur(80px)',
                }}
              />
              <div
                className="absolute"
                style={{
                  width: '40%', height: '50%',
                  bottom: '5%', right: '5%',
                  background: 'radial-gradient(ellipse, rgba(160,129,74,0.06) 0%, transparent 55%)',
                  filter: 'blur(60px)',
                }}
              />
            </div>

            {/* Grain */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ backgroundImage: GRAIN_BG, backgroundSize: '128px 128px', mixBlendMode: 'overlay' }}
            />

            {/* Bottom gradient */}
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{
                height: '60%',
                background: 'linear-gradient(to top, rgba(15,13,9,0.7) 0%, transparent 100%)',
              }}
            />

            {/* Content */}
            <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-32 pb-16 md:pb-24 pt-40">
              <div className="max-w-[1200px] mx-auto">
                {/* Back link */}
                <MotionLink
                  href="/blog"
                  className="inline-flex items-center gap-3 mb-12 group"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M19 12H5M5 12l6-6M5 12l6 6" stroke="#c9a86e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span
                    className="text-xs tracking-[0.15em] uppercase font-semibold"
                    style={{ color: 'rgba(201,168,110,0.6)' }}
                  >
                    Back to Blog
                  </span>
                </MotionLink>

                {/* Category + Read time */}
                <motion.div
                  className="flex items-center gap-4 mb-8"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                >
                  <GoldPill>{ARTICLE.category}</GoldPill>
                  <span className="text-xs tracking-[0.12em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {ARTICLE.readTime}
                  </span>
                </motion.div>

                {/* Title — massive editorial */}
                <motion.h1
                  className="text-[clamp(2.4rem,5.5vw,4.8rem)] font-light tracking-tight leading-[1.08] mb-10 max-w-[900px]"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.35, ease: EASE }}
                  style={{ color: 'rgba(255,255,255,0.95)' }}
                >
                  {ARTICLE.title}
                </motion.h1>

                {/* Author + Date row */}
                <motion.div
                  className="flex items-center gap-5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-[11px] font-bold tracking-wide"
                    style={{
                      background: 'linear-gradient(135deg, rgba(201,168,110,0.25), rgba(201,168,110,0.1))',
                      color: '#c9a86e',
                      border: '1px solid rgba(201,168,110,0.2)',
                    }}
                  >
                    PS
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>
                      {ARTICLE.author}
                    </p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {ARTICLE.role} · {ARTICLE.date}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>


          {/* ═══════════════ ARTICLE BODY ═══════════════ */}
          <section className="relative py-20 md:py-32" style={{ background: '#f2ede6' }}>
            {/* Grain */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{ backgroundImage: GRAIN_BG, backgroundSize: '256px 256px' }}
            />

            {/* Subtle warm glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute"
                style={{
                  width: '50vw', height: '50vw', maxWidth: '700px', maxHeight: '700px',
                  top: '10%', right: '-10%',
                  background: 'radial-gradient(ellipse, rgba(201,168,110,0.04) 0%, transparent 60%)',
                  filter: 'blur(100px)',
                }}
              />
            </div>

            <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-32">
              <div className="max-w-[760px] mx-auto">
                {/* Introduction */}
                <RevealOnScroll>
                  <p
                    className="text-[clamp(1.15rem,2vw,1.35rem)] leading-[1.9] font-light mb-10"
                    style={{ color: 'rgba(42,34,24,0.65)' }}
                  >
                    The intersection of artificial intelligence and healthcare represents one of the most consequential technology transitions of our era. From radiology suites to emergency departments, intelligent systems are augmenting clinical expertise and reshaping how care is delivered, measured, and experienced.
                  </p>
                </RevealOnScroll>

                <GoldRule className="mb-16" />

                {/* Article sections */}
                {SECTIONS.map((section, i) => (
                  <div key={section.heading}>
                    <RevealOnScroll delay={0.1}>
                      <h2
                        className="text-[clamp(1.6rem,3vw,2.4rem)] font-light tracking-tight leading-[1.2] mb-8"
                        style={{ color: '#2a2218' }}
                      >
                        {section.heading}
                      </h2>
                    </RevealOnScroll>

                    {section.content.split('\n\n').map((para, j) => (
                      <RevealOnScroll key={j} delay={0.05 * j}>
                        <p
                          className="text-[16px] leading-[1.9] mb-6"
                          style={{ color: 'rgba(42,34,24,0.55)' }}
                        >
                          {para}
                        </p>
                      </RevealOnScroll>
                    ))}

                    {/* Pull quote after section 1 */}
                    {i === 0 && (
                      <PullQuote text="Diagnostic AI works best when it respects the clinical workflow rather than disrupting it." />
                    )}

                    {/* Pull quote after section 2 */}
                    {i === 2 && (
                      <PullQuote text="Compliance is not an afterthought — it is a core feature that enables healthcare organizations to adopt AI with confidence." />
                    )}

                    {i < SECTIONS.length - 1 && (
                      <div className="my-14 md:my-20">
                        <GoldRule />
                      </div>
                    )}
                  </div>
                ))}

                {/* Tags */}
                <RevealOnScroll className="mt-20">
                  <div className="flex flex-wrap gap-3">
                    {['Healthcare', 'AI Diagnostics', 'Patient Care', 'Compliance', 'Clinical AI', 'HIPAA'].map(tag => (
                      <span
                        key={tag}
                        className="px-4 py-2 text-xs tracking-[0.1em] uppercase font-medium rounded-full"
                        style={{
                          background: 'rgba(201,168,110,0.06)',
                          border: '1px solid rgba(201,168,110,0.12)',
                          color: 'rgba(42,34,24,0.45)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </section>


          {/* ═══════════════ AUTHOR BIO ═══════════════ */}
          <section className="relative py-16 md:py-24" style={{ background: '#ebe5db' }}>
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{ backgroundImage: GRAIN_BG, backgroundSize: '256px 256px' }}
            />
            <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-32">
              <div className="max-w-[760px] mx-auto">
                <RevealOnScroll>
                  <div className="flex items-start gap-6">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(201,168,110,0.2), rgba(201,168,110,0.08))',
                        color: '#c9a86e',
                        border: '1px solid rgba(201,168,110,0.2)',
                      }}
                    >
                      PS
                    </div>
                    <div>
                      <p className="font-semibold text-lg mb-1" style={{ color: '#2a2218' }}>{ARTICLE.author}</p>
                      <p className="text-sm mb-4" style={{ color: 'rgba(42,34,24,0.45)' }}>{ARTICLE.role} at Trinade AI Technologies</p>
                      <p className="text-[15px] leading-[1.8]" style={{ color: 'rgba(42,34,24,0.5)' }}>
                        Priya leads our Healthcare AI practice, bringing over a decade of experience in clinical informatics and machine learning to every engagement. She is passionate about creating AI systems that respect clinical workflows while pushing the boundaries of what is possible in patient care.
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </section>


          {/* ═══════════════ MORE ARTICLES ═══════════════ */}
          <section className="relative py-20 md:py-28" style={{ background: '#f2ede6' }}>
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{ backgroundImage: GRAIN_BG, backgroundSize: '256px 256px' }}
            />
            <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-32">
              <div className="max-w-[1200px] mx-auto">
                <RevealOnScroll>
                  <div className="flex items-center gap-6 mb-12">
                    <span className="text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: '#c9a86e' }}>
                      Continue Reading
                    </span>
                    <div className="flex-1 h-px" style={{ background: 'rgba(201,168,110,0.15)' }} />
                  </div>
                </RevealOnScroll>

                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    {
                      title: 'Intelligent Contract Analysis: How AI Is Reshaping Legal Operations',
                      category: 'Legal Tech',
                      readTime: '10 min read',
                      slug: 'intelligent-contract-analysis-how-ai-is-reshaping-legal-operations',
                    },
                    {
                      title: 'Predictive Intelligence in Financial Services',
                      category: 'FinTech',
                      readTime: '7 min read',
                      slug: 'predictive-intelligence-in-financial-services',
                    },
                  ].map((related, i) => (
                    <RevealOnScroll key={related.slug} delay={i * 0.1}>
                      <a href={`/blog/${related.slug}`} className="group block">
                        <div
                          className="relative p-8 md:p-10 overflow-hidden transition-all duration-500"
                          style={{
                            borderRadius: '20px',
                            background: 'rgba(255,255,255,0.4)',
                            border: '1px solid rgba(201,168,110,0.1)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(201,168,110,0.06)'
                            e.currentTarget.style.borderColor = 'rgba(201,168,110,0.25)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.4)'
                            e.currentTarget.style.borderColor = 'rgba(201,168,110,0.1)'
                          }}
                        >
                          <GoldPill className="mb-5">{related.category}</GoldPill>
                          <h3
                            className="text-[clamp(1.3rem,2.5vw,1.8rem)] font-medium leading-[1.2] tracking-tight mb-4"
                            style={{ color: 'rgba(42,34,24,0.8)' }}
                          >
                            {related.title}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-xs" style={{ color: 'rgba(42,34,24,0.35)' }}>{related.readTime}</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <path d="M5 19L19 5M19 5H9M19 5v10" stroke="#c9a86e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                      </a>
                    </RevealOnScroll>
                  ))}
                </div>
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