import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Storefront from "./pages/Storefront";
import SeoCatalogPage from "./pages/SeoCatalogPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminLogin, { AdminRoute } from "./pages/admin/AdminLogin";
import AdminPanel from "./pages/admin/AdminPanel";
import { SEO_PAGES } from "./data/seoPages";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Storefront />} />
          {SEO_PAGES.map((page) => (
            <Route key={page.path} path={page.path} element={<SeoCatalogPage page={page} />} />
          ))}
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/panel"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
