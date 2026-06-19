import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";
import { getUserFriendlyError } from "../../lib/userFriendlyErrors";
import "../../admin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin/panel", { replace: true });
    });
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!supabase) {
        throw new Error("Configurá VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu archivo .env");
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;
      navigate("/admin/panel");
    } catch (submitError) {
      setError(getUserFriendlyError(submitError, "login"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-shell">
      <div className="admin-login-card">
        <p className="admin-kicker">Beautymax</p>
        <h1>Backoffice</h1>
        <p className="admin-muted">Gestioná secciones y productos del catálogo.</p>

        {!isSupabaseConfigured && (
          <div className="admin-alert">
            Falta configurar Supabase. Creá un archivo <code>.env</code> con las variables del proyecto.
          </div>
        )}

        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="username"
            />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />
          </label>
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <Link to="/" className="admin-link-back">
          Volver al sitio
        </Link>
      </div>
    </div>
  );
}

export function AdminRoute({ children }) {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setChecking(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (checking) {
    return (
      <div className="admin-shell">
        <p>Verificando sesión...</p>
      </div>
    );
  }

  if (!session) return <Navigate to="/admin" replace />;
  return children;
}
