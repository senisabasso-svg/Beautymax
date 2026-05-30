import { useEffect, useState } from "react";
import "./App.css";

const BRANDS = [
  {
    name: "Silkey Mundial",
    logo: "/brands/silkey-mundial.png",
    logoTone: "light",
    source: "https://tienda.silkeymundial.com/",
  },
  {
    name: "Kiepe Uruguay",
    logo: "/brands/kiepe-uruguay.png",
    source: "https://www.kiepeuruguay.com/",
  },
  {
    name: "Plasma",
    logo: "/brands/pro-plasma-esthetic.png",
    logoTone: "light",
    source:
      "https://www.bing.com/images/search?view=detailV2&ccid=Iw4a%2fRND&id=D28A95B01076269F3C869386758205F429D3FACB&thid=OIP.Iw4a_RND8elzoj0jRZ8UMQHaCY&mediaurl=https%3a%2f%2flipglossandaftershave.com%2fwp-content%2fuploads%2f2024%2f01%2fPro-Plasma-Esthetics-Logo-DD.png",
  },
  {
    name: "Wella Professionals",
    logo: "/brands/wella-professionals.png",
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
    name: "Kiepe Pro Cut 5.5 en Blister",
    image: "/herramientas/kiepe-procut-blister.png",
    description: "Tijera profesional de 5.5 pulgadas con presentacion en blister y filo parejo para uso diario.",
  },
  {
    name: "Kiepe Pro Cut 5.5 Clasica",
    image: "/herramientas/kiepe-procut-55.png",
    description: "Modelo clasico liviano, comodo para cortes de precision y terminaciones detalladas.",
  },
  {
    name: "Kiepe Ergonomic Silver con Estuche",
    image: "/herramientas/kiepe-ergonomic-box-open.png",
    description: "Version ergonomica silver con estuche premium para proteger la tijera en transporte.",
  },
  {
    name: "Kiepe Ergonomic Silver Presentacion Caja",
    image: "/herramientas/kiepe-ergonomic-box-sleeve.png",
    description: "Presentacion completa de linea ergonomica, ideal para regalo o exhibicion de salon.",
  },
  {
    name: "Kiepe Ergonomic Silver Perfil",
    image: "/herramientas/kiepe-ergonomic-silver-side.png",
    description: "Diseño anatomico que mejora el agarre y reduce la fatiga en jornadas largas.",
  },
  {
    name: "Kiepe Ergonomic Silver Detalle",
    image: "/herramientas/kiepe-ergonomic-silver-closeup.png",
    description: "Detalle de mango y apoyo, pensado para control fino en corte tecnico.",
  },
  {
    name: "Kiepe Ergonomic Silver Frontal",
    image: "/herramientas/kiepe-ergonomic-silver-front.png",
    description: "Acero pulido con excelente deslizamiento para cortes limpios y consistentes.",
  },
  {
    name: "Kiepe Ergonomic Black Frontal",
    image: "/herramientas/kiepe-ergonomic-black-front.png",
    description: "Version negra profesional con estilo moderno y buen balance en mano.",
  },
  {
    name: "Kiepe Ergonomic Black Angulo",
    image: "/herramientas/kiepe-ergonomic-black-angle.png",
    description: "Vista en angulo que destaca su ergonomia y estabilidad durante el corte.",
  },
  {
    name: "Kiepe Ergonomic Black Closeup",
    image: "/herramientas/kiepe-ergonomic-black-closeup.png",
    description: "Terminacion negra de alta presencia, ideal para estilistas que buscan precision y diseño.",
  },
  {
    name: "Kiepe Gold Pro Frontal",
    image: "/herramientas/kiepe-gold-pro-front.png",
    description: "Tijera profesional acabado dorado con gran suavidad de apertura y cierre.",
  },
  {
    name: "Kiepe Gold Pro Detalle",
    image: "/herramientas/kiepe-gold-pro-closeup.png",
    description: "Detalle del mango dorado ergonomico, comodo para trabajos prolongados.",
  },
  {
    name: "Kiepe Gold Set Corte y Pulido",
    image: "/herramientas/kiepe-gold-duo-set.png",
    description: "Set dorado con piezas para corte y texturizado, completo para cabina profesional.",
  },
  {
    name: "Kiepe Tijera para Zurdos con Caja",
    image: "/herramientas/kiepe-zurdo-box.png",
    description: "Modelo diseñado para zurdos, con presentacion en caja y estuche de proteccion.",
  },
  {
    name: "Kiepe Tijera para Zurdos Angulo",
    image: "/herramientas/kiepe-zurdo-angle.png",
    description: "Geometria invertida para zurdos que facilita un corte natural y comodo.",
  },
  {
    name: "Kiepe Tijera para Zurdos Frontal",
    image: "/herramientas/kiepe-zurdo-front.png",
    description: "Vista frontal de hoja precisa para definir lineas y contornos con control.",
  },
  {
    name: "Kiepe Tijera para Zurdos Closeup",
    image: "/herramientas/kiepe-zurdo-closeup.png",
    description: "Detalle cercano del filo y cuerpo metalico con excelente terminacion.",
  },
  {
    name: "Kiepe Tijera para Zurdos Mango",
    image: "/herramientas/kiepe-zurdo-handle.png",
    description: "Mango ergonomico para zurdos que mejora apoyo de dedos y maniobrabilidad.",
  },
  {
    name: "Kiepe Entresacar con Caja",
    image: "/herramientas/kiepe-entresacar-box.png",
    description: "Tijera de entresacar en presentacion premium para texturas y descarga de volumen.",
  },
  {
    name: "Kiepe Entresacar con Estuche",
    image: "/herramientas/kiepe-entresacar-kit.png",
    description: "Kit profesional para desbaste controlado, ideal para acabados suaves.",
  },
  {
    name: "Kiepe Entresacar Frontal",
    image: "/herramientas/kiepe-entresacar-front.png",
    description: "Dientes de entresacar uniformes para quitar peso sin perder forma en el corte.",
  },
  {
    name: "Kiepe Entresacar Angulo",
    image: "/herramientas/kiepe-entresacar-angle.png",
    description: "Vista en angulo de tijera de pulido para trabajos de textura progresiva.",
  },
  {
    name: "Kiepe Entresacar Detalle",
    image: "/herramientas/kiepe-entresacar-closeup.png",
    description: "Detalle de dentado fino para mezclar capas y suavizar terminaciones.",
  },
  {
    name: "Kiepe 273 Cocodrilo",
    image: "/herramientas/kiepe-273-cocodrilo.png",
    description: "Modelo clasico 273 para entresacar, muy usado por su corte estable y confiable.",
  },
  {
    name: "Trimmer Hepike Profesional",
    image: "/herramientas/hepike-trimmer-pro.png",
    description: "Trimmer inalambrico para detalles, contornos y terminaciones de barberia.",
  },
  {
    name: "Kiepe Zurdos Variante Studio 1",
    image: "/herramientas/kiepe-zurdo-extra-1.png",
    description: "Imagen adicional del modelo para zurdos en contexto de set profesional.",
  },
  {
    name: "Kiepe Zurdos Variante Studio 2",
    image: "/herramientas/kiepe-zurdo-extra-2.png",
    description: "Otra vista de tijera para zurdos con enfoque en filo y ergonomia del mango.",
  },
  {
    name: "Kiepe Entresacar Variante Studio",
    image: "/herramientas/kiepe-entresacar-extra-1.png",
    description: "Vista adicional de la entresacadora para mostrar detalle de dientes y perfil.",
  },
];

