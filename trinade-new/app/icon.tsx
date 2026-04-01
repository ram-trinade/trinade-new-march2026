import { ImageResponse } from 'next/og'

// For `output: 'export'`, route must be static.
// This tells Next.js to treat this route as static and avoid dynamic fetch behavior.
export const dynamic = 'force-static'
export const revalidate = 0

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#1a1a1e',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 6,
        }}
      >
        <span
          style={{
            color: '#c9a86e',
            fontWeight: 700,
            fontFamily: 'sans-serif',
            letterSpacing: -1,
          }}
        >
          T
        </span>
      </div>
    ),
    {
      ...size,
    }
  )
}
