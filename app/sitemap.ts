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

  const main = staticPaths.map((path) => {
    const isHome = path === ''
    const isBlogHub = path === '/blog'
    const isContact = path === '/contact'
    let changeFrequency: 'weekly' | 'monthly' = 'monthly'
    if (isHome || isBlogHub) changeFrequency = 'weekly'
    return {
      url: `${base}${path}`,
      lastModified: last,
      changeFrequency,
      priority: isHome ? 1 : isBlogHub ? 0.9 : isContact ? 0.85 : 0.8,
    }
  })

  const posts = BLOG_ENTRIES.map((e) => ({
    url: `${base}/blog/${e.slug}`,
    lastModified: new Date(e.datePublished),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))

  return [...main, ...posts]
}
