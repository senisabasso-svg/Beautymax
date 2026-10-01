import { DEFAULT_PRODUCTS_BY_SLUG, DEFAULT_SECTIONS } from "../data/catalogDefaults.js";

const BRAND_PATTERNS = {
  wella: [/wella/i],
  revlon: [/revlon/i],
  kiepe: [/kiepe/i],
  hepike: [/hepike/i],
  silkey: [/silkey/i],
  "organic-pro": [/organic\s*pro/i],
  plasma: [/plasma/i],
  "pro you": [/pro\s*you/i],
};

const CATEGORY_PATTERNS = {
  coloracion: [/color|colorkey|deco|lifter|bleach|tono/i],
  tratamientos: [/equave|ampolla|triaminico|setter|shampoo|cream|serum|all in one|t[oó]nico|acondicionador|reparador|leave-in|styling|hairspray|laca/i],
  herramientas: [/kiepe|tijera|monster|procut|entresacar/i],
  "maquinas-barberia": [/maquina|m[aá]quinas|hepike|trimmer/i],
};

function collectDefaultProducts() {
  const products = [];
  for (const section of DEFAULT_SECTIONS) {
    for (const [index, product] of (DEFAULT_PRODUCTS_BY_SLUG[section.slug] || []).entries()) {
      products.push({
        ...product,
        id: product.id || `default-${section.slug}-${index}`,
        section_slug: section.slug,
        section_id: `default-${section.slug}`,
        metadata: product.metadata || {},
      });
    }
  }
  return products;
}

function collectLiveProducts(sections = [], productsBySectionId = {}) {
  const products = [];
  for (const section of sections) {
    for (const product of productsBySectionId[section.id] || []) {
      products.push({
        ...product,
        section_slug: section.slug,
        metadata: product.metadata || {},
      });
    }
  }
  return products.length ? products : collectDefaultProducts();
}

function matchesBrand(product, brandKey) {
  if (brandKey === "organic-pro" && product.section_slug === "organic-pro") return true;
  const patterns = BRAND_PATTERNS[brandKey] || [new RegExp(brandKey, "i")];
  const haystack = `${product.name || ""} ${product.description || ""} ${product.section_slug || ""}`;
  return patterns.some((pattern) => pattern.test(haystack));
}

function matchesCategory(product, categoryKey) {
  if (categoryKey === "herramientas" && product.section_slug === "herramientas") {
    return !matchesCategory(product, "maquinas-barberia");
  }
  const patterns = CATEGORY_PATTERNS[categoryKey];
  if (!patterns) return false;
  const haystack = `${product.name || ""} ${product.description || ""}`;
  return patterns.some((pattern) => pattern.test(haystack));
}

export function filterProductsForSeoPage(page, sections = [], productsBySectionId = {}) {
  const all = collectLiveProducts(sections, productsBySectionId);
  const { brands = [], categories = [], sectionSlugs = [] } = page.filter || {};

  const filtered = all.filter((product) => {
    const brandOk = !brands.length || brands.some((brand) => matchesBrand(product, brand));
    const categoryOk = !categories.length || categories.some((category) => matchesCategory(product, category));
    const sectionOk = !sectionSlugs.length || sectionSlugs.includes(product.section_slug);
    const rules = [];
    if (brands.length) rules.push(brandOk);
    if (categories.length) rules.push(categoryOk);
    if (sectionSlugs.length) rules.push(sectionOk);
    return rules.length ? rules.every(Boolean) : true;
  });

  // Prefer section-based Organic Pro / herramientas when empty brand filter edge cases
  if (!filtered.length && sectionSlugs.length) {
    return all.filter((product) => sectionSlugs.includes(product.section_slug));
  }

  return filtered;
}

export function productImageAlt(product, brandOrCategory) {
  const base = product.name || "Producto profesional";
  if (brandOrCategory) return `${base} – ${brandOrCategory} en Beautymax Uruguay`;
  return `${base} – producto profesional Beautymax`;
}
