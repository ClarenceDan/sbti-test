import { ComputeResult, Question, SavedResultEntry } from '@/types';
import { questions, specialQuestions } from '@/data/questions';
import { encodeDna } from '@/data/dna';

const QUIZ_VIEW_KEY = 'sbti:quiz-view';
const QUIZ_PROGRESS_KEY = 'sbti:quiz-progress';
const QUIZ_RESULT_KEY = 'sbti:latest-result';
const QUIZ_HISTORY_KEY = 'sbti:result-history';
const MAX_HISTORY_ITEMS = 8;

const QUESTION_MAP = Object.fromEntries(
  [...questions, ...specialQuestions].map((question) => [question.id, question])
);

type QuizView = 'intro' | 'test' | 'result';

type StoredQuizProgress = {
  answers: Record<string, number>;
  shuffledQuestionIds: string[];
  currentQuestionId: string | null;
};

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function saveQuizView(view: QuizView) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(QUIZ_VIEW_KEY, view);
}

export function loadQuizView(): QuizView | null {
  if (!canUseStorage()) return null;
  const value = window.localStorage.getItem(QUIZ_VIEW_KEY);
  return value === 'intro' || value === 'test' || value === 'result' ? value : null;
}

export function saveQuizProgress(progress: StoredQuizProgress) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify(progress));
}

export function loadQuizProgress(): (StoredQuizProgress & { shuffledQuestions: Question[] }) | null {
  if (!canUseStorage()) return null;

  try {
    const raw = window.localStorage.getItem(QUIZ_PROGRESS_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as StoredQuizProgress;
    if (!parsed || !Array.isArray(parsed.shuffledQuestionIds)) {
      return null;
    }

    const shuffledQuestions = parsed.shuffledQuestionIds
      .map((id) => QUESTION_MAP[id])
      .filter(Boolean);

    if (!shuffledQuestions.length) {
      return null;
    }

    return {
      ...parsed,
      shuffledQuestions,
    };
  } catch {
    return null;
  }
}

export function clearQuizProgress() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(QUIZ_PROGRESS_KEY);
}

export function saveLatestResult(result: ComputeResult) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(QUIZ_RESULT_KEY, JSON.stringify(result));
}

export function loadLatestResult(): ComputeResult | null {
  if (!canUseStorage()) return null;

  try {
    const raw = window.localStorage.getItem(QUIZ_RESULT_KEY);
    return raw ? (JSON.parse(raw) as ComputeResult) : null;
  } catch {
    return null;
  }
}

export function loadResultHistory(): SavedResultEntry[] {
  if (!canUseStorage()) return [];

  try {
    const raw = window.localStorage.getItem(QUIZ_HISTORY_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((entry): entry is SavedResultEntry => {
      return Boolean(
        entry &&
          typeof entry.id === 'string' &&
          typeof entry.createdAt === 'number' &&
          typeof entry.dna === 'string' &&
          typeof entry.typeCode === 'string' &&
          entry.result
      );
    });
  } catch {
    return [];
  }
}

export function appendResultHistory(result: ComputeResult): SavedResultEntry[] {
  if (!canUseStorage()) return [];

  const entry: SavedResultEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: Date.now(),
    dna: encodeDna({
      rawScores: result.rawScores,
      drunkTriggered: result.finalType.code === 'DRUNK',
    }),
    typeCode: result.finalType.code,
    result,
  };

  const nextHistory = [entry, ...loadResultHistory()].slice(0, MAX_HISTORY_ITEMS);
  window.localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(nextHistory));
  return nextHistory;
}
