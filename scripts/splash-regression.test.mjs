import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import test from "node:test";

const source = fs.readFileSync(new URL("../public/splash-watchdog.js", import.meta.url), "utf8");
for (const mounted of [false, true]) {
  test(`watchdog releases content when ${mounted ? "mounted dismissal stalls" : "boot fails"}`, () => {
    const elements = new Map();
    const timers = [];
    const events = [];
    function element(id) {
      const node = { id, style: {}, childElementCount: 0, attributes: new Set(), children: [],
        removeAttribute(name) { this.attributes.delete(name); },
        appendChild(child) { this.children.push(child); child.parentNode = this; if (child.id) elements.set(child.id, child); },
        removeChild(child) { this.children = this.children.filter((item) => item !== child); elements.delete(child.id); },
        addEventListener() {},
      };
      if (id) elements.set(id, node);
      return node;
    }
    const html = element("html"); html.attributes.add("data-launch-pending");
    const root = element("root"); root.attributes = new Set(["inert", "aria-hidden"]); root.childElementCount = mounted ? 1 : 0;
    const body = element("body"); body.appendChild(element("splash-root"));
    vm.runInNewContext(source, {
      document: { documentElement: html, body, getElementById: (id) => elements.get(id), createElement: () => element() },
      window: { addEventListener() {}, dispatchEvent: (event) => events.push(event.type) },
      Event: class { constructor(type) { this.type = type; } },
      setTimeout: (callback) => timers.push(callback), setInterval() {}, clearInterval() {},
    });
    timers[0]();
    assert.ok(!elements.has("splash-root"));
    assert.ok(!html.attributes.has("data-launch-pending"));
    assert.ok(!root.attributes.has("inert"));
    assert.ok(!root.attributes.has("aria-hidden"));
    assert.deepEqual(events, ["splash:hidden"]);
    assert.equal(elements.has("splash-watchdog-recovery"), !mounted);
  });
}
