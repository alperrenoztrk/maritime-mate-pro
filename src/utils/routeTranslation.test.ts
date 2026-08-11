import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createRouteTranslationToken,
  isRouteTranslationBoundary,
  isRouteTranslationReady,
  READY_ROUTE_TOKEN_LIMIT,
  ROUTE_TRANSLATION_PENDING_SELECTOR,
  ROUTE_TRANSLATION_MAX_WAIT_MS,
  settleWithDeadline,
  withReadyRouteToken,
} from './routeTranslation';

test('only the pending route boundary is owned by the route pass', () => {
  const boundary = {
    matches: (selector: string) => selector === ROUTE_TRANSLATION_PENDING_SELECTOR,
  } as unknown as Pick<Element, 'matches'>;
  const asyncDescendant = {
    matches: () => false,
  } as unknown as Pick<Element, 'matches'>;

  assert.equal(isRouteTranslationBoundary(boundary), true);
  assert.equal(isRouteTranslationBoundary(asyncDescendant), false);
  assert.equal(isRouteTranslationBoundary(null), false);
});

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

  assert.equal(isRouteTranslationReady('en', current, new Set([previous])), false);
  assert.equal(isRouteTranslationReady('en', current, new Set([current])), true);
  assert.equal(isRouteTranslationReady('tr', current, null), true);
  assert.equal(isRouteTranslationReady('en', current, new Set()), false);
});

test('readying the outgoing screen never un-readies the incoming one', () => {
  // Both screens are mounted during a route transition and hold different
  // tokens. When readiness was a single token they took turns invalidating
  // each other, which re-rendered both subtrees without bound and froze the
  // app. Both must be able to hold "ready" at the same time.
  const outgoing = createRouteTranslationToken('en', 'outgoing', '/library');
  const incoming = createRouteTranslationToken('en', 'incoming', '/');

  let ready = withReadyRouteToken(new Set<string>(), incoming);
  ready = withReadyRouteToken(ready, outgoing);

  assert.equal(isRouteTranslationReady('en', incoming, ready), true);
  assert.equal(isRouteTranslationReady('en', outgoing, ready), true);
});

test('re-readying a known token returns the same set so React can bail out', () => {
  const token = createRouteTranslationToken('en', 'key', '/lessons');
  const ready = withReadyRouteToken(new Set<string>(), token);

  assert.equal(withReadyRouteToken(ready, token), ready);
});

test('the ready-token set stays bounded and evicts the oldest tokens', () => {
  let ready: ReadonlySet<string> = new Set<string>();
  const total = READY_ROUTE_TOKEN_LIMIT + 3;
  for (let i = 0; i < total; i += 1) {
    ready = withReadyRouteToken(ready, createRouteTranslationToken('en', `k${i}`, '/lessons'));
  }

  assert.equal(ready.size, READY_ROUTE_TOKEN_LIMIT);
  assert.equal(ready.has(createRouteTranslationToken('en', 'k0', '/lessons')), false);
  assert.equal(ready.has(createRouteTranslationToken('en', `k${total - 1}`, '/lessons')), true);
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
