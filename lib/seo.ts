import type { Metadata } from 'next';
import {
  DEFAULT_LOCALE,
  LANGUAGES,
  LocaleCode,
  normalizeLocale,
  withLocalePath,
} from '@/data/brand';
import { getDictionary } from '@/data/i18n';

export function buildLanguageAlternates(path: string) {
  const normalizedPath = path === '/' ? '/' : path.replace(/\/+$/, '');

  return Object.fromEntries(
    LANGUAGES.map((language) => [
      language.code,
      withLocalePath(language.code, normalizedPath),
    ])
  );
}

export function buildCanonicalPath(locale: string | undefined, path: string) {
  return withLocalePath(normalizeLocale(locale), path);
}

export function buildMetadataBase(origin: string) {
  return new URL(origin);
}

export function createPageMetadata(input: {
  locale?: string;
  origin: string;
  path: string;
  title: string;
  description: string;
  images?: string[];
}): Metadata {
  const locale = normalizeLocale(input.locale);
  const dictionary = getDictionary(locale);
  const canonical = buildCanonicalPath(locale, input.path);
  const alternates = buildLanguageAlternates(input.path);

  return {
    title: input.title,
    description: input.description,
    metadataBase: buildMetadataBase(input.origin),
    alternates: {
      canonical,
      languages: {
        ...alternates,
        'x-default': withLocalePath(DEFAULT_LOCALE, input.path),
      },
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url: canonical,
      siteName: dictionary.siteTitle,
      locale: dictionary.ogLocale,
      type: 'website',
      images: input.images,
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: input.images,
    },
  };
}

export function createHomeMetadata(locale: string | undefined, origin: string) {
  const dictionary = getDictionary(locale);
  return createPageMetadata({
    locale,
    origin,
    path: '/',
    title: dictionary.siteTitle,
    description: dictionary.siteDescription,
  });
}

export function createCPMetadata(locale: string | undefined, origin: string) {
  const dictionary = getDictionary(locale);
  return createPageMetadata({
    locale,
    origin,
    path: '/cp',
    title: `${dictionary.cp.title} | ${dictionary.siteTitle}`,
    description: dictionary.cp.descEmpty,
  });
}

export function getTypePagePath(locale: LocaleCode, slug: string) {
  return withLocalePath(locale, `/types/${slug}`);
}
