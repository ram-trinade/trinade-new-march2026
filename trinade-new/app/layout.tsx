import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Trinade AI Technologies | Intelligent Solutions, Delivered Confidently',
  description:
    'From intelligent products to enterprise services — engineered thoughtfully, delivered confidently, everywhere it ships.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        {/* Initial dark screen — matches preloader bg, prevents cream flash on homepage */}
        <div
          id="initial-screen"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'linear-gradient(135deg, #0d0b08 0%, #1c160d 20%, #0f0d0a 40%, #201811 60%, #150f08 80%, #0d0b08 100%)',
            pointerEvents: 'none',
            transition: 'opacity 0.3s ease',
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Hide initial screen once React hydrates (preloader takes over at z-10001)
              requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                  var el = document.getElementById('initial-screen');
                  if (el) { el.style.opacity = '0'; setTimeout(function() { el.remove(); }, 400); }
                });
              });
            `,
          }}
        />
        {children}
      </body>
    </html>
  )
}
