import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ts = require("typescript");

const root = process.cwd();

function loadStandaloneTypescript(relativePath) {
  const filename = path.join(root, relativePath);
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
    fileName: filename,
    reportDiagnostics: true,
  });

  const diagnostics = output.diagnostics ?? [];
  if (diagnostics.length > 0) {
    throw new Error(
      diagnostics
        .map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"))
        .join("\n"),
    );
  }

  const module = { exports: {} };
  const evaluate = new Function("exports", "module", "require", output.outputText);
  evaluate(module.exports, module, () => {
    throw new Error(`${relativePath} standalone doğrulamada dış modül içermemelidir.`);
  });
  return { exports: module.exports, source };
}

const dataModule = loadStandaloneTypescript("src/data/shipSystemsData.ts");
const guideModule = loadStandaloneTypescript("src/data/shipSystemsProfessionalData.ts");
const { shipSystemsData } = dataModule.exports;
const { getProfessionalSystemGuide, hasProfessionalSystemGuide } = guideModule.exports;

const failures = [];
let topicCount = 0;

for (const [sectionId, section] of Object.entries(shipSystemsData)) {
  if (!section.topics.length) failures.push(`${sectionId}: konu yok`);

  section.topics.forEach((topic, topicIndex) => {
    topicCount += 1;
    const key = `${sectionId}/${topicIndex}`;
    if (!hasProfessionalSystemGuide(sectionId, topicIndex)) {
      failures.push(`${key}: profesyonel rehber eksik`);
      return;
    }

    const guide = getProfessionalSystemGuide(sectionId, topicIndex, topic.title);
    if (guide.flow.length !== 5) failures.push(`${key}: sistem akışı 5 aşama değil`);
    for (const field of ["prepare", "monitor", "verify", "stopAndEscalate", "records", "references"]) {
      if (!Array.isArray(guide[field]) || guide[field].length < 2) {
        failures.push(`${key}: ${field} yetersiz`);
      }
    }

    if (guide.purpose.length < 60) failures.push(`${key}: amaç açıklaması yüzeysel`);
    if (guide.boundary.length < 80) failures.push(`${key}: sistem sınırı yüzeysel`);
    if (!topic.operation?.length || !topic.faults?.length || !topic.precautions?.length) {
      failures.push(`${key}: mevcut operasyon/arıza/emniyet katmanı eksik`);
    }
  });
}

const radar = shipSystemsData["nav-systems"]?.topics[0];
const ecdis = shipSystemsData["nav-systems"]?.topics[1];

if (topicCount !== 74) failures.push(`Toplam konu 74 yerine ${topicCount}`);
if (!radar || radar.sections.length < 8) failures.push("Radar anlatımı en az 8 teknik bölüm içermiyor");
if (!ecdis || ecdis.sections.length < 9) failures.push("ECDIS anlatımı en az 9 teknik bölüm içermiyor");

const forbiddenClaims = [
  /tüm SOLAS gemileri iki adet onaylı ECDIS/i,
  /ECDIS type-specific training sertifikası zorunludur/i,
  /tüm ticari gemilerde bulunması zorunludur/i,
  /S-57\/S-101 standardında vektör harita/i,
  /MARPOL Annex I: kıyıdan >12 NM/i,
  /Class A: Tüm SOLAS gemileri için zorunlu/i,
  /SOLAS gereği her gemide en az bir manyetik pusula ve gyro/i,
  /SOLAS Chapter V Regulation 19 gereği tüm gemilerde zorunludur/i,
  /%34'ün altında oksijen konsantrasyonu/i,
  /IGS tank atmosferinde O₂ < %5 garantisi/i,
  /kıyıdan 20 NM içinde.*tatlı su üretimi/i,
  /Holding tank kapasitesi her gemide 2–3 günlük/i,
  /HRU bıçağı painter halatını keser/i,
];

for (const claim of forbiddenClaims) {
  if (claim.test(dataModule.source)) failures.push(`Aşırı genelleyici/eski ifade bulundu: ${claim}`);
}

if (failures.length > 0) {
  console.error(`Gemi sistemleri doğrulaması başarısız (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Gemi sistemleri doğrulandı: ${Object.keys(shipSystemsData).length} kategori, ${topicCount} konu, ` +
  `${radar.sections.length} radar bölümü, ${ecdis.sections.length} ECDIS bölümü.`,
);
