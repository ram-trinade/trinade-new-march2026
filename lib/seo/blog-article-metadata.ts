import type { Metadata } from 'next'
import { getBlogEntry } from '@/lib/seo/blog-entries'
import { pageMetadata } from '@/lib/seo/page-metadata'

export function blogArticleMetadata(slug: string): Metadata {
  const e = getBlogEntry(slug)
  if (!e) return {}
  const publishedTime = `${e.datePublished}T12:00:00+05:30`
  return pageMetadata({
    title: e.title,
    description: e.description,
    path: `/blog/${slug}`,
    type: 'article',
    publishedTime,
    authors: [e.author],
  })
}
