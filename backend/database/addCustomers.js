import db from "./db.js";

db.exec(`
CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_id INTEGER NOT NULL,
  customer_number TEXT,
  display_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  billing_address TEXT,
  active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`);

console.log("Customer table ready");
