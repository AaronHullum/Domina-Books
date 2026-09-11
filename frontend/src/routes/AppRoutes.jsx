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
import Taxes from "../pages/Taxes";
import Properties from "../pages/Properties";
import Tenants from "../pages/Tenants";
import Leases from "../pages/Leases";
import Reconciliation from "../pages/Reconciliation";
import BalanceSheet from "../pages/BalanceSheet";
import ProfitAndLoss from "../pages/ProfitAndLoss";
import CashFlow from "../pages/CashFlow";
import TaxReports from "../pages/TaxReports";


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

<Route path="taxes" element={<Taxes />} />
<Route path="properties" element={<Properties />} />
<Route path="tenants" element={<Tenants />} />
<Route path="leases" element={<Leases />} />
<Route path="reconciliation" element={<Reconciliation />} />
<Route path="balance-sheet" element={<BalanceSheet />} />
<Route path="profit-and-loss" element={<ProfitAndLoss />} />
<Route path="cash-flow" element={<CashFlow />} />
<Route path="tax-reports" element={<TaxReports />} />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;