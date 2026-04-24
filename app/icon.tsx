import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Apr 20: use the proper gold-on-dark favicon asset instead of
// filter-hacking the old transparent logo. The favicon-32x32.png
// is a purpose-built 32×32 with exact brand gold on charcoal.
export default async function Icon() {
  const logoData = await readFile(join(process.cwd(), 'public', 'favicon-32x32.png'))
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
          background: 'transparent',
        }}
      >
        <img
          src={logoBase64}
          width={32}
          height={32}
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
