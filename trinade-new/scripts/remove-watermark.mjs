import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '..', 'public', 'blog');

const files = [
  'featured.png',
  'article-1.png',
  'article-2.png',
  'article-3.png',
  'article-4.png',
  'article-5.png',
  'article-6.png',
];

async function removeWatermark(filename) {
  const filepath = path.join(blogDir, filename);
  const img = sharp(filepath);
  const meta = await img.metadata();
  const { width, height } = meta;

  // The Gemini watermark is a small sparkle icon in the bottom-right corner
  // It's roughly 40-60px wide depending on image size
  // Strategy: extract a patch from a nearby clean area and paste it over the watermark

  // Watermark region (bottom-right corner)
  const wmSize = Math.max(Math.round(width * 0.06), 60); // ~6% of width or at least 60px
  const wmX = width - wmSize;
  const wmY = height - wmSize;

  // Sample a clean patch from just to the left of the watermark
  // We take a strip from the same vertical position but shifted left
  const sampleX = Math.max(0, wmX - wmSize);
  const sampleY = wmY;

  // Extract the clean patch
  const patch = await sharp(filepath)
    .extract({
      left: sampleX,
      top: sampleY,
      width: wmSize,
      height: wmSize,
    })
    .toBuffer();

  // Flip the patch horizontally so it blends more naturally
  const flippedPatch = await sharp(patch)
    .flop() // horizontal flip
    .toBuffer();

  // Composite the flipped clean patch over the watermark area
  const result = await sharp(filepath)
    .composite([
      {
        input: flippedPatch,
        left: wmX,
        top: wmY,
      },
    ])
    .toBuffer();

  // Write back
  await sharp(result).toFile(filepath);
  console.log(`✓ ${filename} (${width}x${height}) — watermark removed`);
}

async function main() {
  console.log('Removing Gemini watermarks from blog images...\n');

  for (const file of files) {
    try {
      await removeWatermark(file);
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`);
    }
  }

  console.log('\nDone!');
}

main();
