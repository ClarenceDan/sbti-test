'use client';

import BrandLogo from '@/components/BrandLogo';
import { LocaleCode } from '@/data/brand';
import { getDictionary } from '@/data/i18n';
import { TYPE_IMAGES } from '@/data/types';
import { dimensionMeta, dimensionOrder } from '@/data/dimensions';
import { ComputeResult } from '@/types';

interface ShareCardProps {
  cardId: string;
  result: ComputeResult;
  siteHost: string;
  qrCodeDataUrl?: string;
  variant: 'moments' | 'xiaohongshu';
  locale: LocaleCode;
}

export default function ShareCard({
  cardId,
  result,
  siteHost,
  qrCodeDataUrl,
  variant,
  locale,
}: ShareCardProps) {
  const dictionary = getDictionary(locale);
  const type = result.finalType;
  const imageSrc = TYPE_IMAGES[type.code];
  const topDims = dimensionOrder
    .map((dim) => ({ dim, score: result.rawScores[dim], level: result.levels[dim] }))
    .sort((left, right) => right.score - left.score)
    .slice(0, 4);

  const isMoments = variant === 'moments';
  const summary =
    result.finalType.code === 'DRUNK'
      ? locale === 'zh' || locale === 'tw' || locale === 'hk'
        ? '隐藏人格已激活'
        : 'Hidden type unlocked'
      : result.special
        ? locale === 'zh' || locale === 'tw' || locale === 'hk'
          ? '系统强制兜底'
          : 'Fallback mode triggered'
        : locale === 'zh' || locale === 'tw' || locale === 'hk'
          ? `匹配度 ${result.bestNormal.similarity}%`
          : `${result.bestNormal.similarity}% match`;

  return (
    <div
      id={cardId}
      style={{
        position: 'fixed',
        left: '-200vw',
        top: 0,
        width: 1080,
        padding: 0,
        zIndex: -1,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
      }}
    >
      <div
        style={{
          minHeight: 1350,
          padding: '58px 56px 48px',
          background:
            'radial-gradient(circle at top left, rgba(171,207,187,.72), rgba(171,207,187,0) 26%), linear-gradient(180deg, #f9fcf9 0%, #eef5ef 52%, #e7efe8 100%)',
          color: '#173528',
          display: 'grid',
          gap: 28,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 18,
          }}
        >
          <BrandLogo href={null} compact locale={locale} />
          <div
            style={{
              padding: '11px 18px',
              borderRadius: 999,
              border: '1px solid rgba(23, 59, 45, 0.1)',
              background: 'rgba(255,255,255,.7)',
              color: '#2c4b3b',
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            {siteHost}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMoments ? '0.96fr 1.04fr' : '1fr 1fr',
            gap: 28,
            alignItems: 'stretch',
          }}
        >
          <div
            style={{
              display: 'grid',
              gap: 20,
            }}
          >
            <div
              style={{
                borderRadius: 38,
                padding: 22,
                background: 'rgba(255,255,255,.84)',
                border: '1px solid rgba(23, 59, 45, 0.1)',
                boxShadow: '0 26px 70px rgba(28, 56, 41, 0.1)',
              }}
            >
              <div
                style={{
                  minHeight: 660,
                  borderRadius: 28,
                  overflow: 'hidden',
                  background:
                    'radial-gradient(circle at top right, rgba(186,212,193,.52), rgba(186,212,193,0) 34%), linear-gradient(180deg, #f2f7f3 0%, #e7efea 100%)',
                  display: 'grid',
                  placeItems: 'center',
                  padding: 28,
                }}
              >
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={type.code}
                    style={{
                      width: '100%',
                      height: '100%',
                      maxWidth: 440,
                      maxHeight: 560,
                      objectFit: 'contain',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      fontSize: 148,
                      fontWeight: 900,
                      letterSpacing: '-0.08em',
                      color: '#204435',
                    }}
                  >
                    {type.code}
                  </div>
                )}
              </div>
            </div>

            <div
              style={{
                borderRadius: 32,
                padding: '24px 28px',
                background: '#173b2d',
                color: '#eef7f0',
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 800, color: '#bad4c1' }}>
                {dictionary.result.simpleReading}
              </div>
              <div style={{ marginTop: 12, fontSize: 30, lineHeight: 1.38, fontWeight: 800 }}>
                {type.intro}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 22 }}>
            <div
              style={{
                borderRadius: 38,
                padding: '34px 34px 30px',
                background: 'rgba(255,255,255,.84)',
                border: '1px solid rgba(23, 59, 45, 0.1)',
                boxShadow: '0 26px 70px rgba(28, 56, 41, 0.1)',
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 800, color: '#4c6a5b' }}>
                {dictionary.typePage.eyebrow}
              </div>
              <div
                style={{
                  marginTop: 14,
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: 16,
                  flexWrap: 'wrap',
                }}
              >
                <strong
                  style={{
                    fontSize: 104,
                    lineHeight: 0.9,
                    letterSpacing: '-0.08em',
                    color: '#173b2d',
                  }}
                >
                  {type.code}
                </strong>
                <span style={{ fontSize: 34, fontWeight: 800, color: '#355545' }}>{type.cn}</span>
              </div>
              <div
                style={{
                  marginTop: 18,
                  display: 'inline-flex',
                  padding: '12px 18px',
                  borderRadius: 999,
                  background: '#edf4ee',
                  border: '1px solid rgba(23, 59, 45, 0.08)',
                  fontSize: 21,
                  fontWeight: 800,
                  color: '#264535',
                }}
              >
                {summary}
              </div>
              <p
                style={{
                  marginTop: 18,
                  fontSize: 23,
                  lineHeight: 1.75,
                  color: '#395649',
                }}
              >
                {siteHost}
              </p>
            </div>

            <div
              style={{
                borderRadius: 32,
                padding: '26px 28px',
                background: 'rgba(255,255,255,.84)',
                border: '1px solid rgba(23, 59, 45, 0.1)',
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 18 }}>{dictionary.result.scoreTitle}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {topDims.map(({ dim, level, score }) => (
                  <span
                    key={dim}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '11px 16px',
                      borderRadius: 999,
                      background: '#edf4ee',
                      border: '1px solid rgba(23, 59, 45, 0.08)',
                      fontSize: 19,
                      color: '#264535',
                      fontWeight: 800,
                    }}
                  >
                    <strong style={{ fontWeight: 900 }}>{dimensionMeta[dim].name}</strong>
                    <em style={{ fontStyle: 'normal', color: '#5c7869' }}>
                      {level} / {score}
                    </em>
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                borderRadius: 32,
                padding: '26px 28px',
                background: 'rgba(255,255,255,.84)',
                border: '1px solid rgba(23, 59, 45, 0.1)',
                display: 'grid',
                gridTemplateColumns: isMoments && qrCodeDataUrl ? '220px 1fr' : '1fr',
                gap: 20,
                alignItems: 'center',
              }}
            >
              {isMoments && qrCodeDataUrl ? (
                <div
                  style={{
                    borderRadius: 28,
                    padding: 16,
                    background: '#f8fbf8',
                    border: '1px solid rgba(23, 59, 45, 0.08)',
                  }}
                >
                  <img
                    src={qrCodeDataUrl}
                    alt="QR code"
                    style={{
                      width: '100%',
                      display: 'block',
                      borderRadius: 22,
                    }}
                  />
                </div>
              ) : null}

              <div style={{ display: 'grid', gap: 10 }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#183c2d' }}>
                  {isMoments ? dictionary.result.copyShareLink : dictionary.result.saveXiaohongshu}
                </div>
                <div style={{ fontSize: 21, lineHeight: 1.8, color: '#4f6c5e' }}>
                  {isMoments
                    ? dictionary.result.dnaHint
                    : dictionary.result.noteNormal}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 20,
            borderTop: '1px solid rgba(23, 59, 45, 0.08)',
            paddingTop: 20,
            color: '#5c7668',
            fontSize: 18,
          }}
        >
          <span>{dictionary.intro.entertainmentOnly}</span>
          <span>{type.code} / {type.cn}</span>
        </div>
      </div>
    </div>
  );
}
