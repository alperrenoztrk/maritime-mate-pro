import assert from 'node:assert/strict';
import test from 'node:test';
import { findTermIssues } from './term-audit-rules.mjs';

test('bare Hesap is audited as the account label', () => {
  assert.deepEqual(findTermIssues('Hesap', 'Account', 'en'), []);
});

test('explicit calculation copy still rejects the banking sense', () => {
  const issues = findTermIssues('Hesaplama', 'Account', 'en');
  assert.equal(
    issues.some(({ label, severity }) => label.startsWith('hesap') && severity === 'error'),
    true,
  );
});

test('omuzluk requires quarter rather than any everyday body-part sense', () => {
  assert.equal(findTermIssues('Sancak kıç omuzluk', 'Starboard quarter', 'en').length, 0);
  assert.equal(
    findTermIssues('Sancak kıç omuzluk', 'Starboard shoulder strap', 'en')
      .some(({ severity }) => severity === 'error'),
    true,
  );
  assert.equal(
    findTermIssues('Sancak baş omuzluk', 'Starboard bow', 'en')
      .some(({ label }) => label.startsWith('omuzluk → quarter')),
    true,
  );
});

test('audits recurring maritime word-sense failures', () => {
  const cases = [
    ['No.1 Ambar', 'No.1 Warehouse'],
    ['Ana yatak sıcaklığı', 'Main bed temperature'],
    ['Silindir gömlek aşınması', 'Cylinder shirt wear'],
    ['Seyir fenerleri', 'Navigation lanterns'],
    ['Çatışma riski', 'Risk of conflict'],
    ['Makine vardiyası', 'Machine shift'],
    ['Ana makine', 'Main machine'],
    ['Makine dairesi', 'Machine room'],
    ['Dümen makinesi', 'Steering machine'],
  ];
  for (const [source, value] of cases) {
    assert.equal(
      findTermIssues(source, value, 'en').some(({ severity }) => severity === 'error'),
      true,
      `${source} should reject ${value}`,
    );
  }
});

test('does not confuse accommodation beds, clothing, or actual conflicts', () => {
  assert.deepEqual(findTermIssues('Yatak yapımı ve çarşaf değişimi', 'Bed making and linen change', 'en'), []);
  assert.deepEqual(findTermIssues('Arc-rated gömlek/pantolon', 'Arc-rated shirt/trousers', 'en'), []);
  assert.deepEqual(findTermIssues('Ekip içinde çatışma yönetimi', 'Conflict management within the team', 'en'), []);
});
