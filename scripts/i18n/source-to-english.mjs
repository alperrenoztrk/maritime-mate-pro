#!/usr/bin/env node
/**
 * One-off migration helper: rewrites Turkish user-visible copy in the interface
 * layer (src/pages, src/components, hooks, lib, utils, services, contexts) into
 * English, so the app no longer ships Turkish source strings.
 *
 * Replacement is precise: only complete quoted string literals, complete static
 * chunks of template literals and complete JSX text nodes are swapped. Imports,
 * module paths, class names and everything under src/data are left alone.
 *
 * Usage: node scripts/i18n/source-to-english.mjs <file|dir> [...]
 */
import fs from "node:fs";
import path from "node:path";
import { repairEnglishMaritimeTerminology } from '../../src/utils/englishMaritimeTerminology.ts';
import { maskTechnicalTokens, unmaskTechnicalTokens } from '../../src/utils/technicalText.ts';
import {
  isAbbreviationOnly,
  maskProtectedTokens,
  renderAbbreviationOnly,
  unmaskProtectedTokens,
} from '../../src/utils/protectedTerms.ts';

const TR_CHARS = /[şğıçöüŞĞİÇÖÜ]/;
const TR_WORDS =
  /\b(ve|ile|için|bir|bu|olarak|gemi|hesap|hesapla|sayfa|değer|göre|yok|var|kaydet|geri|ayarlar|kapat|seç|ekle|sil|yeni|not|notlar|dil|tema|giriş|çıkış|arama|ara|başlık|liste|tümü|yükleniyor|hata|konu|ders|soru|cevap|birim|sonuç|tarih|saat|adı|bilgi|uyarı|başarılı|tekrar|devam|iptal|tamam|bulunamadı|seçiniz|giriniz|yapıldı|eklendi|silindi)\b/i;

// English function words. A string that uses them is English prose that merely
// happens to contain a token the Turkish word list also knows ("Var" for
// variation, "not", "form"), and must never be sent to the engine.
const EN_WORDS =
  /\b(the|and|of|is|are|to|for|with|this|that|from|your|you|shall|must|when|where|which|not|use|used|per|by|on|at|in|it)\b/i;

// A string qualifies as Turkish when it carries a Turkish-specific letter, or —
// for the ASCII-only remainder — when several Turkish words appear and no
// English function word does. One lone match is not enough: "Var", "form" and
// "not" are ordinary English too, and translating them corrupted working code.
export const isTurkish = (s) => {
  if (TR_CHARS.test(s)) return true;
  if (EN_WORDS.test(s)) return false;
  const matches = s.match(new RegExp(TR_WORDS.source, 'gi')) ?? [];
  const distinct = new Set(matches.map((m) => m.toLowerCase()));
  // A single Turkish word standing alone IS the whole string ("Kaydet") — that
  // is a label worth translating; a single match inside a longer string is not.
  return distinct.size >= 2 || (distinct.size === 1 && s.trim().split(/\s+/).length <= 2);
};

