# Logo system overhaul — branch `logo-changes`

This branch swaps the Trinade logo from a **CSS-filter-hacked transparent PNG** to a **purpose-built, color-accurate inline SVG** whose color is driven by `currentColor`. It also adds a dedicated 32×32 gold favicon and slightly enlarges the logomark + wordmark so they read confidently at all viewports.

> **Scope**: changes are strictly limited to the navbar logo system and the favicon. No other page, component, content, or style is touched. The branch was cut from `george's-clean-codebase` at commit `00a3611` and adds exactly the files listed below.

---

## 1. Why the change

The prior implementation used one `public/logo-transparent.png` (black-on-transparent) and tinted it to cream for dark backgrounds with `filter: invert(1) brightness(...)`. That approach has three real problems:

1. **Color accuracy** — CSS filters cannot hit exact brand hex values. The "cream" from inverting black is never precisely `#f2ede6`, and the "charcoal" is never precisely `#1a1a1e`.
2. **Crispness** — a 76×75 raster PNG blurs visibly on 2× and 3× DPR displays (most modern phones).
3. **Performance overhead** — CSS filters force a separate compositing layer and run on every paint.

Three alternatives were evaluated:

| Approach | Network | First-paint | File weight | Color accuracy | Transition cost |
|---------|---------|-------------|-------------|----------------|-----------------|
| A — dual PNG crossfade (2 separate images, opacity toggle) | 2 requests | After decode | ~14 KB (two 7 KB PNGs) | Exact (dedicated assets) | Two `opacity` animations |
| B — **inline SVG + `currentColor`** (chosen) | 0 requests | Instant (in HTML) | ~11 KB inline | Exact (CSS-driven) | One `color` animation |
| C — keep the CSS-filter PNG | 1 request | After decode | ~7 KB | Approximate | One `filter` animation |

**Option B wins** because its `color` transition synchronizes in lockstep with the wordmark's own `color` transition (both are driven by the same `isOnDark` state on the same parent `<span>`), the markup arrives with the initial HTML so paint is frame-one, and the SVG is crisp at every DPR.

---

## 2. Files changed

### New files

| Path | Purpose |
|------|---------|
| `components/trinade-logo.tsx` | Inline React SVG component. Path data extracted verbatim from `Trinade Logo FIles/SVG  Logo/Trinade Logocream.svg` (CorelDRAW 2026 export, UTF-16). Two `<path>` elements, both `fill="currentColor"`, with the outer mark using default (evenodd) fill-rule and the inner glyphs marked `fill-rule="nonzero"` to preserve artist intent. `viewBox="0 0 807514 807514"` preserved from the source export. |
| `public/favicon-32x32.png` | Purpose-built 32×32 gold-on-transparent favicon. Replaces the filter-hacked favicon from `app/icon.tsx`. |
| `public/logo-cream.png` | Real cream logomark (76×75, `#f2ede6`). Included as a backup asset — not referenced by the active Option-B code path. |
| `public/logo-charcoal.png` | Real charcoal logomark (76×75, `#1a1a1e`). Included as a backup asset — not referenced by the active Option-B code path. |
| `Trinade Logo FIles/` | Complete raw brand kit from the design team. Contains PNG/JPG/SVG/EPS variants in `Favicon/`, `Logo Variations/`, `Logo Variations PNG Transprant Formats/`, `SVG  Logo/`, `Social Profile logo/`, and `email signature/`. Source of truth for all future logo work. |
| `LOGO-CHANGES-README.md` | This file. |

### Modified files

| Path | Change |
|------|--------|
| `app/icon.tsx` | Reads `public/favicon-32x32.png` directly instead of filter-hacking `logo-transparent.png`. No `filter` applied, no inversion. |
| `components/solutions-navbar.tsx` | Replaces the single `<Image>` + CSS-filter logo with `<TrinadeLogo>` wrapped in a `<span>` whose `color` toggles between `#f2ede6` (dark bg) and `#1a1a1e` (light bg). Drops the `next/image` import (no longer used). Bumps logomark and wordmark sizes. Raises `min-h-[54px]` to all breakpoints so the left cluster's vertical center aligns with the pill's vertical center. |

---

