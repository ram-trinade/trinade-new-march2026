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
  output: 'export', // Enable static export for deployment
  images: {
    unoptimized: true,
  },
}

export default nextConfig
