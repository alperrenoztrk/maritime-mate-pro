import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Ambar açılış/kapanış prosedürü (hatch cover)",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 1,
  estimatedPages: 16,
  intro: `Hatch cover (ambar kapağı), yükü deniz suyundan korur; sızdırmazlık (weathertightness) bulk yük güvenliğinin temelidir. Folding/side-rolling/pontoon tipleri farklı operasyon gerektirir. Bu bölüm açılış/kapanış ve sızdırmazlığı ele alır.`,
  sources: ["SOLAS — load line / weathertight", "Hatch cover maker manuals"],
  chapters: [
    {
      heading: "1. Operasyon",
      sections: [
        {
          subheading: "1.1 Açılış/kapanış",
          paragraphs: [
            `Kapaklar hidrolik/wire ile maker prosedürüne göre açılır/kapanır; cleat, conta (rubber packing) ve drainage kontrol edilir. Kapanışta tüm cleat'ler bağlanır.`,
          ],
          bullets: [`Hidrolik/wire prosedürü`, `Conta + compression bar`, `Cleat ve drainage`],
        },
      ],
    },
    {
      heading: "2. Sızdırmazlık",
      sections: [
        {
          subheading: "2.1 Weathertight",
          paragraphs: [
            `Hasarlı conta veya compression bar su girişine yol açar; yağmur/dalga ile yük ıslanır (özellikle hijyenik/grain yükler ciddi hasar görür).`,
          ],
          callouts: [
            { type: "warning", title: "Su girişi", text: `Sızdıran hatch cover yük ıslanması ve ağır cargo claim yaratır; her açılış öncesi/kapanış sonrası kontrol edilir.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Conta/compression bar sağlam mı?`, `Cleat'ler bağlı mı?`, `Drainage çalışıyor mu?`, `Kayıt tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
