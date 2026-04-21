import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/page-metadata'
import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-json-ld'
import { ProductJsonLd } from '@/components/seo/product-json-ld'

const description =
  'An intelligent fatigue monitoring system that watches for drowsiness and triggers a clear alert — so you stay focused on the road.'

export const metadata: Metadata = pageMetadata({
  title: 'Sleep Alert Device',
  description,
  path: '/products/sleep-alert',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products/sleep-alert' },
          { name: 'Sleep Alert Device', path: '/products/sleep-alert' },
        ]}
      />
      <ProductJsonLd
        slug="sleep-alert"
        name="Sleep Alert Device"
        description={description}
        category="Driver Fatigue Monitoring Device"
      />
      {children}
    </>
  )
}
