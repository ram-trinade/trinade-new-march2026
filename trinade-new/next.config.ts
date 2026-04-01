import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Export as a static site so `npm run export` produces `out/index.html`
  output: 'export',
}

export default nextConfig
