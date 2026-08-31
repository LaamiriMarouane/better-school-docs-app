import fs from 'node:fs';
import path from 'node:path';

const DOCS_ROOT = path.join(process.cwd(), 'content/docs');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.mdx$/.test(entry.name)) files.push(full);
  }
  return files;
}

function linkBaseDir(storagePath) {
  const normalized = storagePath.replace(/\.(fr|ar)\.mdx$/, '').replace(/\.mdx$/, '');
  if (normalized.endsWith('/index')) {
    return normalized.slice(0, -'/index'.length);
  }
  const parts = normalized.split('/').filter(Boolean);
  parts.pop();
  return parts.join('/');
}

function dedupeHref(dir, href) {
  if (!href.startsWith('./')) return href;
  const folder = dir.split('/').filter(Boolean).at(-1);
  if (!folder) return href;

  const dupPrefix = `./${folder}/`;
  if (href.startsWith(dupPrefix)) {
    return `./${href.slice(dupPrefix.length)}`;
  }
  return href;
}

let changedFiles = 0;
let changedLinks = 0;

for (const file of walk(DOCS_ROOT)) {
  const rel = path.relative(DOCS_ROOT, file).replace(/\\/g, '/');
  const storagePath = rel.replace(/\.mdx$/, '');
  const dir = linkBaseDir(`${storagePath}.mdx`);
  const original = fs.readFileSync(file, 'utf8');
  let fileChanged = false;

  const updated = original.replace(/\]\((\.\.?\/[^)#]+)\)/g, (match, href) => {
    const fixed = dedupeHref(dir, href);
    if (fixed !== href) {
      changedLinks += 1;
      fileChanged = true;
      return `](${fixed})`;
    }
    return match;
  });

  if (fileChanged) {
    fs.writeFileSync(file, updated);
    changedFiles += 1;
    console.log(`fixed ${rel}`);
  }
}

console.log(`\nUpdated ${changedLinks} links in ${changedFiles} files.`);
