import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { join } from 'path';
import http from 'http';

const BASE = 'E:/FINAL Trinade CC/trinade-new/Snapshots - wed - mar 18';
const PAGES = [
  { name: 'Blog', url: '/blog', wait: 6000 },
];

function checkServer() {
  return new Promise((resolve) => {
    http.get('http://localhost:3006/solutions', (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
}

async function waitForServer(maxRetries = 10) {
  for (let i = 0; i < maxRetries; i++) {
    if (await checkServer()) return true;
    console.log(`  Server not ready, waiting 5s... (attempt ${i + 1})`);
    await new Promise(r => setTimeout(r, 5000));
  }
  return false;
}

async function run() {
  // Process one page at a time with fresh browser for each
  for (const pg of PAGES) {
    console.log(`\n📸 Capturing ${pg.name}...`);

    // Check server health first
    if (!await waitForServer()) {
      console.error(`  ❌ Server not available, skipping ${pg.name}`);
      continue;
    }

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();

    try {
      await page.goto(`http://localhost:3006${pg.url}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(pg.wait);

      // Try dismiss cookie popup
      try {
        const btn = await page.$('button:has-text("Accept")');
        if (btn) await btn.click();
        await page.waitForTimeout(500);
      } catch(e) {}

      const dir = join(BASE, pg.name);
      await mkdir(dir, { recursive: true });

      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      console.log(`  Height: ${height}px`);

      // Full page screenshot
      await page.screenshot({ path: join(dir, 'full-page.png'), fullPage: true, type: 'png' });

      // Section by section
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);

      let pos = 0, num = 1;
      while (pos < height) {
        await page.evaluate((y) => window.scrollTo(0, y), pos);
        await page.waitForTimeout(300);
        await page.screenshot({
          path: join(dir, `section-${String(num).padStart(2, '0')}.png`),
          type: 'png'
        });
        pos += 750;
        num++;
      }

      console.log(`  ✅ ${num - 1} sections captured`);
    } catch(e) {
      console.error(`  ❌ Error: ${e.message}`);
    }

    await browser.close();

    // Wait between pages to let server recover
    await new Promise(r => setTimeout(r, 3000));
  }

  console.log('\n🎉 All screenshots complete!');
}

run().catch(console.error);
