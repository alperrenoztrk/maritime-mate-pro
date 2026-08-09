#!/usr/bin/env node
/**
 * Soru bankası regresyon kontrolü.
 *
 * Bankalar saf TypeScript veri dosyaları olduğu için (yalnızca `import type`
 * ve nesne literalleri), dosyalar bağımlılıksız okunur: `QuizQuestion[]` ve
 * `Record<string, QuizQuestion[]>` literalleri dengeli parantez taramasıyla
 * çıkarılıp değerlendirilir.
 *
 * Kapsam: güverte bankaları, makine konu bankaları ve rehberli ders (beta)
 * akışlarının recap soruları.
 *
 * Kontroller (hata → exit 1):
 *   - banka başına beklenen soru adedi
 *   - id'ler 1..N kesintisiz ve tekrarsız (beta akışlarında akış başına)
 *   - options tam 4 eleman, dolu ve birbirinden farklı
 *   - correctAnswer 0..3 aralığında
 *   - explanation ve category dolu
 *   - banka içinde tekrar eden soru metni yok
 *   - doğru şık tek bir pozisyona yığılmamış (hiçbir indeks > %40)
 *   - doğru şık uzunluk ipucu vermiyor: soru bazında doğru şık / çeldirici
 *     uzunluk oranı bandı, banka bazında "tek başına en uzun" oranı ve
 *     ortalama oran (bkz. LENGTH_RULES / LENGTH_BUDGET / BALANCED_BANKS)
 *
 * Rapor (hata değil): banka başına hesaplamalı (sayısal) soru oranı, doğru şık
 * pozisyon dağılımı, doğru şıkkın tek başına en uzun olma oranı ve ortalama
 * uzunluk oranı.
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
  { name: "economics", expected: 170, files: ["src/data/economicsQuestions.ts", "src/data/economicsQuestionsExtended.ts"] },
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

/** Rehberli ders (beta) akışları: her dosya bir dersin akış listesini taşır. */
const BETA_FILES = [
  "src/data/lessonFlow/navigation.ts",
  "src/data/lessonFlow/meteorology.ts",
  "src/data/lessonFlow/machine.ts",
  "src/data/lessonFlow/communication.ts",
  "src/data/lessonFlow/stability.ts",
  "src/data/lessonFlow/cargo.ts",
  "src/data/lessonFlow/safety.ts",
  "src/data/lessonFlow/environment.ts",
  "src/data/lessonFlow/seamanship.ts",
  "src/data/lessonFlow/economics.ts",
];

/**
 * Uzunluk ipucu kuralları.
 *
 * Sorun: doğru şık gerekçesini de taşıyan tam cümle, çeldiriciler 2-3 kelimelik
 * kütük olduğunda "en uzun şıkkı seç" stratejisi bilgi olmadan doğru cevabı
 * bulur. Ölçüldüğünde bu strateji uygulama genelinde %84 isabet ediyordu.
 *
 * `band` soru bazındadır: doğru şıkkın uzunluğu / diğer üç şıkkın ortalaması.
 * `longest` ve `meanRatio` banka bazında toplulaştırılır. Sınırlar iki yönlüdür;
 * yoksa sömürü "en kısayı seç" biçiminde tersine döner.
 */
const LENGTH_RULES = {
  band: { min: 0.65, max: 1.55 },
  longest: { min: 0.15, max: 0.35 },
  meanRatio: { min: 0.9, max: 1.15 },
};

/**
 * Dengelenmiş bankalar: tam kural uygulanır. Bir dersin şıkları dengelendiğinde
 * bankası buraya taşınır ve LENGTH_BUDGET satırı silinir.
 */
const BALANCED_BANKS = new Set(["economics", "seamanship", "machine"]);

/**
 * Henüz dengelenmemiş bankaların tavanı (tam sayı yüzde): doğru şıkkın tek
 * başına en uzun olma oranının bugünkü ölçümü. Kapı bu bankalarda yalnızca daha
 * kötüye gitmeyi engeller; bir ders dengelendiğinde satırı silinir ve banka
 * BALANCED_BANKS'e taşınır. Listede olmayan banka doğrudan tam kurala tabidir,
 * böylece yeni bankalar dengeli doğar. Bütçeler yalnızca düşürülür.
 */
