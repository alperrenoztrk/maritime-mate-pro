import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';

import { getStaticTranslation, isDictionaryComplete, loadStaticDictionary } from './staticTranslations';

const simulatorEntries = JSON.parse(fs.readFileSync('scripts/i18n/verified/ship-simulator-ui.json', 'utf8'));
const sharedLearning = JSON.parse(fs.readFileSync('public/locales/shared/learning-guide.en.json', 'utf8'));

const responses: Record<string, unknown> = {
  '/locales/de.json': { __version: 'x', Kaynak: 'Quelle', 'Baş kontrolü': 'Kopfkontrolle' },
  '/locales/fr.json': {},
  '/locales/shared/terminology-overrides.json': { de: { 'Baş kontrolü': 'Heading control' } },
  '/locales/shared/learning-guide.en.json': { ...sharedLearning, 'Learning map': 'Learning map' },
  '/locales/shared/lesson-paragraphs.en.json': {
    'Gemi havuza girdiğinde ağırlık takozlara biner.': 'When the ship enters the dry dock, its weight comes onto the keel blocks.',
    Kaynak: 'Source (English)',
  },
};

globalThis.fetch = (async (input: RequestInfo | URL) => {
  const url = new URL(String(input), 'http://localhost');
  const body = responses[url.pathname];
  if (body === undefined) return new Response('not found', { status: 404 });
  return new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } });
}) as typeof fetch;

test('lesson paragraphs fall back to the shared checked English', async () => {
  await loadStaticDictionary('de');
  assert.equal(
    getStaticTranslation('Gemi havuza girdiğinde ağırlık takozlara biner.', 'de'),
    'When the ship enters the dry dock, its weight comes onto the keel blocks.',
  );
  // The language pack wins over the shared English.
  assert.equal(getStaticTranslation('Kaynak', 'de'), 'Quelle');
});

test('an empty language pack stays empty so the live translator is still used', async () => {
  await loadStaticDictionary('fr');
  assert.equal(isDictionaryComplete('fr'), false);
  assert.equal(getStaticTranslation('Gemi havuza girdiğinde ağırlık takozlara biner.', 'fr'), null);
});


test('new learning copy uses one shared offline pack', async () => {
  await loadStaticDictionary('de');
  assert.equal(getStaticTranslation('Learning map', 'de'), 'Learning map');
});

test('reviewed terminology overrides a known bad locale entry without replacing unrelated translations', async () => {
  await loadStaticDictionary('de');
  assert.equal(getStaticTranslation('Baş kontrolü', 'de'), 'Heading control');
  assert.equal(getStaticTranslation('Kaynak', 'de'), 'Quelle');
});

test('every reviewed simulator entry is available offline through the shared fallback', async () => {
  const keys = Object.keys(simulatorEntries);
  assert.ok(keys.length > 0, 'Simulator pack must not be empty');
  await loadStaticDictionary('de');
  for (const key of keys) {
    assert.equal(Object.prototype.hasOwnProperty.call(sharedLearning, key), true, `Missing generated entry: ${key}`);
    assert.equal(typeof getStaticTranslation(key, 'de'), 'string', `Missing offline fallback: ${key}`);
  }
});
