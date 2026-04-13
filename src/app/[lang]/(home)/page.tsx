import { redirect } from 'next/navigation';

export default async function HomePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  redirect(`/${params.lang}/docs`);
}
