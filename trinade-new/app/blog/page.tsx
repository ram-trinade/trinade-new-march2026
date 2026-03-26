import type { Metadata } from 'next'
import BlogPageClient from '@/components/blog-page-client'

export const metadata: Metadata = {
  title: 'Blog - AI Insights & Technology Updates | Trinade Solutions',
  description: 'Stay updated with the latest insights on AI technology, healthcare innovation, legal tech advancements, and fintech solutions. Expert perspectives from the Trinade team.',
  keywords: 'AI blog, technology insights, healthcare AI, legal tech, fintech, industry updates, Trinade Solutions',
  openGraph: {
    title: 'Blog - AI Insights & Technology Updates',
    description: 'Latest insights on AI technology and industry innovations from Trinade Solutions.',
    url: '/blog',
    siteName: 'Trinade Solutions',
    images: [
      {
        url: '/og-blog.png',
        width: 1200,
        height: 630,
        alt: 'Trinade Blog - AI Insights',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - AI Insights & Technology Updates',
    description: 'Latest AI technology insights and industry updates.',
    images: ['/og-blog.png'],
  },
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogPage() {
  return <BlogPageClient />
}
