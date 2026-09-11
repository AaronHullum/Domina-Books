import { ledgerTransactions } from "../data/ledgerData";


export default function GeneralLedger() {
  const transactions = ledgerTransactions;


  

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
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.reference}</td>
                <td>{transaction.account}</td>
                <td>{transaction.description}</td>
                <td>{transaction.debit}</td>
                <td>{transaction.credit}</td>
                <td>{transaction.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}