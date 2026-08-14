/**
 * Bir beta dersinin konu başlıklarını ve konu başına düşen mevcut soru sayısını
 * listeler. Yeni soru yazarken hedef konunun kendi sözcük dağarcığını görmek için.
 *
 * Kullanım: node topics.mjs <ders-key>
 */
import path from "node:path";
import { createServer } from "vite";

const rootDir = "/home/user/maritime-mate-pro";
const lesson = process.argv[2];

const server = await createServer({
  root: rootDir,
  configFile: false,
  logLevel: "error",
  server: { middlewareMode: true },
  resolve: { alias: { "@": path.join(rootDir, "src") } },
});

try {
  const { getBetaModules } = await server.ssrLoadModule("/src/data/betaLessons.ts");
  const { getExerciseQuestionDistribution } = await server.ssrLoadModule(
    "/src/data/exerciseQuestionDistribution.ts",
  );

  const distribution = getExerciseQuestionDistribution(lesson);
  const counts = new Map(
    [...distribution.questionsByTopic.entries()].map(([id, qs]) => [id, qs.length]),
  );

  for (const module of getBetaModules(lesson)) {
    console.log(`## ${module.title}`);
    for (const topic of module.topics) {
      const n = counts.get(topic.id) ?? 0;
      console.log(`${n}\t${topic.id}\t${topic.title}`);
    }
  }
} finally {
  await server.close();
}
