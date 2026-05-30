import { useEffect, useState } from "react";
import "./App.css";

const BRANDS = [
  {
    name: "Silkey Mundial",
    logo: "https://images.seeklogo.com/logo-png/17/2/silkey-logo-png_seeklogo-177325.png",
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
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Wella-Company-logo.jpg/1200px-Wella-Company-logo.jpg",
    source: "https://www.wella.com/professional/es-ES",
  },
];

const WHATSAPP_PHONE = "59897428888";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
  "Hola Beautymax, quiero consultar por sus productos.",
)}`;

const CATEGORIES = [
  { title: "Capilar", description: "Coloracion, tratamientos, styling y cuidado profesional." },
  { title: "Barberia", description: "Cortadoras, patilleras, navajas y accesorios de precision." },
  { title: "Manicuria", description: "Esmaltado, tornos, herramientas y productos tecnicos." },
  { title: "Herramientas", description: "Peines, cepillos, secadores, planchas y maquinaria." },
];

const FEATURED_PRODUCTS = [
  { name: "Tratamientos capilares", description: "Nutricion y reparacion." },
  { name: "Maquinas de corte", description: "Precision profesional." },
  { name: "Coloracion profesional", description: "Cobertura y brillo." },
  { name: "Productos de barberia", description: "Cuidado y acabado." },
  { name: "Accesorios para salon", description: "Uso diario en cabina." },
  { name: "Herramientas de manicuria", description: "Detalle y definicion." },
];

const TOOLS_PRODUCTS = [
  {
    name: "Tijera Kiepe Pro Cut 5.5",
    image: "/herramientas/kiepe-pro-cut-pack.png",
    description: "Corte preciso diario.",
  },
  {
    name: "Tijera Kiepe Ergonomica Silver",
    image: "/herramientas/kiepe-ergonomic-silver.png",
    description: "Comodidad y control.",
  },
  {
    name: "Tijera Kiepe Gold Edition",
    image: "/herramientas/kiepe-gold-main.png",
    description: "Acabado premium.",
  },
  {
    name: "Tijera de Entresacar Kiepe",
    image: "/herramientas/kiepe-entresacar-main.png",
    description: "Textura sin perder forma.",
  },
  {
    name: "Trimmer Hepike Profesional",
    image: "/herramientas/hepike-trimmer.png",
    description: "Detalles y contornos.",
  },
];

const PRODUCTS_CATALOG = [
  {
    name: "Pro You The Lifter Bleaching Powder",
    image: "/productos/proyou-lifter-campana.png",
    description: "Decoloracion uniforme.",
  },
  {
    name: "Pro You The Color Maker",
    image: "/productos/proyou-colormaker-campana.png",
    description: "Color intenso duradero.",
  },
  {
    name: "Pro You Color Maker 90 ml",
    image: "/productos/proyou-colormaker-pack.png",
    description: "Presentacion 90 ml.",
  },
  {
    name: "Linea Pro You Color Maker",
    image: "/productos/proyou-colormaker-linea.png",
    description: "Variedad de tonos.",
  },
  {
    name: "Coloracion + Aloe Vera",
    image: "/productos/proyou-aloe-vera.png",
    description: "Con aloe vera.",
  },
  {
    name: "Silkey Colorkey Milenium",
    image: "/productos/silkey-colorkey-milenium.png",
    description: "Coloracion en crema.",
  },
  {
    name: "Pro You The Setter Hairspray",
    image: "/productos/proyou-setter-hairspray.png",
    description: "Fijacion extrema.",
  },
  {
    name: "Pro You Deco Revlon",
    image: "/productos/proyou-deco-revlon.png",
    description: "Deco alto rendimiento.",
  },
  {
    name: "Wella Color Touch",
    image: "/productos/wella-color-touch.png",
    description: "Tono sobre tono.",
  },
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

  const getWhatsappProductUrl = (productName) =>
    `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
      `Hola Beautymax, quiero consultar por ${productName}.`,
    )}`;

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand-tag">Beautymax Uruguay</div>
          <nav className="header-nav">
            <a href="#categorias">Categorias</a>
            <a href="#marcas">Marcas</a>
            <a href="#productos">Productos</a>
            <a href="#herramientas">Herramientas</a>
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
                <article key={item.name} className="product-card">
                  <h3>{item.name}</h3>
                  <p className="product-short-description">{item.description}</p>
                  <a href={getWhatsappProductUrl(item.name)} target="_blank" rel="noreferrer">
                    Consultar por WhatsApp
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="productos" className="products-catalog-section">
          <div className="container">
            <div className="featured-head">
              <h2>Productos</h2>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Pedir lista completa
              </a>
            </div>
            <p className="section-description">
              Catalogo de coloracion, decoloracion y styling profesional para salones.
            </p>
            <div className="catalog-grid">
              {PRODUCTS_CATALOG.map((product) => (
                <article key={product.name} className="catalog-card">
                  <img src={product.image} alt={product.name} className="catalog-image" />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <a href={getWhatsappProductUrl(product.name)} target="_blank" rel="noreferrer">
                    Consultar por WhatsApp
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="herramientas" className="tools-section">
          <div className="container">
            <div className="featured-head">
              <h2>Herramientas</h2>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Consultar stock
              </a>
            </div>
            <p className="section-description">
              Seleccion de herramientas profesionales para peluqueria y barberia.
            </p>
            <div className="tools-grid">
              {TOOLS_PRODUCTS.map((product) => (
                <article key={product.name} className="tool-card">
                  <img src={product.image} alt={product.name} className="tool-image" />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <a href={getWhatsappProductUrl(product.name)} target="_blank" rel="noreferrer">
                    Pedir por WhatsApp
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
