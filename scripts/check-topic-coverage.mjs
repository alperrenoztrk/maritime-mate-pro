import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const repoRoot = process.cwd();

const MODULES = [
  {
    name: "meteorology",
    filePath: "src/pages/MeteorologyTopicsPage.tsx",
    topicsVar: "meteorologyTopics",
    filterTopicIds: null,
  },
  {
    name: "deck",
    filePath: "src/pages/SeamanshipTopicsPage.tsx",
    topicsVar: "seamanshipTopics",
    filterTopicIds: new Set(["deck-machinery"]),
  },
];

function parseSource(filePath) {
  const fullPath = path.join(repoRoot, filePath);
  const text = fs.readFileSync(fullPath, "utf8");
  return ts.createSourceFile(filePath, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
}

function getProperty(objectLiteral, propertyName) {
  const property = objectLiteral.properties.find(
    (prop) =>
      ts.isPropertyAssignment(prop) &&
      ((ts.isIdentifier(prop.name) && prop.name.text === propertyName) ||
        (ts.isStringLiteral(prop.name) && prop.name.text === propertyName)),
  );

  if (!property || !ts.isPropertyAssignment(property)) {
    return undefined;
  }

  return property.initializer;
}

function getStringValue(node) {
  if (!node) return undefined;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }
  return undefined;
}

function getBooleanValue(node) {
  if (!node) return undefined;
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  return undefined;
}

function findVariableInitializer(sourceFile, variableName) {
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === variableName) {
        return declaration.initializer;
      }
    }
  }
  return undefined;
}

function extractSubtopics(sourceFile, topicsVar, filterTopicIds) {
  const initializer = findVariableInitializer(sourceFile, topicsVar);
  if (!initializer || !ts.isArrayLiteralExpression(initializer)) {
    throw new Error(`${topicsVar} dizisi bulunamadı veya beklenen formatta değil.`);
  }

  const rows = [];

  for (const topicNode of initializer.elements) {
    if (!ts.isObjectLiteralExpression(topicNode)) continue;

    const topicId = getStringValue(getProperty(topicNode, "id"));
    if (!topicId) continue;

    if (filterTopicIds && !filterTopicIds.has(topicId)) {
      continue;
    }

    const topicTitle = getStringValue(getProperty(topicNode, "title")) ?? topicId;
    const subtopicsNode = getProperty(topicNode, "subtopics");
    if (!subtopicsNode || !ts.isArrayLiteralExpression(subtopicsNode)) continue;

    for (const subtopicNode of subtopicsNode.elements) {
      if (!ts.isObjectLiteralExpression(subtopicNode)) continue;
      const id = getStringValue(getProperty(subtopicNode, "id"));
      const title = getStringValue(getProperty(subtopicNode, "title"));
      const hasContent = getBooleanValue(getProperty(subtopicNode, "hasContent"));

      if (!id || !title || typeof hasContent !== "boolean") continue;

      rows.push({
        topicId,
        topicTitle,
        id,
        title,
        hasContent,
      });
    }
  }

  return rows;
}

function extractTopicContentIds(sourceFile) {
  const initializer = findVariableInitializer(sourceFile, "topicContents");
  if (!initializer || !ts.isObjectLiteralExpression(initializer)) {
    throw new Error("topicContents objesi bulunamadı veya beklenen formatta değil.");
  }

  const ids = new Set();
  for (const prop of initializer.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;

    if (ts.isIdentifier(prop.name)) {
      ids.add(prop.name.text);
    } else if (ts.isStringLiteral(prop.name) || ts.isNoSubstitutionTemplateLiteral(prop.name)) {
      ids.add(prop.name.text);
    }
  }

  return ids;
}

const issues = [];

for (const mod of MODULES) {
  const sourceFile = parseSource(mod.filePath);
  const subtopics = extractSubtopics(sourceFile, mod.topicsVar, mod.filterTopicIds);
  const contentIds = extractTopicContentIds(sourceFile);

  for (const subtopic of subtopics) {
    const contentExists = contentIds.has(subtopic.id);

    if (!contentExists) {
      issues.push({
        module: mod.name,
        topic: subtopic.topicTitle,
        subtopic: subtopic.title,
        id: subtopic.id,
        reason: "Subtopic listesinde var ancak topicContents içinde karşılığı yok",
      });
    }

    if (subtopic.hasContent !== contentExists) {
      issues.push({
        module: mod.name,
        topic: subtopic.topicTitle,
        subtopic: subtopic.title,
        id: subtopic.id,
        reason: `hasContent=${subtopic.hasContent} fakat içerik ${contentExists ? "var" : "yok"}`,
      });
    }
  }
}

if (issues.length > 0) {
  console.error("❌ Kapsam kontrolü başarısız. Bulunan sorunlar:");
  for (const issue of issues) {
    console.error(`- Modül: ${issue.module} | Ana konu: ${issue.topic} | Başlık: ${issue.subtopic} (${issue.id}) | Sorun: ${issue.reason}`);
  }
  process.exit(1);
}

console.log("✅ Kapsam kontrolü başarılı: meteorology ve deck modüllerinde subtopic-content/hasContent tutarlı.");
