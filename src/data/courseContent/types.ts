import type { LucideIcon } from "lucide-react";

/**
 * Tek kaynak (single source of truth) ders içeriği modeli.
 *
 * Her `CourseEntry` bir formülü temsil eder ve İSTEĞE BAĞLI olarak ona bağlı
 * bir hesaplayıcı taşır:
 *  - `calculate` YOKSA  → girdi yalnızca Formüller sayfasında görünür.
 *  - `calculate` VARSA  → aynı girdi hem Formüller hem Hesaplamalar sayfasında
 *    görünür. Böylece bir sayfadaki formülün öbür sayfadaki hesaplaması
 *    otomatik olarak BAĞLI olur (birbirinden bağımsız iki nesne değildir).
 *
 * Tutarlılık kuralı: `formula` metni ile `calculate()` daima aynı büyüklüğü
 * aynı birimde hesaplar. Birim dönüşümleri `note` alanında belirtilir.
 */

export interface FormulaVariable {
  symbol: string;
  label: string;
  unit?: string;
}

export interface CalcInput {
  key: string;
  label: string;
  unit?: string;
  placeholder?: string;
}

export interface CalcResult {
  label: string;
  value: string;
}

/**
 * Tek bir çözüm adımı. `steps()` üreteci girilen değerlerden sıralı ara
 * adımları döndürür; her adım deterministiktir (kodla hesaplanır, AI üretmez).
 *
 *  - `title`      → adım başlığı, örn. "1) Yerel Saat Açısı (LHA)".
 *  - `expression` → değerleri yerine konmuş ifade, örn. "LHA = GHA + λ = 158.5°".
 *  - `result`     → o adımın ara sonucu (vurgulanır).
 *  - `hint`       → kısa "neden" açıklaması (sabit, öğretici metin).
 */
export interface CalcStep {
  title: string;
  expression?: string;
  result?: string;
  hint?: string;
}

/** Gerçek standart/kaynak referansı (uydurma kural/formül engellemek için). */
export interface SourceRef {
  code: string;
  detail?: string;
  url?: string;
}

export interface CourseEntry {
  /** Kararlı slug, örn. "carnot-efficiency". */
  id: string;
  name: string;
  /** Formül grubu başlığı, örn. "Termodinamik Yasaları". */
  group: string;
  /** Gösterim ifadesi, örn. "η = 1 − (T_L / T_H)". */
  formula: string;
  variables: FormulaVariable[];
  source?: SourceRef;
  note?: string;
  /** Bağlı hesaplayıcı girdileri (calculate ile birlikte verilir). */
  inputs?: CalcInput[];
  calculate?: (vals: Record<string, number>) => CalcResult[];
  /**
   * İSTEĞE BAĞLI adım adım çözüm üreteci. `calculate` ile aynı girdilerden
   * çalışır ve daima aynı büyüklüğü aynı birimde üretir (son adımın sonucu
   * `calculate` sonucuyla birebir aynıdır). Tanımlıysa hesaplayıcı kartında
   * "Çözümü Adım Adım Göster" seçeneği belirir.
   */
  steps?: (vals: Record<string, number>) => CalcStep[];
}

/** Bir kural grubunun alt başlığı + madde listesi. */
export interface RuleSection {
  subtitle: string;
  content: string[];
}

/** Kural kategorisi (mevcut makine RuleCategory şekliyle uyumlu). */
export interface RuleGroup {
  title: string;
  source?: SourceRef;
  rules: RuleSection[];
}

export interface CourseTopic {
  /** Birleşik registry anahtarı: makine = slug, güverte = kategori id. */
  key: string;
  title: string;
  icon: LucideIcon;
  /** Tailwind gradient sınıfı (mevcut config ile aynı). */
  accent: string;
  group: "deck" | "machine";
  intro?: string;
  entries: CourseEntry[];
  /** İsteğe bağlı: gelişmiş/eski araç sayfasına yönlendirme. */
  advancedTool?: { label: string; href: string };
}
