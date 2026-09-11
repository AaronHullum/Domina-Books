-- 0005_triggers_constraints.sql
-- Functions and triggers to enforce accounting invariants:
--  - journal must balance before being posted (sum of debits == sum of credits)
--  - prevent deleting/modifying posted journals/lines in invalid ways
--  - prevent zero-amount journal lines (handled by CHECK in journal_lines)

-- Function to compute signed sum for a journal
CREATE OR REPLACE FUNCTION fn_journal_signed_balance(journal_uuid UUID)
RETURNS NUMERIC AS $$
DECLARE
  signed_sum NUMERIC := 0;
BEGIN
  SELECT COALESCE(SUM(CASE WHEN is_debit THEN amount ELSE -amount END), 0)
  INTO signed_sum
  FROM journal_lines
  WHERE journal_entry_id = journal_uuid;

  RETURN signed_sum;
END;
$$ LANGUAGE plpgsql STABLE;

-- Trigger function to validate when a journal is being set to "posted"
CREATE OR REPLACE FUNCTION trg_validate_journal_before_post()
RETURNS TRIGGER AS $$
DECLARE
  balance NUMERIC;
BEGIN
  -- Only validate when status is transitioning to 'posted'
  IF (TG_OP = 'INSERT' AND NEW.status = 'posted')
     OR (TG_OP = 'UPDATE' AND NEW.status = 'posted' AND (OLD.status IS DISTINCT FROM NEW.status)) THEN

    balance := fn_journal_signed_balance(NEW.id);

    IF balance <> 0 THEN
      RAISE EXCEPTION 'Cannot post journal %: journal is not balanced (signed sum = %). Debits must equal credits.', NEW.id, balance;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to journal_entries BEFORE INSERT OR UPDATE
DROP TRIGGER IF EXISTS journal_post_validation ON journal_entries;
CREATE TRIGGER journal_post_validation
BEFORE INSERT OR UPDATE ON journal_entries
FOR EACH ROW EXECUTE FUNCTION trg_validate_journal_before_post();

-- Prevent deletion of posted journals
CREATE OR REPLACE FUNCTION trg_prevent_delete_posted_journal()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status = 'posted' THEN
    RAISE EXCEPTION 'Cannot delete journal % because it is posted.', OLD.id;
  END IF;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS prevent_delete_posted_journal ON journal_entries;
CREATE TRIGGER prevent_delete_posted_journal
BEFORE DELETE ON journal_entries
FOR EACH ROW EXECUTE FUNCTION trg_prevent_delete_posted_journal();

-- Prevent modification of journal lines that would affect posted journals
CREATE OR REPLACE FUNCTION trg_prevent_modifying_lines_on_posted_journal()
RETURNS TRIGGER AS $$
DECLARE
  je_status journal_status;
BEGIN
  SELECT status INTO je_status FROM journal_entries WHERE id = NEW.journal_entry_id FOR SHARE;

  IF je_status = 'posted' THEN
    RAISE EXCEPTION 'Cannot insert/update journal line because parent journal % is posted.', NEW.journal_entry_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS prevent_modifying_lines_on_posted_journal ON journal_lines;
CREATE TRIGGER prevent_modifying_lines_on_posted_journal
BEFORE INSERT OR UPDATE ON journal_lines
FOR EACH ROW EXECUTE FUNCTION trg_prevent_modifying_lines_on_posted_journal();

-- Prevent deletion of lines from posted journals
CREATE OR REPLACE FUNCTION trg_prevent_deleting_lines_on_posted_journal()
RETURNS TRIGGER AS $$
DECLARE
  je_status journal_status;
BEGIN
  SELECT status INTO je_status FROM journal_entries WHERE id = OLD.journal_entry_id FOR SHARE;

  IF je_status = 'posted' THEN
    RAISE EXCEPTION 'Cannot delete journal line % because parent journal % is posted.', OLD.id, OLD.journal_entry_id;
  END IF;

  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS prevent_deleting_lines_on_posted_journal ON journal_lines;
CREATE TRIGGER prevent_deleting_lines_on_posted_journal
BEFORE DELETE ON journal_lines
FOR EACH ROW EXECUTE FUNCTION trg_prevent_deleting_lines_on_posted_journal();
