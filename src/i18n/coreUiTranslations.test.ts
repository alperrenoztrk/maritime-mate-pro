import assert from "node:assert/strict";
import test from "node:test";
import {
  CORE_UI_LANGUAGE_CODES,
  ENGLISH_CORE_UI_AUDIT_SOURCES,
  SHELL_COPY_BY_LANGUAGE,
  getCoreUiTranslation,
} from "./coreUiTranslations";

const SHELL_SOURCES = [
  "Ana bölümler",
  "Ana Sayfa",
  "Öğren",
  "Araçlar",
  "Kütüphane",
  "Ara",
  "Uygulamada ara",
  "Geri",
] as const;

test("persistent app chrome has synchronous copy in every supported language", () => {
  for (const languageCode of CORE_UI_LANGUAGE_CODES) {
    assert.equal(
      SHELL_COPY_BY_LANGUAGE[languageCode].length,
      SHELL_SOURCES.length,
      `${languageCode} shell copy must keep the shared field order`,
    );
    for (const source of SHELL_SOURCES) {
      assert.ok(
        getCoreUiTranslation(source, languageCode),
        `${languageCode} is missing persistent chrome copy for ${source}`,
      );
    }
  }
});

test("library title aliases resolve to the same localized tab label", () => {
  for (const languageCode of CORE_UI_LANGUAGE_CODES.filter((code) => code !== "tr")) {
    assert.equal(
      getCoreUiTranslation("Kitaplık", languageCode),
      getCoreUiTranslation("Kütüphane", languageCode),
    );
  }
});

test("the audited English core screens have no dictionary gaps", () => {
  assert.ok(ENGLISH_CORE_UI_AUDIT_SOURCES.length >= 60);
  for (const source of ENGLISH_CORE_UI_AUDIT_SOURCES) {
    assert.ok(
      getCoreUiTranslation(source, "en"),
      `English core UI overlay is missing ${source}`,
    );
  }
});
