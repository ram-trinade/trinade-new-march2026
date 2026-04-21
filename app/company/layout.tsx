import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/page-metadata'
import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-json-ld'
import { AboutPageJsonLd } from '@/components/seo/page-type-json-ld'

export const metadata: Metadata = pageMetadata({
  title: 'Our Story',
  description: 'We saw the future coming and we wanted to build it responsibly.',
  path: '/company',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Company', path: '/company' },
        ]}
      />
      <AboutPageJsonLd path="/company" name="Our Story" />
      {children}
    </>
  )
}
