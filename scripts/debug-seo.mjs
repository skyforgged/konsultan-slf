import { readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');

function getAttr(tag, name) {
  const match = tag.match(new RegExp(`(?:^|\s)${name}\s*=\s*(["'])(.*?)\\1`, 'i'));
  return match?.[2] ?? null;
}

async function main() {
  const html = await readFile(path.join(root, 'articles/index.html'), 'utf8');
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  console.log('Total meta tags:', tags.length);
  
  for (let i = 0; i < Math.min(5, tags.length); i++) {
    const tag = tags[i];
    console.log(`\nTag ${i}:`, tag.substring(0, 100));
    console.log('  getAttr name:', getAttr(tag, 'name'));
    console.log('  getAttr property:', getAttr(tag, 'property'));
    console.log('  getAttr content:', getAttr(tag, 'content'));
  }
}

main().catch(console.error);
