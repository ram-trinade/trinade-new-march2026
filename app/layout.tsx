import type { Metadata } from 'next'
import { Manrope, Outfit } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
})

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-trinade',
  weight: ['900'],
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
    <html lang="en" className={`${manrope.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  )
}
