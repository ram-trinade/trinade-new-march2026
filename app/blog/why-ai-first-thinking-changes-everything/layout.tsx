import type { Metadata } from 'next'
import { BlogArticleJsonLd } from '@/components/seo/blog-article-json-ld'
import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-json-ld'
import { blogArticleMetadata } from '@/lib/seo/blog-article-metadata'
import { getBlogEntry } from '@/lib/seo/blog-entries'

const slug = 'why-ai-first-thinking-changes-everything'

export const metadata: Metadata = blogArticleMetadata(slug)

export default function Layout({ children }: { children: React.ReactNode }) {
  const entry = getBlogEntry(slug)
  const title = entry?.title ?? 'Blog Post'
  return (
    <>
      <BlogArticleJsonLd slug={slug} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: title, path: `/blog/${slug}` },
        ]}
      />
      {children}
    </>
  )
}
