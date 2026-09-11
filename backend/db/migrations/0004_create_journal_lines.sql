-- 0004_create_journal_lines.sql
-- Lines for each journal entry

CREATE TABLE IF NOT EXISTS journal_lines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  journal_entry_id UUID NOT NULL REFERENCES journal_entries(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
  description TEXT,
  amount NUMERIC(20,4) NOT NULL CHECK (amount > 0), -- positive amount
  is_debit BOOLEAN NOT NULL DEFAULT TRUE,
  tax_amount NUMERIC(20,4) NULL,
  reference VARCHAR(128) NULL,
  line_number INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Ensure a journal can have multiple lines, line_number can be used for ordering.
