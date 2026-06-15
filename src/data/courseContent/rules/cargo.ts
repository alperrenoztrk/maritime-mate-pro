import type { RuleGroup } from "@/data/courseContent/types";

/**
 * Yük elleçleme ve istifleme kuralları.
 *
 * İçerik src/pages/CargoRules.tsx sayfasındaki gerçek, kaynak gösterilmiş
 * düzenlemelerden alınmıştır:
 *  - IMSBC Code (Uluslararası Denizyolu Katı Dökme Yük Kodu)
 *  - International Grain Code
 *  - ISGOTT ve terminal prosedürleri
 *  - SOLAS gereklilikleri (VGM, CSM)
 *
 * Uydurma kural yoktur; atıflar korunmuştur.
 */
export const cargoRules: RuleGroup[] = [
  {
    title: "IMSBC Kodu",
    source: {
      code: "IMSBC Code",
      detail: "International Maritime Solid Bulk Cargoes Code",
    },
    rules: [
      {
        subtitle: "Katı Dökme Yük Taşıma Gereklilikleri",
        content: [
          "Transportable Moisture Limit (TML) ve Flow Moisture Point (FMP) kontrolleri zorunludur.",
          "Kargo sınıflandırması (A, B, C grupları) doğru yapılmalıdır.",
          "Özel taşıma şartları ve tehlikeli özellikler dikkate alınmalıdır.",
          "Shipper's Declaration ve sertifikalar eksiksiz olmalıdır.",
        ],
      },
    ],
  },
  {
    title: "International Grain Code",
    source: {
      code: "International Grain Code",
      detail: "SOLAS Bölüm VI, Part C",
    },
    rules: [
      {
        subtitle: "Tahıl Stabilite Kriterleri",
        content: [
          "Grain Stability: GM ≥ 0.30 m (düzeltilmiş)",
          "Heeling angle ≤ 12° (statik)",
          "GZ eğrisi altındaki alan ≥ 0.075 m·rad",
          "Serbest yüzey düzeltmeleri uygulanmalıdır.",
        ],
      },
    ],
  },
  {
    title: "ISGOTT & Terminal Prosedürleri",
    source: {
      code: "ISGOTT",
      detail: "International Safety Guide for Oil Tankers and Terminals",
    },
    rules: [
      {
        subtitle: "Tanker ve Terminal Güvenliği",
        content: [
          "Gaz ölçümleri manifold açılmadan önce yapılmalıdır.",
          "Sıcak iş izinleri terminal koordinasyonuyla verilmelidir.",
          "Manifold bağlantıları ve güvenlik ekipmanları kontrol edilmelidir.",
          "Emergency shutdown prosedürleri hazır olmalıdır.",
        ],
      },
    ],
  },
  {
    title: "SOLAS Gereklilikleri",
    source: {
      code: "SOLAS",
      detail: "Bölüm VI ve VII; VGM, Cargo Securing Manual",
    },
    rules: [
      {
        subtitle: "Yük Güvenliği ve Beyanlar",
        content: [
          "VGM (Verified Gross Mass) konteyner yüklemelerinde zorunludur.",
          "Cargo Securing Manual gereklilikleri karşılanmalıdır.",
          "Stability booklet limitleri aşılmamalıdır.",
          "Dangerous goods deklarasyonları eksiksiz olmalıdır.",
        ],
      },
    ],
  },
];
