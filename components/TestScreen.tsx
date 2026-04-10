'use client';

import { Question } from '@/types';
import { dimensionMeta } from '@/data/dimensions';

interface TestScreenProps {
  questions: Question[];
  answers: Record<string, number>;
  previewMode: boolean;
  onAnswer: (questionId: string, value: number) => void;
  onSubmit: () => void;
  onBack: () => void;
}

function getQuestionMetaLabel(q: Question, previewMode: boolean): string {
  if (q.special) return '补充题';
  return previewMode && q.dim ? dimensionMeta[q.dim].name : '维度已隐藏';
}

export default function TestScreen({
  questions,
  answers,
  previewMode,
  onAnswer,
  onSubmit,
  onBack,
}: TestScreenProps) {
  const total = questions.length;
  const done = questions.filter(q => answers[q.id] !== undefined).length;
  const percent = total ? (done / total) * 100 : 0;
  const complete = done === total && total > 0;

  return (
    <section className="screen active">
      <div className="test-wrap card">
        <div className="topbar">
          <div className="progress">
            <span style={{ width: `${percent}%` }} />
          </div>
          <div className="progress-text">{done} / {total}</div>
        </div>

        <div className="question-list">
          {questions.map((q, index) => (
            <article key={q.id + '-' + index} className="question">
              <div className="question-meta">
                <div className="badge">第 {index + 1} 题</div>
                <div>{getQuestionMetaLabel(q, previewMode)}</div>
              </div>
              <div className="question-title">{q.text}</div>
              <div className="options">
                {q.options.map((opt, i) => {
                  const code = ['A', 'B', 'C', 'D'][i] || String(i + 1);
                  return (
                    <label key={i} className="option">
                      <input
                        type="radio"
                        name={q.id}
                        value={opt.value}
                        checked={answers[q.id] === opt.value}
                        onChange={() => onAnswer(q.id, opt.value)}
                      />
                      <div className="option-code">{code}</div>
                      <div>{opt.label}</div>
                    </label>
                  );
                })}
              </div>
            </article>
          ))}
        </div>

        <div className="actions-bottom">
          <div className="hint">
            {complete
              ? '都做完了。现在可以把你的电子魂魄交给结果页审判。'
              : '全选完才会放行。世界已经够乱了，起码把题做完整。'}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn-secondary" onClick={onBack}>返回首页</button>
            <button className="btn-primary" disabled={!complete} onClick={onSubmit}>
              提交并查看结果
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
