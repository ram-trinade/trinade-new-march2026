'use client'

import {
  Cormorant_Garamond,
  Playfair_Display,
  Libre_Baskerville,
  DM_Sans,
  Outfit,
  Manrope,
  Sora,
  Raleway,
  Josefin_Sans,
  Poppins,
} from 'next/font/google'

// ---------------------------------------------------------------------------
// Font imports — each with a CSS variable for scoped application
// ---------------------------------------------------------------------------

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant-garamond',
  weight: ['300', '400', '500', '600', '700'],
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
  weight: ['400', '500', '600', '700'],
})

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-libre-baskerville',
  weight: ['400', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600', '700'],
})

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700'],
})

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600', '700'],
})

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
  weight: ['300', '400', '500', '600', '700'],
})

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
  weight: ['300', '400', '500', '600', '700'],
})

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-josefin-sans',
  weight: ['300', '400', '500', '600', '700'],
})

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
})

// ---------------------------------------------------------------------------
// Font configuration
// ---------------------------------------------------------------------------

interface FontConfig {
  name: string
  category: string
  variableClass: string
  cssVar: string
  description: string
}

const fonts: FontConfig[] = [
  {
    name: 'Cormorant Garamond',
    category: 'Elegant Serif',
    variableClass: cormorantGaramond.variable,
    cssVar: 'var(--font-cormorant-garamond)',
    description: 'High-contrast display serif with a luxury fashion feel. Inspired by Garamond with exaggerated proportions.',
  },
  {
    name: 'Playfair Display',
    category: 'Editorial Serif',
    variableClass: playfairDisplay.variable,
    cssVar: 'var(--font-playfair-display)',
    description: 'Transitional serif with sharp contrasts and elegant hairlines. Perfect for editorial luxury.',
  },
  {
    name: 'Libre Baskerville',
    category: 'Classic Serif',
    variableClass: libreBaskerville.variable,
    cssVar: 'var(--font-libre-baskerville)',
    description: 'Refined web-optimized Baskerville revival. Classic British typography with excellent readability.',
  },
  {
    name: 'DM Sans',
    category: 'Geometric Sans-Serif',
    variableClass: dmSans.variable,
    cssVar: 'var(--font-dm-sans)',
    description: 'Low-contrast geometric sans with generous optical sizing. Clean, modern, and highly versatile.',
  },
  {
    name: 'Outfit',
    category: 'Geometric Sans-Serif',
    variableClass: outfit.variable,
    cssVar: 'var(--font-outfit)',
    description: 'Variable geometric sans-serif with clean lines and subtle character. A modern workhorse.',
  },
  {
    name: 'Manrope',
    category: 'Semi-Geometric Sans-Serif',
    variableClass: manrope.variable,
    cssVar: 'var(--font-manrope)',
    description: 'Optical sizing and semi-rounded terminals give it a very refined, premium feel across all sizes.',
  },
  {
    name: 'Sora',
    category: 'Geometric Sans-Serif',
    variableClass: sora.variable,
    cssVar: 'var(--font-sora)',
    description: 'Slightly futuristic geometric with open apertures. Currently used as the body font for Trinade.',
  },
  {
    name: 'Raleway',
    category: 'Elegant Sans-Serif',
    variableClass: raleway.variable,
    cssVar: 'var(--font-raleway)',
    description: 'Thin, elegant sans-serif with beautiful light weights. Ideal for luxury branding and headlines.',
  },
  {
    name: 'Josefin Sans',
    category: 'Art Deco Sans-Serif',
    variableClass: josefinSans.variable,
    cssVar: 'var(--font-josefin-sans)',
    description: 'Geometric with art deco character. Light weights feel luxurious and airy with vintage elegance.',
  },
  {
    name: 'Poppins',
    category: 'Geometric Sans-Serif',
    variableClass: poppins.variable,
    cssVar: 'var(--font-poppins)',
    description: 'Slightly rounded geometric with a premium, friendly feel. Extremely popular for modern interfaces.',
  },
]

// ---------------------------------------------------------------------------
// Sample text constants
// ---------------------------------------------------------------------------

const HEADLINE = 'Pioneering AI for a Sustainable Future'
const SUBHEADLINE = 'Where Technology Meets Human Potential'
const BODY =
  'We build intelligent systems that understand context, anticipate needs, and deliver transformative outcomes for enterprises worldwide.'
const SMALL = '\u00A9 2026 Trinade AI Technologies Pvt. Ltd.'
const NAV = 'PRODUCTS  SOLUTIONS  RESOURCES  COMPANY'

// ---------------------------------------------------------------------------
// Component: FontCard
// ---------------------------------------------------------------------------

