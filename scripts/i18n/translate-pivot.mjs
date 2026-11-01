#!/usr/bin/env node
/**
 * Checked-English pivot translation
 * -----------------------------------------------------------------------------
 * Every line that a language would otherwise show in English — the English fill
 * of the verified packs, i18n:fix English fallbacks, new English UI text, the
 * shared English lesson paragraphs and learning-guide texts — is translated
 * from its CHECKED ENGLISH into that language and written to
 * public/locales/<lang>.json. Translating the checked English instead of the
 * Turkish source removes the ambiguity behind the classic errors ("demir" →
 * iron, "iskele" → pier).
 *
 * Every result passes the gates in pivot-gates.mjs (masks, numbers,
 * abbreviations, word senses, port/starboard, script, length). A line that
 * fails keeps its checked English and is recorded with the reason in
 * scripts/i18n/pivot/<lang>.json (see pivot-state.mjs), so it is not retried
 * until the gates change. A human translation (curated correction or a
 * language listed in a verified pack) is never replaced.
 *
 *   npm run i18n:translate -- --lang=nl                 # one language
 *   npm run i18n:translate -- --lang=nl,de --limit=300  # at most 300 English texts per language
 *   npm run i18n:translate -- --scope=learning          # learning | paragraphs | fills | all
 *   npm run i18n:translate -- --max-minutes=60          # stop (and save) after this long
 *   npm run i18n:translate -- --dry-run                 # report only
 *   npm run i18n:translate -- --count-only              # {"nl": <texts to translate>, …} (CI planning)
 *
 * The run resumes where it stopped: finished lines are in the dictionary and
 * the state file. Network failures are not recorded and are retried next run.
 */
import {
  BATCH_SEPARATOR,
  buildTranslationBatches,
  mtStats,
  nextProviderIn,
  providersAvailable,
  runWithConcurrency,
  sleep,
  splitBatchResult,
  translateText,
} from './mt-engine.mjs';
import { checkForKey, finalizePivot, preparePivot } from './pivot-gates.mjs';
import {
  collectCandidates,
  englishShare,
  hashText,
  loadEnglishSources,
  loadState,
  localeLanguages,
  readDictionary,
  reconcile,
  saveState,
  writeDictionary,
  writeLocaleVersion,
} from './pivot-state.mjs';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)=(.*)$/);
    return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true];
  }),
);
const dryRun = !!args['dry-run'];
const limit = args.limit ? Number(args.limit) : Infinity;
const scope = typeof args.scope === 'string' ? args.scope : 'all';
const maxMinutes = args['max-minutes'] ? Number(args['max-minutes']) : Infinity;
const concurrency = Math.max(1, Number(args.concurrency ?? process.env.I18N_CONCURRENCY) || 4);
const deadline = Date.now() + maxMinutes * 60_000;
// After this many batches without any answer the providers are throttling us:
// stop, save, and let the next run continue.
const MAX_CONSECUTIVE_FAILURES = 25;
const SAVE_EVERY_BATCHES = 150;

const available = localeLanguages().filter((l) => l !== 'en');
const langs =
  !args.lang || args.lang === 'all'
    ? available
    : String(args.lang).split(',').map((s) => s.trim()).filter((l) => available.includes(l));
if (!langs.length) {
  console.error(`❌ No target language. Available: ${available.join(', ')}`);
  process.exit(1);
}

const pct = (share) => `${share.lines} lines, ${(share.chars / 1000).toFixed(0)}k chars (${share.percent.toFixed(1)}%)`;

