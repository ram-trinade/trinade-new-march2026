import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/page-metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Blog',
  description:
    'Perspectives from Trinade — an AI-first company building intelligent solutions across healthcare, legal, finance, manufacturing, and beyond.',
  path: '/blog',
})

// BreadcrumbJsonLd is emitted at the page level (app/blog/page.tsx for
// the hub, and each app/blog/<slug>/layout.tsx for the posts) — not at
// this shared layout — because layouts stack and a hub-level breadcrumb
// here would render a duplicate alongside each post's own breadcrumb.
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
