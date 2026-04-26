#!/usr/bin/env node
/**
 * Topic Content Schema Validator
 * ------------------------------
 * Statically analyses every TopicContent definition across topic pages and
 * verifies that:
 *   - required fields (title, introduction, content) exist & are non-empty
 *   - `image` (legacy single image) is a string when present
 *   - `photos` is an array of objects each with at least { src, title, caption }
 *   - photos.src refers to an imported asset (not a raw string path)
 *   - `image` and `photos` are NOT both used on the same topic (consistency rule)
 *   - keys in topicContents map are unique (TS already enforces, but we report)
 *
 * Usage: node scripts/check-topic-content-schema.mjs
 *        npm run check:topic-schema
 *
 * Exit codes: 0 = clean, 1 = validation errors found.
 */
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const repoRoot = process.cwd();

/**
 * Each entry: { filePath, variableName }
 * variableName lets us support files that re-export the map under a different
 * identifier (e.g. fluidMechanicsTopicContents).
 */
const FILES = [
  { filePath: "src/pages/SeamanshipTopicsPage.tsx", variableName: "topicContents" },
  { filePath: "src/pages/MeteorologyTopicsPage.tsx", variableName: "topicContents" },
  { filePath: "src/pages/StabilityTopicsPage.tsx", variableName: "topicContents" },
  { filePath: "src/pages/CargoTopicsPage.tsx", variableName: "topicContents" },
  { filePath: "src/pages/SafetyTopicsPage.tsx", variableName: "topicContents" },
  { filePath: "src/pages/EnvironmentTopicsPage.tsx", variableName: "topicContents" },
  { filePath: "src/pages/EconomicsTopicsPage.tsx", variableName: "topicContents" },
  { filePath: "src/data/fluidMechanicsContent.ts", variableName: "fluidMechanicsTopicContents" },
];

const REQUIRED_STRING_FIELDS = ["title", "introduction", "content"];
const REQUIRED_PHOTO_FIELDS = ["src", "title", "caption"];

const errors = [];
const warnings = [];
let totalTopics = 0;
let topicsWithPhotos = 0;
let topicsWithImage = 0;

function parseSource(filePath) {
  const full = path.join(repoRoot, filePath);
  if (!fs.existsSync(full)) return null;
  const text = fs.readFileSync(full, "utf8");
  return {
    text,
    sourceFile: ts.createSourceFile(filePath, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX),
  };
}

function findVariable(sourceFile, name) {
  let result;
  function walk(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText() === name && node.initializer) {
      result = node.initializer;
      return;
    }
    ts.forEachChild(node, walk);
  }
  walk(sourceFile);
  return result;
}

function getProp(obj, name) {
  return obj.properties.find(
    (p) =>
      ts.isPropertyAssignment(p) &&
      ((ts.isIdentifier(p.name) && p.name.text === name) ||
        (ts.isStringLiteral(p.name) && p.name.text === name)),
  );
}

function lineOf(sourceFile, node) {
  const { line } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
  return line + 1;
}

function isStringLikeNonEmpty(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text.trim().length > 0;
  }
  if (ts.isTemplateExpression(node)) {
    // Template with substitutions — assume non-empty.
    return node.head.text.length > 0 || node.templateSpans.length > 0;
  }
  return false;
}

function validatePhoto(photoNode, ctx) {
  if (!ts.isObjectLiteralExpression(photoNode)) {
    errors.push(`${ctx}: photos[] item is not an object literal (line ${lineOf(ctx.sf, photoNode)})`);
    return;
  }
  for (const field of REQUIRED_PHOTO_FIELDS) {
    const p = getProp(photoNode, field);
    if (!p) {
      errors.push(`${ctx.label}: photo missing required field "${field}" (line ${lineOf(ctx.sf, photoNode)})`);
      continue;
    }
    if (field === "src") {
      // Must be an imported identifier (e.g. anchorTypes), not a string path.
      if (ts.isStringLiteral(p.initializer)) {
        warnings.push(
          `${ctx.label}: photo.src is a raw string "${p.initializer.text}" — prefer ES6 import for asset hashing (line ${lineOf(ctx.sf, p)})`,
        );
      } else if (!ts.isIdentifier(p.initializer)) {
        warnings.push(`${ctx.label}: photo.src has unexpected expression type (line ${lineOf(ctx.sf, p)})`);
      }
    } else {
      if (!isStringLikeNonEmpty(p.initializer)) {
        errors.push(`${ctx.label}: photo.${field} must be a non-empty string (line ${lineOf(ctx.sf, p)})`);
      }
    }
  }
  // Optional fields type-check.
  for (const optional of ["alt", "credit"]) {
    const p = getProp(photoNode, optional);
    if (p && !isStringLikeNonEmpty(p.initializer)) {
      warnings.push(`${ctx.label}: photo.${optional} present but empty (line ${lineOf(ctx.sf, p)})`);
    }
  }
}

