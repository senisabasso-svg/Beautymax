import { useEffect, useState } from "react";
import "./App.css";

const BRANDS = [
  {
    name: "Silkey Mundial",
    logo: "/brands/silkey.webp",
    source: "https://tienda.silkeymundial.com/",
  },
  {
    name: "Kiepe Uruguay",
    logo: "/brands/kiepe.avif",
    source: "https://www.kiepeuruguay.com/",
  },
  {
    name: "Plasma",
    logo: "/brands/plasma.png",
    source:
      "https://www.bing.com/images/search?view=detailV2&ccid=Iw4a%2fRND&id=D28A95B01076269F3C869386758205F429D3FACB&thid=OIP.Iw4a_RND8elzoj0jRZ8UMQHaCY&mediaurl=https%3a%2f%2flipglossandaftershave.com%2fwp-content%2fuploads%2f2024%2f01%2fPro-Plasma-Esthetics-Logo-DD.png",
  },
  {
    name: "Wella Professionals",
    logo: "/brands/wella.jpg",
    source: "https://www.wella.com/professional/es-ES",
  },
  {
    name: "L'Oreal Professionnel",
    logo: "/brands/loreal.jpg",
    source:
      "https://m.media-amazon.com/images/S/aplus-media/vc/7ed54674-514c-4a03-83c9-7258c5236bd0.__CR0,0,970,300_PT0_SX970_V1___.jpg",
  },
];

const WHATSAPP_URL =
  "https://wa.me/59897428888?text=Hola%20Beautymax%2C%20quiero%20consultar%20por%20sus%20productos.";

const CATEGORIES = [
  { title: "Capilar", description: "Coloracion, tratamientos, styling y cuidado profesional." },
  { title: "Barberia", description: "Cortadoras, patilleras, navajas y accesorios de precision." },
  { title: "Manicuria", description: "Esmaltado, tornos, herramientas y productos tecnicos." },
  { title: "Herramientas", description: "Peines, cepillos, secadores, planchas y maquinaria." },
];

const FEATURED_PRODUCTS = [
  "Tratamientos capilares",
  "Maquinas de corte profesional",
  "Insumos para coloracion",
  "Productos de barberia",
  "Accesorios para salon",
  "Herramientas de manicuria",
];

function App() {
  const [index, setIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth <= 480) {
        setVisibleCards(1);
        return;
      }
      if (window.innerWidth <= 760) {
        setVisibleCards(2);
        return;
      }
      setVisibleCards(3);
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % BRANDS.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const showPrev = () => {
    setIndex((current) => (current - 1 + BRANDS.length) % BRANDS.length);
  };

  const showNext = () => {
    setIndex((current) => (current + 1) % BRANDS.length);
  };

  const visibleBrands = Array.from({ length: visibleCards }, (_, offset) => {
    const brandIndex = (index + offset) % BRANDS.length;
    return BRANDS[brandIndex];
  });

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand-tag">Beautymax Uruguay</div>
          <nav className="header-nav">
            <a href="#categorias">Categorias</a>
            <a href="#marcas">Marcas</a>
            <a href="#contacto">Contacto</a>
          </nav>
          <a className="mini-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-content">
          <div className="hero-copy">
            <p className="hero-eyebrow">Distribucion mayorista y minorista</p>
            <h1>Todo para peluqueria, barberia y estetica en un solo lugar</h1>
            <p>
              Beautymax trabaja con marcas lideres para profesionales y salones. Asesoramiento,
              stock actualizado y envios.
            </p>
            <div className="hero-actions">
              <a className="whatsapp-button" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Pedir por WhatsApp
              </a>
              <a
                className="instagram-button"
                href="https://www.instagram.com/beautymaxuy/"
                target="_blank"
                rel="noreferrer"
              >
                Ver Instagram
              </a>
            </div>
          </div>
          <div className="hero-logo-wrap">
            <img
              src="/logo-beautymax-transparent.png"
              alt="Logo de Beautymax"
              className="logo"
            />
            <div className="hero-badge">Atencion personalizada</div>
          </div>
        </div>
      </section>

      <main>
        <section id="categorias" className="categories-section">
          <div className="container">
            <h2>Categorias principales</h2>
            <p className="section-description">
              Un estilo similar a las grandes distribuidoras, con una experiencia mas moderna y
              enfocada en conversion.
            </p>
            <div className="categories-grid">
              {CATEGORIES.map((category) => (
                <article key={category.title} className="category-card">
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="marcas" className="brands-section">
          <div className="container">
            <h2>Marcas con las que trabaja</h2>
            <p className="section-description">Marcas destacadas y en constante rotacion:</p>

            <div className="carousel-wrapper" aria-label="Carrusel de marcas">
              <button className="carousel-button" aria-label="Marca anterior" onClick={showPrev}>
                &#10094;
              </button>

              <div className="carousel-track-container">
                <ul className="carousel-track">
                  {visibleBrands.map((brand) => (
                    <li key={`${brand.name}-${index}`} className="brand-card">
                      <a href={brand.source} target="_blank" rel="noreferrer" aria-label={brand.name}>
                        <img src={brand.logo} alt={`Logo ${brand.name}`} className="brand-logo" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="carousel-button" aria-label="Siguiente marca" onClick={showNext}>
                &#10095;
              </button>
            </div>
          </div>
        </section>

        <section className="featured-section">
          <div className="container">
            <div className="featured-head">
              <h2>Lo mas buscado por salones</h2>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Consultar lista completa
              </a>
            </div>
            <div className="products-grid">
              {FEATURED_PRODUCTS.map((item) => (
                <article key={item} className="product-card">
                  <p>{item}</p>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                    Consultar
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="contacto">
        <p>
          Seguinos en Instagram:{" "}
          <a href="https://www.instagram.com/beautymaxuy/" target="_blank" rel="noreferrer">
            @beautymaxuy
          </a>
        </p>
        <p>
          Contacto directo:{" "}
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            +598 97 428 888
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
