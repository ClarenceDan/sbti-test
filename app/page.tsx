import type { Metadata } from 'next';
import QuizApp from '@/components/QuizApp';
import { DEFAULT_LOCALE } from '@/data/brand';
import { createHomeMetadata } from '@/lib/seo';
import { getRequestSite } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  const { origin } = await getRequestSite();
  return createHomeMetadata(DEFAULT_LOCALE, origin);
}

export default function Home() {
  return (
    <main>
      <QuizApp locale={DEFAULT_LOCALE} />
    </main>
  );
}
