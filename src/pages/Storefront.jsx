import { useState } from "react";
import { OrganicProProductContent } from "../components/OrganicProProductContent";
import { WhatsappIcon } from "../components/WhatsappIcon";
import { BRANDS, TOOLS_VIDEOS, WHATSAPP_PHONE, WHATSAPP_URL } from "../data/catalogDefaults";
import { useCatalog } from "../hooks/useCatalog";
import "../App.css";

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
    <article key={product.id} className="product-card">
      {product.image_url && <img src={product.image_url} alt={product.name} />}
      <h3>{product.name}</h3>
      {product.show_description && product.description && <p>{product.description}</p>}
      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="whatsapp-link">
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
              <img src={section.hero_logo} alt={section.title} className="organic-pro-hero-logo" />
            )}
            <div>
              {section.kicker && <p className="organic-pro-kicker">{section.kicker}</p>}
              <h2>{section.title}</h2>
              {section.hero_text && <p className="organic-pro-hero-text">{section.hero_text}</p>}
              <a href="#productos" className="organic-pro-back">
                Volver a productos
              </a>
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
      </div>
    </section>
  );
}

export default function Storefront() {
  const { sections, productsBySectionId, loading } = useCatalog();
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const navSections = sections.filter((section) => section.show_in_nav);

  const getWhatsappProductUrl = (productName) =>
    `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
      `Hola Beautymax, quiero consultar por ${productName}.`,
    )}`;

  const showPrevVideo = () => {
    setActiveVideoIndex((current) => (current - 1 + TOOLS_VIDEOS.length) % TOOLS_VIDEOS.length);
  };

  const showNextVideo = () => {
    setActiveVideoIndex((current) => (current + 1) % TOOLS_VIDEOS.length);
  };

  return (
    <>
      <div className="top-announcement">Paga en cuotas sin interes - Asesoramiento para profesionales</div>

      <header className="site-header">
        <div className="container header-main">
          <a className="brand" href="#inicio">
            <span className="brand-name">Beautymax Uruguay</span>
          </a>
          <nav className="site-nav">
            {navSections.map((section) => (
              <a key={section.id} href={`#${section.slug}`}>
                {section.nav_label || section.title}
              </a>
            ))}
            <a href="#marcas">Marcas</a>
            <a href="#contacto">Contacto</a>
          </nav>
        </div>
      </header>

      <section id="inicio" className="hero-section">
        <div className="container hero-content">
          <img
            src="/hero/beautymax-hero-poster.png"
            alt="Beautymax Distribuidora - Profesionales de la belleza"
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
              <p>Cargando catálogo...</p>
            </div>
          </section>
        ) : (
          sections.map((section) => (
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
            <h2>Marcas</h2>
            <div className="brand-grid">
              {BRANDS.map((brand) => (
                <a key={brand.name} href={brand.source} target="_blank" rel="noreferrer" className="brand-item">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className={["brand-logo", brand.logoTone === "light" && "brand-logo-light", brand.logoClass]
                      .filter(Boolean)
                      .join(" ")}
                  />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="videos-section">
          <div className="container">
            <h2>Videos de herramientas</h2>
            <div className="video-carousel">
              <button type="button" className="video-arrow" aria-label="Video anterior" onClick={showPrevVideo}>
                &#10094;
              </button>
              <div className="video-frame">
                <video
                  key={TOOLS_VIDEOS[activeVideoIndex]}
                  className="tools-video"
                  src={TOOLS_VIDEOS[activeVideoIndex]}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>
              <button type="button" className="video-arrow" aria-label="Siguiente video" onClick={showNextVideo}>
                &#10095;
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer id="contacto" className="site-footer">
        <div className="container footer-inner">
          <div>
            <strong>Beautymax Uruguay</strong>
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
        </div>
      </footer>
    </>
  );
}
