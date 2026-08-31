import fs from 'node:fs';
import path from 'node:path';

const DOCS_ROOT = path.join(process.cwd(), 'content/docs');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.mdx$/.test(entry.name) && !/\.(fr|ar)\.mdx$/.test(entry.name)) files.push(full);
  }
  return files;
}

function fileToStoragePath(file) {
  const rel = path.relative(DOCS_ROOT, file).replace(/\\/g, '/');
  return rel.replace(/\.mdx$/, '');
}

function linkBaseDir(pagePath) {
  const normalized = pagePath.replace(/\.mdx$/, '');
  if (normalized.endsWith('/index')) {
    return normalized.slice(0, -'/index'.length);
  }
  const parts = normalized.split('/').filter(Boolean);
  parts.pop();
  return parts.join('/');
}

function joinPath(dir, href) {
  const out = [];
  for (const part of [dir, href].join('/').split('/').filter(Boolean)) {
    if (part === '..') out.pop();
    else if (part !== '.') out.push(part);
  }
  return out.join('/');
}

function pageExists(pages, resolved) {
  return pages.has(resolved) || pages.has(`${resolved}/index`);
}

const pages = new Set(walk(DOCS_ROOT).map(fileToStoragePath));
const linkRe = /\[[^\]]+\]\((\.\.?\/[^)#]+)\)/g;
const issues = [];

for (const file of walk(DOCS_ROOT)) {
  const storagePath = fileToStoragePath(file);
  const dir = linkBaseDir(`${storagePath}.mdx`);
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = linkRe.exec(content))) {
    const href = match[1];
    const resolved = joinPath(dir, href);
    if (!pageExists(pages, resolved)) {
      issues.push({ file: path.relative(DOCS_ROOT, file), href, resolved, dir });
    }
  }
}

if (issues.length === 0) {
  console.log('No broken relative doc links found (fumadocs index path model).');
} else {
  console.log(`Found ${issues.length} broken relative links:\n`);
  for (const issue of issues) {
    console.log(`${issue.file}`);
    console.log(`  href: ${issue.href}  dir: ${issue.dir || '(root)'}`);
    console.log(`  resolves to: ${issue.resolved} (missing)\n`);
  }
  process.exitCode = 1;
}
