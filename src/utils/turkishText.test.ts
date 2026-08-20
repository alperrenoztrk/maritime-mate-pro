import assert from 'node:assert/strict';
import test from 'node:test';
import { hasTurkishText } from './turkishText.ts';
import { isTechnicalString } from './technicalText.ts';

// Everything here failed the seventeen-word check this detector replaced, and
// every one of these strings therefore reached the screen in Turkish: the
// English pass skips a source it believes is already English.
test('ASCII-only Turkish is detected', () => {
  const turkish = [
    'Kaynak',
    'Toplam',
    'Kurallar',
    'Ders notlari',
    'Rapor olusturuldu',
    'Bilgi',
    'yukleme yapilir',
    'gemide bunun anlami',
  ];
  for (const value of turkish) assert.equal(hasTurkishText(value), true, value);
});

test('Turkish letters answer on their own', () => {
  for (const value of ['Geçerli', 'Belge kasası', 'Yükleme durumu', 'Açı (°)']) {
    assert.equal(hasTurkishText(value), true, value);
  }
});

// The detector gates a translation lookup, so a false positive is cheap — but
// these are the English words that share a spelling with the Turkish list and
// used to be mistranslated by the source migration ("Var" → "Yes").
test('English copy is not mistaken for Turkish', () => {
  const english = [
    'Save',
    'Settings',
    'Account',
    'Variation',
    'Not applicable',
    'Popular routes',
    'Similar vessels',
    'The vessel shall not proceed',
    'Enter a valid value',
  ];
  for (const value of english) assert.equal(hasTurkishText(value), false, value);
});

// A formula with a Turkish label in it is not language independent: it used to
// be classified as pure formula and was then never translated at all.
test('formulas carrying Turkish prose stay translatable', () => {
  const mixed = [
    '≥3 mil (öğütülmüş ≤25 mm)',
    '1 m³ kargonun ağırlığı (t/m³)',
    'Boş bölme: μ ≈ 0.97',
    'GZmax ≥ 0.20 m (θ ≥ 30° için)',
    'İki kerterizde 30°, üçte 10°',
  ];
  for (const value of mixed) assert.equal(isTechnicalString(value), false, value);
});

test('pure formulas are still language independent', () => {
  for (const value of ['Δ = W × 1.025', 'BM = I / ∇', 'Rn = VL/ν']) {
    assert.equal(isTechnicalString(value), true, value);
  }
});
