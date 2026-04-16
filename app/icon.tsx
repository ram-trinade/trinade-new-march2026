import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
export const dynamic = 'force-static'
export const revalidate = 0

export default async function Icon() {
  const logoData = await readFile(join(process.cwd(), 'public', 'logo-transparent.png'))
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1a1a1e',
          borderRadius: 6,
          padding: 3,
        }}
      >
        <img
          src={logoBase64}
          width={26}
          height={26}
          style={{
            objectFit: 'contain',
            filter: 'brightness(1.8) contrast(1.2)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
