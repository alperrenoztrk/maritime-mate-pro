import assert from "node:assert/strict";
import test from "node:test";
import {
  appTabForPath,
  hasHierarchicalBack,
  isAppTabRoot,
  isTabSwitch,
} from "./appNavigation";

test("maps every top-level stack and its children to the correct tab", () => {
  assert.equal(appTabForPath("/"), "home");
  assert.equal(appTabForPath("/lessons/navigation/topics"), "learn");
  assert.equal(appTabForPath("/exam-preparation"), "learn");
  assert.equal(appTabForPath("/stability/calculations"), "tools");
  assert.equal(appTabForPath("/machine/diesel-engines/calculations"), "tools");
  assert.equal(appTabForPath("/ship-systems/nav-systems"), "library");
  assert.equal(appTabForPath("/search"), "search");
});

test("tab roots never expose hierarchical back", () => {
  for (const path of ["/", "/lessons", "/calculations", "/library", "/search"]) {
    assert.equal(isAppTabRoot(path), true, path);
    assert.equal(hasHierarchicalBack(path), false, path);
  }
  assert.equal(hasHierarchicalBack("/lessons/navigation/topics"), true);
});

test("recognizes tab switches separately from in-stack navigation", () => {
  assert.equal(isTabSwitch("/lessons", "/calculations"), true);
  assert.equal(isTabSwitch("/lessons", "/lessons/navigation/topics"), false);
  assert.equal(isTabSwitch(undefined, "/"), false);
});
