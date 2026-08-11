import assert from 'node:assert/strict';
import test from 'node:test';
import { fixCalculationNoun } from './technicalText';

// Turkish "hesap" is both "account" and "calculation"; every generic engine
// picks the banking sense for headings like "KG Hesabı".

test('calculation sources lose the banking sense', () => {
  assert.equal(fixCalculationNoun('KG hesabı', 'KG account', 'en'), 'KG calculation');
  assert.equal(fixCalculationNoun('Hesap Formülü', 'Account Formula', 'en'), 'Calculation Formula');
  assert.equal(
    fixCalculationNoun('GM ve KG Hesap Örnekleri', 'GM and KG Account Examples', 'en'),
    'GM and KG Calculation Examples',
  );
  assert.equal(fixCalculationNoun('KG hesabı', 'KG-Konto', 'de'), 'KG-Berechnung');
});

test('real account sources keep it, whichever side the keyword falls on', () => {
  const keeps: Array<[string, string]> = [
    ['Hesap', 'Account'],
    ['Hesap ve Veri Silme', 'Account and Data Deletion'],
    ['Hesabımı sil', 'Delete my account'],
    ['Hesabınız ve tüm verileriniz silindi', 'Your account and all your data have been deleted'],
    ['Bu hesabı Google ile oluşturduysanız', 'If you created this account with Google'],
    ['banka hesabı bilgileri', 'bank account details'],
  ];
  for (const [source, translated] of keeps) {
    assert.equal(fixCalculationNoun(source, translated, 'en'), translated, source);
  }
});

test('unambiguous calculation copy still receives the calculation sense', () => {
  assert.equal(fixCalculationNoun('Hesaplama', 'Account', 'en'), 'Calculation');
  assert.equal(fixCalculationNoun('Hesaplama Adımları', 'Account Steps', 'en'), 'Calculation Steps');
});

test('sources that never said "hesap" are untouched', () => {
  assert.equal(fixCalculationNoun('Kullanıcı profili', 'User account', 'en'), 'User account');
});
