import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
import { createServer } from 'vite';

// Local fixture for the real beta page; no account or service data is accessed.
const fixture = path.resolve('tmp/ocean-ui-fixture');
const output = path.resolve(process.env.OCEAN_SCREENSHOT_DIR ?? 'tmp/ocean-ui');
await fs.mkdir(fixture, { recursive: true }); await fs.mkdir(output, { recursive: true });
await fs.writeFile(path.join(fixture, 'index.html'), '<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><div id="root"></div><script type="module" src="/tmp/ocean-ui-fixture/main.tsx"></script></body></html>');
await fs.writeFile(path.join(fixture, 'main.tsx'), `
import React from 'react';
import { createRoot } from 'react-dom/client';
import { _roots } from '@react-three/fiber';
import BetaShipSimulator from '/src/pages/BetaShipSimulator';
import Ship3DVisualization from '/src/components/stability/Ship3DVisualization';
import '/src/index.css';
document.documentElement.classList.add('dark');
window.__motion = () => {
  const state = _roots.get(document.querySelector('canvas'))?.store.getState();
  const ship = state?.scene.getObjectByName('vessel-motion');
  return ship ? { roll:ship.rotation.x, pitch:ship.rotation.z, heave:ship.position.y } : null;
};
createRoot(document.getElementById('root')).render(location.search.includes('calculations') ? <Ship3DVisualization /> : <BetaShipSimulator />);
`);
const server = await createServer({ server: { host: '127.0.0.1', port: 5187, strictPort: true } });
let browser;
try {
  await server.listen();
  browser = await chromium.launch({
    headless: true, executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
      ...(process.env.PLAYWRIGHT_SINGLE_PROCESS ? ['--single-process', '--no-zygote'] : [])],
  });
  const errors = [];
  const context = await browser.newContext({ viewport: { width: 1100, height: 1000 }, deviceScaleFactor: 1 });
  await context.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  const url = 'http://127.0.0.1:5187/tmp/ocean-ui-fixture/index.html';
  const motion = () => page.evaluate(() => window.__motion());
  const viewport = page.getByTestId('ship-viewport');
  const wait = ms => page.waitForTimeout(ms);
  async function selectSea(name) {
    await page.getByRole('combobox', { name: 'Sea state', exact: true }).click();
    await page.getByRole('option', { name }).click(); await viewport.scrollIntoViewIfNeeded();
  }
  await page.goto(url); await page.waitForFunction(() => !!window.__motion());
  await viewport.scrollIntoViewIfNeeded(); await wait(4000);
  const first = await motion(); await wait(1500);
  assert.notDeepEqual(await motion(), first, 'roll/pitch/heave animate');
  await selectSea(/6 · Very rough/);
  await page.getByRole('button', { name: 'Bow', exact: true }).click();
  await viewport.scrollIntoViewIfNeeded(); await wait(6000);
  await viewport.screenshot({ path: path.join(output, 'passage-desktop.png') });
  await page.getByRole('button', { name: 'Pause', exact: true }).click(); await wait(700);
  const frozen = await motion(); await wait(1000);
  assert.deepEqual(await motion(), frozen, 'pause freezes vessel');
  const frame1 = await viewport.screenshot(); await wait(500);
  assert.ok(frame1.equals(await viewport.screenshot()), 'water, foam, flag and exhaust freeze together');
  await page.getByLabel('Water detail').selectOption('high'); await wait(600);
  assert.equal((await motion()).roll, frozen.roll, 'quality change does not advance paused physics');
  await page.getByRole('button', { name: 'Restart', exact: true }).click(); await wait(500);
  const restarted = await motion(); assert.equal(restarted.heave, 0, 'restart clears motion');
  await page.getByRole('button', { name: 'Play', exact: true }).click(); await wait(1500);
  assert.notEqual((await motion()).roll, restarted.roll, 'resume advances motion');
  await page.getByLabel('Water detail').selectOption('balanced');
  console.log('Animation, pixel freeze, detail, restart and resume passed.');
  for (const ship of ['Tanker', 'Bulk', 'Ro-Ro', 'Passenger', 'Container']) {
    await page.getByRole('combobox', { name: 'Ship type', exact: true }).click();
    await page.getByRole('option', { name: ship, exact: true }).click(); await wait(400);
  }
  await selectSea(/0 · Calm/);
  const speed = page.getByRole('slider', { name: 'Speed (kn)', exact: true });
  await speed.focus(); await page.keyboard.press('Home');
  assert.equal(await speed.getAttribute('aria-valuenow'), '0');
  await viewport.scrollIntoViewIfNeeded(); await wait(2000);
  await page.getByRole('button', { name: 'Harbour', exact: true }).click();
  await viewport.scrollIntoViewIfNeeded(); await wait(2000);
  await viewport.screenshot({ path: path.join(output, 'harbour.png') });
  await page.getByRole('button', { name: 'Passage', exact: true }).click();
  await selectSea(/6 · Very rough/);
  await page.setViewportSize({ width: 375, height: 900 });
  await viewport.scrollIntoViewIfNeeded(); await wait(2000);
  await page.screenshot({ path: path.join(output, 'passage-mobile.png'), fullPage: true });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), '375px layout');
  await page.setViewportSize({ width: 320, height: 812 });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), '320px layout');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload(); await page.waitForFunction(() => !!window.__motion());
  assert.equal(await page.getByRole('button', { name: 'Play', exact: true }).count(), 1, 'reduced motion starts paused');
  const reduced = await motion(); await wait(800); assert.deepEqual(await motion(), reduced);
  console.log('All vessel types, calm, harbour, mobile and reduced motion passed.');
  await page.goto(url + '?calculations'); await page.waitForFunction(() => !!window.__motion()); await wait(1500);
  assert.ok(await page.getByText('3D Ship Simulation', { exact: true }).count());
  assert.deepEqual(errors, [], 'no React, GLSL or WebGL errors');
  console.log(JSON.stringify({ passed: true, first, output }, null, 2));
} finally {
  await browser?.close(); await server.close(); await fs.rm(fixture, { recursive: true, force: true });
}
