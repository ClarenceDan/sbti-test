'use client';

import Link from 'next/link';
import { LocaleCode, withLocalePath } from '@/data/brand';
import { getDictionary } from '@/data/i18n';
import { useRuntimeSite } from '@/lib/use-runtime-site';

interface BrandLogoProps {
  className?: string;
  href?: string | null;
  compact?: boolean;
  locale?: LocaleCode;
}

export default function BrandLogo({
  className = '',
  href,
  compact = false,
  locale = 'zh',
}: BrandLogoProps) {
  const dictionary = getDictionary(locale);
  const resolvedHref = href === undefined ? withLocalePath(locale, '/') : href;
  const { host } = useRuntimeSite();
  const rootClassName = `brand-logo${compact ? ' compact' : ''}${className ? ` ${className}` : ''}`;

  const content = (
    <>
      <span className="brand-logo-mark" aria-hidden="true">
        <svg viewBox="0 0 64 64" role="presentation">
          <defs>
            <linearGradient id="brandMark" x1="10%" x2="90%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#173b2d" />
              <stop offset="100%" stopColor="#5f8f73" />
            </linearGradient>
          </defs>
          <rect x="4" y="4" width="56" height="56" rx="18" fill="url(#brandMark)" />
          <path d="M19 21c0-4.4 3.6-8 8-8h12c4.4 0 8 3.6 8 8v2H34.5c-3.6 0-6.5 2.9-6.5 6.5S30.9 36 34.5 36H45c0 8.3-6.7 15-15 15-6.2 0-11.9-3.8-14.2-9.6l7.2-2.8c1.1 2.8 3.8 4.7 7 4.7 3.9 0 7-3.1 7-7H27c-4.4 0-8-3.6-8-8v-7.3Z" fill="#eff7ef" />
          <path d="M46 19.5c0 4.1-3.4 7.5-7.5 7.5H31l4.1-6.3a5 5 0 0 1 4.2-2.2H46v1Z" fill="#b8d6c2" />
        </svg>
      </span>
      <span className="brand-logo-copy">
        <strong>{host}</strong>
        <span>{dictionary.brandSubtitle}</span>
      </span>
    </>
  );

  if (!resolvedHref) {
    return <div className={rootClassName}>{content}</div>;
  }

  return (
    <Link className={rootClassName} href={resolvedHref} aria-label={host}>
      {content}
    </Link>
  );
}
