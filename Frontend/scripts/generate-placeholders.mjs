import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public", "images");

const PALETTES = {
  emerald: ["#1f4d38", "#2f6e4d"],
  gold: ["#8a5a35", "#b8912f"],
  black: ["#15140f", "#23211a"],
  earth: ["#6b4423", "#8a5a35"],
};

function svg({ label, sub = "", palette = "emerald", w = 1200, h = 1200 }) {
  const [c1, c2] = PALETTES[palette];
  const fontSize = Math.round(w * 0.055);
  const subFontSize = Math.round(w * 0.03);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <pattern id="grain" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="1.1" fill="#ffffff" opacity="0.06"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#grain)"/>
  <rect x="${w * 0.06}" y="${h * 0.06}" width="${w * 0.88}" height="${h * 0.88}" fill="none" stroke="#f6f1e4" stroke-opacity="0.35" stroke-width="2"/>
  <text x="50%" y="${sub ? "48%" : "50%"}" text-anchor="middle" font-family="Georgia, serif" font-size="${fontSize}" fill="#fffdf9" font-weight="600">${label}</text>
  ${sub ? `<text x="50%" y="58%" text-anchor="middle" font-family="Georgia, serif" font-size="${subFontSize}" fill="#f6f1e4" opacity="0.85">${sub}</text>` : ""}
</svg>`;
}

const files = [
  // products
  { path: "products/regrow-hair-growth-oil-1.svg", label: "Regrow Hair", sub: "Growth Oil", palette: "emerald" },
  { path: "products/hair-grease-1.svg", label: "Hair Grease", palette: "gold" },
  { path: "products/shampoo-1.svg", label: "Shampoo", palette: "emerald" },
  { path: "products/conditioner-1.svg", label: "Conditioner", palette: "gold" },
  { path: "products/honey-turmeric-black-soap-1.svg", label: "Honey & Turmeric", sub: "Black Soap", palette: "earth" },
  { path: "products/glow-brightening-oil-1.svg", label: "Glow Brightening Oil", palette: "emerald" },
  { path: "products/haircare-bundle-1.svg", label: "Haircare Bundle", palette: "gold" },
  { path: "products/skincare-bundle-1.svg", label: "Skincare Bundle", palette: "emerald" },
  // site imagery
  { path: "hero.svg", label: "WE GROW. WE GLOW.", sub: "Farm-to-Beauty", palette: "black", w: 1920, h: 1280 },
  { path: "farm/step-farm.svg", label: "Farm", palette: "emerald" },
  { path: "farm/step-raw-materials.svg", label: "Raw Materials", palette: "gold" },
  { path: "farm/step-processing.svg", label: "Processing", palette: "emerald" },
  { path: "farm/step-formulation.svg", label: "Formulation", palette: "gold" },
  { path: "farm/step-production.svg", label: "Production", palette: "emerald" },
  { path: "farm/step-routine.svg", label: "Your Beauty Routine", palette: "gold" },
  { path: "about-story.svg", label: "Euckays Industries", sub: "Our Story", palette: "black", w: 1600, h: 1200 },
  { path: "farm-hero.svg", label: "Our Farm", palette: "emerald", w: 1920, h: 1000 },
];

for (const f of files) {
  const full = join(publicDir, f.path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, svg(f));
}

console.log(`Generated ${files.length} placeholder images in ${publicDir}`);
