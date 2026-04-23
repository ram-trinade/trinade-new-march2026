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
    // articleSection gives search engines the topical category the post
    // belongs to (used for SERP breadcrumbs + entity association). When
    // per-post sections are added to blog-entries.ts, swap this default
    // for entry.section.
    articleSection: 'AI & Technology',
    author: {
      '@type': 'Person',
      name: entry.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Trinade AI Technologies',
      logo: {
        '@type': 'ImageObject',
        // Google Article schema requires publisher.logo ≥112×112 for
        // rich-result eligibility. Swapping from 32×32 /icon.png to
        // 540×720 /logo-transparent.png satisfies the minimum while a
        // proper 512×512 square is produced.
        url: absoluteUrl('/logo-transparent.png'),
        width: 540,
        height: 720,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    // speakable tells voice assistants (Google Assistant, Gemini Voice,
    // ChatGPT Voice) which elements to read aloud when answering
    // "read me the article about X." Targets the article headline
    // and the paragraph text inside the article element.
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'article p'],
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
