'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'

/* ─── Team Data ─────────────────────────────────────────────────── */

interface Member {
  name: string
  role: string
  specialty: string
  bio: string
  personality: string
  initials: string
}

const TEAM: Member[] = [
  {
    name: 'Arjun Mehta',
    role: 'Founder & CEO',
    specialty: 'Builds systems that think in decades',
    bio: 'A visionary leader with 15+ years in AI and enterprise software. Previously led engineering at a Fortune 500 fintech company, building distributed systems processing billions of daily transactions. Founded Trinade with the conviction that AI should amplify human intelligence, not replace it.',
    personality: 'Collects rare fountain pens from the 1920s',
    initials: 'AM',
  },
  {
    name: 'Priya Ramanathan',
    role: 'Chief Technology Officer',
    specialty: 'Architect of distributed intelligence',
    bio: 'A systems architect with deep expertise in distributed computing and neural network infrastructure. Holds a PhD in Computer Science from IIT Madras with over 30 published papers. Previously at Google DeepMind, where she architected core training pipelines serving research teams worldwide.',
    personality: 'Speaks five languages — learning a sixth',
    initials: 'PR',
  },
  {
    name: 'Leo Nakamura',
    role: 'VP of Product',
    specialty: 'Turns complexity into elegance',
    bio: 'A product strategist who bridges complex technology and elegant user experiences. Spent 8 years at Apple, then led product at two YC-backed AI startups through Series B. Known for distilling sprawling technical capabilities into products people actually want to use.',
    personality: 'Deep-sky astrophotographer',
    initials: 'LN',
  },
  {
    name: 'Zara Okonkwo',
    role: 'Head of Design',
    specialty: 'Obsessed with invisible interfaces',
    bio: 'A design leader focused on the space between humans and machines. Former Head of Design at a Figma-acquired startup, where she pioneered adaptive interface systems. Holds a master\u2019s from the Royal College of Art. Makes the complex feel effortless.',
    personality: 'Competitive rock climber — V7 grade',
    initials: 'ZO',
  },
  {
    name: 'Marcus Lindström',
    role: 'Lead Engineer',
    specialty: 'Makes machines learn gracefully',
    bio: 'A machine learning engineer specializing in production-ready AI systems at scale. Previously at Spotify, where he built the recommendation engine\u2019s real-time inference layer. Open-source contributor and author of three widely-used ML optimization libraries.',
    personality: 'Builds custom mechanical keyboards',
    initials: 'ML',
  },
  {
    name: 'Ananya Desai',
    role: 'Head of Research',
    specialty: 'Pushing transformer boundaries daily',
    bio: 'A research scientist pushing the boundaries of transformer architectures and multimodal AI. Former researcher at Microsoft Research with 20+ publications in top-tier conferences. Her work on efficient attention mechanisms has been cited over 5,000 times.',
    personality: 'Publishes poetry under a pseudonym',
    initials: 'AD',
  },
  {
    name: 'James Whitfield',
    role: 'VP of Sales',
    specialty: 'Translates technology into trust',
    bio: 'A commercial leader who translates cutting-edge technology into business value. 12 years of enterprise sales across AI, cloud infrastructure, and SaaS platforms. Previously grew ARR from $5M to $80M at a unicorn AI company through trust-based partnerships.',
    personality: 'Former jazz pianist — still plays weekends',
    initials: 'JW',
  },
  {
    name: 'Sofia Reyes',
    role: 'Head of Operations',
    specialty: 'Orchestrates chaos into rhythm',
    bio: 'An operations executive bringing structure to fast-moving environments. Former consultant at McKinsey, then COO at a Series C climate-tech startup where she scaled operations across 12 countries. Known for turning chaos into repeatable systems.',
    personality: 'Runs ultramarathons for meditation',
    initials: 'SR',
  },
]

/* ─── Rich mesh gradients for portrait placeholders ───────────── */

const PORTRAIT_GRADIENTS = [
  'radial-gradient(ellipse at 25% 15%, rgba(0,212,170,0.4) 0%, transparent 55%), radial-gradient(ellipse at 75% 85%, rgba(200,230,78,0.15) 0%, transparent 50%), linear-gradient(160deg, #0a1f16 0%, #060e09 50%, #0c1a12 100%)',
  'radial-gradient(ellipse at 70% 20%, rgba(0,212,170,0.3) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(180,130,55,0.2) 0%, transparent 55%), linear-gradient(200deg, #081a12 0%, #060e09 50%, #0a1810 100%)',
  'radial-gradient(ellipse at 50% 10%, rgba(200,230,78,0.25) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(0,212,170,0.2) 0%, transparent 55%), linear-gradient(140deg, #0b1e14 0%, #060e09 100%)',
  'radial-gradient(ellipse at 30% 80%, rgba(0,212,170,0.35) 0%, transparent 50%), radial-gradient(ellipse at 70% 20%, rgba(200,230,78,0.12) 0%, transparent 45%), linear-gradient(180deg, #091810 0%, #060e09 100%)',
  'radial-gradient(ellipse at 80% 30%, rgba(180,130,55,0.25) 0%, transparent 50%), radial-gradient(ellipse at 20% 70%, rgba(0,212,170,0.25) 0%, transparent 55%), linear-gradient(150deg, #0a1a12 0%, #060e09 100%)',
  'radial-gradient(ellipse at 40% 90%, rgba(200,230,78,0.2) 0%, transparent 50%), radial-gradient(ellipse at 60% 10%, rgba(0,212,170,0.3) 0%, transparent 50%), linear-gradient(170deg, #081610 0%, #060e09 100%)',
  'radial-gradient(ellipse at 10% 40%, rgba(0,212,170,0.3) 0%, transparent 50%), radial-gradient(ellipse at 90% 60%, rgba(180,130,55,0.18) 0%, transparent 50%), linear-gradient(135deg, #0b1c14 0%, #060e09 100%)',
  'radial-gradient(ellipse at 60% 80%, rgba(0,212,170,0.3) 0%, transparent 55%), radial-gradient(ellipse at 30% 20%, rgba(200,230,78,0.18) 0%, transparent 45%), linear-gradient(190deg, #091a14 0%, #060e09 100%)',
]

