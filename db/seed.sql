INSERT INTO site_metrics (key, value)
VALUES ('total_completions', 16790)
ON CONFLICT(key) DO UPDATE SET value = MAX(site_metrics.value, excluded.value);

INSERT INTO type_stats (type_code, completion_count, updated_at)
VALUES
  ('LOVE-R', 1830, strftime('%s', 'now') * 1000),
  ('SEXY', 1578, strftime('%s', 'now') * 1000),
  ('MALO', 1142, strftime('%s', 'now') * 1000),
  ('OJBK', 823, strftime('%s', 'now') * 1000),
  ('ATM-er', 756, strftime('%s', 'now') * 1000),
  ('HHHH', 0, strftime('%s', 'now') * 1000),
  ('IMFW', 50, strftime('%s', 'now') * 1000),
  ('POOR', 101, strftime('%s', 'now') * 1000)
ON CONFLICT(type_code) DO UPDATE SET
  completion_count = MAX(type_stats.completion_count, excluded.completion_count),
  updated_at = excluded.updated_at;
