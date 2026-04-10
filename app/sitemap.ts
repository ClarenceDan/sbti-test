import { MetadataRoute } from 'next';
import { LANGUAGES, withLocalePath, getTypeSlug } from '@/data/brand';
import { TYPE_LIBRARY } from '@/data/types';
import { getRequestSite } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { origin } = await getRequestSite();
  const now = new Date();
  const typeSlugs = Object.keys(TYPE_LIBRARY).map((code) => getTypeSlug(code));
  const staticRoutes = LANGUAGES.flatMap((language) => [
    {
      path: withLocalePath(language.code, '/'),
      changeFrequency: 'weekly' as const,
      priority: language.code === 'zh' ? 1 : 0.92,
    },
    {
      path: withLocalePath(language.code, '/cp'),
      changeFrequency: 'weekly' as const,
      priority: language.code === 'zh' ? 0.84 : 0.78,
    },
  ]);
  const typeRoutes = LANGUAGES.flatMap((language) =>
    typeSlugs.map((slug) => ({
      path: withLocalePath(language.code, `/types/${slug}`),
      changeFrequency: 'monthly' as const,
      priority: language.code === 'zh' ? 0.72 : 0.64,
    }))
  );

  return [...staticRoutes, ...typeRoutes].map((entry) => ({
    url: `${origin}${entry.path === '/' ? '' : entry.path}`,
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
