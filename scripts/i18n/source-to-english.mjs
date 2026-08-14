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

const TR_CHARS = /[şğıçöüŞĞİÇÖÜ]/;
const TR_WORDS =
  /\b(ve|ile|için|bir|bu|olarak|gemi|hesap|hesapla|sayfa|değer|göre|yok|var|kaydet|geri|ayarlar|kapat|seç|ekle|sil|yeni|not|notlar|dil|tema|giriş|çıkış|arama|ara|başlık|liste|tümü|yükleniyor|hata|konu|ders|soru|cevap|birim|sonuç|tarih|saat|adı|bilgi|uyarı|başarılı|tekrar|devam|iptal|tamam|bulunamadı|seçiniz|giriniz|yapıldı|eklendi|silindi)\b/i;

export const isTurkish = (s) => TR_CHARS.test(s) || TR_WORDS.test(s);

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
const saveCache = () =>
  fs.writeFileSync(cachePath, JSON.stringify(Object.fromEntries(cache), null, 0));

const SEP = "\n@@@\n";

async function gtx(q) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=tr&tl=en&dt=t&q=${encodeURIComponent(q)}`;
  for (let attempt = 0; attempt < 6; attempt += 1) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data[0].map((p) => p[0] ?? "").join("");
    } catch (err) {
      if (attempt === 5) throw err;
      await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
    }
  }
  return "";
}

async function translateBatch(list) {
  const pending = list.filter((s) => !cache.has(s));
  for (let i = 0; i < pending.length; i += 10) {
    const chunk = pending.slice(i, i + 10);
    await new Promise((r) => setTimeout(r, 400));
    let joined = '';
    try { joined = await gtx(chunk.join(SEP)); } catch { console.log('\nrate limited, stopping translation early'); break; }
    const parts = joined.split(/\s*@@@\s*/);
    if (parts.length === chunk.length) {
      chunk.forEach((s, idx) => cache.set(s, parts[idx].trim()));
    } else {
      for (const s of chunk) cache.set(s, (await gtx(s)).trim());
    }
    saveCache();
    process.stdout.write(`\r  translated ${Math.min(i + 10, pending.length)}/${pending.length}`);
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
const JSX_TEXT_RE = /(>)([^<>{}]+)(<)/g;

const skip = (raw) => !raw.trim() || /^[@./#]/.test(raw) || !isTurkish(raw);

function scan(src) {
  const found = new Set();
  for (const m of src.matchAll(LITERAL_RE)) if (!skip(m[2])) found.add(m[2]);
  for (const m of src.matchAll(TEMPLATE_RE)) {
    for (const chunk of m[1].split(/\$\{[^}]*\}/)) if (!skip(chunk)) found.add(chunk.trim());
  }
  for (const m of src.matchAll(JSX_TEXT_RE)) if (!skip(m[2])) found.add(m[2].trim());
  return [...found];
}

function rewrite(file, src) {
  let out = src.replace(LITERAL_RE, (full, q, body) => {
    if (skip(body)) return full;
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
  out = out.replace(JSX_TEXT_RE, (full, open, text, close) => {
    const trimmed = text.trim();
    if (skip(trimmed)) return full;
    const t = translateOf(trimmed);
    return t ? `${open}${text.replace(trimmed, t)}${close}` : full;
  });
  if (out !== src) fs.writeFileSync(file, out);
  return out !== src;
}

function walk(target, acc = []) {
  const stat = fs.statSync(target);
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(target)) walk(path.join(target, entry), acc);
  } else if (/\.(ts|tsx)$/.test(target) && !/\.test\.tsx?$/.test(target)) {
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
