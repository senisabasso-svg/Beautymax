export const SITE_ORIGIN = "https://www.beautymaxuy.com";

export const HOME_SEO = {
  title: "Beautymax Uruguay | Distribuidora de peluquerías y barberías",
  description:
    "Distribuidora de peluquerías y barberías en Uruguay. Wella, Revlon, Kiepe, Organic Pro y Silkey. Consultá por WhatsApp y pagá en cuotas sin interés.",
  h1: "Beautymax Uruguay – Distribuidora de peluquerías y barberías",
  path: "/",
};

/** @typedef {{ path: string, title: string, description: string, h1: string, type: 'brand'|'category', filter: { brands?: string[], categories?: string[], sectionSlugs?: string[] }, related: string[], paragraphs: string[], whatsappLabel: string }} SeoPage */

/** @type {SeoPage[]} */
export const SEO_PAGES = [
  {
    path: "/wella",
    title: "Wella Professionals en Uruguay | Beautymax",
    description:
      "Productos Wella Professionals para peluquerías en Uruguay. Color Touch y coloración profesional en Beautymax. Consultá stock por WhatsApp.",
    h1: "Wella Professionals en Uruguay | Beautymax",
    type: "brand",
    filter: { brands: ["wella"] },
    related: ["/coloracion", "/revlon", "/silkey"],
    whatsappLabel: "Wella Professionals",
    paragraphs: [
      "En Beautymax Uruguay distribuimos Wella Professionals para salones que buscan coloración confiable, brillo y acabado de cabina. Wella es una referencia mundial en color tono sobre tono y sistemas de color que los peluqueros usan todos los días.",
      "En nuestro catálogo encontrás opciones como Wella Color Touch y otros productos de la línea profesional orientados a coloración y acabado. Trabajamos con venta exclusiva para profesionales: te asesoramos según el tipo de servicio que ofrezcas en tu peluquería o barbería.",
      "Podés consultar stock, tonos y presentaciones por WhatsApp. Enviamos a todo Uruguay y ofrecemos cuotas sin interés para que renueves tu cartelería de color sin fricción. Si ya trabajás Wella o querés incorporar la marca, escribinos y te armamos la propuesta.",
    ],
  },
  {
    path: "/revlon",
    title: "Revlon Professional en Uruguay | Beautymax",
    description:
      "Revlon Professional para peluquerías en Uruguay. Equave y cuidado profesional en Beautymax. Pedí por WhatsApp con envíos a todo el país.",
    h1: "Revlon Professional en Uruguay | Beautymax",
    type: "brand",
    filter: { brands: ["revlon"] },
    related: ["/tratamientos", "/wella", "/silkey"],
    whatsappLabel: "Revlon Professional",
    paragraphs: [
      "Revlon Professional es una de las marcas que más piden los salones uruguayos para cuidado, desenredado e hidratación rápida entre servicios. En Beautymax la ofrecemos con foco en productos de cabina que agilizan el trabajo del peluquero.",
      "En el catálogo destacamos líneas como Equave Bi-Face, ideales para desenredar e hidratar sin enjuague y mejorar el tacto del cabello después del lavado o del color. Son productos pensados para uso intensivo en peluquería profesional.",
      "Comprá Revlon Professional con asesoramiento Beautymax: consultá por WhatsApp, recibí en todo Uruguay y pagá en cuotas sin interés. Te ayudamos a elegir la presentación correcta según el volumen de tu salón.",
    ],
  },
  {
    path: "/kiepe",
    title: "Kiepe Professional en Uruguay | Beautymax",
    description:
      "Herramientas Kiepe Professional para peluquerías y barberías en Uruguay. Tijeras y máquinas profesionales en Beautymax. Consultá por WhatsApp.",
    h1: "Kiepe Professional en Uruguay | Beautymax",
    type: "brand",
    filter: { brands: ["kiepe", "hepike"] },
    related: ["/herramientas", "/maquinas-barberia", "/organic-pro"],
    whatsappLabel: "Kiepe Professional",
    paragraphs: [
      "Kiepe Professional es la marca de herramientas que elegimos para peluqueros y barberos que necesitan acero, filo y ergonomía de verdad. En Beautymax Uruguay somos referente en tijeras Monster Cut, Procut y líneas para zurdos, además de máquinas Hepike by Kiepe.",
      "Si buscás tijeras de corte, entresacar o kits de presentación, el catálogo Kiepe de Beautymax está pensado para cabina de uso intensivo. Cada herramienta se puede consultar con asesoramiento técnico: te orientamos según tu técnica de corte y si trabajás zurdo o diestro.",
      "Pedí Kiepe por WhatsApp, consultá stock y recibí en todo el país. Beautymax ofrece cuotas sin interés para que renueves tu set de herramientas sin detener el salón. Escribinos mencionando el modelo que necesitás.",
    ],
  },
  {
    path: "/organic-pro",
    title: "Organic Pro en Uruguay | Beautymax",
    description:
      "Organic Pro sin sal para peluquerías en Uruguay. Shampoo tónico, All in One y styling profesional en Beautymax. Consultá la línea por WhatsApp.",
    h1: "Organic Pro en Uruguay | Beautymax",
    type: "brand",
    filter: { brands: ["organic-pro"], sectionSlugs: ["organic-pro"] },
    related: ["/tratamientos", "/kiepe", "/coloracion"],
    whatsappLabel: "Organic Pro",
    paragraphs: [
      "Organic Pro es la colección profesional sin sal que Beautymax distribuye en Uruguay para salones que buscan activos naturales y resultados visibles en cabina. Ideal para tratamientos anticaída, reparación y leave-in de uso diario profesional.",
      "En el catálogo Organic Pro encontrás el Shampoo Tónico, la Colección All in One Reparador y la línea leave-in y styling con crema y shine serum. Cada producto está pensado para potenciar servicios de peluquería sin comprometer el brillo ni el tacto del cabello.",
      "Consultá la línea completa Organic Pro por WhatsApp. Enviamos a todo Uruguay y ofrecemos cuotas sin interés. Si querés exclusividad de marca en tu zona o armar un pack de cabina, te asesoramos de punta a punta.",
    ],
  },
  {
    path: "/silkey",
    title: "Silkey Professional en Uruguay | Beautymax",
    description:
      "Silkey Professional para peluquerías en Uruguay. Coloración Colorkey y productos de salón en Beautymax. Pedí stock por WhatsApp.",
    h1: "Silkey Professional en Uruguay | Beautymax",
    type: "brand",
    filter: { brands: ["silkey"] },
    related: ["/coloracion", "/wella", "/revlon"],
    whatsappLabel: "Silkey Professional",
    paragraphs: [
      "Silkey Professional acompaña a peluqueros de toda Latinoamérica con coloración crema estable y cobertura pareja. En Beautymax Uruguay la ofrecemos para salones que necesitan color profesional confiable a precio de distribuidora.",
      "En el catálogo destacamos Silkey Colorkey Milenium y otras presentaciones pensadas para uso intensivo en cabina. Te ayudamos a elegir según cobertura de canas, tono deseado y volumen de servicios de tu peluquería.",
      "Comprá Silkey con Beautymax: consultá por WhatsApp, recibí en todo el país y aprovechá cuotas sin interés. Somos distribuidora de peluquerías y barberías; el asesoramiento técnico está incluido en cada pedido.",
    ],
  },
  {
    path: "/coloracion",
    title: "Coloración profesional Uruguay | Beautymax",
    description:
      "Coloración profesional para peluquerías en Uruguay: Wella, Silkey, Pro You y Plasma. Distribuidora Beautymax con WhatsApp y cuotas sin interés.",
    h1: "Coloración profesional para peluquerías | Beautymax",
    type: "category",
    filter: { categories: ["coloracion"] },
    related: ["/wella", "/silkey", "/tratamientos"],
    whatsappLabel: "coloración profesional",
    paragraphs: [
      "La coloración es el corazón de muchos salones uruguayos. En Beautymax armamos un catálogo de coloración profesional con marcas que los peluqueros ya conocen: Wella Color Touch, Silkey Colorkey, Pro You Color Maker y decolorantes Plasma para aclaraciones en cabina.",
      "Trabajamos venta exclusiva para profesionales. Te orientamos en presentaciones, oxigenados asociados y estrategias de stock para no quedarte corto en temporada alta. Si necesitás color tono sobre tono, permanente o decoloración, tenemos opciones listas para pedir.",
      "Consultá coloración por WhatsApp, pedí envío a todo Uruguay y pagá en cuotas sin interés. Beautymax es tu distribuidora de peluquerías para renovar el carro de color sin demoras.",
    ],
  },
  {
    path: "/tratamientos",
    title: "Tratamientos capilares profesionales | Beautymax",
    description:
      "Tratamientos capilares para peluquerías en Uruguay: Revlon Equave, Plasma Mix, Organic Pro y más. Pedí en Beautymax por WhatsApp.",
    h1: "Tratamientos capilares profesionales | Beautymax",
    type: "category",
    filter: { categories: ["tratamientos"] },
    related: ["/organic-pro", "/revlon", "/coloracion"],
    whatsappLabel: "tratamientos capilares",
    paragraphs: [
      "Los tratamientos de cabina marcan la diferencia entre un servicio promedio y una clienta que vuelve. Beautymax distribuye ampollas, leave-in, shampoos técnicos y líneas reparadoras para peluquerías y barberías en Uruguay.",
      "En esta categoría encontrás Revlon Equave, Plasma Mix Triamínico, Organic Pro All in One, lacas y productos de styling profesional. Cada ítem está pensado para complementar color, alisados y servicios de reconstrucción.",
      "Pedí tratamientos por WhatsApp con asesoramiento Beautymax. Enviamos a todo el país y ofrecemos cuotas sin interés para que armes tu menú de servicios con stock completo.",
    ],
  },
  {
    path: "/herramientas",
    title: "Herramientas para peluquerías Uruguay | Beautymax",
    description:
      "Herramientas profesionales para peluquerías y barberías en Uruguay. Tijeras Kiepe y más en Beautymax. Consultá stock por WhatsApp.",
    h1: "Herramientas profesionales para peluquerías | Beautymax",
    type: "category",
    filter: { categories: ["herramientas"], sectionSlugs: ["herramientas"] },
    related: ["/kiepe", "/maquinas-barberia", "/"],
    whatsappLabel: "herramientas profesionales",
    paragraphs: [
      "Sin herramientas de calidad, el mejor servicio se traba. Beautymax es distribuidora de tijeras y herramientas profesionales para peluquerías y barberías en Uruguay, con foco en Kiepe Italia: Monster Cut, Procut y modelos para zurdos.",
      "En esta página reunimos el catálogo de herramientas recomendadas para corte, texturizado y terminaciones. También podés ver videos de demostración en la home y consultar el modelo exacto por WhatsApp antes de comprar.",
      "Renová tu set con Beautymax: envíos a todo Uruguay, cuotas sin interés y asesoramiento para elegir filo, tamaño y tipo de mango. Escribinos y te confirmamos stock al instante.",
    ],
  },
  {
    path: "/maquinas-barberia",
    title: "Máquinas de barbería Uruguay | Beautymax",
    description:
      "Máquinas y trimmers profesionales para barberías en Uruguay. Hepike by Kiepe y más en Beautymax. Consultá por WhatsApp.",
    h1: "Máquinas de barbería profesionales | Beautymax",
    type: "category",
    filter: { categories: ["maquinas-barberia"] },
    related: ["/kiepe", "/herramientas", "/"],
    whatsappLabel: "máquinas de barbería",
    paragraphs: [
      "Las barberías uruguayas necesitan máquinas resistentes para fades, contornos y terminaciones diarias. En Beautymax ofrecemos maquinaria profesional, incluyendo Hepike by Kiepe, pensada para uso intensivo en cabina.",
      "Si buscás cortadoras, trimmers o packs de herramientas de barbería, consultanos el stock actualizado. Te ayudamos a elegir según tipo de servicio, autonomía y presupuesto de tu local.",
      "Pedí máquinas de barbería por WhatsApp, recibí en todo el país y pagá en cuotas sin interés. Beautymax es tu distribuidora aliada para equipar barberías y peluquerías masculinas.",
    ],
  },
];

export const SEO_PAGE_BY_PATH = Object.fromEntries(SEO_PAGES.map((page) => [page.path, page]));

export const SEO_ROUTE_PATHS = SEO_PAGES.map((page) => page.path);

export function absoluteUrl(path = "/") {
  if (!path || path === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getRelatedPages(page) {
  return (page.related || [])
    .map((path) => (path === "/" ? { path: "/", title: "Inicio Beautymax", h1: HOME_SEO.h1 } : SEO_PAGE_BY_PATH[path]))
    .filter(Boolean);
}
