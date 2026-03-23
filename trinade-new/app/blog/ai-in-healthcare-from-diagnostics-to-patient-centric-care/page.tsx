import type { Metadata } from 'next'
import BlogArticleClient from '@/components/blog-article-client'

export const metadata: Metadata = {
  title: 'AI in Healthcare: From Diagnostics to Patient-Centric Care | Trinade Blog',
  description: 'How intelligent systems are transforming clinical workflows, enhancing diagnostic accuracy, and creating patient experiences that feel personal — without compromising on compliance or data security.',
  keywords: 'AI healthcare, medical diagnostics, patient-centric care, clinical workflows, healthcare technology, Trinade Solutions',
  authors: [{ name: 'Priya Sharma' }],
  openGraph: {
    title: 'AI in Healthcare: From Diagnostics to Patient-Centric Care',
    description: 'How AI is transforming healthcare from diagnostics to patient-centric care.',
    url: 'https://trinade.com/blog/ai-in-healthcare-from-diagnostics-to-patient-centric-care',
    siteName: 'Trinade Solutions',
    type: 'article',
    publishedTime: '2026-03-01T00:00:00.000Z',
    authors: ['Priya Sharma'],
    section: 'Healthcare AI',
    images: [
      {
        url: 'https://trinade.com/blog/article-1.png',
        width: 1200,
        height: 630,
        alt: 'AI in Healthcare Article',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI in Healthcare: From Diagnostics to Patient-Centric Care',
    description: 'How AI is transforming healthcare workflows and patient care.',
    images: ['https://trinade.com/blog/article-1.png'],
  },
  alternates: {
    canonical: 'https://trinade.com/blog/ai-in-healthcare-from-diagnostics-to-patient-centric-care',
  },
}

export default function ArticlePage() {
  return <BlogArticleClient />
}
