#!/usr/bin/env node
/**
 * Soru bankası regresyon kontrolü.
 *
 * Bankalar saf TypeScript veri dosyaları olduğu için (yalnızca `import type`
 * ve nesne literalleri), dosyalar bağımlılıksız okunur: `QuizQuestion[]` ve
 * `Record<string, QuizQuestion[]>` literalleri dengeli parantez taramasıyla
 * çıkarılıp değerlendirilir.
 *
 * Kontroller (hata → exit 1):
 *   - banka başına beklenen soru adedi
 *   - id'ler 1..N kesintisiz ve tekrarsız
 *   - options tam 4 eleman, dolu ve birbirinden farklı
 *   - correctAnswer 0..3 aralığında
 *   - explanation ve category dolu
 *   - banka içinde tekrar eden soru metni yok
 *   - doğru şık tek bir pozisyona yığılmamış (hiçbir indeks > %40)
 *
 * Rapor (hata değil): banka başına hesaplamalı (sayısal) soru oranı ve
 * doğru şık pozisyon dağılımı.
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Güverte bankaları: taban dosya + "Extended" devam dosyası, birlikte havuzu oluşturur. */
const DECK_BANKS = [
  { name: "stability", expected: 154, files: ["src/data/stabilityQuestions.ts", "src/data/stabilityQuestionsExtended.ts"] },
  { name: "navigation", expected: 300, files: ["src/data/navigationQuestions.ts", "src/data/navigationQuestionsExtended.ts"] },
  { name: "meteorology", expected: 159, files: ["src/data/meteorologyQuestions.ts", "src/data/meteorologyQuestionsExtended.ts"] },
  { name: "cargo", expected: 232, files: ["src/data/cargoQuestions.ts", "src/data/cargoQuestionsExtended.ts"] },
  { name: "safety", expected: 229, files: ["src/data/safetyQuestions.ts", "src/data/safetyQuestionsExtended.ts"] },
  { name: "seamanship", expected: 259, files: ["src/data/seamanshipQuestions.ts", "src/data/seamanshipQuestionsExtended.ts"] },
  { name: "environment", expected: 154, files: ["src/data/environmentQuestions.ts", "src/data/environmentQuestionsExtended.ts"] },
  { name: "communication", expected: 242, files: ["src/data/communicationQuestions.ts", "src/data/communicationQuestionsExtended.ts"] },
  { name: "economics", expected: 160, files: ["src/data/economicsQuestions.ts", "src/data/economicsQuestionsExtended.ts"] },
  { name: "machine", expected: 180, files: ["src/data/machineQuestions.ts", "src/data/machineQuestionsExtended.ts"] },
];

/** Makine konu bankası: slug → soru dizisi. Her slug için beklenen adet. */
const MACHINE_FILES = [
  "src/data/machineQuizData1.ts",
  "src/data/machineQuizData2.ts",
  "src/data/machineQuizData3.ts",
  "src/data/machineQuizData4.ts",
  "src/data/machineQuizData5.ts",
  "src/data/machineQuizDataExt1.ts",
  "src/data/machineQuizDataExt2.ts",
  "src/data/machineQuizDataExt3.ts",
  "src/data/machineQuizDataExt4.ts",
  "src/data/machineQuizDataExt5.ts",
  "src/data/machineQuizDataScenario.ts",
];

const MACHINE_SLUGS = [
  "thermodynamics",
  "auxiliary",
  "electrical",
  "automation",
  "maintenance",
  "erm",
  "fluid-mechanics",
  "machine-elements",
  "diesel-engines",
  "ship-systems",
  "engine-room-ops",
  "engine-room-safety",
  "environment-machine",
  "energy-efficiency",
  "fuel-technology",
  "cooling-hvac",
];

const MACHINE_EXPECTED_PER_SLUG = 154;

const errors = [];
const report = [];

const fail = (message) => errors.push(message);

/**
 * `startIndex`'teki açılış parantezinden başlayarak dengeli bloğu döndürür.
 * String literalleri (', ", `) ve yorumları atlar; parantez sayan naif
 * tarama bunlar yüzünden yanılmaz.
 */
