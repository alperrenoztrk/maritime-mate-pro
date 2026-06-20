import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "ECDIS passage plan girişi ve back-up ECDIS doğrulaması",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 0,
  estimatedPages: 20,
  intro: `ECDIS, modern konteyner gemisinde birincil seyir aracıdır; passage plan'ın onaylı ENC'ler üzerinde dijital hazırlanması ve yedek (back-up) ECDIS'in birincil ile aynı veri ve emniyet parametrelerine sahip olması seyir güvenliğinin temelidir. Bu bölüm route girişi, check route ve back-up senkronizasyonunu ele alır.`,
  sources: [
    "SOLAS V/19.2.10 (ECDIS taşıma)",
    "SOLAS V/27 (charts up to date)",
    "IMO Res. A.893(21) (Voyage Planning)",
    "IHO S-52 / S-63 (ECDIS display & data protection)",
  ],
  chapters: [
    {
      heading: "1. ENC Güncelliği ve Emniyet Parametreleri",
      sections: [
        {
          subheading: "1.1 ENC update ve safety ayarları",
          paragraphs: [
            `ENC kataloğu S-63 lisansına göre güncellenir (AIO, T&P dahil). Safety contour, safety depth ve shallow contour gemi draftı + UKC payına göre ayarlanır; bu değerler ECDIS'in tehlike vurgulamasını doğrudan belirler.`,
          ],
          bullets: [
            `ENC update (AIO, T&P)`,
            `Safety contour/depth, shallow contour drafta göre`,
            `XTD limitleri`,
          ],
        },
      ],
    },
    {
      heading: "2. Route Girişi ve Check Route",
      sections: [
        {
          subheading: "2.1 Waypoint ve uyarı değerlendirme",
          paragraphs: [
            `Route planner ile waypoint'ler girilir; check route fonksiyonu no-go area, sığlık, yasak bölge uyarılarını üretir. Her uyarı tek tek değerlendirilir; otomatik üretilen rota manuel kontrol edilmeden onaylanmaz.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Auto-route güveni",
              text: `Check route uyarıları gözden geçirilmeden rota onaylanmaz; otomatik rota sığlıktan/engelden geçebilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Back-up ECDIS",
      sections: [
        {
          subheading: "3.1 Senkronizasyon",
          paragraphs: [
            `Back-up ECDIS'e ENC ve route senkronize edilir; aynı emniyet parametreleriyle check route tekrar koşulur. GPS, gyro ve log girişlerinin her iki ünitede doğru göründüğü doğrulanır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Paralel kullanım",
              text: `Sadece birincil ECDIS'e güvenilmez; back-up paralel ve güncel tutulur.`,
            },
          ],
        },
        {
          subheading: "3.2 Kontrol listesi",
          bullets: [
            `ENC güncel mi (AIO/T&P)?`,
            `Safety parametreleri drafta göre ayarlı mı?`,
            `Check route uyarıları değerlendirildi mi?`,
            `Back-up senkronize ve Master onaylı mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
