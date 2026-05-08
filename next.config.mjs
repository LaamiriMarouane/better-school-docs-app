import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

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
  images: {
    remotePatterns: imageRemotePatterns(),
  },
};

export default withMDX(config);
