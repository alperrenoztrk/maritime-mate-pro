import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

test("keeps Android screenshots and screen recordings available", () => {
  const mainActivity = read(
    "android/app/src/main/java/com/marinersbook/app/MainActivity.java",
  );

  assert.doesNotMatch(mainActivity, /FLAG_SECURE/);
  assert.doesNotMatch(mainActivity, /ScreenProtectionPlugin/);
});

test("does not reactivate capture protection from the web layer", () => {
  const app = read("src/App.tsx");

  assert.doesNotMatch(app, /useScreenProtection/);

  for (const relativePath of [
    "src/hooks/useScreenProtection.ts",
    "src/plugins/screenProtection.ts",
    "src/plugins/screenProtection.web.ts",
  ]) {
    assert.equal(
      fs.existsSync(path.join(root, relativePath)),
      false,
      `${relativePath} must stay removed`,
    );
  }
});

test("keeps the iOS target free of the secure capture layer", () => {
  const project = read("ios/App/App.xcodeproj/project.pbxproj");

  assert.doesNotMatch(project, /ScreenProtectionPlugin/);
  assert.equal(
    fs.existsSync(path.join(root, "ios/App/App/ScreenProtectionPlugin.swift")),
    false,
  );
});
