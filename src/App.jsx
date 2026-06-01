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
    name: "Kiepe Italia - Monster cut",
    image: "/herramientas/kiepe-entresacar-kit.png",
    description: "Calidad 4 estrelllas - acero japones - filo de navaja",
  },
  {
    name: "Kiepe Italia - Monster cut",
    image: "/herramientas/kiepe-ergonomic-black-front.png",
    description: "Calidad 4 estrelllas - acero japones - filo de navaja",
  },
  {
    name: "Kiepe Italia - Monster cut",
    image: "/herramientas/kiepe-zurdo-box.png",
    description: "Calidad 4 estrelllas - acero japones - filo de navaja",
  },
  {
    name: "Kiepe Italia - Monster cut",
    image: "/herramientas/kiepe-presentacion-caja-blanca-nueva.png",
    description: "Calidad 4 estrelllas - acero japones - filo de navaja",
  },
  {
    name: "Kiepe Italia - Monster cut",
    image: "/herramientas/kiepe-ergonomic-black-closeup.png",
    description: "Calidad 4 estrelllas - acero japones - filo de navaja",
  },
  {
    name: "Kiepe Italia - Monster cut",
    image: "/herramientas/kiepe-gold-duo-set.png",
    description: "Calidad 4 estrelllas - acero japones - filo de navaja - tijera para zurdos",
  },
  {
    name: "Kiepe Italia - Monster cut",
    image: "/herramientas/kiepe-zurdo-front.png",
    description: "Calidad 4 estrelllas - acero japones - filo de navaja - tijera para zurdos",
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

function WhatsappIcon() {
  return (
    <svg className="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12.04 2.01a9.94 9.94 0 0 0-8.56 15.01L2 22l5.11-1.34a9.98 9.98 0 0 0 4.92 1.29h.01c5.52 0 10-4.48 10-9.99a9.95 9.95 0 0 0-10-9.95Zm0 18.13h-.01a8.28 8.28 0 0 1-4.22-1.15l-.3-.18-3.03.79.81-2.95-.2-.31a8.19 8.19 0 0 1 6.95-12.58 8.18 8.18 0 0 1 8.2 8.2 8.2 8.2 0 0 1-8.2 8.18Zm4.5-6.17c-.25-.13-1.47-.72-1.7-.8-.22-.08-.38-.13-.55.13-.17.25-.64.8-.79.97-.15.17-.29.18-.54.06-.25-.13-1.06-.39-2.02-1.24-.74-.67-1.25-1.49-1.4-1.74-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.42.08-.17.04-.31-.02-.43-.07-.12-.55-1.34-.75-1.84-.2-.48-.4-.42-.55-.43-.14 0-.31-.01-.47-.01-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.16 1.76 2.69 4.26 3.77.6.26 1.06.41 1.43.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.09-.22-.15-.47-.27Z" />
    </svg>
  );
}

function App() {
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
        <section id="productos" className="products-section">
          <div className="container">
            <div className="section-head">
              <h2>Productos destacados</h2>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="whatsapp-link">
                <WhatsappIcon />
                Ver catalogo completo
              </a>
            </div>
            <div className="product-grid">
              {featuredProducts.map((product) => (
                <article key={product.name} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <a href={getWhatsappProductUrl(product.name)} target="_blank" rel="noreferrer" className="whatsapp-link">
                    <WhatsappIcon />
                    Consultar por WhatsApp
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
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="whatsapp-link">
                <WhatsappIcon />
                Consultar stock
              </a>
            </div>
            <div className="product-grid">
              {featuredTools.map((product) => (
                <article key={product.image} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <a href={getWhatsappProductUrl(product.name)} target="_blank" rel="noreferrer" className="whatsapp-link">
                    <WhatsappIcon />
                    Consultar por WhatsApp
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
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="whatsapp-link">
                <WhatsappIcon />
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
