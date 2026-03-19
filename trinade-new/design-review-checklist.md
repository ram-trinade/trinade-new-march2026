# Trinade AI Technologies — Awwwards Design Review Checklist

**Site**: Trinade AI Technologies Corporate Website
**Palette**: Charcoal / Cream / Gold
**Font**: Manrope (200-800)
**Aesthetic**: Editorial luxury with grain overlays and gold glassmorphism
**Target**: Awwwards submission (scored on Design 40%, Usability 30%, Creativity 20%, Content 10%)

---

## 1. Typography

- [ ] **Font family consistency** — Manrope is the only typeface rendered across all pages; no system font fallbacks visible during load (verify with DevTools computed styles)
- [ ] **Hero headline sizing** — Uses `clamp(3.5rem, 7vw, 7.5rem)` and scales smoothly from 375px to 2560px without jumps or overflow
- [ ] **Section headline sizing** — Uses `clamp(2.4rem, 4.8vw, 4.2rem)` consistently across all interior section titles
- [ ] **Weight hierarchy** — Three distinct tiers are visually clear: weight 300 (headlines), weight 400 (body copy), weight 600 (eyebrow labels/caps)
- [ ] **Headline line-height** — Set between 1.1 and 1.2; multi-line headlines do not collide or feel cramped
- [ ] **Body line-height** — Set between 1.7 and 1.8; paragraphs feel open and readable without excessive vertical gaps
- [ ] **Eyebrow letter-spacing** — Uppercase labels use `letter-spacing: 0.2em` at 12px; characters are evenly spaced and not clipped
- [ ] **Responsive scaling** — Text remains proportional and readable at every viewport width; no text truncation, orphaned words on hero lines, or awkward wrapping below 768px
- [ ] **Optical alignment** — Large headlines align optically with body content below them (accounting for cap-height offset of light-weight Manrope)
- [ ] **No rogue weights or sizes** — Audit all pages for any text that deviates from the three-tier weight system or uses non-standard sizes outside the defined clamp ranges

---

## 2. Color Palette

