import { MetadataRoute } from 'next';
import { getRequestSite } from '@/lib/site';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { origin } = await getRequestSite();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
  };
}
