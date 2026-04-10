export const PRIMARY_SITE_HOST = 'sbti-test.run';
export const SECONDARY_SITE_HOSTS = ['sbti-test.xyz'] as const;
export const SITE_HOSTS = [PRIMARY_SITE_HOST, ...SECONDARY_SITE_HOSTS] as const;
export const SITE_HOST = PRIMARY_SITE_HOST;
export const SITE_NAME = 'SBTI Test';
export const AUTHOR_NAME = 'B站@蛆肉儿串儿';
export const AUTHOR_URL = 'https://space.bilibili.com/417038183';

export const LANGUAGES = [
  { code: 'zh', label: '中文', href: '/' },
  { code: 'en', label: 'EN', href: '/en' },
  { code: 'ja', label: '日本語', href: '/ja' },
  { code: 'ko', label: '한국어', href: '/ko' },
  { code: 'th', label: 'ไทย', href: '/th' },
  { code: 'vi', label: 'Tiếng Việt', href: '/vi' },
  { code: 'id', label: 'Bahasa', href: '/id' },
  { code: 'tl', label: 'Filipino', href: '/tl' },
  { code: 'tw', label: '繁體中文', href: '/tw' },
  { code: 'hk', label: '粵語', href: '/hk' },
] as const;

export type LocaleCode = (typeof LANGUAGES)[number]['code'];

export const DEFAULT_LOCALE: LocaleCode = 'zh';

export const POPULAR_TYPES = [
  { rank: '🥇', code: 'LOVE-R', percent: '10.9%' },
  { rank: '🥈', code: 'SEXY', percent: '9.4%' },
  { rank: '🥉', code: 'MALO', percent: '6.8%' },
  { rank: '4', code: 'OJBK', percent: '4.9%' },
  { rank: '5', code: 'ATM-er', percent: '4.5%' },
] as const;

export const RARE_TYPES = [
  { code: 'HHHH', percent: '0.0%' },
  { code: 'IMFW', percent: '0.3%' },
  { code: 'POOR', percent: '0.6%' },
] as const;

const TYPE_SLUGS: Record<string, string> = {
  CTRL: 'ctrl',
  'ATM-er': 'atm-er',
  'Dior-s': 'dior-s',
  BOSS: 'boss',
  'THAN-K': 'than-k',
  'OH-NO': 'oh-no',
  GOGO: 'gogo',
  SEXY: 'sexy',
  'LOVE-R': 'love-r',
  MUM: 'mum',
  FAKE: 'fake',
  OJBK: 'ojbk',
  MALO: 'malo',
  'JOKE-R': 'joke-r',
  'WOC!': 'woc',
  'THIN-K': 'thin-k',
  SHIT: 'shit',
  ZZZZ: 'zzzz',
  POOR: 'poor',
  MONK: 'monk',
  IMSB: 'imsb',
  SOLO: 'solo',
  FUCK: 'fuck',
  DEAD: 'dead',
  IMFW: 'imfw',
  HHHH: 'hhhh',
  DRUNK: 'drunk',
};

const SLUG_TO_TYPE = Object.fromEntries(
  Object.entries(TYPE_SLUGS).map(([code, slug]) => [slug, code])
);

export function getTypeSlug(code: string): string {
  return TYPE_SLUGS[code] ?? code.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export function getTypeCodeBySlug(slug: string): string | null {
  return SLUG_TO_TYPE[slug] ?? null;
}

export function normalizeLocale(locale?: string): LocaleCode {
  if (!locale) return DEFAULT_LOCALE;
  const matched = LANGUAGES.find((item) => item.code === locale);
  return matched?.code ?? DEFAULT_LOCALE;
}

export function getLocalePrefix(locale?: string): string {
  const resolvedLocale = normalizeLocale(locale);
  return resolvedLocale === DEFAULT_LOCALE ? '' : `/${resolvedLocale}`;
}

export function withLocalePath(locale: string | undefined, path = '/'): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const prefix = getLocalePrefix(locale);
  if (normalizedPath === '/') {
    return prefix || '/';
  }
  return `${prefix}${normalizedPath}`;
}

export function detectLocaleFromPath(pathname: string): LocaleCode {
  const segments = pathname.split('/').filter(Boolean);
  return normalizeLocale(segments[0]);
}

export function stripLocaleFromPath(pathname: string): string {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const segments = normalizedPath.split('/').filter(Boolean);

  if (!segments.length) {
    return '/';
  }

  const [first, ...rest] = segments;
  if (normalizeLocale(first) === first && first !== DEFAULT_LOCALE) {
    return rest.length ? `/${rest.join('/')}` : '/';
  }

  return normalizedPath;
}
