-- 0002_create_accounts.sql
-- Chart of Accounts table and related enums

-- Enable pgcrypto for UUID generation if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Account type enumerations
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'account_type') THEN
    CREATE TYPE account_type AS ENUM (
      'asset',
      'liability',
      'equity',
      'revenue',
      'expense',
      'other'
    );
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'normal_balance') THEN
    CREATE TYPE normal_balance AS ENUM ('debit','credit');
  END IF;
END$$;

CREATE TABLE IF NOT EXISTS accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NULL, -- optional multi-tenant / org separation
  code VARCHAR(64) NOT NULL, -- e.g., "1010", "4100"
  name VARCHAR(255) NOT NULL,
  type account_type NOT NULL DEFAULT 'other',
  normal_balance normal_balance NOT NULL DEFAULT 'debit',
  currency CHAR(3) DEFAULT 'USD',
  parent_account_id UUID NULL REFERENCES accounts(id) ON DELETE SET NULL,
  is_contra BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (organization_id, code),
  UNIQUE (organization_id, name)
);
