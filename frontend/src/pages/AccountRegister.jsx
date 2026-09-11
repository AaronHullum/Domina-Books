import { useAccounting } from "../context/AccountingContext";

export default function AccountRegister() {
  const { transactions } = useAccounting();

  const accountName = "1010 Checking Account";

  const accountTransactions = transactions.filter(
    (t) => t.account === accountName
  );

  const balance = accountTransactions.reduce(
    (total, t) => total + (t.debit || 0) - (t.credit || 0),
    0
  );

  return (
    <>
      <h1>Account Register</h1>

      <h2>{accountName}</h2>

      <p>
        Current Balance: ${balance}
      </p>

      <div
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
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
                <td>{t.date}</td>
                <td>{t.reference}</td>
                <td>{t.description}</td>
                <td>{t.debit}</td>
                <td>{t.credit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}