// Hand-checked English for the terms that show up everywhere; machine output for
// these is unreliable ("Çıkış" -> "exit"/"checked out").
const GLOSSARY = new Map(
  Object.entries({
    "Dil": "Language",
    "Dil Ayarları": "Language Settings",
    "Dil değiştirildi": "Language changed",
    "Çıkış": "Sign out",
    "Çıkış yap": "Sign out",
    "Çıkış Yap": "Sign Out",
    "Çıkış yapıldı": "Signed out",
    "Giriş": "Sign in",
    "Giriş yap": "Sign in",
    "Giriş Yap": "Sign In",
    "Kayıt ol": "Sign up",
    "Kayıt Ol": "Sign Up",
    "Ara": "Search",
    "Arama": "Search",
    "Kaydet": "Save",
    "Kaydedildi": "Saved",
    "Geri": "Back",
    "Ayarlar": "Settings",
    "Hesapla": "Calculate",
    "Hesaplama": "Calculation",
    "Hesaplamalar": "Calculations",
    "Not": "Note",
    "Notlar": "Notes",
    "Not eklendi": "Note added",
    "Not silindi": "Note deleted",
    "Kapat": "Close",
    "Ekle": "Add",
    "Sil": "Delete",
    "Yeni": "New",
    "Temizle": "Clear",
    "Yükleniyor": "Loading",
    "Yükleniyor...": "Loading…",
    "Hata": "Error",
    "Bir hata oluştu": "Something went wrong",
    "Tümü": "All",
    "Devam": "Continue",
    "Devam et": "Continue",
    "İptal": "Cancel",
    "Tamam": "OK",
    "Sonuç": "Result",
    "Sonuçlar": "Results",
    "Değer": "Value",
    "Birim": "Unit",
    "Konu": "Topic",
    "Konular": "Topics",
    "Ders": "Lesson",
    "Dersler": "Lessons",
    "Soru": "Question",
    "Cevap": "Answer",
    "Tarih": "Date",
    "Saat": "Time",
    "Başlık": "Title",
    "Açıklama": "Description",
    "Adım": "Step",
    "Formül": "Formula",
    "Örnek": "Example",
    "Kopyala": "Copy",
    "Kopyalandı": "Copied",
    "Paylaş": "Share",
    "Uyarı": "Warning",
    "Başarılı": "Success",
    "Tekrar dene": "Try again",
    "Yazı boyutu": "Text size",
    "Yazı Boyutu": "Text Size",
    "Görünüm": "Appearance",
    "Hesap": "Account",
    "Profil": "Profile",
    "Bulunamadı": "Not found",
    "Sonuç bulunamadı": "No results found",
    "Seçiniz": "Select",
    "Giriniz": "Enter",
    "Normal": "Normal",
    "Büyük": "Large",
  }),
);

const cachePath = path.resolve("scripts/i18n/.source-to-english-cache.json");
const cache = new Map(GLOSSARY);
if (fs.existsSync(cachePath)) {
  for (const [k, v] of Object.entries(JSON.parse(fs.readFileSync(cachePath, "utf8")))) {
    if (!GLOSSARY.has(k)) cache.set(k, v);
  }
}

// The shipped English pack is the reviewed translation of this very corpus
// (glossary overrides + contextual corrections already applied). Preferring it
// over a fresh machine round-trip keeps the rewritten source identical to what
// users have been reading, and makes most of a run offline.
const localePath = path.resolve("public/locales/en.json");
const seededKeys = new Set();
if (fs.existsSync(localePath)) {
  for (const [k, v] of Object.entries(JSON.parse(fs.readFileSync(localePath, "utf8")))) {
    if (k.startsWith("__") || typeof v !== "string" || !v.trim()) continue;
    if (GLOSSARY.has(k) || cache.has(k)) continue;
    cache.set(k, v);
    seededKeys.add(k);
  }
  console.log(`seeded ${seededKeys.size} entries from public/locales/en.json`);
}
const saveCache = () => {
  const own = [...cache].filter(([key]) => !seededKeys.has(key));
  fs.writeFileSync(cachePath, JSON.stringify(Object.fromEntries(own), null, 0));
};

const SEP = "\n@@@\n";
// Character budget for one request. The endpoint answers 400 for a query well
// beyond this, and a single source longer than the budget is sent on its own.
const MAX_REQUEST_CHARS = 1800;

