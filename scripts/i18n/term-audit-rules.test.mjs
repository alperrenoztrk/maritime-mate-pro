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
