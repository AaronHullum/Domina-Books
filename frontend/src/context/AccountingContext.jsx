import { createContext, useContext, useState } from "react";

const AccountingContext = createContext();

export function AccountingProvider({ children }) {
  const [transactions, setTransactions] = useState([
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
  ]);

  const addTransaction = (transaction) => {
    setTransactions((current) => [...current, transaction]);
  };

  const getAccountBalance = (accountName) => {
    const accountTransactions = transactions.filter(
      (t) => t.account === accountName
    );

    return accountTransactions.reduce(
      (total, t) => total + (t.debit || 0) - (t.credit || 0),
      0
    );
  };

  return (
    <AccountingContext.Provider
      value={{
        transactions,
        addTransaction,
        getAccountBalance
      }}
    >
      {children}
    </AccountingContext.Provider>
  );
}

export function useAccounting() {
  return useContext(AccountingContext);
}