const LENGTH_BUDGET = {
  stability: 38,
  navigation: 40,
  meteorology: 57,
  cargo: 78,
  safety: 79,
  environment: 74,
  communication: 79,
  "machine/thermodynamics": 56,
  "machine/auxiliary": 91,
  "machine/electrical": 84,
  "machine/automation": 97,
  "machine/maintenance": 97,
  "machine/erm": 99,
  "machine/fluid-mechanics": 71,
  "machine/machine-elements": 85,
  "machine/diesel-engines": 94,
  "machine/ship-systems": 97,
  "machine/engine-room-ops": 97,
  "machine/engine-room-safety": 99,
  "machine/environment-machine": 84,
  "machine/energy-efficiency": 79,
  "machine/fuel-technology": 88,
  "machine/cooling-hvac": 90,
  "beta/navigation": 74,
  "beta/meteorology": 81,
  "beta/machine": 86,
  "beta/communication": 87,
  "beta/stability": 70,
  "beta/cargo": 93,
  "beta/safety": 89,
  "beta/environment": 89,
  "beta/seamanship": 100,
  "beta/economics": 97,
};

/**
 * Doğru şıkkın tek bir pozisyonda toplanma tavanı (tam sayı yüzde).
 *
 * Varsayılan %40. Rehberli ders (beta) havuzlarında doğru cevap neredeyse her
 * soruda ilk şıktır; bu ipucu kullanıcı tarafında `utils/quizOptions.ts` ile
 * sunumda şıklar karıştırılarak etkisizleştirildi, dolayısıyla veri sırası
 * artık sömürülebilir değil. Bütçe borcu kayda geçirmek içindir: bu havuzlar
 * yeniden yazıldıkça düşürülür, asla artırılmaz.
 */
const POSITION_BUDGET = {
  "beta/navigation": 97,
  "beta/meteorology": 100,
  "beta/machine": 100,
  "beta/communication": 100,
  "beta/stability": 100,
  "beta/cargo": 100,
  "beta/safety": 100,
  "beta/environment": 100,
  "beta/seamanship": 100,
  "beta/economics": 100,
};

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

/**
 * Rehberli ders dosyasındaki akışları `{ topicTitle, questions }` olarak okur.
 *
 * Akışların içindeki `questions` dizileri tip anotasyonu taşımadığı için
 * `readQuestionLiterals` deseni buraya uymaz: her `topicTitle` sonrası gelen
 * ilk `questions: [` bloğu dengeli taramayla alınır.
 */
function readFlowLiterals(relativePath) {
  const source = readFileSync(path.join(root, relativePath), "utf8");
  const titlePattern = /topicTitle:\s*"((?:[^"\\]|\\.)*)"/g;
  const flows = [];

  // Akış dosyaları kategori adını modül düzeyindeki bir sabitten alır
  // (`const NAV = "Seyir"` → `category: NAV`). Literal tek başına
  // değerlendirilemeyeceği için bu sabitler önsöz olarak eklenir.
  const prelude = [...source.matchAll(/^const\s+([A-Za-z_$][\w$]*)\s*=\s*("(?:[^"\\]|\\.)*");/gm)]
    .map(([, name, value]) => `const ${name} = ${value};`)
    .join("\n");

  let match;
  while ((match = titlePattern.exec(source)) !== null) {
    const start = source.indexOf("questions:", match.index);
    if (start === -1) {
      fail(`${relativePath}: "${match[1]}" akışında questions dizisi yok.`);
      continue;
    }
    const literal = readBalanced(source, source.indexOf("[", start));
    if (!literal) {
      fail(`${relativePath}: "${match[1]}" akışının questions dizisi kapanmamış.`);
      continue;
    }
    flows.push({ topicTitle: match[1], questions: evaluate(literal, relativePath, prelude) });
  }

  if (flows.length === 0) fail(`${relativePath}: akış bulunamadı.`);
  return flows;
}

