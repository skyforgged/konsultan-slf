#!/usr/bin/env node
import sharp from 'sharp';
import { mkdir, stat, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentRoot = path.join(root, 'src/content');
const outputDir = path.join(root, 'public/images/social');
const illustrationDir = path.join(root, 'public/images/illustrations');

await mkdir(outputDir, { recursive: true });

async function extractFrontmatterValue(filePath, key) {
  const fs = await import('node:fs/promises');
  const content = await fs.readFile(filePath, 'utf8');
  const regex = new RegExp('^' + key + ':\\s*["\']?([^"\'\\r\\n]+)', 'm');
  const match = content.match(regex);
  return match ? match[1].trim() : null;
}

async function processContent(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await processContent(fullPath);
    } else if (entry.name.endsWith('.md')) {
      const imageUrl = await extractFrontmatterValue(fullPath, 'image');
      if (!imageUrl) continue;
      const base = path.basename(imageUrl, '.svg');
      const outputPath = path.join(outputDir, `${base}.webp`);
      const sourcePath = path.join(illustrationDir, `${base}.svg`);
      try {
        const s = await stat(sourcePath);
        if (!s.isFile()) {
          console.error(`Failed: source SVG missing for ${base}`);
          continue;
        }
        const result = await sharp(sourcePath)
          .resize(1200, 630, { fit: 'contain', background: '#f8fafc' })
          .webp({ quality: 80 })
          .toFile(outputPath);
        console.log(`Social image generated: ${base}.webp (${result.width}x${result.height}, ${result.size} bytes)`);
      } catch (err) {
        if (err.code === 'ENOENT') {
          console.error(`Failed: source SVG missing for ${base}`);
        } else {
          console.error(`Failed to generate ${base}: ${err.message}`);
        }
      }
    }
  }
}

await processContent(path.join(contentRoot, 'articles'));
await processContent(path.join(contentRoot, 'services'));
await processContent(path.join(contentRoot, 'pages'));
