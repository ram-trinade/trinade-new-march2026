import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/page-metadata'
import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-json-ld'

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'This Privacy Policy applies to trinade.com and describes how Trinade AI Technologies Pvt Ltd collects, uses, discloses, and safeguards your information when you visit our website or engage with our services.',
  path: '/privacy-policy',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy-policy' },
        ]}
      />
      {children}
    </>
  )
}
