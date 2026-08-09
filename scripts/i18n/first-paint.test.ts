import assert from 'node:assert/strict';
import {
  DEFAULT_LANGUAGE,
  readLanguagePreference,
  resolveLanguagePreference,
  SOURCE_LANGUAGE,
} from '../../src/utils/languagePreference.ts';

assert.equal(resolveLanguagePreference('en'), 'en');
assert.equal(resolveLanguagePreference('de'), 'de');
assert.equal(resolveLanguagePreference('unsupported'), DEFAULT_LANGUAGE);
assert.equal(resolveLanguagePreference(null), DEFAULT_LANGUAGE);
assert.equal(
  resolveLanguagePreference('en', '?_mtHarvest=1'),
  SOURCE_LANGUAGE,
  'harvest frames must always render the Turkish source language',
);
assert.equal(
  readLanguagePreference({ getItem: () => { throw new Error('denied'); } }, ''),
  DEFAULT_LANGUAGE,
  'storage failures must fall back without delaying the first render',
);

const htmlAttributes = new Map<string, string>();
const guardAttributes = new Map<string, string>();
const dispatchedEvents: Event[] = [];

class TestCustomEvent<T> extends Event {
  detail: T;

  constructor(type: string, init?: CustomEventInit<T>) {
    super(type);
    this.detail = init?.detail as T;
  }
}

Object.assign(globalThis, {
  CustomEvent: TestCustomEvent,
  document: {
    documentElement: {
      setAttribute: (name: string, value: string) => htmlAttributes.set(name, value),
      removeAttribute: (name: string) => htmlAttributes.delete(name),
    },
    getElementById: (id: string) => id === 'translation-guard'
      ? { setAttribute: (name: string, value: string) => guardAttributes.set(name, value) }
      : null,
  },
  window: {
    dispatchEvent: (event: Event) => {
      dispatchedEvents.push(event);
      return true;
    },
  },
});

const {
  beginInitialTranslationGuard,
  beginTranslationGuard,
  finishInitialTranslationGuard,
  finishTranslationGuard,
  isTranslationGuardActive,
} = await import('../../src/utils/translationGuard.ts');

beginInitialTranslationGuard(true);
const routeToken = beginTranslationGuard();
assert.equal(isTranslationGuardActive(), true);
assert.equal(htmlAttributes.get('data-translation-pending'), 'true');
assert.equal(guardAttributes.get('aria-hidden'), 'false');

finishInitialTranslationGuard();
assert.equal(
  htmlAttributes.get('data-translation-pending'),
  'true',
  'finishing boot must not reveal a route whose own translation is pending',
);

finishTranslationGuard(routeToken);
assert.equal(isTranslationGuardActive(), false);
assert.equal(htmlAttributes.has('data-translation-pending'), false);
assert.equal(guardAttributes.get('aria-hidden'), 'true');
assert.ok(dispatchedEvents.length >= 3);

console.log('i18n first-paint guard tests passed');
