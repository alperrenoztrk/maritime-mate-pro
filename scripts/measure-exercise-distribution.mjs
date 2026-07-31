/**
 * Alıştırma soru dağılımını ölçer.
 *
 * Her ders (beta kategori) için soruların konulara nasıl dağıldığını raporlar:
 * en yoğun konunun payı, boş kalan konu sayısı ve Gini katsayısı.
 * exerciseQuestionDistribution.ts üzerindeki değişikliklerin etkisini
 * önce/sonra karşılaştırmak için kullanılır.
 *
 * Kullanım: node scripts/measure-exercise-distribution.mjs [--detail]
 *
 * Veri modülleri "@/..." alias'ı ve görsel asset importları içerdiği için
 * Vite'ın SSR yükleyicisi üzerinden çalıştırılır.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** 0 = tam eşit dağılım, 1 = tüm sorular tek konuda. */
const giniCoefficient = (counts) => {
  const total = counts.reduce((sum, count) => sum + count, 0);
  if (total === 0 || counts.length <= 1) return 0;

  const sorted = [...counts].sort((left, right) => left - right);
  let weighted = 0;
  sorted.forEach((count, index) => {
    weighted += (index + 1) * count;
  });

  return (2 * weighted) / (sorted.length * total) - (sorted.length + 1) / sorted.length;
};

const percent = (value) => `${(value * 100).toFixed(1)}%`;

const server = await createServer({
  root: rootDir,
  configFile: false,
  logLevel: "error",
  server: { middlewareMode: true },
  resolve: { alias: { "@": path.join(rootDir, "src") } },
});

try {
  const { getBetaCategories } = await server.ssrLoadModule("/src/data/betaLessons.ts");
  const { getExerciseQuestionDistribution } = await server.ssrLoadModule(
    "/src/data/exerciseQuestionDistribution.ts",
  );

  const reports = [];
  for (const category of getBetaCategories()) {
    if (!category.enabled) continue;

    const distribution = getExerciseQuestionDistribution(category.key);
    if (distribution.totalQuestions === 0 || distribution.questionsByTopic.size === 0) continue;

    const entries = [...distribution.questionsByTopic.entries()].map(([topicId, questions]) => ({
      topicId,
      count: questions.length,
    }));
    const counts = entries.map((entry) => entry.count);
    const ranked = [...entries].sort((left, right) => right.count - left.count);

    reports.push({
      key: category.key,
      totalQuestions: distribution.totalQuestions,
      topicCount: entries.length,
      emptyTopics: counts.filter((count) => count === 0).length,
      topShare: ranked[0] ? ranked[0].count / distribution.totalQuestions : 0,
      gini: giniCoefficient(counts),
      top3: ranked.slice(0, 3),
    });
  }

  reports.sort((left, right) => right.topShare - left.topShare);

  console.log(["slug", "soru", "konu", "boş konu", "en yoğun pay", "gini"].join("\t"));
  for (const report of reports) {
    console.log(
      [
        report.key,
        report.totalQuestions,
        report.topicCount,
        `${report.emptyTopics}/${report.topicCount}`,
        percent(report.topShare),
        report.gini.toFixed(3),
      ].join("\t"),
    );
  }

  const totalQuestions = reports.reduce((sum, report) => sum + report.totalQuestions, 0);
  const totalTopics = reports.reduce((sum, report) => sum + report.topicCount, 0);
  const totalEmpty = reports.reduce((sum, report) => sum + report.emptyTopics, 0);
  const concentrated = reports.filter((report) => report.topShare >= 0.5);

  console.log("");
  console.log(`Ders sayısı           : ${reports.length}`);
  console.log(`Toplam soru           : ${totalQuestions}`);
  console.log(
    `Boş konu              : ${totalEmpty}/${totalTopics} (${percent(totalEmpty / totalTopics)})`,
  );
  console.log(`Payı >= %50 olan ders : ${concentrated.length}/${reports.length}`);
  console.log(
    `Ortalama en yoğun pay : ${percent(
      reports.reduce((sum, report) => sum + report.topShare, 0) / reports.length,
    )}`,
  );
  console.log(
    `Ortalama gini         : ${(
      reports.reduce((sum, report) => sum + report.gini, 0) / reports.length
    ).toFixed(3)}`,
  );

  if (process.argv.includes("--detail")) {
    console.log("");
    for (const report of reports.slice(0, 12)) {
      console.log(`${report.key} (${report.totalQuestions} soru, ${report.topicCount} konu)`);
      for (const entry of report.top3) {
        console.log(`  ${String(entry.count).padStart(4)}  ${entry.topicId}`);
      }
    }
  }
} finally {
  await server.close();
}
