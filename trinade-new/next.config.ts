import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    if (dev) {
      // Ignore .playwright-mcp and Snapshots directories to prevent HMR storms
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          '**/node_modules/**',
          '**/.playwright-mcp/**',
          '**/Snapshots*/**',
        ],
      }
    }
    return config
  },
}

export default nextConfig
