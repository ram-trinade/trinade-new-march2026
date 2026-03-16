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
| `/` | **Homepage** (landing page): preloader on EVERY visit, hero ("Technology that works for you." — viewport-contained), 4 sticky scroll-over cards (Discovery→Evolution), challenges grid, CTA | Premium scroll effect |
| `/solutions` | Solutions: hero, mission, industries, sticky scroll cards, testimonial challenges carousel, accordion services, differentiators, CTA | Solid — full design system |
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
- Lenis (smooth scroll)
- TypeScript strict
- **That's it.** No R3F, no GSAP, no ShadCN, no MagicUI.

### Shared Components
- `solutions-navbar.tsx` — "TRINADE" wordmark (left, links to `/`) + Menu pill with scroll % (center) + Logo (right, links to `/`) + gold active page dot via `usePathname`. Menu links: Products→`/products` (404), Solutions→`/solutions`, Blog→`/blog`, Company→`/company`, Contact→`/contact`
- `solutions-content.tsx` — Solutions page (`/solutions`): hero, mission, industries grid, sticky scroll cards, testimonial carousel, accordion, differentiators, CTA
- `solutions-footer.tsx` — Gold glass card with CTA section, nav links (Home→`/`, Solutions→`/solutions`, etc.), smooth TRINADE marquee, social icons
- `homepage-content.tsx` — Homepage sections: hero (viewport-contained), 4 sticky scroll cards, challenges grid, CTA
- `preloader-animation.tsx` — Cinematic "TRINADE" letter-by-letter build, gold rule, split reveal, particles (plays EVERY homepage visit)
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

## Known Issues & Session Notes

1. **Dev server can be slow to start** — Next.js sometimes hangs before "Starting..." on Windows. Fix: kill all node processes, delete `.next/`, restart. Use a fresh port if the previous one has zombie connections.

2. **Prompts 8+9 are VERIFIED and DEPLOYED** — Preloader, 404 page, contact redesign, navbar dots, footer fixes, and route restructure are all committed and live at trinade-new.vercel.app.

3. **Homepage is at `/`, NOT `/home`** — This was changed in Prompts 8+9. The old `/home` route was deleted. `app/page.tsx` renders HomepageContent with preloader. `app/solutions/page.tsx` renders SolutionsContent. Do NOT revert this. All links (navbar, footer, etc.) already point to the correct routes.

4. **This project is lean** — Motion v12 + Tailwind + Lenis. No R3F, GSAP, ShadCN, WebGL. The charcoal/cream/gold palette only. No teal. No green.

5. **Creativity is encouraged** — This site needs to EVOLVE. New ideas, interactions, and design moments are welcome. Understand the design system, then push it forward.

6. **Live deployment**: trinade-new.vercel.app — deploy with `npx vercel --prod --yes` from the project root.

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
