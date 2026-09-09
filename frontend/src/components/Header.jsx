function Header() {
  return (
    <header
      style={{
        height: "64px",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #ddd",
        boxSizing: "border-box",
      }}
    >
      <div style={{ fontSize: "18px", fontWeight: "600" }}>
        DominaBooks ERP
      </div>
    </header>
  );
}

export default Header;
