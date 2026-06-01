import "./App.css";

const BRANDS = [
  {
    name: "Revlon Professional",
    logo: "/brands/revlon-professional.png",
    source: "https://www.revlonprofessional.com/",
  },
  {
    name: "Plasma",
    logo: "/brands/plasma-logo.png",
    source: "https://www.instagram.com/plasmaesthetic/",
  },
  {
    name: "Wella",
    logo: "/brands/wella-logo.png",
    source: "https://www.wella.com/professional/es-ES",
  },
  {
    name: "Kiepe Professional",
    logo: "/brands/kiepe-professional-logo.png",
    source: "https://www.kiepeuruguay.com/",
  },
  {
    name: "Beautymax Distribuidora",
    logo: "/brands/beautymax-distribuidora-logo.png",
    source: "https://beautymaxuy.com/",
  },
  {
    name: "Silkey Professional",
    logo: "/brands/silkey-professional-logo.png",
    source: "https://tienda.silkeymundial.com/",
  },
];

const WHATSAPP_PHONE = "59897428888";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
  "Hola Beautymax, quiero consultar por sus productos.",
)}`;

const CATEGORIES = [
  { title: "Tijeras", description: "Modelos profesionales para corte, texturizado y precision en cabina." },
  { title: "Maquinas", description: "Cortadoras y trimmers para barberia y peluqueria de uso intensivo." },
  { title: "Secadores", description: "Potencia y control para secado rapido con acabado profesional." },
  { title: "Planchas", description: "Herramientas para alisado y definicion con temperatura estable." },
];

const TOOLS_PRODUCTS = [
  {
    name: "Kiepe Entresacar con Estuche",
    image: "/herramientas/kiepe-entresacar-kit.png",
    description: "Tijera de entresacar profesional presentada en estuche premium.",
  },
  {
    name: "Kiepe Gold Set Corte y Pulido",
    image: "/herramientas/kiepe-gold-duo-set.png",
    description: "Set de tijeras doradas para corte y texturizado profesional.",
  },
  {
    name: "Kiepe Ergonomic Black en Estuche",
    image: "/herramientas/kiepe-ergonomic-black-front.png",
    description: "Modelo negro ergonomico con excelente balance y precision de corte.",
  },
  {
    name: "Kiepe Tijera para Zurdos",
    image: "/herramientas/kiepe-zurdo-box.png",
    description: "Version para zurdos en estuche de presentacion original.",
  },
  {
    name: "Kiepe Presentacion Caja Blanca",
    image: "/herramientas/kiepe-ergonomic-box-sleeve.png",
    description: "Caja de presentacion de linea Kiepe, ideal para exhibicion y entrega.",
  },
  {
    name: "Kiepe Ergonomic Black Detalle",
    image: "/herramientas/kiepe-ergonomic-black-closeup.png",
    description: "Primer plano del modelo ergonomico black con terminacion premium.",
  },
  {
    name: "Trimmer Hepike Profesional",
    image: "/herramientas/hepike-trimmer-pro.png",
    description: "Trimmer inalambrico para detalles, contornos y terminaciones de barberia.",
  },
];

const PRODUCTS_CATALOG = [
  {
    name: "Pro You The Color Maker + Aloe Vera",
    image: "/productos/proyou-colormaker-aloe-vera.png",
    description: "Coloracion permanente 90 ml enriquecida con aloe vera para color y cuidado en un solo paso.",
  },
  {
    name: "Plasma Deco 9 Tonos",
    image: "/productos/plasma-deco-9-tonos.png",
    description: "Decolorante con accion tonalizante para neutralizar reflejos no deseados.",
  },
  {
    name: "Plasma Mix Triaminico (Caja)",
    image: "/productos/plasma-mix-triaminico-box.png",
    description: "Ampollas nutritivas de cisteina, cistina y metionina para apoyo tecnico en salon.",
  },
  {
    name: "Wella Color Touch",
    image: "/productos/wella-color-touch.png",
    description: "Coloracion tono sobre tono con acabado brillante y aspecto natural.",
  },
  {
    name: "Silkey Colorkey Milenium",
    image: "/productos/silkey-colorkey-milenium.png",
    description: "Coloracion crema de uso profesional con cobertura pareja y estabilidad de tono.",
  },
  {
    name: "Revlon Equave Bi-Face",
    image: "/productos/revlon-equave-biface.png",
    description: "Acondicionador bifasico sin enjuague para desenredar e hidratar al instante.",
  },
  {
    name: "Pro You The Setter Hairspray",
    image: "/productos/proyou-setter-hairspray.png",
    description: "Laca de fijacion extrema con control de brillo para peinados duraderos.",
  },
  {
    name: "Pro You The Lifter 1 kg",
    image: "/productos/proyou-lifter-balde.png",
    description: "Polvo decolorante en balde para aclaraciones intensivas en cabina.",
  },
  {
    name: "Plasma Mix Triaminico (Ampolla)",
    image: "/productos/plasma-mix-triaminico-ampolla.png",
    description: "Ampolla nutritiva concentrada para complementar tratamientos capilares.",
  },
];

function App() {
  const totalProducts = PRODUCTS_CATALOG.length + TOOLS_PRODUCTS.length;
  const featuredProducts = PRODUCTS_CATALOG;
  const featuredTools = TOOLS_PRODUCTS;

  const getWhatsappProductUrl = (productName) =>
    `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
      `Hola Beautymax, quiero consultar por ${productName}.`,
    )}`;

  return (
    <>
      <div className="top-announcement">Paga en cuotas sin interes - Asesoramiento para profesionales</div>

      <header className="site-header">
        <div className="container header-main">
          <a className="brand" href="#inicio">
            <span className="brand-name">Beautymax Uruguay</span>
          </a>
          <nav className="site-nav">
            <a href="#categorias">Categorias</a>
            <a href="#productos">Productos</a>
            <a href="#herramientas">Herramientas</a>
            <a href="#marcas">Marcas</a>
            <a href="#contacto">Contacto</a>
          </nav>
        </div>
      </header>

      <section id="inicio" className="hero-section">
        <div className="container hero-content">
          <p className="hero-kicker">Nuevo lanzamiento</p>
          <h1>Distribuidora profesional para peluqueria y barberia</h1>
          <p className="hero-description">
            Formato visual renovado, rapido y claro para destacar colecciones, productos y marcas,
            con contacto directo por WhatsApp.
          </p>
          <div className="hero-actions">
            <a href="#productos" className="cta-main">
              Ver productos
            </a>
            <a href={WHATSAPP_URL} className="cta-secondary" target="_blank" rel="noreferrer">
              Consultar por WhatsApp
            </a>
          </div>
          <div className="hero-meta">
            <span>{totalProducts} productos</span>
            <span>{CATEGORIES.length} colecciones</span>
            <span>+598 97 428 888</span>
          </div>
        </div>
      </section>

      <main>
        <section id="productos" className="products-section">
          <div className="container">
            <div className="section-head">
              <h2>Productos destacados</h2>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Ver catalogo completo
              </a>
            </div>
            <div className="product-grid">
              {featuredProducts.map((product) => (
                <article key={product.name} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <a href={getWhatsappProductUrl(product.name)} target="_blank" rel="noreferrer">
                    Consultar
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="herramientas" className="tools-section">
          <div className="container">
            <div className="section-head">
              <h2>Herramientas recomendadas</h2>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Consultar stock
              </a>
            </div>
            <div className="product-grid">
              {featuredTools.map((product) => (
                <article key={product.name} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <a href={getWhatsappProductUrl(product.name)} target="_blank" rel="noreferrer">
                    Consultar
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="categorias" className="collections-section">
          <div className="container">
            <h2>Colecciones</h2>
            <div className="collection-grid">
              {CATEGORIES.map((category) => (
                <article key={category.title} className="collection-card">
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="marcas" className="brands-section">
          <div className="container">
            <h2>Marcas</h2>
            <div className="brand-grid">
              {BRANDS.map((brand) => (
                <a key={brand.name} href={brand.source} target="_blank" rel="noreferrer" className="brand-item">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className={brand.logoTone === "light" ? "brand-logo brand-logo-light" : "brand-logo"}
                  />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="newsletter-section">
          <div className="container">
            <h2>Recibi novedades de Beautymax</h2>
            <p>Dejanos tu correo y te compartimos lanzamientos y listas para profesionales.</p>
            <div className="newsletter-form" role="form" aria-label="Suscripcion a novedades">
              <input type="email" placeholder="Correo electronico" />
              <button type="button">Suscribirme</button>
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
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                +598 97 428 888
              </a>
            </p>
          </div>
          <div>
            <strong>Formas de pago</strong>
            <p>American Express - Diners Club - Mastercard - OCA - Visa</p>
            <small>© 2026 Beautymax. Todos los derechos reservados.</small>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
