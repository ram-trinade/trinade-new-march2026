import sharp from 'sharp'
import { readFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const publicDir = join(root, 'public')

const svgPath = join(publicDir, 'logo.svg')
const svgBuffer = readFileSync(svgPath)

const variants = [
  { name: 'logo-favicon.png', size: 32 },
  { name: 'logo-desktop.png', size: 120 },
  { name: 'logo-hero.png', size: 200 },
  { name: 'logo-512.png', size: 512 },
]

async function generate() {
  for (const { name, size } of variants) {
    const outPath = join(publicDir, name)
    await sharp(svgBuffer, { density: 300 })
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(outPath)

    const { size: fileSize } = await sharp(outPath).metadata().then(() => {
      return { size: readFileSync(outPath).length }
    })
    console.log(`  ${name} → ${size}x${size}px (${(fileSize / 1024).toFixed(1)}KB)`)
  }
  console.log('\nAll PNGs generated in public/')
}

generate().catch(console.error)
