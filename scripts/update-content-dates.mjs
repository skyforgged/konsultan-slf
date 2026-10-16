import { execFileSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const pagePaths = [
  'src/content/pages/home.md',
  'src/content/pages/articles.md',
  'src/content/pages/services.md',
];
const gitNames = (args) => execFileSync('git', args, {
  cwd: root,
  encoding: 'utf8',
}).split('\n').map((file) => file.trim()).filter(Boolean);

const stagedPaths = gitNames(['diff', '--cached', '--name-only', '--diff-filter=ACMR']);
const changedArticles = stagedPaths.filter(
  (file) => file.startsWith('src/content/articles/') && file.endsWith('.md'),
);

if (changedArticles.length === 0) {
  console.log('Content dates: no staged article changes; nothing to update.');
  process.exit(0);
}

const filesToUpdate = [...new Set([...changedArticles, ...pagePaths])];
const unstagedTargets = gitNames(['diff', '--name-only', '--', ...filesToUpdate]);
if (unstagedTargets.length > 0) {
  throw new Error(
    'Content date automation stopped to avoid staging unrelated unstaged edits. Stage or discard these changes first:\n' +
    unstagedTargets.map((file) => `- ${file}`).join('\n'),
  );
}

const timestamp = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
const missingFiles = [];

for (const relativePath of filesToUpdate) {
  let source;
  try {
    source = await readFile(path.join(root, relativePath), 'utf8');
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      missingFiles.push(relativePath);
      continue;
    }
    throw error;
  }

  const frontmatterMatch = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatterMatch) {
    throw new Error(`Missing YAML frontmatter in ${relativePath}`);
  }

  const frontmatter = frontmatterMatch[1];
  const pubDateMatch = frontmatter.match(/^pubDate:\s*["']?([^"'\r\n]+)["']?\s*$/m);
  if (!pubDateMatch) {
    throw new Error(`Missing pubDate in ${relativePath}`);
  }

  const pubDate = new Date(pubDateMatch[1].trim());
  if (Number.isNaN(pubDate.valueOf())) {
    throw new Error(`Invalid pubDate in ${relativePath}: ${pubDateMatch[1]}`);
  }
  if (pubDate.valueOf() > Date.parse(timestamp)) {
    throw new Error(`pubDate is in the future; cannot set updatedDate earlier than pubDate: ${relativePath}`);
  }

  const updatedFrontmatter = /^updatedDate:\s*.*$/m.test(frontmatter)
    ? frontmatter.replace(/^updatedDate:\s*.*$/m, `updatedDate: "${timestamp}"`)
    : frontmatter.replace(/^(pubDate:\s*.*)$/m, `$1\nupdatedDate: "${timestamp}"`);
  const updatedSource = source.replace(frontmatterMatch[0], `---\n${updatedFrontmatter}\n---`);

  if (updatedSource !== source) {
    await writeFile(path.join(root, relativePath), updatedSource);
  }
}

if (missingFiles.length > 0) {
  throw new Error(`Required content file(s) not found: ${missingFiles.join(', ')}`);
}

execFileSync('git', ['add', '--', ...filesToUpdate], { cwd: root, stdio: 'inherit' });
console.log(`Content dates updated to ${timestamp} for ${changedArticles.length} article(s) and the home, articles, and services pages; all changes staged.`);
