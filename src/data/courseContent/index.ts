import type { CourseEntry, CourseTopic } from "./types";
import { thermodynamics } from "./thermodynamics";
import { stability } from "./stability";

export type { CourseEntry, CourseTopic } from "./types";

/**
 * Birleşik ders içeriği registry'si (tek kaynak).
 * Anahtar eşlemesi: makine konuları = slug (örn. "thermodynamics"),
 * güverte konuları = kategori id (örn. "stability"). Çakışma yoktur.
 *
 * Yeni konular bu turdan sonra aynı kalıpla buraya eklenir.
 */
export const courseTopics: Record<string, CourseTopic> = {
  thermodynamics,
  stability,
};

/** Verilen anahtara karşılık gelen konuyu döndürür (yoksa null). */
export function getCourseTopic(key?: string): CourseTopic | null {
  return key ? courseTopics[key] ?? null : null;
}

/** Konunun tüm formül girdileri (Formüller sayfası için). */
export function getFormulaEntries(topic: CourseTopic): CourseEntry[] {
  return topic.entries;
}

/** Yalnız hesaplayıcısı olan girdiler (Hesaplamalar sayfası için). */
export function getCalculatorEntries(topic: CourseTopic): CourseEntry[] {
  return topic.entries.filter((e) => typeof e.calculate === "function");
}

/** Bir konunun registry'de tanımlı (migrate edilmiş) olup olmadığı. */
export function hasCourseTopic(key?: string): boolean {
  return !!key && key in courseTopics;
}
