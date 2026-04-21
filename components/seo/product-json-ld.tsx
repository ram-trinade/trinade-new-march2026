import { absoluteUrl, getSiteUrl } from '@/lib/seo/site-config'
import { OG_IMAGE_PATH } from '@/lib/seo/page-metadata'

/**
 * Product JSON-LD for Trinade's named products (FlyHigh, Sleep Alert
 * Device). Manufacturer references the Organization emitted by
 * SiteJsonLd via @id so the graph deduplicates. Brand is inline since
 * there is no standalone Brand entity elsewhere.
 *
 * image defaults to OG_IMAGE_PATH (single source of truth for the site
 * fallback image) when no product-specific image is supplied.
 */
export function ProductJsonLd({
  slug,
  name,
  description,
  category,
  image,
}: {
  slug: string
  name: string
  description: string
  category: string
  image?: string
}) {
  const siteUrl = getSiteUrl()
  const productPath = `/products/${slug}`
  const productUrl = absoluteUrl(productPath)

  const product = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${productUrl}#product`,
    name,
    description,
    category,
    brand: {
      '@type': 'Brand',
      name: 'Trinade AI Technologies',
    },
    manufacturer: { '@id': `${siteUrl}/#organization` },
    url: productUrl,
    image: absoluteUrl(image ?? OG_IMAGE_PATH),
    inLanguage: 'en-IN',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
    />
  )
}
