import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const failures = [];
let pagesChecked = 0;
let jsonLdChecked = 0;
let socialImagesChecked = 0;
let rasterFallbackChecked = false;
const canonicalUrls = new Set();
const canonicalOwners = new Map();
let robotsSitemapUrl = null;

try {
  await stat(root);
} catch {
  console.error('SEO output check failed: "dist" does not exist. Run the Astro build first.');
  process.exit(1);
}

const files = await walk(root);
const pages = files.filter((file) => file.endsWith('.html'));
if (pages.length === 0) failures.push('No HTML pages found in build output.');

for (const file of pages) {
  const html = await readFile(file, 'utf8');
  const page = path.relative(root, file).split(path.sep).join('/');
  pagesChecked++;

  const titleTags = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
  if (titleTags.length !== 1) failures.push(`${page}: expected exactly one <title>, found ${titleTags.length}`);
  const titleText = titleTags[0]?.[1].replace(/<[^>]*>/g, '').trim();
  if (!titleText) failures.push(`${page}: <title> must not be empty`);

  const description = findMeta(html, 'name', 'description');
  if (!description) failures.push(`${page}: missing meta description`);

  const noindex = /<meta\b(?=[^>]*\bname=["']robots["'])(?=[^>]*\bcontent=["'][^"']*\bnoindex\b)[^>]*>/i.test(html);
  const canonicals = [...html.matchAll(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/gi)];
  if (noindex && canonicals.length > 0) {
    failures.push(`${page}: noindex page must not include a canonical link`);
  } else if (!noindex && canonicals.length !== 1) {
    failures.push(`${page}: expected exactly one canonical link, found ${canonicals.length}`);
  }

  const canonicalTag = canonicals[0]?.[0];
  const canonicalHref = canonicalTag ? getAttr(canonicalTag, 'href') : null;
  if (!noindex && canonicalHref && isAbsoluteHttpUrl(canonicalHref)) {
    const previousPage = canonicalOwners.get(canonicalHref);
    if (previousPage && previousPage !== page) {
      failures.push(`${page}: canonical URL is already assigned to ${previousPage}: ${canonicalHref}`);
    } else {
      canonicalOwners.set(canonicalHref, page);
    }
    canonicalUrls.add(canonicalHref);
  }
  if (canonicalHref && !isAbsoluteHttpUrl(canonicalHref)) {
    failures.push(`${page}: canonical URL must be absolute HTTP(S): ${canonicalHref}`);
  }
  const ogUrl = findMeta(html, 'property', 'og:url');
  if (canonicalHref && ogUrl && canonicalHref !== ogUrl) {
    failures.push(`${page}: og:url does not match canonical URL`);
  }

  for (const [attribute, value] of [
    ['property', 'og:title'],
    ['property', 'og:description'],
    ['property', 'og:url'],
    ['property', 'og:image'],
    ['name', 'twitter:card'],
    ['name', 'twitter:image'],
  ]) {
    if (!findMeta(html, attribute, value)) failures.push(`${page}: missing ${value} metadata`);
  }

  const canonicalOrigin = canonicalHref && isAbsoluteHttpUrl(canonicalHref) ? new URL(canonicalHref).origin : null;
  for (const [label, imageUrlValue] of [
    ['og:image', findMeta(html, 'property', 'og:image')],
    ['twitter:image', findMeta(html, 'name', 'twitter:image')],
  ]) {
    if (!imageUrlValue || !canonicalOrigin) continue;
    try {
      const imageUrl = new URL(imageUrlValue, canonicalHref);
      if (imageUrl.origin !== canonicalOrigin) continue;
      const pathname = decodeURIComponent(imageUrl.pathname);
      const imagePath = path.resolve(root, `.${pathname}`);
      if (!imagePath.startsWith(root + path.sep)) {
        failures.push(`${page}: ${label} path escapes build output: ${imageUrlValue}`);
      } else {
        try {
          if (!(await stat(imagePath)).isFile()) failures.push(`${page}: ${label} file is missing: ${imageUrlValue}`);
          else socialImagesChecked++;
        } catch {
          failures.push(`${page}: ${label} file is missing: ${imageUrlValue}`);
        }
      }
    } catch {
      failures.push(`${page}: invalid ${label} URL: ${imageUrlValue}`);
    }
  }

  const jsonLdBlocks = [...html.matchAll(/<script\b(?=[^>]*\btype=["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script>/gi)];
  for (const block of jsonLdBlocks) {
    try {
      const data = JSON.parse(block[1]);
      jsonLdChecked++;
      validateJsonLd(data, page, failures);
    } catch (error) {
      failures.push(`${page}: invalid JSON-LD (${error instanceof Error ? error.message : String(error)})`);
    }
  }
}

const socialFallbacks = [
  { path: 'images/og-default.png', type: 'PNG', signature: [137, 80, 78, 71, 13, 10, 26, 10] },
  { path: 'images/og-default.svg', type: 'SVG' },
];
for (const fallback of socialFallbacks) {
  const target = path.join(root, fallback.path);
  try {
    const info = await stat(target);
    if (!info.isFile()) { failures.push(`Missing social image fallback: ${fallback.path}`); continue; }
    if (fallback.type === 'PNG') {
      const bytes = await readFile(target);
      if (bytes.length < 24 || !fallback.signature.every((byte, index) => bytes[index] === byte)) {
        failures.push(`${fallback.path}: invalid PNG signature or truncated image`);
      } else {
        const width = bytes.readUInt32BE(16), height = bytes.readUInt32BE(20);
        if (width !== 1200 || height !== 630) failures.push(`${fallback.path}: expected 1200x630 PNG, found ${width}x${height}`);
        else rasterFallbackChecked = true;
      }
    }
  } catch { failures.push(`Missing social image fallback: ${fallback.path}`); }
}

for (const requiredFile of ['robots.txt', 'sitemap.xml']) {
  const target = path.join(root, requiredFile);
  try {
    if (!(await stat(target)).isFile()) failures.push(`Missing generated ${requiredFile}`);
  } catch {
    failures.push(`Missing generated ${requiredFile}`);
  }
}

try {
  const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
  const sitemapDirectives = [...robots.matchAll(/^Sitemap:\s*(\S+)\s*$/gim)];
  if (sitemapDirectives.length !== 1) {
    failures.push(`robots.txt must declare exactly one Sitemap URL, found ${sitemapDirectives.length}.`);
  }
  for (const [, sitemapValue] of sitemapDirectives) {
    if (!isAbsoluteHttpUrl(sitemapValue)) {
      failures.push(`robots.txt Sitemap URL must be absolute HTTP(S): ${sitemapValue}`);
      continue;
    }
    robotsSitemapUrl = new URL(sitemapValue);
    if (!robotsSitemapUrl.pathname.endsWith('/sitemap.xml')) {
      failures.push(`robots.txt Sitemap URL must point to sitemap.xml: ${sitemapValue}`);
    }
  }
} catch {
  // Missing file is already reported above.
}

try {
  const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
  if (!sitemap.includes('<urlset') || !sitemap.includes('</urlset>')) failures.push('sitemap.xml has an invalid urlset envelope.');
  const locations = [...sitemap.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)];
  if (locations.length === 0) failures.push('sitemap.xml contains no <loc> entries.');
  const seenLocations = new Set();
  const sitemapOrigins = new Set();
  for (const [, location] of locations) {
    const decodedLocation = decodeXml(location.trim());
    if (!isAbsoluteHttpUrl(decodedLocation)) {
      failures.push(`sitemap.xml contains a non-absolute URL: ${location}`);
      continue;
    }
    let sitemapUrl;
    try {
      sitemapUrl = new URL(decodedLocation);
    } catch {
      failures.push(`sitemap.xml contains an invalid URL: ${location}`);
      continue;
    }
    if (seenLocations.has(sitemapUrl.href)) failures.push(`sitemap.xml contains a duplicate URL: ${sitemapUrl.href}`);
    seenLocations.add(sitemapUrl.href);
    sitemapOrigins.add(sitemapUrl.origin);
    if (canonicalUrls.size > 0 && !canonicalUrls.has(sitemapUrl.href)) {
      failures.push(`sitemap.xml URL has no matching indexable page canonical: ${sitemapUrl.href}`);
    }
  }
  if (sitemapOrigins.size > 1) failures.push('sitemap.xml URLs must all use the same origin.');
  if (robotsSitemapUrl && sitemapOrigins.size === 1 && robotsSitemapUrl.origin !== [...sitemapOrigins][0]) {
    failures.push('robots.txt Sitemap URL origin does not match sitemap.xml URL origin.');
  }
  if (robotsSitemapUrl && canonicalUrls.size > 0) {
    const canonicalOrigins = new Set([...canonicalUrls].map((url) => new URL(url).origin));
    if (canonicalOrigins.size === 1 && robotsSitemapUrl.origin !== [...canonicalOrigins][0]) {
      failures.push('robots.txt Sitemap URL origin does not match the indexable page canonical origin.');
    }
  }
  if (sitemapOrigins.size === 1 && canonicalUrls.size > 0) {
    const canonicalOrigins = new Set([...canonicalUrls].map((url) => new URL(url).origin));
    if (canonicalOrigins.size === 1 && !canonicalOrigins.has([...sitemapOrigins][0])) {
      failures.push('sitemap.xml origin does not match the indexable page canonical origin.');
    }
  }
} catch {
  // Missing file is already reported above.
}

if (failures.length) {
  console.error(`SEO output check failed: ${failures.length} issue(s) across ${pagesChecked} HTML pages.\n`);
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`SEO output check passed: ${pagesChecked} HTML pages, ${jsonLdChecked} valid JSON-LD blocks, ${socialImagesChecked} local social images, ${rasterFallbackChecked ? 'PNG and SVG social fallbacks' : 'social fallback validation incomplete'}, robots.txt, and sitemap.xml.`);
}

function validateJsonLd(data, page, failures) {
  const objects = [];
  const visit = (value) => {
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    if (!value || typeof value !== 'object') return;
    objects.push(value);
    if (Array.isArray(value['@graph'])) value['@graph'].forEach(visit);
  };
  visit(data);
  if (objects.length === 0) {
    failures.push(`${page}: JSON-LD must contain an object or array of objects`);
    return;
  }

  for (const item of objects) {
    const typeValue = item['@type'];
    const types = Array.isArray(typeValue) ? typeValue : [typeValue];
    if (!types.some((type) => typeof type === 'string')) {
      failures.push(`${page}: JSON-LD object is missing a valid @type`);
      continue;
    }
    if (types.some((type) => ['Article', 'BlogPosting', 'TechArticle', 'NewsArticle'].includes(type))) {
      for (const key of ['headline', 'datePublished', 'mainEntityOfPage', 'url']) {
        if (!item[key]) failures.push(`${page}: Article JSON-LD is missing required field "${key}"`);
      }
      if (item.datePublished && !Number.isFinite(Date.parse(item.datePublished))) {
        failures.push(`${page}: Article JSON-LD has an invalid datePublished value`);
      }
      if (item.dateModified && !Number.isFinite(Date.parse(item.dateModified))) {
        failures.push(`${page}: Article JSON-LD has an invalid dateModified value`);
      }
      if (item.url && !isAbsoluteHttpUrl(item.url)) {
        failures.push(`${page}: Article JSON-LD url must be an absolute HTTP(S) URL`);
      }
    }
    if (types.includes('Service')) {
      for (const key of ['name', 'url', 'provider']) {
        if (!item[key]) failures.push(`${page}: Service JSON-LD is missing required field "${key}"`);
      }
      if (item.url && !isAbsoluteHttpUrl(item.url)) {
        failures.push(`${page}: Service JSON-LD url must be an absolute HTTP(S) URL`);
      }
    }
    if (types.includes('BreadcrumbList')) {
      if (!Array.isArray(item.itemListElement) || item.itemListElement.length === 0) {
        failures.push(`${page}: BreadcrumbList JSON-LD must contain itemListElement`);
      } else {
        for (const [index, entry] of item.itemListElement.entries()) {
          if (!entry || typeof entry !== 'object' || !entry.name || !entry.item) {
            failures.push(`${page}: BreadcrumbList item ${index + 1} must contain name and item`);
          } else if (!isAbsoluteHttpUrl(typeof entry.item === 'string' ? entry.item : entry.item['@id'])) {
            failures.push(`${page}: BreadcrumbList item ${index + 1} must use an absolute HTTP(S) URL`);
          }
        }
      }
    }
  }
}

function findMeta(html, key, value) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  const tag = tags.find((candidate) => getAttr(candidate, key)?.toLowerCase() === value.toLowerCase());
  return tag ? getAttr(tag, 'content') : null;
}

function getAttr(tag, name) {
  const match = tag.match(new RegExp(`(?:^|\s)${name}\s*=\s*(["'])(.*?)\\1`, 'i'));
  return match?.[2] ?? null;
}

function isAbsoluteHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function decodeXml(value) {
  return value.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'");
}

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
