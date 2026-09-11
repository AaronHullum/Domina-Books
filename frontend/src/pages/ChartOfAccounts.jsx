import { useState } from "react";

export default function ChartOfAccounts() {
  const [accounts] = useState([
    {
      number: "1010",
      name: "Checking Account",
      type: "Asset",
      taxForm: "",
      taxLine: "",
      propertyTracked: "No",
      status: "Active"
    },
    {
      number: "1100",
      name: "Accounts Receivable",
      type: "Asset",
      taxForm: "",
      taxLine: "",
      propertyTracked: "No",
      status: "Active"
    },
    {
      number: "2050",
      name: "Mortgage Payable",
      type: "Liability",
      taxForm: "",
      taxLine: "",
      propertyTracked: "Yes",
      status: "Active"
    },
    {
      number: "4100",
      name: "Rental Income",
      type: "Income",
      taxForm: "Schedule E",
      taxLine: "Rents Received",
      propertyTracked: "Yes",
      status: "Active"
    },
    {
      number: "6200",
      name: "Advertising",
      type: "Expense",
      taxForm: "Schedule C",
      taxLine: "Advertising",
      propertyTracked: "No",
      status: "Active"
    },
    {
      number: "6300",
      name: "Feed Expense",
      type: "Expense",
      taxForm: "Schedule F",
      taxLine: "Feed",
      propertyTracked: "No",
      status: "Active"
    }
  ]);

  return (
    <>
      <h1>Chart of Accounts</h1>

      <button
        style={{
          marginBottom: "20px"
        }}
      >
        New Account
      </button>

      <div
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "12px"
        }}
      >
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Account #</th>
              <th>Name</th>
              <th>Type</th>
              <th>Tax Form</th>
              <th>Tax Line</th>
              <th>Property Tracked</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {accounts.map((account) => (
              <tr key={account.number}>
                <td>{account.number}</td>
                <td>{account.name}</td>
                <td>{account.type}</td>
                <td>{account.taxForm}</td>
                <td>{account.taxLine}</td>
                <td>{account.propertyTracked}</td>
                <td>{account.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}