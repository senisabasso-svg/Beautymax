import { useEffect, useState } from "react";
import "./App.css";

const BRANDS = [
  "Wella",
  "Silkey",
  "Plasma",
  "Kiepe",
  "Organic Pro",
  "L'Oreal Professionnel",
  "Alfaparf Milano",
  "Schwarzkopf",
];

const WHATSAPP_URL =
  "https://wa.me/59897428888?text=Hola%20Beautymax%2C%20quiero%20consultar%20por%20sus%20productos.";

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

  const maxIndex = Math.max(0, BRANDS.length - visibleCards);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [maxIndex]);

  const showPrev = () => {
    setIndex((current) => (current <= 0 ? maxIndex : current - 1));
  };

  const showNext = () => {
    setIndex((current) => (current >= maxIndex ? 0 : current + 1));
  };

  return (
    <>
      <header className="hero">
        <div className="container hero-content">
          <img src="/logo-beautymax.png" alt="Logo de Beautymax" className="logo" />
          <h1>Beautymax</h1>
          <p>
            Distribuidor de productos para belleza profesional. Conecta rapido por WhatsApp para
            consultar precios y stock.
          </p>
          <a className="whatsapp-button" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            Escribir por WhatsApp
          </a>
        </div>
      </header>

      <main>
        <section className="brands-section">
          <div className="container">
            <h2>Marcas con las que trabaja</h2>
            <p className="section-description">Algunas marcas destacadas:</p>

            <div className="carousel-wrapper" aria-label="Carrusel de marcas">
              <button className="carousel-button" aria-label="Marca anterior" onClick={showPrev}>
                &#10094;
              </button>

              <div className="carousel-track-container">
                <ul
                  className="carousel-track"
                  style={{ transform: `translateX(calc(-${index} * (100% / ${visibleCards})))` }}
                >
                  {BRANDS.map((brand) => (
                    <li key={brand} className="brand-card">
                      {brand}
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
      </main>

      <footer>
        <p>
          Seguinos en Instagram:{" "}
          <a href="https://www.instagram.com/beautymaxuy/" target="_blank" rel="noreferrer">
            @beautymaxuy
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
