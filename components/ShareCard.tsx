'use client';

import { ComputeResult } from '@/types';
import { TYPE_IMAGES } from '@/data/types';
import { dimensionMeta, dimensionOrder } from '@/data/dimensions';

interface ShareCardProps {
  result: ComputeResult;
  siteUrl: string;
}

export default function ShareCard({ result, siteUrl }: ShareCardProps) {
  const type = result.finalType;
  const imageSrc = TYPE_IMAGES[type.code];

  const topDims = dimensionOrder
    .map(dim => ({ dim, level: result.levels[dim], score: result.rawScores[dim] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return (
    <div
      id="share-card"
      style={{
        position: 'fixed',
        left: '-9999px',
        top: 0,
        width: 750,
        padding: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
        zIndex: -1,
      }}
    >
      <div style={{
        width: 750,
        minHeight: 1200,
        background: 'linear-gradient(165deg, #1e3a2a 0%, #2d5a3f 40%, #1a4a32 100%)',
        borderRadius: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '48px 40px 40px',
        color: '#fff',
      }}>
        {/* Header */}
        <div style={{
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: 4,
          color: '#a8d5b8',
          marginBottom: 24,
          textTransform: 'uppercase',
        }}>
          SBTI 人格测试
        </div>

        {/* Type Image */}
        {imageSrc && (
          <div style={{
            width: 260,
            height: 260,
            borderRadius: 20,
            overflow: 'hidden',
            marginBottom: 24,
            border: '3px solid rgba(168, 213, 184, 0.3)',
            background: 'rgba(255,255,255,0.05)',
          }}>
            <img
              src={imageSrc}
              alt={type.code}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Type Name */}
        <div style={{
          fontSize: 42,
          fontWeight: 800,
          letterSpacing: 2,
          marginBottom: 8,
          textShadow: '0 2px 12px rgba(0,0,0,0.3)',
        }}>
          {type.code}
        </div>
        <div style={{
          fontSize: 24,
          fontWeight: 500,
          color: '#a8d5b8',
          marginBottom: 16,
        }}>
          {type.cn}
        </div>

        {/* Intro */}
        <div style={{
          fontSize: 17,
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.85)',
          textAlign: 'center',
          maxWidth: 560,
          marginBottom: 16,
        }}>
          {type.intro}
        </div>

        {/* Badge */}
        <div style={{
          fontSize: 14,
          padding: '6px 20px',
          borderRadius: 20,
          background: 'rgba(168, 213, 184, 0.15)',
          border: '1px solid rgba(168, 213, 184, 0.3)',
          color: '#a8d5b8',
          marginBottom: 28,
        }}>
          {result.badge}
        </div>

        {/* Top Dimensions */}
        <div style={{
          width: '100%',
          maxWidth: 600,
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 16,
          padding: '20px 24px',
          marginBottom: 32,
        }}>
          <div style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#a8d5b8',
            marginBottom: 14,
            letterSpacing: 1,
          }}>
            关键维度 TOP 5
          </div>
          {topDims.map(({ dim, level, score }) => (
            <div key={dim} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 0',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
                {dimensionMeta[dim].name}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 100,
                  height: 6,
                  borderRadius: 3,
                  background: 'rgba(255,255,255,0.1)',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${(score / 6) * 100}%`,
                    height: '100%',
                    borderRadius: 3,
                    background: level === 'H' ? '#6c8d71' : level === 'M' ? '#8ab090' : '#a8c5ad',
                  }} />
                </div>
                <span style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#a8d5b8',
                  minWidth: 28,
                  textAlign: 'right',
                }}>
                  {level}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          fontSize: 16,
          color: 'rgba(255,255,255,0.6)',
          textAlign: 'center',
          lineHeight: 1.8,
        }}>
          快来测测你的SBTI人格！
          <br />
          <span style={{ fontSize: 14, color: 'rgba(168, 213, 184, 0.7)' }}>
            {siteUrl}
          </span>
        </div>
      </div>
    </div>
  );
}
