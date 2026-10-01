import { Link } from "react-router-dom";
import CatalogSkeleton from "../components/CatalogSkeleton";
import OptimizedImage from "../components/OptimizedImage";
import SeoHead from "../components/SeoHead";
import SiteChrome from "../components/SiteChrome";
import { WhatsappIcon } from "../components/WhatsappIcon";
import { WHATSAPP_PHONE } from "../data/catalogDefaults";
import { getRelatedPages } from "../data/seoPages";
import { useCatalog } from "../hooks/useCatalog";
import { filterProductsForSeoPage, productImageAlt } from "../lib/catalogFilters";

export default function SeoCatalogPage({ page }) {
  const { sections, productsBySectionId, loading } = useCatalog();
  const products = filterProductsForSeoPage(page, sections, productsBySectionId);
  const related = getRelatedPages(page);
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    `Hola Beautymax, quiero consultar por ${page.whatsappLabel}.`,
  )}`;

  return (
    <SiteChrome>
      <SeoHead title={page.title} description={page.description} path={page.path} />
      <main>
        <section className="products-section seo-page-section">
          <div className="container seo-page">
            <p className="seo-breadcrumb">
              <Link to="/">Inicio</Link>
              {" / "}
              <span>{page.h1.split("|")[0].trim()}</span>
            </p>
            <h1>{page.h1}</h1>
            {page.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="seo-copy">
                {paragraph}
              </p>
            ))}

            <div className="hero-actions" style={{ justifyContent: "flex-start", margin: "18px 0 28px" }}>
              <a
                href={whatsappUrl}
                className="cta-main whatsapp-link"
                target="_blank"
                rel="noreferrer"
                aria-label={`Consultar por WhatsApp sobre ${page.whatsappLabel}`}
              >
                <WhatsappIcon />
                Consultar {page.whatsappLabel} por WhatsApp
              </a>
              <Link to="/" className="cta-secondary">
                Volver al inicio
              </Link>
            </div>

            <h2>Productos disponibles</h2>
            {loading ? (
              <CatalogSkeleton cards={8} />
            ) : products.length ? (
              <div className="product-grid">
                {products.map((product) => {
                  const productWhatsapp = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                    `Hola Beautymax, quiero consultar por ${page.whatsappLabel}: ${product.name}.`,
                  )}`;
                  return (
                    <article key={product.id} className="product-card">
                      <div className="product-card-media">
                        {product.image_url && (
                          <OptimizedImage
                            src={product.image_url}
                            alt={productImageAlt(product, page.whatsappLabel)}
                            width={460}
                            height={460}
                          />
                        )}
                      </div>
                      <h3>{product.name}</h3>
                      {product.show_description && product.description && <p>{product.description}</p>}
                      <a
                        href={productWhatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="whatsapp-link"
                        aria-label={`Consultar por WhatsApp sobre ${product.name}`}
                      >
                        <WhatsappIcon />
                        Consultar por WhatsApp
                      </a>
                    </article>
                  );
                })}
              </div>
            ) : (
              <p>
                Estamos actualizando el stock de esta categoría. Escribinos por WhatsApp y te armamos la
                propuesta al instante.
              </p>
            )}

            <div className="seo-related">
              <h2>También te puede interesar</h2>
              <ul>
                {related.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path}>{item.title || item.h1}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