const TOOLS_VIDEO = "/herramientas/herramientas-demo-1.mp4";

const PRODUCTS_CATALOG = [
  {
    name: "Pro You The Lifter - Deco profesional",
    image: "/productos/proyou-lifter-promo.png",
    description: "Polvo decolorante de alto rendimiento para aclaraciones parejas en salon.",
  },
  {
    name: "Pro You The Color Maker - Coloracion profesional",
    image: "/productos/proyou-colormaker-promo.png",
    description: "Coloracion permanente con cobertura uniforme y brillo duradero desde la primera aplicacion.",
  },
  {
    name: "Pro You The Color Maker 90 ml",
    image: "/productos/proyou-colormaker-90ml.png",
    description: "Tono intenso en formato 90 ml, ideal para servicio tecnico diario.",
  },
  {
    name: "Linea Pro You Color Maker Chroma Art",
    image: "/productos/proyou-colormaker-linea-art.png",
    description: "Linea de coloracion con variedad de tonos para trabajos creativos y comerciales.",
  },
  {
    name: "Pro You Color Maker + Aloe Vera",
    image: "/productos/proyou-colormaker-aloe-vera.png",
    description: "Formula enriquecida con aloe vera para colorar y cuidar la fibra capilar.",
  },
  {
    name: "Silkey Colorkey Milenium",
    image: "/productos/silkey-colorkey-milenium.png",
    description: "Coloracion en crema con buena cobertura y tonos estables para uso profesional.",
  },
  {
    name: "Pro You The Setter Hairspray",
    image: "/productos/proyou-setter-hairspray.png",
    description: "Laca de fijacion extrema con control de brillo para peinados de larga duracion.",
  },
  {
    name: "Pro You The Lifter 1 kg",
    image: "/productos/proyou-lifter-balde.png",
    description: "Presentacion de 1 kg para trabajos intensivos de decoloracion en cabina.",
  },
  {
    name: "Wella Color Touch",
    image: "/productos/wella-color-touch.png",
    description: "Coloracion tono sobre tono con acabado brillante y aspecto natural en el cabello.",
  },
];

