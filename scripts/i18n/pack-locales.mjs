// Derleme çıktısındaki dil sözlüklerini (dist/locales/<dil>.json) paketler.
// -----------------------------------------------------------------------------
// Her dil dosyasının anahtarları aynı Türkçe kaynak metinlerdir; 24 dosyada
// aynen tekrarlandıkları için paketin yarısı anahtardan oluşuyordu. Burada:
//   locales/packed/keys.json   → { format, id, keys: [...] } (bir kez)
//   locales/packed/<dil>.json  → { format, keysId, base, meta, values: [...] }
// values[i] keys[i]'nin karşılığıdır:
//   string → çeviri
//   1      → anahtarın kendisi (kimlik girdisi)
//   0      → `base` dilindeki (en) değerle aynı
//   null   → bu dilde girdi yok
// Repodaki public/locales/*.json değişmez; i18n script'leri onları okur.
// Yazılan her paket diskten tekrar okunup açılır ve orijinal sözlükle birebir
// karşılaştırılır; tek fark derlemeyi durdurur. `removeLegacy` (native) ile
// doğrulanan dilin tam JSON'u çıktıdan kaldırılır — içerik pakette durur.
//
//   node scripts/i18n/pack-locales.mjs [locales-klasörü] [--remove-legacy]
//   (varsayılan klasör: dist/locales)

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const PACK_FORMAT = 1;
const BASE_LANGUAGE = 'en';
const META_PREFIX = '__';
const SAME_AS_KEY = 1;
const SAME_AS_BASE = 0;

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));

const splitEntries = (raw) => {
  const meta = {};
  const entries = new Map();
  for (const [key, value] of Object.entries(raw)) {
    if (key.startsWith(META_PREFIX)) meta[key] = value;
    else if (typeof value === 'string') entries.set(key, value);
  }
  return { meta, entries };
};

/** Paketlenmiş değer dizisini sözlüğe çevirir (çalışma anındaki açma ile aynı kural). */
export const unpackValues = (keys, values, baseValues) => {
  const dict = new Map();
  for (let i = 0; i < keys.length; i += 1) {
    const value = values[i];
    if (typeof value === 'string') dict.set(keys[i], value);
    else if (value === SAME_AS_KEY) dict.set(keys[i], keys[i]);
    else if (value === SAME_AS_BASE) {
      const base = baseValues?.get(keys[i]);
      if (typeof base !== 'string') throw new Error(`"${keys[i]}" base değerine bağlı ama base'de yok`);
      dict.set(keys[i], base);
    } else if (value !== null) throw new Error(`Geçersiz paket değeri: ${JSON.stringify(value)}`);
  }
  return dict;
};

const sameEntries = (a, b) => {
  if (a.size !== b.size) return false;
  for (const [key, value] of a) if (b.get(key) !== value) return false;
  return true;
};

export const packLocales = ({ localesDir, removeLegacy = false, log = console.log } = {}) => {
  const languages = fs.readdirSync(localesDir)
    .filter((name) => name.endsWith('.json'))
    .map((name) => name.slice(0, -'.json'.length))
    .sort();
  if (!languages.includes(BASE_LANGUAGE)) throw new Error(`${localesDir}: ${BASE_LANGUAGE}.json yok`);

  // 1) Anahtar birleşimi: önce en sırası, sonra diğer dillerdeki ek anahtarlar.
  const keySet = new Set();
  for (const lang of [BASE_LANGUAGE, ...languages.filter((l) => l !== BASE_LANGUAGE)]) {
    for (const key of splitEntries(readJson(path.join(localesDir, `${lang}.json`))).entries.keys()) keySet.add(key);
  }
  const keys = [...keySet];
  const keysJson = JSON.stringify(keys);
  const id = crypto.createHash('sha256').update(keysJson).digest('hex').slice(0, 16);

  const outDir = path.join(localesDir, 'packed');
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'keys.json'), JSON.stringify({ format: PACK_FORMAT, id, keys }));
  const writtenKeys = readJson(path.join(outDir, 'keys.json')).keys;

  const base = splitEntries(readJson(path.join(localesDir, `${BASE_LANGUAGE}.json`))).entries;
  let legacyBytes = 0;
  let packedBytes = Buffer.byteLength(keysJson);

  // 2) Her dil ayrı ayrı (bellek tepe noktası tek dil kadar kalsın).
  for (const lang of languages) {
    const legacyFile = path.join(localesDir, `${lang}.json`);
    legacyBytes += fs.statSync(legacyFile).size;
    const { meta, entries } = splitEntries(readJson(legacyFile));
    const useBase = lang !== BASE_LANGUAGE;
    const values = keys.map((key) => {
      const value = entries.get(key);
      if (value === undefined) return null;
      if (value === key) return SAME_AS_KEY;
      if (useBase && base.get(key) === value) return SAME_AS_BASE;
      return value;
    });
    const packFile = path.join(outDir, `${lang}.json`);
    const body = JSON.stringify({ format: PACK_FORMAT, keysId: id, base: useBase ? BASE_LANGUAGE : null, meta, values });
    fs.writeFileSync(packFile, body);
    packedBytes += Buffer.byteLength(body);

    // 3) Diskten geri oku, aç, orijinalle birebir karşılaştır.
    const written = readJson(packFile);
    if (written.keysId !== id || written.values.length !== writtenKeys.length) {
      throw new Error(`[pack-locales] ${lang}: anahtar listesi uyuşmuyor`);
    }
    const restored = unpackValues(writtenKeys, written.values, useBase ? base : null);
    if (!sameEntries(restored, entries) || JSON.stringify(written.meta) !== JSON.stringify(meta)) {
      throw new Error(`[pack-locales] ${lang}: açılan paket orijinal sözlükle aynı değil`);
    }
    if (removeLegacy) fs.rmSync(legacyFile);
  }

  const mb = (bytes) => `${(bytes / 1e6).toFixed(1)} MB`;
  log(`[pack-locales] ${languages.length} dil, ${keys.length} anahtar: ${mb(legacyBytes)} → ${mb(packedBytes)}` +
    ` (birebir doğrulandı${removeLegacy ? ', tam JSON çıktıdan kaldırıldı' : ''})`);
  return { languages, keys: keys.length, legacyBytes, packedBytes };
};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const dir = args.find((arg) => !arg.startsWith('--')) ?? 'dist/locales';
  packLocales({ localesDir: path.resolve(dir), removeLegacy: args.includes('--remove-legacy') });
}
