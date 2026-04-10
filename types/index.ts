export interface QuestionOption {
  label: string;
  value: number;
}

export interface Question {
  id: string;
  dim?: string;
  text: string;
  options: QuestionOption[];
  special?: boolean;
  kind?: string;
}

export interface TypeInfo {
  code: string;
  cn: string;
  intro: string;
  desc: string;
}

export interface NormalType {
  code: string;
  pattern: string;
}

export interface DimensionMeta {
  name: string;
  model: string;
}

export interface DimExplanation {
  L: string;
  M: string;
  H: string;
}

export type Level = 'L' | 'M' | 'H';

export interface RankedType {
  code: string;
  pattern: string;
  cn: string;
  intro: string;
  desc: string;
  distance: number;
  exact: number;
  similarity: number;
}

export interface ComputeResult {
  rawScores: Record<string, number>;
  levels: Record<string, Level>;
  ranked: RankedType[];
  bestNormal: RankedType;
  finalType: TypeInfo;
  modeKicker: string;
  badge: string;
  sub: string;
  special: boolean;
  secondaryType: RankedType | null;
}

export interface DnaPayload {
  rawScores: Record<string, number>;
  drunkTriggered: boolean;
}

export interface PopularTypeStat {
  rank: number;
  code: string;
  percent: string;
  count: number;
}

export interface RareTypeStat {
  code: string;
  percent: string;
  count: number;
}

export interface SiteStats {
  totalCompletions: number;
  popularTypes: PopularTypeStat[];
  rareTypes: RareTypeStat[];
}

export interface CpReport {
  chemistryScore: number;
  formula: string;
  headline: string;
  vibe: string;
  strengths: string;
  hazards: string;
  scenario: string;
  verdict: string;
}
