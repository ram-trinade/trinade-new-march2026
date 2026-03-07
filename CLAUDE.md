# Trinade AI Technologies — Corporate Website

## Project Overview
Awwwards-quality corporate website for Trinade AI Technologies Private Limited. Design-first approach — visual fidelity and motion design are the highest priority. Content is placeholder until design is locked.

## Tech Stack
- **Framework**: Next.js 15 App Router (`'use client'` for interactive components, `dynamic()` with `ssr: false` for WebGL)
- **Styling**: Tailwind CSS v4 (CSS-first config, `@layer base` for custom CSS, `@source` directives in globals.css)
- **3D**: React Three Fiber + drei (R3F) with custom GLSL shaders
- **Animation**: GSAP (ScrollTrigger for scroll-driven), Motion v12 (entry animations, AnimatePresence) — import from `'motion/react'`, NOT `'framer-motion'`
- **Scroll**: Lenis for smooth scrolling
- **Types**: TypeScript strict mode
- **Typography**: Manrope (single unified font, weights 200–800, CSS vars `--font-sans` and `--font-display` both point to Manrope)

## Quick Start
```bash
# Dev server on port 3005 (port 3000 occupied by other project)
# Use Claude Preview: preview_start with name "dev"
# Or manually: node node_modules/next/dist/bin/next dev --port 3005
# NOTE: Do NOT use --turbopack (crashes on Windows with nul path in PostCSS)
```

## Architecture
```
app/
  globals.css          # Tailwind v4 config + .nav-glass custom properties + @source directives + custom cursor + scrollbar hidden
  layout.tsx           # Root layout — Manrope font import, metadata
  page.tsx             # Homepage — Fixed WebGL bg + SmoothScroll wrapping Navigation + 6 sections + Footer
  contact/page.tsx     # Contact page — same structure: WebGL bg + Navigation + ContactContent + Footer
  logo-preview/        # Dev-only: comparing logo variations
  font-explore/        # Dev-only: 10 font options with sample text at all weights
  cursor-explore/      # Dev-only: 12 cursor style options with live hover preview
components/
  navigation.tsx       # 3-col grid navbar (Logo LEFT | Frosted pill CENTER [PRODUCTS, SOLUTIONS, RESOURCES↓, COMPANY↓] | "Get in touch" CTA RIGHT). GSAP ScrollTrigger animates glass properties. Shared dropdown state, white glassmorphic split panels.
  hero-content.tsx     # Centered hero: "Built for What's Next." (Manrope 700) + sub-headline + "Book a Demo" CTA
  hero-section.tsx     # Hero wrapper (100vh) + RevealAnimation
  logo.tsx             # Original Trinade logo (transparent PNG via next/image, 48px in navbar)
  organic-background.tsx  # R3F WebGL background with GLSL parametric curves (fixed full-viewport, shared across pages)
  reveal-animation.tsx    # SVG mask expansion animation + ScrollTrigger border fade (entranceComplete guard)
  smooth-scroll.tsx       # Lenis smooth scroll provider
  contact-content.tsx     # Contact form (glassmorphic inputs, custom CountryCodeDropdown with flags) + Join Our Community section
  footer.tsx              # Datawizz-inspired: Contact CTA + nav grid + giant "TRINADE" text + atmospheric layers + grain overlay
  trusted-by.tsx          # 6 placeholder partner logos (Meridian, Arclight, Novus, Helios, Veridian, Cortex)
  what-we-do.tsx          # 3 capability cards (AI-Native Products, Enterprise Intelligence, Modular Architecture)
  product-showcase.tsx    # 4 product cards bento grid (Trinade Core, Insight Engine, Connect API, Shield)
  stats-section.tsx       # 4 animated counters (500+, 99.9%, 2.4B+, 12ms) with scroll-triggered animation
  testimonials.tsx        # 3 quote cards with avatar initials
  loading-screen.tsx      # Legacy (unused, replaced by reveal-animation)
lib/
  shaders.ts           # GLSL vertex/fragment shaders for organic-background
  utils.ts             # Utility functions
public/
  logo-transparent.png # Original Trinade logo with transparent background (Sharp-processed)
  logo-variations/     # 5 SVG logo variations (user hasn't picked final yet)
```

