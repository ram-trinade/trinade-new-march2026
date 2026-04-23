import { absoluteUrl, getSiteUrl } from '@/lib/seo/site-config'
import { getBlogEntry } from '@/lib/seo/blog-entries'

export function BlogArticleJsonLd({ slug }: { slug: string }) {
  const entry = getBlogEntry(slug)
  if (!entry) return null

  const base = getSiteUrl()
  const pageUrl = absoluteUrl(`/blog/${slug}`)
  const published = `${entry.datePublished}T12:00:00+05:30`

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: entry.title,
    description: entry.description,
    image: absoluteUrl(entry.image),
    datePublished: published,
    dateModified: published,
    author: {
      '@type': 'Person',
      name: entry.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Trinade AI Technologies',
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/icon.png'),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    inLanguage: 'en-IN',
    isPartOf: { '@id': `${base}/#website` },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
    />
  )
}
