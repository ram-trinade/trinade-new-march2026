# Trinade AI Technologies — New Website

## Project Overview
Awwwards-quality corporate website for Trinade AI Technologies Private Limited. This is the **new, standalone website** — a complete redesign with an independent design system (charcoal/cream/gold). Design-first approach — visual fidelity and motion design are the highest priority. Content is placeholder until design is locked.

## Tech Stack
- **Framework**: Next.js 15 App Router (`'use client'` for interactive components, `dynamic()` with `ssr: false`)
- **Styling**: Tailwind CSS v4 (CSS-first config, `@layer base` for custom CSS, `@source` directives in globals.css)
- **Animation**: Motion v12 (entry animations, AnimatePresence, useInView) — import from `'motion/react'`, NOT `'framer-motion'`
- **Scroll**: Lenis for smooth scrolling
- **Types**: TypeScript strict mode
- **Typography**: Manrope (single unified font, weights 200–800, CSS vars `--font-sans` and `--font-display`)
- **Animation (scroll)**: GSAP ScrollTrigger (pinned scroll sections — "Our Approach" on Homepage)
- **NO**: React Three Fiber, ShadCN, MagicUI — this project is deliberately lean

## Quick Start
```bash
# Dev server on port 3006
node node_modules/next/dist/bin/next dev --port 3006
# Do NOT use --turbopack (crashes on Windows with nul path in PostCSS)
```

## Architecture
```
app/
  globals.css          # Tailwind v4 config, cream bg (#f2ede6), Manrope font, Lenis styles, gold selection
  layout.tsx           # Root layout — Manrope font, metadata, SSR dark initial-screen overlay (prevents cream flash before preloader)
  page.tsx             # Homepage — Preloader + content (hidden until preloader done) + PremiumCursor + CookiePopup
  not-found.tsx        # 404 page — giant "404" watermark, gold border button, dark atmospheric
  blog/page.tsx        # Blog — editorial magazine with hero, featured article, 6-card grid, newsletter CTA
  company/page.tsx     # Company — "Est 2020" hero, quote, vision, mission (3 pillars), values accordion (5), milestones carousel (6), team accordion (6 members)
  contact/page.tsx     # Contact — dark hero with spiral bg, split layout (info card left + gold glass form right), CountryCodeDropdown (20 countries), scrollable SubjectDropdown
  privacy-policy/page.tsx   # Privacy Policy — alternating cream sections, gold accents
  terms-of-service/page.tsx # Terms of Service — numbered sections, alternating backgrounds
components/
  solutions-navbar.tsx    # Fixed navbar with gold glass active page dot indicator (usePathname)
  solutions-content.tsx   # Solutions: hero, mission, industries, Our Approach scroll cards (GSAP pinned), testimonial challenges carousel, accordion, CTA
  solutions-footer.tsx    # Brown gold liquid glass footer: CTA section + nav links + smooth marquee + social icons
  solutions-cookie-popup.tsx # Gold glass cookie consent popup (data-lenis-prevent for 125%+ zoom scroll fix)
  smooth-scroll.tsx       # Lenis smooth scroll provider
  homepage-content.tsx    # Homepage sections: hero, floating cards, Our Approach scroll cards (GSAP pinned, dark gradient + gold glow), How We Work accordion (large numbered steps), challenges, CTA
  preloader-animation.tsx # Frontend-w.com inspired preloader: dark gradient bg, lens flare, "You Envision — We Build" tagline, per-digit milestone counter (0→25→50→75→100%, staggered vertical slide, weight 600)
public/
  logo-transparent.png    # Trinade logo (transparent PNG)
  gradient-orbs-warm.jpg  # Decorative hero/section backgrounds
  spiral-*.jpg            # Decorative card/section images
  gradient-mesh-warm.jpg  # Decorative backgrounds
```

## Design System — Charcoal/Cream/Gold

### Color Palette
- **Cream bg**: #f2ede6 (body), #ebe5db (alternate sections)
- **Dark text**: #2a2218 at varying opacities (100% headlines, 55% body, 40% tertiary)
- **Charcoal dark**: #1a1a1e (dark sections, newsletter CTA), #0a0a0a (mission, values, footer bg)
- **Gold accent**: #c9a86e (base), #d4bb8a (light), #a0814a (dark) — pills, rules, accents, links
- **White opacities** (dark sections): 93% (headlines), 45% (body), 25% (tertiary)
- **NO teal, NO green** — this site uses a warm charcoal/cream/gold palette exclusively

