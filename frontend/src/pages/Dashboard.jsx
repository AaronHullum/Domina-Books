import { useEffect, useState } from "react";
import api from "../api/api";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response =
          await api.get(
            "/dashboard/1/dashboard"
          );

        setData(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    loadDashboard();
  }, []);

  if (!data) {
    return (
      <div style={{ padding: "32px" }}>
        <h1>Executive Dashboard</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "32px" }}>
      <h1>Executive Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        <div className="card">
          <h3>Customers</h3>
          <h1>{data.customers}</h1>
        </div>

        <div className="card">
          <h3>Vendors</h3>
          <h1>{data.vendors}</h1>
        </div>

        <div className="card">
          <h3>Invoices</h3>
          <h1>{data.invoices}</h1>
        </div>

        <div className="card">
          <h3>Bills</h3>
          <h1>{data.bills}</h1>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          marginTop: "24px"
        }}
      >
        <div className="card">
          <h2>Business Overview</h2>

          <div
            style={{
              height: "250px",
              background: "#f3f4f6",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            Financial Chart Coming Soon
          </div>
        </div>

        <div className="card">
          <h2>Quick Actions</h2>

          <button>
            Add Customer
          </button>

          <br /><br />

          <button>
            Add Vendor
          </button>

          <br /><br />

          <button>
            Create Purchase Order
          </button>

          <br /><br />

          <button>
            Create Sales Order
          </button>
        </div>
      </div>

      <div
        className="card"
        style={{
          marginTop: "24px"
        }}
      >
        <h2>Recent Activity</h2>

        <p>✅ Customer Added</p>
        <p>✅ Vendor Added</p>
        <p>✅ Asset Added</p>
        <p>✅ Purchase Order Created</p>
      </div>
    </div>
  );
}

export default Dashboard;