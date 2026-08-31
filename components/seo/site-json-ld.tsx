import { absoluteUrl, getSiteUrl } from '@/lib/seo/site-config'
import { BLOG_ENTRIES } from '@/lib/seo/blog-entries'

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
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/blog`,
      'query-input': 'required name=search_term_string',
    },
  }

  const webpage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}/#webpage`,
    url,
    name: 'Trinade AI Technologies',
    isPartOf: { '@id': `${url}/#website` },
    about: { '@id': `${url}/#organization` },
    inLanguage: 'en-IN',
  }

  const blogCollection = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${url}/blog#blog`,
    url: absoluteUrl('/blog'),
    name: 'Trinade AI Blog',
    isPartOf: { '@id': `${url}/#website` },
    publisher: { '@id': `${url}/#organization` },
    inLanguage: 'en-IN',
  }

  const blogItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${url}/blog#itemlist`,
    itemListElement: BLOG_ENTRIES.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/blog/${entry.slug}`),
      name: entry.title,
    })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollection) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogItemList) }}
      />
    </>
  )
}
