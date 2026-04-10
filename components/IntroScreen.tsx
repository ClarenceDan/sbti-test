'use client';

import Image from 'next/image';
import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';
import {
  AUTHOR_NAME,
  AUTHOR_URL,
  LANGUAGES,
  LocaleCode,
  POPULAR_TYPES,
  RARE_TYPES,
  getTypeSlug,
  withLocalePath,
} from '@/data/brand';
import { getDictionary } from '@/data/i18n';
import { TYPE_LIBRARY, TYPE_IMAGES, NORMAL_TYPES } from '@/data/types';
import { useRuntimeSite } from '@/lib/use-runtime-site';
import { SavedResultEntry, SiteStats } from '@/types';

interface IntroScreenProps {
  onStart: () => void;
  onOpenHistory: (entry: SavedResultEntry) => void;
  history: SavedResultEntry[];
  stats?: SiteStats | null;
  locale: LocaleCode;
}

function formatHistoryTime(timestamp: number, locale: string) {
  try {
    return new Intl.DateTimeFormat(locale, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(timestamp));
  } catch {
    return new Date(timestamp).toLocaleString();
  }
}

export default function IntroScreen({
  onStart,
  onOpenHistory,
  history,
  stats,
  locale,
}: IntroScreenProps) {
  const dictionary = getDictionary(locale);
  const { host } = useRuntimeSite();
  const totalCompletions = stats?.totalCompletions ?? 16790;
  const popularTypes = stats?.popularTypes ?? POPULAR_TYPES.map((item, index) => ({
    rank: index + 1,
    code: item.code,
    percent: item.percent,
    count: 0,
  }));
  const rareTypes = stats?.rareTypes ?? RARE_TYPES.map((item) => ({
    code: item.code,
    percent: item.percent,
    count: 0,
  }));

  return (
    <section className="screen active">
      <div className="site-header">
        <nav className="lang-switch" aria-label="Language">
          {LANGUAGES.map((language) => (
            <Link
              key={language.code}
              href={withLocalePath(language.code, '/')}
              className={`lang-link${language.code === locale ? ' active' : ''}`}
            >
              {language.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="intro-grid">
        <section className="hero-stage card">
          <div className="hero-brand-line">
            <BrandLogo compact locale={locale} />
            <span className="hero-chip">{dictionary.intro.heroChip}</span>
          </div>

          <div className="hero-copy">
            <p className="hero-kicker">🧪 {dictionary.intro.heroKicker}</p>
            <h1 className="hero-title">
              <span>{dictionary.intro.heroTitleMain}</span>
              <em>{dictionary.intro.heroTitleAccent}</em>
            </h1>
            <p className="hero-lead">{dictionary.intro.heroLead}</p>
            <p className="hero-subcopy">{dictionary.intro.heroSubcopy}</p>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <strong>{totalCompletions.toLocaleString('en-US')}</strong>
              <span>{dictionary.intro.statCompleted}</span>
            </div>
            <div className="hero-stat">
              <strong>{dictionary.intro.statDurationValue}</strong>
              <span>{dictionary.intro.statDurationLabel}</span>
            </div>
            <div className="hero-stat">
              <strong>{dictionary.intro.statLocalValue}</strong>
              <span>{dictionary.intro.statLocalLabel}</span>
            </div>
          </div>

          <div className="hero-actions">
            <button className="btn-primary" onClick={onStart}>
              {dictionary.intro.startTest}
            </button>
            <a href="#type-gallery" className="btn-secondary">
              {dictionary.intro.browseTypes}
            </a>
          </div>
        </section>

        <aside className="ranking-panel card">
          <div className="ranking-head">
            <div>
              <p>👑 {dictionary.intro.rankingTitle}</p>
              <strong>
                {totalCompletions.toLocaleString('en-US')} {dictionary.intro.rankingMeasuredSuffix}
              </strong>
            </div>
            <span>{dictionary.intro.rankingRealtime}</span>
          </div>

          <div className="ranking-list">
            {popularTypes.map((item) => {
              const info = TYPE_LIBRARY[item.code];
              const imageSrc = TYPE_IMAGES[item.code];
              return (
                <div className="ranking-item" key={item.code}>
                  <div className="ranking-rank">{item.rank <= 3 ? ['🥇', '🥈', '🥉'][item.rank - 1] : item.rank}</div>
                  {imageSrc && (
                    <Image
                      src={imageSrc}
                      alt={item.code}
                      width={64}
                      height={64}
                      className="ranking-avatar"
                    />
                  )}
                  <div className="ranking-copy">
                    <div className="ranking-title">
                      <strong>{item.code}</strong>
                      <span>{info.cn}</span>
                      <em>{item.percent}</em>
                    </div>
                    <p>{info.intro}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rare-card">
            <p>🎲 {dictionary.intro.rareTitle}</p>
            <div className="rare-grid">
              {rareTypes.map((item) => {
                const info = TYPE_LIBRARY[item.code];
                return (
                  <div key={item.code} className="rare-item">
                    <strong>{item.code}</strong>
                    <span>{info.cn}</span>
                    <em>{item.percent}</em>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      <section className="section-card card intro-blurb">
        <p>{dictionary.intro.blurb}</p>
      </section>

      {history.length > 0 && (
        <section className="section-card card history-section">
          <div className="section-heading">
            <h2>{dictionary.intro.historyTitle}</h2>
            <p>{dictionary.intro.historyDesc}</p>
          </div>

          <div className="history-grid">
            {history.map((entry, index) => {
              const info = TYPE_LIBRARY[entry.typeCode] ?? entry.result.finalType;
              const imageSrc = TYPE_IMAGES[entry.typeCode];
              const timestamp = formatHistoryTime(entry.createdAt, dictionary.htmlLang);

              return (
                <button
                  key={entry.id}
                  type="button"
                  className="history-card"
                  onClick={() => onOpenHistory(entry)}
                >
                  <div className="history-card-head">
                    <span className="history-pill">
                      {index === 0 ? dictionary.intro.historyLatest : timestamp}
                    </span>
                    <span className="history-open">{dictionary.intro.historyOpen}</span>
                  </div>

                  <div className="history-card-body">
                    {imageSrc && (
                      <Image
                        src={imageSrc}
                        alt={entry.typeCode}
                        width={88}
                        height={88}
                        className="history-avatar"
                      />
                    )}
                    <div className="history-copy">
                      <div className="history-title">
                        <strong>{entry.typeCode}</strong>
                        <span>{info.cn}</span>
                      </div>
                      <p>{info.intro}</p>
                    </div>
                  </div>

                  <div className="history-card-foot">
                    <span>{dictionary.intro.historyDna}: {entry.dna}</span>
                    <span>{timestamp}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      <section className="section-card card">
        <div className="section-heading">
          <h2>{dictionary.intro.whatIsTitle}</h2>
          <p>{dictionary.intro.whatIsDesc}</p>
        </div>

        <div className="model-grid">
          {dictionary.intro.modelSections.map((item) => (
            <article key={item.title} className="model-card">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-card card" id="type-gallery">
        <div className="section-heading">
          <h2>{dictionary.intro.typeGalleryTitle}</h2>
          <p>{dictionary.intro.typeGalleryDesc}</p>
        </div>

        <div className="type-gallery-grid">
          {NORMAL_TYPES.map((type) => {
            const info = TYPE_LIBRARY[type.code];
            return (
              <Link
                href={withLocalePath(locale, `/types/${getTypeSlug(type.code)}`)}
                key={type.code}
                className="type-gallery-card"
              >
                <strong>{type.code}</strong>
                <span>{info.cn}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section-card card">
        <div className="section-heading">
          <h2>{dictionary.intro.compareTitle}</h2>
          <p>{dictionary.intro.compareDesc}</p>
        </div>

        <div className="compare-table">
          <div className="compare-row compare-header">
            <div>{dictionary.intro.compareHeaders.aspect}</div>
            <div>{dictionary.intro.compareHeaders.mbti}</div>
            <div>{dictionary.intro.compareHeaders.sbti}</div>
          </div>
          {dictionary.intro.compareRows.map((row) => (
            <div key={row.aspect} className="compare-row">
              <div className="compare-aspect">{row.aspect}</div>
              <div className="compare-mbti">{row.mbti}</div>
              <div className="compare-sbti">{row.sbti}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-card card">
        <div className="section-heading">
          <h2>{dictionary.intro.faqTitle}</h2>
          <p>{dictionary.intro.faqDesc}</p>
        </div>

        <div className="faq-list">
          {dictionary.intro.faqItems.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="site-footer card">
        <div>
          <span>{dictionary.intro.inspiration}</span>
          <a href={AUTHOR_URL} target="_blank" rel="noopener noreferrer">
            {AUTHOR_NAME}
          </a>
        </div>
        <span>{dictionary.intro.entertainmentOnly}</span>
        <strong>{dictionary.intro.poweredBy} {host}</strong>
      </footer>
    </section>
  );
}
