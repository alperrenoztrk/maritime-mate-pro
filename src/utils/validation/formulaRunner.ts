/**
 * Formül güvenlik ağı (regresyon testi).
 * -------------------------------------------------------
 * Tüm derslerdeki her `CourseEntry.calculate`'i örnek girdilerle çalıştırır ve
 * `buildAutoSteps`'in tutarlı adımlar ürettiğini doğrular. Amaç: ~280 formülde
 * sessiz bozulmaları (0'a bölme → NaN/Infinity, exception, boş sonuç, auto-step
 * tutarsızlığı) CI/komut satırında erken yakalamak.
 *
 * Örnek girdiler `CalcInput.placeholder` değerlerinden gelir (temiz sayısal
 * örnekler, örn. "300"); yoksa 1 kullanılır.
 *
 * Çalıştırma: npx tsx src/utils/validation/formulaRunner.ts  (npm run test:formulas)
 */
import { courseTopics } from "@/data/courseContent";
import { buildAutoSteps } from "@/components/courseContent/autoSteps";
import type { CourseEntry } from "@/data/courseContent/types";

const failures: string[] = [];
const fail = (where: string, msg: string) => failures.push(`${where}: ${msg}`);

// Biçimlenmiş sonuç string'inde matematiksel patlama göstergeleri.
const BAD_VALUE = /\b(NaN|Infinity|undefined|null)\b/i;

const sampleInputs = (entry: CourseEntry): Record<string, number> => {
  const vals: Record<string, number> = {};
  for (const input of entry.inputs ?? []) {
    const n = Number(input.placeholder);
    vals[input.key] = Number.isFinite(n) ? n : 1;
  }
  return vals;
};

let checked = 0;

for (const [topicKey, topic] of Object.entries(courseTopics)) {
  for (const entry of topic.entries) {
    if (typeof entry.calculate !== "function") continue;
    checked++;
    const where = `${topicKey}/${entry.id}`;
    const vals = sampleInputs(entry);

    // 1) calculate() çalışmalı ve geçerli sonuç dizisi döndürmeli.
    let results;
    try {
      results = entry.calculate(vals);
    } catch (e) {
      fail(where, `calculate() exception: ${(e as Error).message}`);
      continue;
    }
    if (!Array.isArray(results) || results.length === 0) {
      fail(where, `calculate() boş/dizisiz sonuç döndürdü`);
      continue;
    }
    for (const r of results) {
      if (typeof r?.value !== "string" || r.value.trim() === "") {
        fail(where, `sonuç "${r?.label}" boş/string değil`);
      } else if (BAD_VALUE.test(r.value)) {
        fail(where, `sonuç "${r.label}" geçersiz değer: "${r.value}"`);
      }
    }

    // 2) buildAutoSteps tutarlı ve dolu adım üretmeli.
    try {
      const steps = buildAutoSteps(entry, vals, results);
      if (steps.length < 1) {
        fail(where, `buildAutoSteps boş döndü`);
      } else {
        // Son N adım her sonucu sırayla yansıtmalı (tutarlılık sözleşmesi).
        const tail = steps.slice(-results.length);
        results.forEach((r, i) => {
          if (tail[i]?.result !== r.value) {
            fail(where, `auto-step sonucu "${r.label}" calculate ile uyuşmuyor`);
          }
        });
      }
    } catch (e) {
      fail(where, `buildAutoSteps exception: ${(e as Error).message}`);
    }

    // 3) Elle yazılmış steps() varsa (navigation) exception atmamalı.
    if (typeof entry.steps === "function") {
      try {
        entry.steps(vals);
      } catch (e) {
        fail(where, `steps() exception: ${(e as Error).message}`);
      }
    }
  }
}

if (failures.length) {
  const message = [
    `Formül doğrulama BAŞARISIZ (${failures.length} sorun, ${checked} hesaplayıcı kontrol edildi):`,
    ...failures.map((f) => `- ${f}`),
  ].join("\n");
  console.error(message);
  process.exit(1);
}

console.log(`✅ Formül doğrulama geçti: ${checked} hesaplayıcı sorunsuz.`);
