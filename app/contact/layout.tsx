import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/page-metadata'
import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-json-ld'
import { ContactPageJsonLd } from '@/components/seo/page-type-json-ld'

export const metadata: Metadata = pageMetadata({
  title: 'Have a project in mind?',
  description:
    "We're always excited to discuss new opportunities and ideas. Whether you're looking to transform operations, build intelligent systems, or explore what's possible — reach out.",
  path: '/contact',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      />
      <ContactPageJsonLd path="/contact" name="Contact Trinade AI Technologies" />
      {children}
    </>
  )
}
