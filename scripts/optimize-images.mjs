import sharp from "sharp";
import fg from "fast-glob";
import { mkdirSync, existsSync } from "node:fs";
import path from "node:path";

const HERO_WIDTHS = [480, 768, 1024, 1600];

const RULES = {
  brands: 350,
  herramientas: 460,
  productos: 800,
  hero: HERO_WIDTHS,
};

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

async function optimizeHero(file) {
  const meta = await sharp(file).metadata();
  console.log(`hero source: ${meta.width}x${meta.height} ${meta.format} ${meta.size || ""}`);
  for (const width of HERO_WIDTHS) {
    const base = path.join("public", "hero", `beautymax-hero-${width}`);
    await sharp(file)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(`${base}.webp`);
    await sharp(file)
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 50 })
      .toFile(`${base}.avif`);
    console.log(`  wrote ${base}.webp/.avif`);
  }
  // poster for video / fallback small webp
  await sharp(file)
    .resize({ width: 960, withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(path.join("public", "videos", "herramientas-poster.webp"));
}

async function optimizeTree(globPattern, width) {
  const files = await fg(globPattern, { onlyFiles: true });
  for (const file of files) {
    if (file.includes("beautymax-hero-")) continue;
    const parsed = path.parse(file);
    const webpOut = path.join(parsed.dir, `${parsed.name}.webp`);
    const avifOut = path.join(parsed.dir, `${parsed.name}.avif`);
    ensureDir(webpOut);
    await sharp(file)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(webpOut);
    await sharp(file)
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 55 })
      .toFile(avifOut);
    console.log(`optimized ${file}`);
  }
}

async function main() {
  await optimizeHero("public/hero/beautymax-hero-poster.png");
  await optimizeTree("public/brands/**/*.{png,jpg,jpeg}", RULES.brands);
  await optimizeTree("public/herramientas/**/*.{png,jpg,jpeg}", RULES.herramientas);
  await optimizeTree("public/productos/**/*.{png,jpg,jpeg}", RULES.productos);
  console.log("Image optimization done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
