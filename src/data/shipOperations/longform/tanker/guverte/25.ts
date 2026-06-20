import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Tekne (hull) ve güverte temizliği",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 25,
  estimatedPages: 14,
  intro: `Hull ve güverte temizliği; spill önleme, korozyon kontrolü ve genel kondisyon için yapılır. Scupper plug ve drip tray disiplini, transfer sırasında deniz kirliliğini önler. Bu bölüm temizlik ve korozyon kontrolünü ele alır.`,
  sources: ["MARPOL Annex I", "Class survey requirements"],
  chapters: [
    {
      heading: "1. Spill Önleme",
      sections: [
        {
          subheading: "1.1 Scupper ve drip tray",
          paragraphs: [
            `Transfer öncesi scupper'lar tıkanır (plug) ve drip tray'ler yerleştirilir; güvertedeki herhangi bir dökülmenin denize ulaşması engellenir. Plug çıkarılmadan transfer yapılmaz.`,
          ],
          bullets: [
            `Scupper plug takılı`,
            `Drip tray manifold/valf altında`,
            `Birikme suyu kontrollü tahliye`,
          ],
        },
      ],
    },
    {
      heading: "2. Korozyon Kontrolü",
      sections: [
        {
          subheading: "2.1 Coating ve katodik koruma",
          paragraphs: [
            `Coating hasarları onarılır; katodik koruma ölçümleri yapılır. Korozyon yapısal bütünlüğü zamanla tehdit eder.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Scupper açık = kirlilik",
              text: `Scupper plug çıkarmadan transfer MARPOL ihlalidir; küçük bir dökülme bile denize ulaşır.`,
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
            `Scupper plug takılı mı?`,
            `Drip tray yerinde mi?`,
            `Coating hasarları onarıldı mı?`,
            `Hull condition log güncel mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
