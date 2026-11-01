#!/usr/bin/env node
/**
 * How much of each language is still shown in checked English.
 * -----------------------------------------------------------------------------
 * Counts the dictionary lines (and the shared lesson-paragraph and
 * learning-guide packs the runtime adds) whose shown text is the English one.
 * Those are the lines translate-pivot.mjs has not translated yet, or kept in
 * English because a gate rejected the machine translation (reasons in
 * scripts/i18n/pivot/<lang>.json).
 *
 *   npm run i18n:english-share
 *   npm run i18n:english-share -- --lang=nl,de
 */
import { englishShare, loadEnglishSources, loadState, localeLanguages, readDictionary } from './pivot-state.mjs';

const langArg = process.argv.slice(2).find((a) => a.startsWith('--lang='))?.slice(7);
const langs = localeLanguages().filter((l) => l !== 'en' && (!langArg || langArg.split(',').includes(l)));
const sources = loadEnglishSources();
console.log(`${'lang'.padEnd(7)}${'English lines'.padStart(14)}${'chars'.padStart(10)}${'share'.padStart(8)}${'pivot lines'.padStart(13)}${'kept (gate)'.padStart(13)}`);
for (const lang of langs) {
  const share = englishShare(lang, readDictionary(lang), sources);
  const state = loadState(lang);
  console.log(
    `${lang.padEnd(7)}${String(share.lines).padStart(14)}${`${(share.chars / 1000).toFixed(0)}k`.padStart(10)}` +
      `${`${share.percent.toFixed(1)}%`.padStart(8)}${String(Object.keys(state.applied).length).padStart(13)}` +
      `${String(Object.keys(state.rejected).length).padStart(13)}`,
  );
}
