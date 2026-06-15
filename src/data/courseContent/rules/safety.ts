import type { RuleGroup } from "@/data/courseContent/types";

/**
 * Emniyet kuralları.
 *
 * İçerik src/pages/SafetyRules.tsx sayfasındaki gerçek, kaynak gösterilmiş
 * düzenlemelerden alınmıştır:
 *  - SOLAS Bölüm II-2 (Yangın Güvenliği)
 *  - LSA Code (Can Kurtarma Donanımları)
 *  - ISM Code (DOC, SMC, DPA)
 *  - ISPS Code (ISSC, SSP, SSO)
 *
 * Uydurma kural yoktur; atıflar korunmuştur.
 */
export const safetyRules: RuleGroup[] = [
  {
    title: "SOLAS Bölüm II-2 - Yangın Güvenliği",
    source: {
      code: "SOLAS Bölüm II-2",
      detail: "Fire Protection, Fire Detection and Fire Extinction",
    },
    rules: [
      {
        subtitle: "Yangın Algılama ve Söndürme",
        content: [
          "Yangın algılama ve alarm sistemleri zorunludur.",
          "Yangın söndürme sistemleri (FFA) eksiksiz olmalıdır.",
          "Yangın kapıları ve bölmeleri düzenli kontrol edilmelidir.",
          "Yangın planları görünür yerlerde asılı olmalıdır.",
          "Yangın söndürücüler düzenli bakımdan geçirilmelidir.",
        ],
      },
    ],
  },
  {
    title: "LSA Kodu - Can Kurtarma Donanımları",
    source: {
      code: "LSA Code",
      detail: "International Life-Saving Appliance Code",
    },
    rules: [
      {
        subtitle: "Can Kurtarma Ekipmanları",
        content: [
          "Can salları ve filikalar düzenli servis edilmelidir.",
          "Can yelekleri tüm personel için mevcut olmalıdır.",
          "EPIRB ve SART cihazları çalışır durumda olmalıdır.",
          "Acil durum pozisyon işaretleri (EPIRB) kayıtlı olmalıdır.",
          "Immersion suit ve thermal protective aid yeterli sayıda olmalıdır.",
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
        subtitle: "Belgelendirme ve Yönetim",
        content: [
          "DOC (Document of Compliance) şirket için geçerli olmalıdır.",
          "SMC (Safety Management Certificate) gemi için geçerli olmalıdır.",
          "DPA (Designated Person Ashore) atanmış olmalıdır.",
          "Acil durum prosedürleri dokümante edilmelidir.",
          "İç denetimler yıllık olarak yapılmalıdır.",
        ],
      },
    ],
  },
  {
    title: "ISPS Kodu - Güvenlik",
    source: {
      code: "ISPS Code",
      detail: "International Ship and Port Facility Security Code",
    },
    rules: [
      {
        subtitle: "Gemi Güvenlik Belgeleri ve Tatbikatlar",
        content: [
          "ISSC (International Ship Security Certificate) geçerli olmalıdır.",
          "SSP (Ship Security Plan) onaylı ve uygulanıyor olmalıdır.",
          "SSO (Ship Security Officer) atanmış olmalıdır.",
          "Güvenlik tatbikatları düzenli yapılmalıdır.",
          "Erişim kontrolleri ve ziyaretçi kayıtları tutulmalıdır.",
        ],
      },
    ],
  },
];