## Design Philosophy
- **Awwwards-quality**: Every pixel matters. No generic AI aesthetics.
- **Design first, content second**: Use dummy/placeholder text. Lock visual design before finalizing copy.
- **Inspiration-driven**: We take inspiration from multiple award-winning sites. User has excellent design taste — trust their visual judgment.
- **Motion is key**: Smooth, intentional animations. GSAP for scroll-driven, Motion v12 for UI transitions.
- **Glassmorphism**: Navbar uses white frosted glass pill (`backdrop-blur`, `saturate`). Dropdowns match.
- **Dark aesthetic**: Deep green/black backgrounds (#060e09), white text at varying opacities, selective teal (#00d4aa) accent.

## Color Palette
- **Deep dark**: #060e09 (page bg), #0a1a14 (dropdown panels, form elements)
- **Teal accent**: #00d4aa (badges, focus states, selected items, links)
- **Lime accent**: #c8e64e (used sparingly, some hover glows)
- **Amber accent**: #b48237 (decorative SVG elements)
- **White opacities**: 95% (headlines), 55-70% (body), 30-45% (tertiary/placeholders)

## Critical Gotchas (from Session History)

### Tailwind v4
- All custom CSS MUST be wrapped in `@layer base {}` — un-layered CSS overrides Tailwind utilities
- Add `@source` directives for component directories: `@source "../components"`, `@source "../app"`, `@source "../lib"`
- Tailwind v4 uses CSS-first config (no tailwind.config.js)

### WebGL / R3F
- Use `dynamic(() => import(...), { ssr: false })` for any R3F component
- **WebGL Context Lost**: Repeated HMR rebuilds cause `THREE.WebGLRenderer: Context Lost` (white page). Fix: stop server → delete `.next/` → restart
- GLSL `smoothstep(edge0, edge1, x)`: edge0 MUST be < edge1, else undefined behavior
- Single WebGL canvas instance shared across all pages (fixed full-viewport at z-0)

### Motion v12
- Import from `'motion/react'`, NOT `'framer-motion'` (rebranded)
- Use `AnimatePresence` for exit animations (dropdowns, modals)
- `useInView` for scroll-triggered reveals on content sections

### GSAP
- When cleaning up ScrollTrigger instances, kill only YOUR instance (`st.kill()`), never `ScrollTrigger.getAll().forEach(t => t.kill())` — that kills ALL triggers including other components
- Nav glass properties (`--nav-bg`, `--nav-border`, `--nav-blur`, `--nav-shadow`) animated by ScrollTrigger. Note: `--nav-width` was REMOVED — pill width is now fluid.

### Alignment System
- **Master formula**: `px-[calc(12.5vw+0.8rem)]` — derived from nav `px-4` + pill `width: 75%` centered
- All sections (hero, what-we-do, products, stats, testimonials, contact, footer) use this padding
- Navbar uses `grid grid-cols-[1fr_auto_1fr]` with `min-w-0` on both `1fr` columns for true centering

### Navbar Structure
- 3-column CSS grid: Logo+Trinade LEFT | Frosted pill CENTER | "Get in touch" CTA RIGHT
- Pill contains 4 items: PRODUCTS, SOLUTIONS, RESOURCES (dropdown), COMPANY (dropdown)
- "Get in touch" CTA is OUTSIDE the pill (glassmorphic button, `justify-self-end`)
- Logo: 48px transparent PNG + "Trinade" text (24px, always visible, no hover reveal)
- Dropdowns: white frosted glass (`bg-white/[0.60]`, `backdrop-blur-[28px]`, `saturate(1.4)`)
- Both dropdowns are split two-panel layouts with decorative SVG images
- RESOURCES = Blog (text left, stacked article SVG right)
- COMPANY = About + Team (each with decorative network SVGs, 1px borders on images)
- Shared dropdown state: only one open at a time, 220ms close delay

### Reveal Animation
- SVG mask: white fill + expanding rounded-rect hole (border=12px, rx=24)
- Timeline: 0.4s hold → 1.8s expand → 0.3s settle (overshoot)
- `entranceComplete` flag: ScrollTrigger `onUpdate` guarded by `if (!entranceComplete) return`
- Border stays visible on landing, fades on scroll (25% of viewport distance)
- SVG uses explicit `100vw`/`100vh` with `overflow: hidden` (prevents extending page)
- Doesn't render in headless Chrome preview — works fine in real browser

### Contact Page
- Form inputs: `bg-white/[0.04] border-white/[0.08] rounded-xl` with focus `border-[#00d4aa]/40`
- Country code: custom `CountryCodeDropdown` React component (not native `<select>`)
  - Flag emojis + country name + dial code
  - Dark glassmorphic dropdown panel with AnimatePresence
  - Click-outside-to-close
- Subject: native `<select>` with dark bg options
- Message: 300 char max with live counter

### Windows / Dev Server
- Dev server: port 3005 (port 3000 occupied by other project `E:\FINAL Trinade AG`)
- `.claude/launch.json` uses `node` + `node_modules/next/dist/bin/next` (npm/npx ENOENT on Windows)
- **Do NOT use Turbopack** — crashes on Windows with `nul` path in PostCSS pipeline. Using webpack mode.
- Delete `.next/` cache when switching between dev/build or when HMR breaks

### Logo
- Original Trinade logo (`ORIGINAL LOGO.png`) — 3 overlapping head profiles with neural mesh
- Converted to transparent PNG via Sharp script (`scripts/make-transparent-logo.mjs`): brightness-to-alpha, star watermark removal, auto-trim
- Rendered via `next/image` at 48px with `style={{ width: size, height: 'auto' }}`
- Logo is NOT inline SVG — it's a raster PNG (exception to the inline SVG rule)
- "Trinade" text next to logo: 24px, always visible (no hover reveal animation)

## Working Style
- For non-trivial changes: enter plan mode, get approval before implementing
- For visual tweaks and polish: just do it, show the result via preview screenshot
- Always verify alignment/positioning with `preview_eval` measurements, not just visual inspection
- After corrections from user: note the pattern to avoid repeating
- Use Playwright MCP (`browser_navigate`, `browser_snapshot`, `browser_take_screenshot`, `browser_hover`) for visual debugging with real browser interaction
- Use `preview_screenshot` + `preview_eval` for quick checks
- Keep SESSION_LOG.md updated after significant work
- Use `/frontend-design` skill for design tasks

## Pending Housekeeping
- Package name in package.json still says "integrated-bio" — rename when ready
- Turbopack crashes on Windows with `nul` path in PostCSS — using webpack mode for now
- Reveal animation SVG mask doesn't render in headless Chrome preview — works fine in real browser
