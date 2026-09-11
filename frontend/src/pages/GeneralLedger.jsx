import { useAccounting } from "../context/AccountingContext";

export default function GeneralLedger() {
  const { generalLedger, loading, error } = useAccounting();

  return (
    <>
      <h1>General Ledger</h1>

      <div
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "12px"
        }}
      >
        {loading && <div>Loading ledger...</div>}
        {error && <div style={{ color: "red" }}>{error.message || String(error)}</div>}

        {(generalLedger || []).length === 0 && !loading ? (
          <div>No ledger transactions found.</div>
        ) : (
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Reference</th>
                <th>Account</th>
                <th>Description</th>
                <th>Debit</th>
                <th>Credit</th>
                <th>Balance</th>
              </tr>
            </thead>

            <tbody>
              {(generalLedger || []).map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.entryDate}</td>
                  <td>{transaction.journalId}</td>
                  <td>{`${transaction.accountCode} ${transaction.accountName}`}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.debit ? `$${transaction.debit.toFixed(2)}` : ""}</td>
                  <td>{transaction.credit ? `$${transaction.credit.toFixed(2)}` : ""}</td>
                  <td>{""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
