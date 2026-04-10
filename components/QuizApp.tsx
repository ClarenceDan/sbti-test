'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ComputeResult, Level, Question, SiteStats } from '@/types';
import { LocaleCode, detectLocaleFromPath } from '@/data/brand';
import { computeResult, getVisibleQuestions, buildQuestionSet } from '@/data/scoring';
import { dimensionOrder } from '@/data/dimensions';
import { encodeDna } from '@/data/dna';
import { TYPE_LIBRARY } from '@/data/types';
import {
  clearQuizProgress,
  loadLatestResult,
  loadQuizProgress,
  loadQuizView,
  saveLatestResult,
  saveQuizProgress,
  saveQuizView,
} from '@/lib/quiz-storage';
import IntroScreen from './IntroScreen';
import ResultScreen from './ResultScreen';
import TestScreen from './TestScreen';

type Screen = 'intro' | 'test' | 'result';

function parseSharedResult(): ComputeResult | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const typeCode = params.get('t');
  const dims = params.get('d');
  if (!typeCode || !dims || dims.length !== 15) return null;

  const typeInfo = TYPE_LIBRARY[typeCode];
  if (!typeInfo) return null;

  const rawScores: Record<string, number> = {};
  const levels: Record<string, Level> = {};

  dimensionOrder.forEach((dim, index) => {
    const current = dims[index] as Level;
    if (!['L', 'M', 'H'].includes(current)) return;
    levels[dim] = current;
    rawScores[dim] = current === 'L' ? 2 : current === 'M' ? 4 : 6;
  });

  return {
    rawScores,
    levels,
    ranked: [],
    bestNormal: {
      code: typeCode,
      pattern: '',
      cn: typeInfo.cn,
      intro: typeInfo.intro,
      desc: typeInfo.desc,
      distance: 0,
      exact: 15,
      similarity: 100,
    },
    finalType: typeInfo,
    modeKicker: '分享结果',
    badge: '来自好友的分享',
    sub: '你的朋友测出了这个结果，你也来试试？',
    special: false,
    secondaryType: null,
  };
}

interface QuizAppProps {
  locale?: LocaleCode;
}

