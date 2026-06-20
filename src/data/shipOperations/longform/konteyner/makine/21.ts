import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "SOx / NOx emisyon ölçümü ve IMO MARPOL Ek VI raporlaması",
  shipType: "konteyner",
  dept: "makine",
  opIndex: 21,
  estimatedPages: 16,
  intro: `MARPOL Annex VI; SOx (yakıt kükürdü/scrubber) ve NOx (Tier I/II/III, ECA) limitlerini düzenler; bunker kayıtları, scrubber verisi ve NOx Technical File uyumu raporlanır. Bu bölüm emisyon ölçümü ve raporlamayı ele alır.`,
  sources: ["MARPOL Annex VI", "NOx Technical Code", "Bunker Delivery Notes"],
  chapters: [
    {
      heading: "1. SOx ve NOx",
      sections: [
        {
          subheading: "1.1 Yakıt/scrubber ve ECA",
          paragraphs: [
            `SOx uyumu BDN kükürt içeriği veya scrubber wash water verisiyle gösterilir; NOx için motorlar Technical File'a uygun ayarlanır. ECA bölgelerinde sıkı limitlere geçilir.`,
          ],
          bullets: [`BDN/scrubber verisi`, `NOx Technical File uyumu`, `ECA geçiş kayıtları`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Yakıt kükürdü uygun mu?`, `Scrubber verisi kayıtlı mı?`, `ECA geçişleri loglandı mı?`, `Raporlama tam mı?`],
          paragraphs: [`ECA'ya girişte uyumlu yakıta geçiş zamanında yapılmalı ve kaydedilmelidir.`],
        },
      ],
    },
  ],
};

export default content;
