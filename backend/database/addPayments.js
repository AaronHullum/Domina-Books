import db from "./db.js";

db.exec(`
CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_id INTEGER NOT NULL,
  customer_id INTEGER NOT NULL,
  invoice_id INTEGER,
  payment_date TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  reference TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`);

console.log("Payments table ready");