function FontCard({ font, index }: { font: FontConfig; index: number }) {
  return (
    <section
      className={`${font.variableClass} rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 md:p-12 transition-colors hover:border-white/[0.14] hover:bg-white/[0.035]`}
      style={{ fontFamily: font.cssVar }}
    >
      {/* Header: number + name + category */}
      <div className="mb-10 flex flex-col gap-3 border-b border-white/[0.07] pb-8">
        <div className="flex items-baseline gap-4">
          <span
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/30"
            style={{ fontFamily: 'var(--font-sora), ui-sans-serif, system-ui, sans-serif' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <h2
            className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
            style={{ fontFamily: font.cssVar }}
          >
            {font.name}
          </h2>
          <span
            className="ml-auto rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-white/40"
            style={{ fontFamily: 'var(--font-sora), ui-sans-serif, system-ui, sans-serif' }}
          >
            {font.category}
          </span>
        </div>
        <p
          className="max-w-2xl text-sm leading-relaxed text-white/35"
          style={{ fontFamily: 'var(--font-sora), ui-sans-serif, system-ui, sans-serif' }}
        >
          {font.description}
        </p>
      </div>

      {/* Samples grid */}
      <div className="space-y-10">
        {/* Headline — 48-64px */}
        <div className="space-y-2">
          <Label>Headline &mdash; 56px / Weight 600</Label>
          <p
            className="text-[56px] font-semibold leading-[1.08] tracking-tight text-white"
            style={{ fontFamily: font.cssVar }}
          >
            {HEADLINE}
          </p>
        </div>

        {/* Sub-headline — 24-32px */}
        <div className="space-y-2">
          <Label>Sub-headline &mdash; 28px / Weight 500</Label>
          <p
            className="text-[28px] font-medium leading-snug tracking-[-0.01em] text-white/85"
            style={{ fontFamily: font.cssVar }}
          >
            {SUBHEADLINE}
          </p>
        </div>

        {/* Body text — 14-16px */}
        <div className="space-y-2">
          <Label>Body &mdash; 16px / Weight 400</Label>
          <p
            className="max-w-3xl text-[16px] font-normal leading-relaxed text-white/60"
            style={{ fontFamily: font.cssVar }}
          >
            {BODY}
          </p>
        </div>

        {/* Two-column row for small text and nav */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Small / Footer text — 12px */}
          <div className="space-y-2">
            <Label>Small / Footer &mdash; 12px / Weight 400</Label>
            <p
              className="text-[12px] font-normal leading-relaxed text-white/40"
              style={{ fontFamily: font.cssVar }}
            >
              {SMALL}
            </p>
          </div>

          {/* Nav sample — 13px uppercase tracking */}
          <div className="space-y-2">
            <Label>Nav Links &mdash; 13px / Uppercase / Weight 500</Label>
            <p
              className="text-[13px] font-medium uppercase tracking-[0.12em] text-white/50"
              style={{ fontFamily: font.cssVar }}
            >
              {NAV}
            </p>
          </div>
        </div>

        {/* Weight spectrum */}
        <div className="space-y-3 border-t border-white/[0.05] pt-8">
          <Label>Weight Spectrum &mdash; 24px</Label>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {[
              { weight: 300, label: 'Light' },
              { weight: 400, label: 'Regular' },
              { weight: 500, label: 'Medium' },
              { weight: 600, label: 'SemiBold' },
              { weight: 700, label: 'Bold' },
            ].map(({ weight, label }) => (
              <span
                key={weight}
                className="text-[24px] text-white/70"
                style={{ fontFamily: font.cssVar, fontWeight: weight }}
              >
                {label}
                <span className="ml-1.5 text-[11px] font-normal text-white/25">{weight}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Component: Label (tiny descriptor above each sample)
// ---------------------------------------------------------------------------

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/20"
      style={{ fontFamily: 'var(--font-sora), ui-sans-serif, system-ui, sans-serif' }}
    >
      {children}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function FontExplorePage() {
  return (
    <div className="min-h-screen bg-[#060e09] text-white">
      {/* Sticky header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#060e09]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
          <h1
            className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70"
            style={{ fontFamily: 'var(--font-sora), ui-sans-serif, system-ui, sans-serif' }}
          >
            Font Exploration &mdash; Trinade AI Technologies
          </h1>
          <span
            className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/30"
            style={{ fontFamily: 'var(--font-sora), ui-sans-serif, system-ui, sans-serif' }}
          >
            {fonts.length} Fonts
          </span>
        </div>
      </header>

      {/* Font cards */}
      <main className="mx-auto max-w-[1400px] space-y-6 px-4 py-10 md:px-8 md:py-16">
        {/* Intro blurb */}
        <div className="mb-8 max-w-2xl space-y-3 px-2">
          <p
            className="text-[13px] leading-relaxed text-white/40"
            style={{ fontFamily: 'var(--font-sora), ui-sans-serif, system-ui, sans-serif' }}
          >
            Comparing 10 professional, elegant typefaces for the Trinade brand identity.
            Each card shows the font at headline, sub-headline, body, footer, and navigation
            sizes with various weights. Scroll through to compare.
          </p>
        </div>

        {fonts.map((font, index) => (
          <FontCard key={font.name} font={font} index={index} />
        ))}

        {/* Bottom spacer */}
        <div className="pb-20" />
      </main>
    </div>
  )
}
