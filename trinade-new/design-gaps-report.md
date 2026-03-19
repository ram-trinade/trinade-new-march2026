# Trinade AI Technologies — Design Gaps & Issues Report

> **Audit Date:** March 19, 2026
> **Goal:** Awwwards submission quality — every pixel matters
> **Method:** Visual snapshot analysis + source code review of all 8 pages + shared components
> **Severity Legend:** 🔴 Critical (blocks Awwwards) | 🟡 Medium (noticeable quality gap) | 🟢 Minor (polish detail)

---

## Table of Contents

1. [Cross-Site Systemic Issues](#1-cross-site-systemic-issues)
2. [Homepage (/)](#2-homepage)
3. [Solutions (/solutions)](#3-solutions)
4. [Blog (/blog)](#4-blog)
5. [Company (/company)](#5-company)
6. [Contact (/contact)](#6-contact)
7. [Privacy Policy (/privacy-policy)](#7-privacy-policy)
8. [Terms of Service (/terms-of-service)](#8-terms-of-service)
9. [404 Page](#9-404-page)
10. [Shared Components](#10-shared-components)
11. [Priority Fix Matrix](#11-priority-fix-matrix)

---

## 1. Cross-Site Systemic Issues

### Typography Inconsistency
| Page | Hero Weight | Spec | Status |
|------|------------|------|--------|
| Homepage | 400 | 300 | 🔴 Wrong |
| Solutions | 400 | 300 | 🔴 Wrong |
| Blog | 700 | 300 | 🟢 Intentional (category label) |
| Company | 300 | 300 | ✅ Correct |
| Contact | 300 | 300 | ✅ Correct |
| Privacy Policy | 700 | 300 | 🔴 Wrong |
| Terms of Service | 700 | 300 | 🔴 Wrong |
| 404 | 300 | 300 | ✅ Correct |

### Eyebrow Label Tracking Inconsistency
| Page | Tracking | Spec | Status |
|------|----------|------|--------|
| Homepage | 0.2em | 0.2em | ✅ Correct |
| Solutions | 0.2em | 0.2em | ✅ Correct |
| Contact | 0.08em | 0.2em | 🟡 Wrong |
| Privacy Policy | 0.12em | 0.2em | 🟡 Wrong |
| Terms of Service | 0.15em | 0.2em | 🟡 Wrong |

### Body Text Opacity on Light Sections
| Page | Opacity | Spec | Status |
|------|---------|------|--------|
| Homepage | 55% | 55% | ✅ Correct |
| Solutions | 55% | 55% | ✅ Correct |
| Privacy Policy | 78% | 55% | 🔴 Too opaque |
| Terms of Service | solid #3d3427 (~75%) | 55% | 🔴 Too opaque |

### Navigation Links
- 🔴 **All `<a>` tags should be Next.js `<Link>` components** — navbar, footer, and most pages use raw `<a href>` causing full page reloads, breaking SPA feel, and re-triggering the preloader on every navigation

### Cookie Popup
- 🔴 **Shows on EVERY page visit** — never checks localStorage for prior acceptance. Users see it on every single page load. Awwwards judges will flag this as hostile UX.

### SSR / Performance
- 🔴 **Everything is client-rendered with `ssr: false`** — HomepageContent, SolutionsFooter, and all page content use `dynamic({ ssr: false })`. Zero server-rendered content means poor Lighthouse LCP scores. Awwwards judges performance.

### Missing Elements on 404
- 🔴 **404 page has no navbar, footer, cookie popup, or custom cursor** — feels like a completely different site

---

## 2. Homepage (/)

### Typography
- 🔴 **Hero headline undersized**: Currently `clamp(2.6rem, 6vw, 5.2rem)` weight 400 — should be `clamp(3.5rem, 7vw, 7.5rem)` weight 300. At 1440px this renders at ~83px instead of the intended ~120px. The hero must OWN the viewport.
- 🔴 **Hero card body text oversized**: `clamp(1.4rem, 3vw, 2.4rem)` renders at ~43px at 1440px. Body describing services should be 18-22px max. This destroys headline-to-body hierarchy.
- 🟡 **Section headlines slightly under spec**: "What We Build" uses `clamp(2.2rem, 4.5vw, 3.6rem)` — should be `clamp(2.4rem, 4.8vw, 4.2rem)`
- 🟡 **"Our Approach" pinned headline uses weight 500** — should be 300 for editorial consistency
- 🟢 **Hero tracking too tight**: `-0.04em` is aggressive for weight 300 at large sizes — `-0.03em` would read better

### Color
- 🟡 **Page background mismatch**: `app/page.tsx` uses `bg-[#e8e4de]` but design system body bg is `#f2ede6`. These are noticeably different warm tones that could cause visible seams.
- 🟢 **Unused lime color defined**: `lime: '#c8d84e'` in palette constant is never used — dead code

### Layout & Spacing
- 🟡 **Section rhythm break**: Two consecutive light sections (Challenges + CTA) break the alternating dark/light rhythm. Consider making the CTA section dark.
- 🟡 **Challenges grid orphan**: 5th challenge sits alone in left column of 2-col grid, leaving right column empty. Add a 6th item or make the 5th full-width.
- 🟢 **Sticky headline offset**: "What We Build" sticky position `top: 32` (128px) is high — `top-24` (96px) would center better

### Components
- ✅ **GSAP-pinned scroll cards are excellent** — standout Awwwards interaction
- ✅ **"How We Work" accordion with auto-expand on scroll** — strong editorial pattern
- 🟡 **Scroll-expand accordion race condition**: Multiple rows could be "active" simultaneously if both are in the `-30%` margin zone
- 🟢 **CTA button text "Get started" is generic** — Awwwards CTAs are typically more distinctive

### Animation
- ✅ **Preloader with per-digit staggered counter** — premium, memorable
- ✅ **Custom dual-dot cursor with gold hover ring** — exceeds design spec quality
- 🟡 **Preloader missing bottom-right corner bracket** — breaks the intended 4-corner symmetry
- 🟢 **6 scroll cards in pinned section may be too long** — consider 4 cards max with a progress indicator

### Imagery & Texture
- ✅ **Grain overlays at 2-4% are correctly subtle**
- ✅ **Atmospheric orbs and spiral backgrounds are well-calibrated**
- 🟡 **Verify `spiral-gold.jpg` exists** — CTA section depends on this background image

### Micro-details
- ✅ **Custom cursor system is exceptional** — dual-dot with gold ring on hover, `mix-blend-mode: difference`
- ✅ **Gold rule scaleX animations** are clean
- 🟢 **Footer CTA repeats same text** as main CTA section ("Start a conversation") — vary for freshness

### No Eyebrow on Hero
- 🟡 **Hero has no gold eyebrow label** — every other section has one. Missing brand reinforcement opportunity.

---

## 3. Solutions (/solutions)

### Typography
- 🟡 **Hero headline weight 400** — should be 300 per design system
- 🟡 **Hero headline caps at 5rem** via `clamp(2.6rem, 5.8vw, 5rem)` — significantly below the system spec of 7.5rem max

### Layout
- 🟡 **Industry grid has no responsive breakpoints** — 5-column grid (`repeat(5, 1fr)`) will collapse poorly on tablet/mobile
- 🟡 **Non-functional industry navigation arrows** — left/right arrow buttons have no onClick handlers. Dead UI elements are an Awwwards deduction.

### Animation
- 🔴 **Missing GSAP-pinned "Our Approach" scroll section** — per CLAUDE.md, Solutions should have scroll cards with GSAP ScrollTrigger pinning. This is the kind of flagship scroll interaction that separates Awwwards sites from standard ones. **This is the single biggest gap.**
- 🟡 **EASE constant uses generic `[0.25, 0.1, 0.25, 1]`** instead of the cinematic `[0.16, 1, 0.3, 1]` or UI `[0.32, 0.72, 0, 1]`. Half the animations feel less premium.

### Imagery
- 🟡 **Industry card grain overlay at 35% opacity** — design system specifies 3-5%. This is nearly 10x too strong, muddying card backgrounds. Reduce to `opacity-[0.04]`.

### Components
- ✅ **Hero with inline pill images** breaking up headline text — distinctive, memorable
- ✅ **Challenges carousel** with editorial split layout — polished
- ✅ **Accordion with gold glass toggles** — well-crafted

---

## 4. Blog (/blog)

### Typography
- 🟢 **"Blog" h1 uses weight 700** — intentional departure that works (category label vs sentence headline)
- 🟢 **Article titles at weight 600** compete slightly with section headings — consider weight 500

### Layout
- 🟡 **Excessive vertical spacing** between article list and footer. `py-10 md:py-14` per card may be too generous — tighten to `py-8 md:py-10`

### Components
- 🟡 **Article cards are not clickable** — hover states, cursors, and arrow indicators suggest clickability, but no `<a>` wrapper exists. UX/accessibility gap.
- 🟡 **Missing newsletter CTA section** — architecture specifies "newsletter CTA" for blog page. A dark section with email input before the footer would add visual variety.

### Content
- 🟢 **All 6 articles have same author "Trinade Team"** — vary for authenticity before submission
- 🟢 **Redundant `cursor: 'none'` on individual cards** — global class handles it

### Strengths (no fixes needed)
- ✅ **Featured Article card** — full-width dark editorial with warm mesh gradient, gold pills, cinematic hover
- ✅ **Vertical article list** — editorial numbering, gold hover bar, diagonal arrow, layered hover states
- ✅ **Marquee row** with ghost text and gold dots — lovely transitional element
- ✅ **Eyebrow labels** correctly use 12px/uppercase/0.2em/weight 600

---

## 5. Company (/company)

### Layout
- 🔴 **Massive whitespace below CEO quote** — 300-400px of dead space before "OUR VISION". Likely caused by excessive padding or `min-h-screen`. This is immediately noticeable.
- 🟡 **Quote and Vision sections are both on cream** — breaks the alternating dark/light rhythm. Long single-tone stretch.

### Components
- 🟡 **Team member rows lack hover interactivity** — flat rows with expand buttons. Need subtle background shift, gold accent, or mesh gradient scale on hover.
- 🟢 **Milestone carousel arrows are low-contrast** on dark background — increase border opacity from `rgba(255,255,255,0.15)` to `rgba(255,255,255,0.25)`

### Content
- 🟢 **Milestone year 2022 is missing** — timeline jumps from 2021 to 2023
- 🟢 **Vision "better future" gold text** could benefit from italic style for stronger differentiation

### Strengths
- ✅ **Hero with letter-by-letter "TRINADE" reveal** — cinematic, perfectly paced (0.3s + 0.08s stagger)
- ✅ **CEO quote** with oversized gold quotation marks — editorial, confident
- ✅ **Values accordion** with AROX-style large animated numbers
- ✅ **Team section** with mesh gradient portrait placeholders and expandable bios

### Technical
- 🟢 **~1300 lines in single file** — consider extracting sections for maintainability

---

## 6. Contact (/contact)

### Typography
- 🟡 **Form label tracking is 0.08em** — spec says 0.2em for eyebrow-style labels

### Components
- 🟡 **No form validation or error/success states** — `handleSubmit` just calls `preventDefault()`. An Awwwards site needs animated inline validation with graceful error messaging.
- 🟢 **Character counter not enforced** — textarea lacks `maxLength={300}` attribute, users can type past limit
- 🟢 **Send button arrow has no hover transform** — transition exists but nothing triggers it

### Animation
- 🟡 **Scroll indicator lacks fade-out** — persists after scrolling. Should fade at ~5% scroll progress.

### Strengths
- ✅ **Dark hero with staggered word reveal** and gold gradient on "mind?" — cinematic
- ✅ **Custom CountryCodeDropdown and SubjectDropdown** — gold glass, AnimatePresence, staggered items
- ✅ **Info card with numbered response promises** (01, 02, 03) — structured, confident

---

## 7. Privacy Policy (/privacy-policy)

### Typography
- 🔴 **Hero headline weight 700** — should be 300. Makes this page look like a different site from Contact/Solutions.
- 🔴 **Body text at 78% opacity** — design system says 55%. Text competes with headings, flattening hierarchy.
- 🟡 **Eyebrow "LEGAL" uses weight 500, tracking 0.12em** — should be weight 600, tracking 0.2em
- 🟢 **Body font 16.5px** — spec says 15-16px. Combined with 1.8 line-height, paragraphs feel loose.

### Layout
- 🟡 **"Your Rights" section is a dense paragraph** — should be a bulleted list with gold markers for readability

### Animation
- 🟡 **Section animations are opacity-only** — no y-translation or stagger, unlike Contact page. Feels flat.

### Strengths
- ✅ **Alternating cream shades** create rhythm without dark/light switches — appropriate for legal content
- ✅ **Gold accent dividers** before each section body
- ✅ **Content width constrained to 52rem** — excellent measure for legal text readability
- ✅ **Contact card at bottom** mirrors Terms of Service for consistency

---

## 8. Terms of Service (/terms-of-service)

### Typography
- 🔴 **Hero headline weight 700** — same issue as Privacy Policy. Should be 300.
- 🔴 **Section heading weight 600 clashes with light hero** — jarring jump from 300-weight hero to 600-weight sections
- 🟡 **Body text color is solid `#3d3427`** — not using the opacity-based system. Should be `rgba(42, 34, 24, 0.55)`.
- 🟢 **"LEGAL" pill tracking 0.15em** — should be 0.2em

### Components
- 🟡 **Contact card email/phone links use dark text color** — Privacy Policy uses gold (#c9a86e) for same links. Inconsistency.

### Layout
- 🟢 **Cookie popup placement differs** from Privacy Policy — standardize inside vs outside SmoothScroll

### Strengths
- ✅ **Numbered section headings with gold numbers** — strong typographic device
- ✅ **"Acceptable Use" bullet list with gold em-dash markers** — well-executed detail
- ✅ **Centered hero** differentiates from Privacy Policy's left-aligned layout

---

## 9. 404 Page

### Critical Missing Elements
- 🔴 **No navbar** — users can't orient or navigate. Don't know what site they're on.
- 🔴 **No footer** — no secondary navigation or brand presence
- 🔴 **No custom cursor** — PremiumCursor component not included
- 🔴 **No cookie popup** — inconsistent with all other pages

### Components
- 🟡 **"Return to Home" button has no border-radius** — sharp rectangle vs. rounded pills everywhere else. Add `borderRadius: '9999px'` for pill shape.
- 🟡 **No subheadline or descriptive text** — just "Page not found" + button. Add 1-2 sentence description at 45% white opacity.

### Strengths
- ✅ **Giant "404" at 4% opacity with scale animation** — dramatic depth
- ✅ **Spiral background + gold gradient orb** — atmospheric
- ✅ **Headline at weight 300** — correctly follows design system

---

## 10. Shared Components

### Navbar (solutions-navbar.tsx)
- 🟡 **All links use raw `<a>` instead of `<Link>`** — full page reloads
- 🟡 **Dark background detection fires on every scroll event** — `elementsFromPoint()` + `getComputedStyle()` on every tick is expensive. Throttle to 100ms.
- 🟢 **Panel width hardcoded at 340px** — could overflow on mobile. Use `maxWidth: 'calc(100vw - 48px)'`.
- ✅ **Scroll percentage badge** — unique, functional
- ✅ **Active page gold dot indicator** — premium detail
- ✅ **Dark/light adaptive wordmark** — technically sophisticated

### Footer (solutions-footer.tsx)
- 🟡 **All links use raw `<a>` instead of `<Link>`** — full page reloads
- 🟡 **Marquee may gap on ultra-wide screens** (>2560px) — add a 3rd text copy
- 🟢 **Missing "Home" link** in footer nav — include `{ label: 'Home', href: '/' }`
- ✅ **Gold liquid glass card** — striking, distinctive
- ✅ **TRINADE marquee** — Awwwards-worthy moment

### Cookie Popup (solutions-cookie-popup.tsx)
- 🔴 **Never checks localStorage** — shows on every visit regardless of prior acceptance
- 🟡 **Compact width fixed at 380px** — overflow on mobile. Use `min(380px, calc(100vw - 48px))`
- 🟢 **Close button has `cursor: 'pointer'`** while rest of site uses `cursor: 'none'` — brief cursor flash

---

## 11. Priority Fix Matrix

### 🔴 Critical Fixes (Must-do for Awwwards)

| # | Issue | Page(s) | Fix |
|---|-------|---------|-----|
| 1 | Cookie popup shows every visit | All | Check localStorage before showing |
| 2 | Hero headline undersized + wrong weight | Homepage | `clamp(3.5rem, 7vw, 7.5rem)` weight 300 |
| 3 | Hero card body text too large | Homepage | Reduce to `clamp(1rem, 1.4vw, 1.35rem)` (~18-22px) |
| 4 | Hero headline weight 700 on legal pages | Privacy, Terms | Change to weight 300 |
| 5 | Body text opacity too high on legal pages | Privacy (78%), Terms (solid) | Lower to `rgba(42, 34, 24, 0.55)` |
| 6 | Missing GSAP pinned scroll section | Solutions | Implement "Our Approach" scroll cards |
| 7 | 404 missing navbar/footer/cursor | 404 | Add SolutionsNavbar, SolutionsFooter, PremiumCursor |
| 8 | All client-rendered (ssr: false) | Homepage | Enable SSR for content components (keep ssr:false only for cursor/preloader) |
| 9 | CEO quote massive whitespace | Company | Reduce padding below quote section |
| 10 | Raw `<a>` tags instead of Next.js `<Link>` | Navbar, Footer, all pages | Replace with `Link` from `next/link` |

### 🟡 Medium Fixes (Noticeable quality gaps)

| # | Issue | Page(s) | Fix |
|---|-------|---------|-----|
| 11 | Section headline sizes slightly under spec | Homepage, Solutions | Bump to `clamp(2.4rem, 4.8vw, 4.2rem)` |
| 12 | Solutions hero headline capped at 5rem | Solutions | Increase max to at least 6rem |
| 13 | Industry card grain at 35% opacity | Solutions | Reduce to 4-5% |
| 14 | Non-functional industry nav arrows | Solutions | Wire up or remove |
| 15 | EASE constant is generic cubic-bezier | Solutions | Use cinematic `[0.16, 1, 0.3, 1]` |
| 16 | Page background color mismatch | Homepage | Change `#e8e4de` to `#f2ede6` |
| 17 | Challenges grid orphan (5th item alone) | Homepage | Add 6th item or span full-width |
| 18 | Blog articles not clickable | Blog | Wrap in `<a>` tags |
| 19 | Missing newsletter CTA | Blog | Add dark section with email input |
| 20 | Blog article spacing too generous | Blog | Tighten `py-10` to `py-8` |
| 21 | Quote + Vision same bg tone | Company | Differentiate with darker cream or gradient |
| 22 | Team rows lack hover states | Company | Add subtle bg shift + gold accent on hover |
| 23 | Form label tracking wrong | Contact | Change 0.08em to 0.2em |
| 24 | No form validation/error states | Contact | Add animated inline validation |
| 25 | Scroll indicator doesn't fade | Contact | Fade out at >5% scroll |
| 26 | Legal sections fade-only animation | Privacy | Add y-translation + stagger |
| 27 | "Your Rights" is dense paragraph | Privacy | Convert to bulleted list |
| 28 | Contact links inconsistent on Terms | Terms | Match gold (#c9a86e) from Privacy |
| 29 | 404 button has no border-radius | 404 | Add `borderRadius: '9999px'` |
| 30 | 404 missing description text | 404 | Add subheadline at 45% opacity |
| 31 | Cookie popup overflows mobile | Cookie | Use `min(380px, calc(100vw - 48px))` |
| 32 | Navbar scroll detection is expensive | Navbar | Throttle to 100ms with rAF |
| 33 | Preloader missing 4th corner bracket | Homepage | Add bottom-right bracket |
| 34 | Accordion auto-expand race condition | Homepage | Enforce single-active-index |
| 35 | Industry grid not responsive | Solutions | Add breakpoints (1/2/5 col) |

### 🟢 Minor Fixes (Polish details)

| # | Issue | Page(s) |
|---|-------|---------|
| 36 | Hero tracking too tight (-0.04em) | Homepage |
| 37 | Card titles could be stronger (weight 600 or 20px) | Homepage |
| 38 | 6 scroll cards may be too many | Homepage |
| 39 | "Our Approach" headline exceeds section spec | Homepage |
| 40 | CTA button text "Get started" is generic | Homepage |
| 41 | Blog article titles slightly heavy | Blog |
| 42 | Same author on all articles | Blog |
| 43 | Redundant cursor:none on blog cards | Blog |
| 44 | Milestone year 2022 missing | Company |
| 45 | Carousel arrow contrast low | Company |
| 46 | "better future" could use italic | Company |
| 47 | Company file is 1300+ lines | Company |
| 48 | Character counter not enforced (maxLength) | Contact |
| 49 | Send button arrow no hover transform | Contact |
| 50 | Privacy body font 16.5px (spec 15-16px) | Privacy |
| 51 | Privacy eyebrow weight 500 (spec 600) | Privacy |
| 52 | Terms "LEGAL" pill tracking 0.15em | Terms |
| 53 | Footer marquee may gap on ultra-wide | Footer |
| 54 | Footer missing "Home" link | Footer |
| 55 | Footer CTA text same as page CTA | Footer |
| 56 | Navbar panel 340px hardcoded | Navbar |
| 57 | Cookie close button has cursor:pointer | Cookie |
| 58 | Dead lime color in palette | Homepage |
| 59 | Navbar logo filter is fragile | Navbar |
| 60 | Products nav link likely 404s | Navbar |

---

## What's Working Exceptionally Well

These elements are Awwwards-ready and should be preserved:

- **Preloader** — per-digit staggered counter, lens flare, "You Envision — We Build" tagline
- **Custom cursor** — dual-dot with gold ring hover state, pending-hover wait system
- **GSAP scroll-pinned cards** on Homepage — flagship scroll interaction
- **Blog editorial layout** — featured card, vertical article list with layered hover states
- **Company hero** — letter-by-letter "TRINADE" reveal with gradient stroke
- **Footer TRINADE marquee** — CSS-animated, gold gradient text
- **Gold glass system** — consistent glassmorphic treatment across navbar, cookie popup, footer
- **Grain overlays** — correctly subtle at 2-5% across most sections
- **Color palette discipline** — charcoal/cream/gold maintained across pages (no teal, no green)
- **Section rhythm** — alternating dark/light creates strong visual pacing (when followed)

---

*This report should be cleared page-by-page. Start with the Homepage (highest-impact fixes), then Solutions, then work through remaining pages.*
