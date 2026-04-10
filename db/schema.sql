CREATE TABLE IF NOT EXISTS site_metrics (
  key TEXT PRIMARY KEY,
  value INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS type_stats (
  type_code TEXT PRIMARY KEY,
  completion_count INTEGER NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS daily_stats (
  day TEXT PRIMARY KEY,
  completion_count INTEGER NOT NULL DEFAULT 0,
  share_count INTEGER NOT NULL DEFAULT 0,
  cp_report_count INTEGER NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS share_stats (
  channel TEXT NOT NULL,
  type_code TEXT NOT NULL,
  share_count INTEGER NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (channel, type_code)
);

CREATE TABLE IF NOT EXISTS cp_pair_stats (
  pair_key TEXT PRIMARY KEY,
  type_code_a TEXT NOT NULL,
  type_code_b TEXT NOT NULL,
  report_count INTEGER NOT NULL DEFAULT 0,
  total_score INTEGER NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS latest_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dna TEXT NOT NULL,
  type_code TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
