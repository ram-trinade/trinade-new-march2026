import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/page-metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Sleep Alert Device',
  description:
    'An intelligent fatigue monitoring system that watches for drowsiness and triggers a clear alert — so you stay focused on the road.',
  path: '/products/sleep-alert',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
