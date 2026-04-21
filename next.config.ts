import type { NextConfig } from 'next'
import path from 'node:path'

/**
 * Scope Next.js file-tracing to this project directory so the parent folder's
 * lockfile (from the legacy trinade site at ../) is ignored.
 * Without this, Next picks the parent as workspace root and emits a warning.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  // Image optimizer is ON by default (previously disabled via
  // `images: { unoptimized: true }` with no documented reason). On Vercel
  // this emits AVIF/WebP + responsive srcset automatically, meaningfully
  // improving LCP and bandwidth vs. unoptimized originals. If a specific
  // image proves incompatible with the optimizer, prefer per-image opt-out
  // (the `unoptimized` prop on <Image>) over disabling globally.
}

export default nextConfig
