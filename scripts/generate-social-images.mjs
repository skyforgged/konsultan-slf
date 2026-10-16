#!/usr/bin/env node
import sharp from 'sharp';
import { mkdir, stat, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentRoot = path.join(root, 'src/content');
const outputDir = path.join(root, 'public/images/social');
const illustrationDir = path.join(root, 'public/images/illustrations');
const errors = [];

await mkdir(outputDir, { recursive: true });

async function extractFrontmatterValue(filePath, key) {
  const content = await readFile(filePath, 'utf8');
  const frontmatter = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!frontmatter) {
    errors.push(`${path.relative(root, filePath)}: missing or malformed frontmatter`);
    return null;
  }

  const escapedKey = key.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&');
  const match = frontmatter[1].match(
    new RegExp('^' + key + ':\\s*"([^"]*)"\\s*$', 'm')
  );
  return match ? (match[1] ?? match[2] ?? match[3]).trim() : null;
}

async function processContent(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await processContent(fullPath);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;

    const imageUrl = await extractFrontmatterValue(fullPath, 'image');
    if (!imageUrl) continue;

    const socialImage = await extractFrontmatterValue(fullPath, 'socialImage');
    if (!imageUrl.startsWith('/images/illustrations/') || path.extname(imageUrl) !== '.svg') {
      errors.push(`${path.relative(root, fullPath)}: image must point to an SVG in /images/illustrations/`);
      continue;
    }

    const base = path.basename(imageUrl, '.svg');
    const expectedSocialImage = `/images/social/${base}.webp`;
    if (socialImage !== expectedSocialImage) {
      errors.push(`${path.relative(root, fullPath)}: socialImage must be "${expectedSocialImage}" (found ${socialImage ?? 'missing'})`);
      continue;
    }

    const sourcePath = path.join(illustrationDir, `${base}.svg`);
    const outputPath = path.join(outputDir, `${base}.webp`);
    try {
      const sourceStat = await stat(sourcePath);
      if (!sourceStat.isFile()) throw new Error('source is not a file');
      const result = await sharp(sourcePath)
        .resize(1200, 630, { fit: 'contain', background: '#f8fafc' })
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`Social image generated: ${base}.webp (${result.width}x${result.height}, ${result.size} bytes)`);
    } catch (err) {
      errors.push(`${path.relative(root, fullPath)}: failed to generate ${base}.webp: ${err.message}`);
    }
  }
}

for (const collection of ['articles', 'services', 'pages']) {
  try {
    await processContent(path.join(contentRoot, collection));
  } catch (err) {
    errors.push(`src/content/${collection}: ${err.message}`);
  }
}

if (errors.length) {
  console.error('Social image generation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log('Social image generation completed successfully; all content image references are valid.');
}
