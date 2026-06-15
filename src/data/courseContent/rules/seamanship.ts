import type { RuleGroup } from "@/data/courseContent/types";

/**
 * Gemicilik kuralları.
 *
 * İçerik src/pages/SeamanshipRules.tsx sayfasındaki gerçek, kaynak gösterilmiş
 * düzenlemelerden alınmıştır:
 *  - COLREG 1972 Kısım B (Manevra Kuralları)
 *  - ISM Code (Güvenli İşletim Yönetimi)
 *  - ISPS Code (Gemi ve Liman Güvenliği)
 *  - Liman ve terminal talimatları, VTS
 *
 * Uydurma kural yoktur; atıflar korunmuştur.
 */
export const seamanshipRules: RuleGroup[] = [
  {
    title: "COLREG Kısım B - Manevra Kuralları",
    source: {
      code: "COLREG 1972",
      detail: "Kısım B — Steering and Sailing Rules",
    },
    rules: [
      {
        subtitle: "Temel Manevra Kuralları",
        content: [
          "Kural 5: Her zaman uygun gözcülük yapılmalıdır.",
          "Kural 6: Güvenli hız ile seyredilmelidir.",
          "Kural 7: Çatışma riski doğru değerlendirilmelidir.",
          "Kural 8: Çatışmadan kaçınma eylemi zamanında ve belirgin olmalıdır.",
          "Kural 15-17: Yol hakkı ve manevra yükümlülükleri net uygulanmalıdır.",
        ],
      },
    ],
  },
  {
    title: "ISM Kodu",
    source: {
      code: "ISM Code",
      detail: "International Safety Management Code",
    },
    rules: [
      {
        subtitle: "Güvenli İşletim Yönetimi",
        content: [
          "Safety Management System (SMS) uygulanmalıdır.",
          "Operasyonel risk değerlendirmesi zorunludur.",
          "Tüm operasyonlar dokümante edilmelidir.",
          "Near-miss raporlama sistemi aktif olmalıdır.",
          "Düzenli iç denetimler yapılmalıdır.",
        ],
      },
    ],
  },
  {
    title: "ISPS Kodu",
    source: {
      code: "ISPS Code",
      detail: "International Ship and Port Facility Security Code",
    },
    rules: [
      {
        subtitle: "Gemi Güvenliği Gereklilikleri",
        content: [
          "Güvenlik seviyeleri (1, 2, 3) takip edilmelidir.",
          "Ship Security Plan (SSP) hazır olmalıdır.",
          "Güverte erişim kontrolleri uygulanmalıdır.",
          "Ziyaretçi ve yük kontrolleri yapılmalıdır.",
          "Declaration of Security (DOS) gerektiğinde düzenlenmelidir.",
        ],
      },
    ],
  },
  {
    title: "Liman ve Terminal Talimatları",
    source: {
      code: "Liman/VTS Yönetmelikleri",
      detail: "SOLAS V/11-12, IMO VTS Guidelines (Res. A.857(20))",
    },
    rules: [
      {
        subtitle: "Liman Operasyonları ve Raporlama",
        content: [
          "Port Information Book kontrol edilmelidir.",
          "Yerel pilotaj ve römorkaj gereklilikleri uygulanmalıdır.",
          "Terminal prosedürleri ve güvenlik kuralları takip edilmelidir.",
          "VTS raporlama gereklilikleri yerine getirilmelidir.",
          "Çevresel kısıtlamalar dikkate alınmalıdır.",
        ],
      },
    ],
  },
];
