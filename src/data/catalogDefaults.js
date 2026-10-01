export const DEFAULT_SECTIONS = [
  {
    slug: "productos",
    title: "Productos destacados",
    nav_label: "Productos",
    section_type: "product_grid",
    style_variant: "default",
    sort_order: 1,
    show_in_nav: true,
  },
  {
    slug: "organic-pro",
    title: "Organic Pro",
    nav_label: "Organic Pro",
    section_type: "brand_featured",
    style_variant: "organic",
    kicker: "Colección profesional",
    hero_text:
      "Fórmulas sin sal, activos naturales y resultados visibles para salones. Elevá tus resultados con la exclusividad de Organic Pro.",
    hero_logo: "/brands/organic-pro-logo.png",
    sort_order: 2,
    show_in_nav: true,
  },
  {
    slug: "herramientas",
    title: "Herramientas recomendadas",
    nav_label: "Herramientas",
    section_type: "product_grid",
    style_variant: "surface",
    sort_order: 3,
    show_in_nav: true,
  },
  {
    slug: "categorias",
    title: "Colecciones",
    nav_label: "Categorias",
    section_type: "collection_cards",
    style_variant: "default",
    sort_order: 4,
    show_in_nav: true,
  },
];

export const DEFAULT_PRODUCTS_BY_SLUG = {
  productos: [
    {
      name: "Pro You The Color Maker + Aloe Vera",
      image_url: "/productos/proyou-colormaker-aloe-vera.png",
      description:
        "Coloracion permanente 90 ml enriquecida con aloe vera para color y cuidado en un solo paso.",
      show_description: false,
      sort_order: 1,
    },
    {
      name: "Pro You The Lifter 1 kg",
      image_url: "/productos/proyou-lifter-balde.png",
      description: "Polvo decolorante en balde para aclaraciones intensivas en cabina.",
      show_description: false,
      sort_order: 2,
    },
    {
      name: "Plasma Deco 9 Tonos",
      image_url: "/productos/plasma-deco-9-tonos.png",
      description: "Decolorante con accion tonalizante para neutralizar reflejos no deseados.",
      show_description: false,
      sort_order: 3,
    },
    {
      name: "Plasma Mix Triaminico (Caja)",
      image_url: "/productos/plasma-mix-triaminico-box.png",
      description: "Ampollas nutritivas de cisteina, cistina y metionina para apoyo tecnico en salon.",
      show_description: false,
      sort_order: 4,
    },
    {
      name: "Wella Color Touch",
      image_url: "/productos/wella-color-touch.png",
      description: "Coloracion tono sobre tono con acabado brillante y aspecto natural.",
      show_description: false,
      sort_order: 5,
    },
    {
      name: "Silkey Colorkey Milenium",
      image_url: "/productos/silkey-colorkey-milenium.png",
      description: "Coloracion crema de uso profesional con cobertura pareja y estabilidad de tono.",
      show_description: false,
      sort_order: 6,
    },
    {
      name: "Revlon Equave Bi-Face",
      image_url: "/productos/revlon-equave-biface.png",
      description: "Acondicionador bifasico sin enjuague para desenredar e hidratar al instante.",
      show_description: false,
      sort_order: 7,
    },
    {
      name: "Pro You The Setter Hairspray",
      image_url: "/productos/proyou-setter-hairspray.png",
      description: "Laca de fijacion extrema con control de brillo para peinados duraderos.",
      show_description: false,
      sort_order: 8,
    },
    {
      name: "Plasma Mix Triaminico (Ampolla)",
      image_url: "/productos/plasma-mix-triaminico-ampolla.png",
      description: "Ampolla nutritiva concentrada para complementar tratamientos capilares.",
      show_description: false,
      sort_order: 9,
    },
  ],
  "organic-pro": [
    {
      name: "Shampoo Tónico",
      image_url: "/productos/organic-pro/shampoo-tonico.png",
      description: "Sin sal. Anticaída y engrosamiento para cabina profesional.",
      show_description: true,
      sort_order: 1,
      metadata: { volume: "300 mL" },
    },
    {
      name: "Colección All in One Reparador",
      image_url: "/productos/organic-pro/linea-completa.png",
      description: "Línea reparadora sin sal con activos naturales para cabina profesional.",
      show_description: true,
      sort_order: 2,
      metadata: {
        includes: [
          "Shampoo All in One Reparador (500 mL / 1 L)",
          "Acondicionador All in One Reparador (500 mL / 1 L)",
          "Curl Cream Rulos",
          "Colágeno y Ácido Hialurónico",
        ],
      },
    },
    {
      name: "Colección leave-in y styling",
      image_url: "/productos/organic-pro/crema-y-serum.png",
      description: "Tratamiento multipropósito y acabado con brillo para salón.",
      show_description: true,
      sort_order: 3,
      metadata: {
        includes: ["All In One Hair Cream (100 mL)", "Shine Serum Styling (30 mL)"],
      },
    },
  ],
  herramientas: [
    {
      name: "Kiepe Italia - Monster cut",
      image_url: "/herramientas/kiepe-entresacar-kit.png",
      description: "Calidad 4 estrelllas - acero japones - filo de navaja - tijera para zurdos",
      show_description: true,
      sort_order: 1,
    },
    {
      name: "Kiepe Italia - Monster cut",
      image_url: "/herramientas/kiepe-ergonomic-black-front.png",
      description: "Calidad 4 estrelllas - acero japones - filo de navaja",
      show_description: true,
      sort_order: 2,
    },
    {
      name: "Kiepe Italia - Monster cut",
      image_url: "/herramientas/kiepe-zurdo-box.png",
      description: "Calidad 4 estrelllas - acero japones - filo de navaja",
      show_description: true,
      sort_order: 3,
    },
    {
      name: "Kiepe Italia - Monster cut",
      image_url: "/herramientas/kiepe-presentacion-caja-blanca-nueva.png",
      description: "Calidad 4 estrelllas - acero japones - filo de navaja",
      show_description: true,
      sort_order: 4,
    },
    {
      name: "Kiepe Italia - Monster cut",
      image_url: "/herramientas/kiepe-ergonomic-black-closeup.png",
      description: "Calidad 4 estrelllas - acero japones - filo de navaja",
      show_description: true,
      sort_order: 5,
    },
    {
      name: "Kiepe Italia - Monster cut",
      image_url: "/herramientas/kiepe-gold-duo-set.png",
      description: "Calidad 4 estrelllas - acero japones - filo de navaja",
      show_description: true,
      sort_order: 6,
    },
    {
      name: "Kiepe Italia - Monster cut",
      image_url: "/herramientas/kiepe-zurdo-front.png",
      description: "Calidad 4 estrelllas - acero japones - filo de navaja",
      show_description: true,
      sort_order: 7,
    },
    {
      name: "Kiepe Procut",
      image_url: "/herramientas/kiepe-procut-nueva.png",
      description: "Calidad 4 estrelllas - acero japones - filo de navaja - tijera para zurdos",
      show_description: true,
      sort_order: 8,
    },
    {
      name: "Kiepe Entresacar Monster cut",
      image_url: "/herramientas/kiepe-zurdo-entresacar-nueva.png",
      description: "Calidad 4 estrelllas - acero japones - filo de navaja - tijera para zurdos",
      show_description: true,
      sort_order: 9,
    },
    {
      name: "Maquinas Hepike By Kiepe",
      image_url: "/herramientas/maquinas-hepike-by-kiepe.png",
      description: "Maquina profesional para terminaciones y detalles.",
      show_description: true,
      sort_order: 10,
    },
  ],
  categorias: [
    {
      name: "Tijeras",
      description: "Modelos profesionales para corte, texturizado y precision en cabina.",
      show_description: true,
      sort_order: 1,
    },
    {
      name: "Maquinas",
      description: "Cortadoras y trimmers para barberia y peluqueria de uso intensivo.",
      show_description: true,
      sort_order: 2,
    },
    {
      name: "Secadores",
      description: "Potencia y control para secado rapido con acabado profesional.",
      show_description: true,
      sort_order: 3,
    },
    {
      name: "Planchas",
      description: "Herramientas para alisado y definicion con temperatura estable.",
      show_description: true,
      sort_order: 4,
    },
  ],
};

