import type { Metadata } from 'next';
import QuizApp from '@/components/QuizApp';
import { LANGUAGES, normalizeLocale } from '@/data/brand';
import { createHomeMetadata } from '@/lib/seo';
import { getRequestSite } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGUAGES.filter((item) => item.code !== 'zh').map((item) => ({
    locale: item.code,
  }));
}

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { origin } = await getRequestSite();
  return createHomeMetadata(locale, origin);
}

export default async function LocalizedHome({ params }: PageProps) {
  const { locale } = await params;

  return (
    <main>
      <QuizApp locale={normalizeLocale(locale)} />
    </main>
  );
}
