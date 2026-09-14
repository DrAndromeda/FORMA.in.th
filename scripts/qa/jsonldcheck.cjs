#!/usr/bin/env node
// Walks the built `dist/` output and parses every <script type="application/ld+json">
// block to confirm it's valid JSON. Usage: node scripts/qa/jsonldcheck.cjs (after `npm run build`)
const fs = require('fs');
const path = require('path');
const distDir = path.join(process.cwd(), 'dist');
let issues = 0;
let total = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) check(full);
  }
}

function check(file) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = file.slice(distDir.length);
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) {
    total++;
    try {
      JSON.parse(m[1]);
    } catch (e) {
      console.log(`[json-ld] ${rel}: invalid JSON — ${e.message}`);
      issues++;
    }
  }
}

walk(distDir);
console.log(`Checked ${total} JSON-LD blocks.`);
console.log(issues === 0 ? 'All valid.' : `${issues} invalid block(s).`);
process.exit(issues === 0 ? 0 : 1);
