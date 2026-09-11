export default function Accounting() {
  const cards = [
    { title: "Cash Balance", value: "$125,000" },
    { title: "Accounts Receivable", value: "$18,500" },
    { title: "Accounts Payable", value: "$6,200" },
    { title: "Net Income", value: "$42,750" },

    { title: "Inventory Value", value: "$85,400" },
    { title: "Properties", value: "12" },
    { title: "Unreconciled Items", value: "7" },
    { title: "Open Journal Entries", value: "14" }
];

const accounts = [
  { number: "1010", name: "Checking Account", type: "Asset" },
  { number: "1100", name: "Accounts Receivable", type: "Asset" },
  { number: "1200", name: "Inventory", type: "Asset" },
  { number: "2050", name: "Mortgage Payable", type: "Liability" },
  { number: "4100", name: "Rental Income", type: "Income" },
  { number: "6100", name: "Repairs Expense", type: "Expense" }
];
  

  return (
    <>
      <h1>Accounting</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,.1)"
            }}
          >
            <h3>{card.title}</h3>
            <h2>{card.value}</h2>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: "40px" }}>
        Quick Actions
      </h2>

      <div style={{ display: "flex", gap: "10px" }}>
        <button>New Journal Entry</button>
        <button>Add Account</button>
        <button>Reconcile Account</button>
        <button>Property Dashboard</button>
      </div>
<h2 style={{ marginTop: "40px" }}>
  Financial Activity
</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "20px"
  }}
>
  <div
    style={{
      background: "#ffffff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,.1)"
    }}
  >
    <h3>Revenue This Month</h3>
    <h1>$42,500</h1>
  </div>

  <div
    style={{
      background: "#ffffff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,.1)"
    }}
  >
    <h3>Expenses This Month</h3>
    <h1>$18,200</h1>
  </div>

  <div
    style={{
      background: "#ffffff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,.1)"
    }}
  >
    <h3>Cash Flow</h3>
    <h1 style={{ color: "green" }}>
      +$24,300
    </h1>
  </div>
</div>

<h2 style={{ marginTop: "40px" }}>
  Recent Accounts
</h2>

<div
  style={{
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,.1)",
    marginTop: "20px"
  }}
>
  <table style={{ width: "100%" }}>
    <thead>
      <tr>
        <th>Account #</th>
        <th>Name</th>
        <th>Type</th>
      </tr>
    </thead>

    <tbody>
      {accounts.map((account) => (
        <tr key={account.number}>
          <td>{account.number}</td>
          <td>{account.name}</td>
          <td>{account.type}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </>
  );
}