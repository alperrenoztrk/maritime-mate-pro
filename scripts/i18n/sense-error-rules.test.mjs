import test from 'node:test';
import assert from 'node:assert/strict';
import { findSenseErrors, findTurkishLeftovers, findTranslationDefects } from './sense-error-rules.mjs';

test('flags the everyday sense of maritime terms', () => {
  assert.deepEqual(findSenseErrors('Gemici bağları', 'Gemici-Weinberge', 'de'), ['bag-vineyard']);
  assert.deepEqual(findSenseErrors('Demir sahası', 'Eisenfeld', 'de'), ['demir-iron']);
  assert.deepEqual(findSenseErrors('21 cm kıça', '21 cm Arsch', 'de'), ['kic-body']);
  assert.deepEqual(findSenseErrors('Light on the port quarter!', 'Licht auf das Hafenviertel!', 'de'), ['port-harbour']);
  assert.deepEqual(findSenseErrors('Batı kardinal', 'Läntinen kardinaali', 'fi'), ['kardinal-church']);
  assert.deepEqual(findSenseErrors('3 uzun düdük', '3 pitkää räjähdystä', 'fi'), ['blast-explosion']);
  assert.deepEqual(findSenseErrors('4. Draft Survey', '4. Entwurf einer Umfrage', 'de'), ['draft-document']);
  assert.deepEqual(findSenseErrors('After spring', 'Nach dem Frühling', 'de'), ['spring-season']);
  assert.deepEqual(findSenseErrors('Hog durumunda', '豚の場合', 'ja'), ['hog-pig']);
});

test('leaves correct maritime translations alone', () => {
  assert.deepEqual(findSenseErrors('Demir sahası', 'Ankerplatz', 'de'), []);
  assert.deepEqual(findSenseErrors('Light on the port quarter!', 'Licht an Backbord achtern!', 'de'), []);
  assert.deepEqual(findSenseErrors('Batı kardinal', 'Westkardinalzeichen', 'de'), []);
  assert.deepEqual(findSenseErrors('4. Draft Survey', '4. Tiefgangsbesichtigung', 'de'), []);
  assert.deepEqual(findSenseErrors('Spring tide range', 'Springtidenhub', 'de'), []);
  // "iron" is fine where the source really means iron.
  assert.deepEqual(findSenseErrors('Yumuşak demir düzelticiler', 'Weicheisenkorrektoren', 'de'), []);
  // A wrist-watch word is fine when the source speaks of the bridge clock.
  assert.deepEqual(findSenseErrors('Seiko bridge watch', 'Reloj Seiko del puente', 'es'), []);
});

test('Turkish leftovers ignore Turkish words the English keeps on purpose', () => {
  assert.deepEqual(findTurkishLeftovers('+10°C ile +15°C arası', '+10°C to +15°C'), ['arası']);
  assert.deepEqual(findTurkishLeftovers('Ğ, İ und Ş haben kein Morsezeichen', 'Ğ, İ and Ş have no Morse code'), []);
  assert.deepEqual(findTranslationDefects('≈ 23° Doğu', '≈ 23° Doğu', 'de', '≈ 23° East'), ['turkish-leftover']);
  assert.deepEqual(findTranslationDefects('≈ 23° Doğu', '≈ 23° Doğu', 'en', '≈ 23° Doğu'), []);
});

test('flags corrupted renderings of English sources', () => {
  assert.deepEqual(findSenseErrors('IMO Res. A.893(21)', 'IMO Bild. A.893(21)', 'de'), ['res-picture']);
  assert.deepEqual(findSenseErrors('IMO Res. A.893(21)', 'IMO Res. A.893(21)', 'de'), []);
  assert.deepEqual(findSenseErrors('Muster list', 'Kundenliste', 'de'), ['muster-customer']);
  assert.deepEqual(findSenseErrors('Let go', 'Lass uns gehen', 'de'), ['let-go-lets-go']);
  assert.deepEqual(findSenseErrors('Centre of flotation of the waterplane', 'Schwimmzentrum des Wasserflugzeugs', 'de'), ['waterplane-seaplane']);
});

test('cardinal marks: Turkish spelling does not hide the German or French noun', () => {
  assert.deepEqual(findSenseErrors('Kuzey Kardinal', 'Nördlicher Kardinal', 'de'), ['kardinal-church']);
  assert.deepEqual(findSenseErrors('Kuzey Kardinal', 'Cardinal du Nord', 'fr'), ['kardinal-church']);
  assert.deepEqual(findSenseErrors('Kuzey Kardinal', 'Nord-Kardinalzeichen', 'de'), []);
  assert.deepEqual(findSenseErrors('Kuzey Kardinal', 'Marque cardinale nord', 'fr'), []);
});

test('buoyage port-hand marks are not piers', () => {
  assert.deepEqual(findSenseErrors('İskele İşareti — Bölge A', 'Pierschild – Zone A', 'de'), ['iskele-pier']);
  assert.deepEqual(findSenseErrors('İskele İşareti — Bölge A', 'Backbordzeichen – Region A', 'de'), []);
});

test('hyphenated compounds and a real pier are left alone', () => {
  assert.deepEqual(findSenseErrors('Kardinal ve atterraj işaretleri', 'bei Kardinal- und Ansteuerungszeichen', 'de'), []);
  assert.deepEqual(findSenseErrors('iskelede veya demirleme manevrasında', 'at the pier or during anchoring manoeuvres', 'en'), []);
});
