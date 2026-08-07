// One-off repair for locale files generated before the technical-text
// protection layer existed: restores mangled math function names ("tane2" →
// "atan2") and fixes "hesap → account" mistranslations.
//
//   node scripts/i18n/repair-technical-strings.mjs
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  isTechnicalString,
  repairTechnicalTokens,
  fixCalculationNoun,
} from '../../src/utils/technicalText.ts';

const localesDir = join(dirname(fileURLToPath(import.meta.url)), '../../public/locales');

let totalFixed = 0;
for (const file of readdirSync(localesDir).filter((f) => f.endsWith('.json'))) {
  const lang = file.replace(/\.json$/, '');
  const path = join(localesDir, file);
  const rawFile = readFileSync(path, 'utf8').trim();
  if (!rawFile) {
    console.log(`${lang}: empty locale file, skipped`);
    continue;
  }
  const data = JSON.parse(rawFile);
  let fixed = 0;
  for (const [source, value] of Object.entries(data)) {
    if (typeof value !== 'string') continue;
    let next = isTechnicalString(source) ? source : repairTechnicalTokens(source, value);
    next = fixCalculationNoun(source, next, lang);
    if (next !== value) {
      data[source] = next;
      fixed += 1;
    }
  }
  if (fixed) {
    // Compact output: these files must stay under the 10 MB repo limit.
    writeFileSync(path, JSON.stringify(data));
    console.log(`${lang}: ${fixed} strings repaired`);
    totalFixed += fixed;
  }
}
console.log(`Total: ${totalFixed}`);
