import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/page-metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Our Story',
  description: 'We saw the future coming and we wanted to build it responsibly.',
  path: '/company',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
