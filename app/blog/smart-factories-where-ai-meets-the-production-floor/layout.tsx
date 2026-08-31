import type { Metadata } from 'next'
import { BlogArticleJsonLd } from '@/components/seo/blog-article-json-ld'
import { blogArticleMetadata } from '@/lib/seo/blog-article-metadata'

const slug = 'smart-factories-where-ai-meets-the-production-floor'

export const metadata: Metadata = blogArticleMetadata(slug)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BlogArticleJsonLd slug={slug} />
      {children}
    </>
  )
}
