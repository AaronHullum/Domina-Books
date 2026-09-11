import { createContext, useContext, useEffect, useState } from "react";
import accountingService from "../api/accountingService";
import { DEFAULT_COMPANY_ID } from "../api/apiClient";

const AccountingContext = createContext();

export function AccountingProvider({ children }) {
  const [accounts, setAccounts] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [generalLedger, setGeneralLedger] = useState([]);
  const [trialBalance, setTrialBalance] = useState([]);
  const [financialStatements, setFinancialStatements] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadAll() {
    setLoading(true);
    try {
      const [accs, entries, ledger, tb, fin] = await Promise.all([
        accountingService.getAccounts(DEFAULT_COMPANY_ID),
        accountingService.getJournalEntries(DEFAULT_COMPANY_ID),
        accountingService.getGeneralLedger(DEFAULT_COMPANY_ID),
        accountingService.getTrialBalance(DEFAULT_COMPANY_ID),
        accountingService.getFinancialStatements(DEFAULT_COMPANY_ID)
      ]);

      setAccounts(accs || []);
      setJournalEntries(entries || []);
      setGeneralLedger(ledger || []);
      setTrialBalance(tb || []);
      setFinancialStatements(fin || null);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function refreshJournalEntries() {
    const entries = await accountingService.getJournalEntries(DEFAULT_COMPANY_ID);
    setJournalEntries(entries || []);
  }

  async function refreshGeneralLedger() {
    const ledger = await accountingService.getGeneralLedger(DEFAULT_COMPANY_ID);
    setGeneralLedger(ledger || []);
  }

  async function refreshTrialBalance() {
    const tb = await accountingService.getTrialBalance(DEFAULT_COMPANY_ID);
    setTrialBalance(tb || []);
  }

  async function refreshFinancialStatements() {
    const fin = await accountingService.getFinancialStatements(DEFAULT_COMPANY_ID);
    setFinancialStatements(fin || null);
  }

  // payload: { entryDate, reference, description, lines: [{ accountId, debit (dollars), credit (dollars) }] }
  async function createJournalEntry({ entryDate, reference, description, lines }) {
    // convert dollars -> cents for backend
    const payload = {
      entryDate,
      reference,
      description,
      lines: lines.map((l) => ({
        accountId: l.accountId,
        debitCents: Math.round((Number(l.debit) || 0) * 100),
        creditCents: Math.round((Number(l.credit) || 0) * 100)
      }))
    };

    const res = await accountingService.postJournalEntry(DEFAULT_COMPANY_ID, payload);

    // Refresh data
    await Promise.all([refreshJournalEntries(), refreshGeneralLedger(), refreshTrialBalance(), refreshFinancialStatements()]);

    return res;
  }

  function getAccountBalanceByCode(accountCode) {
    // authoritative: use trialBalance
    const row = (trialBalance || []).find((r) => r.code === accountCode || `${r.code} ${r.name}` === accountCode);
    if (row) {
      // balance as debits - credits
      return Number(( (row.debits || 0) - (row.credits || 0) ).toFixed(2));
    }

    // fallback to generalLedger
    const rows = generalLedger.filter((r) => r.accountCode === accountCode);
    const balance = rows.reduce((s, r) => s + (r.debit - r.credit), 0);
    return Number(balance.toFixed(2));
  }

  return (
    <AccountingContext.Provider
      value={{
        accounts,
        journalEntries,
        generalLedger,
        trialBalance,
        financialStatements,
        loading,
        error,
        createJournalEntry,
        refreshJournalEntries,
        refreshGeneralLedger,
        refreshTrialBalance,
        refreshFinancialStatements,
        getAccountBalanceByCode
      }}
    >
      {children}
    </AccountingContext.Provider>
  );
}

export function useAccounting() {
  return useContext(AccountingContext);
}
