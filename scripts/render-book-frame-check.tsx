import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BookRouteFrame } from "../src/components/book/BookRouteFrame";
import { BookSheet } from "../src/components/book/BookSheet";

const inside = renderToStaticMarkup(
  <BookRouteFrame pathname="/stability/formulas/gm">
    <BookSheet title="INNER SHELL">
      <section id="formula-content">GM = KM − KG</section>
    </BookSheet>
  </BookRouteFrame>,
);

const outside = renderToStaticMarkup(
  <BookRouteFrame pathname="/settings">
    <section id="settings-content">Ayarlar</section>
  </BookRouteFrame>,
);

const calculator = renderToStaticMarkup(
  <BookRouteFrame pathname="/navigation/calc/gc">
    <form><input name="distance" /><button type="submit">Hesapla</button></form>
  </BookRouteFrame>,
);

const count = (source: string, needle: string) => source.split(needle).length - 1;
const failures: string[] = [];
if (count(inside, "class=\"bs-volume ") !== 1) failures.push("Nested BookSheet produced more than one physical book.");
if (!inside.includes("data-book-route=\"true\"")) failures.push("Book route marker is missing.");
if (!inside.includes("data-book-mode=\"reading\"")) failures.push("Reading mode marker is missing.");
if (!inside.includes("FORMÜLLER")) failures.push("Formula running title is missing.");
if (inside.includes("INNER SHELL")) failures.push("Nested running title was not absorbed.");
if (!inside.includes("formula-content")) failures.push("Nested page content was lost.");
if (outside.includes("class=\"bs-volume ")) failures.push("Settings was incorrectly wrapped in the book.");
if (count(inside, "class=\"bs-folio ") !== 2) failures.push("Open book does not print two folios.");
if (!inside.includes("bs-running--left") || !inside.includes("bs-running--right")) failures.push("Two-page running heads are missing.");
if (!inside.includes("bs-turning-leaf")) failures.push("Route page-turn leaf is missing.");
if (!calculator.includes("data-book-mode=\"calculator\"")) failures.push("Calculator controls were not opted into interaction.");
if (!calculator.includes("Hesapla")) failures.push("Calculator action was removed.");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Book frame render check passed: one open spread, two folios, route turn and scoped controls.");
