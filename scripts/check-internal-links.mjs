import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const htmlFiles = await walk(root);
const errors = [];
let checked = 0;

for (const file of htmlFiles.filter((item) => item.endsWith('.html'))) {
  const html = await readFile(file, 'utf8');
  const references = [...html.matchAll(/\\b(?:href|src|poster)=["']([^"'<>]+)["']/gi)];
  for (const match of references) {
    const value = match[1].trim();
    if (!value || value.startsWith('#') || /^(?:https?:|mailto:|tel:|data:|javascript:|blob:|//)/i.test(value)) continue;
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(value, 'https://internal-link-check.invalid').pathname);
    } catch {
      errors.push(`${relative(file)}: invalid URL "${value}"`);
      continue;
    }
    if (!pathname.startsWith('/')) continue;
    const target = path.resolve(root, `.${pathname}`);
    if (!target.startsWith(root + path.sep) && target !== root) {
      errors.push(`${relative(file)}: path escapes output directory "${value}"`);
      continue;
    }
    const candidates = pathname.endsWith('/')
      ? [path.join(target, 'index.html')]
      : [target, path.join(target, 'index.html')];
    let exists = false;
    for (const candidate of candidates) {
      try {
        if ((await stat(candidate)).isFile()) {
          exists = true;
          break;
        }
      } catch {
        // Try the next valid static-output mapping.
      }
    }
    checked++;
    if (!exists) errors.push(`${relative(file)}: missing local target "${value}"`);
  }
}

if (errors.length) {
  console.error(`Internal link check failed: ${errors.length} issue(s) across ${checked} local references.\n`);
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Internal link check passed: ${checked} local references checked across ${htmlFiles.filter((item) => item.endsWith('.html')).length} HTML pages.`);
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else if (entry.isFile()) files.push(fullPath);
  }
  return files;
}

function relative(file) {
  return path.relative(root, file).split(path.sep).join('/');
}
