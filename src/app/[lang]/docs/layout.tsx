import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { getCachedClientManifest } from '@/lib/clientManifest';
import { DocsNavBrand } from '@/components/DocsNavBrand';
import { appName } from '@/lib/shared';

import { ReactNode } from 'react';

export default async function Layout(props: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const manifest = await getCachedClientManifest();
  const displayName =
    manifest?.brand?.shortName?.trim() ||
    manifest?.brand?.displayName?.trim() ||
    manifest?.brand?.companyName?.trim() ||
    appName;

  return (
    <DocsLayout
      tree={source.getPageTree(params.lang)}
      {...baseOptions(
        <DocsNavBrand displayName={displayName} brand={manifest?.brand} />,
      )}
    >
      {props.children}
    </DocsLayout>
  );
}
