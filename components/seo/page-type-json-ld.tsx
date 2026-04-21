import { absoluteUrl, getSiteUrl } from '@/lib/seo/site-config'

/**
 * AboutPage JSON-LD for /company. References the WebSite + Organization
 * entities emitted by SiteJsonLd via @id — tells search engines this
 * specific page is an "About" page describing the Organization.
 */
export function AboutPageJsonLd({
  path,
  name,
}: {
  path: string
  name: string
}) {
  const siteUrl = getSiteUrl()
  const url = absoluteUrl(path)

  const aboutPage = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${url}#aboutpage`,
    url,
    name,
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@id': `${siteUrl}/#organization` },
    inLanguage: 'en-IN',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPage) }}
    />
  )
}

/**
 * ContactPage JSON-LD for /contact. mainEntity points at the
 * Organization so search engines know the contact data on this page
 * (email, phone, address already on Organization) belongs to Trinade.
 */
export function ContactPageJsonLd({
  path,
  name,
}: {
  path: string
  name: string
}) {
  const siteUrl = getSiteUrl()
  const url = absoluteUrl(path)

  const contactPage = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${url}#contactpage`,
    url,
    name,
    isPartOf: { '@id': `${siteUrl}/#website` },
    mainEntity: { '@id': `${siteUrl}/#organization` },
    inLanguage: 'en-IN',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPage) }}
    />
  )
}
