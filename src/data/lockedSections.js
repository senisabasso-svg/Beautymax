const ORGANIC_PRO_SECTION = {
  slug: "organic-pro",
  title: "Organic Pro",
  nav_label: "Organic Pro",
  section_type: "brand_featured",
  style_variant: "organic",
  kicker: "Colección profesional",
  hero_text:
    "Fórmulas sin sal, activos naturales y resultados visibles para salones. Elevá tus resultados con la exclusividad de Organic Pro.",
  hero_logo: "/brands/organic-pro-logo.png",
  show_in_nav: true,
};

export const LOCKED_SECTION_CONFIG = {
  "organic-pro": ORGANIC_PRO_SECTION,
};

export const LOCKED_SECTION_SLUGS = Object.keys(LOCKED_SECTION_CONFIG);

export function isLockedSection(section) {
  return Boolean(section?.slug && LOCKED_SECTION_SLUGS.includes(section.slug));
}

export function applyLockedSectionConfig(section) {
  if (!isLockedSection(section)) return section;
  return { ...section, ...LOCKED_SECTION_CONFIG[section.slug] };
}

export function isOrganicProSection(section) {
  return section?.slug === "organic-pro";
}
