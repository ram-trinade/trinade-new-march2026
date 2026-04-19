import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/seo/site-config'
import { BLOG_ENTRIES } from '@/lib/seo/blog-entries'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()
  const last = new Date('2026-04-19')

  const staticPaths = [
    '',
    '/company',
    '/solutions',
    '/contact',
    '/privacy-policy',
    '/blog',
    '/products/flyhigh',
    '/products/sleep-alert',
  ]

  const main = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: last,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : path === '/blog' ? 0.85 : 0.8,
  }))

  const posts = BLOG_ENTRIES.map((e) => ({
    url: `${base}/blog/${e.slug}`,
    lastModified: new Date(e.datePublished),
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }))

  return [...main, ...posts]
}
