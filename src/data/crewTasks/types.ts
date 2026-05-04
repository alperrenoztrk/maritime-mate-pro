/**
 * Personel görevleri için "uzun-form" (kitap-bölümü) içerik tipi.
 *
 * Her bir personel görevi (örn. Kaptan → "Seyir emniyetinin nihai
 * sorumluluğu") için 20-30 sayfa uzunluğunda yapılandırılmış içerik
 * sunmak üzere tasarlanmıştır. İçerikler dynamic import ile yüklenir,
 * böylece ana bundle şişmez.
 */

export type CrewTaskCallout = {
  type: "warning" | "reference" | "tip" | "example" | "regulation";
  title?: string;
  text: string;
};

export type CrewTaskSection = {
  subheading: string;
  paragraphs: string[];
  /** Madde listesi (sayılı veya sayısız) */
  bullets?: string[];
  /** Kanun, yönetmelik veya pratik notlar için renkli kutucuklar */
  callouts?: CrewTaskCallout[];
  /** Tablolar (örn. parametre/aralık) */
  table?: {
    headers: string[];
    rows: string[][];
    caption?: string;
  };
};

export type CrewTaskChapter = {
  heading: string;
  /** Kısa giriş paragrafı (opsiyonel) */
  lead?: string;
  sections: CrewTaskSection[];
};

export type CrewTaskLongForm = {
  /** Görev başlığı (kısa) */
  title: string;
  /** Hangi role ait, hangi indekste */
  roleSlug: string;
  taskIndex: number;
  /** Üst seviye giriş — sayfanın hero'sunda kullanılır */
  intro: string;
  /** Tahmini sayfa sayısı (A4, 11pt eşdeğeri) */
  estimatedPages: number;
  /** İçerik bölümleri (chapter) */
  chapters: CrewTaskChapter[];
  /** Mevzuat, kitap, IMO sirküleri vb. atıflar */
  sources?: string[];
};

/**
 * Dinamik içerik kaydı.
 * Anahtar formatı: `${roleSlug}/${taskIndex}` (örn. "kaptan/0").
 * Her değer, ilgili `CrewTaskLongForm` modülünü döndüren bir loader.
 */
export const crewTaskLongFormRegistry: Record<
  string,
  () => Promise<{ default: CrewTaskLongForm }>
> = {
  "kaptan/0": () => import("./kaptan/0"),
  "birinci-zabit/0": () => import("./birinci-zabit/0"),
  "bas-muhendis/0": () => import("./bas-muhendis/0"),
  "reis-bosun/1": () => import("./reis-bosun/1"),
};

export function hasCrewTaskLongForm(
  roleSlug: string,
  taskIndex: number,
): boolean {
  return `${roleSlug}/${taskIndex}` in crewTaskLongFormRegistry;
}

export async function loadCrewTaskLongForm(
  roleSlug: string,
  taskIndex: number,
): Promise<CrewTaskLongForm | null> {
  const key = `${roleSlug}/${taskIndex}`;
  const loader = crewTaskLongFormRegistry[key];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}
