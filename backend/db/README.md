# Database migrations & seeds (DominaBooks)

What these files do
- Migrations (backend/db/migrations) create the core accounting schema:
  - accounts
  - journal_entries
  - journal_lines
  - triggers and basic indexes
- Seeds (backend/db/seeds) contain a default Chart of Accounts (COA).

How to run the migrations (simple psql example)
1. Create database and user, e.g.:
   createdb dominabooks_dev
   psql -d dominabooks_dev -c "CREATE EXTENSION IF NOT EXISTS pgcrypto;"

2. Run SQL files in numeric order:
   psql -d dominabooks_dev -f backend/db/migrations/0002_create_accounts.sql
   psql -d dominabooks_dev -f backend/db/migrations/0003_create_journal_entries.sql
   psql -d dominabooks_dev -f backend/db/migrations/0004_create_journal_lines.sql
   psql -d dominabooks_dev -f backend/db/migrations/0005_triggers_constraints.sql
   psql -d dominabooks_dev -f backend/db/migrations/0006_indexes.sql

3. Seed COA:
   psql -d dominabooks_dev -f backend/db/seeds/0001_seed_default_coa.sql

Notes & next steps
- These SQL files are intentionally minimal but include key invariants (balancing trigger, posted-state protections).
- Next tasks:
  - Add fiscal_periods and posting_batches tables (to support period locking).
  - Integrate with backend service APIs (endpoints for creating journal entries, adding lines, posting).
  - Add migration tooling (Flyway, Sqitch, Prisma Migrate, or a small Node/Knex migration layer).
- If you prefer deterministic seed IDs (for tests), replace gen_random_uuid() with fixed UUID literals.
