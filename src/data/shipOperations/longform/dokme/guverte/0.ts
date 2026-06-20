import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Draft survey yapılması (pre-loading, final, post-discharge)",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 0,
  estimatedPages: 22,
  intro: `Draft survey, dökme yük miktarının geminin deplasman (displacement) farkından hesaplanmasıdır; ticari miktarın belirlenmesinde temel yöntemdir. Doğru draft okuması, density ölçümü ve deduction (ballast, yakıt, su, sabit ağırlık) hesabı küçük hatalarda büyük ticari farklara yol açar. Bu bölüm draft survey metodolojisini ele alır.`,
  sources: ["UN ECE Draft Survey Code", "Class hydrostatic tables", "Bulk carrier loading manual"],
  chapters: [
    {
      heading: "1. Draft Okuması",
      sections: [
        {
          subheading: "1.1 Altı nokta ve düzeltme",
          paragraphs: [
            `Forward, midship ve aft draft'lar her iki bordadan (6 okuma) alınır; deniz koşulu varsa ortalama ile dalga etkisi giderilir. Hog/sag düzeltmesi (quarter mean / mean of means) uygulanır.`,
          ],
          bullets: [`6 nokta draft okuması`, `Hog/sag düzeltmesi`, `Trim correction`, `Deniz suyu density'si`],
        },
      ],
    },
    {
      heading: "2. Deduction ve Hesap",
      sections: [
        {
          subheading: "2.1 Ağırlık çıkarımları",
          paragraphs: [
            `Net yük = (final displacement − ballast − yakıt − tatlı su − constant). Tüm tanklar dikkatle sounding edilir; constant değeri önceki survey'lerle tutarlı olmalıdır. Density düzeltmesi yapılır.`,
          ],
          callouts: [
            { type: "warning", title: "Küçük hata, büyük fark", text: `1-2 cm draft hatası büyük gemilerde yüzlerce ton fark yaratır; okuma ve sounding titiz olmalı.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`6 draft okundu mu?`, `Tüm tanklar sounding edildi mi?`, `Density düzeltmesi yapıldı mı?`, `Survey raporu imzalandı mı?`],
        },
      ],
    },
  ],
};

export default content;
