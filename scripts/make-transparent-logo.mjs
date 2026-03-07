import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const input = path.join(root, 'ORIGINAL LOGO.png')
const output = path.join(root, 'public', 'logo-transparent.png')

async function main() {
  // Read original image as raw RGBA pixels
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info
  console.log(`Input: ${width}x${height}, ${channels} channels`)

  // Step 1: Zero out the bottom-right corner region to remove the star watermark
  // The star sits in roughly the last 12% of width and last 12% of height
  const starRegionX = Math.floor(width * 0.85)   // x >= 85% of width
  const starRegionY = Math.floor(height * 0.85)   // y >= 85% of height
  console.log(`Zeroing out star watermark region: x>=${starRegionX}, y>=${starRegionY}`)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      if (x >= starRegionX && y >= starRegionY) {
        // In the star watermark region — force to black (will become transparent)
        data[i] = 0
        data[i + 1] = 0
        data[i + 2] = 0
        data[i + 3] = 255 // keep alpha for now, brightness check below will handle it
      }
    }
  }

  // Step 2: For each pixel, set alpha based on brightness (white stays, black becomes transparent)
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    // Use max channel as brightness — this preserves the white lines
    const brightness = Math.max(r, g, b)
    // Make everything white where there was content, transparent where black
    if (brightness > 30) {
      // Content pixel — make it white with alpha = brightness
      data[i] = 255     // R
      data[i + 1] = 255 // G
      data[i + 2] = 255 // B
      data[i + 3] = brightness // A = brightness (white=fully opaque, gray=semi-transparent)
    } else {
      // Background pixel — fully transparent
      data[i] = 0
      data[i + 1] = 0
      data[i + 2] = 0
      data[i + 3] = 0
    }
  }

  // Create image from modified data, then trim (auto-crop) transparent edges
  const result = await sharp(data, { raw: { width, height, channels: 4 } })
    .trim()  // Remove transparent border
    .png()
    .toBuffer({ resolveWithObject: true })

  console.log(`Output: ${result.info.width}x${result.info.height}, ${result.data.length} bytes`)

  await sharp(result.data).toFile(output)
  console.log(`Saved to: ${output}`)
}

main().catch(console.error)
