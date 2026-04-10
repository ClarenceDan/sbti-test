'use client';

import { useRef, useState, useCallback } from 'react';
import { ComputeResult, Level } from '@/types';
import { TYPE_IMAGES } from '@/data/types';
import { dimensionMeta, DIM_EXPLANATIONS, dimensionOrder } from '@/data/dimensions';
import ShareCard from './ShareCard';

interface ResultScreenProps {
  result: ComputeResult;
  onRestart: () => void;
  onHome: () => void;
  siteUrl?: string;
}

function buildShareLink(result: ComputeResult, siteUrl: string): string {
  const dims = dimensionOrder.map(dim => result.levels[dim]).join('');
  const params = new URLSearchParams({
    t: result.finalType.code,
    d: dims,
  });
  return `${siteUrl}?${params.toString()}`;
}

export default function ResultScreen({ result, onRestart, onHome, siteUrl }: ResultScreenProps) {
  const type = result.finalType;
  const imageSrc = TYPE_IMAGES[type.code];
  const [shareStatus, setShareStatus] = useState<string>('');
  const url = siteUrl || (typeof window !== 'undefined' ? window.location.origin : '');

  const handleSaveCard = useCallback(async () => {
    setShareStatus('');
    try {
      const html2canvas = (await import('html2canvas')).default;
      const el = document.getElementById('share-card');
      if (!el) return;
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });
      const link = document.createElement('a');
      link.download = `SBTI-${type.code}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setShareStatus('图片已保存');
    } catch {
      setShareStatus('保存失败，请重试');
    }
  }, [type.code]);

  const handleShare = useCallback(async () => {
    setShareStatus('');
    const shareLink = buildShareLink(result, url);

    if (navigator.share) {
      try {
        await navigator.share({
          title: `我的SBTI人格是 ${type.code}（${type.cn}）`,
          text: `${type.intro} 快来测测你的SBTI人格！`,
          url: shareLink,
        });
        return;
      } catch {
        // User cancelled or failed, fall through to copy
      }
    }

    try {
      await navigator.clipboard.writeText(shareLink);
      setShareStatus('链接已复制到剪贴板');
    } catch {
      setShareStatus('复制失败，请手动复制');
    }
  }, [result, type, url]);

  return (
    <section className="screen active">
      <ShareCard result={result} siteUrl={url} />

      <div className="result-wrap card">
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
              <div className="type-kicker">{result.modeKicker}</div>
              <div className="type-name">{type.code}（{type.cn}）</div>
              <div className="match">{result.badge}</div>
              <div className="type-subname">{result.sub}</div>
            </div>
          </div>

          <div className="analysis-box">
            <h3>该人格的简单解读</h3>
            <p>{type.desc}</p>
          </div>

          <div className="dim-box">
            <h3>十五维度评分</h3>
            <div className="dim-list">
              {dimensionOrder.map(dim => {
                const level = result.levels[dim];
                const explanation = DIM_EXPLANATIONS[dim][level];
                return (
                  <div key={dim} className="dim-item">
                    <div className="dim-item-top">
                      <div className="dim-item-name">{dimensionMeta[dim].name}</div>
                      <div className="dim-item-score">{level} / {result.rawScores[dim]}分</div>
                    </div>
                    <p>{explanation}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="note-box">
            <h3>友情提示</h3>
            <p>
              {result.special
                ? '本测试仅供娱乐。隐藏人格和傻乐兜底都属于作者故意埋的损招，请勿把它当成医学、心理学、相学、命理学或灵异学依据。'
                : '本测试仅供娱乐，别拿它当诊断、面试、相亲、分手、招魂、算命或人生判决书。你可以笑，但别太当真。'}
            </p>
          </div>

          <details className="author-box">
            <summary>作者的话</summary>
            <div className="author-content">
              <p>本测试首发于b站up主蛆肉儿串儿（UID417038183），初衷是劝诫一位爱喝酒的朋友戒酒。</p>
              <p>由于作者的人格是SHIT愤世者，所以平等的攻击了各位，在此抱歉！！不过我是一个绝世大美女，你们一定会原谅我，有B站的朋友们也可以关注我。</p>
              <p>关于这个测试，我没法很好的平衡娱乐和专业性，因此对于一些人格的阐释较为模糊或完全不准（如屌丝可能并非真的屌丝），如有冒犯非常抱歉！！</p>
              <p>再鉴于时间精力有限，就随便搞了一个先这样玩玩，后续会慢慢完善修改的，总之好玩为主，还请不要用于盈利呀。</p>
            </div>
          </details>
        </div>

        <div className="result-actions">
          {shareStatus && (
            <div style={{
              textAlign: 'center',
              fontSize: 14,
              color: 'var(--accent)',
              marginBottom: 8,
            }}>
              {shareStatus}
            </div>
          )}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn-secondary" onClick={onRestart}>重新测试</button>
            <button className="btn-secondary" onClick={handleSaveCard}>保存卡片</button>
            <button className="btn-primary" onClick={handleShare}>分享结果</button>
            <button className="btn-secondary" onClick={onHome}>回到首页</button>
          </div>
        </div>
      </div>
    </section>
  );
}
