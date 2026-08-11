#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const walk = (directory, out = []) => {
  if (!fs.existsSync(directory)) return out;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
};

const indexPath = path.join(dist, "index.html");
assert(fs.existsSync(indexPath), "dist/index.html is missing; run npm run build:native first");
const html = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, "utf8") : "";
const iosProject = fs.readFileSync(path.join(root, "ios/App/App.xcodeproj/project.pbxproj"), "utf8");
const contentSizePlugin = fs.readFileSync(path.join(root, "ios/App/App/ContentSizePlugin.swift"), "utf8");
const systemSymbolsPlugin = fs.readFileSync(path.join(root, "ios/App/App/SystemSymbolsPlugin.swift"), "utf8");

assert(
  !/nomodule|systemjs/i.test(html),
  "native index contains the legacy/SystemJS loader; Capacitor must ship the modern tree only",
);
assert(
  iosProject.includes("SystemSymbolsPlugin.swift in Sources") &&
    systemSymbolsPlugin.includes("UIImage(systemName:") &&
    systemSymbolsPlugin.includes("withTintColor(.black"),
  "genuine SF Symbols bridge is missing from the Xcode Sources phase",
);
assert(
  !fs.existsSync(path.join(dist, "sw.js")),
  "native output contains sw.js; service workers belong to the web/PWA profile",
);
assert(
  !fs.existsSync(path.join(dist, "manifest.webmanifest")),
  "native output contains a PWA manifest; Capacitor does not need the PWA install layer",
);
assert(
  iosProject.includes("ContentSizePlugin.swift in Sources") &&
    contentSizePlugin.includes("UIContentSizeCategory.didChangeNotification"),
  "iOS Dynamic Type bridge is missing from the Xcode Sources phase",
);

const jsFiles = walk(dist).filter((file) => file.endsWith(".js"));
const sizes = jsFiles.map((file) => ({ file, bytes: fs.statSync(file).size }));
const totalBytes = sizes.reduce((sum, item) => sum + item.bytes, 0);
const largest = sizes.reduce(
  (current, item) => (item.bytes > current.bytes ? item : current),
  { file: "", bytes: 0 },
);

// These are release guardrails, not aspirational zeroes. They leave modest
// headroom above the current route-split modern build while preventing the
// legacy tree or a new monolithic dependency from silently returning.
assert(jsFiles.length <= 900, `native JS file count ${jsFiles.length} exceeds the 900-file budget`);
assert(totalBytes <= 22 * 1024 * 1024, `native JS total ${(totalBytes / 1024 / 1024).toFixed(2)} MiB exceeds 22 MiB`);
assert(largest.bytes <= 1.8 * 1024 * 1024, `largest native chunk ${(largest.bytes / 1024 / 1024).toFixed(2)} MiB exceeds 1.8 MiB`);

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(
  `Native build budget passed: ${jsFiles.length} JS files, ` +
    `${(totalBytes / 1024 / 1024).toFixed(2)} MiB total, ` +
    `${(largest.bytes / 1024).toFixed(1)} KiB largest chunk.`,
);
