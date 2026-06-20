/**
 * Gemi operasyonları için "uzun-form" (kitap-bölümü) içerik tipi.
 *
 * Her bir operasyon (örn. Tanker → Güverte → "Yük planı hazırlama ve revizyon")
 * için 20-30 sayfa uzunluğunda yapılandırılmış içerik sunmak üzere
 * tasarlanmıştır. Personeldeki `CrewTaskLongForm` deseninin operasyonlara
 * uyarlanmış birebir paralelidir. İçerikler dynamic import ile yüklenir,
 * böylece ana bundle şişmez.
 */

export type ShipOpCallout = {
  type: "warning" | "reference" | "tip" | "example" | "regulation";
  title?: string;
  text: string;
};

export type ShipOpSection = {
  subheading: string;
  paragraphs: string[];
  /** Madde listesi (sayılı veya sayısız) */
  bullets?: string[];
  /** Kanun, yönetmelik veya pratik notlar için renkli kutucuklar */
  callouts?: ShipOpCallout[];
  /** Tablolar (örn. parametre/aralık) */
  table?: {
    headers: string[];
    rows: string[][];
    caption?: string;
  };
};

export type ShipOpChapter = {
  heading: string;
  /** Kısa giriş paragrafı (opsiyonel) */
  lead?: string;
  sections: ShipOpSection[];
};

export type ShipOpLongForm = {
  /** Operasyon başlığı (kısa) */
  title: string;
  /** Hangi gemi tipi / departman / indekste */
  shipType: string;
  dept: string;
  opIndex: number;
  /** Üst seviye giriş — sayfanın hero'sunda kullanılır */
  intro: string;
  /** Tahmini sayfa sayısı (A4, 11pt eşdeğeri) */
  estimatedPages: number;
  /** İçerik bölümleri (chapter) */
  chapters: ShipOpChapter[];
  /** Mevzuat, kitap, IMO sirküleri vb. atıflar */
  sources?: string[];
};

/**
 * Dinamik içerik kaydı.
 * Anahtar formatı: `${shipType}/${dept}/${opIndex}` (örn. "tanker/guverte/0").
 *
 * Kayıt, `longform/{shipType}/{dept}/{opIndex}.ts` dosyalarını Vite'ın
 * `import.meta.glob` mekanizmasıyla otomatik keşfeder. Her operasyon için yeni
 * bir dosya eklemek yeterlidir; manuel kayıt gerekmez. Dosyalar dynamic
 * import ile (lazy) yüklendiğinden ana bundle şişmez ve kod-split korunur.
 */
const longFormModules = import.meta.glob<{ default: ShipOpLongForm }>(
  "./*/*/[0-9]*.ts",
);

export const shipOpLongFormRegistry: Record<
  string,
  () => Promise<{ default: ShipOpLongForm }>
> = Object.fromEntries(
  Object.entries(longFormModules).map(([path, loader]) => {
    // "./tanker/guverte/0.ts" -> "tanker/guverte/0"
    const key = path.replace(/^\.\//, "").replace(/\.ts$/, "");
    return [key, loader];
  }),
);

export function hasShipOpLongForm(
  shipType: string,
  dept: string,
  opIndex: number,
): boolean {
  return `${shipType}/${dept}/${opIndex}` in shipOpLongFormRegistry;
}

export async function loadShipOpLongForm(
  shipType: string,
  dept: string,
  opIndex: number,
): Promise<ShipOpLongForm | null> {
  const key = `${shipType}/${dept}/${opIndex}`;
  const loader = shipOpLongFormRegistry[key];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}
