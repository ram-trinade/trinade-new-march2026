import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/page-metadata'

export const metadata: Metadata = pageMetadata({
  title: 'FlyHigh',
  description:
    'FlyHigh is built to bridge the gap between the question you have and the expert who has lived it. Human-led guidance. AI-enhanced matching. Real outcomes.',
  path: '/products/flyhigh',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
