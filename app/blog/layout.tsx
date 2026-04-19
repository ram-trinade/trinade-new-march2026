import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/page-metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Blog',
  description:
    'Perspectives from Trinade — an AI-first company building intelligent solutions across healthcare, legal, finance, manufacturing, and beyond.',
  path: '/blog',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
