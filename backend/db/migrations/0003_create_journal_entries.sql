-- 0003_create_journal_entries.sql
-- Journal header table

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'journal_status') THEN
    CREATE TYPE journal_status AS ENUM (
      'draft',      -- being edited
      'submitted',  -- awaiting approval
      'approved',   -- approved but maybe not yet posted, optional
      'posted',     -- posted to ledger (authoritative)
      'reversed',   -- reversed
      'void'        -- voided / cancelled
    );
  END IF;
END$$;

CREATE TABLE IF NOT EXISTS journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NULL,
  reference VARCHAR(128), -- e.g., "JE-1001"
  date DATE NOT NULL, -- accounting date of the journal
  description TEXT,
  status journal_status NOT NULL DEFAULT 'draft',
  source VARCHAR(128), -- origin (import, ui, bank, adjustment)
  created_by UUID NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  posted_at TIMESTAMP WITH TIME ZONE NULL,
  posted_by UUID NULL,
  metadata JSONB DEFAULT '{}'::jsonb
);
