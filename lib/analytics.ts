import { getCloudflareContext } from '@opennextjs/cloudflare';
import { PopularTypeStat, RareTypeStat, SiteStats } from '@/types';
import { POPULAR_TYPES, RARE_TYPES } from '@/data/brand';

type D1Like = {
  prepare: (query: string) => {
    bind: (...values: unknown[]) => {
      first: <T = Record<string, unknown>>() => Promise<T | null>;
      all: <T = Record<string, unknown>>() => Promise<{ results: T[] }>;
      run: () => Promise<unknown>;
    };
  };
  exec?: (query: string) => Promise<unknown>;
};

type EnvWithDb = {
  SBTI_DB?: D1Like;
};

const DEFAULT_TOTAL = 16790;

function formatPercent(count: number, total: number) {
  if (!total) {
    return '0.0%';
  }
  return `${((count / total) * 100).toFixed(1)}%`;
}

export async function getDb() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return (env as EnvWithDb).SBTI_DB ?? null;
  } catch {
    return null;
  }
}

export async function getSiteStats(): Promise<SiteStats> {
  const db = await getDb();
  if (!db) {
    return {
      totalCompletions: DEFAULT_TOTAL,
      popularTypes: POPULAR_TYPES.map((item, index) => ({
        rank: index + 1,
        code: item.code,
        percent: item.percent,
        count: 0,
      })),
      rareTypes: RARE_TYPES.map((item) => ({
        code: item.code,
        percent: item.percent,
        count: 0,
      })),
    };
  }

  const totalRow = await db
    .prepare('SELECT value FROM site_metrics WHERE key = ?')
    .bind('total_completions')
    .first<{ value: number }>();

  const totalCompletions = Number(totalRow?.value ?? 0);

  const popularRows = await db
    .prepare('SELECT type_code, completion_count FROM type_stats ORDER BY completion_count DESC, type_code ASC LIMIT 5')
    .bind()
    .all<{ type_code: string; completion_count: number }>();

  const rareRows = await db
    .prepare('SELECT type_code, completion_count FROM type_stats ORDER BY completion_count ASC, type_code ASC LIMIT 3')
    .bind()
    .all<{ type_code: string; completion_count: number }>();

  const safeTotal = Math.max(totalCompletions, DEFAULT_TOTAL);

  return {
    totalCompletions: safeTotal,
    popularTypes: popularRows.results.length
      ? popularRows.results.map((item, index) => ({
          rank: index + 1,
          code: item.type_code,
          percent: formatPercent(item.completion_count, safeTotal),
          count: item.completion_count,
        }))
      : POPULAR_TYPES.map((item, index) => ({
          rank: index + 1,
          code: item.code,
          percent: item.percent,
          count: 0,
        })),
    rareTypes: rareRows.results.length
      ? rareRows.results.map((item) => ({
          code: item.type_code,
          percent: formatPercent(item.completion_count, safeTotal),
          count: item.completion_count,
        }))
      : RARE_TYPES.map((item) => ({
          code: item.code,
          percent: item.percent,
          count: 0,
        })),
  };
}

export async function recordCompletion(typeCode: string, dna: string) {
  const db = await getDb();
  if (!db) {
    return;
  }

  const day = new Date().toISOString().slice(0, 10);

  await db.prepare(
    'INSERT INTO site_metrics (key, value) VALUES (?, 1) ON CONFLICT(key) DO UPDATE SET value = value + 1'
  ).bind('total_completions').run();

  await db.prepare(
    'INSERT INTO type_stats (type_code, completion_count, updated_at) VALUES (?, 1, ?) ON CONFLICT(type_code) DO UPDATE SET completion_count = completion_count + 1, updated_at = excluded.updated_at'
  ).bind(typeCode, Date.now()).run();

  await db.prepare(
    'INSERT INTO daily_stats (day, completion_count, updated_at) VALUES (?, 1, ?) ON CONFLICT(day) DO UPDATE SET completion_count = completion_count + 1, updated_at = excluded.updated_at'
  ).bind(day, Date.now()).run();

  await db.prepare(
    'INSERT INTO latest_results (dna, type_code, created_at) VALUES (?, ?, ?)'
  ).bind(dna, typeCode, Date.now()).run();
}

export async function recordShare(channel: string, typeCode?: string | null) {
  const db = await getDb();
  if (!db) {
    return;
  }

  const day = new Date().toISOString().slice(0, 10);
  const key = `share_${channel}`;

  await db.prepare(
    'INSERT INTO site_metrics (key, value) VALUES (?, 1) ON CONFLICT(key) DO UPDATE SET value = value + 1'
  ).bind(key).run();

  await db.prepare(
    'INSERT INTO site_metrics (key, value) VALUES (?, 1) ON CONFLICT(key) DO UPDATE SET value = value + 1'
  ).bind('total_shares').run();

  await db.prepare(
    'INSERT INTO daily_stats (day, share_count, updated_at) VALUES (?, 1, ?) ON CONFLICT(day) DO UPDATE SET share_count = share_count + 1, updated_at = excluded.updated_at'
  ).bind(day, Date.now()).run();

  if (typeCode) {
    await db.prepare(
      'INSERT INTO share_stats (channel, type_code, share_count, updated_at) VALUES (?, ?, 1, ?) ON CONFLICT(channel, type_code) DO UPDATE SET share_count = share_count + 1, updated_at = excluded.updated_at'
    ).bind(channel, typeCode, Date.now()).run();
  }
}

export async function recordCpReport(typeCodeA: string, typeCodeB: string, score: number) {
  const db = await getDb();
  if (!db) {
    return;
  }

  const day = new Date().toISOString().slice(0, 10);
  const ordered = [typeCodeA, typeCodeB].sort();
  const pairKey = ordered.join('__');

  await db.prepare(
    'INSERT INTO site_metrics (key, value) VALUES (?, 1) ON CONFLICT(key) DO UPDATE SET value = value + 1'
  ).bind('total_cp_reports').run();

  await db.prepare(
    'INSERT INTO daily_stats (day, cp_report_count, updated_at) VALUES (?, 1, ?) ON CONFLICT(day) DO UPDATE SET cp_report_count = cp_report_count + 1, updated_at = excluded.updated_at'
  ).bind(day, Date.now()).run();

  await db.prepare(
    'INSERT INTO cp_pair_stats (pair_key, type_code_a, type_code_b, report_count, total_score, updated_at) VALUES (?, ?, ?, 1, ?, ?) ON CONFLICT(pair_key) DO UPDATE SET report_count = report_count + 1, total_score = total_score + excluded.total_score, updated_at = excluded.updated_at'
  ).bind(pairKey, ordered[0], ordered[1], score, Date.now()).run();
}
