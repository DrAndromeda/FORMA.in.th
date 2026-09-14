#!/usr/bin/env node
// Walks the built `dist/` output and flags any internal `href="/..."` that doesn't
// resolve to a real generated page or a real static file under `public/`.
// Usage: node scripts/qa/linkcheck.cjs (after `npm run build`)
const fs = require('fs');
const path = require('path');

const distDir = path.join(process.cwd(), 'dist');
const publicDir = path.join(process.cwd(), 'public');
const validPaths = new Set();

function walkPages(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkPages(full);
    else if (entry.name.endsWith('.html')) {
      let rel = full.slice(distDir.length).replace(/index\.html$/, '');
      if (rel === '') rel = '/';
      validPaths.add(rel);
    }
  }
}
walkPages(distDir);

// Static files copied verbatim from public/ (favicon, robots.txt, etc.) are valid
// link targets even though they're not `.html` pages — walk public/ too.
function walkStatic(dir, base) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkStatic(full, base);
    else validPaths.add('/' + path.relative(base, full).split(path.sep).join('/'));
  }
}
walkStatic(publicDir, publicDir);

const hrefRe = /href="(\/[^"#?]*)(\?[^"#]*)?(#[^"]*)?"/g;
const broken = new Map();

function walkCheck(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkCheck(full);
    else if (entry.name.endsWith('.html')) {
      const html = fs.readFileSync(full, 'utf8');
      let m;
      while ((m = hrefRe.exec(html))) {
        let target = m[1];
        if (!target.endsWith('/') && !target.includes('.')) target += '/';
        if (!validPaths.has(target) && !target.startsWith('/_astro') && !target.startsWith('/images')) {
          const rel = full.slice(distDir.length);
          if (!broken.has(target)) broken.set(target, []);
          broken.get(target).push(rel);
        }
      }
    }
  }
}
walkCheck(distDir);

if (broken.size === 0) {
  console.log('No broken internal links found.');
  process.exit(0);
} else {
  console.log('Broken links found:');
  for (const [target, sources] of broken) {
    console.log(`  ${target}  <-  ${sources.slice(0, 3).join(', ')}${sources.length > 3 ? ` (+${sources.length - 3} more)` : ''}`);
  }
  process.exit(1);
}
