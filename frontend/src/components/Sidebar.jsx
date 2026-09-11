import { Link } from "react-router-dom";

const navigation = [
  { label: "Dashboard", path: "/" },

  { label: "Accounting", path: "/accounting" },
  { label: "Chart of Accounts", path: "/chart-of-accounts" },
  { label: "General Ledger", path: "/general-ledger" },
  { label: "Journal Entries", path: "/journal-entries" },
  { label: "Account Registers", path: "/registers" },
  { label: "Reconciliation", path: "/reconciliation" },
  
  { label: "Customers", path: "/customers" },
  { label: "Vendors", path: "/vendors" },
  { label: "Banking", path: "/banking" },
  { label: "Inventory", path: "/inventory" },
  { label: "Purchasing", path: "/purchasing" },
  { label: "Sales", path: "/sales" },
  
  { label: "Properties", path: "/properties" },
  { label: "Tenants", path: "/tenants" },
  { label: "Leases", path: "/leases" },

  { label: "Assets", path: "/assets" },
  
  { label: "Reports", path: "/reports" },

  { label: "Taxes", path: "/taxes" },

{ label: "Properties", path: "/properties" },
{ label: "Tenants", path: "/tenants" },
{ label: "Leases", path: "/leases" },
{ label: "Reconciliation", path: "/reconciliation" },
{ label: "Taxes", path: "/taxes" },
{ label: "Balance Sheet", path: "/balance-sheet" },
{ label: "Profit & Loss", path: "/profit-and-loss" },
{ label: "Cash Flow", path: "/cash-flow" },
{ label: "Tax Reports", path: "/tax-reports" },

];

function Sidebar() {
  return (
    <aside
      style={{
        width: "280px",
        padding: "24px 16px",
        background: "#0f172a",
        borderRight: "1px solid #1e293b",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontSize: "30px",
          fontWeight: "800",
          color: "#ffffff",
          marginBottom: "24px",
        }}
      >
        DominaBooks
      </div>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {navigation.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              padding: "12px 14px",
              color: "#e2e8f0",
              textDecoration: "none",
              borderRadius: "12px",
              fontWeight: "600",
              transition: "all .2s ease",
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