### Gold Glass System
- **Dropdown panels**: `rgba(210,192,158,0.95)` with `backdrop-blur(28px) saturate(1.6)`
- **Card glass**: `rgba(185,155,100,0.22)` with `backdrop-blur(24px) saturate(1.5)`
- **Social icons**: `rgba(185,155,100,0.55)` background
- **Light cards**: `rgba(255,255,255,0.65)` to `rgba(255,255,255,0.35)` gradient
- **Dark cards**: `rgba(255,255,255,0.04)` with `border rgba(255,255,255,0.06)`

### Typography
- **Font**: Manrope exclusively (weights 200-800)
- **Hero headlines**: `clamp(3.5rem, 7vw, 7.5rem)`, weight 300 (light, editorial)
- **Section headlines**: `clamp(2.4rem, 4.8vw, 4.2rem)`, weight 300
- **Eyebrow labels**: 12px, uppercase, tracking 0.2em, weight 600
- **Body text**: 15-16px, line-height 1.8, 55% opacity

### Custom Cursor
- PremiumCursor component: RAF loop, `mix-blend-mode: difference`, BASE_SIZE=20, HOVER_SIZE=50, lerp 0.12
- `cursor: none !important` applied via `.solutions-page` class
- Grows on interactive elements (buttons, links, inputs)

### Navbar (solutions-navbar.tsx)
- "TRINADE" wordmark: fixed top-left, 28px/800 weight, clickable → `/`
- Menu pill: fixed top-center, gold glass, contains "Menu" + scroll percentage
- Logo: fixed top-right, 36px, black filter at 85% opacity, clickable → `/`
- Expandable panel menu with page links + social links

### Footer (solutions-footer.tsx)
- Brown gold liquid glass card on #0a0a0a background
- Contact CTA, navigation links (Home, Company, Blog, Contact, Privacy, Terms)
- SVG social icons (LinkedIn, Instagram, X)
- Copyright bar with gold accents

## Key Patterns

### Animation
- `useInView` from `motion/react` for scroll-triggered reveals
- Ease curves: `[0.16, 1, 0.3, 1]` (cinematic), `[0.32, 0.72, 0, 1]` (UI)
- Staggered word reveals for hero headlines
- Gold rule animations (`scaleX: 0 → 1`) for section dividers
- **DO NOT** use `useScroll({ target })` — causes "Target ref is defined but not hydrated" error

### Component Structure
- Each page includes: PremiumCursor, SolutionsNavbar, SmoothScroll wrapper, content, SolutionsCookiePopup/SolutionsFooter
- `dynamic()` with `{ ssr: false }` for all interactive components
- Gold glass pill (`GoldPill`) component for category/eyebrow labels

### Section Pattern
- Alternating cream (#f2ede6) and dark (#0a0a0a/#1a1a1e) sections
- Each section has grain overlay (SVG noise texture)
- Atmospheric gradient orbs for depth
- `GoldRule` dividers between sections

## Critical Gotchas

### Tailwind v4
- All custom CSS MUST be in `@layer base {}` — un-layered CSS overrides Tailwind utilities
- `@source` directives in globals.css: `@source "../components"`, `@source "../app"`
- CSS-first config (no tailwind.config.js)

### Motion v12
- Import from `'motion/react'`, NOT `'framer-motion'` (rebranded)
- `useInView` for scroll-triggered reveals
- `AnimatePresence` for exit animations
- **NEVER** use `useScroll({ target })` — hydration error on plain elements

### Windows / Dev Server
- Dev server: port 3006
- **Do NOT use Turbopack** — crashes on Windows with `nul` path in PostCSS
- Delete `.next/` cache when HMR breaks

## Real Contact Info
- **Address**: #06, Green Valley Apartments, Gorantla, Guntur, AP 522034, India
- **Email**: info@trinade.com
- **Phone**: +91 9490754923
- **Social**: Twitter/X, Instagram, LinkedIn — all @trinadeai

## Working Style
- Use Playwright MCP (`browser_navigate`, `browser_snapshot`, `browser_take_screenshot`) for visual debugging — NOT Preview tools
- Use `/frontend-design` skill for design tasks
- For non-trivial changes: enter plan mode, get approval
- For visual tweaks: just do it, show via Playwright screenshot
- Keep SESSION_LOG.md updated after significant work
- Save git checkpoints after completed tasks
- Priority: Look incredible → Animate smoothly → Responsive → Accessible → Performant
