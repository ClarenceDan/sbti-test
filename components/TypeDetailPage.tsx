import Image from 'next/image';
import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';
import { LocaleCode, getTypeCodeBySlug, withLocalePath } from '@/data/brand';
import { getDictionary } from '@/data/i18n';
import { TYPE_IMAGES, TYPE_LIBRARY } from '@/data/types';

interface TypeDetailPageProps {
  locale: LocaleCode;
  slug: string;
}

export function resolveTypeBySlug(slug: string) {
  const code = getTypeCodeBySlug(slug);
  if (!code) return null;
  const type = TYPE_LIBRARY[code];
  if (!type) return null;

  return {
    ...type,
    imageSrc: TYPE_IMAGES[code],
  };
}

export default function TypeDetailPage({ locale, slug }: TypeDetailPageProps) {
  const dictionary = getDictionary(locale);
  const type = resolveTypeBySlug(slug);

  if (!type) {
    return null;
  }

  return (
    <main className="type-detail-page">
      <div className="shell type-detail-shell">
        <div className="type-detail-topbar">
          <BrandLogo locale={locale} />
          <Link href={withLocalePath(locale, '/')} className="type-detail-back">
            {dictionary.typePage.backToTest}
          </Link>
        </div>

        <section className="type-detail-card card">
          <div className="type-detail-media">
            {type.imageSrc ? (
              <Image
                src={type.imageSrc}
                alt={`${type.code} ${type.cn}`}
                width={520}
                height={660}
                className="type-detail-image"
              />
            ) : (
              <div className="type-detail-image fallback">{type.code}</div>
            )}
          </div>

          <div className="type-detail-copy">
            <div className="type-detail-eyebrow">{dictionary.typePage.eyebrow}</div>
            <h1>
              {type.code} <span>{type.cn}</span>
            </h1>
            <p className="type-detail-intro">{type.intro}</p>
            <p className="type-detail-description">{type.desc}</p>

            <div className="type-detail-actions">
              <Link href={withLocalePath(locale, '/')} className="btn-primary">
                {dictionary.typePage.startTest}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
