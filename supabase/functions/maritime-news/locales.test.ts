import assert from "node:assert/strict";
import test from "node:test";
import {
  NEWS_LOCALE_CONFIGS,
  buildRegionalFeeds,
  getFeedsForLanguage,
  resolveNewsLocale,
} from "./locales.ts";

test("resolves every app language and common regional variants", () => {
  assert.equal(Object.keys(NEWS_LOCALE_CONFIGS).length, 19);
  assert.equal(resolveNewsLocale("tr").countryCode, "TR");
  assert.equal(resolveNewsLocale("tr-TR").language, "tr");
  assert.equal(resolveNewsLocale("zh-cn").language, "zh-CN");
  assert.equal(resolveNewsLocale("nb-NO").language, "no");
  assert.equal(resolveNewsLocale("unsupported").language, "en");
});

test("builds three correctly localized and unique regional feeds", () => {
  for (const config of Object.values(NEWS_LOCALE_CONFIGS)) {
    const feeds = buildRegionalFeeds(config);
    assert.equal(feeds.length, 3);
    assert.equal(new Set(feeds.map((feed) => feed.id)).size, 3);
    for (const feed of feeds) {
      const url = new URL(feed.url);
      assert.equal(url.hostname, "news.google.com");
      assert.equal(url.searchParams.get("gl"), config.countryCode);
      assert.equal(url.searchParams.get("hl"), config.hl);
      assert.equal(url.searchParams.get("ceid"), config.ceid);
      assert.match(url.searchParams.get("q") || "", /when:(7d|14d)$/);
    }
  }
});

test("keeps legacy English feeds only for the English edition", () => {
  const legacy = [{ id: "legacy", name: "Legacy", url: "https://example.com/feed" }];
  assert.equal(getFeedsForLanguage("en", legacy).feeds.length, 4);
  assert.equal(getFeedsForLanguage("de", legacy).feeds.length, 3);
  assert.equal(getFeedsForLanguage("de", legacy).feeds.some((feed) => feed.id === "legacy"), false);
});