/* ─── Member Row — click-to-expand with massive portrait ───────── */

function MemberRow({
  member,
  index,
  isExpanded,
  onToggle,
}: {
  member: Member
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })
  const displayIdx = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={onToggle}
      className="group cursor-pointer"
    >
      {/* Scoped gradient separator — within content padding */}
      <div className="px-6 md:px-[calc(12.5vw+0.8rem)]">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] lg:grid-cols-[1fr_420px] gap-6 md:gap-10 md:items-stretch px-6 md:px-[calc(12.5vw+0.8rem)] py-8 md:py-10 lg:py-12">
        {/* ── Left: Text content ── */}
        <div className="relative flex flex-col justify-center">
          {/* Watermark index */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[8rem] md:text-[10rem] font-extralight text-white/[0.02] leading-none select-none pointer-events-none tracking-tight hidden md:block">
            {displayIdx}
          </div>

          <motion.div
            animate={{
              color: isExpanded
                ? 'rgba(0,212,170,0.75)'
                : 'rgba(0,212,170,0.42)',
            }}
            transition={{ duration: 0.35 }}
            className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.22em] mb-2 md:mb-3"
          >
            {member.role}
          </motion.div>

          <motion.h3
            animate={{
              color: isExpanded
                ? 'rgba(255,255,255,0.98)'
                : 'rgba(255,255,255,0.82)',
            }}
            transition={{ duration: 0.3 }}
            className="text-[2rem] md:text-[2.8rem] lg:text-[3.2rem] font-bold tracking-[-0.03em] leading-[1.05]"
          >
            {member.name}
          </motion.h3>

          <motion.p
            animate={{ opacity: isExpanded ? 0.55 : 0.28 }}
            transition={{ duration: 0.35 }}
            className="mt-2 md:mt-3 text-[14px] md:text-[15px] italic font-extralight text-white tracking-[0.01em]"
          >
            {member.specialty}
          </motion.p>

          {/* Click-to-expand bio */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  duration: 0.45,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="overflow-hidden"
              >
                <p className="mt-5 text-[14px] leading-[1.8] text-white/35 max-w-[560px] font-light">
                  {member.bio}
                </p>
                <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center gap-2.5">
                  <span className="text-[#00d4aa]/35 text-xs">✦</span>
                  <span className="text-white/[0.18] text-[12px] tracking-wide">
                    {member.personality}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand/collapse toggle */}
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="mt-5 w-7 h-7 flex items-center justify-center rounded-full border border-white/[0.08] group-hover:border-white/[0.15] transition-colors duration-300"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 2.5V9.5M2.5 6H9.5"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                className="text-white/30 group-hover:text-white/50 transition-colors duration-300"
              />
            </svg>
          </motion.div>
        </div>

        {/* ── Right: Massive portrait placeholder ── */}
        <div className="order-first md:order-last">
          <div
            className="relative w-full h-[200px] md:h-full md:min-h-[240px] rounded-xl overflow-hidden border border-white/[0.04] group-hover:border-white/[0.08] transition-colors duration-500"
            style={{ background: PORTRAIT_GRADIENTS[index] }}
          >
            {/* Large initials */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                animate={{
                  opacity: isExpanded ? 0.18 : 0.06,
                  scale: isExpanded ? 1.05 : 1,
                }}
                transition={{ duration: 0.6 }}
                className="text-[6rem] md:text-[7rem] lg:text-[8rem] font-extralight text-white select-none tracking-[0.08em]"
              >
                {member.initials}
              </motion.span>
            </div>

            {/* Subtle dot grid */}
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Expand glow */}
            <motion.div
              animate={{ opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 50%, rgba(0,212,170,0.08) 0%, transparent 65%)',
              }}
            />

            {/* Bottom gradient */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/3"
              style={{
                background:
                  'linear-gradient(to top, rgba(6,14,9,0.5) 0%, transparent 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main Export ──────────────────────────────────────────────── */

export default function TeamContent() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const introInView = useInView(introRef, { once: true })

  return (
    <section className="relative z-10 bg-[#060e09]">
      {/* ═══ ATMOSPHERIC DEPTH LAYERS ═══ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Teal orb — upper right */}
        <div
          style={{
            position: 'absolute',
            top: '-5%',
            right: '-8%',
            width: '55%',
            height: '50%',
            background: 'radial-gradient(ellipse at center, rgba(0,212,170,0.06) 0%, rgba(22,74,50,0.03) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Amber orb — mid left */}
        <div
          style={{
            position: 'absolute',
            top: '25%',
            left: '-10%',
            width: '45%',
            height: '40%',
            background: 'radial-gradient(ellipse at center, rgba(180,130,55,0.05) 0%, rgba(180,130,55,0.02) 35%, transparent 65%)',
            filter: 'blur(50px)',
          }}
        />
        {/* Deep green glow — center */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '30%',
            width: '50%',
            height: '45%',
            background: 'radial-gradient(ellipse at center, rgba(13,80,50,0.07) 0%, rgba(6,14,9,0.03) 40%, transparent 70%)',
            filter: 'blur(55px)',
          }}
        />
        {/* Teal accent — lower right */}
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: '40%',
            height: '35%',
            background: 'radial-gradient(ellipse at center, rgba(0,212,170,0.04) 0%, transparent 60%)',
            filter: 'blur(45px)',
          }}
        />
        {/* Subtle vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 35%, rgba(6,14,9,0.35) 100%)',
          }}
        />
      </div>

      {/* ═══ CINEMATIC INTRO — clean typographic hero ═══ */}
      <div
        ref={introRef}
        className="relative min-h-[100vh] grid place-items-center overflow-hidden"
      >
        <div className="relative z-10 text-center px-6 max-w-[1200px] pt-28 md:pt-16">
          {/* Badge with pulsing glow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-10 md:mb-14"
          >
            <span className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.3em] text-white/35 font-medium">
              <motion.span
                animate={{
                  textShadow: [
                    '0 0 8px rgba(0,212,170,0)',
                    '0 0 14px rgba(0,212,170,0.6)',
                    '0 0 8px rgba(0,212,170,0)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-[#00d4aa]/70"
              >
                ✦
              </motion.span>
              Our People
            </span>
          </motion.div>

          {/* Line 1: bold */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '130%', opacity: 0 }}
              animate={introInView ? { y: '0%', opacity: 1 } : {}}
              transition={{
                duration: 1.2,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h1
                className="text-[clamp(2.8rem,7.5vw,6.5rem)] font-bold text-white/95 leading-[1.0] tracking-[-0.035em]"
                style={{ textShadow: '0 0 80px rgba(255,255,255,0.06)' }}
              >
                The architecture
              </h1>
            </motion.div>
          </div>

          {/* Line 2: gradient italic */}
          <div className="overflow-hidden mt-1">
            <motion.div
              initial={{ y: '130%', opacity: 0 }}
              animate={introInView ? { y: '0%', opacity: 1 } : {}}
              transition={{
                duration: 1.2,
                delay: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h1
                className="text-[clamp(2.8rem,7.5vw,6.5rem)] font-extralight italic leading-[1.0] tracking-[-0.02em]"
                style={{
                  background:
                    'linear-gradient(95deg, rgba(255,255,255,0.35) 0%, rgba(0,212,170,0.55) 40%, rgba(200,230,78,0.45) 70%, rgba(255,255,255,0.25) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 40px rgba(0,212,170,0.1))',
                }}
              >
                behind the intelligence.
              </h1>
            </motion.div>
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="mt-8 md:mt-10 text-[15px] md:text-[17px] leading-[1.75] font-light text-white/35 max-w-[540px] mx-auto"
          >
            Eight distinct wavelengths. One shared frequency — building
            intelligence that respects the humans who use it.
          </motion.p>

          {/* Count indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={introInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-14 md:mt-20 flex items-center justify-center gap-4"
          >
            <span className="text-[12px] font-light tracking-[0.25em] text-[#00d4aa]/30">
              01
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={introInView ? { scaleX: 1 } : {}}
              transition={{
                duration: 1.4,
                delay: 1.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-20 h-[1px] origin-left"
              style={{
                background:
                  'linear-gradient(90deg, rgba(0,212,170,0.4) 0%, rgba(200,230,78,0.3) 50%, rgba(0,212,170,0.15) 100%)',
              }}
            />
            <span className="text-[12px] font-light tracking-[0.25em] text-white/18">
              08
            </span>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={introInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="mt-16 md:mt-24"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-[1px] h-8 mx-auto bg-gradient-to-b from-white/15 to-transparent"
            />
          </motion.div>
        </div>
      </div>

      {/* ═══ TEAM ROSTER — click-to-expand rows ═══ */}
      <div className="relative pb-20 md:pb-36">
        {TEAM.map((member, index) => (
          <MemberRow
            key={member.initials}
            member={member}
            index={index}
            isExpanded={expandedIndex === index}
            onToggle={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
          />
        ))}

        {/* Final separator */}
        <div className="px-6 md:px-[calc(12.5vw+0.8rem)]">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </div>
      </div>

    </section>
  )
}
