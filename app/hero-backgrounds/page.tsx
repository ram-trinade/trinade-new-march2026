'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

/* ─── SHARED COMPONENTS ──────────────────────────────────── */

function VariantLabel({ num, title, description }: { num: string; title: string; description: string }) {
  return (
    <div className="absolute top-8 left-8 z-20">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[11px] font-bold tracking-[0.2em] text-white/30 uppercase bg-white/[0.06] backdrop-blur-sm px-3 py-1 rounded-full border border-white/[0.08]">
          {num}
        </span>
        <span className="text-[13px] font-semibold tracking-[0.08em] text-white/60 uppercase">
          {title}
        </span>
      </div>
      <p className="text-[12px] text-white/30 max-w-[320px] leading-relaxed">{description}</p>
    </div>
  )
}

function HeroText() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div className="text-center px-8">
        <h1
          className="text-[clamp(3.5rem,8vw,8rem)] font-bold leading-[1.05] tracking-[-0.035em] text-white mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Built for What&apos;s Next.
        </h1>
        <p className="text-[17px] md:text-[19px] leading-[1.7] font-normal text-white/55 max-w-[580px] mx-auto">
          From intelligent products to enterprise services — engineered
          thoughtfully, delivered confidently, everywhere it ships.
        </p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   VARIATION 1: AURORA SWIRL
   Inspired by Image 1 — bold swirling green-yellow forms on black
   ═══════════════════════════════════════════════════════════════ */

