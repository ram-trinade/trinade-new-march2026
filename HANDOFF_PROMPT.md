# Session Handoff Prompt — Trinade AI Technologies Corporate Website

---

## FIRST THINGS FIRST — Read These Files at Session Start
Before doing ANY work, read these files to understand the project:

1. **`CLAUDE.md`** — Project overview, tech stack, architecture, critical gotchas, working style
2. **`about-me.md`** — Founder profile, design sensibility, tools, content strategy
3. **`working-preferences.md`** — Process, debugging workflow, code style, guardrails, priority order
4. **`brand-voice.md`** — Visual tone, typography, color system, animation principles, anti-patterns
5. **`SESSION_LOG.md`** — Recent work history (trimmed to essentials)

These files contain hard-won lessons and design decisions that MUST be respected.

---

## Project Summary
Awwwards-quality corporate website for **Trinade AI Technologies Private Limited**. Built with Next.js 15, Tailwind CSS v4, React Three Fiber (WebGL), GSAP, and Motion v12. **Design-first approach** — visual fidelity and motion design are the highest priority.

**The user is the founder** — not a UI/UX designer but has an exceptionally sharp eye for design quality. Provides visual references from Awwwards winners and iterates by feel.

---

## What's Built

### Pages
| Route | Component | Description |
|---|---|---|
| `/` | `page.tsx` | Homepage: Fixed WebGL bg + 6 content sections + Footer |
| `/about` | `about-content.tsx` | 8-section cinematic page (~1050 lines), alternating light/dark |
| `/team` | `team-content.tsx` | Cinematic intro + 8 member rows with mesh gradient portraits |
| `/contact` | `contact-content-v3.tsx` | Premium dark editorial layout, split info+form, CSS dot pattern bg |
| `/font-explore` | Dev-only | 10 font options comparison |
| `/cursor-explore` | Dev-only | 12 cursor style options |
| `/logo-preview` | Dev-only | 5 SVG logo variations |

### Key Components
- **Navigation** (`navigation.tsx`): 3-col grid navbar, white frosted glass pill, GSAP-animated glass properties, white glassmorphic dropdowns
- **Footer** (`footer.tsx`): `h-screen`, giant TRINADE text, SVG social icons, atmospheric gradient layers, optional WebGL
- **OrganicBackground** (`organic-background.tsx`): R3F WebGL with GLSL parametric curves, fixed full-viewport
- **RevealAnimation** (`reveal-animation.tsx`): SVG mask expansion on hero load
- **UI Components** (`components/ui/`): ShadCN (Input, Textarea, Label, Button) + MagicUI (BlurFade, DotPattern)

### Theme Architecture (Light/Dark Hybrid)
- **Body**: `bg-[#f5f3ef]` warm off-white, `color: #1a1f1a`
- **Hero**: `bg-transparent` — WebGL shows through, white text
- **Light sections**: Wrapped in `bg-[#f5f3ef]` to cover fixed WebGL
- **Dark sections**: `bg-[#060e09]`
- **Contact V3**: Full dark theme with atmospheric layers
- **Footer**: Dark with optional WebGL via `withBackground` prop

---

## Quick Start
```bash
# Dev server on port 3005 (port 3000 occupied)
node node_modules/next/dist/bin/next dev --port 3005
# Do NOT use --turbopack (crashes on Windows with nul path in PostCSS)
```

---

## Critical Rules

### NEVER
1. Remove WebGL background from hero without explicit instruction
2. Shrink footer dimensions unless asked
3. Use `ScrollTrigger.getAll().forEach(t => t.kill())` — kill only YOUR instance
4. Use `--turbopack` on Windows
5. Import from `'framer-motion'` — use `'motion/react'`
6. Put custom CSS outside `@layer base {}` in globals.css
7. Use native `<select>` in dark theme forms
8. Use MagicUI DotPattern with `glow={true}` on full-page backgrounds (creates thousands of animated SVGs)

### ALWAYS
1. Use `dynamic(() => import(...), { ssr: false })` for R3F/WebGL components
2. Use master alignment: `px-[calc(12.5vw+0.8rem)]` for all section padding
3. Use `@source` directives in globals.css for component directories
4. Verify alignment with pixel measurements (`browser_evaluate`)
5. Use Playwright MCP for visual debugging
6. Save git checkpoints after completed tasks
7. Update SESSION_LOG.md after significant work
8. Use `/frontend-design` skill for design tasks
9. Wrap light sections in opaque bg to cover fixed WebGL canvas

---

## Color Palette
| Token | Value | Usage |
|---|---|---|
| Light bg | `#e8e4de` / `#f5f3ef` | Body bg, light section wrappers |
| Light text | `#1a1f1a` | Near-black, various opacities |
| Deep dark | `#060e09` | Dark sections, footer |
| Panel dark | `#0a1a14` | Dropdown panels, form elements on dark bg |
| Teal accent | `#00d4aa` | Badges, focus states, links, CTAs |
| Lime accent | `#c8e64e` | Sparingly, hover glows |
| Amber accent | `#b48237` | Decorative SVG elements |

---

## Real Contact Info
- **Address**: #06, Green Valley Apartments, Gorantla, Guntur, AP 522034, India
- **Email**: info@trinade.com
- **Phone**: +91 9490754923
- **Social**: Twitter/X, Instagram, LinkedIn — all @trinadeai

---

## Design Inspiration Sources
| Source | What Was Referenced |
|---|---|
| IntegratedBio | Hero section |
| Joby Aviation | Logo/brand treatment |
| Datawizz | Footer — giant brand text, atmospheric layers |
| Qatalog | Navbar — logo independent from pill |
| slothui | Contact form — dark glassmorphic inputs |
| NextNet | Team page — full-width horizontal rows |

---

## What's Next
- Inner product/service pages (Trinade Core, Insight Engine, Connect API, Shield)
- Mobile responsiveness pass (currently desktop-first)
- SEO metadata per page
- Final real content/copy for all sections
- Logo finalization (5 SVG variations in `public/logo-variations/`)
- Cursor style selection (12 options at `/cursor-explore`)
- Package name in package.json still says "integrated-bio" — rename when ready

---

## Working Style
1. Read project files first (CLAUDE.md, about-me.md, working-preferences.md, brand-voice.md, SESSION_LOG.md)
2. For non-trivial changes: plan mode → discuss → get approval
3. For visual tweaks: just do it, show via Playwright screenshot
4. Use `/frontend-design` skill for design tasks
5. Priority: Look incredible → Animate smoothly → Responsive → Accessible → Performant
6. Work in parallel when possible, minimize cycles
