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
    'İki adımlı doğrulama açıldı',
    'Kod doğrulanamadı. Uygulamadaki güncel kodu girin.',
    'Geri',
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
    'Şu anda devre dışı. Etkinleştirdiğinizde hesabınıza yalnızca şifrenizi bilen değil, doğrulayıcı uygulamanıza da erişebilen biri girebilir.';

  assert.equal(sources.has(rendered), true);
  assert.equal(
    [...sources].some((source) => source.includes('şifrenizi\n') && source.includes('doğrulayıcı uygulamanıza')),
    false,
  );
});
