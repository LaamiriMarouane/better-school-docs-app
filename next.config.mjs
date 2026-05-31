import { createMDX } from 'fumadocs-mdx/next';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const withMDX = createMDX();

// This app lives in a monorepo with several sibling lockfiles, so Next/Turbopack
// mis-detects the workspace root. Pin it to this directory so module resolution
// (e.g. the `@import 'tailwindcss'` in global.css) works in dev and build.
const projectRoot = dirname(fileURLToPath(import.meta.url));

function imageRemotePatterns() {
  const patterns = [
    { protocol: 'http', hostname: 'localhost', pathname: '/**' },
    { protocol: 'https', hostname: 'localhost', pathname: '/**' },
    { protocol: 'http', hostname: '127.0.0.1', pathname: '/**' },
  ];
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (base) {
    try {
      const u = new URL(base);
      const entry = {
        protocol: u.protocol.replace(':', ''),
        hostname: u.hostname,
        pathname: '/**',
        ...(u.port ? { port: u.port } : {}),
      };
      patterns.push(entry);
    } catch {
      /* ignore invalid NEXT_PUBLIC_API_URL */
    }
  }
  return patterns;
}

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'standalone',
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: imageRemotePatterns(),
  },
};

export default withMDX(config);
