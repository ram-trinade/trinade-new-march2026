# How I Want Claude to Work on This Project

## Process
- Read CLAUDE.md at session start for project state and gotchas
- Read brand-voice.md for design language and color system
- Read working-preferences.md (this file) for workflow rules
- Read about-me.md to understand who you're working with
- Check SESSION_LOG.md for recent work history
- For new sections/features: enter plan mode, discuss approach, get approval
- For visual tweaks and polish: just do it, show screenshot result
- After corrections: note the pattern to avoid repeating
- Use `/frontend-design` skill for design implementation tasks

## Design Workflow
- I provide inspiration (screenshots, URLs, Awwwards references)
- You analyze the reference, identify the design patterns, and implement
- Show me via Playwright screenshot — I'll tell you what to adjust
- Iterate until it feels right. I know it when I see it.
- Design first, content second — use placeholder text freely
- **Stay open to new ideas** — don't be constrained by what exists. If something better emerges, propose it.

## Debugging Workflow
- **Playwright MCP** (REQUIRED): `browser_navigate`, `browser_snapshot`, `browser_take_screenshot`, `browser_hover`, `browser_click`
- **Do NOT use Preview tools** — strict requirement from the user
- Use `browser_evaluate` to measure pixel positions programmatically

## Code Style
- TypeScript strict, no `any` types
- `'use client'` only on components that need it (interactivity, hooks, animations)
- Tailwind v4 utilities first, custom CSS in `@layer base {}` only when needed
- Use `@source` directives in globals.css for component discovery
- Inline SVGs via React components for icons and decorative elements
- Motion v12 for animations — import from `'motion/react'` (NOT `'framer-motion'`)
- `dynamic()` with `{ ssr: false }` for all interactive components

## Component Patterns
- One component per file, default export
- Animation config as constants outside component body
- Keep components focused — split into sub-components when complexity warrants

## File Organization
- Components in `components/` (flat structure)
- Pages in `app/` (Next.js App Router conventions)
- Global CSS in `app/globals.css`
- Static assets in `public/`

## Guardrails
- Never delete `.next/` without stopping the dev server first
- Always wrap custom CSS in `@layer base {}` for Tailwind v4
- Never use `--turbopack` flag on Windows
- Test at 1440x900 viewport (primary design target)
- Never commit node_modules or .next

## Priority Order
1. Make it look incredible (design fidelity to reference/vision)
2. Make it animate smoothly (60fps, intentional motion)
3. Make it responsive (desktop-first, then tablet/mobile)
4. Make it accessible (semantic HTML, aria labels, keyboard nav)
5. Make it performant (lazy loading, code splitting, optimized assets)
