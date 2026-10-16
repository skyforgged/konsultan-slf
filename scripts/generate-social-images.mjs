#!/usr/bin/env node
import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(root, 'public/images/social');
const images = {
  'home': 'building-compliance.svg',
  'services': 'service-directory.svg',
  'articles': 'article-guide.svg',
  'kontak': 'contact-support.svg',
  '404': 'not-found.svg',
  'checklist-persiapan-konsultasi-slf': 'article-checklist.svg',
  'checklist-dokumen-slf-lengkap': 'article-document.svg',
  'pengertian-slf-dasar-hukum': 'article-slf-law.svg',
  'pengertian-slf': 'article-slf-overview.svg',
  'as-built-drawing': 'service-as-built.svg',
  'pengkajian-teknis-bangunan': 'service-technical-assessment.svg',
  'pengurusan-pbg': 'service-pbg.svg',
  'perpanjangan-slf': 'service-slf-renewal.svg',
  'sertifikat-laik-fungsi': 'service-slf-certificate.svg',
  'slf-bangunan-eksisting': 'service-existing-building.svg',
};

await mkdir(outputDir, { recursive: true });
for (const [slug, filename] of Object.entries(images)) {
  const source = path.join(root, 'public/images/illustrations', filename);
  const output = path.join(outputDir, `${slug}.webp`);
  try {
    if (!(await stat(source)).isFile()) throw new Error('source file is missing');
    const result = await sharp(source)
      .resize(1200, 630, { fit: 'contain', background: '#f8fafc' })
      .webp({ quality: 80 })
      .toFile(output);
    console.log(`Social image generated: ${slug}.webp (${result.width}x${result.height}, ${result.size} bytes)`);
  } catch (error) {
    console.error(`Failed to generate social image for ${slug}: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}
