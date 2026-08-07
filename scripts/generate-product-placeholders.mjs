import { mkdirSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { productSpecs } from "../src/lib/shopify/product-specs.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images", "products");
mkdirSync(outDir, { recursive: true });

const ACCENTS = {
  rose: "#d9a5a0",
  terracotta: "#8b4a34",
  sauge: "#8a9a7e",
  brun: "#4a342a",
  creme: "#e8dcc8",
  taupe: "#8c8378",
  cuivre: "#b5713f",
  or: "#c9a24b",
  "vert-fonce": "#3f5c4a",
};

const CREAM = "#f6f0e3";
const GOLD = "#ab8a4d";

function tinIllustration(accent) {
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="${CREAM}"/>
  <circle cx="200" cy="220" r="130" fill="${accent}" opacity="0.08"/>
  <rect x="140" y="130" width="120" height="190" rx="8" fill="${accent}"/>
  <rect x="140" y="130" width="120" height="190" rx="8" fill="none" stroke="${GOLD}" stroke-width="1" opacity="0.4"/>
  <line x1="150" y1="165" x2="250" y2="165" stroke="${GOLD}" stroke-width="1.5"/>
  <text x="200" y="200" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="15" letter-spacing="3" fill="${GOLD}">NAYUMA</text>
  <line x1="150" y1="285" x2="250" y2="285" stroke="${GOLD}" stroke-width="1.5"/>
  <rect x="132" y="104" width="136" height="30" rx="6" fill="${GOLD}"/>
  <ellipse cx="200" cy="104" rx="68" ry="10" fill="${GOLD}"/>
  <ellipse cx="200" cy="104" rx="68" ry="10" fill="#ffffff" opacity="0.15"/>
</svg>`;
}

function bottleIllustration(accent) {
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="${CREAM}"/>
  <circle cx="200" cy="220" r="130" fill="${accent}" opacity="0.08"/>
  <rect x="155" y="150" width="90" height="170" rx="14" fill="#fffaf0" stroke="${accent}" stroke-width="2"/>
  <rect x="155" y="150" width="90" height="56" rx="14" fill="${accent}"/>
  <rect x="178" y="110" width="44" height="46" rx="6" fill="#fffaf0" stroke="${GOLD}" stroke-width="1.5"/>
  <rect x="172" y="98" width="56" height="18" rx="6" fill="${GOLD}"/>
  <line x1="170" y1="230" x2="230" y2="230" stroke="${GOLD}" stroke-width="1.5"/>
  <text x="200" y="182" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="11" letter-spacing="2" fill="#fffaf0">NAYUMA</text>
</svg>`;
}

for (const spec of productSpecs) {
  const accent = ACCENTS[spec.accent] ?? ACCENTS.or;
  const svg = spec.category === "cosmetique" ? bottleIllustration(accent) : tinIllustration(accent);
  writeFileSync(path.join(outDir, `${spec.handle}.svg`), svg);
}

console.log(`Generated ${productSpecs.length} product placeholder illustrations.`);