// Resolves to the translated text, or to null when the endpoint has nothing to
// give for this input. A null is NOT a transport failure: a query the engine
// declines (symbols only, or a shape it cannot segment) used to raise, exhaust
// the retries and abort the whole run as "rate limited".
async function gtx(q) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=tr&tl=en&dt=t&q=${encodeURIComponent(q)}`;
  for (let attempt = 0; attempt < 6; attempt += 1) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data?.[0])) return null;
      return data[0].map((p) => p?.[0] ?? "").join("");
    } catch (err) {
      if (attempt === 5) throw err;
      await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
    }
  }
  return null;
}

// Two protection layers stand between a source string and the engine, the same
// pair the runtime translator and the locale generator use: maritime
// abbreviations ("DP" -> "XP", "KB" -> "NW") and math function names
// ("atan2" -> "tane2") are swapped for sentinels and restored afterwards, so a
// formula survives the round-trip verbatim.
const maskSource = (source) => {
  const term = maskProtectedTokens(source, "en");
  const math = maskTechnicalTokens(term?.masked ?? source);
  return { term, math, query: math?.masked ?? term?.masked ?? source };
};

const restore = (source, raw, { term, math }) => {
  if (raw === null) return null;
  let out = raw.trim();
  if (!out) return null;
  if (math) out = unmaskTechnicalTokens(out, math.slots);
  if (term) {
    const restored = unmaskProtectedTokens(out, term.slots);
    if (restored === null) return null;
    out = restored;
  }
  return out;
};

async function translateBatch(list) {
  const pending = [];
  for (const s of list) {
    if (cache.has(s)) continue;
    // "SOLAS V", "MF/HF", "DP 1" carry no translatable words — an engine
    // round-trip can only damage them.
    if (isAbbreviationOnly(s)) {
      cache.set(s, renderAbbreviationOnly(s, "en"));
      continue;
    }
    pending.push(s);
  }
  const translateOne = async (source, protect = true) => {
    const masks = protect ? maskSource(source) : { term: null, math: null, query: source };
    const value = restore(source, await gtx(masks.query), masks);
    if (value === null) {
      if (protect) await translateOne(source, false);
      return;
    }
    cache.set(source, value);
  };

  // Pack the queue into requests by CHARACTER budget, not by a fixed count: ten
  // lesson paragraphs joined together overflow what the endpoint accepts and it
  // answers 400, which used to abort the whole migration.
  const chunks = [];
  let current = [];
  let currentChars = 0;
  for (const source of pending) {
    const projected = currentChars + source.length + SEP.length;
    if (current.length > 0 && (projected > MAX_REQUEST_CHARS || current.length >= 10)) {
      chunks.push(current);
      current = [];
      currentChars = 0;
    }
    current.push(source);
    currentChars += source.length + SEP.length;
  }
  if (current.length > 0) chunks.push(current);

  let done = 0;
  for (const chunk of chunks) {
    done += chunk.length;
    await new Promise((r) => setTimeout(r, 400));
    const masks = chunk.map(maskSource);
    let joined = null;
    try { joined = await gtx(masks.map((m) => m.query).join(SEP)); } catch (err) {
      console.log('\nbatch rejected (%s) — falling back to one request per string', err?.message ?? err);
      for (const source of chunk) {
        try { await translateOne(source); } catch { /* leave this one in the source language */ }
      }
      saveCache();
      continue;
    }
    if (joined === null) {
      for (const s of chunk) await translateOne(s);
      saveCache();
      continue;
    }
    const parts = joined.split(/\s*@@@\s*/);
    if (parts.length === chunk.length) {
      for (let idx = 0; idx < chunk.length; idx += 1) {
        const value = restore(chunk[idx], parts[idx], masks[idx]);
        // A sentinel that did not survive means the abbreviation is gone; retry
        // that one string unprotected rather than baking "xq0qx" into the source.
        if (value === null) await translateOne(chunk[idx], false);
        else cache.set(chunk[idx], value);
      }
    } else {
      for (const s of chunk) await translateOne(s);
    }
    saveCache();
    process.stdout.write(`\r  translated ${done}/${pending.length}`);
  }
  if (pending.length) process.stdout.write("\n");
}

const translateOf = (s) => {
  const t = cache.get(s);
  if (!t || t === s) return null;
  const repaired = repairEnglishMaritimeTerminology(s, t);
  if (s === s.toUpperCase() && /[A-ZŞĞİÇÖÜ]/.test(s)) return repaired.toUpperCase();
  return repaired;
};

// --- precise scanning -------------------------------------------------------
// 1) quoted literals: '...' "..." and static chunks of `...`
// 2) JSX text nodes: >text<
const LITERAL_RE = /(['"])((?:\\.|(?!\1)[^\\\n])*)\1/g;
const TEMPLATE_RE = /`((?:\\.|[^\\`])*)`/g;
// A JSX text run: everything between a tag or expression boundary and the next
// one. Anchoring on "}" and "{" as well as ">" and "<" is what lets copy that
// sits beside an interpolation be seen — "{n} alt konu · Açmak için dokunun"
// used to be invisible to this scan and stayed Turkish.
//
// The run may not contain any of = ; " ' `, and may not read as an expression.
// Those belong to code, and without the restriction the scan walks from an arrow
// function's ">" across several lines of TypeScript to the next block "{" and
// rewrites it as copy — which is how "a !== undefined && b !== undefined" once
// became "a !== undefined &amp;&amp; b !== undefined".
// An apostrophe is copy, not code: Turkish possessives ("Pupa'dan") and English
// contractions both carry one, and excluding it hid a whole class of labels
// from this scan. A code fragment that reaches here still carries "=", ";", a
// double quote or a backtick, or reads as an expression.
const JSX_TEXT_RE = /([>}])([^<>{}=;"`]+)(?=[<{])/g;
const EXPRESSION_RE = /&&|\|\||=>|\?\.|\bnew\b|\breturn\b/;
const hasLetter = (value) => /\p{L}/u.test(value);
const isJsxCopy = (value) => hasLetter(value) && !EXPRESSION_RE.test(value);

// Lowercase kebab/snake tokens are identifiers — anchor ids, slugs, storage
// keys, CSS classes — matched elsewhere in the code or in a URL. "konu-anlatimi"
// is an anchor target, not a heading.
const SLUG_RE = /^[a-z0-9]+(?:[-_][a-z0-9]+)+$/;

// Short upper-case tokens are codes, not copy: compass points, ISO country
// codes, unit symbols. The engine reads several of them as Turkish words — "NE"
// came back as "WHAT" — and the abbreviation renderer punctuates the rest
// ("SW" → "S.W."), so a wind-direction table stops matching its own data.
const SHORT_CODE_RE = /^[A-Z0-9][A-Z0-9/.-]{0,4}$/;

const skip = (raw) => {
  const text = raw.trim();
  if (!text || /^[@./#]/.test(text)) return true;
  if (SLUG_RE.test(text) || SHORT_CODE_RE.test(text)) return true;
  if (isTurkish(text)) return false;
  // The word list cannot know every ASCII-only Turkish word ("Dikkatli",
  // "Tehlikeli"). The shipped English pack was generated from this very corpus,
  // so a source string it holds a DIFFERENT string for is a source string that
  // needed translating — whatever the word list thinks of it.
  const packed = cache.get(text);
  return !(seededKeys.has(text) && packed !== undefined && packed !== text);
};

const escapeJsxText = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// A quoted literal is copy only when nothing around it turns it into an
// identifier: object keys, equality operands and index expressions are matched
// elsewhere in the code, so rewriting one side of the comparison silently
// breaks the branch. Everything else — including the last element of an array
// literal and the branches of a ternary — is copy.
const COMPARISON_BEFORE = /(?:===|!==|==|!=|\bcase|\.(?:includes|startsWith|endsWith|indexOf|has|get|set|delete|match|split|replace|replaceAll)\s*\()\s*$/;

const isIdentifierContext = (src, start, end) => {
  const before = src.slice(Math.max(0, start - 40), start);
  if (COMPARISON_BEFORE.test(before)) return true;

  const prev = before.replace(/\s+$/, '').slice(-1);
  const after = src.slice(end, end + 40);
  const next = after.replace(/^\s+/, '').slice(0, 1);

  // obj["key"] — an index expression, not a label in a list.
  if (prev === '[' && next === ']') return true;
  // { "key": value } — a property name. A ternary's ":" does not count, and it
  // is told apart by what precedes the literal.
  if (next === ':' && (prev === '{' || prev === ',' || prev === '')) return true;
  // ("key") === x
  if (/^\s*\)\s*(?:===|!==|==|!=)/.test(after)) return true;
  return false;
};

function scan(src) {
  const found = new Set();
  for (const m of src.matchAll(LITERAL_RE)) if (!skip(m[2])) found.add(m[2]);
  for (const m of src.matchAll(TEMPLATE_RE)) {
    for (const chunk of m[1].split(/\$\{[^}]*\}/)) if (!skip(chunk)) found.add(chunk.trim());
  }
  for (const m of src.matchAll(JSX_TEXT_RE)) {
    if (isJsxCopy(m[2]) && !skip(m[2])) found.add(m[2].trim());
  }
  
  return [...found];
}

function rewrite(file, src) {
  let out = src.replace(LITERAL_RE, (full, q, body, offset) => {
    if (skip(body)) return full;
    if (isIdentifierContext(src, offset, offset + full.length)) return full;
    const t = translateOf(body);
    return t && !t.includes(q) ? `${q}${t}${q}` : full;
  });
  out = out.replace(TEMPLATE_RE, (full, body) => {
    if (!isTurkish(body)) return full;
    const next = body.replace(/(^|\})([^`${]*)(?=\$\{|$)/g, (seg, pre, text) => {
      const trimmed = text.trim();
      if (skip(trimmed)) return seg;
      const t = translateOf(trimmed);
      return t ? `${pre}${text.replace(trimmed, t)}` : seg;
    });
    return `\`${next}\``;
  });
  out = out.replace(JSX_TEXT_RE, (full, open, text) => {
    const trimmed = text.trim();
    if (!isJsxCopy(text) || skip(trimmed)) return full;
    const t = translateOf(trimmed);
    // The source text arrives HTML-escaped ("&gt; 12°") and comes back from the
    // dictionary decoded. Written straight into JSX, a bare "<" or ">" is a
    // syntax error and a bare "&" changes what renders, so escape them again.
    const escaped = t && escapeJsxText(t);
    return escaped ? `${open}${text.replace(trimmed, escaped)}` : full;
  });
  if (out !== src) fs.writeFileSync(file, out);
  return out !== src;
}

// Modules whose Turkish text is DATA, not copy: translation dictionaries and
// glossaries are keyed by the Turkish source string, so rewriting them into
// English would silently unhook every lookup that depends on them.
const TURKISH_KEYED_MODULES = [
  'maritimeGlossary',
  'protectedTerms',
  'technicalText',
  'translationQuality',
  'pageTranslator',
  'staticTranslations',
  'englishMaritimeTerminology',
  'coreUiTranslations',
  'contextual-corrections',
  // Per-language news search feeds: the query strings are written in each
  // locale's own language on purpose.
  'locales',
  // Language and country tables. Their entries are names and ISO codes, and
  // several of them read as Turkish words to a translation engine: "Hindi" is
  // Turkish for the bird, "NE" is "what", so a pass over these tables produced
  // 'name: "Turkey"' for Hindi and country code "P.T." for Portugal.
  'LanguageContext',
  'languages',
  'maritimeNews',
];

const isTurkishKeyedModule = (file) =>
  TURKISH_KEYED_MODULES.some((name) => path.basename(file).startsWith(name));

function walk(target, acc = []) {
  const stat = fs.statSync(target);
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(target)) walk(path.join(target, entry), acc);
  } else if (
    /\.(ts|tsx)$/.test(target) &&
    !/\.test\.tsx?$/.test(target) &&
    !isTurkishKeyedModule(target)
  ) {
    acc.push(target);
  }
  return acc;
}

const targets = process.argv.slice(2).flatMap((t) => walk(t));
const jobs = targets
  .map((file) => ({ file, src: fs.readFileSync(file, "utf8") }))
  .map((j) => ({ ...j, strings: scan(j.src) }))
  .filter((j) => j.strings.length > 0);
const all = [...new Set(jobs.flatMap((j) => j.strings))];
console.log(`files=${jobs.length} strings=${all.length}`);
await translateBatch(all);
let changed = 0;
for (const job of jobs) if (rewrite(job.file, job.src)) changed += 1;
console.log(`rewritten=${changed}`);