function Variation1() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <VariantLabel
        num="01"
        title="Aurora Swirl"
        description="Bold swirling green-yellow-lime forms on deep black. High contrast, dramatic, silk-like specular quality."
      />

      {/* Base deep green gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 120% 100% at 50% 60%, #0a1a0f 0%, #020804 100%)',
        }}
      />

      {/* Primary swirl — large lime-green orb, upper center */}
      <div
        className="absolute"
        style={{
          top: '-15%',
          left: '15%',
          width: '80%',
          height: '90%',
          background: 'radial-gradient(ellipse 70% 55% at 55% 50%, rgba(140,200,60,0.45) 0%, rgba(80,160,40,0.2) 30%, transparent 65%)',
          filter: 'blur(60px)',
          transform: 'rotate(-15deg)',
        }}
      />

      {/* Secondary swirl — teal accent, lower right */}
      <div
        className="absolute"
        style={{
          bottom: '-10%',
          right: '-5%',
          width: '65%',
          height: '70%',
          background: 'radial-gradient(ellipse 60% 50% at 40% 45%, rgba(0,212,170,0.3) 0%, rgba(0,120,90,0.12) 35%, transparent 60%)',
          filter: 'blur(50px)',
          transform: 'rotate(10deg)',
        }}
      />

      {/* Amber warm streak — echoing the ribbon animation */}
      <div
        className="absolute"
        style={{
          top: '25%',
          left: '30%',
          width: '55%',
          height: '40%',
          background: 'radial-gradient(ellipse 80% 30% at 50% 50%, rgba(200,180,80,0.18) 0%, rgba(180,130,55,0.08) 40%, transparent 70%)',
          filter: 'blur(40px)',
          transform: 'rotate(-25deg)',
        }}
      />

      {/* Bright lime center highlight */}
      <div
        className="absolute"
        style={{
          top: '15%',
          left: '25%',
          width: '50%',
          height: '45%',
          background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(200,230,78,0.25) 0%, rgba(140,200,60,0.1) 35%, transparent 60%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Deep shadow cuts — creating the swirl negative space */}
      <div
        className="absolute"
        style={{
          top: '20%',
          left: '40%',
          width: '40%',
          height: '50%',
          background: 'radial-gradient(ellipse 60% 35% at 50% 50%, rgba(0,0,0,0.7) 0%, transparent 55%)',
          filter: 'blur(35px)',
          transform: 'rotate(-30deg)',
        }}
      />
      <div
        className="absolute"
        style={{
          top: '50%',
          left: '10%',
          width: '45%',
          height: '40%',
          background: 'radial-gradient(ellipse 55% 40% at 50% 50%, rgba(0,0,0,0.55) 0%, transparent 50%)',
          filter: 'blur(30px)',
          transform: 'rotate(15deg)',
        }}
      />

      {/* Green edge glow — top right corner accent */}
      <div
        className="absolute"
        style={{
          top: '-5%',
          right: '-5%',
          width: '35%',
          height: '35%',
          background: 'radial-gradient(circle at 70% 30%, rgba(60,180,80,0.35) 0%, transparent 55%)',
          filter: 'blur(25px)',
        }}
      />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 75% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      <HeroText />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   VARIATION 2: SOFT EMANATION
   Inspired by Image 2 — single soft green glow, heavy grain, cinematic
   ═══════════════════════════════════════════════════════════════ */

function Variation2() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#020603]">
      <VariantLabel
        num="02"
        title="Soft Emanation"
        description="Minimal single soft green glow on pure black. Heavy grain texture. Cinematic, moody, atmospheric."
      />

      {/* Primary soft glow — upper center-left */}
      <div
        className="absolute"
        style={{
          top: '5%',
          left: '15%',
          width: '65%',
          height: '65%',
          background: 'radial-gradient(ellipse 55% 50% at 50% 45%, rgba(120,190,80,0.35) 0%, rgba(80,150,50,0.15) 30%, rgba(40,100,30,0.06) 50%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Inner bright core — yellow-green */}
      <div
        className="absolute"
        style={{
          top: '12%',
          left: '25%',
          width: '40%',
          height: '35%',
          background: 'radial-gradient(ellipse 50% 45% at 50% 50%, rgba(180,220,100,0.2) 0%, rgba(140,190,70,0.08) 40%, transparent 65%)',
          filter: 'blur(25px)',
        }}
      />

      {/* Very subtle teal hint at bottom */}
      <div
        className="absolute"
        style={{
          bottom: '5%',
          right: '20%',
          width: '40%',
          height: '30%',
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,170,0.04) 0%, transparent 60%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Subtle amber warmth — matching hero ribbons */}
      <div
        className="absolute"
        style={{
          top: '35%',
          left: '35%',
          width: '30%',
          height: '25%',
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(180,130,55,0.06) 0%, transparent 60%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Heavy grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '160px 160px',
        }}
      />

      {/* Deep vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 60% at 40% 35%, transparent 20%, rgba(2,6,3,0.8) 100%)',
        }}
      />

      <HeroText />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   VARIATION 3: SILK FOLD
   Inspired by Image 3 — smooth gradient with diagonal fold/crease
   ═══════════════════════════════════════════════════════════════ */

function Variation3() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#1a3a1f]">
      <VariantLabel
        num="03"
        title="Silk Fold"
        description="Smooth green gradient with a diagonal fold creating depth. Fabric-like material quality, light sage to forest green."
      />

      {/* Base gradient — light bottom-left to dark top-right */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #8ab545 0%, #5a9a35 25%, #2d6e28 50%, #194a1c 75%, #0a2a10 100%)',
        }}
      />

      {/* Diagonal fold highlight — bright crease line */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, transparent 42%, rgba(180,220,100,0.35) 48%, rgba(200,240,120,0.15) 50%, rgba(140,190,60,0.08) 52%, transparent 58%)',
        }}
      />

      {/* Dark shadow below the fold */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, transparent 48%, rgba(10,30,12,0.45) 53%, rgba(10,30,12,0.25) 58%, transparent 68%)',
        }}
      />

      {/* Light pool — upper area where fabric catches light */}
      <div
        className="absolute"
        style={{
          top: '-10%',
          left: '-10%',
          width: '70%',
          height: '70%',
          background: 'radial-gradient(ellipse 65% 60% at 50% 50%, rgba(160,210,80,0.25) 0%, rgba(120,180,60,0.1) 40%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Deep shadow pool — lower right */}
      <div
        className="absolute"
        style={{
          bottom: '-5%',
          right: '-5%',
          width: '55%',
          height: '55%',
          background: 'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(6,14,9,0.5) 0%, transparent 60%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Teal accent hint in the fold */}
      <div
        className="absolute"
        style={{
          top: '40%',
          left: '40%',
          width: '30%',
          height: '20%',
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,212,170,0.08) 0%, transparent 60%)',
          filter: 'blur(20px)',
          transform: 'rotate(-45deg)',
        }}
      />

      {/* Amber warmth in highlight zone */}
      <div
        className="absolute"
        style={{
          top: '20%',
          left: '15%',
          width: '35%',
          height: '25%',
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(200,180,80,0.06) 0%, transparent 60%)',
          filter: 'blur(25px)',
        }}
      />

      {/* Subtle grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Soft vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 75% at 40% 40%, transparent 35%, rgba(8,20,10,0.45) 100%)',
        }}
      />

      <HeroText />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   VARIATION 4: NEBULA
   Multi-orb scattered green tones — teal, lime, forest — gaseous feel
   ═══════════════════════════════════════════════════════════════ */

function Variation4() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#030907]">
      <VariantLabel
        num="04"
        title="Nebula"
        description="Multiple soft gradient orbs in teal, lime, and forest green. Gaseous, scattered, deep space-like depth."
      />

      {/* Forest green cloud — center-right */}
      <div
        className="absolute"
        style={{
          top: '10%',
          right: '5%',
          width: '55%',
          height: '50%',
          background: 'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(40,120,60,0.3) 0%, rgba(20,80,40,0.12) 35%, transparent 60%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Teal cloud — lower-left */}
      <div
        className="absolute"
        style={{
          bottom: '5%',
          left: '5%',
          width: '50%',
          height: '45%',
          background: 'radial-gradient(ellipse 55% 50% at 50% 50%, rgba(0,180,140,0.22) 0%, rgba(0,120,90,0.08) 40%, transparent 60%)',
          filter: 'blur(45px)',
        }}
      />

      {/* Lime accent — upper-left */}
      <div
        className="absolute"
        style={{
          top: '5%',
          left: '10%',
          width: '40%',
          height: '35%',
          background: 'radial-gradient(ellipse 50% 45% at 50% 50%, rgba(200,230,78,0.18) 0%, rgba(160,200,60,0.06) 40%, transparent 60%)',
          filter: 'blur(35px)',
        }}
      />

      {/* Amber cloud — center, warm node matching ribbons */}
      <div
        className="absolute"
        style={{
          top: '30%',
          left: '30%',
          width: '40%',
          height: '35%',
          background: 'radial-gradient(ellipse 50% 45% at 50% 50%, rgba(180,130,55,0.12) 0%, rgba(200,160,60,0.04) 40%, transparent 60%)',
          filter: 'blur(35px)',
        }}
      />

      {/* Deep green core — provides depth */}
      <div
        className="absolute"
        style={{
          top: '20%',
          left: '25%',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(ellipse 45% 40% at 50% 50%, rgba(15,60,35,0.35) 0%, transparent 55%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Bright teal point — accent spark */}
      <div
        className="absolute"
        style={{
          top: '35%',
          right: '25%',
          width: '15%',
          height: '15%',
          background: 'radial-gradient(circle at 50% 50%, rgba(0,212,170,0.2) 0%, transparent 55%)',
          filter: 'blur(15px)',
        }}
      />

      {/* Small lime spark — lower right */}
      <div
        className="absolute"
        style={{
          bottom: '25%',
          right: '15%',
          width: '12%',
          height: '12%',
          background: 'radial-gradient(circle at 50% 50%, rgba(200,230,78,0.15) 0%, transparent 55%)',
          filter: 'blur(12px)',
        }}
      />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 65% at 50% 50%, transparent 25%, rgba(3,9,7,0.7) 100%)',
        }}
      />

      <HeroText />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   VARIATION 5: GRADIENT MESH
   Complex multi-point layered gradient — abstract, rich depth
   ═══════════════════════════════════════════════════════════════ */

function Variation5() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#050d08]">
      <VariantLabel
        num="05"
        title="Gradient Mesh"
        description="Complex multi-point gradient mesh. Layered greens with amber warmth creating rich, abstract depth. Closest to existing WebGL aesthetic."
      />

      {/* Base teal-dark gradient matching existing bg */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(170deg, #060e09 0%, #0a1a12 30%, #0d2218 55%, #081510 80%, #060e09 100%)',
        }}
      />

      {/* Primary green glow — center-right, matching hero shader bgLight */}
      <div
        className="absolute"
        style={{
          top: '10%',
          right: '5%',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(ellipse 55% 50% at 50% 50%, rgba(18,64,41,0.6) 0%, rgba(13,49,31,0.25) 35%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Amber ribbon echo — diagonal warm streak */}
      <div
        className="absolute"
        style={{
          top: '15%',
          left: '20%',
          width: '65%',
          height: '40%',
          background: 'radial-gradient(ellipse 80% 20% at 50% 50%, rgba(180,130,55,0.15) 0%, rgba(210,175,110,0.06) 40%, transparent 65%)',
          filter: 'blur(30px)',
          transform: 'rotate(-18deg)',
        }}
      />

      {/* Second amber streak — lower, softer */}
      <div
        className="absolute"
        style={{
          top: '35%',
          left: '15%',
          width: '70%',
          height: '35%',
          background: 'radial-gradient(ellipse 75% 18% at 50% 50%, rgba(200,180,80,0.1) 0%, rgba(180,130,55,0.04) 40%, transparent 60%)',
          filter: 'blur(25px)',
          transform: 'rotate(-22deg)',
        }}
      />

      {/* Teal accent glow — lower right, matching #00d4aa */}
      <div
        className="absolute"
        style={{
          bottom: '10%',
          right: '15%',
          width: '45%',
          height: '40%',
          background: 'radial-gradient(ellipse 50% 45% at 50% 50%, rgba(0,212,170,0.08) 0%, rgba(0,140,110,0.03) 40%, transparent 60%)',
          filter: 'blur(35px)',
        }}
      />

      {/* Lime accent — upper left, #c8e64e influence */}
      <div
        className="absolute"
        style={{
          top: '5%',
          left: '5%',
          width: '35%',
          height: '30%',
          background: 'radial-gradient(ellipse 55% 50% at 50% 50%, rgba(200,230,78,0.06) 0%, transparent 55%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Bright green light spot — matching hero shader glow */}
      <div
        className="absolute"
        style={{
          bottom: '15%',
          right: '25%',
          width: '30%',
          height: '30%',
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(20,80,50,0.35) 0%, rgba(10,50,30,0.12) 40%, transparent 60%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Warm light spot — upper area, ambient */}
      <div
        className="absolute"
        style={{
          top: '15%',
          left: '55%',
          width: '25%',
          height: '25%',
          background: 'radial-gradient(circle at 50% 50%, rgba(130,100,40,0.1) 0%, transparent 55%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Grain overlay — matching footer-atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 75% 65% at 55% 45%, transparent 30%, rgba(6,14,9,0.55) 100%)',
        }}
      />

      <HeroText />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════════════════════════ */

export default function HeroBackgroundsPage() {
  return (
    <div>
      {/* Intro */}
      <div className="h-[40vh] bg-[#060e09] flex items-center justify-center">
        <div className="text-center px-8">
          <p className="text-[11px] tracking-[0.3em] text-[#00d4aa]/60 uppercase font-semibold mb-4">
            ✦ Hero Background Concepts
          </p>
          <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white/90 tracking-[-0.03em] mb-3">
            Green Gradient Direction
          </h1>
          <p className="text-[15px] text-white/40 max-w-[500px] mx-auto leading-relaxed">
            5 distinct hero backgrounds inspired by the green gradient references.
            Each matches the hero animation color palette.
          </p>
        </div>
      </div>

      <Variation1 />
      <Variation2 />
      <Variation3 />
      <Variation4 />
      <Variation5 />
    </div>
  )
}
