import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Emisyon takibi (SOx scrubber, CII/SEEMP)",
  shipType: "tanker",
  dept: "makine",
  opIndex: 21,
  estimatedPages: 18,
  intro: `MARPOL Annex VI; SOx (scrubber veya düşük kükürtlü yakıt), NOx, EEXI ve CII (Carbon Intensity Indicator) uyumunu zorunlu kılar. Scrubber wash water ve yıllık CII statement izlenir. Bu bölüm emisyon takibini ele alır.`,
  sources: ["MARPOL Annex VI", "IMO DCS / CII / SEEMP"],
  chapters: [
    {
      heading: "1. SOx ve Scrubber",
      sections: [
        {
          subheading: "1.1 Wash water ve yakıt",
          paragraphs: [
            `Scrubber'lı gemilerde wash water pH/PAH/türbidite monitör edilir; scrubber'sız gemilerde uyumlu (örn. %0.5 kükürt) yakıt kullanılır. Open-loop kısıtlı bölgelerde uygun mod seçilir.`,
          ],
          bullets: [
            `Wash water monitör (scrubber)`,
            `Uyumlu yakıt (gerekirse)`,
            `Bölgesel mod kısıtları`,
          ],
        },
      ],
    },
    {
      heading: "2. CII/SEEMP",
      sections: [
        {
          subheading: "2.1 Karbon yoğunluğu",
          paragraphs: [
            `CII rating (A-E) yıllık hesaplanır; SEEMP Part III iyileştirme planı izlenir. D/E rating düzeltici plan gerektirir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "CII",
              text: `Yıllık CII statement ve SEEMP planı zorunludur; kötü rating ticari ve düzenleyici sonuç doğurur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Son kontrol",
          bullets: [
            `Wash water/yakıt uyumu sağlandı mı?`,
            `Bölgesel mod doğru mu?`,
            `CII statement hazır mı?`,
            `EGC Record Book güncel mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
