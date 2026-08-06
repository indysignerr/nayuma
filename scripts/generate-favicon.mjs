import sharp from "sharp";
import { mkdirSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");
mkdirSync(publicDir, { recursive: true });

const monogram = (bg, fg) => `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="${bg}"/>
  <text x="50" y="67" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="54" fill="${fg}">N</text>
</svg>`;

const svgBuffer = Buffer.from(monogram("#18140d", "#f6f0e3"));

const targets = [
  { file: "favicon-16x16.png", size: 16 },
  { file: "favicon-32x32.png", size: 32 },
  { file: "favicon-48x48.png", size: 48 },
  { file: "apple-touch-icon.png", size: 180 },
  { file: "android-chrome-192x192.png", size: 192 },
  { file: "android-chrome-512x512.png", size: 512 },
];

for (const t of targets) {
  await sharp(svgBuffer).resize(t.size, t.size).png().toFile(path.join(publicDir, t.file));
}

const icoSizes = [16, 32, 48];
const icoBuffers = await Promise.all(
  icoSizes.map((size) => sharp(svgBuffer).resize(size, size).png().toBuffer())
);
const pngToIco = (await import("png-to-ico")).default;
const icoBuffer = await pngToIco(icoBuffers);
writeFileSync(path.join(publicDir, "favicon.ico"), icoBuffer);

const manifest = {
  name: "NAYUMA Tea & Mood",
  short_name: "NAYUMA",
  icons: [
    { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
  ],
  theme_color: "#18140d",
  background_color: "#f6f0e3",
  display: "standalone",
};
writeFileSync(path.join(publicDir, "site.webmanifest"), JSON.stringify(manifest, null, 2));

console.log("Favicon set generated.");
