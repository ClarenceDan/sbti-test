'use client';

import { TYPE_LIBRARY, NORMAL_TYPES } from '@/data/types';
import { dimensionMeta, dimensionOrder } from '@/data/dimensions';

interface IntroScreenProps {
  onStart: () => void;
}

const FAQ_ITEMS = [
  {
    q: 'SBTI 是什么？',
    a: 'SBTI（Soul-Based Temperament Index）是一款基于中国互联网文化的人格测试，通过 15 个维度分析你的性格特征。它用更接地气的方式，帮你认识那个可能连你自己都没发现过的"真实人格"。',
  },
  {
    q: 'SBTI 和 MBTI 有什么区别？',
    a: 'MBTI 基于荣格心理学，使用 4 个二分维度（如 E/I、S/N）将人分为 16 型。SBTI 使用 15 个连续维度（每维度 3 档：L/M/H），从自我、情感、态度、行动、社交五个模型全面刻画人格，产出 25 种标准人格 + 2 种隐藏人格。',
  },
  {
    q: '测试结果准吗？',
    a: '本测试纯属娱乐，结果仅供参考和社交分享。请勿将其用于学术、职业、医学诊断或人生重大决策。但如果你测出来笑了，那就值了。',
  },
  {
    q: '测试需要多长时间？',
    a: '大约 3-5 分钟，共 30+ 道题。题目会随机打乱顺序，每次体验略有不同。',
  },
  {
    q: '可以重复测试吗？',
    a: '当然可以！每次测试的题目顺序都会随机打乱，你可以多测几次看看结果是否一致。不过请记住：人格不会因为你多测几次就改变。',
  },
];

const MBTI_COMPARE = [
  { aspect: '维度数量', sbti: '15 个连续维度', mbti: '4 个二分维度' },
  { aspect: '人格类型', sbti: '25 + 2 隐藏型', mbti: '16 型' },
  { aspect: '评分方式', sbti: '每维度 L/M/H 三档', mbti: '二选一强制分类' },
  { aspect: '理论背景', sbti: '互联网文化 + 人格模型', mbti: '荣格认知功能' },
  { aspect: '风格定位', sbti: '搞笑 + 社交娱乐', mbti: '职场 + 自我探索' },
];

const DIM_GROUPS = [
  { label: '自我模型', dims: ['S1', 'S2', 'S3'] },
  { label: '情感模型', dims: ['E1', 'E2', 'E3'] },
  { label: '态度模型', dims: ['A1', 'A2', 'A3'] },
  { label: '行动驱力', dims: ['Ac1', 'Ac2', 'Ac3'] },
  { label: '社交模型', dims: ['So1', 'So2', 'So3'] },
];

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <section className="screen active">
      {/* Hero */}
      <div className="hero card hero-minimal">
        <h1>MBTI已经过时，SBTI来了。</h1>
        <p className="hero-sub">
          15 个维度 · 25 种人格 · 2 种隐藏人格
          <br />
          用最接地气的方式，测出你的灵魂画像
        </p>
        <div className="hero-actions hero-actions-single">
          <button className="btn-primary" onClick={onStart}>开始测试</button>
        </div>
        <div className="intro-credits">
          <span>
            原作者：
            <a href="https://space.bilibili.com/417038183" target="_blank" rel="noopener noreferrer">B站@蛆肉儿串儿</a>
          </span>
          <span>托管：Cloudflare Workers</span>
        </div>
      </div>

      {/* What is SBTI */}
      <div className="card" style={{ padding: 28, marginTop: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>什么是 SBTI？</h2>
        <p style={{ lineHeight: 1.8, color: 'var(--muted)', margin: 0 }}>
          SBTI（Soul-Based Temperament Index）是一款源自中文互联网文化的搞笑人格测试。它从自我、情感、态度、行动、社交五个核心模型出发，
          通过 15 个维度对人格进行细粒度刻画。不同于传统心理测试的严肃面孔，SBTI 用接地气的题目和犀利的解读，
          让你在笑声中看到那个可能连自己都不太了解的自己。已超过百万人完成测试。
        </p>
      </div>

      {/* Dimensions */}
      <div className="card" style={{ padding: 28, marginTop: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>15 个测试维度</h2>
        <div className="intro-dim-groups">
          {DIM_GROUPS.map(group => (
            <div key={group.label} className="intro-dim-group">
              <div className="intro-dim-group-label">{group.label}</div>
              <div className="intro-dim-items">
                {group.dims.map(dim => (
                  <span key={dim} className="intro-dim-tag">
                    {dimensionMeta[dim].name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SBTI vs MBTI */}
      <div className="card" style={{ padding: 28, marginTop: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>SBTI vs MBTI</h2>
        <div className="compare-table">
          <div className="compare-row compare-header">
            <div>对比项</div>
            <div>SBTI</div>
            <div>MBTI</div>
          </div>
          {MBTI_COMPARE.map(row => (
            <div key={row.aspect} className="compare-row">
              <div className="compare-aspect">{row.aspect}</div>
              <div className="compare-sbti">{row.sbti}</div>
              <div className="compare-mbti">{row.mbti}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Type Gallery */}
      <div className="card" style={{ padding: 28, marginTop: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>全部人格类型</h2>
        <div className="type-gallery">
          {NORMAL_TYPES.map(t => {
            const info = TYPE_LIBRARY[t.code];
            return (
              <div key={t.code} className="type-gallery-item">
                <div className="type-gallery-code">{t.code}</div>
                <div className="type-gallery-cn">{info?.cn || ''}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ */}
      <div className="card" style={{ padding: 28, marginTop: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>常见问题</h2>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <details key={i} className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="card" style={{ padding: 28, marginTop: 20, textAlign: 'center' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>准备好了吗？</h2>
        <p style={{ color: 'var(--muted)', marginBottom: 20, lineHeight: 1.6 }}>
          大约 3-5 分钟，测出你的灵魂画像
        </p>
        <button className="btn-primary" onClick={onStart}>开始测试</button>
      </div>
    </section>
  );
}
