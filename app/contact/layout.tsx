import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/page-metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Have a project in mind?',
  description:
    "We're always excited to discuss new opportunities and ideas. Whether you're looking to transform operations, build intelligent systems, or explore what's possible — reach out.",
  path: '/contact',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
