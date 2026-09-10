function Header() {
  return (
    <header
      style={{
        height: "72px",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #e5e7eb",
        background: "#ffffff",
        boxShadow: "0 1px 3px rgba(0,0,0,.06)",
      }}
    >
      <div>
        <div
          style={{
            fontSize: "22px",
            fontWeight: "700",
            color: "#0f172a",
          }}
        >
          Welcome back
        </div>

        <div
          style={{
            fontSize: "14px",
            color: "#64748b",
            marginTop: "4px",
          }}
        >
          Financial operations overview
        </div>
      </div>

      <div>
        <button>
          New Transaction
        </button>
      </div>
    </header>
  );
}

export default Header;
