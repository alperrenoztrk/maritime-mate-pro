import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

const modules = {
  navigation: {
    file: "src/data/operationalNavigationTopicContents.ts",
    exportName: "operationalNavigationTopicContents",
    requiredTopics: [
      "DR, EP ve Set-Drift ile Mevki İlerletme",
      "Köprüüstü Vardiyası, Standing Orders ve Kaptanı Çağırma",
      "Master-Pilot Exchange ve Pilotaj Vardiyası",
      "Seyir Cihazı Arızaları ve Yedek Seyir",
      "Ağır Havada Seyir ve Gemi Kullanma",
    ],
  },
  safety: {
    file: "src/data/operationalSafetyTopicContents.ts",
    exportName: "operationalSafetyTopicContents",
    requiredTopics: [
      "Gemide Tıbbi İlk Yardım ve TMAS",
      "ISPS, Gemi Güvenliği ve Korsanlık",
      "Denizcilikte Siber Güvenlik",
      "Çatışma Sonrası Acil Müdahale",
      "Karaya Oturma ve Yeniden Yüzdürme Emniyeti",
      "Flooding, Hasar Kontrolü ve Yara Savunma",
      "Acil Durum Komuta, Raporlama ve Delil Yönetimi",
    ],
  },
  cargo: {
    file: "src/data/operationalCargoTopicContents.ts",
    exportName: "operationalCargoTopicContents",
    requiredTopics: [
      "Petrol Tankeri Yük Operasyonları",
      "Kimyasal Tanker Yük Operasyonları",
      "LPG ve LNG Yük Operasyonları",
      "Cargo Care, Terleme ve Ambar Havalandırması",
      "Çelik, Kereste, Ağır Yük ve Ro-Ro Operasyonları",
      "Liman Yük Belgeleri, Protesto ve Hasar Yönetimi",
    ],
  },
  seamanship: {
    file: "src/data/operationalSeamanshipTopicContents.ts",
    exportName: "operationalSeamanshipTopicContents",
    requiredTopics: [
      "İleri Gemi Manevrası ve Pervane Etkileri",
      "Römorkör Kullanımı ve Yanaşma Planı",
      "İleri Demirleme ve Anchor Watch",
      "İleri Mooring ve Halat Yönetimi",
      "Gemi Yapısı ve Tekne Mukavemeti",
    ],
  },
  communication: {
    file: "src/data/operationalCommunicationTopicContents.ts",
    exportName: "operationalCommunicationTopicContents",
    requiredTopics: [
      "Operasyonel Maritime English ve Köprüüstü İletişimi",
      "Logbook, Statement ve Profesyonel Rapor Yazımı",
      "Acil Durum İngilizcesi ve Standart Durum Raporları",
      "Denetim, Surveyor ve PSC ile Mesleki İletişim",
    ],
  },
};

const failures = [];
let topicCount = 0;

for (const [category, config] of Object.entries(modules)) {
  const fullPath = path.join(repoRoot, config.file);
  if (!fs.existsSync(fullPath)) {
    failures.push(`${category}: dosya bulunamadı (${config.file})`);
    continue;
  }

  const source = fs.readFileSync(fullPath, "utf8");
  if (!source.includes(`export const ${config.exportName}`)) {
    failures.push(`${category}: ${config.exportName} export'u bulunamadı`);
  }

  for (const topic of config.requiredTopics) {
    topicCount += 1;
    if (!source.includes(`"${topic}": {`)) {
      failures.push(`${category}: zorunlu konu eksik: ${topic}`);
    }
  }

  const sectionCount = (source.match(/title:\s*"/g) ?? []).length;
  if (sectionCount < config.requiredTopics.length * 3) {
    failures.push(
      `${category}: konu/section derinliği beklenenden düşük (${sectionCount} title kaydı)`,
    );
  }
}

const aggregatorPath = path.join(repoRoot, "src/data/topicContents.ts");
const aggregator = fs.readFileSync(aggregatorPath, "utf8");
for (const { exportName } of Object.values(modules)) {
  if (!aggregator.includes(`...${exportName}`)) {
    failures.push(`topicContents.ts entegrasyonu eksik: ${exportName}`);
  }
}

if (!aggregator.includes("...navigationTopicContents")) {
  failures.push("Mevcut navigation içerikleri korunmuyor");
}
if (!aggregator.includes("...safetyTopicContents")) {
  failures.push("Mevcut safety içerikleri korunmuyor");
}
if (!aggregator.includes("...cargoTopicContents")) {
  failures.push("Mevcut cargo içerikleri korunmuyor");
}
if (!aggregator.includes("...seamanshipTopicContents")) {
  failures.push("Mevcut seamanship içerikleri korunmuyor");
}
if (!aggregator.includes("...communicationTopicContents")) {
  failures.push("Mevcut communication içerikleri korunmuyor");
}

if (failures.length > 0) {
  console.error("❌ Operasyonel müfredat kapsam kontrolü başarısız:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `✅ Operasyonel müfredat kapsamı doğrulandı: ${topicCount} zorunlu konu, 5 kategori ve mevcut içeriklerin additive entegrasyonu.`,
);
