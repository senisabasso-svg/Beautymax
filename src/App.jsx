import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Storefront from "./pages/Storefront";
import AdminLogin, { AdminRoute } from "./pages/admin/AdminLogin";
import { SEO_PAGES } from "./data/seoPages";

const SeoCatalogPage = lazy(() => import("./pages/SeoCatalogPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const AdminPanel = lazy(() => import("./pages/admin/AdminPanel"));

function RouteFallback() {
  return (
    <div className="admin-shell">
      <p>Cargando...</p>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
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
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}
