import type { RuleGroup } from "@/data/courseContent/types";

/**
 * Meteoroloji kuralları.
 *
 * İçerik gerçek, kaynak gösterilmiş düzenlemelerden alınmıştır:
 *  - SOLAS V/34 (Voyage Planning) ve V/5 (Meteorological services)
 *  - IMO Weather Routing Guidelines
 *  - STCW VIII/2 (Watchkeeping)
 *  - WMO No.471 / GMDSS MSI (NAVTEX, SafetyNET)
 *  - Beaufort ölçeği ve tropik siklon kaçınma uygulamaları
 *
 * Uydurma kural yoktur; atıflar korunmuştur.
 */
export const meteorologyRules: RuleGroup[] = [
  {
    title: "SOLAS V — Seyir Planı ve Meteoroloji Servisleri",
    source: {
      code: "SOLAS V/34 & V/5",
      detail: "Voyage Planning; Meteorological services and warnings",
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
      {
        subtitle: "Gözlem ve Rapor Yükümlülüğü",
        content: [
          "Tehlikeli hava (fırtına, buz, tropik siklon) ile karşılaşıldığında danger message yayımlanmalıdır (SOLAS V/31-32).",
          "Gönüllü Gözlem Gemisi (VOS) kapsamında meteorolojik gözlemler iletilmelidir.",
          "Barometre/barograf düzenli kalibre edilmeli, basınç eğilimi izlenmelidir.",
        ],
      },
    ],
  },
  {
    title: "IMO Weather Routing Guidelines",
    source: {
      code: "IMO Weather Routing Guidelines",
      detail: "MSC/Circ. — hava rotalaması rehberi",
    },
    rules: [
      {
        subtitle: "Hava Rotalaması",
        content: [
          "Şiddetli hava beklenen rotalarda kaçınma planı şarttır.",
          "Weather routing servisleri kullanılmalıdır.",
          "Rota seçiminde yük güvenliği ve yakıt ekonomisi dengelenmelidir.",
        ],
      },
      {
        subtitle: "Tropik Siklon Kaçınma",
        content: [
          "1-2-3 Kuralı: 24/48/72 saatlik tahmin hatası payı (100/200/300 nm) eklenerek tehlike dairesi çizilir.",
          "Tehlikeli yarı daire (dangerous semicircle) ve seyredilebilir yarı daire ayrımı yapılmalıdır.",
          "Buys-Ballot yasası ile alçak basınç merkezinin yönü belirlenmelidir (kuzey yarıkürede rüzgâr sırtına alındığında merkez solda).",
        ],
      },
    ],
  },
  {
    title: "STCW VIII/2 — Vardiya ve Hava Takibi",
    source: {
      code: "STCW VIII/2",
      detail: "Watchkeeping principles",
    },
    rules: [
      {
        subtitle: "Vardiya ve Meteoroloji Takibi",
        content: [
          "Köprüüstü vardiya zabitleri meteorolojik veriyi sürekli değerlendirmelidir.",
          "Hava değişiklikleri vardiya defterine kaydedilmelidir.",
          "Kaptana hava koşulları hakkında düzenli bilgi verilmelidir.",
          "Görüş mesafesi azaldığında uygun önlemler (hız, sis düdüğü, radar) alınmalıdır.",
        ],
      },
    ],
  },
  {
    title: "MSI — NAVTEX, SafetyNET ve Uyarılar",
    source: {
      code: "WMO No.471 / GMDSS MSI",
      detail: "Maritime Safety Information; WMO denizcilik servisleri",
    },
    rules: [
      {
        subtitle: "Meteorolojik Uyarı ve Bildirimler",
        content: [
          "NAVTEX (518 kHz) uyarıları takip edilmelidir.",
          "Gale (≥ Bf 8), storm ve hurricane force uyarıları ciddiye alınmalıdır.",
          "METAREA bültenleri ve Inmarsat SafetyNET yayınları kontrol edilmelidir.",
          "Synoptic haritalar ve analiz/tahmin grafikleri yorumlanmalıdır.",
        ],
      },
      {
        subtitle: "Beaufort Ölçeği ve Deniz Durumu",
        content: [
          "Rüzgâr şiddeti Beaufort 0–12 ölçeğiyle, deniz durumu Douglas ölçeğiyle raporlanır.",
          "Bf 8 (gale) ≈ 34–40 knot; Bf 10 (storm) ≈ 48–55 knot.",
          "Görüş kodları ve hava sembolleri standart WMO koduyla kaydedilir.",
        ],
      },
    ],
  },
];
