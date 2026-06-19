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
 *
 * Kayıt, `crewTasks/{roleSlug}/{taskIndex}.ts` dosyalarını Vite'ın
 * `import.meta.glob` mekanizmasıyla otomatik keşfeder. Her görev için yeni
 * bir dosya eklemek yeterlidir; manuel kayıt gerekmez. Dosyalar dynamic
 * import ile (lazy) yüklendiğinden ana bundle şişmez ve kod-split korunur.
 */
const longFormModules = import.meta.glob<{ default: CrewTaskLongForm }>(
  "./*/[0-9]*.ts",
);

export const crewTaskLongFormRegistry: Record<
  string,
  () => Promise<{ default: CrewTaskLongForm }>
> = Object.fromEntries(
  Object.entries(longFormModules).map(([path, loader]) => {
    // "./kaptan/0.ts" -> "kaptan/0"
    const key = path.replace(/^\.\//, "").replace(/\.ts$/, "");
    return [key, loader];
  }),
);

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