function evaluate(literal, relativePath, prelude = "") {
  try {
    return new Function(`${prelude}\nreturn (${literal});`)();
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

/**
 * Doğru şıkkın uzunluğunun diğer üç şıkkın ortalamasına oranı. 1.0 = ayırt
 * edilemez; 2.0 = doğru şık çeldiricilerin iki katı uzunlukta.
 */
const lengthRatio = (question) => {
  const lengths = question.options.map((option) => String(option).trim().length);
  const others = lengths.filter((_, index) => index !== question.correctAnswer);
  const otherMean = others.reduce((sum, value) => sum + value, 0) / others.length;
  if (otherMean === 0) return Number.POSITIVE_INFINITY;
  return lengths[question.correctAnswer] / otherMean;
};

const isUniquelyLongest = (question) => {
  const lengths = question.options.map((option) => String(option).trim().length);
  const longest = Math.max(...lengths);
  return lengths[question.correctAnswer] === longest && lengths.filter((l) => l === longest).length === 1;
};

/**
 * Doğru cevabı içerikten bağımsız ele veren ipuçlarını denetler: şık pozisyonu
 * ve şık uzunluğu. Banka bazında toplulaştırılır (tek soruda oran anlamsızdır).
 */
function checkAnswerCues(label, questions) {
  const usable = questions.filter(
    (question) =>
      Array.isArray(question?.options) &&
      question.options.length === 4 &&
      Number.isInteger(question.correctAnswer) &&
      question.correctAnswer >= 0 &&
      question.correctAnswer < 4,
  );
  if (usable.length === 0) return { longestRate: 0, meanRatio: 0, answerPositions: [0, 0, 0, 0] };

  const total = usable.length;
  const answerPositions = [0, 0, 0, 0];
  const outOfBand = [];
  let uniqueLongest = 0;
  let ratioSum = 0;

  usable.forEach((question, index) => {
    answerPositions[question.correctAnswer] += 1;
    const ratio = lengthRatio(question);
    ratioSum += ratio;
    if (isUniquelyLongest(question)) uniqueLongest += 1;
    if (ratio < LENGTH_RULES.band.min || ratio > LENGTH_RULES.band.max) {
      outOfBand.push({ where: `#${index + 1} (id: ${question.id})`, ratio });
    }
  });

  const longestRate = uniqueLongest / total;
  const meanRatio = ratioSum / total;

  const positionCap = POSITION_BUDGET[label] ?? 40;
  const skewed = answerPositions.findIndex(
    (count) => Math.round((count / total) * 100) > positionCap,
  );
  if (skewed !== -1) {
    fail(
      `${label}: doğru cevapların %${Math.round((answerPositions[skewed] / total) * 100)}'i ` +
        `${skewed}. şıkta toplanmış (üst sınır %${positionCap}).`,
    );
  }

  if (BALANCED_BANKS.has(label) || !(label in LENGTH_BUDGET)) {
    if (longestRate > LENGTH_RULES.longest.max || longestRate < LENGTH_RULES.longest.min) {
      fail(
        `${label}: doğru şık soruların %${Math.round(longestRate * 100)}'inde tek başına en uzun ` +
          `(izinli aralık %${LENGTH_RULES.longest.min * 100}-${LENGTH_RULES.longest.max * 100}).`,
      );
    }
    if (meanRatio > LENGTH_RULES.meanRatio.max || meanRatio < LENGTH_RULES.meanRatio.min) {
      fail(
        `${label}: doğru şık / çeldirici uzunluk oranı ortalaması ${meanRatio.toFixed(2)} ` +
          `(izinli aralık ${LENGTH_RULES.meanRatio.min}-${LENGTH_RULES.meanRatio.max}).`,
      );
    }
    if (outOfBand.length > 0) {
      const sample = outOfBand
        .slice(0, 5)
        .map((entry) => `${entry.where} oran ${entry.ratio.toFixed(2)}`)
        .join(", ");
      fail(
        `${label}: ${outOfBand.length} soruda doğru şık uzunluğu ` +
          `${LENGTH_RULES.band.min}-${LENGTH_RULES.band.max} bandının dışında — ${sample}` +
          (outOfBand.length > 5 ? ", …" : ""),
      );
    }
  } else if (Math.round(longestRate * 100) > LENGTH_BUDGET[label]) {
    fail(
      `${label}: doğru şıkkın tek başına en uzun olma oranı %${Math.round(longestRate * 100)}, ` +
        `bütçe %${LENGTH_BUDGET[label]}. Bu banka henüz dengelenmedi; yeni sorular ` +
        `çeldiricilerle eşit uzunlukta yazılmalı (bütçe artırılmaz, düşürülür).`,
    );
  }

  return { longestRate, meanRatio, answerPositions };
}

function checkQuestions(label, questions, expected) {
  if (expected !== null && questions.length !== expected) {
    fail(`${label}: ${expected} soru bekleniyordu, ${questions.length} bulundu.`);
  }

  const seenIds = new Set();
  const seenPrompts = new Map();
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
    }

    if (typeof question.explanation !== "string" || question.explanation.trim() === "") {
      fail(`${where}: explanation boş.`);
    }
    if (typeof question.category !== "string" || question.category.trim() === "") {
      fail(`${where}: category boş.`);
    }
  });

  return Math.round((numericCount / (questions.length || 1)) * 100);
}

