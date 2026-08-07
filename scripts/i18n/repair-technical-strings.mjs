// Repairs locale files generated before the technical-text protection layer.
//
//   - formula-only strings are reset to the source (formulas are universal)
//   - strings containing math function calls ("atan2(...)") were corrupted by
//     the engine, so the entry is dropped: the runtime translator regenerates
//     it with the math tokens masked
//   - "hesap → account" headings are rewritten to the calculation sense
//
//   npx tsx scripts/i18n/repair-technical-strings.mjs
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  isTechnicalString,
  containsMathCall,
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
  let dropped = 0;
  for (const [source, value] of Object.entries(data)) {
    if (typeof value !== 'string') continue;
    if (isTechnicalString(source)) {
      if (value !== source) { data[source] = source; fixed += 1; }
      continue;
    }
    if (containsMathCall(source)) {
      delete data[source];
      dropped += 1;
      continue;
    }
    const next = fixCalculationNoun(source, value, lang);
    if (next !== value) { data[source] = next; fixed += 1; }
  }
  if (fixed || dropped) {
    // Compact output: these files must stay under the 10 MB repo limit.
    writeFileSync(path, JSON.stringify(data));
    console.log(`${lang}: ${fixed} repaired, ${dropped} dropped`);
    totalFixed += fixed + dropped;
  }
}
console.log(`Total: ${totalFixed}`);
