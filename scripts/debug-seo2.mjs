import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const failures = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const found = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) found.push(...await walk(fullPath));
    else if (entry.isFile()) found.push(fullPath);
  }
  return found;
}

function findMeta(html, key, value) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  const tag = tags.find((candidate) => getAttr(candidate, key)?.toLowerCase() === value.toLowerCase());
  return tag ? getAttr(tag, 'content') : null;
}

function getAttr(tag, name) {
  // DEBUG: log what we're doing
  const regex = new RegExp(`(?:^|\s)${name}\s*=\s*(["'])(.*?)\\1`, 'i');
  const match = tag.match(regex);
  if (!match && name === 'name') {
    console.log('DEBUG getAttr failed for tag:', tag.substring(0, 60));
    console.log('DEBUG regex:', regex);
  }
  return match?.[2] ?? null;
}

const files = await walk(root);
const pages = files.filter((file) => file.endsWith('.html'));

for (const file of pages.slice(0, 2)) {
  const html = await readFile(file, 'utf8');
  const page = path.relative(root, file).split(path.sep).join('/');
  console.log('\n===', page, '===');
  
  const description = findMeta(html, 'name', 'description');
  console.log('description:', description ? 'FOUND' : 'MISSING');
  
  const ogTitle = findMeta(html, 'property', 'og:title');
  console.log('og:title:', ogTitle ? 'FOUND' : 'MISSING');
  
  const twitterCard = findMeta(html, 'name', 'twitter:card');
  console.log('twitter:card:', twitterCard ? 'FOUND' : 'MISSING');
}
