/**
 * Canonical origin for metadata, sitemap, and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://trinade.com).
 */
export const FALLBACK_SITE_URL = 'https://trinade.com'

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (raw) return raw.replace(/\/$/, '')
  return FALLBACK_SITE_URL
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl()
  if (!path || path === '/') return base
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * True only when the current build is targeting the production environment.
 *
 * Gates robots index/follow: preview and development deployments emit
 * noindex/nofollow so they do not compete with the production site for
 * the same content (Google will de-index the prod canonical if it sees
 * a duplicate served from a different host with an index directive).
 *
 * On Vercel, VERCEL_ENV is authoritative ('production' | 'preview' |
 * 'development'). Off Vercel, fall back to NODE_ENV plus a trinade.com
 * host match so local production builds for testing behave correctly.
 */
export function isProductionDeployment(): boolean {
  const vercelEnv = process.env.VERCEL_ENV
  if (vercelEnv) return vercelEnv === 'production'
  return (
    process.env.NODE_ENV === 'production' &&
    (process.env.NEXT_PUBLIC_SITE_URL?.includes('trinade.com') ?? false)
  )
}
