-- 0001_seed_default_coa.sql
-- Default Chart of Accounts seed data. Adjust organization_id as needed (NULL = global).
-- This seed uses gen_random_uuid() for IDs so re-running will create new UUIDs.
-- To produce deterministic IDs, replace gen_random_uuid() with fixed UUID literals.

-- Assets
INSERT INTO accounts (id, organization_id, code, name, type, normal_balance, currency, is_active, created_at, updated_at)
VALUES
  (gen_random_uuid(), NULL, '1000', 'Assets', 'asset', 'debit', 'USD', TRUE, now(), now()),
  (gen_random_uuid(), NULL, '1010', 'Checking Account', 'asset', 'debit', 'USD', TRUE, now(), now()),
  (gen_random_uuid(), NULL, '1020', 'Accounts Receivable', 'asset', 'debit', 'USD', TRUE, now(), now()),
  (gen_random_uuid(), NULL, '1200', 'Prepaid Expenses', 'asset', 'debit', 'USD', TRUE, now(), now());

-- Liabilities
INSERT INTO accounts (id, organization_id, code, name, type, normal_balance, currency, is_active, created_at, updated_at)
VALUES
  (gen_random_uuid(), NULL, '2000', 'Liabilities', 'liability', 'credit', 'USD', TRUE, now(), now()),
  (gen_random_uuid(), NULL, '2100', 'Accounts Payable', 'liability', 'credit', 'USD', TRUE, now(), now()),
  (gen_random_uuid(), NULL, '2200', 'Accrued Expenses', 'liability', 'credit', 'USD', TRUE, now(), now()),
  (gen_random_uuid(), NULL, '2300', 'Tax Payable', 'liability', 'credit', 'USD', TRUE, now(), now());

-- Equity
INSERT INTO accounts (id, organization_id, code, name, type, normal_balance, currency, is_active, created_at, updated_at)
VALUES
  (gen_random_uuid(), NULL, '3000', 'Owner''s Equity', 'equity', 'credit', 'USD', TRUE, now(), now()),
  (gen_random_uuid(), NULL, '3100', 'Retained Earnings', 'equity', 'credit', 'USD', TRUE, now(), now());

-- Revenue
INSERT INTO accounts (id, organization_id, code, name, type, normal_balance, currency, is_active, created_at, updated_at)
VALUES
  (gen_random_uuid(), NULL, '4000', 'Revenue', 'revenue', 'credit', 'USD', TRUE, now(), now()),
  (gen_random_uuid(), NULL, '4100', 'Rental Income', 'revenue', 'credit', 'USD', TRUE, now(), now());

-- Expenses
INSERT INTO accounts (id, organization_id, code, name, type, normal_balance, currency, is_active, created_at, updated_at)
VALUES
  (gen_random_uuid(), NULL, '5000', 'Expenses', 'expense', 'debit', 'USD', TRUE, now(), now()),
  (gen_random_uuid(), NULL, '5100', 'Repairs & Maintenance', 'expense', 'debit', 'USD', TRUE, now(), now()),
  (gen_random_uuid(), NULL, '5200', 'Utilities', 'expense', 'debit', 'USD', TRUE, now(), now());

-- Example: insert an explicit account used by the frontend sample data
INSERT INTO accounts (id, organization_id, code, name, type, normal_balance, currency, is_active, created_at, updated_at)
VALUES
  (gen_random_uuid(), NULL, '1010-CHK', '1010 Checking Account', 'asset', 'debit', 'USD', TRUE, now(), now()),
  (gen_random_uuid(), NULL, '4100-RI', '4100 Rental Income', 'revenue', 'credit', 'USD', TRUE, now(), now());
