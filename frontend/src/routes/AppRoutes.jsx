import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";

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
        <Route path="customers" element={<Placeholder title="Customers" />} />
        <Route path="vendors" element={<Placeholder title="Vendors" />} />
        <Route path="banking" element={<Placeholder title="Banking" />} />
        <Route path="inventory" element={<Placeholder title="Inventory" />} />
        <Route path="purchasing" element={<Placeholder title="Purchasing" />} />
        <Route path="sales" element={<Placeholder title="Sales" />} />
        <Route path="assets" element={<Placeholder title="Fixed Assets" />} />
        <Route path="reports" element={<Placeholder title="Reports" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