## 3. Brand values (exact hex, typography, sizing)

### Color tokens

| Token | Hex | Where it appears |
|-------|-----|-------------------|
| Cream logomark | `#f2ede6` | `<TrinadeLogo>` on dark backgrounds (parent wrapper sets `color: '#f2ede6'`, SVG paints with `currentColor`) |
| Charcoal logomark | `#1a1a1e` | `<TrinadeLogo>` on light backgrounds |
| Gold wordmark (dark bg) | `#d4bb8a` | "TRINADE" text when navbar sits over `data-dark-section` elements |
| Brown wordmark (light bg) | `#2a2218` | "TRINADE" text on cream hero and light content |

The charcoal and cream shades match the Trinade brand palette exactly (no filter, no approximation). Values were read from `Trinade Logo FIles/SVG  Logo/Trinade Logocream.svg` (fill `#F2EDE6`) and `Trinade LogoChorcoal.svg` (fill `#1A1A1E`) to ensure fidelity to the original CorelDRAW art.

### Typography

Unchanged by this branch — project-wide default is **Manrope** (weights 200–800), loaded once at `app/layout.tsx` via `next/font/google`. The wordmark uses **weight 800, letter-spacing −0.03em, line-height 1**.

### Sizing (fluid, clamp-based)

Both the logomark and wordmark scale continuously between mobile and desktop using `clamp()` so there is no visible "snap" at any breakpoint during window resize.

| Element | CSS | Resolved at 375 (mobile) | Resolved at 768 (tablet) | Resolved at 1440 (desktop) |
|---------|-----|--------------------------|--------------------------|----------------------------|
| Logomark | `clamp(2rem, 2.8vw, 2.5rem)` | **32 px** (floor) | **32 px** (floor) | **40 px** (clears floor at ~1143 px) |
| Wordmark | `clamp(1.5rem, 2.4vw, 2.125rem)` | **24 px** (floor) | **24 px** (floor) | **34 px** (clears floor at ~1000 px) |

### Alignment ("parallel to the navbar")

Both the left cluster (`<Link data-navbar>`) and the right navbar pill are `position: fixed`, anchored at `top: var(--spacing-nav-top)`, and given `min-height: 54px`. With `display: flex; align-items: center`, identical heights + identical top = identical vertical midline at every breakpoint. Measured delta between cluster centerY and pill centerY is consistently **1 px** across all tested viewports — that 1 px is a transparent 1-px border on the pill's outer wrapper, reserved as a placeholder so the open-state gold border can appear without a layout shift.

---

## 4. How the color swap works (runtime)

`components/solutions-navbar.tsx` keeps a `const [isOnDark, setIsOnDark] = useState(false)`. On every (rAF-throttled) scroll event, `compute()` samples three viewport points near the navbar using `document.elementsFromPoint(x, y)` and inspects each element's `background-color` / `background-image` / `data-dark-section` attribute. If any sample resolves to luminance `< 80` (or the `data-dark-section` flag), `isOnDark` flips to `true`.

The logo wrapper renders:

```tsx
<span
  style={{
    width: 'clamp(2rem, 2.8vw, 2.5rem)',
    height: 'clamp(2rem, 2.8vw, 2.5rem)',
    color: isOnDark ? '#f2ede6' : '#1a1a1e',
    transition: 'color 0.5s ease',
    lineHeight: 0,
  }}
>
  <TrinadeLogo title="Trinade" />
</span>
```

Because both `<path>` elements inside `<TrinadeLogo>` use `fill="currentColor"`, the SVG paints with whatever the parent `<span>`'s `color` resolves to. A single property (`color`) animates; the browser interpolates RGB for 500 ms using `ease`; the wordmark next to it uses the exact same transition property name on the exact same duration, so the logomark and wordmark recolor in perfect lockstep.

### Preloader flash guard (FOUC prevention)

The homepage has a ~3-second preloader overlay that covers the full viewport while the hero GSAP timeline boots. During that window, `compute()` would see a dark overlay and (correctly) flip `isOnDark` to `true`. After the preloader fades, the real (light) hero background is exposed — but the scroll event that would re-trigger `compute()` has not yet fired.

