import { useEffect, useState } from "react";
import api from "../api/api";

function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await api.get("/dashboard/1/dashboard");
        setData(response.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load dashboard data.");
      }
    }

    loadDashboard();
  }, []);

  if (error) {
    return (
      <div style={{ padding: "32px" }}>
        <h1>Dashboard</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ padding: "32px" }}>
        <h1>Dashboard</h1>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const cards = [
    { label: "Customers", value: data.customers ?? 0 },
    { label: "Vendors", value: data.vendors ?? 0 },
    { label: "Invoices", value: data.invoices ?? 0 },
    { label: "Bills", value: data.bills ?? 0 },
  ];

  return (
    <div style={{ padding: "32px" }}>
      <h1>Dashboard</h1>
      <p>Welcome to DominaBooks ERP.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "20px",
          marginTop: "28px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.label}
            style={{
              padding: "24px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              background: "#fff",
            }}
          >
            <div style={{ fontSize: "14px" }}>{card.label}</div>
            <div
              style={{
                fontSize: "32px",
                fontWeight: "700",
                marginTop: "8px",
              }}
            >
              {card.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
