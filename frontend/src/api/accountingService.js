import api, { DEFAULT_COMPANY_ID } from "./apiClient";

function centsToDollars(cents) {
  if (cents === null || cents === undefined) return 0;
  return Number((cents / 100).toFixed(2));
}

function dollarsToCents(dollars) {
  if (dollars === null || dollars === undefined) return 0;
  // ensure numeric input
  const n = Number(dollars) || 0;
  return Math.round(n * 100);
}

function normalizeAccount(row) {
  if (!row) return null;
  return {
    id: row.id,
    companyId: row.company_id,
    code: row.code,
    name: row.name,
    accountType: row.account_type,
    normalBalance: row.normal_balance,
    active: !!row.active,
    metadata: row.metadata || null
  };
}

function normalizeJournalEntry(row) {
  if (!row) return null;
  return {
    id: row.id,
    companyId: row.company_id,
    entryDate: row.entry_date,
    reference: row.reference,
    description: row.description,
    status: row.status,
    createdAt: row.created_at
  };
}

function normalizeLedgerRow(row) {
  if (!row) return null;
  return {
    journalId: row.id,
    entryDate: row.entry_date,
    description: row.description,
    accountCode: row.code,
    accountName: row.name,
    debitCents: row.debit_cents || 0,
    creditCents: row.credit_cents || 0,
    debit: centsToDollars(row.debit_cents || 0),
    credit: centsToDollars(row.credit_cents || 0)
  };
}

export async function getAccounts(companyId = DEFAULT_COMPANY_ID) {
  const res = await api.get(`/companies/${companyId}/accounts`);
  const rows = res.data.accounts || [];
  return rows.map(normalizeAccount);
}

export async function getJournalEntries(companyId = DEFAULT_COMPANY_ID) {
  const res = await api.get(`/companies/${companyId}/journal-entries`);
  const rows = res.data.entries || [];
  return rows.map(normalizeJournalEntry);
}

// Accepts payload where lines already include accountId and debitCents/creditCents (integers)
export async function postJournalEntry(companyId = DEFAULT_COMPANY_ID, payload) {
  // payload should match backend expectations: entryDate, reference, description, lines[{accountId, debitCents, creditCents}]
  const res = await api.post(`/companies/${companyId}/journal-entries`, payload);
  return res.data;
}

export async function getGeneralLedger(companyId = DEFAULT_COMPANY_ID) {
  const res = await api.get(`/reports/${companyId}/general-ledger`);
  const rows = res.data.ledger || [];
  return rows.map(normalizeLedgerRow);
}

export async function getTrialBalance(companyId = DEFAULT_COMPANY_ID) {
  // Use the backend trial-balance endpoint (returns debits/credits in cents)
  const res = await api.get(`/reports/${companyId}/trial-balance`);
  const rows = res.data.accounts || [];
  // Convert cents -> dollars
  return rows.map((r) => ({
    id: r.id,
    code: r.code,
    name: r.name,
    accountType: r.account_type,
    debits: centsToDollars(r.debits || 0),
    credits: centsToDollars(r.credits || 0)
  }));
}

export async function getFinancialStatements(companyId = DEFAULT_COMPANY_ID) {
  const res = await api.get(`/reports/${companyId}/financial-statements`);
  const data = res.data || {};

  // backend computes sums in cents; convert to dollars for display
  const pnl = data.profitAndLoss || {};
  const bs = data.balanceSheet || {};

  return {
    profitAndLoss: {
      revenue: centsToDollars(pnl.revenue || 0),
      expenses: centsToDollars(pnl.expenses || 0),
      netIncome: centsToDollars(pnl.netIncome || 0)
    },
    balanceSheet: {
      assets: centsToDollars(bs.assets || 0),
      liabilities: centsToDollars(bs.liabilities || 0),
      equity: centsToDollars(bs.equity || 0)
    }
  };
}

export { centsToDollars, dollarsToCents };

export default {
  getAccounts,
  getJournalEntries,
  postJournalEntry,
  getGeneralLedger,
  getTrialBalance,
  getFinancialStatements,
  centsToDollars,
  dollarsToCents
};
