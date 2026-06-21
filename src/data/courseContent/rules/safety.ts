import type { RuleGroup } from "@/data/courseContent/types";

/**
 * Emniyet kuralları.
 *
 * İçerik gerçek, kaynak gösterilmiş düzenlemelerden alınmıştır:
 *  - SOLAS Bölüm II-2 (Yangın Güvenliği) ve III (Can Kurtarma)
 *  - LSA Code (Can Kurtarma Donanımları)
 *  - FSS Code (Yangın Güvenlik Sistemleri)
 *  - ISM Code (DOC, SMC, DPA)
 *  - ISPS Code (ISSC, SSP, SSO)
 *  - MLC 2006 (çalışma/sağlık-güvenlik)
 *
 * Uydurma kural yoktur; atıflar korunmuştur.
 */
export const safetyRules: RuleGroup[] = [
  {
    title: "SOLAS Bölüm II-2 — Yangın Güvenliği",
    source: {
      code: "SOLAS Bölüm II-2 / FSS Code",
      detail: "Fire Protection, Fire Detection and Fire Extinction",
    },
    rules: [
      {
        subtitle: "Yangın Algılama ve Söndürme",
        content: [
          "Yangın algılama ve alarm sistemleri zorunludur.",
          "Sabit yangın söndürme sistemleri (FFA) eksiksiz ve sertifikalı olmalıdır.",
          "Yangın kapıları ve A/B sınıfı bölmeleri düzenli kontrol edilmelidir.",
          "Fire Control Plan görünür yerlerde ve gemi dışında bir kutuda bulunmalıdır.",
        ],
      },
      {
        subtitle: "Yapısal Yangın Koruması",
        content: [
          "A-60 / A-0 bölme sınıfları yangın bütünlük tablolarına göre uygulanır.",
          "Kaçış yolları (means of escape) işaretli ve engelsiz tutulmalıdır.",
          "Makine dairesi için quick-closing valve ve uzaktan ventilatör kapatma sağlanmalıdır.",
        ],
      },
    ],
  },
  {
    title: "SOLAS III & LSA — Can Kurtarma",
    source: {
      code: "SOLAS III / LSA Code",
      detail: "International Life-Saving Appliance Code",
    },
    rules: [
      {
        subtitle: "Can Kurtarma Ekipmanları",
        content: [
          "Can salları ve filikalar yıllık servis ve davit/launching test gereklilikleriyle bakımlı olmalıdır.",
          "Can yelekleri ve immersion suit tüm personel + yedek için yeterli sayıda olmalıdır.",
          "EPIRB ve SART cihazları kayıtlı ve çalışır durumda olmalıdır.",
          "Pyrotechnics ve line-throwing apparatus son kullanma tarihleri izlenmelidir.",
        ],
      },
      {
        subtitle: "Muster ve Tatbikatlar",
        content: [
          "Abandon ship ve fire drill ayda en az bir kez yapılmalıdır (yolcu gemilerinde daha sık).",
          "Muster list ve emergency instructions kamaralarda/asılı olmalıdır.",
          "Filika indirme (lowering) tatbikatı 3 ayda bir gerçekleştirilmelidir.",
        ],
      },
    ],
  },
  {
    title: "ISM Kodu — Emniyetli İşletim",
    source: {
      code: "ISM Code",
      detail: "International Safety Management Code (SOLAS IX)",
    },
    rules: [
      {
        subtitle: "Belgelendirme ve Yönetim",
        content: [
          "DOC (Document of Compliance) şirket için, SMC (Safety Management Certificate) gemi için geçerli olmalıdır.",
          "DPA (Designated Person Ashore) atanmış olmalıdır.",
          "Acil durum prosedürleri dokümante edilmeli, iç denetimler yıllık yapılmalıdır.",
        ],
      },
      {
        subtitle: "Risk ve Raporlama",
        content: [
          "Risk değerlendirmesi ve permit-to-work sistemi uygulanmalıdır.",
          "Kaza, uygunsuzluk (non-conformity) ve near-miss raporlanmalı, kök neden analizi yapılmalıdır.",
        ],
      },
    ],
  },
  {
    title: "ISPS Kodu — Güvenlik",
    source: {
      code: "ISPS Code",
      detail: "International Ship and Port Facility Security Code (SOLAS XI-2)",
    },
    rules: [
      {
        subtitle: "Gemi Güvenlik Belgeleri ve Tatbikatlar",
        content: [
          "ISSC (International Ship Security Certificate) geçerli olmalıdır.",
          "SSP (Ship Security Plan) onaylı ve uygulanıyor olmalı; SSO atanmalıdır.",
          "Güvenlik seviyeleri (1/2/3) takip edilmeli, erişim kontrolü ve ziyaretçi kayıtları tutulmalıdır.",
          "Güvenlik tatbikatları (drill) ve egzersizleri düzenli yapılmalıdır.",
        ],
      },
    ],
  },
  {
    title: "MLC 2006 — İş Sağlığı ve Güvenliği",
    source: {
      code: "MLC 2006",
      detail: "Maritime Labour Convention, Title 4 (sağlık, güvenlik, kaza önleme)",
    },
    rules: [
      {
        subtitle: "Çalışma Ortamı ve Koruma",
        content: [
          "Kişisel koruyucu donanım (KKD) sağlanmalı ve kullanımı denetlenmelidir.",
          "Çalışma ve dinlenme saatleri (saatlik limitler) kayıt altında tutulmalıdır.",
          "Onboard safety committee ve düzenli güvenlik toplantıları yapılmalıdır.",
        ],
      },
    ],
  },
];
