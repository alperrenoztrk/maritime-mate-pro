import fs from 'node:fs';
const input = 'scripts/i18n/verified/maritime-learning.json';
const output = 'public/locales/shared/learning-guide.en.json';
const entries = JSON.parse(fs.readFileSync(input, 'utf8'));
const pack = Object.fromEntries(Object.entries(entries).map(([key, entry]) => [key, entry.en]));
const text = JSON.stringify(pack) + '\n';
if (process.argv.includes('--check')) {
  if (fs.readFileSync(output, 'utf8') !== text) throw new Error('Learning language pack is stale. Run npm run i18n:learning.');
} else {
  fs.mkdirSync('public/locales/shared', { recursive: true });
  fs.writeFileSync(output, text);
}
console.log(`Checked learning copy: ${Object.keys(pack).length} strings in one shared offline pack.`);
