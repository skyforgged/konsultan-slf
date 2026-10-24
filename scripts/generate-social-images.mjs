#!/usr/bin/env node
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { mkdir, stat, readdir, readFile, writeFile } from 'node:fs/promises';
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

  const escapedKey = key;
  const match = frontmatter[1].match(
    new RegExp('^' + escapedKey + ':\\s*"([^"]*)"\\s*$', 'm')
  );
  return match ? (match[1] ?? '').trim() : null;
}

async function processContent(dir, collection) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await processContent(fullPath, collection);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;

    let imageUrl = await extractFrontmatterValue(fullPath, 'image');
    const socialImage = await extractFrontmatterValue(fullPath, 'socialImage');
    if (collection === 'pages') {
      const content = await readFile(fullPath, 'utf8');
      const frontmatter = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
      const blockImage = frontmatter?.[1].match(/^\s+image:\s*"([^"]+\.svg)"\s*$/m);
      imageUrl = blockImage?.[1] ?? null;
    }
    if (!imageUrl) {
      if (socialImage) errors.push(`${path.relative(root, fullPath)}: socialImage exists but no SVG image source was found`);
      continue;
    }
    if (!socialImage) continue;
    if (!imageUrl.startsWith('/images/illustrations/') || path.extname(imageUrl) !== '.svg') {
      errors.push(`${path.relative(root, fullPath)}: image must point to an SVG in /images/illustrations/`);
      continue;
    }

    const sourceBase = path.basename(imageUrl, '.svg');
    const outputBase = collection === 'pages' ? path.basename(socialImage, '.webp') : sourceBase;
    const expectedSocialImage = `/images/social/${outputBase}.webp`;
    if (collection === 'pages') {
      if (!socialImage.startsWith('/images/social/') || path.extname(socialImage) !== '.webp' || path.basename(socialImage) !== `${outputBase}.webp`) {
        errors.push(`${path.relative(root, fullPath)}: page socialImage must be a local /images/social/*.webp path`);
        continue;
      }
    } else if (socialImage !== expectedSocialImage) {
      errors.push(`${path.relative(root, fullPath)}: socialImage must be "${expectedSocialImage}" (found ${socialImage})`);
      continue;
    }

    const sourcePath = path.join(illustrationDir, `${sourceBase}.svg`);
    const outputPath = path.join(outputDir, `${outputBase}.webp`);
    const metadataPath = `${outputPath}.meta.json`;
    try {
      const sourceBuffer = await readFile(sourcePath);
      const transformOptions = {
        generatorVersion: 2,
        width: 1200,
        height: 630,
        fit: 'contain',
        background: '#f8fafc',
        format: 'webp',
        quality: 80,
      };
      const sourceHash = createHash('sha256')
        .update(JSON.stringify(transformOptions))
        .update(sourceBuffer)
        .digest('hex');

      const [outStat, metadataContent] = await Promise.all([
        stat(outputPath).catch(() => null),
        readFile(metadataPath, 'utf8').catch(() => null),
      ]);
      let metadata = null;
      try {
        metadata = metadataContent ? JSON.parse(metadataContent) : null;
      } catch {
        // Missing or malformed metadata forces regeneration.
      }

      if (outStat?.isFile() && metadata?.sourceHash === sourceHash) {
        continue;
      }

      const result = await sharp(sourceBuffer)
        .resize(transformOptions.width, transformOptions.height, {
          fit: transformOptions.fit,
          background: transformOptions.background,
        })
        .webp({ quality: transformOptions.quality })
        .toFile(outputPath);
      await writeFile(metadataPath, `${JSON.stringify({ sourceHash }, null, 2)}\n`, 'utf8');
      console.log(`Social image generated: ${outputBase}.webp (${result.width}x${result.height}, ${result.size} bytes)`);
    } catch (err) {
      errors.push(`${path.relative(root, fullPath)}: failed to generate ${outputBase}.webp: ${err.message}`);
    }
  }
}

for (const collection of ['articles', 'services', 'pages']) {
  try {
    await processContent(path.join(contentRoot, collection), collection);
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
