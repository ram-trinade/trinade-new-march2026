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
    // PWA icon spec: browsers prefer 192×192 + 512×512 with `purpose:
    // 'maskable'` for adaptive home-screen masks. Only 32×32 exists in
    // /public today; drop a 192×192 and 512×512 PNG at /icon-192.png
    // and /icon-512.png, then uncomment the entries below. Until those
    // assets land, install prompts stay ineligible on some platforms —
    // but the existing 32×32 entry keeps the favicon path working.
    icons: [
      {
        src: '/icon.png',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any',
      },
      // { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
      // { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
    ],
    // `screenshots` intentionally omitted: the previous value referenced
    // /logo-transparent.png as a "narrow form factor screenshot," which
    // it is not. Browsers that support the richer PWA install prompt
    // (Chrome on Android) show screenshots at install time — providing
    // a logo there is worse than no screenshot. Re-add with real app
    // screenshots (at least one 640×320+ landscape and one 320×640+
    // portrait) when they exist.
  }
}
