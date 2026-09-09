import { Link } from "react-router-dom";

const navigation = [
  { label: "Dashboard", path: "/" },
  { label: "Customers", path: "/customers" },
  { label: "Vendors", path: "/vendors" },
  { label: "Banking", path: "/banking" },
  { label: "Inventory", path: "/inventory" },
  { label: "Purchasing", path: "/purchasing" },
  { label: "Sales", path: "/sales" },
  { label: "Assets", path: "/assets" },
  { label: "Reports", path: "/reports" },
];

function Sidebar() {
  return (
    <aside
      style={{
        width: "240px",
        padding: "24px 16px",
        borderRight: "1px solid #ddd",
        background: "#f8f9fa",
        boxSizing: "border-box",
      }}
    >
      <div style={{ fontSize: "22px", fontWeight: "700", marginBottom: "28px" }}>
        DominaBooks
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {navigation.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              padding: "10px 12px",
              textDecoration: "none",
              color: "#222",
              borderRadius: "6px",
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
