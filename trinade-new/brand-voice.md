# Brand Voice & Design Language — New Website

## Visual Tone
- Premium, cinematic, intentional — every element earns its place
- Warm charcoal/cream/gold palette — editorial luxury feel
- Generous whitespace — let elements breathe
- Typography-driven hierarchy: large light headlines (weight 300), delicate body text
- Motion as storytelling: animations reveal content, not decorate it

## Typography Rules
- **Font family**: Manrope — semi-geometric sans-serif, unified across all contexts
- **Hero headlines**: Large, light (weight 300), tight letter-spacing (-0.03em). Uses `clamp(3.5rem, 7vw, 7.5rem)`
- **Section headlines**: Weight 300, `clamp(2.4rem, 4.8vw, 4.2rem)`
- **Body text**: Weight 400, high line-height (1.8), 55% opacity
- **Eyebrow labels**: 12px, uppercase, tracking 0.2em, weight 600, gold (#c9a86e)
- **Trinade wordmark**: 28px, weight 800, -0.03em tracking, uppercase "TRINADE"
- No Inter, Roboto, Arial, or generic system fonts — Manrope is the brand typeface

## Color System
- **Cream backgrounds**: #f2ede6 (body/primary), #ebe5db (alternate sections)
- **Dark text**: #2a2218 at varying opacities (100% headlines, 55% body, 40% tertiary)
- **Charcoal dark**: #1a1a1e (newsletter, dark sections), #0a0a0a (mission, values, CTA, footer)
- **Gold accent**: #c9a86e (primary gold), #d4bb8a (light gold), #a0814a (dark gold)
- **Gold glass**: Various gold-tinted transparent layers for glassmorphism
- **White opacities** (on dark): 93% headlines, 45% body, 25% tertiary
- **NO teal, NO green, NO purple** — strictly warm charcoal/cream/gold

## Animation Principles
- **Entrance**: Elements reveal with opacity + y-translation (Motion v12 `useInView`)
- **Scroll-triggered**: `useInView` with `once: true` and negative margins
- **Gold rules**: `scaleX: 0 → 1` decorative line reveals
- **Hover**: Subtle border color shifts, box-shadow intensification, scale on images
- **Staggered text**: Word-by-word reveal for hero headlines with 0.06s stagger
- **Easing**: `[0.16, 1, 0.3, 1]` (cinematic reveals), `[0.22, 1, 0.36, 1]` (text), `[0.32, 0.72, 0, 1]` (UI)
- **Duration**: 0.3s UI feedback, 0.85-1s section reveals, 1.2s hero entrance

## Component Patterns
- **Gold glass pill**: `GoldPill` — small eyebrow labels with gold-tinted glass background
- **Gold rule**: Animated `scaleX` line with gradient (transparent → gold → transparent)
- **Premium cursor**: White radial gradient circle, mix-blend-mode difference, lerp follow
- **Glass cards**: Light = white/65% gradient; Dark = white/4% with subtle border
- **Article cards**: Gradient mesh image placeholders, hover border/shadow transitions
- **Section layout**: Full-width sections with `clamp()` padding, max-width constraints
- **Grain overlay**: SVG noise texture at 3-5% opacity for atmosphere
- **Atmospheric orbs**: Radial gradient blobs with blur(60-80px) for depth

## Content Voice (for when real copy is added)
- Confident, not boastful
- Technical precision, not jargon soup
- Forward-looking, not hype-driven
- Human-centered AI — intelligence augmentation, not replacement
- Short, punchy sentences. No filler paragraphs.

## Anti-patterns
- Never: teal/green accents (that's the OLD site)
- Never: gradient text (except "Est 2021" shimmer and footer TRINADE marquee which are intentional)
- Never: neon glows, generic "AI brain" imagery, stock photos
- Never: bouncy/playful animations on a premium corporate site
- Never: walls of text without visual hierarchy
- Never: Inter, Roboto, Space Grotesk, or generic fonts
- Never: more than 2 animation types happening simultaneously in viewport
- Never: native `<select>` dropdowns — use custom styled components
