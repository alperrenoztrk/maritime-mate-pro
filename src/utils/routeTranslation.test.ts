import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createRouteTranslationToken,
  isRouteTranslationReady,
  ROUTE_TRANSLATION_MAX_WAIT_MS,
  settleWithDeadline,
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

test('route translation has a short, finite responsiveness budget', () => {
  assert.ok(ROUTE_TRANSLATION_MAX_WAIT_MS > 0);
  assert.ok(ROUTE_TRANSLATION_MAX_WAIT_MS <= 3_000);
});

test('translation deadline releases a route when work never settles', async () => {
  const never = new Promise<void>(() => undefined);
  const result = await settleWithDeadline(never, 5);

  assert.deepEqual(result, { status: 'timed-out' });
});

test('translation deadline preserves completed and failed outcomes', async () => {
  assert.deepEqual(
    await settleWithDeadline(Promise.resolve('ready'), 50),
    { status: 'completed', value: 'ready' },
  );

  const failure = new Error('translation failed');
  const result = await settleWithDeadline(Promise.reject(failure), 50);
  assert.equal(result.status, 'failed');
  if (result.status === 'failed') assert.equal(result.error, failure);
});
