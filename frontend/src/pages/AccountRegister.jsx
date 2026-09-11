import { useState } from "react";
import { useAccounting } from "../context/AccountingContext";

export default function AccountRegister() {
  const { accounts, trialBalance, generalLedger, loading, error } = useAccounting();

  const [selectedAccountId, setSelectedAccountId] = useState(() => (accounts && accounts[0] ? accounts[0].id : null));

  // keep selectedAccountId in sync if accounts load
  if (!selectedAccountId && accounts && accounts[0]) {
    setSelectedAccountId(accounts[0].id);
  }

  const selectedAccount = (accounts || []).find((a) => a.id === selectedAccountId) || null;
  const accountCode = selectedAccount ? selectedAccount.code : null;

  // Use trialBalance as authoritative source
  const tbRow = (trialBalance || []).find((r) => r.code === accountCode);
  const balance = tbRow ? Number(((tbRow.debits || 0) - (tbRow.credits || 0)).toFixed(2)) : null;

  const accountTransactions = (generalLedger || []).filter((t) => accountCode && t.accountCode === accountCode);

  return (
    <>
      <h1>Account Register</h1>

      <div style={{ marginBottom: 16 }}>
        <label>Select account: </label>
        <select value={selectedAccountId || ""} onChange={(e) => setSelectedAccountId(Number(e.target.value))}>
          {(accounts || []).map((a) => (
            <option key={a.id} value={a.id}>{`${a.code} ${a.name}`}</option>
          ))}
        </select>
      </div>

      {loading && <div>Loading account data...</div>}
      {error && <div style={{ color: "red" }}>{error.message || String(error)}</div>}

      <h2>{selectedAccount ? `${selectedAccount.code} ${selectedAccount.name}` : "Account"}</h2>

      <p>Current Balance: {balance !== null ? `$${balance.toFixed(2)}` : "N/A"}</p>

      <div
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "12px"
        }}
      >
        {(accountTransactions || []).length === 0 ? (
          <div>No transactions for this account.</div>
        ) : (
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Reference</th>
                <th>Description</th>
                <th>Debit</th>
                <th>Credit</th>
              </tr>
            </thead>

            <tbody>
              {accountTransactions.map((t, i) => (
                <tr key={i}>
                  <td>{t.entryDate}</td>
                  <td>{t.journalId}</td>
                  <td>{t.description}</td>
                  <td>{t.debit ? `$${t.debit.toFixed(2)}` : ""}</td>
                  <td>{t.credit ? `$${t.credit.toFixed(2)}` : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
