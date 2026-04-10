'use client';

import { useEffect, useMemo } from 'react';
import { LocaleCode } from '@/data/brand';
import { getDictionary } from '@/data/i18n';
import { Question } from '@/types';

interface TestScreenProps {
  questions: Question[];
  answers: Record<string, number>;
  currentQuestionId: string | null;
  onAnswer: (questionId: string, value: number) => void;
  onRandomAnswer: (questionId: string) => void;
  onPrevious: () => void;
  onSubmit: () => void;
  onBack: () => void;
  locale: LocaleCode;
}

export default function TestScreen({
  questions,
  answers,
  currentQuestionId,
  onAnswer,
  onRandomAnswer,
  onPrevious,
  onSubmit,
  onBack,
  locale,
}: TestScreenProps) {
  const dictionary = getDictionary(locale);
  const total = questions.length;
  const done = questions.filter((question) => answers[question.id] !== undefined).length;
  const percent = total ? (done / total) * 100 : 0;
  const complete = done === total && total > 0;

  const activeIndex = useMemo(() => {
    if (!questions.length) return -1;
    if (currentQuestionId) {
      const exactIndex = questions.findIndex((question) => question.id === currentQuestionId);
      if (exactIndex !== -1) return exactIndex;
    }
    return questions.findIndex((question) => answers[question.id] === undefined);
  }, [answers, currentQuestionId, questions]);

  const safeActiveIndex = activeIndex === -1 ? Math.max(questions.length - 1, 0) : activeIndex;
  const activeQuestion = questions[safeActiveIndex];

  useEffect(() => {
    if (!activeQuestion || typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeQuestion?.id]);

  return (
    <section className="screen active">
      <div className="test-wrap card">
        <div className="topbar">
          <div className="progress">
            <span style={{ width: `${percent}%` }} />
          </div>
          <div className="progress-text">{done} / {total}</div>
        </div>

        <div className="question-strip" aria-hidden="true">
          {questions.map((question, index) => (
            <span
              key={question.id}
              className={`question-dot${index === safeActiveIndex ? ' current' : ''}${answers[question.id] !== undefined ? ' answered' : ''}`}
            />
          ))}
        </div>

        {activeQuestion ? (
          <article className="question question-stage">
            <div className="question-meta">
              <div className="badge">
                {dictionary.test.questionLabel} {safeActiveIndex + 1}
              </div>
              <div>
                {activeQuestion.special ? dictionary.test.specialQuestion : dictionary.test.hiddenDimension}
              </div>
            </div>
            <div className="question-title">{activeQuestion.text}</div>
            <div className="options">
              {activeQuestion.options.map((option, index) => {
                const code = ['A', 'B', 'C', 'D'][index] || String(index + 1);
                return (
                  <label
                    key={`${activeQuestion.id}-${index}`}
                    className={`option${answers[activeQuestion.id] === option.value ? ' selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name={activeQuestion.id}
                      value={option.value}
                      checked={answers[activeQuestion.id] === option.value}
                      onChange={() => onAnswer(activeQuestion.id, option.value)}
                    />
                    <div className="option-code">{code}</div>
                    <div>{option.label}</div>
                  </label>
                );
              })}
            </div>
          </article>
        ) : null}

        <div className="actions-bottom">
          <div className="hint">
            {complete
              ? dictionary.test.completeHint
              : dictionary.test.autoHint}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn-secondary" onClick={onBack}>{dictionary.test.backHome}</button>
            <button className="btn-secondary" onClick={onPrevious} disabled={safeActiveIndex <= 0}>
              {dictionary.test.previous}
            </button>
            {activeQuestion ? (
              <button className="btn-secondary" onClick={() => onRandomAnswer(activeQuestion.id)}>
                {dictionary.test.random}
              </button>
            ) : null}
            <button className="btn-primary" disabled={!complete} onClick={onSubmit}>
              {dictionary.test.submit}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
