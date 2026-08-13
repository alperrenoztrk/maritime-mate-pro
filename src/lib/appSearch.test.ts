import assert from "node:assert/strict";
import test from "node:test";
import {
  dedupeSearchItems,
  displaySearchCategory,
  matchesSearchScope,
  searchItemScope,
} from "./appSearch";

test("classifies high-level search destinations into useful scopes", () => {
  assert.equal(searchItemScope({ title: "Ders", path: "/lessons/navigation/topics", category: "Seyir" }), "learn");
  assert.equal(searchItemScope({ title: "Stabilite Quiz", path: "/stability/quiz", category: "Stabilite" }), "learn");
  assert.equal(searchItemScope({ title: "GM", path: "/stability/calculations", category: "Stabilite" }), "tools");
  assert.equal(searchItemScope({ title: "GM Hesaplama", path: "/stability/gm", category: "Stabilite" }), "tools");
  assert.equal(searchItemScope({ title: "Haberleşme Asistanı", path: "/communication/assistant", category: "Haberleşme" }), "tools");
  assert.equal(searchItemScope({ title: "DP", path: "/ship-operations/offshore", category: "Operasyonlar" }), "operations");
  assert.equal(searchItemScope({ title: "Sözlük", path: "/glossary", category: "Genel" }), "reference");
});

test("replaces generic labels for primary destinations", () => {
  assert.equal(displaySearchCategory({ title: "Hesaplamalar", path: "/calculations", category: "Genel" }), "Tools");
  assert.equal(displaySearchCategory({ title: "Personel", path: "/crew", category: "Genel" }), "Personel");
  assert.equal(displaySearchCategory({ title: "Ana Sayfa", path: "/", category: "Genel" }), "Home Page");
});

test("deduplicates merged shallow and deep indexes without losing distinct destinations", () => {
  const items = [
    { title: "Gemi Sistemleri", path: "/ship-systems", category: "Genel" },
    { title: "Gemi Sistemleri", path: "/ship-systems", category: "Makine" },
    { title: "Gemi Sistemleri", path: "/lessons/ship-systems", category: "Dersler" },
  ];
  const deduped = dedupeSearchItems(items);
  assert.equal(deduped.length, 2);
  assert.equal(matchesSearchScope(deduped[1], "learn"), true);
  assert.equal(matchesSearchScope(deduped[0], "all"), true);
});
