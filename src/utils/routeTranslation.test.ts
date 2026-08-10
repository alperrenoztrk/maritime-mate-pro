import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createRouteTranslationToken,
  isRouteTranslationReady,
} from './routeTranslation';

test('route translation tokens include language and the complete location identity', () => {
  const english = createRouteTranslationToken('en', 'abc', '/lessons', '?tab=deck', '#rules');

  assert.equal(
    english,
    createRouteTranslationToken('en', 'abc', '/lessons', '?tab=deck', '#rules'),
  );
  assert.notEqual(english, createRouteTranslationToken('de', 'abc', '/lessons', '?tab=deck', '#rules'));
  assert.notEqual(english, createRouteTranslationToken('en', 'def', '/lessons', '?tab=deck', '#rules'));
  assert.notEqual(english, createRouteTranslationToken('en', 'abc', '/lessons', '?tab=engine', '#rules'));
});

test('non-source routes stay gated until their exact translation token is ready', () => {
  const current = createRouteTranslationToken('en', 'current', '/calculations');
  const previous = createRouteTranslationToken('en', 'previous', '/');

  assert.equal(isRouteTranslationReady('en', current, previous), false);
  assert.equal(isRouteTranslationReady('en', current, current), true);
  assert.equal(isRouteTranslationReady('tr', current, null), true);
});
