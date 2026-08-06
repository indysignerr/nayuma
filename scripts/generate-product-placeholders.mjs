import { mkdirSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { productSpecs } from "../src/lib/shopify/product-specs.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images", "products");
mkdirSync(outDir, { recursive: true });

const ACCENTS = {
  green: "#8a9a5c",
  black: "#a9682a",
  rooibos: "#bd5a3f",
  white: "#cdb15f",
  matcha: "#3f7a5d",
  chai: "#9c5a33",
  wellness: "#6f8f7a",
  gold: "#ab8a4d",
};

const CREAM = "#f6f0e3";
const INK = "#18140d";

function tinIllustration(accent) {
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="${CREAM}"/>
  <circle cx="200" cy="225" r="120" fill="${accent}" opacity="0.12"/>
  <rect x="140" y="120" width="120" height="180" rx="10" fill="#fffaf0" stroke="${INK}" stroke-width="1.5"/>
  <rect x="140" y="120" width="120" height="34" rx="10" fill="${accent}"/>
  <rect x="140" y="144" width="120" height="10" fill="${accent}"/>
  <circle cx="200" cy="137" r="6" fill="${CREAM}" stroke="${INK}" stroke-width="1"/>
  <path d="M 268 150 C 300 140, 310 110, 296 90 C 288 108, 272 118, 262 128" fill="none" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/>
</svg>`;
}

function coffretIllustration(accent) {
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="${CREAM}"/>
  <circle cx="200" cy="210" r="130" fill="${accent}" opacity="0.1"/>
  <rect x="110" y="150" width="180" height="120" rx="6" fill="#fffaf0" stroke="${INK}" stroke-width="1.5"/>
  <rect x="110" y="150" width="180" height="120" rx="6" fill="none" stroke="${accent}" stroke-width="3"/>
  <line x1="200" y1="150" x2="200" y2="270" stroke="${accent}" stroke-width="6"/>
  <line x1="110" y1="210" x2="290" y2="210" stroke="${accent}" stroke-width="6"/>
  <circle cx="200" cy="210" r="14" fill="${accent}"/>
</svg>`;
}

for (const spec of productSpecs) {
  const accent = ACCENTS[spec.accent] ?? ACCENTS.gold;
  const svg =
    spec.universe === "coffrets-accessoires" ? coffretIllustration(accent) : tinIllustration(accent);
  writeFileSync(path.join(outDir, `${spec.handle}.svg`), svg);
}

console.log(`Generated ${productSpecs.length} product placeholder illustrations.`);
