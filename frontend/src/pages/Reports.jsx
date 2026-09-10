import { useEffect, useState } from "react";
import api from "../api/api";

function Reports() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    loadReport();
  }, []);

  async function loadReport() {
    try {
      const response =
        await api.get(
          "/reports/1/trial-balance"
        );

      setAccounts(
        response.data.accounts || []
      );
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ padding: "32px" }}>
      <h1>Reports</h1>

      <h2>Trial Balance</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >
        <thead>
          <tr>
            <th>Code</th>
            <th>Account</th>
            <th>Type</th>
            <th>Debits</th>
            <th>Credits</th>
          </tr>
        </thead>

        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.code}</td>
              <td>{account.name}</td>
              <td>{account.account_type}</td>
              <td>{account.debits}</td>
              <td>{account.credits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reports;