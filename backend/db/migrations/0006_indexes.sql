-- 0006_indexes.sql
-- Helpful indexes for typical queries and reporting

CREATE INDEX IF NOT EXISTS idx_accounts_org_code ON accounts (organization_id, code);
CREATE INDEX IF NOT EXISTS idx_accounts_org_name ON accounts (organization_id, name);

CREATE INDEX IF NOT EXISTS idx_journal_entries_org_date ON journal_entries (organization_id, date);
CREATE INDEX IF NOT EXISTS idx_journal_entries_ref ON journal_entries (reference);

CREATE INDEX IF NOT EXISTS idx_journal_lines_journal ON journal_lines (journal_entry_id);
CREATE INDEX IF NOT EXISTS idx_journal_lines_account ON journal_lines (account_id);
CREATE INDEX IF NOT EXISTS idx_journal_lines_account_journal ON journal_lines (account_id, journal_entry_id);
