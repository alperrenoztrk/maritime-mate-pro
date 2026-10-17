#!/usr/bin/env node
/**
 * Builds src/data/imageCredits.json from the credits tables under src/assets.
 *
 * The app shows this list on the "Image credits" page, which is how the
 * attribution required by CC BY / CC BY-SA images is given inside the app.
 * Run it after adding or removing a row in any CREDITS.md:
 *
 *   node scripts/images/build-credits.mjs
 *
 * A row is included when it links to Wikimedia Commons (markdown link or a
 * "File:" title). Rows for the app owner's own photos are skipped.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SOURCES = [
  "src/assets/IMAGE_CREDITS.md",
  "src/assets/lessons/CREDITS.md",
  "src/assets/meteorology/CREDITS.md",
  "src/assets/clouds/CREDITS.md",
  "src/assets/ship-systems/CREDITS.md",
  "src/assets/instruments/CREDITS.md",
];
const OUT = path.join(root, "src/data/imageCredits.json");

const commonsUrl = (title) =>
  `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(title.replace(/ /g, "_"))}`;

const cells = (line) =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());

const entries = [];
const seen = new Set();
for (const rel of SOURCES) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) continue;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    if (!line.trim().startsWith("|") || /^\|\s*-/.test(line.trim())) continue;
    const c = cells(line);
    if (c.length < 3) continue;
    const linkCell = c.find((x) => /commons\.wikimedia\.org|^File:/.test(x));
    if (!linkCell) continue;
    let title;
    let url;
    const md = linkCell.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (md) {
      title = md[1];
      url = md[2];
    } else {
      title = linkCell.replace(/^File:/, "").trim();
      url = commonsUrl(title);
    }
    const license = c[c.length - 1];
    const author = c.length >= 4 ? c[c.length - 2] : "";
    const key = url.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    entries.push({ title, url, author: author === "—" ? "" : author, license });
  }
}
entries.sort((a, b) => a.title.localeCompare(b.title, "en"));
fs.writeFileSync(OUT, `${JSON.stringify(entries, null, 1)}\n`);
console.log(`${entries.length} image credits written to ${path.relative(root, OUT)}`);
