import { Link } from "react-router-dom";
import { OrganicProProductContent } from "../components/OrganicProProductContent";
import SeoHead from "../components/SeoHead";
import { WhatsappIcon } from "../components/WhatsappIcon";
import OptimizedImage, { HeroPoster } from "../components/OptimizedImage";
import CatalogSkeleton from "../components/CatalogSkeleton";
import LazyVideoCarousel from "../components/LazyVideoCarousel";
import { BRANDS, WHATSAPP_PHONE, WHATSAPP_URL } from "../data/catalogDefaults";
import { applyLockedSectionConfig } from "../data/lockedSections";
import { HOME_SEO } from "../data/seoPages";
import { useCatalog } from "../hooks/useCatalog";
import { productImageAlt } from "../lib/catalogFilters";
import "../App.css";

const BRAND_INTERNAL_LINKS = {
  "Revlon Professional": "/revlon",
  Wella: "/wella",
  "Kiepe Professional": "/kiepe",
  "Silkey Professional": "/silkey",
  "Organic Pro": "/organic-pro",
  "Beautymax Distribuidora": "/",
};

function sectionClassName(section) {
  if (section.section_type === "brand_featured") return "organic-pro-section";
  if (section.section_type === "collection_cards") return "collections-section";
  if (section.style_variant === "surface") return "tools-section";
  return "products-section";
}

