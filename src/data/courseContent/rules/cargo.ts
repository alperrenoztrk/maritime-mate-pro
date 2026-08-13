import type { RuleGroup } from "@/data/courseContent/types";

/**
 * Yük elleçleme ve istifleme kuralları.
 *
 * İçerik gerçek, kaynak gösterilmiş düzenlemelerden alınmıştır:
 *  - IMSBC Code (Uluslararası Denizyolu Katı Dökme Yük Kodu)
 *  - International Grain Code
 *  - IMDG Code (tehlikeli yükler)
 *  - CSS Code / Annex 13 (yük emniyeti, bağlama)
 *  - ISGOTT ve terminal prosedürleri
 *  - SOLAS gereklilikleri (VGM, CSM)
 *  - MARPOL Annex I/II/V (yük artıkları)
 *
 * Uydurma kural yoktur; atıflar korunmuştur.
 */
export const cargoRules: RuleGroup[] = [
  {
    title: "IMSBC Kodu — Katı Dökme Yükler",
    source: {
      code: "IMSBC Code",
      detail: "International Maritime Solid Bulk Cargoes Code (SOLAS VI/VII)",
    },
    rules: [
      {
        subtitle: "Taşıma Gereklilikleri ve Beyanlar",
        content: [
          "Transportable Moisture Limit (TML) ve Flow Moisture Point (FMP) kontrolleri zorunludur.",
          "Kargo sınıflandırması (A: sıvılaşabilir, B: kimyasal tehlike, C: ne A ne B) doğru yapılmalıdır.",
          "Shipper's Declaration ve sertifikalar (TML, nem içeriği) eksiksiz olmalıdır.",
          "Özel taşıma şartları ve tehlikeli özellikler (BCSN — Bulk Cargo Shipping Name) dikkate alınmalıdır.",
        ],
      },
      {
        subtitle: "Sıvılaşma (Liquefaction) Riski",
        content: [
          "Grup A yüklerde gerçek nem içeriği TML'in altında olmalıdır (aksi halde yükleme yapılmaz).",
          "Can test (kutu testi) gemide sıvılaşma eğilimini hızlı kontrol için kullanılabilir.",
          "Sıvılaşan yük serbest yüzey gibi davranarak ani kayma ve devrilmeye yol açar; yükleme reddedilmelidir.",
        ],
      },
    ],
  },
  {
    title: "International Grain Code — Grain Cargoes",
    source: {
      code: "International Grain Code",
      detail: "SOLAS Bölüm VI, Part C",
    },
    rules: [
      {
        subtitle: "Tahıl Stabilite Kriterleri",
        content: [
          "Düzeltilmiş GM (GMcorr) ≥ 0.30 m (serbest yüzey ve tahıl kayması dahil).",
          "Tahıl kaymasıyla oluşan denge açısı ≤ 12° (veya borda kesim hattı batma açısından küçük olanı).",
          "GZ eğrisi altındaki kalan (residual) alan ≥ 0.075 m·rad.",
        ],
      },
      {
        subtitle: "Yükleme, Trimleme ve Belgeler",
        content: [
          "Document of Authorization (DOA) ve onaylı Grain Loading Manual gemide bulundurulmalıdır.",
          "Doldurulmuş ve kısmen dolu ambarlarda trimleme ve heeling moment hesapları yapılmalıdır.",
          "Boşluk (void) ve kayma momentleri yönetmelik tablolarından alınır.",
        ],
      },
    ],
  },
  {
    title: "IMDG Kodu — Tehlikeli Yükler",
    source: {
      code: "IMDG Code",
      detail: "International Maritime Dangerous Goods Code (SOLAS VII / MARPOL Annex III)",
    },
    rules: [
      {
        subtitle: "Sınıflandırma ve Belgeleme",
        content: [
          "Tehlikeli yükler 9 sınıfa ayrılır (UN numarası, Proper Shipping Name ile tanımlanır).",
          "Dangerous Goods Declaration ve Container/Vehicle Packing Certificate eksiksiz olmalıdır.",
          "Marking, labelling ve plakartlama (placarding) gereklilikleri sağlanmalıdır.",
        ],
      },
      {
        subtitle: "İstif ve Ayrım (Segregation)",
        content: [
          "Stowage ve segregation tablolarına (away from / separated from) uyulmalıdır.",
          "Manifest/Dangerous Goods List ve istif planı gemide hazır olmalıdır.",
          "Yangın/dökülme acil müdahale için EmS (Emergency Schedules) ve MFAG bulundurulmalıdır.",
        ],
      },
    ],
  },
  {
    title: "Yük Emniyeti — CSS Code & CSM",
    source: {
      code: "CSS Code / Annex 13",
      detail: "Cargo Stowage and Securing; Cargo Securing Manual (SOLAS VI/5, VII/5)",
    },
    rules: [
      {
        subtitle: "Bağlama Hesabı Esasları",
        content: [
          "İvme katsayıları (boyuna, enine, düşey) gemi boyu ve servis hızına göre Annex 13 tablolarından seçilir.",
          "MSL (Maximum Securing Load) ve sürtünme katsayıları (çelik/çelik ≈ 0.10, çelik/ahşap ≈ 0.30) hesaba katılır.",
          "Onaylı Cargo Securing Manual'daki yöntem ve ekipman kullanılmalıdır.",
        ],
      },
      {
        subtitle: "VGM ve Konteyner Yükleri",
        content: [
          "VGM (Verified Gross Mass) konteyner yüklemelerinde zorunludur (SOLAS VI/2).",
          "İstif planı stack weight ve lashing limitlerini aşmamalıdır.",
          "Stability booklet limitleri ve görüş hattı (SOLAS V/22) korunmalıdır.",
        ],
      },
    ],
  },
  {
    title: "Tanker ve Terminal — ISGOTT",
    source: {
      code: "ISGOTT",
      detail: "International Safety Guide for Oil Tankers and Terminals",
    },
    rules: [
      {
        subtitle: "Arayüz ve Güvenlik Kontrolleri",
        content: [
          "Ship/Shore Safety Checklist yükleme/boşaltma öncesi tamamlanmalıdır.",
          "Gaz ölçümleri manifold açılmadan önce yapılmalıdır.",
          "Sıcak iş izinleri terminal koordinasyonuyla verilmelidir.",
          "Emergency Shutdown (ESD) prosedürleri hazır olmalıdır.",
        ],
      },
      {
        subtitle: "Statik Elektrik ve Inert Gaz",
        content: [
          "Inert gaz sistemi ile tank atmosferi O₂ ≤ %8 (hacim) tutulmalıdır.",
          "Statik birikim riski için yükleme başlangıcında düşük debi (initial loading rate) uygulanır.",
          "Bonding/earthing ve splash-filling önleme kuralları gözetilir.",
        ],
      },
    ],
  },
  {
    title: "Yük Artıkları — MARPOL",
    source: {
      code: "MARPOL Annex I / II / V",
      detail: "Yağ, zararlı sıvı madde ve katı atık deşarj kuralları",
    },
    rules: [
      {
        subtitle: "Deşarj ve Kayıt",
        content: [
          "Yağlı yük artıkları (Annex I) ve NLS artıkları (Annex II) deşarj kriterlerine uyulmalıdır.",
          "Cargo Record Book / Oil Record Book Part II kayıtları tutulmalıdır.",
          "Katı yük artıkları (Annex V) için Garbage Record Book ve uygun bertaraf gereklidir.",
        ],
      },
    ],
  },
];
