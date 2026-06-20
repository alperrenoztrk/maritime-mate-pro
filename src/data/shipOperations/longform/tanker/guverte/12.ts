import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Ballast/deballast operasyonu",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 12,
  estimatedPages: 16,
  intro: `Yükleme/boşaltma sırasında segregated ballast (SBT) değişimi, geminin draft, trim ve mukavemet dengesini korur. Ballast operasyonu cargo operasyonu ile eşgüdümlü yürütülür ve BWTS ile BWM Convention'a uyumlu yapılır. Bu bölüm güvenli ballast/deballast yönetimini ele alır.`,
  sources: ["BWM Convention (D-2)", "MARPOL Annex I Reg. 18 (SBT)", "IS Code 2008"],
  chapters: [
    {
      heading: "1. SBT ve Eşgüdüm",
      sections: [
        {
          subheading: "1.1 Cargo ile koordinasyon",
          paragraphs: [
            `SBT, kargo tanklarından tamamen ayrıdır ve asla kargo ile karışmaz. Yükleme sırasında deballast, boşaltma sırasında ballast alınır; her adım loadicator ile SF/BM/GM açısından kontrol edilir.`,
          ],
          bullets: [
            `SBT kargo sisteminden tam ayrı`,
            `Loadicator ile her adımda stres/GM kontrolü`,
            `Liste/trim hedefe göre yönetim`,
          ],
        },
      ],
    },
    {
      heading: "2. BWTS ve Kayıt",
      sections: [
        {
          subheading: "2.1 D-2 uyumu",
          paragraphs: [
            `Ballast alımı/değişimi BWTS aktif şekilde D-2 standardına uygun yapılır; işlem Ballast Water Record Book'a (BWRB) kaydedilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "SBT kontaminasyonu",
              text: `SBT'nin yağ ile karışması ağır MARPOL ihlalidir; valf ayrımı titizlikle korunur.`,
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
            `Her adım loadicator ile doğrulandı mı?`,
            `BWTS aktif, D-2 uyumlu mu?`,
            `SBND/valf ayrımı korundu mu?`,
            `BWRB güncel mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
