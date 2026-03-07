# How I Want Claude to Work on This Project

## Process
- Read CLAUDE.md at session start for project state and gotchas
- Read brand-voice.md for design language and color system
- Read working-preferences.md (this file) for workflow rules
- Read about-me.md to understand who you're working with
- Check SESSION_LOG.md for recent work history
- For new sections/features: enter plan mode, discuss approach, get approval
- For visual tweaks and polish: just do it, show screenshot result
- After corrections: note the pattern in CLAUDE.md or SESSION_LOG.md
- Always verify visual changes with preview measurements, not just screenshots
- Use `/frontend-design` skill for design implementation tasks

## Design Workflow
- I provide inspiration (screenshots, URLs, Awwwards references)
- You analyze the reference, identify the design patterns, and implement
- Show me via preview screenshot — I'll tell you what to adjust
- Iterate until it feels right. I know it when I see it.
- Design first, content second — use placeholder text freely

## Debugging Workflow
- **Playwright MCP** (preferred for visual verification): `browser_navigate`, `browser_snapshot`, `browser_take_screenshot`, `browser_hover`, `browser_click` — gives real browser with full React event support
- **Claude Preview**: `preview_start` (name "dev"), `preview_screenshot`, `preview_eval`, `preview_inspect` — for quick checks and CSS inspection
- Use `preview_eval` / `browser_evaluate` to measure pixel positions programmatically
- Note: Reveal animation SVG mask doesn't render in headless browsers — verify in real browser

## Code Style
- TypeScript strict, no `any` types
- `'use client'` only on components that need it (interactivity, hooks, animations)
- Tailwind v4 utilities first, custom CSS in `@layer base {}` only when needed
- Use `@source` directives in globals.css for component discovery
- Inline SVGs via React components (not img tags) for icons and decorative elements
- **Exception**: Trinade logo is a raster PNG via `next/image` (too complex for inline SVG)
- Use `currentColor` for SVGs to inherit theme colors
- Motion v12 for component-level animations — import from `'motion/react'` (NOT `'framer-motion'`)
- GSAP for scroll-driven and timeline animations
- CSS custom properties for GSAP-animated values (no direct style manipulation)

## Component Patterns
- One component per file, default export
- Props interface at top of file
- Animation config as constants outside component body
- Keep components focused — split into sub-components when complexity warrants
- Use `dynamic()` with `{ ssr: false }` for all interactive/WebGL components

## Alignment & Spacing
- **Master formula**: `px-[calc(12.5vw+0.8rem)]` to match navbar pill edge
- Derived from: nav `px-4` (16px) + pill `width: 75%` centered → left edge at `12.5vw + ~12.8px`
- All sections must align their content with this system
- Navbar: `grid grid-cols-[1fr_auto_1fr]` with `min-w-0` on both `1fr` columns
- Verify alignment programmatically with `preview_eval` or `browser_evaluate` measurements
- Max content width: `max-w-[1400px] mx-auto` within padded container

## File Organization
- Components in `components/` (flat, no deep nesting unless section-specific)
- Pages in `app/` (Next.js App Router conventions)
- Shaders in `lib/shaders.ts`
- Utilities in `lib/utils.ts`
- Global CSS in `app/globals.css`
- Static assets in `public/`
- Dev-only pages: `app/font-explore/`, `app/cursor-explore/`, `app/logo-preview/`

## Guardrails
- Never delete `.next/` without stopping the dev server first
- Never use `ScrollTrigger.getAll().forEach(t => t.kill())` — kill only your own instances
- Always wrap custom CSS in `@layer base {}` to avoid Tailwind v4 cascade issues
- Never use `--turbopack` flag on Windows (crashes with `nul` path in PostCSS)
- Test at 1440x900 viewport (primary design target), verify at 1280 and 1920
- Never commit node_modules or .next
- Use `replace_all: true` in Edit tool when renaming/changing a string across a file

## Priority Order
1. Make it look incredible (design fidelity to reference/vision)
2. Make it animate smoothly (60fps, intentional motion)
3. Make it responsive (desktop-first, then tablet/mobile)
4. Make it accessible (semantic HTML, aria labels, keyboard nav)
5. Make it performant (lazy loading, code splitting, optimized assets)
