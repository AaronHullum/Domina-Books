import { ledgerTransactions } from "../data/ledgerData";

export default function AccountRegister() {

  const transactions = ledgerTransactions.filter(
    (transaction) =>
      transaction.account === "1010 Checking Account"
  );
 

  return (
    <>
      <h1>Account Register</h1>

      <h2>1010 Checking Account</h2>

      <p>
        Beginning Balance: $125,000
      </p>

      <div
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "12px"
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
              <th>Balance</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t, i) => (
              <tr key={i}>
                <td>{t.date}</td>
                <td>{t.reference}</td>
                <td>{t.description}</td>
                <td>{t.debit}</td>
                <td>{t.credit}</td>
                <td>{t.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}