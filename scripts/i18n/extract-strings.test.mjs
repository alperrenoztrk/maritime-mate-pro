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
    'Currently disabled. Once enabled, your account can only be accessed by someone who knows your password and can also reach your authenticator app.',
    'Close',
    'Confirm',
    'Two-step verification turned on',
    'The code could not be verified. Enter the current code in the app.',
    'Language Changed',
    'Application language changed successfully',
    'Settings Reset',
    'Language settings have been restored to their defaults',
  ];

  for (const source of expected) {
    assert.equal(sources.has(source), true, `missing extracted UI copy: ${source}`);
  }
});

test('multiline JSX is normalized to the exact rendered DOM text', () => {
  const sources = readSources();
  const rendered =
    'Currently disabled. Once enabled, your account can only be accessed by someone who knows your password and can also reach your authenticator app.';

  assert.equal(sources.has(rendered), true);
  assert.equal(
    [...sources].some((source) => source.includes('password\n') && source.includes('authenticator app')),
    false,
  );
});

test('JSX character references are decoded like React renders them', () => {
  const sources = readSources();
  assert.equal(
    [...sources].some((source) => /&(?:lt|gt|amp|quot|apos|rsquo|#\d+);/.test(source)),
    false,
    'a dictionary key with an HTML entity never matches the rendered DOM text',
  );
  // The old SOLAS page heading was removed when the lessons were repaginated.
  // Test a currently rendered JSX entity instead of obsolete UI copy.
  assert.equal(sources.has('Mariner’s Book'), true);
  assert.equal(sources.has('Mariner&rsquo;s Book'), false);
});
