import { cache } from 'react';
import type { ClientManifestResponseDTO } from '@/lib/clientManifest.types';

function apiBase(): string {
  return (
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') ||
    'http://localhost:8080'
  );
}

export async function getClientManifest(): Promise<ClientManifestResponseDTO | null> {
  try {
    const res = await fetch(`${apiBase()}/api/v1/public/client-manifest`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return (await res.json()) as ClientManifestResponseDTO;
  } catch {
    return null;
  }
}

/** Deduped per request (Next.js / React cache). */
export const getCachedClientManifest = cache(getClientManifest);
