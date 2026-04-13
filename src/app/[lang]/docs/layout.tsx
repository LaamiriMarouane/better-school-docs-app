import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';

import { ReactNode } from 'react';

export default async function Layout(props: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  return (
    <DocsLayout tree={source.getPageTree(params.lang)} {...baseOptions()}>
      {props.children}
    </DocsLayout>
  );
}
