import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { HOME_SEO, SEO_PAGES, SITE_ORIGIN, absoluteUrl } from "../src/data/seoPages.js";
import { filterProductsForSeoPage } from "../src/lib/catalogFilters.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distDir = join(root, "dist");
const today = new Date().toISOString().slice(0, 10);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function injectHead(html, { title, description, path }) {
  const url = absoluteUrl(path);
  const image = absoluteUrl("/hero/beautymax-hero-poster.png");

  let next = html;
  next = next.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  next = next.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeHtml(description)}" />`,
  );
  next = next.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${url}" />`,
  );
  next = next.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/, `<meta property="og:url" content="${url}" />`);
  next = next.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
  );
  next = next.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
  );
  next = next.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
  );
  next = next.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
  );
  // ensure og:image stays www
  next = next.replaceAll("https://beautymaxuy.com/", `${SITE_ORIGIN}/`);
  next = next.replaceAll(`content="${SITE_ORIGIN}/hero/beautymax-hero-poster.png"`, `content="${image}"`);
  return next;
}

function buildStaticBody(page) {
  const products = filterProductsForSeoPage(page);
  const productItems = products
    .map((product) => `<li>${escapeHtml(product.name)}</li>`)
    .join("");
  const paragraphs = page.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("");
  const related = (page.related || [])
    .map((path) => {
      if (path === "/") return `<li><a href="/">Inicio Beautymax</a></li>`;
      const relatedPage = SEO_PAGES.find((item) => item.path === path);
      if (!relatedPage) return "";
      return `<li><a href="${relatedPage.path}">${escapeHtml(relatedPage.title)}</a></li>`;
    })
    .join("");

  return `
<main>
  <article>
    <h1>${escapeHtml(page.h1)}</h1>
    ${paragraphs}
    <h2>Productos disponibles</h2>
    <ul>${productItems || "<li>Consultar stock por WhatsApp</li>"}</ul>
    <p><a href="https://wa.me/59897428888?text=${encodeURIComponent(
      `Hola Beautymax, quiero consultar por ${page.whatsappLabel}.`,
    )}">Consultar ${escapeHtml(page.whatsappLabel)} por WhatsApp</a></p>
    <h2>También te puede interesar</h2>
    <ul>${related}</ul>
    <p><a href="/">Volver al inicio de Beautymax Uruguay</a></p>
  </article>
</main>`;
}

function writeRouteHtml(page, template) {
  const html = injectHead(template, page).replace(
    '<div id="root"></div>',
    `<div id="root">${buildStaticBody(page)}</div>`,
  );
  const outDir = join(distDir, page.path.replace(/^\//, ""));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html, "utf8");
}

function writeHomeStatic(template) {
  const homeBody = `
<main>
  <h1>${escapeHtml(HOME_SEO.h1)}</h1>
  <p>${escapeHtml(HOME_SEO.description)}</p>
  <nav>
    <ul>
      ${SEO_PAGES.map((page) => `<li><a href="${page.path}">${escapeHtml(page.title)}</a></li>`).join("")}
    </ul>
  </nav>
</main>`;
  const html = injectHead(template, HOME_SEO).replace(
    '<div id="root"></div>',
    `<div id="root">${homeBody}</div>`,
  );
  writeFileSync(join(distDir, "index.html"), html, "utf8");
}

function writeSitemap() {
  const urls = ["/", ...SEO_PAGES.map((page) => page.path)];
  const body = urls
    .map((path) => {
      const loc = absoluteUrl(path);
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${path === "/" ? "1.0" : "0.8"}</priority>\n  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  writeFileSync(join(distDir, "sitemap.xml"), xml, "utf8");
  writeFileSync(join(root, "public", "sitemap.xml"), xml, "utf8");
}

function writeRobots() {
  const robots = `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /admin/\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;
  writeFileSync(join(distDir, "robots.txt"), robots, "utf8");
  writeFileSync(join(root, "public", "robots.txt"), robots, "utf8");
}

function main() {
  const templatePath = join(distDir, "index.html");
  if (!existsSync(templatePath)) {
    throw new Error("dist/index.html no existe. Ejecutá vite build antes.");
  }

  const template = readFileSync(templatePath, "utf8");
  writeHomeStatic(template);
  for (const page of SEO_PAGES) {
    writeRouteHtml(page, template);
  }
  writeSitemap();
  writeRobots();
  console.log(`SEO prerender listo: home + ${SEO_PAGES.length} rutas (${today})`);
}

main();
