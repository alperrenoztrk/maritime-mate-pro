import type { RuleGroup } from "@/data/courseContent/types";

/**
 * Gemicilik kuralları.
 *
 * İçerik gerçek, kaynak gösterilmiş düzenlemelerden alınmıştır:
 *  - COLREG 1972 Kısım B (Manevra Kuralları) ve Kısım C/D (Fenerler, İşaretler)
 *  - Demirleme ve bağlama (good seamanship, OCIMF MEG4)
 *  - ISM Code (Güvenli İşletim Yönetimi)
 *  - ISPS Code (Gemi ve Liman Güvenliği)
 *  - Liman ve terminal talimatları, VTS
 *
 * Uydurma kural yoktur; atıflar korunmuştur.
 */
export const seamanshipRules: RuleGroup[] = [
  {
    title: "COLREG Kısım B — Manevra Kuralları",
    source: {
      code: "COLREG 1972",
      detail: "Kısım B — Steering and Sailing Rules",
    },
    rules: [
      {
        subtitle: "Her Türlü Görüş Koşulunda (Kural 4-10)",
        content: [
          "Kural 5: Her zaman uygun gözcülük yapılmalıdır.",
          "Kural 6: Güvenli hız ile seyredilmelidir.",
          "Kural 7: Çatışma riski doğru değerlendirilmelidir (şüphe varsa risk var sayılır).",
          "Kural 8: Çatışmadan kaçınma eylemi zamanında, belirgin ve yeterli olmalıdır.",
          "Kural 9-10: Dar kanallar ve trafik ayrım düzenleri (TSS) kurallarına uyulmalıdır.",
        ],
      },
      {
        subtitle: "Birbirini Gören Tekneler (Kural 11-18)",
        content: [
          "Kural 13: Yetişen tekne (overtaking) yol verir.",
          "Kural 14: Pruva pruvaya (head-on) durumda her iki tekne sancağa alır.",
          "Kural 15: Aykırı geçişte (crossing) sancağında tekne olan yol verir (give-way).",
          "Kural 16-17: Give-way ve stand-on tekne yükümlülükleri net uygulanmalıdır.",
        ],
      },
    ],
  },
  {
    title: "COLREG Kısım C/D — Fenerler, Şekiller, Sesli İşaretler",
    source: {
      code: "COLREG 1972",
      detail: "Kısım C (Lights & Shapes), Kısım D (Sound & Light Signals)",
    },
    rules: [
      {
        subtitle: "Fenerler ve İşaretler",
        content: [
          "Seyir fenerleri görünürlük menzilleri ve sektörleri (Kural 21-22) sağlanmalıdır.",
          "Manevra kısıtlı/kumandadan aciz tekne işaretleri (Kural 27) doğru gösterilmelidir.",
          "Gündüz şekilleri (ball, cone, cylinder, diamond) uygun kullanılmalıdır.",
        ],
      },
      {
        subtitle: "Sesli ve Işıklı İşaretler",
        content: [
          "Manevra/uyarı işaretleri (Kural 34): bir kısa = sancak, iki kısa = iskele, beş kısa = şüphe/uyarı.",
          "Kısıtlı görüşte ses işaretleri (Kural 35) düzenli verilmelidir.",
        ],
      },
    ],
  },
  {
    title: "Demirleme ve Bağlama — İyi Gemicilik",
    source: {
      code: "OCIMF MEG4 / Good Seamanship",
      detail: "Mooring Equipment Guidelines; demir/bağlama uygulamaları",
    },
    rules: [
      {
        subtitle: "Demirleme",
        content: [
          "Demir kaloması genelde su derinliğinin 5–7 katı kadar verilir (hava/akıntıya göre artırılır).",
          "Demir tarama (dragging) izlenmeli; alarm verildiğinde önlem alınmalıdır.",
          "Swing dairesi ve trafiğe göre uygun demir sahası seçilmelidir.",
        ],
      },
      {
        subtitle: "Bağlama (Mooring)",
        content: [
          "MBL/SWL ve line management plan (MEG4) doğrultusunda halat seçimi yapılmalıdır.",
          "Snap-back zone'lar işaretlenmeli, personel bu bölgelerden uzak tutulmalıdır.",
          "Mixed mooring (farklı elastiklikte halat birlikte) önlenmelidir.",
        ],
      },
    ],
  },
  {
    title: "ISM Kodu — Güvenli İşletim",
    source: {
      code: "ISM Code",
      detail: "International Safety Management Code",
    },
    rules: [
      {
        subtitle: "Güvenli İşletim Yönetimi",
        content: [
          "Safety Management System (SMS) ve operasyonel prosedürler uygulanmalıdır.",
          "Operasyon öncesi risk değerlendirmesi ve permit-to-work zorunludur.",
          "Near-miss raporlama ve iç denetimler düzenli yapılmalıdır.",
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
          "Ship Security Plan (SSP) ve güverte erişim kontrolleri uygulanmalıdır.",
          "Declaration of Security (DOS) gerektiğinde düzenlenmelidir.",
        ],
      },
    ],
  },
  {
    title: "Liman, VTS ve Pilotaj",
    source: {
      code: "SOLAS V/11-12; IMO VTS Guidelines",
      detail: "Res. A.857(20); liman/terminal yönetmelikleri",
    },
    rules: [
      {
        subtitle: "Liman Operasyonları ve Raporlama",
        content: [
          "Port Information Book ve yerel kurallar kontrol edilmelidir.",
          "Pilotaj ve römorkaj gereklilikleri uygulanmalı; pilot/master exchange yapılmalıdır.",
          "VTS raporlama gereklilikleri (giriş/çıkış, pozisyon) yerine getirilmelidir.",
          "Çevresel kısıtlamalar (deşarj, balast) dikkate alınmalıdır.",
        ],
      },
    ],
  },
];
