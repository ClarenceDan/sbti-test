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