/** Bir bankayı hem yapısal hem ipucu kurallarıyla denetler ve rapora ekler. */
function checkBank(label, questions, expected) {
  const numericRatio = checkQuestions(label, questions, expected);
  const cues = checkAnswerCues(label, questions);
  report.push({
    label,
    count: questions.length,
    numericRatio,
    answerPositions: cues.answerPositions,
    longestRate: cues.longestRate,
    meanRatio: cues.meanRatio,
  });
}

// --- Güverte bankaları -------------------------------------------------------

for (const bank of DECK_BANKS) {
  const questions = bank.files.flatMap((file) => readQuestionLiterals(file));
  checkBank(bank.name, questions, bank.expected);
}

// --- Makine konu bankası -----------------------------------------------------

const machineBank = new Map();
for (const file of MACHINE_FILES) {
  for (const [slug, questions] of Object.entries(readRecordLiteral(file))) {
    machineBank.set(slug, [...(machineBank.get(slug) ?? []), ...questions]);
  }
}

for (const slug of MACHINE_SLUGS) {
  checkBank(`machine/${slug}`, machineBank.get(slug) ?? [], MACHINE_EXPECTED_PER_SLUG);
}

for (const slug of machineBank.keys()) {
  if (!MACHINE_SLUGS.includes(slug)) {
    fail(`machine/${slug}: beklenmeyen konu slug'ı (MACHINE_SLUGS listesine ekleyin).`);
  }
}

// --- Rehberli ders (beta) akışları -------------------------------------------
//
// Yapısal kurallar akış bazında (id'ler her akışta 1'den başlar); pozisyon ve
// uzunluk oranları ise ders bazında toplulaştırılır — ortalama 2.6 soruluk bir
// akışta oran hesabı anlamsız olurdu.

for (const file of BETA_FILES) {
  const module = path.basename(file, ".ts");
  const flows = readFlowLiterals(file);
  const all = [];

  for (const flow of flows) {
    checkQuestions(`beta/${module}/${flow.topicTitle}`, flow.questions, null);
    all.push(...flow.questions);
  }

  const cues = checkAnswerCues(`beta/${module}`, all);
  report.push({
    label: `beta/${module} (${flows.length} akış)`,
    count: all.length,
    numericRatio: null,
    answerPositions: cues.answerPositions,
    longestRate: cues.longestRate,
    meanRatio: cues.meanRatio,
  });
}

// --- Çıktı -------------------------------------------------------------------

const totalQuestions = report.reduce((sum, entry) => sum + entry.count, 0);

console.log(
  "Soru bankası raporu (adet | sayısal ~% | doğru şık dağılımı | doğru şık en uzun % | uzunluk oranı)",
);
for (const entry of report) {
  const numeric = entry.numericRatio === null ? "  —" : `%${String(entry.numericRatio).padStart(3)}`;
  console.log(
    `  ${entry.label.padEnd(34)} ${String(entry.count).padStart(4)} | ` +
      `${numeric} | ${entry.answerPositions.join("/").padEnd(15)} | ` +
      `%${String(Math.round(entry.longestRate * 100)).padStart(3)} | ${entry.meanRatio.toFixed(2)}`,
  );
}
console.log(`  ${"TOPLAM".padEnd(28)} ${String(totalQuestions).padStart(4)}`);

if (errors.length > 0) {
  console.error(`\n❌ Soru bankası kontrolü başarısız (${errors.length} hata):`);
  for (const message of errors) console.error(`  - ${message}`);
  process.exit(1);
}

console.log(`\n✅ Soru bankaları doğrulandı: ${totalQuestions} soru, ${report.length} banka.`);
