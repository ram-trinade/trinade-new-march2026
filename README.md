# Trinade AI Technologies — Corporate Website

Built with Next.js 15 (App Router), Tailwind CSS v4, Motion v12, and GSAP. TypeScript strict mode.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3006
npm run build   # production build
npm run start   # serve production build
npm run lint    # ESLint
```

> On Windows, do **not** use `--turbopack` — it fails with a `nul` path error in PostCSS. The standard `next dev` on port 3006 is what the scripts invoke.

## Structure

```
app/         Next.js App Router — every route, layout, and metadata
components/  All UI components (flat)
public/      Static assets — images, favicons, fonts
Images/      Source images for blog content (non-runtime)
```

---

## Branch: `seo-opt-hardening` — SEO + GEO audit remediation

This branch applies a comprehensive technical SEO and GEO (Generative Engine Optimization) hardening pass derived from a full audit of the site. The audit produced 29 findings across four priority tiers. This branch implements the code fixes for 21 of them; the remaining 8 are either design/asset tasks the code cannot perform or deliberate non-changes documented inline.

### Audit findings (29 total)

**Critical (5) — single-handed invisibility**

| ID | Finding |
|---|---|
| C1 | Page content loaded via `dynamic(…, { ssr: false })` → initial HTML served ~22 KB of metadata shells with zero body content. Invisible to GPTBot, PerplexityBot, ClaudeBot, Bingbot, and social unfurlers. |
| C2 | Canonical + `metadataBase` coupled to a hardcoded fallback; preview/dev deployments emit `index:true`, competing with production canonical. |
| C3 | Organization + Article `publisher.logo` pointed at 32×32 `/icon.png` — fails Google's ≥112×112 requirement for Knowledge Panel / rich-result eligibility. |
| C4 | OG image was 540×720 portrait — Twitter `summary_large_image` requires 1200×630 landscape; LinkedIn/Slack/WhatsApp unfurlers crop or drop portrait images. |
| C5 | `app/head.tsx` (deprecated Next 13 convention) plus a hand-rolled `<head>` block in root layout duplicated icon `<link>` emissions. |

**High (9)**

| ID | Finding |
|---|---|
| H1 | `WebSite.potentialAction.SearchAction.target` pointed at `/blog` — not a valid `{search_term_string}` URL template. Google drops the sitelinks search box. |
| H2 | `sameAs` URLs (`linkedin.com/company/trinadeai`, `instagram.com/trinadeai`, `x.com/trinadeai`) unverified; broken handles actively damage Organization trust. |
| H3 | No `Service`, `Product`, `BreadcrumbList`, `FAQPage`, `AboutPage`, or `ContactPage` schemas anywhere. |
| H4 | Article schema minimal — no `articleSection`, `speakable`, or explicit `ImageObject` dimensions on publisher logo. `dateModified` forced identical to `datePublished`. |
| H5 | Sitemap `lastModified` hardcoded to one site-wide date → search engines treat everything as stale at once, lowering recrawl priority. No image sitemap entries. |
| H6 | Per-agent `<meta name="bingbot|gptbot|perplexitybot|claudebot">` tags emitted — none of those crawlers read per-agent meta, only `robots.txt`. |
| H7 | `SolutionsNavbar` and `SolutionsFooter` `ssr: false` on every page → internal-link graph signals invisible to non-JS crawlers. (Covered by the C1 fix.) |
| H8 | `images: { unoptimized: true }` in `next.config.ts` disabled Next's image optimizer pipeline globally — no AVIF/WebP, no responsive srcset, degraded LCP. |
| H9 | `ItemList.itemListElement` on blog hub carried bare URL+name pairs — no per-item `Article`/`BlogPosting` entity reference for Google to ingest. |

**Medium (9)**

| ID | Finding |
|---|---|
| M1 | `locale: 'en_IN'` may be too narrow for international audiences. |
| M2 | `Organization.areaServed: India` constrains how LLMs associate the brand with queries outside India. |
| M3 | No RSS / Atom feed — LLM pipelines consume RSS aggressively for blog freshness; missing feed leaves that discovery channel cold. |
| M4 | Organization lacked `description` (the one-sentence blurb LLMs quote verbatim) and `knowsAbout` (topical-authority declaration). |
| M5 | No `contactPoint` on Organization — loose `email`/`telephone` properties don't populate Knowledge Panel contact buttons cleanly. |
| M6 | Article authors rendered as bare `Person` name strings without `url`/`sameAs` — weak E-E-A-T signal. |
| M7 | Blog author names (Priya Sharma, Arjun Mehta, Kavitha Rao, Vikram Desai, Neha Kapoor, Rohan Iyer) appear synthetic; detectable as invented bylines on AI-written content. |
| M8 | `.next/` build artifacts committed into git history despite being in `.gitignore` — hundreds of churned files on every build, 15 MB bloat per revision. |
| M9 | `keywords` meta tag present — ignored by Google since 2009, Bing since 2014. |

**Low (6)**

| ID | Finding |
|---|---|
| L1 | `referrer: 'origin-when-cross-origin'` — neutral, no net benefit. |
| L2 | `formatDetection.telephone: false` disabled iOS phone-tap detection; visible phone numbers didn't auto-link on mobile. |
| L3 | `google: 'notranslate'` — rarely needed, neutral. |
| L4 | `msapplication-TileColor` — targets Windows 8.1 pinned tiles, irrelevant on supported OSes. |
| L5 | Manifest `icons` only listed 32×32; PWA install eligibility normally requires 192×192 + 512×512. |
| L6 | Manifest `screenshots` referenced `/logo-transparent.png` as a narrow-form screenshot — a logo is not a screenshot. |

---

### Changes implemented (11 commits, 21 findings)

**Batch 1 — Critical** — [`85f9ea8`, `15f1e5b`]
- **C1** Restored SSR on content + navigation components across all pages. `ssr: false` now retained only on `PremiumCursor` and `PreloaderAnimation` (legitimate browser-only dependencies); removed from `HomepageContent`, `SolutionsContent`, `FlyHighContent`, `SleepAlertContent`, `ExperimentalErrorContent`, `SolutionsNavbar`, `SolutionsFooter`, `SolutionsCookiePopup`, and `SmoothScroll`. Initial HTML response grew from ~22 KB to ~112 KB — body copy now visible to all crawlers including non-JS ones.
- **C2** Added `isProductionDeployment()` helper in `lib/seo/site-config.ts`. Root layout now emits `robots: noindex, nofollow` when `VERCEL_ENV !== 'production'`. Per-page metadata helper's unconditional `robots` override removed (was silently forcing `index:true` on preview/dev).
- **C3** Organization + Article publisher logo refs swapped from `/icon.png` (32×32) to `/logo-transparent.png` (540×720) to satisfy Google's ≥112×112 minimum.
- **C4** Centralized OG image into four constants (`OG_IMAGE_PATH`, `_WIDTH`, `_HEIGHT`, `_ALT`) in `lib/seo/page-metadata.ts`. Root layout + per-page helpers all read from this one source of truth — a single edit swaps the image when a 1200×630 asset is produced.
- **C5** Deleted legacy `app/head.tsx` (Next 13 pattern, removed in 13.3 and dead code in Next 15). Removed the manual `<head>` block from `app/layout.tsx`. Added `icons` field to the Metadata API as sole source of truth for favicons and touch icons.

**Batch 2 — High** — [`b43900e`, `88dbe5c`, `720c4f9`, `5f8ee40`, `9d19b93`]
- **H1** Removed the broken SearchAction. Re-add only when a real `/search?q={search_term_string}` endpoint exists.
- **H3** Created five JSON-LD components under `components/seo/`: `BreadcrumbJsonLd`, `ServiceJsonLd`, `ProductJsonLd`, `PageTypeJsonLd` (AboutPage + ContactPage), `FaqJsonLd`. Wired into every nested page layout:
  - `/solutions` → `Service` + `BreadcrumbList`
  - `/products/flyhigh` → `Product` + `FAQPage` (6 Q&A pairs mirrored from the visible FAQ accordion) + `BreadcrumbList`
  - `/products/sleep-alert` → `Product` + `BreadcrumbList`
  - `/company` → `AboutPage` + `BreadcrumbList`
  - `/contact` → `ContactPage` + `BreadcrumbList`
  - `/blog` → `BreadcrumbList` (at page level to avoid duplicating on post pages)
  - `/blog/[slug]` → `BreadcrumbList` (3-item chain including post title)
  - `/privacy-policy` → `BreadcrumbList`
- **H3 fixes** — two defects caught in review and fixed:
  - Product breadcrumbs had a duplicate `Products` middle segment pointing at the leaf URL; removed to emit clean two-item breadcrumbs.
  - Blog hub's breadcrumb originally lived in `app/blog/layout.tsx`, which stacks into every post route and produced duplicate BreadcrumbList JSON-LD; moved the hub breadcrumb to `app/blog/page.tsx`.
- **H4** Article schema gained `articleSection: 'AI & Technology'` (default, overridable per-post later), `speakable: { cssSelector: ['h1', 'article p'] }` for voice-assistant read-aloud support, and explicit `width`/`height` on publisher logo `ImageObject`.
- **H5** Sitemap rewritten as per-path metadata table (`STATIC_PATHS`). Each entry carries its own `lastModified`, `changeFrequency`, `priority`, and optional `images` list. Image sitemap namespace (`xmlns:image`) + `<image:loc>` entries emitted for homepage + every blog post.
- **H6** Removed `bingbot`/`gptbot`/`perplexitybot`/`claudebot` meta tags from both root layout and per-page helper. Those crawlers honor only `robots.txt` (`app/robots.ts` already allows them).
- **H8** Removed `images: { unoptimized: true }` from `next.config.ts`. Vercel's edge image optimizer now enabled → AVIF/WebP + responsive srcset automatic.
- **H9** Each `ItemList.itemListElement` on the blog hub carries a full `BlogPosting` entity reference (headline, description, datePublished, author, image, publisher, inLanguage) plus `itemListOrder: ItemListOrderDescending` and `numberOfItems`.
- **H7** resolved by C1's removal of `ssr: false` on `SolutionsNavbar` + `SolutionsFooter`.

**Batch 3 — Medium** — [`8e35501`, `33aeb23`]
- **M3** Added `/feed.xml` route (`app/feed.xml/route.ts`, `force-static`) emitting RSS 2.0 with CDATA-escaped titles + RFC 822 pub dates + atom self-link. Advertised via `alternates.types` in root layout.
- **M4** Organization enriched with `description` (factual, non-marketing, LLM-quotable sentence) and `knowsAbout` listing 12 topical-authority terms.
- **M5** `contactPoint: [{ ContactPoint, contactType: 'customer service', email, telephone, availableLanguage, areaServed }]` added to Organization.
- **M8** Untracked 299 committed `.next/*` build artifacts via `git rm --cached -r .next/`. The `.gitignore` rule was always there — this just reconciles the index.
- **M9** Removed the `keywords` array from root layout metadata.

**Batch 4 — Low** — [`46eb9b1`, `d3e9e3e`]
- **L2** Dropped the `telephone` key from `formatDetection` entirely so iOS applies its default phone-detection (visible numbers become "Call" links). Note: setting `telephone: true` in Next 15 still emits `telephone=no`; only omission works.
- **L4** Removed `msapplication-TileColor` from the `other` meta block.
- **L5** Manifest scaffolded with commented entries for `/icon-192.png` + `/icon-512.png` (`purpose: 'any maskable'`) alongside the existing 32×32. Install eligibility kicks in once the assets land.
- **L6** Removed the fake `screenshots` entry (logo-as-screenshot would have been worse than none in Chrome's rich install prompt).

---

### Intentionally deferred (8 findings)

| ID | Reason |
|---|---|
| H2 | `sameAs` verification is a human operation — confirm each social handle exists and links back from its bio. Inline comment in `components/seo/site-json-ld.tsx` flags this as a publish-time check. |
| M1 | `locale: 'en_IN'` → business decision whether to broaden. Expanding requires deciding target markets. |
| M2 | `areaServed` narrowing — same business-decision question as M1. |
| M6 | Author entity enrichment needs real `/authors/<slug>` pages that don't exist yet. Inventing URLs hurts trust more than it helps. |
| M7 | Synthetic author bylines (Priya Sharma etc.) are a content-side problem. Resolve by either naming real people or unifying under `Trinade Team`. |
| L1 | `referrer: 'origin-when-cross-origin'` — neutral, kept as-is. |
| L3 | `google: 'notranslate'` — neutral, kept as-is. |
| Asset items | See below. |

---

### Action items requiring design / creative / environment inputs

These are scaffolded in code but need deliverables outside the engineering scope. Each is a ~30-second code change once the asset exists:

1. **1200×630 landscape OG image** at `/public/og-image.png`. Update the four constants in `lib/seo/page-metadata.ts`.
2. **512×512 square logo** at `/public/logo-512.png` for ideal Knowledge Panel compliance. Swap the refs in `components/seo/site-json-ld.tsx` and `components/seo/blog-article-json-ld.tsx`.
3. **192×192 + 512×512 PNG icons** at `/public/icon-192.png` + `/public/icon-512.png` for PWA install eligibility. Uncomment the scaffolded entries in `app/manifest.ts`.
4. **`NEXT_PUBLIC_SITE_URL=https://trinade.com`** set in Vercel Production environment (Production only — Preview/Development stay unset so the conditional `noindex` in C2 works).
5. **Verify `sameAs` social handles** (H2).
6. **Decide author attribution strategy** (M7).

---

### Verification evidence

`next build` succeeds with 21/21 static pages prerendered, 0 TypeScript errors, 0 lint warnings. HTML response verified via `curl` against a local production server on port 3099:

- **Homepage initial HTML**: 112,593 bytes (up from ~22,000 pre-C1). Rendered `<h1>` "Precision-built technology, at scale." present in raw response.
- **JSON-LD coverage per page** (each block verified emitted exactly once where expected):

  | Page | @types present |
  |---|---|
  | `/` | Organization, WebSite, WebPage, Blog, ItemList (+7 ListItem with BlogPosting items), ContactPoint, Country, PostalAddress |
  | `/blog` | + BreadcrumbList (2-item: Home > Blog) |
  | `/blog/[slug]` | + Article, SpeakableSpecification, ImageObject, BreadcrumbList (3-item) |
  | `/solutions` | + Service |
  | `/company` | + AboutPage |
  | `/contact` | + ContactPage |
  | `/products/flyhigh` | + Product, Brand, FAQPage (6 Question + 6 Answer), 2-item Breadcrumb (Home > FlyHigh) |
  | `/products/sleep-alert` | + Product, Brand |
  | `/privacy-policy` | + BreadcrumbList |

- **`/feed.xml`** valid RSS 2.0, `Content-Type: application/rss+xml; charset=utf-8`, 7 blog entries with CDATA-escaped titles + RFC 822 `pubDate`.
- **`/sitemap.xml`** per-path `<lastmod>`/`<changefreq>`/`<priority>` + `xmlns:image` + `<image:loc>` entries for homepage + all 7 blog posts.
- **Canonical URLs** resolve correctly against `NEXT_PUBLIC_SITE_URL` (or the fallback on local).
- **Robots meta** correctly flips based on `VERCEL_ENV`: `noindex, nofollow, nocache` on local / preview, `index, follow` on production.
- **No duplicate BreadcrumbList** on any page (caught two nested-layout defects in review and fixed).
- **No cargo-cult bot meta tags** emitted (`bingbot`, `gptbot`, etc. removed).
- **No `keywords` meta tag** emitted.
- **No `telephone=no`** in `format-detection` (iOS phone auto-detection works).

### Commit log (reverse-chronological, off `a8d2be3`)

```
d3e9e3e  L2 fix: omit telephone from formatDetection so iOS defaults apply
46eb9b1  Batch 4 LOW: telephone auto-detect, tile color removal, manifest hygiene
33aeb23  M8: Untrack .next/ build artifacts (299 files)
8e35501  Batch 3 sources: M3 RSS feed, M4 Org description + knowsAbout, M5 ContactPoint, M9 keywords cleanup
9d19b93  H3 fix: move blog hub breadcrumb from layout to page
5f8ee40  H3 fix: product breadcrumbs no longer emit duplicate Products level
720c4f9  H3: Add Service/Product/BreadcrumbList/AboutPage/ContactPage schemas
88dbe5c  Batch 2c: H5 dynamic sitemap + image entries; H8 enable image optimization
b43900e  Batch 2a: H1, H4, H6, H9 + C2 regression fix
15f1e5b  C1: Restore SSR on content + navigation components
85f9ea8  C2-C5: Harden SEO infrastructure (canonical, icons, logo, OG image, head cleanup)
```
