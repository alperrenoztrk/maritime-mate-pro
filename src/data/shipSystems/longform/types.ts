/**
 * Gemi sistemleri için "uzun-form" (kitap-bölümü) içerik tipi.
 *
 * Her bir gemi sistemi konusu (örn. Güverte Makineleri → "Demir Irgadı
 * (Windlass)") için 20-30 sayfa uzunluğunda yapılandırılmış içerik sunmak
 * üzere tasarlanmıştır. Personeldeki `CrewTaskLongForm` ve operasyonlardaki
 * `ShipOpLongForm` desenlerinin gemi sistemlerine uyarlanmış birebir
 * paralelidir. İçerikler dynamic import ile yüklenir, böylece ana bundle
 * şişmez.
 */

export type ShipSystemCallout = {
  type: "warning" | "reference" | "tip" | "example" | "regulation";
  title?: string;
  text: string;
};

export type ShipSystemSection = {
  subheading: string;
  paragraphs: string[];
  /** Madde listesi (sayılı veya sayısız) */
  bullets?: string[];
  /** Kanun, yönetmelik veya pratik notlar için renkli kutucuklar */
  callouts?: ShipSystemCallout[];
  /** Tablolar (örn. parametre/aralık) */
  table?: {
    headers: string[];
    rows: string[][];
    caption?: string;
  };
};

export type ShipSystemChapter = {
  heading: string;
  /** Kısa giriş paragrafı (opsiyonel) */
  lead?: string;
  sections: ShipSystemSection[];
};

export type ShipSystemLongForm = {
  /** Konu başlığı (kısa) */
  title: string;
  /** Hangi kategori (sectionId) / hangi indekste */
  sectionId: string;
  topicIndex: number;
  /** Üst seviye giriş — sayfanın hero'sunda kullanılır */
  intro: string;
  /** Tahmini sayfa sayısı (A4, 11pt eşdeğeri) */
  estimatedPages: number;
  /** İçerik bölümleri (chapter) */
  chapters: ShipSystemChapter[];
  /** Mevzuat, kitap, IMO sirküleri vb. atıflar */
  sources?: string[];
};

/**
 * Dinamik içerik kaydı.
 * Anahtar formatı: `${sectionId}/${topicIndex}` (örn. "deck-machinery/0").
 *
 * Kayıt, `longform/{sectionId}/{topicIndex}.ts` dosyalarını Vite'ın
 * `import.meta.glob` mekanizmasıyla otomatik keşfeder. Her konu için yeni
 * bir dosya eklemek yeterlidir; manuel kayıt gerekmez. Dosyalar dynamic
 * import ile (lazy) yüklendiğinden ana bundle şişmez ve kod-split korunur.
 */
const longFormModules = import.meta.glob<{ default: ShipSystemLongForm }>(
  "./*/[0-9]*.ts",
);

export const shipSystemLongFormRegistry: Record<
  string,
  () => Promise<{ default: ShipSystemLongForm }>
> = Object.fromEntries(
  Object.entries(longFormModules).map(([path, loader]) => {
    // "./deck-machinery/0.ts" -> "deck-machinery/0"
    const key = path.replace(/^\.\//, "").replace(/\.ts$/, "");
    return [key, loader];
  }),
);

export function hasShipSystemLongForm(
  sectionId: string,
  topicIndex: number,
): boolean {
  return `${sectionId}/${topicIndex}` in shipSystemLongFormRegistry;
}

export async function loadShipSystemLongForm(
  sectionId: string,
  topicIndex: number,
): Promise<ShipSystemLongForm | null> {
  const key = `${sectionId}/${topicIndex}`;
  const loader = shipSystemLongFormRegistry[key];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}
