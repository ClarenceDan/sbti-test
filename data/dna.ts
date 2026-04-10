import { DnaPayload, Level } from '@/types';
import { dimensionOrder } from './dimensions';

const LEVEL_TO_SCORE: Record<Level, number> = {
  L: 2,
  M: 4,
  H: 6,
};

export function encodeDna(payload: DnaPayload): string {
  const digits = dimensionOrder.map((dim) => String(payload.rawScores[dim] ?? 4));
  digits.push(payload.drunkTriggered ? '1' : '0');
  return digits.join('');
}

export function decodeDna(dna: string): DnaPayload | null {
  if (!/^\d{16}$/.test(dna)) {
    return null;
  }

  const rawScores: Record<string, number> = {};
  for (let index = 0; index < dimensionOrder.length; index += 1) {
    const score = Number(dna[index]);
    if (score < 2 || score > 6) {
      return null;
    }
    rawScores[dimensionOrder[index]] = score;
  }

  const drunkDigit = dna.at(-1);
  if (drunkDigit !== '0' && drunkDigit !== '1') {
    return null;
  }

  return {
    rawScores,
    drunkTriggered: drunkDigit === '1',
  };
}

export function extractDnaInput(input: string): string | null {
  const trimmed = input.trim();

  if (/^\d{16}$/.test(trimmed)) {
    return decodeDna(trimmed) ? trimmed : null;
  }

  const paramsMatch = trimmed.match(/[?&](?:a|b|result|s)=(\d{16})/);
  if (paramsMatch) {
    return decodeDna(paramsMatch[1]) ? paramsMatch[1] : null;
  }

  const dimsMatch = trimmed.match(/[?&]d=([LMH]{15})/i);
  if (dimsMatch) {
    const dims = dimsMatch[1].toUpperCase().split('') as Level[];
    const rawScores = Object.fromEntries(
      dimensionOrder.map((dim, index) => [dim, LEVEL_TO_SCORE[dims[index]] ?? 4])
    );
    return encodeDna({
      rawScores,
      drunkTriggered: false,
    });
  }

  return null;
}
