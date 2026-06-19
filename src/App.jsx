import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Storefront from "./pages/Storefront";
import AdminLogin, { AdminRoute } from "./pages/admin/AdminLogin";
import AdminPanel from "./pages/admin/AdminPanel";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Storefront />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/panel"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
