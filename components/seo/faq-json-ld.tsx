import { absoluteUrl } from '@/lib/seo/site-config'

export type FaqItem = {
  question: string
  answer: string
}

/**
 * FAQPage JSON-LD. Each entry emits a Question + acceptedAnswer pair.
 * Only use when the EXACT question/answer text is visible on the
 * rendered page — Google penalizes FAQPage markup that does not match
 * visible content as a spam signal. The @id is page-scoped so multiple
 * FAQPage blocks across the site do not collide.
 */
export function FaqJsonLd({
  path,
  items,
}: {
  path: string
  items: FaqItem[]
}) {
  if (!items || items.length === 0) return null

  const url = absoluteUrl(path)
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
    />
  )
}
