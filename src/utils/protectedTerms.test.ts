import assert from 'node:assert/strict';
import test from 'node:test';
import {
  PROTECTED_TOKENS,
  findMissingProtectedTokens,
  maskProtectedTokens,
  renderProtectedToken,
  unmaskProtectedTokens,
} from './protectedTerms';

test('abbreviations are masked and restored verbatim', () => {
  const mask = maskProtectedTokens('Manevra ve DP yedeği', 'en');
  assert.ok(mask);
  assert.equal(mask.masked, 'Manevra ve TKN0 yedeği');
  assert.deepEqual(mask.slots, ['DP']);
  // The engine translates around the sentinel; the abbreviation comes back intact.
  assert.equal(unmaskProtectedTokens('Maneuver and TKN0 backup', mask.slots), 'Maneuver and DP backup');
});

test('every slot of a multi-abbreviation string is tracked independently', () => {
  const mask = maskProtectedTokens('DP kaybında GM ve KG değerleri kontrol edilir', 'en');
  assert.ok(mask);
  assert.equal(mask.masked, 'TKN0 kaybında TKN1 ve TKN2 değerleri kontrol edilir');
  assert.deepEqual(mask.slots, ['DP', 'GM', 'KG']);
  assert.equal(
    unmaskProtectedTokens('TKN1 and TKN2 values are checked on TKN0 loss', mask.slots),
    'GM and KG values are checked on DP loss',
  );
});

test('Turkish case suffixes stay outside the mask', () => {
  // "DP'ye" must translate as a case-marked noun, so only "DP" is replaced.
  const mask = maskProtectedTokens("DP'ye geçiş sırası", 'en');
  assert.ok(mask);
  assert.equal(mask.masked, "TKN0'ye geçiş sırası");
  assert.equal(unmaskProtectedTokens('Transition order to TKN0', mask.slots), 'Transition order to DP');
});

test('matching is case sensitive and bounded by whole words', () => {
  // "kg" the unit is not the stability symbol "KG".
  assert.equal(maskProtectedTokens('Yük 500 kg olarak girilir', 'en'), null);
  // A longer word that merely starts with an abbreviation is not a match.
  assert.equal(maskProtectedTokens('KGB arşivleri', 'en'), null);
  // The longest abbreviation wins: "DPO" is not masked as "DP" + "O".
  const mask = maskProtectedTokens('DPO ve DP', 'en');
  assert.ok(mask);
  assert.deepEqual(mask.slots, ['DPO', 'DP']);
});

test('a language with an established equivalent gets it substituted', () => {
  assert.equal(renderProtectedToken('IMO', 'fr'), 'OMI');
  assert.equal(renderProtectedToken('IMO', 'en'), 'IMO');
  assert.equal(renderProtectedToken('PPE', 'de'), 'PSA');
  // Formula symbols are never localised.
  assert.equal(renderProtectedToken('GM', 'fr'), 'GM');

  const mask = maskProtectedTokens('IMO kuralları', 'fr');
  assert.ok(mask);
  assert.deepEqual(mask.slots, ['OMI']);
  assert.equal(unmaskProtectedTokens('Règles TKN0', mask.slots), 'Règles OMI');
});

test('sentinels survive engine reshaping and transliteration', () => {
  const slots = ['DP'];
  // Case drift, an inserted space, and the Cyrillic transliteration Ukrainian returns.
  assert.equal(unmaskProtectedTokens('Manövern och Tkn0 backup', slots), 'Manövern och DP backup');
  assert.equal(unmaskProtectedTokens('Backup TKN 0', slots), 'Backup DP');
  assert.equal(unmaskProtectedTokens('Маневр і ТКН0', slots), 'Маневр і DP');
});

test('an unresolvable result is rejected so no sentinel can leak into the UI', () => {
  // Engine dropped the only sentinel.
  assert.equal(unmaskProtectedTokens('Maneuver and backup', ['DP']), null);
  // Engine kept one sentinel but lost the other.
  assert.equal(unmaskProtectedTokens('TKN0 loss', ['DP', 'GM']), null);
  // Engine invented an index that was never issued.
  assert.equal(unmaskProtectedTokens('TKN0 and TKN7', ['DP']), null);
});

test('missing abbreviations are detected in a finished translation', () => {
  // The real defect this whole layer exists for.
  assert.deepEqual(findMissingProtectedTokens('Manevra ve DP yedeği', 'Maneuver and XP reserve', 'en'), [
    { token: 'DP', expected: 'DP' },
  ]);
  assert.deepEqual(findMissingProtectedTokens('Manevra ve DP yedeği', 'Maneuver and DP backup', 'en'), []);
  // Either the verbatim token or the established equivalent counts as intact.
  assert.deepEqual(findMissingProtectedTokens('IMO kuralları', 'Règles OMI', 'fr'), []);
  assert.deepEqual(findMissingProtectedTokens('IMO kuralları', 'Règles IMO', 'fr'), []);
  assert.deepEqual(findMissingProtectedTokens('IMO kuralları', 'Les règles', 'fr'), [
    { token: 'IMO', expected: 'OMI' },
  ]);
  // A token swallowed by a longer word does not count as present.
  assert.deepEqual(findMissingProtectedTokens('GM değeri', 'GMDSS value', 'en'), [
    { token: 'GM', expected: 'GM' },
  ]);
  // Turkish source is never checked against itself.
  assert.deepEqual(findMissingProtectedTokens('DP yedeği', 'DP yedeği', 'tr'), []);
});

test('the token table stays unambiguous', () => {
  const tokens = PROTECTED_TOKENS.map((entry) => entry.token);
  assert.equal(new Set(tokens).size, tokens.length, 'duplicate token in PROTECTED_TOKENS');
  for (const token of tokens) {
    assert.match(token, /^[A-Z0-9]{2,6}$/, `${token} must be an ALL-CAPS abbreviation`);
  }
});
