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
  assert.deepEqual(findSenseErrors('Greenwich zamanı kronometreden okunur.', 'Greenwich time is read from a stopwatch.', 'en'), ['kronometre-stopwatch']);
});

test('leaves correct maritime translations alone', () => {
  assert.deepEqual(findSenseErrors('Demir sahası', 'Ankerplatz', 'de'), []);
  assert.deepEqual(findSenseErrors('Greenwich zamanı kronometreden okunur.', 'Greenwich time is read from the chronometer.', 'en'), []);
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

test('dry dock (havuz) is not a swimming pool, but a real pool is', () => {
  assert.deepEqual(findSenseErrors('Havuz dönemi', 'Schwimmbadzeit', 'de'), ['havuz-pool']);
  assert.deepEqual(findSenseErrors('Gemi havuza girdiğinde', 'Lorsque le navire entre dans la piscine', 'fr'), ['havuz-pool']);
  assert.deepEqual(findSenseErrors('Havuz dönemi', 'Dockzeit', 'de'), []);
  assert.deepEqual(findSenseErrors('Yüzme havuzu pompası', 'Schwimmbadpumpe', 'de'), []);
  assert.deepEqual(findSenseErrors('Filo havuzu: ortak stok', 'Flottenpool: gemeinsamer Bestand', 'de'), []);
});

test('class (classification society) is not a classroom', () => {
  assert.deepEqual(findSenseErrors('Sınıf survey', 'Klasseværelsesundersøgelse', 'da'), ['sinif-classroom']);
  assert.deepEqual(findSenseErrors('Malzeme sınıf kurallarına uymalıdır.', 'Materials must comply with classroom rules.', 'en'), ['sinif-classroom']);
  assert.deepEqual(findSenseErrors('Malzeme sınıf kurallarına uymalıdır.', 'Materials must comply with class rules.', 'en'), []);
  assert.deepEqual(findSenseErrors('Sınıf eğitimi', 'Classroom training', 'en'), []);
});

test('flags stability terms that machine translation from English gets wrong', () => {
  assert.deepEqual(findSenseErrors('After flooding, the ship may heel and trim.', 'Μετά την πλημμύρα, το πλοίο μπορεί να στρίψει και να κόψει.', 'el'), ['trim-cut', 'flooding-land-flood']);
  assert.deepEqual(findSenseErrors('Trim by the stern increases the draught aft.', 'Řez na zádi zvyšuje ponor na zádi a ořízne', 'cs'), ['trim-cut']);
  assert.deepEqual(findSenseErrors('Slack tanks reduce the effective GM.', 'Slappe tanks verminderen de effectieve GM.', 'nl'), ['slack-tank-loose']);
  assert.deepEqual(findSenseErrors('Flooding of a compartment reduces the reserve buoyancy.', 'Die Überschwemmung eines Abteils verringert die Reserveauftriebskraft.', 'de'), ['flooding-land-flood']);
  assert.deepEqual(findSenseErrors('The ship heels to port.', 'जहाज बाईं ओर पलट जाता है।', 'hi'), ['heel-capsize']);
});

test('accepts the technical rendering of those stability terms', () => {
  assert.deepEqual(findSenseErrors('After flooding, the ship may heel and trim.', 'Nach einem Wassereinbruch kann das Schiff krängen und trimmen.', 'de'), []);
  assert.deepEqual(findSenseErrors('Trim by the stern increases the draught aft.', 'Een stuurlastige trim vergroot de diepgang achter.', 'nl'), []);
  assert.deepEqual(findSenseErrors('Partially filled tanks reduce the effective GM.', 'Gedeeltelijk gevulde tanks verminderen de effectieve GM.', 'nl'), []);
  assert.deepEqual(findSenseErrors('Flooding of a compartment reduces the reserve buoyancy.', 'Затопление отсека снижает запас плавучести.', 'ru'), []);
  // Capsizing words are fine where the source itself speaks of capsizing.
  assert.deepEqual(findSenseErrors('Excessive heel can capsize the ship.', 'अत्यधिक झुकाव जहाज को पलट सकता है।', 'hi'), []);
});

test('list (heel of the ship) is not a list of items', () => {
  assert.deepEqual(findSenseErrors('2.1 Trim ve list düzeltmesi', '2.1 Oprava oříznutí a seznamu', 'cs'), ['trim-cut', 'list-enumeration']);
  assert.deepEqual(findSenseErrors('The ship has a list to port.', 'Das Schiff hat Schlagseite nach Backbord.', 'de'), []);
  // An ordinary list of documents is not touched.
  assert.deepEqual(findSenseErrors('Check the list of certificates.', 'Controleer de lijst met certificaten.', 'nl'), []);
});

test("ship's head is the heading, not a head or a boatman", () => {
  assert.deepEqual(findSenseErrors("Keep the ship's head on the course.", '船頭をコース上に保ちます。', 'ja'), ['ships-head-body']);
  assert.deepEqual(findSenseErrors("Keep the ship's head on the course.", '船首をコース上に保ちます。', 'ja'), []);
  assert.deepEqual(findSenseErrors("Keep the ship's head on the course.", 'Houd de kop van het schip op koers.', 'nl'), []);
});

test('yüzme is the flotation of a ship, not swimming', () => {
  assert.deepEqual(findSenseErrors('Yüzme ve yüzerliğin fiziksel temeli', 'Fysieke basis van zwemmen en drijfvermogen', 'nl'), ['yuzme-swimming']);
  assert.deepEqual(findSenseErrors('Yüzme ve yüzerliğin fiziksel temeli', 'Fysieke basis van drijven en drijfvermogen', 'nl'), []);
});

test('people swimming stays swimming', () => {
  assert.deepEqual(findSenseErrors('Cruise gemilerinde yüzme havuzları', 'Zwembaden op cruiseschepen', 'nl'), []);
  assert.deepEqual(findSenseErrors('LCF (Boyuna Yüzme Merkezi)', 'LCF (Longitudinaal Zwemcentrum)', 'nl'), ['yuzme-swimming']);
});
