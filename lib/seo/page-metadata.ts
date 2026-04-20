import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/seo/site-config'

const OG_IMAGE = '/logo-transparent.png'

function ogImages() {
  return [{ url: OG_IMAGE, width: 540, height: 720, alt: 'Trinade AI Technologies' }]
}

/** Shared Open Graph / Twitter using existing site copy (no new marketing text). */
export function withSocial(
  title: string,
  description: string,
  path: string,
  opts?: { type?: 'website' | 'article'; publishedTime?: string; authors?: string[] }
): Pick<Metadata, 'openGraph' | 'twitter'> {
  const url = absoluteUrl(path)
  const type = opts?.type ?? 'website'
  return {
    openGraph: {
      title,
      description,
      url,
      siteName: 'Trinade AI Technologies',
      locale: 'en_IN',
      type,
      images: ogImages(),
      ...(type === 'article' && opts?.publishedTime
        ? { publishedTime: opts.publishedTime }
        : {}),
      ...(type === 'article' && opts?.authors?.length ? { authors: opts.authors } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(OG_IMAGE)],
    },
  }
}

export function pageMetadata(input: {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  publishedTime?: string
  authors?: string[]
}): Metadata {
  const { title, description, path, type, publishedTime, authors } = input
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    ...withSocial(title, description, path, {
      type: type ?? 'website',
      publishedTime,
      authors,
    }),
    other: {
      bingbot: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      gptbot: 'index, follow',
      perplexitybot: 'index, follow',
      claudebot: 'index, follow',
    },
  }
}
