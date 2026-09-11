import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Vendors from "../pages/Vendors";
import Reports from "../pages/Reports";
import Inventory from "../pages/Inventory";
import Banking from "../pages/Banking";
import Purchasing from "../pages/Purchasing";
import Sales from "../pages/Sales";
import Assets from "../pages/Assets";
import Accounting from "../pages/Accounting";
import ChartOfAccounts from "../pages/ChartOfAccounts";
import GeneralLedger from "../pages/GeneralLedger";
import JournalEntries from "../pages/JournalEntries";
import AccountRegister from "../pages/AccountRegister";


function Placeholder({ title }) {
  return (
    <div style={{ padding: "32px" }}>
      <h1>{title}</h1>
      <p>This DominaBooks module is being built.</p>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />

<Route
  path="accounting"
  element={<Accounting />}
/>

<Route
  path="chart-of-accounts"
  element={<ChartOfAccounts />}
/>

       <Route
         path="general-ledger"
         element={<GeneralLedger />}
        />

        <Route
         path="journal-entries"
         element={<JournalEntries />}
        />

<Route
  path="registers"
  element={<AccountRegister />}
/>


        <Route
          path="customers"
          element={<Customers />}
        />

        <Route
          path="vendors"
          element={<Vendors />}
        />

        <Route
          path="banking"
          element={<Banking />}
        />

        <Route
          path="inventory"
          element={<Inventory />}
        />

        <Route
          path="purchasing"
          element={<Purchasing />}
        />

        <Route
          path="sales"
          element={<Sales />}
        />

        <Route
          path="assets"
          element={<Assets />}
        />

        <Route
          path="reports"
          element={<Reports />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;