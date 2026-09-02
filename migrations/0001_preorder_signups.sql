CREATE TABLE IF NOT EXISTS preorder_signups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  region TEXT NOT NULL,
  email_confirmed INTEGER NOT NULL DEFAULT 1,
  consented_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_preorder_signups_region
ON preorder_signups(region);

PRAGMA optimize;
