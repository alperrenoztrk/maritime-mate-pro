import assert from 'node:assert/strict';
import test from 'node:test';
import {
  ENGLISH_RESIDUAL_CORRECTIONS,
  containsTurkishResidue,
  looksLikeTurkishSource,
  normalizeEnglishMaritimeSenses,
  normalizeEnglishResidualTerms,
} from './english-residuals.mjs';

test('curated English correction list retains broad page coverage', () => {
  assert.ok(Object.keys(ENGLISH_RESIDUAL_CORRECTIONS).length >= 140);
  assert.equal(ENGLISH_RESIDUAL_CORRECTIONS['Açı (°)'].en, 'Angle (°)');
  assert.equal(ENGLISH_RESIDUAL_CORRECTIONS['Kaloma (Scope) ve Tutuş'].en, 'Scope and Holding');
});

test('normalizes Turkish country and seamanship terms left by MT', () => {
  assert.equal(
    normalizeEnglishResidualTerms('Türkiye: Izbarço, Kaloma and half-anele'),
    'Turkey: Bowline, Scope and half hitch',
  );
});

test('normalizes ambiguous words only when the Turkish source establishes the maritime sense', () => {
  assert.equal(normalizeEnglishMaritimeSenses('No.1 Ambar', 'No.1 Warehouse'), 'No.1 Cargo Hold');
  assert.equal(normalizeEnglishMaritimeSenses('Ana yatak sıcaklığı', 'Main bed temperature'), 'Main bearing temperature');
  assert.equal(normalizeEnglishMaritimeSenses('Çatışma riski', 'Risk of conflict'), 'Risk of collision');
  assert.equal(normalizeEnglishMaritimeSenses('Ana makine', 'Main machine'), 'Main engine');
  assert.equal(normalizeEnglishMaritimeSenses('Makine dairesi', 'Machine room'), 'Engine room');
  assert.equal(normalizeEnglishMaritimeSenses('Dümen makinesi', 'Steering machine'), 'Steering gear');
  assert.equal(normalizeEnglishMaritimeSenses('Makine vardiyası', 'Machine shift'), 'Engine-room watch');
});

test('preserves valid everyday senses in explicitly non-technical contexts', () => {
  assert.equal(
    normalizeEnglishMaritimeSenses('Yatak yapımı ve çarşaf değişimi', 'Bed making and linen change'),
    'Bed making and linen change',
  );
  assert.equal(
    normalizeEnglishMaritimeSenses('Ekip içinde çatışma yönetimi', 'Conflict management within the team'),
    'Conflict management within the team',
  );
});

test('detects untranslated and partially translated Turkish copy', () => {
  assert.equal(looksLikeTurkishSource('Başlangıç Enlemi'), true);
  assert.equal(looksLikeTurkishSource('Enter valid hhook and hyuk'), true);
  assert.equal(containsTurkishResidue('Scope', 'Kaloma (Scope)'), true);
  assert.equal(containsTurkishResidue('Angle', 'Angle'), false);
});

test('allows intentional alphabet examples and established proper names', () => {
  assert.equal(
    containsTurkishResidue(
      'Türkçedeki Ğ, İ ve Ş harflerinin uluslararası karşılığı nedir?',
      'Which international signals represent the Turkish letters Ğ, İ and Ş?',
    ),
    false,
  );
  assert.equal(containsTurkishResidue('Föhn wind', 'Föhn wind'), false);
  assert.equal(containsTurkishResidue('Wöhler curve', 'Wöhler curve'), false);
});
