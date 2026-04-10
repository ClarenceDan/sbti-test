import type { Metadata } from 'next';
import CPApp from '@/components/CPApp';
import { normalizeLocale } from '@/data/brand';
import { createCPMetadata } from '@/lib/seo';
import { getRequestSite } from '@/lib/site';

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { origin } = await getRequestSite();
  return createCPMetadata(locale, origin);
}

export default async function LocalizedCPPage({ params, searchParams }: PageProps) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  const initialParamA = typeof query.a === 'string' ? query.a : '';
  const initialParamB = typeof query.b === 'string' ? query.b : '';

  return (
    <CPApp
      initialParamA={initialParamA}
      initialParamB={initialParamB}
      locale={normalizeLocale(locale)}
    />
  );
}
