import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const contentRoot = path.resolve('src/content');
const contentDirs = ['articles', 'pages', 'services'];
const files = [];
const failures = [];
let publishedFilesChecked = 0;

for (const directory of contentDirs) {
  await collectMarkdown(path.join(contentRoot, directory));
}

const placeholderPatterns = [
  { label: 'Lorem ipsum placeholder', pattern: /lorem\s+ipsum/i },
  { label: 'TODO marker', pattern: /\bTODO\b/i },
  { label: 'FIXME marker', pattern: /\bFIXME\b/i },
  { label: 'example.com placeholder domain', pattern: /\bexample\.com\b/i },
  { label: 'placeholder text', pattern: /\bplaceholder\b/i },
  { label: 'generic fill-in instruction', pattern: /\bisi di sini\b/i },
  { label: 'generic company-name placeholder', pattern: /\bnama perusahaan anda\b/i },
  { label: 'generic WhatsApp-number placeholder', pattern: /\bnomor whatsapp\b/i },
];

for (const file of files) {
  const source = await readFile(file, 'utf8');
  if (/^draft:\s*true\s*$/im.test(source)) continue;
  publishedFilesChecked++;

  const relativePath = path.relative(process.cwd(), file).split(path.sep).join('/');
  for (const { label, pattern } of placeholderPatterns) {
    const match = pattern.exec(source);
    if (match) failures.push(`${relativePath}: ${label} detected (${JSON.stringify(match[0])})`);
  }
}

if (failures.length > 0) {
  console.error(`Published content quality check failed: ${failures.length} issue(s) across ${publishedFilesChecked} published Markdown files.\n`);
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Published content quality check passed: ${publishedFilesChecked} published Markdown files checked; draft files excluded.`);
}

async function collectMarkdown(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') return;
    throw error;
  }

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) await collectMarkdown(fullPath);
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(fullPath);
  }
}
