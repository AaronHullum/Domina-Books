import { useEffect, useState } from "react";
import api from "../api/api";

function Banking() {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [accountName, setAccountName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  async function loadData() {
    try {
      const accountsResponse =
        await api.get(
          "/banking/1/accounts"
        );

      const transactionsResponse =
        await api.get(
          "/banking/1/transactions"
        );

      setAccounts(
        accountsResponse.data.accounts || []
      );

      setTransactions(
        transactionsResponse.data.transactions || []
      );
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function addAccount(e) {
    e.preventDefault();

    try {
      await api.post(
        "/banking/1/accounts",
        {
          accountName,
          bankName,
          accountNumber
        }
      );

      setAccountName("");
      setBankName("");
      setAccountNumber("");

      loadData();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ padding: "32px" }}>
      <h1>Banking</h1>

      <form onSubmit={addAccount}>
        <div>
          <input
            placeholder="Account Name"
            value={accountName}
            onChange={(e) =>
              setAccountName(e.target.value)
            }
          />
        </div>

        <br />

        <div>
          <input
            placeholder="Bank Name"
            value={bankName}
            onChange={(e) =>
              setBankName(e.target.value)
            }
          />
        </div>

        <br />

        <div>
          <input
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) =>
              setAccountNumber(e.target.value)
            }
          />
        </div>

        <br />

        <button type="submit">
          Add Bank Account
        </button>
      </form>

      <hr />

      <h2>Bank Accounts</h2>

      {accounts.map((account) => (
        <div
          key={account.id}
          style={{
            border: "1px solid #ddd",
            padding: "12px",
            marginBottom: "10px"
          }}
        >
          <strong>
            {account.account_name}
          </strong>

          <div>
            Bank: {account.bank_name}
          </div>

          <div>
            Account #: {account.account_number}
          </div>
        </div>
      ))}

      <hr />

      <h2>Recent Transactions</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.id}</td>
              <td>{tx.transaction_type}</td>
              <td>{tx.amount_cents}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Banking;