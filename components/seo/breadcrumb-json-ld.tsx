import { absoluteUrl } from '@/lib/seo/site-config'

export type BreadcrumbItem = {
  name: string
  path: string
}

/**
 * BreadcrumbList JSON-LD. Each item becomes a ListItem with explicit
 * position, name, and an absolute item URL. Spec requires ≥2 items —
 * this component does not render for shorter lists. Do NOT emit on the
 * root '/' page: the root has no parent chain and adding a
 * single-item BreadcrumbList is a spec violation Google flags as
 * "unnamed item" in Search Console.
 */
export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  if (!items || items.length < 2) return null

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
    />
  )
}
