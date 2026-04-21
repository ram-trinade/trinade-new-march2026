import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/seo/site-config'

/**
 * Open Graph / Twitter social card image — SINGLE SOURCE OF TRUTH.
 *
 * SPEC (what this should be): A 1200×630 landscape PNG or JPG at
 * /public/og-image.png. 1200×630 is required by Twitter
 * summary_large_image and renders correctly on LinkedIn, Slack,
 * WhatsApp, Discord, iMessage, Facebook, and every other unfurler.
 *
 * CURRENT STATE (what this is): Points to the portrait brand logo
 * (540×720). Social unfurlers will letterbox, crop, or drop the
 * image. This is a known suboptimal state.
 *
 * TO FIX: Produce a 1200×630 asset at /public/og-image.png and
 * update the four constants below to:
 *   OG_IMAGE_PATH   = '/og-image.png'
 *   OG_IMAGE_WIDTH  = 1200
 *   OG_IMAGE_HEIGHT = 630
 *   OG_IMAGE_ALT    unchanged
 * All metadata (root layout + per-page via withSocial() + article
 * JSON-LD) reads from here, so one edit updates the entire site.
 */
export const OG_IMAGE_PATH = '/logo-transparent.png'
export const OG_IMAGE_WIDTH = 540
export const OG_IMAGE_HEIGHT = 720
export const OG_IMAGE_ALT = 'Trinade AI Technologies'

function ogImages() {
  return [
    {
      url: OG_IMAGE_PATH,
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      alt: OG_IMAGE_ALT,
    },
  ]
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
      images: [absoluteUrl(OG_IMAGE_PATH)],
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
  // Intentional omissions:
  //   - `robots` is inherited from app/layout.tsx, which emits a conditional
  //     index directive via isProductionDeployment(). Defining robots here
  //     would silently override that and cause every per-page metadata call
  //     to force index:true on preview/dev deployments.
  //   - `other: { bingbot, gptbot, ... }` is removed. Those crawlers read
  //     robots.txt only; per-agent meta tags are not honored and are cargo-cult.
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    ...withSocial(title, description, path, {
      type: type ?? 'website',
      publishedTime,
      authors,
    }),
  }
}