export const BRANDS = [
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
    source: "https://www.beautymaxuy.com/",
  },
  {
    name: "Silkey Professional",
    logo: "/brands/silkey-professional-logo.png",
    source: "https://tienda.silkeymundial.com/",
  },
  {
    name: "Organic Pro",
    logo: "/brands/organic-pro-logo.png",
    source: "#organic-pro",
    logoClass: "brand-logo-tall",
  },
];

export const TOOLS_VIDEOS = [
  "/videos/herramientas-1.mp4",
  "/videos/herramientas-2.mp4",
  "/videos/herramientas-3.mp4",
];

export const WHATSAPP_PHONE = "59897428888";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
  "Hola Beautymax, quiero consultar por sus productos.",
)}`;

export function buildDefaultCatalog() {
  const sections = DEFAULT_SECTIONS.map((section, index) => ({
    ...section,
    id: `default-${section.slug}`,
    nav_label: section.nav_label || section.title,
  }));

  const productsBySectionId = {};
  for (const section of sections) {
    productsBySectionId[section.id] = (DEFAULT_PRODUCTS_BY_SLUG[section.slug] || []).map((product, index) => ({
      ...product,
      id: `default-${section.slug}-${index}`,
      section_id: section.id,
      metadata: product.metadata || {},
    }));
  }

  return { sections, productsBySectionId, source: "defaults" };
}