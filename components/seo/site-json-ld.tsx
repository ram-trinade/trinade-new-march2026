import { absoluteUrl, getSiteUrl } from '@/lib/seo/site-config'

/**
 * Organization + WebSite JSON-LD. Address and legal name match visible footer / privacy copy.
 */
export function SiteJsonLd() {
  const url = getSiteUrl()
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${url}/#organization`,
    name: 'Trinade AI Technologies',
    legalName: 'Trinade AI Technologies Pvt Ltd',
    url,
    logo: absoluteUrl('/icon.png'),
    email: 'info@trinade.com',
    telephone: '+91-9490754923',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '#06, Green Valley Apartments, Gorantla, Guntur',
      addressRegion: 'Andhra Pradesh',
      postalCode: '522034',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    sameAs: [
      'https://linkedin.com/company/trinadeai',
      'https://instagram.com/trinadeai',
      'https://x.com/trinadeai',
    ],
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}/#website`,
    url,
    name: 'Trinade AI Technologies',
    description:
      'From intelligent products to enterprise services — engineered thoughtfully, delivered confidently, everywhere it ships.',
    publisher: { '@id': `${url}/#organization` },
    inLanguage: 'en-IN',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  )
}
