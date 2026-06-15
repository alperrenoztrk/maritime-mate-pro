import type { RuleGroup } from "@/data/courseContent/types";

/**
 * Meteoroloji kuralları.
 *
 * İçerik src/pages/MeteorologyRules.tsx sayfasındaki gerçek, kaynak gösterilmiş
 * düzenlemelerden alınmıştır:
 *  - SOLAS V/34 (Voyage Planning)
 *  - IMO Weather Routing Guidelines
 *  - STCW VIII/2 (Watchkeeping)
 *  - WMO denizcilik servisleri
 *
 * Uydurma kural yoktur; atıflar korunmuştur.
 */
export const meteorologyRules: RuleGroup[] = [
  {
    title: "SOLAS V/34 - Voyage Planning",
    source: {
      code: "SOLAS V/34",
      detail: "Voyage Planning",
    },
    rules: [
      {
        subtitle: "Seyir Planında Meteoroloji",
        content: [
          "Seyir planı hazırlanırken güncel meteorolojik veri kullanılmalıdır.",
          "Hava tahminleri ve routing önerileri dikkate alınmalıdır.",
          "Şiddetli hava koşulları için alternatif rotalar planlanmalıdır.",
          "Meteorolojik veriler ve tahminler voyage plan dosyasında saklanmalıdır.",
        ],
      },
    ],
  },
  {
    title: "IMO Weather Routing Guidelines",
    source: {
      code: "IMO Weather Routing Guidelines",
    },
    rules: [
      {
        subtitle: "Hava Rotalaması",
        content: [
          "Şiddetli hava beklenen rotalarda kaçınma planı şarttır.",
          "Weather routing servisleri kullanılmalıdır.",
          "Rota seçiminde yük güvenliği ve yakıt ekonomisi dengelenmelidir.",
          "500 nm kuralı: Tropik siklon 500 nm içindeyse rota değişikliği değerlendirilmelidir.",
        ],
      },
    ],
  },
  {
    title: "STCW VIII/2 - Watchkeeping",
    source: {
      code: "STCW VIII/2",
      detail: "Watchkeeping",
    },
    rules: [
      {
        subtitle: "Vardiya ve Meteoroloji Takibi",
        content: [
          "Köprüüstü vardiya zabitleri meteorolojik veriyi sürekli değerlendirmelidir.",
          "Hava değişiklikleri vardiya defterine kaydedilmelidir.",
          "Kaptana hava koşulları hakkında düzenli bilgi verilmelidir.",
          "Görüş mesafesi azaldığında uygun önlemler alınmalıdır.",
        ],
      },
    ],
  },
  {
    title: "WMO Denizcilik Servisleri",
    source: {
      code: "WMO",
      detail: "World Meteorological Organization denizcilik servisleri",
    },
    rules: [
      {
        subtitle: "Meteorolojik Uyarı ve Bildirimler",
        content: [
          "NAVTEX uyarıları takip edilmelidir.",
          "Gale warnings ve storm warnings ciddiye alınmalıdır.",
          "Meteorolojik NAVAREA bildirileri kontrol edilmelidir.",
          "Synoptic haritalar ve analiz grafikleri yorumlanmalıdır.",
        ],
      },
    ],
  },
];
