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

const repoRoot = process.cwd();
const SOURCE_FILE = path.join(repoRoot, 'scripts/i18n/source-strings.json');
const CACHE_DIR   = path.join(repoRoot, 'scripts/i18n/.cache');
const OUT_DIR     = path.join(repoRoot, 'public/locales');

const GTX_ENDPOINT = 'https://translate.googleapis.com/translate_a/single';
const CONCURRENCY = 40;   // parallel fetch workers
const RETRY_MAX   = 3;
const RETRY_DELAY = 1500; // ms between retries on 429

// Manual corrections for strings where the GTX engine is known to produce bad
// output. Key = Turkish source string, value = map of langCode → correct translation.
const MANUAL_CORRECTIONS = {
  'Doğru!':  { en: 'Correct!', de: 'Richtig!', fr: 'Correct !', es: '¡Correcto!', it: 'Corretto!', pt: 'Correto!', ru: 'Правильно!', ja: '正解！', ko: '정답!', 'zh-CN': '正确！', ar: 'صحيح!', hi: 'सही!', nl: 'Correct!', sv: 'Rätt!', no: 'Riktig!', da: 'Korrekt!', fi: 'Oikein!', pl: 'Poprawnie!', cs: 'Správně!', hu: 'Helyes!', ro: 'Corect!', el: 'Σωστό!', bg: 'Правилно!', uk: 'Правильно!' },
  'Hesapla': { en: 'Calculate', de: 'Berechnen', fr: 'Calculer', es: 'Calcular', it: 'Calcola', pt: 'Calcular', ru: 'Рассчитать', ja: '計算', ko: '계산', 'zh-CN': '计算', ar: 'احسب', hi: 'गणना करें', nl: 'Berekenen', sv: 'Beräkna', no: 'Beregn', da: 'Beregn', fi: 'Laske', pl: 'Oblicz', cs: 'Vypočítat', hu: 'Számítás', ro: 'Calculați', el: 'Υπολογισμός', bg: 'Изчисли', uk: 'Обчислити' },
  'İyi! Biraz daha çalışmayla mükemmel olabilirsiniz.': { en: 'Good! With a little more work you can be perfect.', de: 'Gut! Mit etwas mehr Übung können Sie perfekt sein.', fr: 'Bien ! Avec un peu plus de travail, vous pouvez être parfait.', es: '¡Bien! Con un poco más de trabajo puedes ser perfecto.', it: 'Bene! Con un po\' più di lavoro puoi essere perfetto.', pt: 'Bom! Com um pouco mais de trabalho você pode ser perfeito.', ru: 'Хорошо! С немного большей практикой вы можете стать идеальным.', ja: '良い！もう少し練習すれば完璧になれます。', ko: '좋아요! 조금만 더 노력하면 완벽해질 수 있습니다.', 'zh-CN': '很好！再多练习一下就能完美了。', ar: 'جيد! مع القليل من العمل الإضافي يمكنك أن تكون مثاليًا.', hi: 'अच्छा! थोड़े और अभ्यास से आप परिपूर्ण हो सकते हैं।', nl: 'Goed! Met wat meer oefening kun je perfect zijn.', sv: 'Bra! Med lite mer träning kan du vara perfekt.', no: 'Bra! Med litt mer øvelse kan du bli perfekt.', da: 'Godt! Med lidt mere arbejde kan du være perfekt.', fi: 'Hyvä! Hieman lisää harjoittelulla voit olla täydellinen.', pl: 'Dobrze! Z trochę większą pracą możesz być doskonały.', cs: 'Dobře! S trochou více práce můžete být dokonalý.', hu: 'Jó! Kicsit több gyakorlással tökéletes lehet.', ro: 'Bine! Cu puțin mai multă muncă poți fi perfect.', el: 'Καλά! Με λίγο περισσότερη δουλειά μπορείς να είσαι τέλειος.', bg: 'Добре! С малко повече работа можете да бъдете перфектни.', uk: 'Добре! Ще трохи практики і ви будете ідеальні.' },
};

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

  // Apply manual corrections — these take priority over everything.
  for (const [source, corrections] of Object.entries(MANUAL_CORRECTIONS)) {
    if (corrections[langCode]) cache[source] = corrections[langCode];
  }

  let overrideCount = 0;
  let gtxCount = 0;
  let skipCount = 0;

  // Which strings still need translation?
  const pending = [];
  for (const source of sources) {
    // Manual correction already applied above.
    if (MANUAL_CORRECTIONS[source]?.[langCode]) { overrideCount++; continue; }
    const override = getMaritimeTranslationOverride(source, langCode);
    if (override) { cache[source] = override; overrideCount++; continue; }
    if (cache[source] !== undefined) { skipCount++; continue; }
    pending.push(source);
  }

  const limited = Number.isFinite(limit) ? pending.slice(0, limit) : pending;
  let done = 0;
  const total = limited.length;
  if (total > 0) process.stdout.write(`  ${langCode}: translating ${total} strings via gtx...\r`);

  await runWithConcurrency(limited, CONCURRENCY, async (source) => {
    const raw = await gtxTranslate(source, langCode);
    if (raw !== null) {
      cache[source] = applyMaritimeCorrections(raw, langCode);
      gtxCount++;
    }
    // If gtx failed, leave uncached so the runtime live-translator handles it.
    done++;
    if (done % 500 === 0 || done === total) {
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
