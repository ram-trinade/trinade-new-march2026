import type { Metadata } from 'next'
import { BlogArticleJsonLd } from '@/components/seo/blog-article-json-ld'
import { blogArticleMetadata } from '@/lib/seo/blog-article-metadata'

const slug = 'intelligent-contract-analysis-how-ai-is-reshaping-legal-operations'

export const metadata: Metadata = blogArticleMetadata(slug)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BlogArticleJsonLd slug={slug} />
      {children}
    </>
  )
}
