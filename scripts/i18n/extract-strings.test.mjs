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
    'İki adımlı doğrulama',
    'Şu anda devre dışı. Etkinleştirdiğinizde hesabınıza yalnızca şifrenizi bilen değil, doğrulayıcı uygulamanıza da erişebilen biri girebilir.',
    'Etkinleştir',
    'Kapat',
    'Onayla',
    'Geri',
    // Notification copy is authored in English (see the language-removal work
    // in src/contexts/LanguageContext.tsx and the toast call sites): a toast is
    // portalled outside the translated route subtree and can expire before a
    // live translation lands, so it must read correctly with no lookup at all.
    'Two-factor authentication enabled',
    'The code could not be verified. Enter the current code from the app.',
    'Language Changed',
    'The app language was changed successfully',
    'Settings Reset',
    'Language settings were restored to their defaults',
  ];

  for (const source of expected) {
    assert.equal(sources.has(source), true, `missing extracted UI copy: ${source}`);
  }
});

test('multiline JSX is normalized to the exact rendered DOM text', () => {
  const sources = readSources();
  const rendered =
    'Şu anda devre dışı. Etkinleştirdiğinizde hesabınıza yalnızca şifrenizi bilen değil, doğrulayıcı uygulamanıza da erişebilen biri girebilir.';

  assert.equal(sources.has(rendered), true);
  assert.equal(
    [...sources].some((source) => source.includes('şifrenizi\n') && source.includes('doğrulayıcı uygulamanıza')),
    false,
  );
});
