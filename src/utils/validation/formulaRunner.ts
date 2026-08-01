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
import {
  buildCalculationRecord,
  calculationRecordToText,
  validateCalculationInputs,
} from "@/utils/calculationRecord";

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
    const inputs = entry.inputs ?? [];

    // 0) Profesyonel hesap sözleşmesi: izlenebilir formül, kaynak ve girdi tanımı.
    if (!entry.formula?.trim()) fail(where, "formül metni eksik");
    if (!entry.source?.code?.trim()) fail(where, "kaynak izi eksik");
    if (inputs.length === 0) fail(where, "hesap girdisi tanımlı değil");
    if (entry.variables.length === 0) fail(where, "formül değişkenleri tanımlı değil");

    const keys = new Set<string>();
    for (const input of inputs) {
      if (!input.key.trim()) fail(where, "boş girdi anahtarı");
      if (keys.has(input.key)) fail(where, `tekrarlanan girdi anahtarı: ${input.key}`);
      keys.add(input.key);
      if (!input.label.trim()) fail(where, `"${input.key}" girdi etiketi eksik`);
      if (input.placeholder === undefined || !Number.isFinite(Number(input.placeholder))) {
        fail(where, `"${input.key}" sayısal örnek değeri eksik/geçersiz`);
      }
    }

    // Boş alan hiçbir hesapta sessizce 0 kabul edilmemeli.
    const blankValidation = validateCalculationInputs(inputs, {});
    const requiredCount = inputs.filter((input) => input.required !== false).length;
    if (Object.keys(blankValidation.errors).length !== requiredCount) {
      fail(where, "boş girdi doğrulaması zorunlu alanları yakalamadı");
    }

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
      const steps = entry.steps ? entry.steps(vals) : buildAutoSteps(entry, vals, results);
      if (steps.length < 1) {
        fail(where, `buildAutoSteps boş döndü`);
      } else {
        // Son N adım her sonucu sırayla yansıtmalı (tutarlılık sözleşmesi).
        if (!entry.steps) {
          const tail = steps.slice(-results.length);
          results.forEach((r, i) => {
            if (tail[i]?.result !== r.value) {
              fail(where, `auto-step sonucu "${r.label}" calculate ile uyuşmuyor`);
            }
          });
        }

        // 3) Her hesap kopyalanabilir girdi/formül/sonuç/kaynak dökümü üretmeli.
        const record = buildCalculationRecord(
          entry,
          vals,
          results,
          steps,
          new Date("2026-08-01T00:00:00.000Z"),
        );
        const recordText = calculationRecordToText(record);
        for (const marker of ["GİRDİLER", "FORMÜL:", "SONUÇLAR", "İŞLEM İZİ", "KAYNAK:"]) {
          if (!recordText.includes(marker)) fail(where, `hesap dökümünde "${marker}" eksik`);
        }
        if (record.checks.some((check) => check.status === "error")) {
          fail(where, "örnek hesap dökümü hata kontrolü üretti");
        }
      }
    } catch (e) {
      fail(where, `buildAutoSteps exception: ${(e as Error).message}`);
    }

    // 4) Elle yazılmış steps() varsa (navigation) exception atmamalı.
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
