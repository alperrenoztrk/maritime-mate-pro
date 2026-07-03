#!/usr/bin/env node
/**
 * Locale file generator using the free Google Translate (gtx) API.
 * -----------------------------------------------------------------
 * Reads scripts/i18n/source-strings.json (produced by i18n:extract) plus a
 * hard-coded list of UI component strings not covered by the static extractor,
 * then translates everything to each target language and writes
 * public/locales/<lang>.json dictionaries.
 *
 * Usage:
 *   node scripts/i18n/generate-locales-gtx.mjs [--lang=en,de] [--limit=N]
 *
 * The gtx API is unofficial but works without credentials. Requests are sent
 * concurrently with a configurable limit to stay within informal rate limits.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {
  getMaritimeTranslationOverride,
  applyMaritimeCorrections,
} from '../../src/utils/maritimeGlossary.ts';
import {
  BATCH_SEPARATOR,
  buildTranslationBatches,
  splitBatchResult,
} from '../../src/utils/pageTranslator.ts';
import { normalizeMachineTranslation } from '../../src/utils/translationQuality.ts';
import { CONTEXTUAL_CORRECTIONS } from './contextual-corrections.mjs';

const repoRoot = process.cwd();
const SOURCE_FILE = path.join(repoRoot, 'scripts/i18n/source-strings.json');
const CACHE_DIR   = path.join(repoRoot, 'scripts/i18n/.cache');
const OUT_DIR     = path.join(repoRoot, 'public/locales');

const GTX_ENDPOINT = 'https://translate.googleapis.com/translate_a/single';
// Each request now carries a whole BATCH (~up to 48 strings / 1200 chars), so a
// lower worker count keeps us well under gtx's informal rate limits while still
// translating the large corpus in a reasonable wall-time.
const CONCURRENCY = 15;    // parallel batch-fetch workers
const RETRY_MAX   = 4;
const RETRY_DELAY = 1500;  // ms between retries on 429 (grows linearly)

// Manual corrections for strings where the GTX engine is known to produce bad
// output. Key = Turkish source string, value = map of langCode → correct translation.
const MANUAL_CORRECTIONS = {
  'Doğru!':  { en: 'Correct!', de: 'Richtig!', fr: 'Correct !', es: '¡Correcto!', it: 'Corretto!', pt: 'Correto!', ru: 'Правильно!', ja: '正解！', ko: '정답!', 'zh-CN': '正确！', ar: 'صحيح!', hi: 'सही!', nl: 'Correct!', sv: 'Rätt!', no: 'Riktig!', da: 'Korrekt!', fi: 'Oikein!', pl: 'Poprawnie!', cs: 'Správně!', hu: 'Helyes!', ro: 'Corect!', el: 'Σωστό!', bg: 'Правилно!', uk: 'Правильно!' },
  'Hesapla': { en: 'Calculate', de: 'Berechnen', fr: 'Calculer', es: 'Calcular', it: 'Calcola', pt: 'Calcular', ru: 'Рассчитать', ja: '計算', ko: '계산', 'zh-CN': '计算', ar: 'احسب', hi: 'गणना करें', nl: 'Berekenen', sv: 'Beräkna', no: 'Beregn', da: 'Beregn', fi: 'Laske', pl: 'Oblicz', cs: 'Vypočítat', hu: 'Számítás', ro: 'Calculați', el: 'Υπολογισμός', bg: 'Изчисли', uk: 'Обчислити' },
  'İyi! Biraz daha çalışmayla mükemmel olabilirsiniz.': { en: 'Good! With a little more work you can be perfect.', de: 'Gut! Mit etwas mehr Übung können Sie perfekt sein.', fr: 'Bien ! Avec un peu plus de travail, vous pouvez être parfait.', es: '¡Bien! Con un poco más de trabajo puedes ser perfecto.', it: 'Bene! Con un po\' più di lavoro puoi essere perfetto.', pt: 'Bom! Com um pouco mais de trabalho você pode ser perfeito.', ru: 'Хорошо! С немного большей практикой вы можете стать идеальным.', ja: '良い！もう少し練習すれば完璧になれます。', ko: '좋아요! 조금만 더 노력하면 완벽해질 수 있습니다.', 'zh-CN': '很好！再多练习一下就能完美了。', ar: 'جيد! مع القليل من العمل الإضافي يمكنك أن تكون مثاليًا.', hi: 'अच्छा! थोड़े और अभ्यास से आप परिपूर्ण हो सकते हैं।', nl: 'Goed! Met wat meer oefening kun je perfect zijn.', sv: 'Bra! Med lite mer träning kan du vara perfekt.', no: 'Bra! Med litt mer øvelse kan du bli perfekt.', da: 'Godt! Med lidt mere arbejde kan du være perfekt.', fi: 'Hyvä! Hieman lisää harjoittelulla voit olla täydellinen.', pl: 'Dobrze! Z trochę większą pracą możesz być doskonały.', cs: 'Dobře! S trochou více práce můžete být dokonalý.', hu: 'Jó! Kicsit több gyakorlással tökéletes lehet.', ro: 'Bine! Cu puțin mai multă muncă poți fi perfect.', el: 'Καλά! Με λίγο περισσότερη δουλειά μπορείς να είσαι τέλειος.', bg: 'Добре! С малко повече работа можете да бъдете перфектни.', uk: 'Добре! Ще трохи практики і ви будете ідеальні.' },
  // Adım adım çözüm + yapay zeka arayüzü (autoSteps.ts, StepByStepSolution.tsx, CalculatorCard.tsx)
  'Verilen değerler': { en: 'Given values', de: 'Gegebene Werte', fr: 'Valeurs données', es: 'Valores dados', it: 'Valori dati', pt: 'Valores fornecidos', ru: 'Заданные значения', ja: '与えられた値', ko: '주어진 값', 'zh-CN': '给定值', ar: 'القيم المعطاة', hi: 'दिए गए मान', nl: 'Gegeven waarden', sv: 'Givna värden', no: 'Gitte verdier', da: 'Givne værdier', fi: 'Annetut arvot', pl: 'Dane wartości', cs: 'Zadané hodnoty', hu: 'Adott értékek', ro: 'Valori date', el: 'Δεδομένες τιμές', bg: 'Дадени стойности', uk: 'Задані значення' },
  'Uygulanan formül': { en: 'Applied formula', de: 'Angewandte Formel', fr: 'Formule appliquée', es: 'Fórmula aplicada', it: 'Formula applicata', pt: 'Fórmula aplicada', ru: 'Применённая формула', ja: '適用される式', ko: '적용된 공식', 'zh-CN': '应用的公式', ar: 'الصيغة المطبقة', hi: 'लागू सूत्र', nl: 'Toegepaste formule', sv: 'Tillämpad formel', no: 'Anvendt formel', da: 'Anvendt formel', fi: 'Sovellettu kaava', pl: 'Zastosowany wzór', cs: 'Použitý vzorec', hu: 'Alkalmazott képlet', ro: 'Formulă aplicată', el: 'Εφαρμοζόμενος τύπος', bg: 'Приложена формула', uk: 'Застосована формула' },
  'Adım Adım Çözüm': { en: 'Step-by-Step Solution', de: 'Schritt-für-Schritt-Lösung', fr: 'Solution étape par étape', es: 'Solución paso a paso', it: 'Soluzione passo passo', pt: 'Solução passo a passo', ru: 'Пошаговое решение', ja: 'ステップバイステップの解法', ko: '단계별 풀이', 'zh-CN': '分步解答', ar: 'حل خطوة بخطوة', hi: 'चरण-दर-चरण समाधान', nl: 'Stapsgewijze oplossing', sv: 'Steg-för-steg-lösning', no: 'Trinn-for-trinn-løsning', da: 'Trin-for-trin-løsning', fi: 'Vaiheittainen ratkaisu', pl: 'Rozwiązanie krok po kroku', cs: 'Řešení krok za krokem', hu: 'Lépésről lépésre megoldás', ro: 'Soluție pas cu pas', el: 'Λύση βήμα προς βήμα', bg: 'Решение стъпка по стъпка', uk: 'Покрокове розв\'язання' },
  'Çözümü Adım Adım Göster': { en: 'Show Step-by-Step Solution', de: 'Schritt-für-Schritt-Lösung anzeigen', fr: 'Afficher la solution étape par étape', es: 'Mostrar solución paso a paso', it: 'Mostra soluzione passo passo', pt: 'Mostrar solução passo a passo', ru: 'Показать пошаговое решение', ja: 'ステップバイステップの解法を表示', ko: '단계별 풀이 보기', 'zh-CN': '显示分步解答', ar: 'عرض الحل خطوة بخطوة', hi: 'चरण-दर-चरण समाधान दिखाएं', nl: 'Stapsgewijze oplossing tonen', sv: 'Visa steg-för-steg-lösning', no: 'Vis trinn-for-trinn-løsning', da: 'Vis trin-for-trin-løsning', fi: 'Näytä vaiheittainen ratkaisu', pl: 'Pokaż rozwiązanie krok po kroku', cs: 'Zobrazit řešení krok za krokem', hu: 'Lépésről lépésre megoldás megjelenítése', ro: 'Afișează soluția pas cu pas', el: 'Εμφάνιση λύσης βήμα προς βήμα', bg: 'Покажи решение стъпка по стъпка', uk: 'Показати покрокове розв\'язання' },
  'Adımları Gizle': { en: 'Hide Steps', de: 'Schritte ausblenden', fr: 'Masquer les étapes', es: 'Ocultar pasos', it: 'Nascondi passaggi', pt: 'Ocultar etapas', ru: 'Скрыть шаги', ja: 'ステップを隠す', ko: '단계 숨기기', 'zh-CN': '隐藏步骤', ar: 'إخفاء الخطوات', hi: 'चरण छिपाएं', nl: 'Stappen verbergen', sv: 'Dölj steg', no: 'Skjul trinn', da: 'Skjul trin', fi: 'Piilota vaiheet', pl: 'Ukryj kroki', cs: 'Skrýt kroky', hu: 'Lépések elrejtése', ro: 'Ascunde pașii', el: 'Απόκρυψη βημάτων', bg: 'Скрий стъпките', uk: 'Сховати кроки' },
  'Bu işlemi yapay zekaya sor': { en: 'Ask AI about this calculation', de: 'Die KI zu dieser Berechnung fragen', fr: 'Interroger l\'IA sur ce calcul', es: 'Preguntar a la IA sobre este cálculo', it: 'Chiedi all\'IA questo calcolo', pt: 'Pergunte à IA sobre este cálculo', ru: 'Спросить ИИ об этом расчёте', ja: 'この計算をAIに尋ねる', ko: '이 계산을 AI에게 물어보기', 'zh-CN': '就此计算询问AI', ar: 'اسأل الذكاء الاصطناعي عن هذه العملية', hi: 'इस गणना के बारे में AI से पूछें', nl: 'Vraag AI over deze berekening', sv: 'Fråga AI om denna beräkning', no: 'Spør KI om denne beregningen', da: 'Spørg AI om denne beregning', fi: 'Kysy tekoälyltä tästä laskelmasta', pl: 'Zapytaj AI o to obliczenie', cs: 'Zeptejte se AI na tento výpočet', hu: 'Kérdezd meg az MI-t erről a számításról', ro: 'Întreabă IA despre acest calcul', el: 'Ρωτήστε την AI για αυτόν τον υπολογισμό', bg: 'Попитайте ИИ за това изчисление', uk: 'Запитати ШІ про цей розрахунок' },
  'Yapay Zeka Açıklaması': { en: 'AI Explanation', de: 'KI-Erklärung', fr: 'Explication de l\'IA', es: 'Explicación de la IA', it: 'Spiegazione dell\'IA', pt: 'Explicação da IA', ru: 'Объяснение ИИ', ja: 'AIの説明', ko: 'AI 설명', 'zh-CN': 'AI 解释', ar: 'شرح الذكاء الاصطناعي', hi: 'AI व्याख्या', nl: 'AI-uitleg', sv: 'AI-förklaring', no: 'KI-forklaring', da: 'AI-forklaring', fi: 'Tekoälyn selitys', pl: 'Wyjaśnienie AI', cs: 'Vysvětlení AI', hu: 'MI-magyarázat', ro: 'Explicație IA', el: 'Εξήγηση AI', bg: 'Обяснение от ИИ', uk: 'Пояснення ШІ' },
  'Hazırlanıyor...': { en: 'Preparing...', de: 'Wird vorbereitet...', fr: 'Préparation...', es: 'Preparando...', it: 'Preparazione...', pt: 'Preparando...', ru: 'Подготовка...', ja: '準備中...', ko: '준비 중...', 'zh-CN': '准备中...', ar: 'جارٍ التحضير...', hi: 'तैयार हो रहा है...', nl: 'Voorbereiden...', sv: 'Förbereder...', no: 'Forbereder...', da: 'Forbereder...', fi: 'Valmistellaan...', pl: 'Przygotowywanie...', cs: 'Příprava...', hu: 'Előkészítés...', ro: 'Se pregătește...', el: 'Προετοιμασία...', bg: 'Подготвя се...', uk: 'Підготовка...' },
  'Açıklama alınamadı. Lütfen tekrar deneyin.': { en: 'Could not get explanation. Please try again.', de: 'Erklärung konnte nicht abgerufen werden. Bitte versuchen Sie es erneut.', fr: 'Impossible d\'obtenir l\'explication. Veuillez réessayer.', es: 'No se pudo obtener la explicación. Inténtelo de nuevo.', it: 'Impossibile ottenere la spiegazione. Riprova.', pt: 'Não foi possível obter a explicação. Tente novamente.', ru: 'Не удалось получить объяснение. Пожалуйста, попробуйте снова.', ja: '説明を取得できませんでした。もう一度お試しください。', ko: '설명을 가져올 수 없습니다. 다시 시도해 주세요.', 'zh-CN': '无法获取解释。请重试。', ar: 'تعذّر الحصول على الشرح. يرجى المحاولة مرة أخرى.', hi: 'व्याख्या प्राप्त नहीं हो सकी। कृपया पुनः प्रयास करें।', nl: 'Kon uitleg niet ophalen. Probeer het opnieuw.', sv: 'Det gick inte att hämta förklaringen. Försök igen.', no: 'Kunne ikke hente forklaringen. Prøv igjen.', da: 'Forklaringen kunne ikke hentes. Prøv igen.', fi: 'Selitystä ei saatu. Yritä uudelleen.', pl: 'Nie udało się uzyskać wyjaśnienia. Spróbuj ponownie.', cs: 'Vysvětlení se nepodařilo získat. Zkuste to znovu.', hu: 'A magyarázat nem érhető el. Kérjük, próbálja újra.', ro: 'Nu s-a putut obține explicația. Vă rugăm să încercați din nou.', el: 'Δεν ήταν δυνατή η λήψη της εξήγησης. Δοκιμάστε ξανά.', bg: 'Обяснението не можа да бъде получено. Моля, опитайте отново.', uk: 'Не вдалося отримати пояснення. Будь ласка, спробуйте ще раз.' },
};

// Merge the shared contextual-correction layer (context-dependent Turkish that
// generic MT gets wrong — see contextual-corrections.mjs) into the manual
// corrections. Both take priority over cached/live machine translations.
const ALL_CORRECTIONS = { ...MANUAL_CORRECTIONS };
for (const [source, perLang] of Object.entries(CONTEXTUAL_CORRECTIONS)) {
  ALL_CORRECTIONS[source] = { ...(ALL_CORRECTIONS[source] ?? {}), ...perLang };
}

// UI strings hardcoded in React components that the data-file extractor misses.
// Keep this list in sync when new Turkish strings are added to components.
const UI_STRINGS = [
  // FloatingNavButtons.tsx
  'Geri',
  // CourseTopicHeader.tsx — section labels and navigation
  'Derslere Dön',
  'Formüller',
  'Hesaplamalar',
  'Kurallar',
  // CourseQuiz.tsx
  'Bilginizi test edin',
  'Soru',
  'Açıklama:',
  'Doğru!',
  'Yanlış!',
  'Sonraki Soru',
  'Sonucu Gör',
  'Quizi Tamamla',
  'Quiz Tamamlandı!',
  'Doğru cevap:',
  'Mükemmel! Bu konuda uzman seviyesindesiniz.',
  'İyi! Biraz daha çalışmayla mükemmel olabilirsiniz.',
  'Daha fazla çalışmanız önerilir.',
  'Tekrar Dene',
  // CalculatorCard.tsx
  'Hesapla',
  'Kaynak:',
  'Çözümü Adım Adım Göster',
  'Adımları Gizle',
  // autoSteps.ts (otomatik adım adım çözüm başlıkları)
  'Verilen değerler',
  'Uygulanan formül',
  // StepByStepSolution.tsx
  'Adım Adım Çözüm',
  'Bu işlemi yapay zekaya sor',
  'Yapay Zeka Açıklaması',
  'Hazırlanıyor...',
  'Açıklama alınamadı. Lütfen tekrar deneyin.',
  // CalculatorList.tsx
  'Bu konu için bağlı hesaplayıcı henüz eklenmedi.',
  // CourseRulesList.tsx
  'Bu konu için kurallar henüz eklenmedi.',
  // ui/language-selector.tsx
  'Dil Seçin',
  'Dil Değiştir',
  'Şu anki dil:',
  'Aktif',
  // LanguageContext.tsx (toast messages)
  'Dil Değiştirildi',
  'Ayarlar Sıfırlandı',
  'Dil ayarları varsayılan değerlere döndürüldü',
];

// Target languages (mirrors SUPPORTED_LANGUAGES in LanguageContext, minus 'tr').
const LANGUAGE_NAMES = {
  en: 'English', es: 'Spanish', de: 'German', fr: 'French', it: 'Italian',
  pt: 'Portuguese', ru: 'Russian', ja: 'Japanese', ko: 'Korean',
  'zh-CN': 'Chinese (Simplified)', ar: 'Arabic', hi: 'Hindi', nl: 'Dutch',
  sv: 'Swedish', no: 'Norwegian', da: 'Danish', fi: 'Finnish', pl: 'Polish',
  cs: 'Czech', hu: 'Hungarian', ro: 'Romanian', el: 'Greek', bg: 'Bulgarian',
  uk: 'Ukrainian',
};
const ALL_LANGS = Object.keys(LANGUAGE_NAMES);

// --- CLI args ---
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)=(.*)$/);
    return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true];
  })
);
const langs = args.lang ? String(args.lang).split(',').map((s) => s.trim()) : ALL_LANGS;
const limit = args.limit ? parseInt(args.limit, 10) : Infinity;
// When --ui-only is passed, only translate the short UI component strings.
const uiOnly = !!args['ui-only'];

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function runWithConcurrency(items, concurrency, task) {
  let cursor = 0;
  const worker = async () => {
    while (cursor < items.length) {
      const index = cursor++;
      await task(items[index], index);
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
}

async function gtxTranslate(text, targetLang) {
  const url =
    `${GTX_ENDPOINT}?client=gtx&sl=tr&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(text)}`;
  for (let attempt = 0; attempt < RETRY_MAX; attempt++) {
    try {
      const res = await fetch(url);
      if (res.status === 429) { await sleep(RETRY_DELAY * (attempt + 1)); continue; }
      if (!res.ok) return null;
      const data = await res.json();
      if (!Array.isArray(data?.[0])) return null;
      return data[0].map((item) => item[0]).join('');
    } catch {
      if (attempt < RETRY_MAX - 1) await sleep(RETRY_DELAY);
    }
  }
  return null;
}

async function translateLanguage(langCode, sources) {
  const langName = LANGUAGE_NAMES[langCode];
  if (!langName) { console.warn(`⚠️  Unknown language "${langCode}", skipping`); return; }

  const cacheFile = path.join(CACHE_DIR, `${langCode}.json`);
  const cache = readJson(cacheFile, {});

  // Seed the cache with any existing locale-file entries (preserves prior work).
  const existingLocale = readJson(path.join(OUT_DIR, `${langCode}.json`), {});
  for (const [key, val] of Object.entries(existingLocale)) {
    if (!key.startsWith('__') && cache[key] === undefined) cache[key] = val;
  }

  // Apply manual + contextual corrections — these take priority over everything.
  for (const [source, corrections] of Object.entries(ALL_CORRECTIONS)) {
    if (corrections[langCode]) cache[source] = corrections[langCode];
  }

  let overrideCount = 0;
  let gtxCount = 0;
  let skipCount = 0;

  // Which strings still need translation?
  const pending = [];
  for (const source of sources) {
    // Manual/contextual correction already applied above.
    if (ALL_CORRECTIONS[source]?.[langCode]) { overrideCount++; continue; }
    const override = getMaritimeTranslationOverride(source, langCode);
    if (override) { cache[source] = override; overrideCount++; continue; }
    if (cache[source] !== undefined) { skipCount++; continue; }
    pending.push(source);
  }

  const limited = Number.isFinite(limit) ? pending.slice(0, limit) : pending;
  // Pack many strings into each gtx request (joined with BATCH_SEPARATOR and
  // split back) — the same contract the runtime translator uses — to cut the
  // request count ~40x. This is the main rate-limit mitigation for the large
  // corpus. A batch whose response can't be split cleanly falls back to
  // per-string translation so one bad string never poisons the batch.
  const batches = buildTranslationBatches(limited);
  let done = 0;
  const total = limited.length;
  if (total > 0) {
    process.stdout.write(`  ${langCode}: translating ${total} strings in ${batches.length} batches via gtx...\r`);
  }

  const translateOne = async (source) => {
    const raw = await gtxTranslate(source, langCode);
    if (raw !== null) {
      cache[source] = normalizeMachineTranslation(
        source,
        applyMaritimeCorrections(raw, langCode),
        langCode,
      );
      gtxCount++;
    }
    // If gtx failed, leave uncached so the runtime live-translator handles it.
  };

  await runWithConcurrency(batches, CONCURRENCY, async (batch) => {
    if (batch.length === 1) {
      await translateOne(batch[0]);
    } else {
      const joined = await gtxTranslate(batch.join(BATCH_SEPARATOR), langCode);
      const parts = joined === null ? null : splitBatchResult(joined, batch.length);
      if (parts) {
        batch.forEach((source, i) => {
          cache[source] = normalizeMachineTranslation(
            source,
            applyMaritimeCorrections(parts[i].trim(), langCode),
            langCode,
          );
          gtxCount++;
        });
      } else {
        for (const source of batch) await translateOne(source);
      }
    }
    done += batch.length;
    if (done % 500 < batch.length || done === total) {
      process.stdout.write(`  ${langCode}: ${done}/${total} (gtx)          \r`);
    }
  });

  // Persist incremental cache so interrupted runs resume without re-doing work.
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 0));

  // Build the shipped dictionary from the CURRENT source list only.
  const version = crypto.createHash('sha1')
    .update(langCode + '\n' + sources.join('\n')).digest('hex').slice(0, 12);
  const dict = { __version: version };
  let covered = 0;
  for (const source of sources) {
    if (cache[source] !== undefined) { dict[source] = cache[source]; covered++; }
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, `${langCode}.json`), JSON.stringify(dict, null, 0) + '\n');

  const pct = ((covered / sources.length) * 100).toFixed(1);
  console.log(
    `✅ ${langCode.padEnd(6)} ${covered.toString().padStart(6)}/${sources.length} (${pct}%)` +
    `  override:${overrideCount}  gtx:${gtxCount}  cached:${skipCount}`
  );
}

async function main() {
  // Merge source strings with hardcoded UI strings (deduplicated).
  const sourceData = readJson(SOURCE_FILE, null);
  const staticStrings = sourceData?.strings ?? [];
  if (!staticStrings.length && !uiOnly) {
    console.warn('⚠️  No source strings found. Run: npm run i18n:extract');
  }

  const allStrings = uiOnly
    ? UI_STRINGS
    : [...new Set([...UI_STRINGS, ...staticStrings])];

  const targets = langs.includes('all') ? ALL_LANGS : langs;
  console.log(
    `🌐 Generating locales for [${targets.join(', ')}]\n` +
    `   strings: ${allStrings.length} (UI: ${UI_STRINGS.length}, static: ${staticStrings.length})` +
    (uiOnly ? '  [ui-only mode]' : '') + '\n'
  );

  for (const lang of targets) {
    await translateLanguage(lang, allStrings);
  }
  console.log('\n✅ Done. Locale files written to public/locales/');
}

main().catch((err) => { console.error('❌', err.message); process.exit(1); });
