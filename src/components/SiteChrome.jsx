import { Link } from "react-router-dom";
import { WhatsappIcon } from "./WhatsappIcon";
import { WHATSAPP_PHONE, WHATSAPP_URL } from "../data/catalogDefaults";

export default function SiteChrome({ children, showHomeH1 = false, homeH1 }) {
  return (
    <>
      <div className="top-announcement">Paga en cuotas sin interes - Asesoramiento para profesionales</div>
      <header className="site-header">
        <div className="container header-main">
          <Link className="brand" to="/">
            {showHomeH1 ? (
              <h1 className="brand-name">{homeH1}</h1>
            ) : (
              <span className="brand-name">Beautymax Uruguay</span>
            )}
          </Link>
          <nav className="site-nav" aria-label="Principal">
            <Link to="/">Inicio</Link>
            <Link to="/coloracion">Coloración</Link>
            <Link to="/herramientas">Herramientas</Link>
            <Link to="/organic-pro">Organic Pro</Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="whatsapp-link">
              Contacto
            </a>
          </nav>
        </div>
      </header>
      {children}
      <footer id="contacto" className="site-footer">
        <div className="container footer-inner">
          <div>
            <strong>Beautymax Uruguay</strong>
            <p>
              Distribuidora de peluquerías y barberías en Uruguay. Insumos profesionales, coloración,
              tratamientos y herramientas para salones.
            </p>
            <p>
              Instagram:{" "}
              <a href="https://www.instagram.com/beautymaxuy/" target="_blank" rel="noreferrer">
                @beautymaxuy
              </a>
            </p>
            <p>
              Contacto directo:{" "}
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                  "Hola Beautymax, quiero consultar por sus productos.",
                )}`}
                target="_blank"
                rel="noreferrer"
                className="whatsapp-link"
              >
                <WhatsappIcon />
                +598 97 428 888
              </a>
            </p>
          </div>
          <div>
            <strong>Explorá el catálogo</strong>
            <p className="footer-seo-links">
              <Link to="/wella">Wella</Link>
              {" · "}
              <Link to="/revlon">Revlon</Link>
              {" · "}
              <Link to="/kiepe">Kiepe</Link>
              {" · "}
              <Link to="/organic-pro">Organic Pro</Link>
              {" · "}
              <Link to="/silkey">Silkey</Link>
            </p>
            <p className="footer-seo-links">
              <Link to="/coloracion">Coloración</Link>
              {" · "}
              <Link to="/tratamientos">Tratamientos</Link>
              {" · "}
              <Link to="/herramientas">Herramientas</Link>
              {" · "}
              <Link to="/maquinas-barberia">Máquinas barbería</Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
