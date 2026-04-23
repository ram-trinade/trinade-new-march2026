import { absoluteUrl, getSiteUrl } from '@/lib/seo/site-config'

/**
 * Service JSON-LD for the /solutions page. References the Organization
 * emitted by SiteJsonLd (root layout) via @id instead of re-embedding
 * the entity — the Schema.org graph deduplicates cleanly that way.
 *
 * Description comes from the /solutions layout metadata so visible
 * copy and structured data stay aligned. areaServed matches the
 * Organization.areaServed value (India) from site-json-ld.tsx.
 */
export function ServiceJsonLd({ description }: { description: string }) {
  const siteUrl = getSiteUrl()

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteUrl}/solutions#service`,
    name: 'Enterprise AI Solutions & Consulting',
    description,
    provider: { '@id': `${siteUrl}/#organization` },
    serviceType: [
      'Enterprise AI consulting',
      'AI solution development',
      'Cybersecurity',
      'Cloud infrastructure modernization',
      'Data intelligence',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    url: absoluteUrl('/solutions'),
    inLanguage: 'en-IN',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
    />
  )
}
