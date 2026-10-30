import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { packLocales } from '../../scripts/i18n/pack-locales.mjs';
import { loadStaticDictionary } from './staticTranslations';

// Packs real locale files plus a synthetic one with every marker, serves only
// the packed output (as the native build does) and checks that the runtime
// unpacks exactly the dictionary the full JSON gave.
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'packed-locales-'));
const sample = ['en', 'de'];
for (const lang of sample) fs.copyFileSync(`public/locales/${lang}.json`, path.join(dir, `${lang}.json`));
const en = JSON.parse(fs.readFileSync(path.join(dir, 'en.json'), 'utf8')) as Record<string, string>;
const [firstKey, secondKey] = Object.keys(en).filter((key) => !key.startsWith('__') && en[key] !== key);
fs.writeFileSync(path.join(dir, 'xx.json'), JSON.stringify({
  __version: 'x',
  [firstKey]: en[firstKey], // same as English → base marker
  [secondKey]: secondKey, // identity → key marker
  'Yalnız bu dilde': 'Only here',
}));
const originals = Object.fromEntries(['xx', ...sample].map((lang) => [
  lang,
  JSON.parse(fs.readFileSync(path.join(dir, `${lang}.json`), 'utf8')) as Record<string, unknown>,
]));
packLocales({ localesDir: dir, removeLegacy: true, log: () => {} });

globalThis.fetch = (async (input: RequestInfo | URL) => {
  const { pathname } = new URL(String(input), 'http://localhost');
  const file = pathname.startsWith('/locales/packed/') ? path.join(dir, 'packed', path.basename(pathname)) : null;
  if (file && fs.existsSync(file)) return new Response(fs.readFileSync(file), { status: 200 });
  if (pathname === '/locales/fr.json') return new Response(JSON.stringify({ Kaynak: 'Source' }), { status: 200 });
  if (pathname.startsWith('/locales/shared/')) return new Response('{}', { status: 200 });
  return new Response('not found', { status: 404 });
}) as typeof fetch;

const expected = (lang: string) => Object.fromEntries(
  Object.entries(originals[lang]).filter(([key, value]) => !key.startsWith('__') && typeof value === 'string'),
);

test('packed locales unpack to exactly the original dictionaries', async () => {
  for (const lang of ['xx', ...sample]) {
    const dict = await loadStaticDictionary(lang);
    assert.deepEqual({ ...dict }, expected(lang), `${lang} differs after unpacking`);
  }
});

test('a language without a pack falls back to the full JSON', async () => {
  assert.deepEqual({ ...(await loadStaticDictionary('fr')) }, { Kaynak: 'Source' });
});
