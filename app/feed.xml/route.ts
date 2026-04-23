import { NextResponse } from 'next/server'
import { BLOG_ENTRIES } from '@/lib/seo/blog-entries'
import { absoluteUrl, getSiteUrl } from '@/lib/seo/site-config'

/**
 * RSS 2.0 feed for the Trinade blog.
 *
 * Why this exists: LLM training/retrieval pipelines (GPT, Perplexity,
 * Gemini) consume RSS aggressively as a canonical "what's new" signal
 * for blogs. A Next.js site without a feed leaves that discovery
 * channel cold. Also supports browser/email feed-readers.
 *
 * `force-static` makes this a build-time artifact — same caching
 * properties as sitemap.xml.
 */
export const dynamic = 'force-static'

const CHANNEL_TITLE = 'Trinade AI Blog'
const CHANNEL_DESCRIPTION =
  'Perspectives from Trinade — an AI-first company building intelligent solutions across healthcare, legal, finance, manufacturing, and beyond.'

function escapeCdata(text: string): string {
  // CDATA cannot contain the terminator sequence `]]>`. Anywhere that
  // sequence appears, split it so the content stays valid XML.
  return text.replace(/]]>/g, ']]]]><![CDATA[>')
}

export function GET() {
  const base = getSiteUrl()
  const nowUtc = new Date().toUTCString()

  const items = BLOG_ENTRIES.map((entry) => {
    const link = absoluteUrl(`/blog/${entry.slug}`)
    const pub = new Date(`${entry.datePublished}T12:00:00+05:30`).toUTCString()
    return `    <item>
      <title><![CDATA[${escapeCdata(entry.title)}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${escapeCdata(entry.description)}]]></description>
      <pubDate>${pub}</pubDate>
      <author>info@trinade.com (${escapeCdata(entry.author)})</author>
    </item>`
  }).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${CHANNEL_TITLE}</title>
    <link>${base}/blog</link>
    <description>${CHANNEL_DESCRIPTION}</description>
    <language>en-IN</language>
    <lastBuildDate>${nowUtc}</lastBuildDate>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