- [ ] **Brand palette adherence** — Only charcoal (#1a1a1e, #0a0a0a), cream (#f2ede6, #ebe5db), gold (#c9a86e, #d4bb8a, #a0814a), and white/black opacity variants are used; absolutely no teal, green, blue, or off-palette colors anywhere
- [ ] **Dark section text contrast** — Headlines at 93-95% white opacity and body at 45-55% white opacity both pass WCAG AA against #0a0a0a and #1a1a1e backgrounds
- [ ] **Light section text contrast** — Headlines at 100% #2a2218 and body at 55% opacity both pass WCAG AA against #f2ede6 and #ebe5db backgrounds
- [ ] **Gold accent contrast** — #c9a86e used for interactive elements (links, pills, borders) meets minimum 3:1 contrast against both cream and dark backgrounds
- [ ] **Section transitions** — Alternating cream and dark sections transition cleanly; no visible seam artifacts, color bleeding, or unexpected gaps between sections
- [ ] **Gold consistency** — The same gold values are used for pills, rules, accents, borders, and highlights across all pages; no warm/cool gold drift
- [ ] **Text opacity tiers on dark** — Three clear tiers: 93-95% (primary headlines), 45-55% (body), 25-30% (tertiary/muted) applied consistently
- [ ] **Text opacity tiers on light** — Three clear tiers: 100% (headlines), 55% (body), 40% (tertiary) applied consistently
- [ ] **Selection color** — Text selection highlight uses gold (#c9a86e or variant) across the entire site, including within form inputs
- [ ] **No unexpected color shifts** — Dark mode system preferences or forced-colors mode do not break the palette; site looks correct regardless of OS theme

---

## 3. Layout & Spacing

- [ ] **Grid system** — A consistent max-width container (1200-1400px range) centers content on large screens; content never stretches uncomfortably wide on 2560px+ displays
- [ ] **Horizontal padding** — Section padding is consistent across all pages; content aligns to the same invisible grid edges
- [ ] **Section rhythm** — Alternating cream/dark sections create a predictable visual cadence; no two consecutive sections share the same background
- [ ] **Vertical spacing between sections** — Generous and consistent (120-160px range on desktop); sections breathe without feeling disconnected
- [ ] **Internal section spacing** — Eyebrow-to-headline, headline-to-body, and body-to-CTA gaps follow a clear spacing scale and are consistent page to page
- [ ] **Edge-to-edge vs contained** — Full-bleed backgrounds extend to viewport edges while text content respects container max-width; no content touching screen edges on mobile
- [ ] **Alignment audit** — Left edges of headlines, body text, and CTAs align precisely within each section; no subtle 2-4px misalignments
- [ ] **Card grid spacing** — Cards, accordions, and grid items use consistent gap values; items are evenly distributed
- [ ] **Responsive stacking** — Multi-column layouts (split sections, card grids) stack gracefully to single column below 768px without layout breaks
- [ ] **Footer spacing** — Footer sections (CTA, nav links, marquee, copyright) have proportional internal spacing and align with the site-wide grid

---

## 4. Imagery & Media

- [ ] **Grain overlay presence** — Every section (cream and dark) has an SVG noise texture grain overlay at 3-5% opacity; grain is visible but subtle, never distracting
- [ ] **Grain consistency** — Grain texture uses the same SVG noise pattern across all sections; no sections have noticeably different grain density or scale
- [ ] **Atmospheric gradient orbs** — Decorative radial gradient orbs add depth to dark sections without obscuring content or creating hotspots
- [ ] **Gold glassmorphic layers** — Glass card effects use consistent blur (24-28px), saturation (1.4-1.6), and gold-tinted rgba values across all instances
- [ ] **Image quality** — All decorative images (spiral-*.jpg, gradient-*.jpg) are high resolution with no visible compression artifacts, banding, or pixelation at 1x and 2x displays
- [ ] **Image loading** — Images load progressively or with a fade-in; no layout shift (CLS) when images appear; lazy loading is applied to below-fold images
- [ ] **Decorative balance** — Gradient orbs and atmospheric elements are distributed evenly; no section feels visually empty while another is cluttered
- [ ] **Dark section depth** — Dark backgrounds (#0a0a0a) have enough layered depth (subtle gradients, orbs, grain) to avoid feeling flat or like a plain black div
- [ ] **No broken images** — All image paths resolve correctly in production build; no broken image icons or missing backgrounds on any page

---

## 5. Components & Interactions

- [ ] **Button hierarchy** — Primary buttons (gold border, gold text) and secondary buttons (white/cream border) are visually distinct; hover states animate smoothly (border glow, fill, or opacity shift)
- [ ] **Button hover timing** — Hover transitions use 200-300ms duration with appropriate easing; no instant snaps or sluggish delays
- [ ] **Accordion behavior** — Accordions (Company values, How We Work) open/close smoothly with height animation; only one panel open at a time; icons rotate to indicate state
- [ ] **Carousel/slider** — Testimonials and milestones carousels have clear navigation (arrows or dots), smooth transitions, and no layout shift during slide changes
- [ ] **Contact form** — All inputs (name, email, phone, subject, message) have consistent styling: dark glass background, subtle border, gold focus ring, placeholder text at appropriate opacity
- [ ] **CountryCodeDropdown** — Opens smoothly with AnimatePresence animation; displays flags + country names + dial codes; click outside closes; scroll contained within dropdown
- [ ] **SubjectDropdown** — Scrollable dropdown matches gold glass styling of other form elements; selected state is visually clear
- [ ] **Card hover states** — Cards across all pages (blog, solutions, homepage) have a cohesive hover effect (subtle lift, border glow, or opacity change) that feels intentional and uniform
- [ ] **Cookie popup** — Gold glass styling matches site aesthetic; accept/decline actions are clear; popup does not obstruct critical content; dismiss animation is smooth
- [ ] **Link styling** — Inline text links use gold (#c9a86e) color with appropriate hover state (underline or opacity); visited state does not break palette

---

## 6. Motion & Animation

- [ ] **Preloader sequence** — Dark gradient background, lens flare, tagline, and per-digit counter (0-25-50-75-100%) all animate in correct order with staggered vertical slides at weight 600; total duration feels intentional (not too fast, not tedious)
- [ ] **Entrance animations** — Elements animate in via `useInView` with `once: true`; no re-triggering on scroll back; animations feel like a reveal, not a distraction
- [ ] **Cinematic easing** — Primary content reveals use `[0.16, 1, 0.3, 1]` (fast in, gentle out); animations feel weighty and premium, not bouncy or mechanical
- [ ] **UI easing** — Interactive elements (dropdowns, tooltips, hover states) use `[0.32, 0.72, 0, 1]` for snappy, responsive feedback
- [ ] **Staggered word reveals** — Hero headline words animate in with ~0.06s stagger; the cascade reads naturally left-to-right and does not feel choppy
- [ ] **Gold rule reveals** — Horizontal gold rules animate with `scaleX: 0 to 1` from left; timing aligns with surrounding content entrance
- [ ] **Scroll-driven pinned sections** — "Our Approach" GSAP ScrollTrigger pinned scroll cards advance smoothly; no jank, no stuck states, no jump on pin/unpin
- [ ] **Frame rate** — All animations maintain 60fps on mid-range hardware (test on a 2020 laptop); no visible frame drops during scroll or entrance sequences
- [ ] **Animation orchestration** — Multiple simultaneous animations on a section feel coordinated (headline, then body, then CTA, then decorative elements) rather than chaotic
- [ ] **Reduced motion** — `prefers-reduced-motion: reduce` disables or simplifies all animations; content is still fully accessible without motion

---

## 7. Responsiveness

- [ ] **Desktop 1440px+** — Layout uses full design fidelity; multi-column grids, generous whitespace, large typography, all decorative elements visible
- [ ] **Laptop 1024-1440px** — Content scales proportionally; no horizontal overflow; navigation remains fully usable; card grids may reduce columns
- [ ] **Tablet 768-1024px** — Layout adapts to narrower widths; split sections stack or reflow; touch targets are adequately sized; navbar menu works via tap
- [ ] **Mobile 375-768px** — Single-column layout; hero text is still impactful; form inputs are full-width and thumb-friendly; no horizontal scroll
- [ ] **Ultra-wide 2560px+** — Content remains centered within max-width container; backgrounds extend to fill; no awkward empty gutters or stretched elements
- [ ] **Breakpoint transitions** — No sudden layout jumps when resizing between breakpoints; elements reflow gracefully through the entire range
- [ ] **Touch targets** — All interactive elements (buttons, links, accordion triggers, form inputs) are at least 44x44px on touch devices
- [ ] **Text reflow** — Long headlines wrap naturally on smaller screens without breaking mid-word; no text overflow or clipping
- [ ] **Image scaling** — Decorative and content images scale proportionally; no aspect ratio distortion or important content cropped on mobile
- [ ] **Navigation mobile** — Menu pill and expanded panel are fully functional on mobile; panel content is scrollable; close action is clear and accessible

---

## 8. Accessibility

- [ ] **Color contrast WCAG AA** — All text/background combinations meet 4.5:1 ratio for normal text and 3:1 for large text (18px+ or 14px+ bold); verify gold-on-cream and white-on-dark pairs specifically
- [ ] **Minimum font size** — No body text smaller than 14px; eyebrow labels at 12px are decorative/supplementary, not critical content
- [ ] **Focus indicators** — All interactive elements show a visible focus ring (gold border or outline) when navigated via keyboard; focus styles are not suppressed
- [ ] **Keyboard navigation** — Full site is navigable with Tab/Shift+Tab; Enter activates buttons/links; Escape closes modals/dropdowns; arrow keys work within accordions and carousels
- [ ] **Screen reader structure** — Semantic HTML headings (h1-h6) create a logical outline; landmark roles (main, nav, footer) are present; no heading level skips
- [ ] **Image alt text** — Decorative images use `alt=""` or `aria-hidden="true"`; meaningful images have descriptive alt text
- [ ] **ARIA labels** — Custom components (dropdowns, accordions, carousel) have appropriate `aria-expanded`, `aria-controls`, `aria-label`, and `role` attributes
- [ ] **Form accessibility** — All form inputs have associated labels (visible or `aria-label`); error states are announced; required fields are indicated
- [ ] **Custom cursor fallback** — When `cursor: none` is applied, keyboard/touch users are not disadvantaged; cursor styles do not interfere with screen readers
- [ ] **Reduced motion support** — `prefers-reduced-motion` media query disables or minimizes animations for users who have requested reduced motion at the OS level

---

## 9. Branding & Visual Cohesion

- [ ] **Gold accent consistency** — #c9a86e (or its light/dark variants) is the sole accent color across all pages; no page introduces a new accent
- [ ] **TRINADE wordmark** — Displays at 28px, weight 800, fixed top-left on every page; consistent positioning and sizing; links to homepage
- [ ] **Logo placement** — Transparent PNG logo at 36px fixed top-right on every page; consistent filter and opacity (black filter at 85% opacity)
- [ ] **Grain overlay uniformity** — SVG noise grain is applied identically to every section across every page; toggling between pages shows no visible grain difference
- [ ] **Glassmorphism system** — Gold glass cards, dropdown panels, and cookie popup all use the same blur/saturation/rgba formula; no component has a noticeably different glass effect
- [ ] **Editorial tone** — Light font weights (300) for headlines, generous whitespace, and restrained gold accents maintain a luxury editorial feel; nothing feels tech-generic or startup-template
- [ ] **Page-to-page cohesion** — Navigating between pages (Home, Company, Blog, Solutions, Contact) feels like one unified site; shared components (navbar, footer, cursor, cookie popup) are identical
- [ ] **Dark section consistency** — All dark sections across all pages use the same background (#0a0a0a or #1a1a1e), same white opacity tiers, and same atmospheric layering approach
- [ ] **Light section consistency** — All cream sections use #f2ede6 or #ebe5db with the same text colors, gold accents, and grain overlays

---

## 10. Performance & Technical

- [ ] **Initial load time** — First Contentful Paint (FCP) under 1.5s on a fast 3G connection; preloader masks any remaining asset loading
- [ ] **Cumulative Layout Shift** — CLS score below 0.1; no visible content jumping after initial render, especially when images and fonts load
- [ ] **Largest Contentful Paint** — LCP under 2.5s; hero section content (headline + background) renders quickly
- [ ] **Animation frame rate** — Scroll animations, entrance reveals, and GSAP pinned sections maintain 60fps on a mid-range device; use Chrome DevTools Performance panel to verify
- [ ] **Lenis smooth scroll** — Scroll feels smooth and responsive; no perceptible input lag; scroll-linked animations (percentage indicator, parallax) update without stutter
- [ ] **Image optimization** — All images served in modern formats (WebP or AVIF) with appropriate compression; no unoptimized PNG/JPG files larger than 200KB
- [ ] **Code splitting** — Each page loads only its required JavaScript; `dynamic()` with `{ ssr: false }` prevents unnecessary client bundles from loading on other pages
- [ ] **Font loading** — Manrope loads via `next/font` with `display: swap` or preload; no flash of unstyled text (FOUT) or invisible text (FOIT) lasting more than 100ms
- [ ] **No console errors** — Browser console is clean on all pages; no React hydration mismatches, missing resources, or unhandled promise rejections
- [ ] **Build output** — `next build` completes without warnings; bundle sizes are reasonable (< 300KB initial JS gzipped)

---

## 11. Navigation & Wayfinding

- [ ] **Navbar layout** — Three-element layout is clear: TRINADE wordmark (left), menu pill (center), logo (right); elements do not overlap or misalign at any viewport width
- [ ] **Active page indicator** — Gold dot indicator correctly highlights the current page in the expanded menu panel; dot position updates on navigation
- [ ] **Menu pill** — Center pill displays "Menu" label and scroll percentage; percentage updates smoothly during scroll; pill is clickable and opens the panel
- [ ] **Menu panel** — Expanded panel lists all pages with clear typography; panel opens/closes with smooth animation; current page is visually distinguished
- [ ] **Footer navigation** — Footer contains links to all main pages (Home, Company, Blog, Contact, Privacy, Terms); links are correctly grouped and styled
- [ ] **Scroll percentage** — Percentage in the menu pill accurately reflects scroll position (0% at top, 100% at bottom); updates without jitter
- [ ] **Back to top** — Users have a clear way to return to the top of long pages (either explicit button or navbar interaction)
- [ ] **Internal linking** — All internal links use Next.js `<Link>` for client-side navigation; no full page reloads on internal navigation
- [ ] **404 handling** — Invalid routes display the custom 404 page with gold styling; navigation back to the site is clear and accessible

---

## 12. Micro-details & Polish

- [ ] **Custom cursor** — White circle (BASE_SIZE=20, HOVER_SIZE=50) follows mouse with lerp 0.12 smoothing; `mix-blend-mode: difference` inverts against both cream and dark backgrounds
- [ ] **Cursor hover growth** — Cursor expands to 50px on interactive elements (buttons, links, inputs) and returns to 20px on leave; transition is smooth, not instant
- [ ] **Selection highlight** — Text selection uses gold background across the entire site including form inputs, paragraphs, and headings
- [ ] **Scrollbar styling** — Default scrollbar is hidden or styled to match the site aesthetic (thin, dark, unobtrusive); Lenis handles scroll behavior
- [ ] **Gold rule dividers** — Thin horizontal gold rules between sections are pixel-perfect; consistent width and color; scaleX animation triggers correctly on scroll
- [ ] **Grain texture at zoom** — Grain overlay remains subtle and does not become a visible grid pattern when the page is zoomed to 150% or 200%
- [ ] **Cookie popup polish** — Gold glass styling, clear typography, smooth entrance/exit animation; popup does not cause layout shift; `data-lenis-prevent` works at 125%+ zoom
- [ ] **Loading states** — Form submission shows a loading indicator; no dead moments where the user is unsure if an action registered
- [ ] **Edge case: empty states** — Blog page with no articles, contact form with validation errors, and other edge cases are handled gracefully with appropriate messaging
- [ ] **Hover consistency** — All hoverable elements across the site respond within the same timing range (200-300ms) and use complementary effects; no element feels disconnected from the system

---

## 13. Awwwards-Specific Criteria

### Design (40% of score)

- [ ] **Distinctive visual identity** — The charcoal/cream/gold palette with editorial typography creates a look that is immediately recognizable and cannot be confused with a template
- [ ] **Cohesive design system** — Every component, color, spacing value, and animation choice feels like part of a single intentional system; nothing looks added as an afterthought
- [ ] **Typographic excellence** — The light-weight Manrope headlines paired with structured body text demonstrate typographic sophistication beyond the average corporate site
- [ ] **Layered visual depth** — Grain overlays, atmospheric orbs, glassmorphism, and subtle gradients create a sense of depth that rewards close inspection
- [ ] **Restraint and confidence** — The design says more with less; gold accents are used sparingly and purposefully; whitespace is generous; nothing is cluttered or competing for attention

### Usability (30% of score)

- [ ] **Intuitive navigation** — A first-time visitor can find any page within 2 clicks from any other page; the menu system is self-explanatory
- [ ] **Clear visual hierarchy** — On every page, the eye naturally flows from the most important element (headline) through supporting content to the call-to-action
- [ ] **Responsive excellence** — The site is equally beautiful and functional on a 375px phone and a 2560px ultrawide; no breakpoint feels like an afterthought
- [ ] **Form usability** — Contact form fields are clearly labeled, validation is immediate and helpful, submission feedback is clear, and the overall flow is frictionless
- [ ] **Scroll experience** — Lenis smooth scroll, pinned sections, and scroll-triggered reveals create an experience that feels guided and intentional, not disorienting

### Creativity (20% of score)

- [ ] **Unique interactions** — Custom cursor, preloader sequence, pinned scroll cards, and gold glass effects go beyond standard website patterns
- [ ] **Memorable moments** — At least 2-3 "wow" moments exist in a full scroll-through (preloader reveal, hero animation, Our Approach pinned section, footer marquee)
- [ ] **Boundary-pushing craft** — The grain overlays, glassmorphism system, and mix-blend-mode cursor demonstrate technical craft that elevates the design
- [ ] **Personality without gimmick** — Creative choices serve the brand (luxury, intelligence, precision) rather than existing for novelty alone
- [ ] **Animation storytelling** — Animations guide the user through a narrative; reveals feel like a curtain being drawn back, not random elements flying in

### Content (10% of score)

- [ ] **Meaningful structure** — Content is organized in a logical hierarchy: who we are, what we do, how we do it, proof points, call to action
- [ ] **Readability** — Body text is scannable with short paragraphs, clear headings, and adequate contrast; users can quickly extract key information
- [ ] **Content-design harmony** — Typography, spacing, and color choices serve the content rather than fighting it; nothing is hard to read for the sake of aesthetics
- [ ] **Microcopy quality** — Button labels, form placeholders, error messages, and navigation items use clear, concise language
- [ ] **Information density balance** — Pages have enough content to feel substantial but not so much that they feel overwhelming; whitespace and section breaks provide breathing room

---

## Evaluation Summary

| Category | Items | Passing | Score |
|---|---|---|---|
| 1. Typography | 10 | /10 | |
| 2. Color Palette | 10 | /10 | |
| 3. Layout & Spacing | 10 | /10 | |
| 4. Imagery & Media | 9 | /9 | |
| 5. Components & Interactions | 10 | /10 | |
| 6. Motion & Animation | 10 | /10 | |
| 7. Responsiveness | 10 | /10 | |
| 8. Accessibility | 10 | /10 | |
| 9. Branding & Visual Cohesion | 9 | /9 | |
| 10. Performance & Technical | 10 | /10 | |
| 11. Navigation & Wayfinding | 9 | /9 | |
| 12. Micro-details & Polish | 10 | /10 | |
| 13. Awwwards Criteria | 20 | /20 | |
| **Total** | **137** | **/137** | |

### Notes

_Use this space for additional observations, screenshots, or follow-up items._
