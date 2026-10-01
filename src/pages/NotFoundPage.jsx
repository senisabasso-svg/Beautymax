import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import SiteChrome from "../components/SiteChrome";
import { WhatsappIcon } from "../components/WhatsappIcon";
import { WHATSAPP_URL } from "../data/catalogDefaults";

export default function NotFoundPage() {
  return (
    <SiteChrome>
      <SeoHead
        title="Página no encontrada | Beautymax Uruguay"
        description="La página que buscás no existe. Volvé al inicio de Beautymax, distribuidora de peluquerías y barberías en Uruguay."
        path="/404"
        noIndex
      />
      <main>
        <section className="products-section">
          <div className="container seo-page">
            <h1>Página no encontrada</h1>
            <p>El enlace no existe o fue movido. Podés volver al inicio o consultarnos por WhatsApp.</p>
            <div className="hero-actions" style={{ justifyContent: "flex-start", marginTop: 16 }}>
              <Link to="/" className="cta-main">
                Ir al inicio
              </Link>
              <a href={WHATSAPP_URL} className="cta-secondary whatsapp-link" target="_blank" rel="noreferrer">
                <WhatsappIcon />
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
