import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sbti.unun.dev';

export const metadata: Metadata = {
  title: 'SBTI 人格测试 - 比MBTI更懂你的灵魂测试',
  description:
    'SBTI人格测试是一款比MBTI更懂你的搞笑人格测试。30道趣味测试题，15个心理维度，27种独特人格类型，看看你是拿捏者、送钱者还是屌丝？纯属娱乐，切勿当真。',
  keywords: [
    'SBTI', '人格测试', 'MBTI', '搞笑测试', '性格测试',
    '心理测试', '人格类型', '趣味测试', '在线测试',
  ],
  authors: [{ name: '蛆肉儿串儿', url: 'https://space.bilibili.com/417038183' }],
  creator: '蛆肉儿串儿',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SBTI 人格测试 - 比MBTI更懂你的灵魂测试',
    description:
      '30道趣味测试题，15个心理维度，27种独特人格类型。快来测测你的SBTI人格！',
    url: siteUrl,
    siteName: 'SBTI 人格测试',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SBTI 人格测试 - 比MBTI更懂你的灵魂测试',
    description:
      '30道趣味测试题，15个心理维度，27种独特人格类型。快来测测你的SBTI人格！',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'SBTI 人格测试',
    description: '比MBTI更懂你的搞笑人格测试，30道趣味测试题，27种独特人格类型',
    url: siteUrl,
    applicationCategory: 'Entertainment',
    operatingSystem: 'Web Browser',
    inLanguage: 'zh-CN',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CNY',
    },
  };

  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
