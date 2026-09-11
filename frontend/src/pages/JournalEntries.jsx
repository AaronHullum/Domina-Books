import { useState } from "react";

export default function JournalEntries() {
  const [entries] = useState([
    {
      date: "09/11/2026",
      reference: "JE-1001",
      memo: "Rent Payment",
      debit: "$1,500",
      credit: "$1,500"
    },
    {
      date: "09/10/2026",
      reference: "JE-1002",
      memo: "Mortgage Payment",
      debit: "$850",
      credit: "$850"
    }
  ]);

  return (
    <>
      <h1>Journal Entries</h1>

      <div
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "20px"
        }}
      >
        <h2>New Journal Entry</h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px"
          }}
        >
          <input placeholder="Date" />
          <input placeholder="Reference" />
          <input placeholder="Memo" />
        </div>

        <h3>Journal Lines</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "80px 2fr 1fr 1fr",
            gap: "10px",
            fontWeight: "bold",
            marginBottom: "10px"
          }}
        >
          <div>Line</div>
          <div>Account</div>
          <div>Debit</div>
          <div>Credit</div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "80px 2fr 1fr 1fr",
            gap: "10px",
            marginBottom: "20px"
          }}
        >
          <input value="1" readOnly />
          <input placeholder="Account" />
          <input placeholder="Debit" />
          <input placeholder="Credit" />

          <input value="2" readOnly />
          <input placeholder="Account" />
          <input placeholder="Debit" />
          <input placeholder="Credit" />
        </div>

        <button>Create Entry</button>

        <button
          style={{
            marginLeft: "10px",
            background: "#16a34a",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Post Entry
        </button>

        <div style={{ marginTop: "20px" }}>
          <strong>Total Debits:</strong> $1,500
        </div>

        <div>
          <strong>Total Credits:</strong> $1,500
        </div>

        <div
          style={{
            background: "#dcfce7",
            color: "#166534",
            padding: "12px",
            borderRadius: "8px",
            marginTop: "10px",
            fontWeight: "bold",
            display: "inline-block"
          }}
        >
          ✓ Entry Balanced
        </div>

        <h3 style={{ marginTop: "20px" }}>
          Posting Preview
        </h3>

        <div
          style={{
            background: "#f8fafc",
            padding: "15px",
            borderRadius: "8px"
          }}
        >
          <p>DR 1010 Checking Account ............ $1,500</p>
          <p>CR 4100 Rental Income ............... $1,500</p>
        </div>
      </div>

      <div
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "12px"
        }}
      >
        <h2>Recent Entries</h2>

        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Reference</th>
              <th>Memo</th>
              <th>Debits</th>
              <th>Credits</th>
            </tr>
          </thead>

          <tbody>
            {entries.map((entry) => (
              <tr key={entry.reference}>
                <td>{entry.date}</td>
                <td>{entry.reference}</td>
                <td>{entry.memo}</td>
                <td>{entry.debit}</td>
                <td>{entry.credit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}