function App() {
  const [index, setIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const totalProducts = PRODUCTS_CATALOG.length + TOOLS_PRODUCTS.length;

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

      <section className="poster-hero">
        <div className="container">
          <div className="poster-card">
            <div className="poster-top">
              <p className="poster-brand-main">BEAUTYMAX</p>
              <p className="poster-kicker">DISTRIBUIDORA</p>
              <p className="poster-subtitle">PROFESIONALES DE LA BELLEZA</p>
            </div>

            <div className="poster-body">
              <p className="poster-line">
                Mas de <span>40</span> anos
              </p>
              <p className="poster-line">Trabajando con</p>
              <p className="poster-title">Exclusividad total</p>
              <p className="poster-line">
                al <strong>profesional</strong>
              </p>

              <p className="poster-line">Trabajamos con las</p>
              <p className="poster-line poster-line--violet">Mejores marcas</p>

              <div className="poster-brands">
                <a href="https://www.revlonprofessional.com/" target="_blank" rel="noreferrer" className="poster-brand-item poster-brand-item--single">
                  <span className="poster-brand-text">REVLON</span>
                  <small>PROFESSIONAL</small>
                </a>
                <a
                  href={BRANDS[3].source}
                  target="_blank"
                  rel="noreferrer"
                  className="poster-brand-item poster-brand-item--single"
                >
                  <img src={BRANDS[3].logo} alt={`Logo ${BRANDS[3].name}`} className="poster-brand-logo" />
                </a>
                <a
                  href={BRANDS[1].source}
                  target="_blank"
                  rel="noreferrer"
                  className="poster-brand-item poster-brand-item--single"
                >
                  <img src={BRANDS[1].logo} alt={`Logo ${BRANDS[1].name}`} className="poster-brand-logo" />
                </a>
                <div className="poster-brand-row">
                  <a href={BRANDS[2].source} target="_blank" rel="noreferrer" className="poster-brand-item">
                    <img
                      src={BRANDS[2].logo}
                      alt={`Logo ${BRANDS[2].name}`}
                      className={`poster-brand-logo ${BRANDS[2].logoTone === "light" ? "poster-brand-logo--light" : ""}`}
                    />
                  </a>
                  <a
                    href={BRANDS[0].source}
                    target="_blank"
                    rel="noreferrer"
                    className="poster-brand-item poster-brand-item--divider"
                  >
                    <img
                      src={BRANDS[0].logo}
                      alt={`Logo ${BRANDS[0].name}`}
                      className={`poster-brand-logo ${BRANDS[0].logoTone === "light" ? "poster-brand-logo--light" : ""}`}
                    />
                  </a>
                </div>
              </div>

              <p className="poster-claim">Juntos, potenciamos tu talento.</p>
              <p className="poster-slogan">Tu creas belleza, nosotros te acompanamos.</p>

              <div className="poster-website-wrap">
                <a className="poster-website" href="https://beautymaxuy.com/" target="_blank" rel="noreferrer">
                  Visita nuestra pagina <strong>beautymaxuy.com</strong>
                </a>
              </div>

              <div className="poster-meta">
                <span>+598 97 428 888</span>
                <span>{CATEGORIES.length} categorias</span>
                <span>{totalProducts} productos</span>
              </div>

              <div className="poster-benefits">
                <span>Ofertas exclusivas</span>
                <span>Envios a todo el pais</span>
                <span>Confianza total</span>
              </div>
            </div>
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
                        <img
                          src={brand.logo}
                          alt={`Logo ${brand.name}`}
                          className={`brand-logo ${brand.logoTone === "light" ? "brand-logo--light" : ""}`}
                        />
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
            <div className="tools-video-loop-wrap">
              <video className="tool-video" autoPlay muted loop playsInline preload="metadata">
                <source src={TOOLS_VIDEO} type="video/mp4" />
                Tu navegador no soporta video HTML5.
              </video>
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
