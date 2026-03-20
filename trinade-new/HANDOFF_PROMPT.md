# Session Handoff — Trinade AI Technologies (New Website)

---

## READ THESE FILES FIRST
Before doing ANY work, read these files in order:

1. **`CLAUDE.md`** — Tech stack, architecture, design system, color palette, critical gotchas
2. **`about-me.md`** — Who the founder is, design sensibility, tools, content strategy
3. **`brand-voice.md`** — Visual tone, typography, colors, animation principles, anti-patterns
4. **`working-preferences.md`** — Process, debugging, code style, guardrails, priority order
5. **`SESSION_LOG.md`** — Work history (what was built, decisions made, lessons learned)
6. **`websites-liked.md`** — Design inspiration sources

These files contain hard-won lessons and design decisions. Respect them, but don't treat them as limits on creativity.

---

## The Big Picture

**What**: Awwwards-quality corporate website for Trinade AI Technologies Private Limited.

**Who**: The user is the founder — not a UI/UX designer but has an exceptionally sharp eye for design. Provides visual references and iterates by feel. Trusts bold creative decisions.

**Where**: `E:\FINAL Trinade CC\trinade-new\` — standalone Next.js 15 project, completely independent from any other Trinade website.

**Why this matters**: This website IS the brand. It must look like it belongs on Awwwards.com. Generic, template-looking, or "AI slop" aesthetics are unacceptable.

---

## What Exists Today

### 7 Pages + 404 — All Functional
| Route | What It Is | Design Quality |
|---|---|---|
| `/` | **Homepage**: cinematic preloader (every visit), hero, AROX-inspired accordion (V/01–V/04), challenges grid, CTA | Premium scroll + editorial |
| `/solutions` | Solutions: hero, mission, industries, Our Approach scroll cards (GSAP pinned), testimonial carousel, accordion, CTA | Solid — full design system |
| `/blog` | Editorial magazine: staggered hero, featured article, 6-card grid, newsletter CTA | Strong editorial feel |
| `/company` | "Est 2020" gold hero, quote, vision, mission pillars, values accordion, milestones, team | Rich, editorial |
| `/contact` | Dark hero with spiral bg, split info card + gold glass form | Redesigned — premium |
| `/privacy-policy` | Alternating cream sections, gold accents | Clean legal page |
| `/terms-of-service` | Numbered sections, alternating backgrounds | Clean legal page |
| 404 | Giant "404" watermark, gold border button, atmospheric dark | Atmospheric dark |

> **CRITICAL ROUTING**: Homepage is at `/` (app/page.tsx). Solutions is at `/solutions`. No `/home` route. Product pages were removed — do NOT create `/products`. Nav links: `/` (Home), `/solutions`, `/blog`, `/company`, `/contact`.

### Design System
- **Palette**: Charcoal (#1a1a1e, #0a0a0a) / Cream (#f2ede6, #ebe5db) / Gold (#c9a86e, #d4bb8a, #a0814a)
- **No teal, no green** — warm editorial palette exclusively
- **Typography**: Manrope, weight 300 for headlines (light, editorial feel), 400 for body
- **Gold glass**: Glassmorphic cards and UI using gold-tinted transparent layers
- **Custom cursor**: White circle with mix-blend-mode difference, lerp-following mouse
- **Grain overlays**: SVG noise at 3-5% opacity for atmosphere
- **Atmospheric orbs**: Blurred radial gradients for depth

### Tech Stack (Deliberately Lean)
- Next.js 15 App Router
- Tailwind CSS v4 (CSS-first config)
- Motion v12 (import from `'motion/react'`)
- GSAP ScrollTrigger (pinned scroll sections on Homepage)
- Lenis (smooth scroll)
- TypeScript strict
- **That's it.** No R3F, no ShadCN, no MagicUI.

### Shared Components
- `solutions-navbar.tsx` — "TRINADE" wordmark (left) + Menu pill with scroll % (center) + Logo (right) + gold active page dot. Menu links: Products (dropdown: Fly High, Sleep Alert), Solutions, Blog, Company, Contact
- `solutions-content.tsx` — Solutions page (`/solutions`): hero, mission, industries grid, Our Approach scroll cards (CSS Grid layout), testimonial carousel, accordion, CTA
- `solutions-footer.tsx` — Gold glass card with CTA, nav links (Home, Solutions, Blog, Company, Contact), TRINADE marquee, social icons
- `homepage-content.tsx` — Homepage sections: hero (viewport-contained), AROX-inspired Why Choose Us accordion (V/01–V/04, scroll-triggered), challenges grid, CTA
- `preloader-animation.tsx` — Frontend-w.com inspired preloader: dark gradient bg, lens flare, "You Envision — We Build" tagline, per-digit staggered milestone counter (0→25→50→75→100%), SSR dark initial-screen in layout.tsx prevents cream flash (plays EVERY homepage visit)
- `solutions-cookie-popup.tsx` — Gold glass cookie consent
- `smooth-scroll.tsx` — Lenis provider
- `premium-cursor.tsx` — Custom cursor with mix-blend-mode difference

---

## Critical Technical Knowledge

### Must-Know Rules
1. Import Motion from `'motion/react'`, NEVER from `'framer-motion'`
2. **NEVER** use `useScroll({ target })` — causes hydration crash. Use `useInView` instead.
3. Wrap custom CSS in `@layer base {}` for Tailwind v4 compatibility
4. Use `dynamic()` with `{ ssr: false }` for interactive components
5. Dev server runs on **port 3006** — `node node_modules/next/dist/bin/next dev --port 3006`
6. **No Turbopack** — crashes on Windows with PostCSS `nul` path error
7. Use **Playwright MCP** for visual debugging, NOT Preview tools (strict user requirement)

### Animation Patterns That Work
- `useInView` with `once: true, margin: '-60px'` for scroll reveals
- Ease: `[0.16, 1, 0.3, 1]` for cinematic, `[0.32, 0.72, 0, 1]` for UI
- Staggered word reveals: split text, 0.06s delay between words
- Gold rule: `scaleX: 0 → 1` with gradient background, `transformOrigin: 'left'`
- Section pattern: opacity-only fade-in for content (no y-translation that causes jiggle)

---

## What's Open for Exploration

**This is NOT a finished website.** These areas are actively open for creative development:

### Design Opportunities
- **Mobile responsiveness** — currently desktop-only, needs full responsive pass
- **New pages** — case studies, careers, individual blog posts, product pages (to be redesigned from scratch)
- **Hero redesigns** — the current hero works but could be more distinctive
- **Interactive elements** — scroll-driven animations, parallax, micro-interactions
- **Background experiments** — atmospheric orbs work, but bolder approaches welcome
- **Navigation evolution** — menu pill is functional but could go further
- **Page transitions** — preloader exists for homepage; cross-page transitions could be added

### Content & Features
- All copy is placeholder — real content needs design-worthy formatting
- Newsletter subscription needs backend integration
- Contact form needs backend/email integration
- Blog needs individual article pages
- Social proof section uses placeholder data

### Technical Growth
- The lean stack is intentional, but adding libraries for specific effects is fine (e.g., GSAP for a complex scroll animation, Three.js for a specific 3D element)
- Performance optimization (image optimization, code splitting, lazy loading)
- SEO metadata per page
- Analytics integration

---

## How to Approach New Work

### For Design Tasks
1. Use `/frontend-design` skill
2. Study the existing design system (colors, typography, spacing, animation)
3. Build something that FITS the system but PUSHES it forward
4. Show via Playwright screenshot — the user iterates by visual feedback

### For New Pages
1. Follow the existing page pattern: PremiumCursor + SolutionsNavbar + SmoothScroll + content + SolutionsFooter
2. Use the established section rhythm: alternating cream/dark backgrounds
3. Add atmospheric grain, gradient orbs, gold accents
4. But **don't just copy** — each page should have its own character and at least one memorable design moment

### For Modifications
1. Read the component first
2. Understand the design intent
3. Make changes that respect the system while improving quality
4. Verify with Playwright MCP screenshots

---

## Recent Audit (Prompt 64)

A comprehensive Awwwards design audit was completed. Two key files:
- **`design-review-checklist.md`** — 137 checkpoints across 13 categories
- **`design-gaps-report.md`** — 60 issues found (10 critical, 25 medium, 25 minor)

Read `design-gaps-report.md` for the full priority matrix. The top critical issues are there.

## Products (Built — Experimental)

Two products have dedicated pages on the experimental site:
- **Fly High** (`/experimental/products/flyhigh`) — Expert consultation platform. GOD MODE design: aurora gradients, split-text 3D reveals, magnetic buttons, volumetric light, morphing blobs. Content docs in `Products/FlyHigh_Details/`
- **Sleep Alert Device** — IoT drowsiness detection. Page pending. Docs in `Products/Sleeping_Alert_Device_Details/`
- **New Product Experiment** (`/experimental/products/new-product-experiment`) — Design showcase with bento grid, glassmorphic testimonials, all award-winning techniques

### Navbar Products Dropdown
The navbar now has a collapsible Products dropdown with sub-items (Fly High, Sleep Alert). Sub-items: 15px/semibold, gold gradient dot indicators, 0.55s animation with blur-in entry.

---

## Experimental Site

`/experimental/` routes for design iteration. Changes here first, promoted to main routes once approved.

### Experimental Pages
| Route | Status |
|---|---|
| `/experimental/products/flyhigh` | **Fly High product page** — GOD MODE design, 8 sections |
| `/experimental/products/new-product-experiment` | Design showcase — all award techniques |
| `/experimental/404` | **Typewriter error page** — cycling phrases, magnetic button |
| `/experimental/blog` | Blog V1 — editorial cards, article detail |
| `/experimental/blog-v2` | Blog V2 (ACTIVE) — 3-col vertical cards, featured split |
| `/experimental/contact` | Contact with inline form validation |
| `/experimental/` + others | Mirrors of main pages for testing |

**Rule**: All design work happens on `/experimental/` routes. Never modify main routes during iteration.

### GOD MODE Techniques (Available)
These premium techniques are now implemented and can be reused:
- Aurora drifting gradients, morphing blobs, volumetric light cones
- Split-text 3D word reveals (`rotateX`), animated gradient text
- Magnetic spring-physics buttons, inner glow hover choreography
- Typewriter cycling text animation
- Glassmorphic depth layer system, bento grids

---

## Known Issues & Session Notes

1. **Homepage is at `/`, NOT `/home`** — No `/home` route, no `/products` route. Nav: Home (`/`), Solutions, Blog, Company, Contact.

2. **Dev server**: port 3006, no Turbopack, kill node + delete `.next/` if HMR breaks.

3. **Creativity is encouraged** — Understand the design system, then push it forward. Each page should have its own character and at least one memorable design moment.

4. **Live deployment**: trinade-new.vercel.app

---

## Quick Start Checklist

```
1. Read the 6 .md files listed above
2. Run: node node_modules/next/dist/bin/next dev --port 3006
3. Open Playwright: browser_navigate → http://localhost:3006
4. Browse all 6 pages to understand the current state
5. Ask the user what they want to work on
6. Use /frontend-design for design tasks
7. Verify with Playwright MCP screenshots
8. Commit checkpoints with git
9. Update SESSION_LOG.md
```

---

## Real Contact Info
- **Company**: Trinade AI Technologies Private Limited
- **Address**: #06, Green Valley Apartments, Gorantla, Guntur, AP 522034, India
- **Email**: info@trinade.com
- **Phone**: +91 9490754923
- **Social**: @trinadeai on Twitter/X, Instagram, LinkedIn