async function translateLanguage(lang, sources) {
  const dict = readDictionary(lang);
  const state = loadState(lang);
  const reconciled = reconcile(lang, dict, sources, state);
  const before = englishShare(lang, dict, sources);
  const candidates = collectCandidates(lang, dict, sources, state, { scope });
  const englishTexts = [...candidates.keys()].slice(0, limit);

  const kept = new Map();
  const recordKept = (reason) => kept.set(reason, (kept.get(reason) ?? 0) + 1);
  let translatedLines = 0;
  let networkFailures = 0;
  let consecutiveFailures = 0;
  let stopped = false;

  const accept = (english, value) => {
    const enHash = hashText(english);
    // The same text in this language ("Radar"): nothing to write, and not a
    // candidate again on the next run.
    if (value === english) {
      state.rejected[enHash] = 'same-as-english';
      recordKept('same-as-english');
      return;
    }
    let anyKeyAccepted = false;
    let lastReason = null;
    for (const key of candidates.get(english)) {
      const reason = checkForKey(key, value, lang);
      if (reason) {
        state.rejectedKeys[hashText(key)] = enHash;
        lastReason = reason;
        recordKept(reason);
        continue;
      }
      dict[key] = value;
      state.applied[hashText(key)] = enHash;
      delete state.rejectedKeys[hashText(key)];
      translatedLines++;
      anyKeyAccepted = true;
    }
    if (!anyKeyAccepted && lastReason) state.rejected[enHash] = lastReason;
  };
  const reject = (english, reason) => {
    state.rejected[hashText(english)] = reason;
    recordKept(reason);
  };

  const pending = [];
  for (const english of englishTexts) {
    const prep = preparePivot(english, lang);
    if (prep.kind === 'direct') accept(english, prep.value);
    else if (prep.kind === 'keep') reject(english, prep.reason);
    else pending.push({ english, prep });
  }

  // One query per English text; identical queries share one engine answer.
  const byQuery = new Map();
  for (const item of pending) {
    const list = byQuery.get(item.prep.query);
    if (list) list.push(item);
    else byQuery.set(item.prep.query, [item]);
  }
  const batches = buildTranslationBatches([...byQuery.keys()]);
  const finish = (query, raw) => {
    for (const { english, prep } of byQuery.get(query)) {
      const done = finalizePivot(english, raw, prep, lang);
      if (done.ok) accept(english, done.value);
      else reject(english, done.reason);
    }
  };

  let batchesDone = 0;
  const save = () => {
    if (dryRun) return;
    writeDictionary(lang, dict);
    saveState(lang, state);
  };

  if (!dryRun) {
    await runWithConcurrency(batches, concurrency, async (batch) => {
      if (stopped) return;
      // Every provider paused: wait for the first one to come back (within the
      // time budget) instead of giving up on the rest of the language.
      while (!providersAvailable() && Date.now() + nextProviderIn() < deadline) await sleep(nextProviderIn() + 250);
      if (Date.now() > deadline || !providersAvailable() || consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
        stopped = true;
        return;
      }
      const joined = batch.length > 1 ? await translateText(batch.join(BATCH_SEPARATOR), lang, 'en') : null;
      const parts = joined === null ? null : splitBatchResult(joined, batch.length);
      if (parts) {
        batch.forEach((query, i) => finish(query, parts[i]));
        consecutiveFailures = 0;
      } else {
        // A batch whose answer cannot be split back (or a single string) goes
        // one by one, so one odd string never costs the whole batch.
        let anyAnswer = false;
        for (const query of batch) {
          if (stopped) break;
          const raw = await translateText(query, lang, 'en');
          if (raw === null) {
            networkFailures++;
            continue;
          }
          anyAnswer = true;
          finish(query, raw);
        }
        consecutiveFailures = anyAnswer ? 0 : consecutiveFailures + 1;
      }
      batchesDone++;
      if (batchesDone % SAVE_EVERY_BATCHES === 0) {
        save();
        process.stdout.write(`  ${lang}: ${batchesDone}/${batches.length} batches\r`);
      }
    });
  }
  save();

  const after = englishShare(lang, dict, sources);
  const keptText = [...kept].sort((a, b) => b[1] - a[1]).map(([r, n]) => `${r}:${n}`).join(' ');
  console.log(
    `${lang.padEnd(6)} candidates:${englishTexts.length} translated lines:${translatedLines}` +
      (networkFailures ? ` network-failures:${networkFailures}` : '') +
      (stopped ? ' (stopped early, run again to continue)' : '') +
      (reconciled.stale ? ` stale-reset:${reconciled.stale}` : ''),
  );
  if (keptText) console.log(`       kept in English: ${keptText}`);
  console.log(`       English before: ${pct(before)}\n       English after:  ${pct(after)}`);
  return { stopped, translatedLines };
}

const sources = loadEnglishSources();
if (args['count-only']) {
  const counts = {};
  for (const lang of langs) {
    const dict = readDictionary(lang);
    const state = loadState(lang);
    reconcile(lang, dict, sources, state);
    counts[lang] = collectCandidates(lang, dict, sources, state, { scope }).size;
  }
  console.log(JSON.stringify(counts));
  process.exit(0);
}
console.log(`🌐 Pivot translation (checked English → target) for ${langs.join(', ')}${dryRun ? ' [dry run]' : ''}`);
let anyStopped = false;
for (const lang of langs) {
  const { stopped } = await translateLanguage(lang, sources);
  anyStopped ||= stopped;
  if (Date.now() > deadline) break;
}
if (!dryRun && writeLocaleVersion()) console.log('src/i18n/localeVersion.ts updated');
const { requests, failures } = mtStats();
console.log(`Requests: ${requests}, failed provider calls: ${failures}${anyStopped ? ' — not finished, run again' : ''}`);