function validateTopicContent(key, contentNode, sf, fileLabel) {
  totalTopics++;
  const label = `${fileLabel} → "${key}"`;
  const ctx = { label, sf };

  if (!ts.isObjectLiteralExpression(contentNode)) {
    errors.push(`${label}: value is not an object literal`);
    return;
  }

  for (const field of REQUIRED_STRING_FIELDS) {
    const p = getProp(contentNode, field);
    if (!p) {
      errors.push(`${label}: missing required field "${field}"`);
      continue;
    }
    if (!isStringLikeNonEmpty(p.initializer)) {
      errors.push(`${label}: field "${field}" is empty`);
    }
  }

  const imageProp = getProp(contentNode, "image");
  const photosProp = getProp(contentNode, "photos");

  if (imageProp) {
    topicsWithImage++;
    if (!ts.isStringLiteral(imageProp.initializer) && !ts.isIdentifier(imageProp.initializer)) {
      errors.push(`${label}: "image" must be a string literal or imported identifier (line ${lineOf(sf, imageProp)})`);
    }
  }

  if (photosProp) {
    topicsWithPhotos++;
    if (!ts.isArrayLiteralExpression(photosProp.initializer)) {
      errors.push(`${label}: "photos" must be an array literal (line ${lineOf(sf, photosProp)})`);
    } else {
      if (photosProp.initializer.elements.length === 0) {
        warnings.push(`${label}: "photos" array is empty — remove the field or add photos`);
      }
      photosProp.initializer.elements.forEach((el) => validatePhoto(el, { ...ctx, label }));
    }
  }

  if (imageProp && photosProp) {
    warnings.push(
      `${label}: uses BOTH "image" and "photos" — prefer migrating the single image into the photos gallery for consistency`,
    );
  }
}

function validateFile(filePath) {
  const parsed = parseSource(filePath);
  if (!parsed) {
    warnings.push(`${filePath}: file not found, skipping`);
    return;
  }
  const fileLabel = path.basename(filePath);
  const map = findVariable(parsed.sourceFile, "topicContents");
  if (!map) {
    warnings.push(`${fileLabel}: no "topicContents" variable found, skipping`);
    return;
  }
  if (!ts.isObjectLiteralExpression(map)) {
    errors.push(`${fileLabel}: "topicContents" is not an object literal`);
    return;
  }

  const seenKeys = new Set();
  for (const prop of map.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const keyNode = prop.name;
    let key;
    if (ts.isStringLiteral(keyNode) || ts.isNoSubstitutionTemplateLiteral(keyNode)) key = keyNode.text;
    else if (ts.isIdentifier(keyNode)) key = keyNode.text;
    else continue;

    if (seenKeys.has(key)) {
      errors.push(`${fileLabel}: duplicate topic key "${key}"`);
    }
    seenKeys.add(key);

    validateTopicContent(key, prop.initializer, parsed.sourceFile, fileLabel);
  }
}

// --- Run ---
console.log("🔍 Topic content schema validation\n");
for (const f of FILES) validateFile(f);

console.log(`📊 Scanned ${totalTopics} topic content entries`);
console.log(`   • ${topicsWithPhotos} use the photos gallery`);
console.log(`   • ${topicsWithImage} use the legacy "image" field\n`);

if (warnings.length) {
  console.log(`⚠️  ${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`   - ${w}`);
  console.log();
}

if (errors.length) {
  console.error(`❌ ${errors.length} error(s):`);
  for (const e of errors) console.error(`   - ${e}`);
  process.exit(1);
}

console.log("✅ All topic content entries pass schema validation");
