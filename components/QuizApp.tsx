'use client';

import { useState, useCallback, useEffect } from 'react';
import { Question, ComputeResult } from '@/types';
import { buildQuestionSet, getVisibleQuestions, computeResult } from '@/data/scoring';
import IntroScreen from './IntroScreen';
import TestScreen from './TestScreen';
import ResultScreen from './ResultScreen';

type Screen = 'intro' | 'test' | 'result';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || '';

export default function QuizApp() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<ComputeResult | null>(null);
  const [previewMode] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [screen]);

  const startTest = useCallback(() => {
    setAnswers({});
    setShuffledQuestions(buildQuestionSet());
    setScreen('test');
  }, []);

  const handleAnswer = useCallback((questionId: string, value: number) => {
    setAnswers(prev => {
      const next = { ...prev, [questionId]: value };
      if (questionId === 'drink_gate_q1' && value !== 3) {
        delete next['drink_gate_q2'];
      }
      return next;
    });
  }, []);

  const handleSubmit = useCallback(() => {
    setResult(computeResult(answers));
    setScreen('result');
  }, [answers]);

  const showIntro = useCallback(() => setScreen('intro'), []);

  const visibleQuestions = screen === 'test'
    ? getVisibleQuestions(shuffledQuestions, answers)
    : [];

  return (
    <div className="shell">
      {screen === 'intro' && <IntroScreen onStart={startTest} />}
      {screen === 'test' && (
        <TestScreen
          questions={visibleQuestions}
          answers={answers}
          previewMode={previewMode}
          onAnswer={handleAnswer}
          onSubmit={handleSubmit}
          onBack={showIntro}
        />
      )}
      {screen === 'result' && result && (
        <ResultScreen result={result} onRestart={startTest} onHome={showIntro} siteUrl={SITE_URL} />
      )}
    </div>
  );
}
