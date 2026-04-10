import './globals.css';
import type { Metadata } from 'next';
import { getDictionary } from '@/data/i18n';
import { buildMetadataBase } from '@/lib/seo';
import { getRequestSite } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  const { origin, host } = await getRequestSite();
  const dictionary = getDictionary('zh');

  return {
    title: {
      default: `${dictionary.siteTitle} | ${dictionary.brandSubtitle}`,
      template: `%s | ${dictionary.siteTitle}`,
    },
    description: dictionary.siteDescription,
    keywords: [
      'SBTI',
      '人格测试',
      'MBTI',
      'personality test',
      'personality types',
      host,
    ],
    authors: [{ name: host, url: origin }],
    creator: host,
    metadataBase: buildMetadataBase(origin),
    openGraph: {
      siteName: dictionary.siteTitle,
      locale: dictionary.ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    },
    icons: {
      icon: '/favicon.svg',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { origin, host } = await getRequestSite();
  const dictionary = getDictionary('zh');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: dictionary.siteTitle,
    description: dictionary.siteDescription,
    url: origin,
    applicationCategory: 'Entertainment',
    operatingSystem: 'Web Browser',
    inLanguage: 'zh-CN',
    publisher: {
      '@type': 'Organization',
      name: host,
      url: origin,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CNY',
    },
  };

  return (
    <html lang={dictionary.htmlLang}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
