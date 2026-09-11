export const ledgerTransactions = [
  {
    date: "09/11/2026",
    reference: "JE-1001",
    account: "1010 Checking Account",
    description: "Rent Payment",
    debit: 1500,
    credit: 0
  },
  {
    date: "09/11/2026",
    reference: "JE-1001",
    account: "4100 Rental Income",
    description: "Rent Payment",
    debit: 0,
    credit: 1500
  }
];

export function addTransaction(transaction) {
  ledgerTransactions.push(transaction);
}

export function getAccountBalance(accountName) {
  const transactions = ledgerTransactions.filter(
    (t) => t.account === accountName
  );

  let totalDebits = 0;
  let totalCredits = 0;

  transactions.forEach((t) => {
    totalDebits += Number(t.debit || 0);
    totalCredits += Number(t.credit || 0);
  });

  return totalDebits - totalCredits;
}
