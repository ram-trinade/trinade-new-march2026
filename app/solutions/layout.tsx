import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/page-metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Solutions',
  description:
    'Trinade exists to close the gap between where your technology is and where your business needs it to be. We secure what matters, modernize what holds you back, and build the infrastructure that lets your teams move with confidence and speed.',
  path: '/solutions',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
