/**
 * Slayt kapsam kontrolü.
 *
 * "Konu anlatımları slayt/video oldu" iddiasının makine ile kanıtı: TÜM
 * kategorilerin (9 güverte + stabilite + 16 makine) TÜM alt konuları için
 * `buildLessonDeck()` çalıştırılır ve her konunun
 *   - en az bir slayt ürettiği,
 *   - her slaytın seslendirilecek metni olduğu
 * doğrulanır.
 *
 * `src/**` doğrudan Node'da çalıştırılamadığı için (yol takma adları, görsel
 * import'ları, lucide ikonları) esbuild ile geçici bir bundle üretilir.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import esbuild from "esbuild";

const repoRoot = process.cwd();
const srcRoot = path.join(repoRoot, "src");

const ASSET_EXTENSIONS = /\.(png|jpe?g|gif|svg|webp|avif|mp4|webm|mp3|wav|css)$/i;

/** `@/x` yol takma adını ve görsel import'larını Node için çözülebilir hâle getirir. */
const appResolverPlugin = {
  name: "app-resolver",
  setup(build) {
    const EXTENSIONS = ["", ".ts", ".tsx", ".js", ".jsx", ".json"];
    const resolveAlias = (specifier) => {
      const base = path.join(srcRoot, specifier.slice(2));
      for (const ext of EXTENSIONS) {
        const candidate = base + ext;
        if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
      }
      for (const ext of EXTENSIONS.slice(1)) {
        const candidate = path.join(base, `index${ext}`);
        if (fs.existsSync(candidate)) return candidate;
      }
      return base;
    };

    build.onResolve({ filter: /^@\// }, (args) => {
      const resolved = resolveAlias(args.path);
      if (ASSET_EXTENSIONS.test(resolved)) {
        return { path: resolved, namespace: "asset-stub" };
      }
      return { path: resolved, namespace: "file" };
    });

    // Görseller yalnızca URL string'i olarak kullanılır.
    build.onResolve({ filter: ASSET_EXTENSIONS }, (args) => ({
      path: args.path,
      namespace: "asset-stub",
    }));
    build.onLoad({ filter: /.*/, namespace: "asset-stub" }, (args) => ({
      contents: `export default ${JSON.stringify(args.path)};`,
      loader: "js",
    }));

    // İkonlar yalnızca yapılandırmada değer olarak taşınır; React'e gerek yok.
    build.onResolve({ filter: /^lucide-react$/ }, () => ({
      path: "lucide-react",
      namespace: "icon-stub",
    }));
    build.onLoad({ filter: /.*/, namespace: "icon-stub" }, () => ({
      // CommonJS olarak bırakılır: esbuild adlandırılmış import'ları statik
      // doğrulamaz, böylece her ikon adı Proxy'den karşılanır.
      contents:
        "const handler = { get: (_t, prop) => (prop === '__esModule' ? true : function Icon() { return null; }) };\n" +
        "module.exports = new Proxy({}, handler);",
      loader: "js",
    }));
  },
};

const ENTRY = `
import { getBetaCategories, getBetaTopicTitles } from "@/data/betaLessons";
import { buildLessonDeck } from "@/data/lessonSlides";

export function run() {
  const report = [];
  for (const category of getBetaCategories()) {
    const titles = getBetaTopicTitles(category.key);
    if (titles.length === 0) continue;

    const entry = { key: category.key, title: category.title, topics: titles.length, slides: 0, failures: [] };
    for (const title of titles) {
      const deck = buildLessonDeck(category.key, title, { withQuiz: true });
      if (!deck || deck.slides.length === 0) {
        entry.failures.push({ title, reason: "slayt üretilmedi" });
        continue;
      }
      const silent = deck.slides.filter((s) => !s.narration || s.narration.trim().length === 0);
      if (silent.length > 0) {
        entry.failures.push({ title, reason: silent.length + " slaytta seslendirme metni yok" });
      }
      entry.slides += deck.slides.length;
    }
    report.push(entry);
  }
  return report;
}
`;

const outFile = path.join(
  fs.mkdtempSync(path.join(os.tmpdir(), "lesson-decks-")),
  "check-lesson-decks.mjs",
);

await esbuild.build({
  stdin: { contents: ENTRY, resolveDir: repoRoot, loader: "ts", sourcefile: "check-entry.ts" },
  bundle: true,
  format: "esm",
  platform: "node",
  target: "node18",
  outfile: outFile,
  logLevel: "error",
  plugins: [appResolverPlugin],
});

const { run } = await import(pathToFileURL(outFile).href);
const report = run();

let totalTopics = 0;
let totalSlides = 0;
let totalFailures = 0;

console.log("Kategori                        Konu   Slayt   Ort.");
console.log("-".repeat(56));
for (const entry of report) {
  totalTopics += entry.topics;
  totalSlides += entry.slides;
  totalFailures += entry.failures.length;
  const average = entry.topics > 0 ? (entry.slides / entry.topics).toFixed(1) : "0";
  console.log(
    `${entry.title.padEnd(30).slice(0, 30)} ${String(entry.topics).padStart(5)} ${String(entry.slides).padStart(7)} ${average.padStart(6)}`,
  );
  for (const failure of entry.failures) {
    console.log(`   ✗ ${failure.title}: ${failure.reason}`);
  }
}
console.log("-".repeat(56));
console.log(`TOPLAM: ${report.length} kategori, ${totalTopics} konu, ${totalSlides} slayt`);

fs.rmSync(path.dirname(outFile), { recursive: true, force: true });

if (totalFailures > 0) {
  console.error(`\n${totalFailures} konu slayt üretemedi.`);
  process.exit(1);
}
if (totalTopics === 0) {
  console.error("\nHiç konu bulunamadı — kapsam kontrolü anlamsız.");
  process.exit(1);
}
console.log("\nTüm konular slayt anlatımına sahip.");
