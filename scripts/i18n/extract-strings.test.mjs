import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const sourceFile = path.join(process.cwd(), 'scripts/i18n/source-strings.json');

const readSources = () => {
  const parsed = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
  return new Set(parsed.strings);
};

test('extractor covers settings components, conditional labels and notifications', () => {
  const sources = readSources();
  const expected = [
    'Two-step verification',
    'Currently disabled. Once enabled, signing in requires access to both your password and your authenticator app.',
    'Enable',
    'Close',
    'Confirm',
    'Two-step verification enabled',
    'The code could not be verified. Enter the current code in the app.',
    'Back',
    'Dil Değiştirildi',
    'Uygulama dili başarıyla değiştirildi',
    'Ayarlar Sıfırlandı',
    'Dil ayarları varsayılan değerlere döndürüldü',
  ];

  for (const source of expected) {
    assert.equal(sources.has(source), true, `missing extracted UI copy: ${source}`);
  }
});

test('multiline JSX is normalized to the exact rendered DOM text', () => {
  const sources = readSources();
  const rendered =
    'Currently disabled. Once enabled, signing in requires access to both your password and your authenticator app.';

  assert.equal(sources.has(rendered), true);
  assert.equal(
    [...sources].some((source) => source.includes('access to both\n') && source.includes('authenticator app')),
    false,
  );
});
