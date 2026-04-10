import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TypeDetailPage, { resolveTypeBySlug } from '@/components/TypeDetailPage';
import { LANGUAGES, getTypeSlug, normalizeLocale } from '@/data/brand';
import { getDictionary } from '@/data/i18n';
import { TYPE_LIBRARY } from '@/data/types';
import { createPageMetadata } from '@/lib/seo';
import { getRequestSite } from '@/lib/site';

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const localeCodes = LANGUAGES.filter((item) => item.code !== 'zh').map((item) => item.code);
  const slugs = Object.keys(TYPE_LIBRARY).map((code) => getTypeSlug(code));

  return localeCodes.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = normalizeLocale(rawLocale);
  const dictionary = getDictionary(locale);
  const type = resolveTypeBySlug(slug);
  const { origin } = await getRequestSite();

  if (!type) {
    return {
      title: `${dictionary.typePage.notFoundTitle} | ${dictionary.siteTitle}`,
    };
  }

  return createPageMetadata({
    locale,
    origin,
    path: `/types/${slug}`,
    title: `${type.code} ${type.cn} | ${dictionary.typePage.metadataSuffix}`,
    description: `${type.intro} ${dictionary.typePage.metadataDescription}`,
    images: type.imageSrc ? [type.imageSrc] : undefined,
  });
}

export default async function Page({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = normalizeLocale(rawLocale);
  const type = resolveTypeBySlug(slug);

  if (!type) {
    notFound();
  }

  return <TypeDetailPage locale={locale} slug={slug} />;
}
