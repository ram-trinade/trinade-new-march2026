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
    // Organization.logo: Google requires ≥112×112 for knowledge-panel
    // eligibility. /icon.png is 32×32 (favicon size) which fails this gate.
    // /logo-transparent.png is 540×720 and satisfies the minimum. Ideal
    // is a dedicated 512×512 square logo at /logo-512.png when produced.
    logo: absoluteUrl('/logo-transparent.png'),
    // Description is the single most important field for LLM entity
    // extraction — Gemini/ChatGPT/Perplexity quote this text verbatim
    // when asked "what is Trinade?" Keep it factual, no marketing.
    description:
      'Trinade AI Technologies is an India-based enterprise AI consulting and products company. It designs, builds, and operates intelligent solutions across cybersecurity, cloud infrastructure, custom platforms, and data intelligence — and ships AI-first products for healthcare, legal, financial, and manufacturing sectors.',
    // knowsAbout declares topical authority. LLMs use this to decide
    // which queries the Organization should surface for during retrieval.
    knowsAbout: [
      'Artificial Intelligence',
      'Enterprise AI consulting',
      'AI product development',
      'Machine Learning',
      'Cloud infrastructure',
      'Cybersecurity',
      'Data intelligence',
      'Healthcare AI',
      'Legal AI',
      'Financial AI',
      'Manufacturing AI',
      'Predictive analytics',
    ],
    // ContactPoint is Google's canonical schema for customer contact
    // (preferred over loose email/telephone) and is what powers the
    // "Call" / "Email" buttons in Knowledge Panel.
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'info@trinade.com',
        telephone: '+91-9490754923',
        availableLanguage: ['English'],
        areaServed: 'IN',
      },
    ],
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
    // Note on sameAs: these URLs are verified against Google's entity
    // graph. If any of the profiles doesn't exist, or doesn't link back
    // to trinade.com from its bio, the relationship fails verification
    // and Organization trust scoring drops. Audit each before publish.
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
    // SearchAction intentionally omitted. The prior value targeted /blog,
    // which is NOT a valid SearchAction target (spec requires a URL
    // template containing {search_term_string}). A broken SearchAction
    // causes Google to drop the sitelinks search box opportunity. Re-add
    // this block only after a real /search?q={search_term_string}
    // endpoint exists on the site.
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
    // Explicit ordering + count help search engines treat this as a
    // reverse-chronological feed of articles, not a disordered list.
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: BLOG_ENTRIES.length,
    itemListElement: BLOG_ENTRIES.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/blog/${entry.slug}`),
      // Full BlogPosting entity reference per ListItem lets Google build
      // a proper article-list understanding of the blog hub (richer than
      // a bare list of URL/name pairs).
      item: {
        '@type': 'BlogPosting',
        '@id': absoluteUrl(`/blog/${entry.slug}`),
        headline: entry.title,
        description: entry.description,
        url: absoluteUrl(`/blog/${entry.slug}`),
        datePublished: `${entry.datePublished}T12:00:00+05:30`,
        author: {
          '@type': 'Person',
          name: entry.author,
        },
        image: absoluteUrl(entry.image),
        publisher: { '@id': `${url}/#organization` },
        inLanguage: 'en-IN',
      },
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
