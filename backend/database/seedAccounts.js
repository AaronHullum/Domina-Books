import db from "./db.js";

const companyId =
  Number(process.argv[2]);

const accounts = [
  ["1000","Cash","ASSET","DEBIT"],
  ["1100","Accounts Receivable","ASSET","DEBIT"],
  ["1200","Inventory","ASSET","DEBIT"],
  ["2000","Accounts Payable","LIABILITY","CREDIT"],
  ["3000","Owner Equity","EQUITY","CREDIT"],
  ["4000","Sales Revenue","REVENUE","CREDIT"],
  ["5000","Cost of Goods Sold","EXPENSE","DEBIT"],
  ["6100","Office Expense","EXPENSE","DEBIT"]
];

const insert = db.prepare(`
INSERT INTO accounts
(
 company_id,
 code,
 name,
 account_type,
 normal_balance
)
VALUES (?, ?, ?, ?, ?)
`);

for(const account of accounts){

  insert.run(
    companyId,
    ...account
  );

}

console.log(
  `Seeded ${accounts.length} accounts`
);
