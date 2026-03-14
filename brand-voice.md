# Brand Voice & Design Language

## Visual Tone
- Premium, cinematic, intentional — every element earns its place
- Dark palette with high-contrast typography and selective accent color (#00d4aa teal)
- Generous whitespace — let elements breathe
- Typography-driven hierarchy: large bold headlines, delicate body text
- Motion as storytelling: animations reveal content, not decorate it
- Any of these could change later, but first point is the focus

## Typography Rules
- **Font family**: Manrope — semi-geometric sans-serif, unified across all contexts (headings, body, nav, UI)
- **Headlines**: Large, bold (weight 700), tight letter-spacing (-0.035em). Hero uses `clamp(3.5rem, 8vw, 8rem)`
- **Sub-headlines**: Light weight (300-400), `text-[16px] lg:text-[18px]`, `text-white/55`
- **Body text**: Weight 400, high line-height (1.6+), subtle opacity (45-70%)
- **Nav/UI text**: `text-[13px]`, uppercase, `tracking-[0.06em]`, `font-semibold`
- **Dropdown titles**: `text-[15px]`, weight 500, dark text on white glass
- **Dropdown descriptions**: `text-[12px]`, `leading-snug`, muted color
- **Section badges**: `text-sm`, uppercase, `tracking-[0.08em]`, teal (#00d4aa) with sparkle ✦
- **Footer TRINADE**: `text-[15vw]`, bold, `tracking-[0.08em]`, wide-set characters
- No Inter or generic system fonts — Manrope is the brand typeface

## Color System
- **Light background**: Warm cream/off-white (#e8e4de body bg, #f5f3ef section wrappers)
- **Light text**: Near-black #1a1f1a at varying opacities (95% headlines, 45-70% body, 30-40% tertiary)
- **Dark background**: Deep dark greens/blacks (#060e09 primary, #0a1a14 for panels/dropdowns)
- **Dark text**: White at varying opacities (95% headlines, 55-70% body, 30-45% tertiary/placeholders)
- **Accent — Teal**: #00d4aa — badges, focus states, selected items, links, hover borders, CTA button bg
- **Accent — Lime**: #c8e64e — used sparingly in decorative SVGs and some hover glows
- **Accent — Amber**: #b48237 — decorative SVG elements (warm contrast)
- **Navbar glass**: White at 52-72% opacity with `backdrop-blur-[28-36px]` + `saturate(1.4)` for frosted white glass
- **Dropdown glass**: White at 60% opacity with `backdrop-blur-[28px]` + `saturate(1.4)` — warm off-white `bg-[#f5f2ee]/90` as fallback
- **Form inputs**: `bg-white/[0.04]` with `border-white/[0.08]`, focus: `border-[#00d4aa]/40`
- **CTA primary**: Teal bg `bg-[#00d4aa]` with dark text `text-[#060e09]` (contact form submit)
- **CTA secondary**: Glassmorphic `bg-white/[0.08]` with white text (hero "Book a Demo")

## Animation Principles
- **Entrance**: Elements reveal from below with opacity fade (Motion v12 `useInView`)
- **Scroll-driven**: Navbar glass property animation (GSAP ScrollTrigger)
- **Reveal**: White SVG mask expands to reveal hero content, border fades on scroll
- **Hover**: Subtle scale, translate, glow, or bg-color shift — never jarring
- **Dropdown open**: Cinematic blur-in (`filter: blur(8px)→blur(0px)`), staggered item reveals
- **Easing**: Custom cubic-bezier curves, never linear. `[0.25, 0.0, 0.15, 1]` for hero reveals, `[0.25, 0.1, 0.25, 1]` for UI, `[0.16, 1, 0.3, 1]` for cinematic dropdowns
- **Duration**: 0.2-0.3s for UI feedback, 0.6-0.8s for section reveals, 1.0-2.0s for hero entrance
- **Counters**: Ease-out cubic animation on scroll-into-view for stats numbers

## Component Patterns
- **Glassmorphic navbar**: White frosted pill with dark text, `rounded-full`, GSAP-animated glass properties
- **Glassmorphic dropdowns**: White frosted split panels with decorative SVG images, `rounded-2xl`, dark text on light glass
- **Form inputs**: Dark glassmorphic `bg-white/[0.04]`, `rounded-xl`, teal focus border
- **Section badges**: Teal text with ✦ sparkle, uppercase tracking
- **Split-tone headlines**: Primary text `text-white/95` + secondary text `text-white/40`
- **Cards**: `bg-white/[0.03]` with `border-white/[0.06]`, `rounded-2xl`, hover bg intensifies
- **Buttons**: Rounded-full pills with text + icon. Teal bg for primary, glassmorphic for secondary.
- **Section padding**: `px-[calc(12.5vw+0.8rem)]` to align with navbar pill edges
- **Max content width**: `max-w-[1400px] mx-auto` within padded container

## Content Voice (for when real copy is added)
- Confident, not boastful
- Technical precision, not jargon soup
- Forward-looking, not hype-driven
- Human-centered AI — intelligence augmentation, not replacement
- Short, punchy sentences. No filler paragraphs.

## Anti-patterns
- Never: gradient text, neon glows, generic "AI brain" imagery, stock photos
- Never: bouncy/playful animations on a premium corporate site
- Never: walls of text without visual hierarchy
- Never: default Tailwind colors or spacing without intentional design decisions
- Never: more than 2 animation types happening simultaneously in viewport
- Never: native `<select>` dropdowns in dark theme forms (use custom components instead)
