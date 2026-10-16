#!/usr/bin/env node
import sharp from 'sharp';
import { resolve, basename } from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(__dirname, '..');

const args = process.argv.slice(2);

if (args.length < 1) {
  console.error('Usage: node scripts/svg-to-png.mjs <svg-file> [output.png]');
  process.exit(1);
}

const inputPath = resolve(root, args[0]);
let outputPath = args[1]
  ? resolve(root, args[1])
  : inputPath.replace(/\.svg$/i, '.png');

try {
  mkdirSync(resolve(outputPath, '..'), { recursive: true });
  const info = await sharp(inputPath).png().toFile(outputPath);
  console.log(`${basename(inputPath)} → ${basename(outputPath)} (${info.size} bytes)`);
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}
