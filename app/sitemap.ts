import type { MetadataRoute } from 'next'
import { absoluteUrl, getSiteUrl } from '@/lib/seo/site-config'
import { BLOG_ENTRIES } from '@/lib/seo/blog-entries'

/**
 * Per-path sitemap metadata. Bump `lastModified` on a path when that
 * page's content materially changes — search engines use it to decide
 * whether to re-crawl. A single hardcoded site-wide date (as this file
 * previously had) tells crawlers everything is stale at once, which
 * lowers recrawl priority.
 *
 * Ordered by priority (home → hub → category → leaf → policy) so the
 * emitted sitemap.xml mirrors the intended importance ranking.
 */
const STATIC_PATHS: Array<{
  path: string
  /** ISO date 'YYYY-MM-DD' — update when this page is materially changed. */
  lastModified: string
  changeFrequency: 'weekly' | 'monthly' | 'yearly'
  priority: number
  /** Paths (relative to origin) of images associated with this page.
   *  Emitted as image:image/image:loc entries for Google's image index. */
  images?: string[]
}> = [
  { path: '',                       lastModified: '2026-04-19', changeFrequency: 'weekly',  priority: 1.0,  images: ['/logo-transparent.png'] },
  { path: '/blog',                  lastModified: '2026-04-19', changeFrequency: 'weekly',  priority: 0.9 },
  { path: '/solutions',             lastModified: '2026-04-19', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/contact',               lastModified: '2026-04-19', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/company',               lastModified: '2026-04-19', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/products/flyhigh',      lastModified: '2026-04-19', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/products/sleep-alert',  lastModified: '2026-04-19', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/privacy-policy',        lastModified: '2026-04-19', changeFrequency: 'yearly',  priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map(
    ({ path, lastModified, changeFrequency, priority, images }) => ({
      url: `${base}${path}`,
      lastModified: new Date(lastModified),
      changeFrequency,
      priority,
      ...(images && images.length
        ? { images: images.map((img) => absoluteUrl(img)) }
        : {}),
    }),
  )

  const posts: MetadataRoute.Sitemap = BLOG_ENTRIES.map((e) => ({
    url: `${base}/blog/${e.slug}`,
    lastModified: new Date(e.datePublished),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
    images: [absoluteUrl(e.image)],
  }))

  return [...staticEntries, ...posts]
}
