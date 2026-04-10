import type { Metadata } from 'next';
import CPApp from '@/components/CPApp';
import { DEFAULT_LOCALE } from '@/data/brand';
import { createCPMetadata } from '@/lib/seo';
import { getRequestSite } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  const { origin } = await getRequestSite();
  return createCPMetadata(DEFAULT_LOCALE, origin);
}

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CPPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialParamA = typeof params.a === 'string' ? params.a : '';
  const initialParamB = typeof params.b === 'string' ? params.b : '';

  return (
    <CPApp
      initialParamA={initialParamA}
      initialParamB={initialParamB}
      locale={DEFAULT_LOCALE}
    />
  );
}
