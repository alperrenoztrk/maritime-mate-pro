import fs from 'node:fs';
const input = 'scripts/i18n/verified/maritime-learning.json';
const output = 'public/locales/shared/learning-guide.en.json';
const entries = JSON.parse(fs.readFileSync(input, 'utf8'));
const pack = Object.fromEntries(Object.entries(entries).map(([key, entry]) => [key, entry.en]));
// Simulator learning copy shares the same runtime and coverage fallback.
const simulatorEntries = JSON.parse(fs.readFileSync('scripts/i18n/verified/ship-simulator-ui.json', 'utf8'));
for (const [key, entry] of Object.entries(simulatorEntries)) {
  if (typeof entry.en !== 'string' || !entry.en.trim()) throw new Error(`Missing simulator English: ${key}`);
  pack[key] = entry.en;
}
const assessmentEntries = JSON.parse(fs.readFileSync('scripts/i18n/verified/learning-assessment-ui.json', 'utf8'));
for (const [key, entry] of Object.entries(assessmentEntries)) {
  if (typeof entry.en !== 'string' || !entry.en.trim()) throw new Error(`Missing placement English: ${key}`);
  pack[key] = entry.en;
}
// Authored English cases are shared offline fallbacks in every language.
const billingEntries = JSON.parse(fs.readFileSync('scripts/i18n/verified/billing-ui.json', 'utf8'));
for (const [key, entry] of Object.entries(billingEntries)) {
  if (typeof entry.en !== 'string' || !entry.en.trim()) throw new Error(`Missing billing English: ${key}`);
  pack[key] = entry.en;
}
// Select display fields explicitly: never translate stable IDs or metadata.
const depthReviews = JSON.parse(fs.readFileSync('src/data/learningDepthReviews.json', 'utf8'));
for (const { section } of depthReviews) {
  for (const copy of [section.title, section.content, section.example.problem, ...section.example.steps, section.example.result]) pack[copy] = copy;
}
const sources = JSON.parse(fs.readFileSync('src/data/learningDepthSources.json', 'utf8'));
for (const references of Object.values(sources)) for (const { title } of references) pack[title] = title;
pack['Further reading'] = 'Further reading';
const text = JSON.stringify(pack) + '\n';
if (process.argv.includes('--check')) {
  if (fs.readFileSync(output, 'utf8') !== text) throw new Error('Learning language pack is stale. Run npm run i18n:learning.');
} else {
  fs.mkdirSync('public/locales/shared', { recursive: true });
  fs.writeFileSync(output, text);
}
console.log(`Checked learning copy: ${Object.keys(pack).length} strings in one shared offline pack.`);
