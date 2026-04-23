import type { Metadata } from 'next'
import { BlogArticleJsonLd } from '@/components/seo/blog-article-json-ld'
import { blogArticleMetadata } from '@/lib/seo/blog-article-metadata'

const slug = 'from-pilot-to-production-scaling-ai-across-the-enterprise'

export const metadata: Metadata = blogArticleMetadata(slug)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BlogArticleJsonLd slug={slug} />
      {children}
    </>
  )
}