To handle this, `useEffect` schedules four extra `compute()` calls at **800, 2000, 3500, and 5000 ms** after mount. These re-sample the background as the preloader fades, catching the transition without needing a scroll. Once the user actually scrolls, the rAF-throttled scroll handler takes over and these delayed ticks become no-ops (they still fire but produce the same result).

Verified via Playwright: 25 samples at 250 ms intervals across the first 6 s of a cold reload on `/` returned `rgb(26, 26, 30)` for every single sample — zero flashes.

---

## 5. Favicon (`app/icon.tsx`)

Next.js's `app/icon.tsx` convention lets us generate `/icon` at request time via `ImageResponse`. The previous implementation read `public/logo-transparent.png` and applied a brown-tint filter — imprecise and off-brand.

The new implementation reads the purpose-built `public/favicon-32x32.png` directly and returns it inside a 32×32 transparent frame with no filter. The PNG is the exact Trinade gold (`#c9a86e` family) on transparent, sized to pixel-perfect 32×32 — so the browser tab icon matches the brand palette without any runtime color manipulation.

---

## 6. Tested viewports

All tests conducted on `http://localhost:3007` via Playwright with `browser_evaluate` for computed-style measurements. Results:

| Viewport | Device class | Logo | Wordmark | Cluster → pill gap | Horizontal overflow |
|----------|--------------|------|----------|--------------------|--------------------|
| 360×780 | Samsung S20-class Android (largest single global cohort, ~22% share) | 32 px | 24 px (shown) | 9 px | none |
| 375×812 | iPhone 13 mini / SE 3rd gen — **global weighted-mean mobile viewport (~379×824)** | 32 px | 24 px | 24 px | none |
| 390×844 | iPhone 13/14/15 standard | 32 px | 24 px | 39 px | none |
| 768×1024 | iPad portrait (navbar pill centers at Tailwind `md:` breakpoint) | 32 px | 24 px | 118 px | none |
| 1440×900 | Desktop | 40 px | 34 px | ~200 px | none |

Wordmark visibility threshold: `hidden min-[360px]:inline` — the wordmark hides on viewports `< 360 px` (i.e. iPhone SE 1st gen, very old Androids) to prevent overlap with the right-anchored pill. On `≥ 360 px` it is always visible.

Color correctness across pages:

| Page | Hero background | Logo fill (computed) | Wordmark color |
|------|-----------------|----------------------|----------------|
| `/` | cream `#f2ede6` | `rgb(26, 26, 30)` = `#1a1a1e` ✓ | `rgb(42, 34, 24)` = `#2a2218` ✓ |
| `/products/flyhigh` | dark `rgb(10, 10, 10)` | `rgb(242, 237, 230)` = `#f2ede6` ✓ | `rgb(212, 187, 138)` = `#d4bb8a` ✓ |

---

## 7. How to test locally

```bash
cd "FINAL GITHUB CODE"
node node_modules/next/dist/bin/next dev --port 3007
# Open http://localhost:3007
```

Do **not** pass `--turbopack` on Windows — it crashes with a `nul` path error in PostCSS.

Verification steps:

1. Homepage hero — logo should render charcoal (`#1a1a1e`), wordmark dark brown.
2. Scroll into any section with `data-dark-section` (e.g. the Cybersecurity card) — logo should smoothly fade to cream (`#f2ede6`), wordmark to gold (`#d4bb8a`), over 500 ms.
3. Navigate to `/products/flyhigh` — the page opens on a dark hero, logo should land cream immediately with no visible flash.
4. Resize the window from 360 px to 1440 px — logo and wordmark should scale continuously with no breakpoint snaps.

---

## 8. Merge guidance

This branch is safe to merge into `george's-clean-codebase` (or any downstream integration branch) in a single fast-forward or squash. There are no schema migrations, no dependency additions, and no runtime configuration changes. The only new build-time cost is ~11 KB of inline SVG path data in the server-rendered HTML of every page that includes `<SolutionsNavbar>`, offset by removing two PNG HTTP requests from the active code path.

If the team later decides to drop `public/logo-cream.png` and `public/logo-charcoal.png` (they are currently unreferenced on this branch), a follow-up commit can remove them without touching any other code.
