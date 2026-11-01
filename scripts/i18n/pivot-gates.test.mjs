import test from 'node:test';
import assert from 'node:assert/strict';
import {
  checkForKey,
  curatedTranslation,
  finalizePivot,
  missingNumbers,
  preparePivot,
} from './pivot-gates.mjs';

test('curated glossary terms are used as they are, without the engine', () => {
  assert.equal(curatedTranslation('Port side', 'nl'), 'Bakboord');
  assert.deepEqual(preparePivot('Port side', 'de'), { kind: 'direct', value: 'Backbordseite' });
  assert.equal(curatedTranslation('Port side:', 'nl'), 'Bakboord:');
});

test('SMCP orders and short maritime labels keep their English', () => {
  assert.equal(preparePivot('Hard a-starboard', 'nl').kind, 'keep');
  assert.equal(preparePivot('"Steady!"', 'de').kind, 'keep');
  assert.equal(preparePivot('Let go the anchor', 'fr').kind, 'keep');
  assert.deepEqual(preparePivot('Trim', 'nl'), { kind: 'keep', reason: 'short-risky' });
  assert.deepEqual(preparePivot('Draft marks', 'de'), { kind: 'keep', reason: 'short-risky' });
  // Three words give the engine enough context.
  assert.equal(preparePivot('Extended course reference', 'nl').kind, 'mt');
  assert.equal(preparePivot('What you will learn', 'nl').kind, 'mt');
});

test('orders inside a sentence are masked and come back verbatim', () => {
  const english = 'Report the CPA to the master and keep "Hard a-starboard" ready; on "Midships" centre the rudder.';
  const prep = preparePivot(english, 'nl');
  assert.equal(prep.kind, 'mt');
  assert.match(prep.query, /TKN0/);
  assert.doesNotMatch(prep.query, /Hard a-starboard|Midships|CPA/);
  const raw = prep.query
    .replace('Report the', 'Meld de')
    .replace('to the master and keep', 'aan de kapitein en houd')
    .replace('ready; on', 'gereed; bij')
    .replace('centre the rudder.', 'het roer in het midden zetten.');
  const done = finalizePivot(english, raw, prep, 'nl');
  assert.equal(done.ok, true);
  assert.equal(
    done.value,
    'Meld de CPA aan de kapitein en houd "Hard a-starboard" gereed; bij "Midships" het roer in het midden zetten.',
  );
});

test('a lost mask, a changed number or a lost abbreviation is rejected', () => {
  const english = 'Report the CPA when it is below 0.5 nautical miles.';
  const prep = preparePivot(english, 'de');
  assert.equal(finalizePivot(english, 'Melden Sie den Wert, wenn er unter 0,5 Seemeilen liegt.', prep, 'de').reason, 'mask-lost');
  const good = prep.query.replace('Report the', 'Melden Sie den').replace('when it is below 0.5 nautical miles.', 'wenn er unter 0,5 Seemeilen liegt.');
  assert.equal(finalizePivot(english, good, prep, 'de').ok, true);
  const changed = good.replace('0,5', '5');
  assert.equal(finalizePivot(english, changed, prep, 'de').reason, 'numbers');
});

test('numbers survive decimal and thousands separators', () => {
  assert.deepEqual(missingNumbers('GM below 0.15 m', 'GM onder 0,15 m'), []);
  assert.deepEqual(missingNumbers('1,500 tonnes', '1.500 Tonnen'), []);
  assert.deepEqual(missingNumbers('1,500 tonnes', '1 500 tonnes'), []);
  assert.deepEqual(missingNumbers('At 06:00 UTC', 'Om 06.00 UTC'), []);
  assert.deepEqual(missingNumbers('GM below 0.15 m', 'GM unter 0,5 m'), ['015']);
  assert.deepEqual(missingNumbers('Rule 34', 'القاعدة ٣٤'), []);
});

test('the slack tank paraphrase reaches the engine, wrong senses do not ship', () => {
  const english = 'Slack tanks reduce the effective GM.';
  const prep = preparePivot(english, 'nl');
  assert.match(prep.query, /^Partially filled tanks/);
  assert.equal(finalizePivot(english, 'Slappe tanks verminderen de effectieve TKN0.', prep, 'nl').reason, 'sense:slack-tank-loose');
  assert.equal(finalizePivot(english, 'Gedeeltelijk gevulde tanks verminderen de effectieve TKN0.', prep, 'nl').ok, true);

  const trim = 'After flooding, the ship may heel and trim.';
  const trimPrep = preparePivot(trim, 'el');
  assert.equal(finalizePivot(trim, 'Μετά την πλημμύρα, το πλοίο μπορεί να στρίψει και να κόψει.', trimPrep, 'el').reason, 'sense:trim-cut');
});

test('port and starboard must survive', () => {
  const english = 'Alter course to starboard and keep the vessel clear.';
  const prep = preparePivot(english, 'nl');
  assert.equal(finalizePivot(english, 'Wijzig de koers naar bakboord en houd het schip vrij.', prep, 'nl').reason, 'side-starboard');
  assert.equal(finalizePivot(english, 'Wijzig de koers naar stuurboord en houd het schip vrij.', prep, 'nl').ok, true);
});

test('untranslated output, wrong script and broken length are rejected', () => {
  const english = 'Stability explains flotation and the response of the ship to heeling.';
  const prep = preparePivot(english, 'ru');
  assert.equal(finalizePivot(english, english, prep, 'ru').reason, 'untranslated');
  assert.equal(finalizePivot(english, 'Stability explains flotation.', prep, 'ru').reason, 'script');
  const nlPrep = preparePivot(english, 'nl');
  assert.equal(finalizePivot(english, 'Stabiliteit.', nlPrep, 'nl').reason, 'length');
});

test('key-level checks reuse the dictionary audits', () => {
  assert.equal(checkForKey('Demir sahası', 'Gebied van ijzer', 'nl'), 'sense:demir-iron');
  assert.equal(checkForKey('Demir sahası', 'Ankerplaats', 'nl'), null);
  assert.equal(checkForKey('DP kaybı', 'Verlies van XP', 'nl'), 'term-audit');
});

test('hull flooding reaches the engine as entry of seawater; fixed terms keep flooding', () => {
  const q = (text) => preparePivot(text, 'nl').query;
  assert.equal(
    q("Stability explains flotation, the ship's response to heeling and how loading or flooding changes the available righting ability."),
    "Stability explains flotation, the ship's response to heeling and how loading or entry of seawater changes the available righting ability.",
  );
  assert.equal(q('Flooding of a compartment reduces the reserve buoyancy.'), 'Entry of seawater into a compartment reduces the reserve buoyancy.');
  assert.equal(q('Progressive flooding must be prevented.'), 'Progressive entry of seawater must be prevented.');
  assert.match(q('The CO2 total flooding system protects the engine room.'), /total flooding/);
  assert.match(q('Counter flooding corrects the list of the ship.'), /Counter flooding/);
  assert.match(q('The angle of flooding limits the GZ curve.'), /angle of flooding/);
  assert.match(q('The flooding angle limits the GZ curve.'), /flooding angle/);
  assert.match(q('Fit flooding detection in every hold.'), /flooding detection/);
});
