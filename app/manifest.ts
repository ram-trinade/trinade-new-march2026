import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'
export const revalidate = 0

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Trinade AI Technologies',
    short_name: 'Trinade AI',
    description: 'From intelligent products to enterprise services — engineered thoughtfully, delivered confidently, everywhere it ships.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#ffffff',
    theme_color: '#1a1a1e',
    icons: [
      {
        src: '/icon.png',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any',
      }
    ],
    screenshots: [
      {
        src: '/logo-transparent.png',
        sizes: '540x720',
        type: 'image/png',
        form_factor: 'narrow',
      },
    ],
  }
}
