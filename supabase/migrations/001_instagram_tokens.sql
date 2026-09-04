-- Migration: create instagram_tokens table for per-user token persistence.
-- Run this in the Supabase SQL Editor before going live.

CREATE TABLE IF NOT EXISTS instagram_tokens (
  id                  BIGSERIAL PRIMARY KEY,
  instagram_user_id   TEXT NOT NULL UNIQUE,
  access_token        TEXT NOT NULL,
  token_type          TEXT DEFAULT 'bearer',
  expires_at          TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_instagram_tokens_user_id
  ON instagram_tokens (instagram_user_id);

-- Auto-update updated_at on every row update.
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_instagram_tokens_updated_at ON instagram_tokens;
CREATE TRIGGER trg_instagram_tokens_updated_at
  BEFORE UPDATE ON instagram_tokens
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();