'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import BrandLogo from '@/components/BrandLogo';
import { buildCpReport, getRewardCopy } from '@/data/cp';
import { extractDnaInput } from '@/data/dna';
import { LocaleCode, withLocalePath } from '@/data/brand';
import { getDictionary } from '@/data/i18n';
import { TYPE_IMAGES, TYPE_LIBRARY } from '@/data/types';
import { useRuntimeSite } from '@/lib/use-runtime-site';
import { CpReport } from '@/types';

interface CPAppProps {
  initialParamA?: string;
  initialParamB?: string;
  locale?: LocaleCode;
}

type ReportState = {
  report: CpReport;
  typeCodeA: string;
  typeCodeB: string;
  encodedA: string;
  encodedB: string;
};

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

function parseTypeCode(encoded: string | null) {
  if (!encoded) return null;
  try {
    return buildCpReport(encoded, encoded).typeCodeA;
  } catch {
    return null;
  }
}

export default function CPApp({
  initialParamA = '',
  initialParamB = '',
  locale = 'zh',
}: CPAppProps) {
  const dictionary = getDictionary(locale);
  const { origin } = useRuntimeSite();
  const [encodedA, setEncodedA] = useState(() => extractDnaInput(initialParamA) ?? '');
  const [encodedB, setEncodedB] = useState(() => extractDnaInput(initialParamB) ?? '');
  const [inputB, setInputB] = useState(initialParamB);
  const [reportState, setReportState] = useState<ReportState | null>(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const partnerTypeCode = useMemo(() => parseTypeCode(encodedA), [encodedA]);

  useEffect(() => {
    if (!encodedA || !encodedB) return;

    fetch('/api/cp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a: encodedA, b: encodedB }),
    })
      .then((response) => response.json())
      .then((payload) => {
        if (payload.error) {
          setError(dictionary.cp.invalidDna);
          return;
        }

        const nextState: ReportState = {
          report: payload.report,
          typeCodeA: payload.typeCodeA,
          typeCodeB: payload.typeCodeB,
          encodedA: payload.encodedA,
          encodedB: payload.encodedB,
        };

        setReportState(nextState);
        setError('');
        window.history.replaceState(
          {},
          '',
          `${withLocalePath(locale, '/cp')}?a=${payload.encodedA}&b=${payload.encodedB}`
        );

        fetch('/api/analytics/cp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            typeCodeA: payload.typeCodeA,
            typeCodeB: payload.typeCodeB,
            score: payload.report.chemistryScore,
          }),
        }).catch(() => undefined);
      })
      .catch(() => {
        setError(dictionary.cp.failed);
      });
  }, [dictionary.cp.failed, dictionary.cp.invalidDna, encodedA, encodedB, locale]);

  const handleGenerate = useCallback(() => {
    const nextEncodedB = extractDnaInput(inputB);
    if (!encodedA || !nextEncodedB) {
      setError(dictionary.cp.missingDna);
      return;
    }
    setEncodedB(nextEncodedB);
    setError('');
  }, [dictionary.cp.missingDna, encodedA, inputB]);

  const handleCopyInvite = useCallback(async () => {
    if (!encodedA) return;
    const inviteText = `${dictionary.result.copyCpInvite}\n${origin}${withLocalePath(locale, '/cp')}?a=${encodedA}`;
    try {
      await navigator.clipboard.writeText(inviteText);
      setStatus(dictionary.cp.inviteCopied);
    } catch {
      fallbackCopyText(inviteText);
      setStatus(dictionary.cp.inviteCopied);
    }
    fetch('/api/analytics/share', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ channel: 'cp_invite', typeCode: partnerTypeCode }),
    }).catch(() => undefined);
  }, [dictionary.cp.inviteCopied, dictionary.result.copyCpInvite, encodedA, locale, origin, partnerTypeCode]);

  const handleCopyReport = useCallback(async () => {
    if (!reportState) return;
    const reward = getRewardCopy(reportState.report.chemistryScore);
    const reportLink = `${origin}${withLocalePath(locale, '/cp')}?a=${reportState.encodedA}&b=${reportState.encodedB}`;
    const text = `刚测了SBTI人格测试，跟我默契超过${reportState.report.chemistryScore}分的${reward}👇\n${reportLink}`;
    try {
      await navigator.clipboard.writeText(text);
      setStatus(dictionary.cp.reportCopied);
    } catch {
      fallbackCopyText(text);
      setStatus(dictionary.cp.reportCopied);
    }
    fetch('/api/analytics/share', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ channel: 'cp_report', typeCode: reportState.typeCodeA }),
    }).catch(() => undefined);
  }, [dictionary.cp.reportCopied, locale, origin, reportState]);

  const handleReset = useCallback(() => {
    setEncodedB('');
    setInputB('');
    setReportState(null);
    setError('');
    setStatus('');
    window.history.replaceState(
      {},
      '',
      encodedA ? `${withLocalePath(locale, '/cp')}?a=${encodedA}` : withLocalePath(locale, '/cp')
    );
  }, [encodedA, locale]);

  const partnerType = partnerTypeCode ? TYPE_LIBRARY[partnerTypeCode] : null;

  return (
    <div className="shell cp-shell">
      <div className="cp-breadcrumb">
        <Link href={withLocalePath(locale, '/')}>{dictionary.result.home}</Link>
        <span>/</span>
        <strong>{dictionary.cp.breadcrumb}</strong>
      </div>

      <section className="card cp-card">
        <div className="cp-invite-header">
          <div className="cp-invite-icon">⚗️</div>
          <div>
            <h1 className="cp-title">{dictionary.cp.title}</h1>
            <p className="cp-desc">
              {encodedA ? dictionary.cp.descInvite : dictionary.cp.descEmpty}
            </p>
          </div>
        </div>

        {encodedA ? (
          <div className="cp-partner-card">
            <div className="cp-partner-label">{dictionary.cp.partnerType}</div>
            <div className="cp-partner-main">
              {partnerTypeCode && TYPE_IMAGES[partnerTypeCode] ? (
                <img
                  src={TYPE_IMAGES[partnerTypeCode]}
                  alt={partnerTypeCode}
                  className="cp-partner-avatar"
                />
              ) : (
                <div className="cp-partner-avatar placeholder">{partnerTypeCode ?? '?'}</div>
              )}
              <div className="cp-partner-copy">
                <strong>{partnerTypeCode} · {partnerType?.cn ?? dictionary.cp.unknownType}</strong>
                <span>🧬 {encodedA}</span>
              </div>
            </div>
          </div>
        ) : null}

        {!reportState ? (
          <div className="cp-input-panel">
            <div className="cp-divider">
              <span>{encodedA ? dictionary.cp.yourDna : dictionary.cp.inputBoth}</span>
            </div>

            {encodedA ? (
              <>
                <Link className="btn-secondary cp-test-link" href={withLocalePath(locale, '/')}>
                  🧪 {dictionary.cp.testFirst}
                </Link>
                <div className="cp-test-hint">{dictionary.cp.testHint}</div>
                <div className="cp-or"><span>{dictionary.cp.or}</span></div>
              </>
            ) : null}

            {!encodedA ? (
              <input
                className="cp-input"
                value={encodedA}
                onChange={(event) => setEncodedA(extractDnaInput(event.target.value) ?? event.target.value)}
                placeholder={dictionary.cp.inputPlaceholderA}
              />
            ) : null}

            <input
              className="cp-input"
              value={inputB}
              onChange={(event) => setInputB(event.target.value)}
              placeholder={dictionary.cp.inputPlaceholderB}
            />
            <div className="cp-input-hint">{dictionary.cp.inputHint}</div>

            {error ? <div className="cp-error">{error}</div> : null}

            <div className="cp-actions">
              <button className="btn-primary" onClick={handleGenerate}>
                {dictionary.cp.generate}
              </button>
              {encodedA ? (
                <button className="btn-secondary" onClick={handleCopyInvite}>
                  {dictionary.cp.copyInvite}
                </button>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="cp-report">
            <div className="cp-score-head">
              <div className="cp-person-pill">
                <strong>{reportState.typeCodeA}</strong>
                <span>{TYPE_LIBRARY[reportState.typeCodeA].cn}</span>
              </div>
              <div className="cp-score-pill">
                <em>{reportState.report.chemistryScore}</em>
                <span>{dictionary.cp.scoreLabel}</span>
              </div>
              <div className="cp-person-pill">
                <strong>{reportState.typeCodeB}</strong>
                <span>{TYPE_LIBRARY[reportState.typeCodeB].cn}</span>
              </div>
            </div>

            <div className="cp-formula">{reportState.report.formula}</div>
            <h2 className="cp-headline">{reportState.report.headline}</h2>

            <div className="cp-report-grid">
              <article className="cp-report-card">
                <h3>🌡️ {dictionary.cp.vibe}</h3>
                <p>{reportState.report.vibe}</p>
              </article>
              <article className="cp-report-card">
                <h3>💚 {dictionary.cp.strengths}</h3>
                <p>{reportState.report.strengths}</p>
              </article>
              <article className="cp-report-card">
                <h3>⚠️ {dictionary.cp.hazards}</h3>
                <p>{reportState.report.hazards}</p>
              </article>
              <article className="cp-report-card">
                <h3>🎬 {dictionary.cp.scenario}</h3>
                <p>{reportState.report.scenario}</p>
              </article>
            </div>

            <div className="cp-verdict">
              <h3>⚖️ {dictionary.cp.verdict}</h3>
              <p>{reportState.report.verdict}</p>
            </div>

            {status ? <div className="cp-status">{status}</div> : null}

            <div className="cp-actions">
              <button className="btn-primary" onClick={handleCopyReport}>
                {dictionary.cp.copyReport}
              </button>
              <button className="btn-secondary" onClick={handleCopyInvite}>
                {dictionary.cp.copyInvite}
              </button>
              <button className="btn-secondary" onClick={handleReset}>
                {dictionary.cp.reset}
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="card cp-note">
        <BrandLogo compact locale={locale} />
        <p>{dictionary.cp.note}</p>
      </section>
    </div>
  );
}