function ProductCard({ product, whatsappPrefix = "" }) {
  const label = whatsappPrefix ? `${whatsappPrefix} ${product.name}` : product.name;
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    `Hola Beautymax, quiero consultar por ${label}.`,
  )}`;

  return (
    <article className="product-card">
      <div className="product-card-media">
        {product.image_url ? (
          <OptimizedImage
            src={product.image_url}
            alt={productImageAlt(product, whatsappPrefix || "catálogo")}
            width={460}
            height={460}
          />
        ) : null}
      </div>
      <h3>{product.name}</h3>
      {product.show_description && product.description && <p>{product.description}</p>}
      <a
        href={whatsappUrl}
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
}

function SectionBlock({ section, products, getWhatsappProductUrl }) {
  if (section.section_type === "brand_featured") {
    return (
      <section id={section.slug} className={sectionClassName(section)}>
        <div className="container">
          <div className="organic-pro-hero">
            {section.hero_logo && (
              <OptimizedImage
                src={section.hero_logo}
                alt="Organic Pro – línea profesional sin sal en Beautymax Uruguay"
                className="organic-pro-hero-logo"
                width={110}
                height={88}
              />
            )}
            <div>
              {section.kicker && <p className="organic-pro-kicker">{section.kicker}</p>}
              <h2>{section.title}</h2>
              {section.hero_text && <p className="organic-pro-hero-text">{section.hero_text}</p>}
              <Link to="/organic-pro" className="organic-pro-back">
                Ver página Organic Pro
              </Link>
            </div>
          </div>

          <div className="product-grid organic-pro-catalog">
            {products.map((product) => (
              <article key={product.id} className="product-card organic-pro-card">
                <OrganicProProductContent product={product} />
                <a
                  href={getWhatsappProductUrl(`Organic Pro ${product.name}`)}
                  target="_blank"
                  rel="noreferrer"
                  className="whatsapp-link"
                  aria-label={`Consultar por WhatsApp sobre Organic Pro ${product.name}`}
                >
                  <WhatsappIcon />
                  Consultar por WhatsApp
                </a>
              </article>
            ))}
          </div>

          <div className="organic-pro-footer-cta">
            <a
              href={getWhatsappProductUrl("la línea Organic Pro")}
              target="_blank"
              rel="noreferrer"
              className="cta-main whatsapp-link"
              aria-label="Consultar por WhatsApp sobre la línea Organic Pro"
            >
              <WhatsappIcon />
              Consultar línea completa
            </a>
          </div>
        </div>
      </section>
    );
  }

  if (section.section_type === "collection_cards") {
    return (
      <section id={section.slug} className={sectionClassName(section)}>
        <div className="container">
          <h2>{section.title}</h2>
          <div className="collection-grid">
            {products.map((product) => (
              <article key={product.id} className="collection-card">
                <h3>{product.name}</h3>
                {product.show_description && product.description && <p>{product.description}</p>}
              </article>
            ))}
          </div>
          <p className="seo-inline-links">
            Explorar: <Link to="/herramientas">Herramientas</Link>
            {" · "}
            <Link to="/maquinas-barberia">Máquinas barbería</Link>
            {" · "}
            <Link to="/coloracion">Coloración</Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id={section.slug} className={sectionClassName(section)}>
      <div className="container">
        <div className="section-head">
          <h2>{section.title}</h2>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="whatsapp-link">
            <WhatsappIcon />
            {section.slug === "herramientas" ? "Consultar stock" : "Ver catalogo completo"}
          </a>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {section.slug === "productos" && (
          <p className="seo-inline-links">
            Ver por marca: <Link to="/wella">Wella</Link>
            {" · "}
            <Link to="/revlon">Revlon</Link>
            {" · "}
            <Link to="/silkey">Silkey</Link>
            {" · "}
            <Link to="/coloracion">Coloración</Link>
            {" · "}
            <Link to="/tratamientos">Tratamientos</Link>
          </p>
        )}
        {section.slug === "herramientas" && (
          <p className="seo-inline-links">
            Más info: <Link to="/kiepe">Kiepe Professional</Link>
            {" · "}
            <Link to="/herramientas">Herramientas</Link>
            {" · "}
            <Link to="/maquinas-barberia">Máquinas barbería</Link>
          </p>
        )}
      </div>
    </section>
  );
}

export default function Storefront() {
  const { sections, productsBySectionId, loading } = useCatalog();

  const displaySections = sections.map(applyLockedSectionConfig);
  const navSections = displaySections.filter((section) => section.show_in_nav);

  const getWhatsappProductUrl = (productName) =>
    `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
      `Hola Beautymax, quiero consultar por ${productName}.`,
    )}`;

  return (
    <>
      <SeoHead title={HOME_SEO.title} description={HOME_SEO.description} path="/" />
      <div className="top-announcement">Paga en cuotas sin interes - Asesoramiento para profesionales</div>

      <header className="site-header">
        <div className="container header-main">
          <a className="brand" href="#inicio">
            <h1 className="brand-name">{HOME_SEO.h1}</h1>
          </a>
          <nav className="site-nav">
            {navSections.map((section) =>
              section.slug === "organic-pro" ? (
                <Link key={section.id} to="/organic-pro">
                  {section.nav_label || section.title}
                </Link>
              ) : section.slug === "herramientas" ? (
                <Link key={section.id} to="/herramientas">
                  {section.nav_label || section.title}
                </Link>
              ) : (
                <a key={section.id} href={`#${section.slug}`}>
                  {section.nav_label || section.title}
                </a>
              ),
            )}
            <a href="#marcas">Marcas</a>
            <a href="#contacto">Contacto</a>
          </nav>
        </div>
      </header>

      <section id="inicio" className="hero-section">
        <div className="container hero-content">
          <HeroPoster
            alt="Beautymax Uruguay: distribuidora de peluquerías y barberías con insumos profesionales"
            className="hero-poster"
          />
          <div className="hero-actions">
            <a href="#productos" className="cta-main">
              Ver productos
            </a>
            <a href={WHATSAPP_URL} className="cta-secondary whatsapp-link" target="_blank" rel="noreferrer">
              <WhatsappIcon />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <main>
        {loading ? (
          <section className="products-section">
            <div className="container">
              <div className="section-head">
                <h2>Productos destacados</h2>
              </div>
              <CatalogSkeleton cards={8} />
            </div>
          </section>
        ) : (
          displaySections.map((section) => (
            <SectionBlock
              key={section.id}
              section={section}
              products={productsBySectionId[section.id] || []}
              getWhatsappProductUrl={getWhatsappProductUrl}
            />
          ))
        )}

        <section id="marcas" className="brands-section">
          <div className="container">
            <h2>Marcas profesionales para peluquerías</h2>
            <div className="brand-grid">
              {BRANDS.map((brand) => {
                const internal = BRAND_INTERNAL_LINKS[brand.name];
                const className = ["brand-logo", brand.logoTone === "light" && "brand-logo-light", brand.logoClass]
                  .filter(Boolean)
                  .join(" ");
                const img = (
                  <span className="brand-logo-slot">
                    <OptimizedImage
                      src={brand.logo}
                      alt={`${brand.name} – marca profesional en Beautymax, distribuidora Uruguay`}
                      className={className}
                      width={180}
                      height={55}
                    />
                  </span>
                );

                if (internal) {
                  return (
                    <Link key={brand.name} to={internal} className="brand-item">
                      {img}
                    </Link>
                  );
                }

                return (
                  <a key={brand.name} href={brand.source} target="_blank" rel="noreferrer" className="brand-item">
                    {img}
                  </a>
                );
              })}
            </div>
            <p className="seo-inline-links">
              Páginas de marca: <Link to="/wella">Wella</Link>
              {" · "}
              <Link to="/revlon">Revlon</Link>
              {" · "}
              <Link to="/kiepe">Kiepe</Link>
              {" · "}
              <Link to="/organic-pro">Organic Pro</Link>
              {" · "}
              <Link to="/silkey">Silkey</Link>
            </p>
          </div>
        </section>

        <section className="videos-section">
          <div className="container">
            <h2>Videos de herramientas</h2>
            <LazyVideoCarousel />
          </div>
        </section>
      </main>

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
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="whatsapp-link">
                <WhatsappIcon />
                +598 97 428 888
              </a>
            </p>
          </div>
          <div>
            <strong>Categorías y marcas</strong>
            <p className="footer-seo-links">
              <Link to="/coloracion">Coloración</Link>
              {" · "}
              <Link to="/tratamientos">Tratamientos</Link>
              {" · "}
              <Link to="/herramientas">Herramientas</Link>
              {" · "}
              <Link to="/maquinas-barberia">Máquinas barbería</Link>
            </p>
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
          </div>
        </div>
      </footer>
    </>
  );
}