function readBalanced(source, startIndex) {
  const open = source[startIndex];
  const close = open === "[" ? "]" : "}";
  let depth = 0;

  for (let i = startIndex; i < source.length; i += 1) {
    const char = source[i];

    if (char === '"' || char === "'" || char === "`") {
      const quote = char;
      i += 1;
      while (i < source.length) {
        if (source[i] === "\\") i += 1;
        else if (source[i] === quote) break;
        i += 1;
      }
      continue;
    }

    if (char === "/" && source[i + 1] === "/") {
      i = source.indexOf("\n", i);
      if (i === -1) break;
      continue;
    }

    if (char === "/" && source[i + 1] === "*") {
      i = source.indexOf("*/", i);
      if (i === -1) break;
      i += 1;
      continue;
    }

    if (char === open) depth += 1;
    else if (char === close) {
      depth -= 1;
      if (depth === 0) return source.slice(startIndex, i + 1);
    }
  }

  return null;
}

/** Dosyadaki `: QuizQuestion[] = [...]` literallerini sırayla değerlendirir. */
function readQuestionLiterals(relativePath) {
  const source = readFileSync(path.join(root, relativePath), "utf8");
  const pattern = /:\s*QuizQuestion\[\]\s*=\s*\[/g;
  const banks = [];

  let match;
  while ((match = pattern.exec(source)) !== null) {
    const literal = readBalanced(source, match.index + match[0].length - 1);
    if (!literal) {
      fail(`${relativePath}: dizi literali kapanmamış (offset ${match.index}).`);
      continue;
    }
    // Taban ve devam dizilerini birleştiren `[...a, ...b]` literali soru
    // taşımaz; yalnızca nesne literaliyle başlayan gerçek bankalar okunur.
    if (!/^\[\s*\{/.test(literal)) continue;
    banks.push(evaluate(literal, relativePath));
  }

  if (banks.length === 0) fail(`${relativePath}: QuizQuestion[] literali bulunamadı.`);
  return banks.flat();
}

/** Dosyadaki `: Record<string, QuizQuestion[]> = {...}` literalini değerlendirir. */
function readRecordLiteral(relativePath) {
  const source = readFileSync(path.join(root, relativePath), "utf8");
  const match = /:\s*Record<string,\s*QuizQuestion\[\]>\s*=\s*\{/.exec(source);
  if (!match) {
    fail(`${relativePath}: Record<string, QuizQuestion[]> literali bulunamadı.`);
    return {};
  }
  const literal = readBalanced(source, match.index + match[0].length - 1);
  if (!literal) {
    fail(`${relativePath}: nesne literali kapanmamış.`);
    return {};
  }
  return evaluate(literal, relativePath);
}

function evaluate(literal, relativePath) {
  try {
    return new Function(`return (${literal});`)();
  } catch (error) {
    fail(`${relativePath}: literal değerlendirilemedi — ${error.message}`);
    return [];
  }
}

const normalizeText = (value) =>
  String(value)
    .toLocaleLowerCase("tr-TR")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Hesaplamalı/sayısal soru sezgisi — yalnızca raporlama için.
 *
 * Şıkların çoğu sayı içeriyorsa soru bir değer veya hesap sorar; bu, birim
 * adlarını tek tek eşleştirmeye çalışmaktan çok daha az kırılgan bir ölçüttür.
 */
const isNumericQuestion = (question) =>
  question.options.filter((option) => /\d/.test(String(option))).length >= 3;

function checkQuestions(label, questions, expected) {
  if (questions.length !== expected) {
    fail(`${label}: ${expected} soru bekleniyordu, ${questions.length} bulundu.`);
  }

  const seenIds = new Set();
  const seenPrompts = new Map();
  const answerPositions = [0, 0, 0, 0];
  let numericCount = 0;

  questions.forEach((question, index) => {
    const where = `${label} #${index + 1} (id: ${question?.id})`;

    if (!question || typeof question !== "object") {
      fail(`${where}: soru nesnesi değil.`);
      return;
    }

    if (question.id !== index + 1) {
      fail(`${where}: id ${index + 1} olmalı (id'ler 1..N kesintisiz olmalı).`);
    }
    if (seenIds.has(question.id)) fail(`${where}: id tekrar ediyor.`);
    seenIds.add(question.id);

    if (typeof question.question !== "string" || question.question.trim() === "") {
      fail(`${where}: soru metni boş.`);
    } else {
      const key = normalizeText(question.question);
      if (seenPrompts.has(key)) {
        fail(`${where}: soru metni #${seenPrompts.get(key)} ile birebir aynı.`);
      } else {
        seenPrompts.set(key, index + 1);
      }
      if (Array.isArray(question.options) && isNumericQuestion(question)) numericCount += 1;
    }

    if (!Array.isArray(question.options) || question.options.length !== 4) {
      fail(`${where}: options tam 4 eleman olmalı (${question.options?.length} bulundu).`);
    } else {
      const trimmed = question.options.map((option) => String(option).trim());
      if (trimmed.some((option) => option === "")) fail(`${where}: boş şık var.`);
      if (new Set(trimmed.map(normalizeText)).size !== 4) {
        fail(`${where}: şıklar birbirinden farklı olmalı.`);
      }
    }

    if (
      !Number.isInteger(question.correctAnswer) ||
      question.correctAnswer < 0 ||
      question.correctAnswer > 3
    ) {
      fail(`${where}: correctAnswer 0..3 aralığında olmalı (${question.correctAnswer}).`);
    } else {
      answerPositions[question.correctAnswer] += 1;
    }

    if (typeof question.explanation !== "string" || question.explanation.trim() === "") {
      fail(`${where}: explanation boş.`);
    }
    if (typeof question.category !== "string" || question.category.trim() === "") {
      fail(`${where}: category boş.`);
    }
  });

  const total = questions.length || 1;
  const skewed = answerPositions.findIndex((count) => count / total > 0.4);
  if (skewed !== -1) {
    fail(
      `${label}: doğru cevapların %${Math.round((answerPositions[skewed] / total) * 100)}'i ` +
        `${skewed}. şıkta toplanmış (üst sınır %40).`,
    );
  }

  report.push({
    label,
    count: questions.length,
    numericRatio: Math.round((numericCount / total) * 100),
    answerPositions,
  });
}

// --- Güverte bankaları -------------------------------------------------------

for (const bank of DECK_BANKS) {
  const questions = bank.files.flatMap((file) => readQuestionLiterals(file));
  checkQuestions(bank.name, questions, bank.expected);
}

// --- Makine konu bankası -----------------------------------------------------

const machineBank = new Map();
for (const file of MACHINE_FILES) {
  for (const [slug, questions] of Object.entries(readRecordLiteral(file))) {
    machineBank.set(slug, [...(machineBank.get(slug) ?? []), ...questions]);
  }
}

for (const slug of MACHINE_SLUGS) {
  checkQuestions(`machine/${slug}`, machineBank.get(slug) ?? [], MACHINE_EXPECTED_PER_SLUG);
}

for (const slug of machineBank.keys()) {
  if (!MACHINE_SLUGS.includes(slug)) {
    fail(`machine/${slug}: beklenmeyen konu slug'ı (MACHINE_SLUGS listesine ekleyin).`);
  }
}

// --- Çıktı -------------------------------------------------------------------

const totalQuestions = report.reduce((sum, entry) => sum + entry.count, 0);

console.log("Soru bankası raporu (adet | sayısal ~% | doğru şık dağılımı)");
for (const entry of report) {
  console.log(
    `  ${entry.label.padEnd(28)} ${String(entry.count).padStart(4)} | ` +
      `%${String(entry.numericRatio).padStart(3)} | ${entry.answerPositions.join("/")}`,
  );
}
console.log(`  ${"TOPLAM".padEnd(28)} ${String(totalQuestions).padStart(4)}`);

if (errors.length > 0) {
  console.error(`\n❌ Soru bankası kontrolü başarısız (${errors.length} hata):`);
  for (const message of errors) console.error(`  - ${message}`);
  process.exit(1);
}

console.log(`\n✅ Soru bankaları doğrulandı: ${totalQuestions} soru, ${report.length} banka.`);