export default function QuizApp({ locale = 'zh' }: QuizAppProps) {
  const pathname = usePathname();
  const activeLocale = useMemo(
    () => (pathname ? detectLocaleFromPath(pathname) : locale),
    [locale, pathname]
  );
  const [screen, setScreen] = useState<Screen>('intro');
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);
  const [result, setResult] = useState<ComputeResult | null>(null);
  const [sharedResult, setSharedResult] = useState<ComputeResult | null>(null);
  const [stats, setStats] = useState<SiteStats | null>(null);

  const visibleQuestions = useMemo(
    () => (screen === 'test' ? getVisibleQuestions(shuffledQuestions, answers) : []),
    [answers, screen, shuffledQuestions]
  );

  useEffect(() => {
    const shared = parseSharedResult();
    if (shared) {
      setSharedResult(shared);
      setResult(shared);
      setScreen('result');
      saveQuizView('result');
      clearQuizProgress();
      return;
    }

    const lastView = loadQuizView();
    const storedProgress = loadQuizProgress();
    const latestResult = loadLatestResult();

    if (lastView === 'test' && storedProgress) {
      setAnswers(storedProgress.answers);
      setShuffledQuestions(storedProgress.shuffledQuestions);
      setCurrentQuestionId(
        storedProgress.currentQuestionId ?? storedProgress.shuffledQuestions[0]?.id ?? null
      );
      setScreen('test');
      return;
    }

    if (lastView === 'result' && latestResult) {
      setResult(latestResult);
      setScreen('result');
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [screen]);

  useEffect(() => {
    fetch('/api/stats')
      .then((response) => response.json())
      .then((payload: SiteStats) => {
        setStats(payload);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    saveQuizView(screen);
  }, [screen]);

  useEffect(() => {
    if (screen !== 'test' || !shuffledQuestions.length) {
      return;
    }

    const fallbackQuestionId =
      visibleQuestions.find((question) => answers[question.id] === undefined)?.id ??
      visibleQuestions.at(-1)?.id ??
      shuffledQuestions[0]?.id ??
      null;

    const activeQuestionId =
      currentQuestionId && visibleQuestions.some((question) => question.id === currentQuestionId)
        ? currentQuestionId
        : fallbackQuestionId;

    if (activeQuestionId !== currentQuestionId) {
      setCurrentQuestionId(activeQuestionId);
      return;
    }

    saveQuizProgress({
      answers,
      shuffledQuestionIds: shuffledQuestions.map((question) => question.id),
      currentQuestionId: activeQuestionId,
    });
  }, [answers, currentQuestionId, screen, shuffledQuestions, visibleQuestions]);

  const startTest = useCallback(() => {
    const nextQuestions = buildQuestionSet();
    setAnswers({});
    setResult(null);
    setSharedResult(null);
    setShuffledQuestions(nextQuestions);
    setCurrentQuestionId(nextQuestions[0]?.id ?? null);
    setScreen('test');
    clearQuizProgress();
  }, []);

  const handleAnswer = useCallback((questionId: string, value: number) => {
    setAnswers((previous) => {
      const nextAnswers = { ...previous, [questionId]: value };
      if (questionId === 'drink_gate_q1' && value !== 3) {
        delete nextAnswers.drink_gate_q2;
      }

      const nextVisibleQuestions = getVisibleQuestions(shuffledQuestions, nextAnswers);
      const currentIndex = nextVisibleQuestions.findIndex((question) => question.id === questionId);
      const nextQuestionId = nextVisibleQuestions[currentIndex + 1]?.id ?? questionId;

      setCurrentQuestionId(nextQuestionId);
      return nextAnswers;
    });
  }, [shuffledQuestions]);

  const handleRandomAnswer = useCallback((questionId: string) => {
    const currentQuestion = visibleQuestions.find((question) => question.id === questionId);
    if (!currentQuestion || !currentQuestion.options.length) {
      return;
    }

    const randomOption =
      currentQuestion.options[Math.floor(Math.random() * currentQuestion.options.length)];
    handleAnswer(questionId, randomOption.value);
  }, [handleAnswer, visibleQuestions]);

  const handleGoPrevious = useCallback(() => {
    if (!visibleQuestions.length) return;
    const currentIndex = visibleQuestions.findIndex((question) => question.id === currentQuestionId);
    const previousQuestion = visibleQuestions[Math.max(0, currentIndex - 1)];
    setCurrentQuestionId(previousQuestion?.id ?? visibleQuestions[0]?.id ?? null);
  }, [currentQuestionId, visibleQuestions]);

  const handleSubmit = useCallback(() => {
    const nextResult = computeResult(answers);
    setResult(nextResult);
    setSharedResult(null);
    setCurrentQuestionId(null);
    setScreen('result');
    saveLatestResult(nextResult);
    clearQuizProgress();

    const dna = encodeDna({
      rawScores: nextResult.rawScores,
      drunkTriggered: nextResult.finalType.code === 'DRUNK',
    });

    fetch('/api/analytics/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        typeCode: nextResult.finalType.code,
        dna,
      }),
    })
      .then(() => fetch('/api/stats'))
      .then((response) => response.json())
      .then((payload: SiteStats) => {
        setStats(payload);
      })
      .catch(() => undefined);
  }, [answers]);

  const showIntro = useCallback(() => {
    setSharedResult(null);
    setResult(null);
    setCurrentQuestionId(null);
    clearQuizProgress();
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', window.location.pathname);
    }
    setScreen('intro');
  }, []);

  const isShared = sharedResult !== null;

  return (
    <div className="shell">
      {screen === 'intro' && <IntroScreen onStart={startTest} stats={stats} locale={activeLocale} />}
      {screen === 'test' && (
        <TestScreen
          questions={visibleQuestions}
          answers={answers}
          currentQuestionId={currentQuestionId}
          onAnswer={handleAnswer}
          onRandomAnswer={handleRandomAnswer}
          onPrevious={handleGoPrevious}
          onSubmit={handleSubmit}
          onBack={showIntro}
          locale={activeLocale}
        />
      )}
      {screen === 'result' && result && (
        <ResultScreen
          result={result}
          isShared={isShared}
          onRestart={startTest}
          onHome={showIntro}
          locale={activeLocale}
        />
      )}
    </div>
  );
}
