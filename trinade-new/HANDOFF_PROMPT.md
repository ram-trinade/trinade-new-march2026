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

### 8 Pages — All Functional
| Route | What It Is | Design Quality |
|---|---|---|
| `/` | **Homepage** (landing page): cinematic preloader (frontend-w.com inspired — dark gradient bg, lens flare, "You Envision — We Build" tagline, per-digit staggered milestone counter 0→25→50→75→100%) on EVERY visit, content hidden until preloader completes, hero ("Technology that works for you."), AROX-inspired Why Choose Us accordion (V/01–V/04, scroll-triggered), challenges grid, CTA | Premium scroll + editorial |
| `/solutions` | Solutions: hero, mission, industries, Our Approach scroll cards (CSS Grid + absolute dark bg panel, sticky heading), testimonial challenges carousel, accordion services, CTA | Solid — full design system |
| `/blog` | Editorial magazine: staggered hero, featured article card, 6-card grid, newsletter CTA, topic tags | Strong editorial feel |
| `/company` | "Est 2020" bold gold gradient hero, quote, vision, mission (3 pillars), values accordion (5), milestones carousel (6), team accordion (6 members with bios) | Rich, editorial |
| `/contact` | Dark hero with spiral bg + "Have a project in mind?", split info card + gold glass form | Redesigned — premium |
| `/privacy-policy` | Alternating cream sections, gold accents | Clean legal page |
| `/terms-of-service` | Numbered sections, alternating backgrounds | Clean legal page |
| 404 | Giant "404" watermark, "Page not found", gold border "Return to Home" button | Atmospheric dark |

> **CRITICAL ROUTING**: Homepage is at `/` (app/page.tsx uses HomepageContent). Solutions is at `/solutions` (app/solutions/page.tsx uses SolutionsContent). There is NO `/home` route — it was deleted. Do NOT create `/home` or move Homepage away from `/`. All nav links must point to `/` for Home and `/solutions` for Solutions.

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
- `solutions-navbar.tsx` — "TRINADE" wordmark (left, links to `/`) + Menu pill with scroll % (center) + Logo (right, links to `/`) + gold active page dot via `usePathname`. Menu links: Products→`/products` (404), Solutions→`/solutions`, Blog→`/blog`, Company→`/company`, Contact→`/contact`
- `solutions-content.tsx` — Solutions page (`/solutions`): hero, mission, industries grid, Our Approach scroll cards (CSS Grid layout), testimonial carousel, accordion, CTA
- `solutions-footer.tsx` — Gold glass card with CTA section, nav links (Home→`/`, Solutions→`/solutions`, etc.), smooth TRINADE marquee, social icons
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
- **New pages** — products/services, case studies, careers, individual blog posts
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

## Products (for new pages)

Two real products need dedicated pages:
- **Fly High** — Enterprise travel management platform. Docs in `Products/FlyHigh_Details/`
- **Sleep Alert Device** — IoT drowsiness detection device. Docs in `Products/Sleeping_Alert_Device_Details/`

Read the product docs to understand what each product does before designing their pages.

---

## Known Issues & Session Notes

1. **Homepage is at `/`, NOT `/home`** — Do NOT create `/home`. All nav links point to `/` for Home and `/solutions` for Solutions.

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
