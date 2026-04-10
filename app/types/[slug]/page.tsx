import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TypeDetailPage, { resolveTypeBySlug } from '@/components/TypeDetailPage';
import { DEFAULT_LOCALE, getTypeSlug } from '@/data/brand';
import { getDictionary } from '@/data/i18n';
import { createPageMetadata } from '@/lib/seo';
import { getRequestSite } from '@/lib/site';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const type = resolveTypeBySlug(slug);
  const dictionary = getDictionary(DEFAULT_LOCALE);
  const { origin } = await getRequestSite();

  if (!type) {
    return {
      title: `${dictionary.typePage.notFoundTitle} | ${dictionary.siteTitle}`,
    };
  }

  return createPageMetadata({
    locale: DEFAULT_LOCALE,
    origin,
    path: `/types/${getTypeSlug(type.code)}`,
    title: `${type.code} ${type.cn} | ${dictionary.typePage.metadataSuffix}`,
    description: `${type.intro} ${dictionary.typePage.metadataDescription}`,
    images: type.imageSrc ? [type.imageSrc] : undefined,
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const type = resolveTypeBySlug(slug);

  if (!type) {
    notFound();
  }

  return <TypeDetailPage locale={DEFAULT_LOCALE} slug={slug} />;
}
