'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import BrandLogo from '@/components/BrandLogo';
import { LocaleCode, POPULAR_TYPES, RARE_TYPES, withLocalePath } from '@/data/brand';
import { getDictionary } from '@/data/i18n';
import { useRuntimeSite } from '@/lib/use-runtime-site';
import { ComputeResult, SiteStats } from '@/types';
import { TYPE_IMAGES } from '@/data/types';
import { dimensionMeta, DIM_EXPLANATIONS, dimensionOrder } from '@/data/dimensions';
import { encodeDna } from '@/data/dna';
import { createStyledQrDataUrl } from '@/lib/styled-qr';
import ShareCard from './ShareCard';

interface ResultScreenProps {
  result: ComputeResult;
  isShared?: boolean;
  onRestart: () => void;
  onHome: () => void;
  stats?: SiteStats | null;
  locale: LocaleCode;
}

function buildShareLink(result: ComputeResult, siteUrl: string): string {
  const dims = dimensionOrder.map((dim) => result.levels[dim]).join('');
  const params = new URLSearchParams({
    t: result.finalType.code,
    d: dims,
  });
  return `${siteUrl}?${params.toString()}`;
}

function fallbackCopyText(text: string) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', 'true');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, text.length);
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

export default function ResultScreen({
  result,
  isShared,
  onRestart,
  onHome,
  stats,
  locale,
}: ResultScreenProps) {
  const dictionary = getDictionary(locale);
  const type = result.finalType;
  const imageSrc = TYPE_IMAGES[type.code];
  const [shareStatus, setShareStatus] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const { host, origin } = useRuntimeSite();

  const sharePageUrl = useMemo(() => {
    if (typeof window === 'undefined') {
      return `${origin}${withLocalePath(locale, '/')}`;
    }
    return `${origin}${window.location.pathname}`;
  }, [locale, origin]);

  const shareLink = useMemo(() => buildShareLink(result, sharePageUrl), [result, sharePageUrl]);
  const dna = useMemo(() => encodeDna({
    rawScores: result.rawScores,
    drunkTriggered: result.finalType.code === 'DRUNK',
  }), [result]);
  const cpInviteLink = useMemo(
    () => `${origin}${withLocalePath(locale, '/cp')}?a=${dna}`,
    [dna, locale, origin]
  );

  const resultSummary = useMemo(() => {
    if (result.finalType.code === 'DRUNK') {
      return {
        kicker: locale === 'zh' || locale === 'tw' || locale === 'hk' ? '隐藏人格已激活' : 'Hidden type unlocked',
        badge: locale === 'zh' || locale === 'tw' || locale === 'hk'
          ? '匹配度 100% · 酒精异常因子已接管'
          : '100% match · alcohol override active',
        sub: locale === 'zh' || locale === 'tw' || locale === 'hk'
          ? '乙醇亲和性过强，系统已直接跳过常规人格审判。'
          : 'Your ethanol affinity was too strong, so the system skipped the normal route.',
      };
    }

    if (result.special) {
      return {
        kicker: locale === 'zh' || locale === 'tw' || locale === 'hk' ? '系统强制兜底' : 'Fallback mode triggered',
        badge: locale === 'zh' || locale === 'tw' || locale === 'hk'
          ? `标准人格库最高匹配仅 ${result.bestNormal.similarity}%`
          : `Top standard match only reached ${result.bestNormal.similarity}%`,
        sub: locale === 'zh' || locale === 'tw' || locale === 'hk'
          ? '标准人格库对你的脑回路集体罢工了，于是系统把你强制分配给了 HHHH。'
          : 'The standard library gave up on your brain pattern, so you were assigned to HHHH.',
      };
    }

    return {
      kicker: locale === 'zh' || locale === 'tw' || locale === 'hk' ? '你的主类型' : 'Your main type',
      badge: locale === 'zh' || locale === 'tw' || locale === 'hk'
        ? `匹配度 ${result.bestNormal.similarity}% · 精准命中 ${result.bestNormal.exact}/15 维`
        : `${result.bestNormal.similarity}% match · exact on ${result.bestNormal.exact}/15 dimensions`,
      sub: locale === 'zh' || locale === 'tw' || locale === 'hk'
        ? '维度命中度较高，当前结果可视为你的第一人格画像。'
        : 'Your dimension pattern landed close enough to treat this as your main profile.',
    };
  }, [locale, result.bestNormal.exact, result.bestNormal.similarity, result.finalType.code, result.special]);

  const rarityText = useMemo(() => {
    const liveMatch = [...(stats?.popularTypes ?? []), ...(stats?.rareTypes ?? [])]
      .find((item) => item.code === result.finalType.code);

    if (liveMatch?.percent) {
      return liveMatch.percent;
    }

    const fallbackMatch = [...POPULAR_TYPES, ...RARE_TYPES]
      .find((item) => item.code === result.finalType.code);

    return fallbackMatch?.percent ?? dictionary.result.rarityPending;
  }, [dictionary.result.rarityPending, result.finalType.code, stats?.popularTypes, stats?.rareTypes]);

  const matchDetail = useMemo(() => {
    if (result.finalType.code === 'DRUNK') {
      return locale === 'zh' || locale === 'tw' || locale === 'hk'
        ? '酒精因子已越权接管，常规命中度不再展示。'
        : 'Alcohol override was triggered, so the normal match detail is hidden.';
    }

    if (result.special) {
      return locale === 'zh' || locale === 'tw' || locale === 'hk'
        ? `标准人格命中最高仅 ${result.bestNormal.similarity}%`
        : `Best standard-library match only reached ${result.bestNormal.similarity}%`;
    }

    return locale === 'zh' || locale === 'tw' || locale === 'hk'
      ? `精准命中 ${result.bestNormal.exact}/15 维`
      : `Exact on ${result.bestNormal.exact}/15 dimensions`;
  }, [locale, result.bestNormal.exact, result.bestNormal.similarity, result.finalType.code, result.special]);

  useEffect(() => {
    let active = true;

    import('qrcode')
      .then((mod) => createStyledQrDataUrl((mod.default ?? mod), shareLink))
      .then((dataUrl) => {
        if (active) {
          setQrCodeDataUrl(dataUrl);
        }
      })
      .catch(() => {
        if (active) {
          setQrCodeDataUrl('');
        }
      });

    return () => {
      active = false;
    };
  }, [shareLink]);

  const scrollToShare = useCallback(() => {
    document.getElementById('result-share-actions')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, []);

  const handleSaveCard = useCallback(async (variant: 'moments' | 'xiaohongshu') => {
    if (variant === 'moments' && !qrCodeDataUrl) {
      setShareStatus(dictionary.result.qrPending);
      return;
    }

    setShareStatus('');
    try {
      const html2canvas = (await import('html2canvas')).default;
      const el = document.getElementById(`share-card-${variant}`);
      if (!el) return;

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      const link = document.createElement('a');
      link.download = `SBTI-${type.code}-${variant}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setShareStatus(
        variant === 'moments'
          ? dictionary.result.momentsSaved
          : dictionary.result.xiaohongshuSaved
      );
      fetch('/api/analytics/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel: variant, typeCode: type.code }),
      }).catch(() => undefined);
    } catch {
      setShareStatus(dictionary.result.saveFailed);
    }
  }, [dictionary.result.momentsSaved, dictionary.result.qrPending, dictionary.result.saveFailed, dictionary.result.xiaohongshuSaved, qrCodeDataUrl, type.code]);

  const handleCopyLink = useCallback(async () => {
    setShareStatus('');
    try {
      await navigator.clipboard.writeText(shareLink);
      setShareStatus(dictionary.result.shareCopied);
      fetch('/api/analytics/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel: 'result_link', typeCode: type.code }),
      }).catch(() => undefined);
    } catch {
      try {
        fallbackCopyText(shareLink);
        setShareStatus(dictionary.result.shareCopied);
        fetch('/api/analytics/share', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ channel: 'result_link', typeCode: type.code }),
        }).catch(() => undefined);
      } catch {
        setShareStatus(dictionary.result.copyFailed);
      }
    }
  }, [dictionary.result.copyFailed, dictionary.result.shareCopied, shareLink, type.code]);

  const handleCopyDna = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(dna);
      setShareStatus(dictionary.result.dnaCopied);
    } catch {
      fallbackCopyText(dna);
      setShareStatus(dictionary.result.dnaCopied);
    }
    fetch('/api/analytics/share', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ channel: 'dna', typeCode: type.code }),
    }).catch(() => undefined);
  }, [dictionary.result.dnaCopied, dna, type.code]);

  const handleCopyCpInvite = useCallback(async () => {
    const inviteText = `我测了SBTI人格测试，来看看我们的CP化学反应如何👇\n${cpInviteLink}`;
    try {
      await navigator.clipboard.writeText(inviteText);
      setShareStatus(dictionary.result.cpInviteCopied);
    } catch {
      fallbackCopyText(inviteText);
      setShareStatus(dictionary.result.cpInviteCopied);
    }
    fetch('/api/analytics/share', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ channel: 'cp_invite', typeCode: type.code }),
    }).catch(() => undefined);
  }, [cpInviteLink, dictionary.result.cpInviteCopied, type.code]);

  return (
    <section className="screen active">
      <ShareCard
        cardId="share-card-moments"
        result={result}
        qrCodeDataUrl={qrCodeDataUrl}
        variant="moments"
        rarityText={rarityText}
        dna={dna}
        matchDetail={matchDetail}
        locale={locale}
      />
      <ShareCard
        cardId="share-card-xiaohongshu"
        result={result}
        qrCodeDataUrl={qrCodeDataUrl}
        variant="xiaohongshu"
        rarityText={rarityText}
        dna={dna}
        matchDetail={matchDetail}
        locale={locale}
      />

      <div className="result-wrap card">
        <div className="result-topbar topbar">
          <BrandLogo href={null} compact locale={locale} />
          <div className="result-topbar-actions">
            <button className="btn-secondary btn-sm" onClick={scrollToShare}>
              {dictionary.result.shareShortcut}
            </button>
            <button className="btn-secondary btn-sm" onClick={onHome}>
              {dictionary.result.home}
            </button>
          </div>
        </div>

        {isShared && (
          <div className="shared-banner">
            <span>{dictionary.result.sharedBanner}</span>
            <button className="btn-primary btn-sm" onClick={onRestart}>{dictionary.result.sharedAction}</button>
          </div>
        )}

        <div className="result-layout">
          <div className="result-top">
            <div className={`poster-box${!imageSrc ? ' no-image' : ''}`}>
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={`${type.code}（${type.cn}）`}
                  className="poster-image"
                />
              )}
              <div className="poster-caption">{type.intro}</div>
            </div>

            <div className="type-box">
              <div className="type-kicker">{resultSummary.kicker}</div>
              <div className="type-name">{type.code}（{type.cn}）</div>
              <div className="match">{resultSummary.badge}</div>
              <div className="type-subname">{resultSummary.sub}</div>
              <button
                type="button"
                className="result-share-pill"
                onClick={scrollToShare}
              >
                {dictionary.result.shareShortcut}
              </button>
            </div>
          </div>

          <div className="analysis-box">
            <h3>{dictionary.result.simpleReading}</h3>
            <p>{type.desc}</p>
          </div>

          <div className="dim-box">
            <h3>{dictionary.result.scoreTitle}</h3>
            <div className="dim-list">
              {dimensionOrder.map((dim) => {
                const level = result.levels[dim];
                const rawScore = result.rawScores[dim];
                if (!level) return null;
                const explanation = DIM_EXPLANATIONS[dim]?.[level];
                return (
                  <div key={dim} className="dim-item">
                    <div className="dim-item-top">
                      <div className="dim-item-name">{dimensionMeta[dim].name}</div>
                      <div className="dim-item-score">
                        <span className={`level-badge level-${level.toLowerCase()}`}>{level}</span>
                        {rawScore !== undefined ? ` / ${rawScore}${dictionary.result.scoreUnit}` : ''}
                      </div>
                    </div>
                    {explanation && <p>{explanation}</p>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="note-box">
            <h3>{dictionary.result.noteTitle}</h3>
            <p>
              {result.special ? dictionary.result.noteSpecial : dictionary.result.noteNormal}
            </p>
          </div>

          <div className="dna-box">
            <h3>{dictionary.result.dnaTitle}</h3>
            <p className="dna-code">🧬 {dna}</p>
            <p className="dna-copy">{dictionary.result.dnaHint}</p>
          </div>

          <details className="author-box">
            <summary>{dictionary.result.authorTitle}</summary>
            <div className="author-content">
              {dictionary.result.authorLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </details>
        </div>

        <div className="result-actions" id="result-share-actions">
          <div className="result-actions-head">
            <h3>{dictionary.result.shareSectionTitle}</h3>
            <p>{dictionary.result.shareSectionDesc}</p>
          </div>
          {shareStatus && (
            <div className="result-status">
              {shareStatus}
            </div>
          )}
          <div className="result-action-group">
            <button
              className="btn-primary"
              disabled={!qrCodeDataUrl}
              onClick={() => handleSaveCard('moments')}
            >
              {dictionary.result.saveMoments}
            </button>
            <button
              className="btn-secondary btn-xiaohongshu"
              onClick={() => handleSaveCard('xiaohongshu')}
            >
              {dictionary.result.saveXiaohongshu}
            </button>
            <button className="btn-secondary" onClick={handleCopyLink}>
              {dictionary.result.copyShareLink}
            </button>
            <button className="btn-secondary" onClick={handleCopyDna}>
              {dictionary.result.copyDna}
            </button>
            <button className="btn-secondary" onClick={handleCopyCpInvite}>
              {dictionary.result.copyCpInvite}
            </button>
            <a className="btn-secondary" href={cpInviteLink}>
              {dictionary.result.goCp}
            </a>
            <button className="btn-secondary" onClick={onRestart}>{dictionary.result.restart}</button>
            <button className="btn-secondary" onClick={onHome}>{dictionary.result.home}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
