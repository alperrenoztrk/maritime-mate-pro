import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Grab/unloader hidrolik veya elektrik sistemi bakımı",
  shipType: "dokme",
  dept: "makine",
  opIndex: 8,
  estimatedPages: 14,
  intro: `Geared bulk gemilerinde grab/vinç ve unloader sistemleri yük operasyonunun verimini belirler; hidrolik/elektrik bakımı arızayı ve demurajı önler. Bu bölüm grab/unloader bakımını ele alır.`,
  sources: ["Crane/grab maker manuals", "Class Rules"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Hidrolik/elektrik",
          paragraphs: [
            `Hidrolik silindir/pompa veya elektrik motor/kontaktörler bakıma alınır; tel halat ve fren PMS'e göre denetlenir. Aşırı yük koruması doğrulanır.`,
          ],
          bullets: [`Hidrolik/elektrik bakım`, `Tel halat/fren`, `Aşırı yük koruması`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Hidrolik/elektrik uygun mu?`, `Tel halat/fren sağlam mı?`, `Koruma çalışıyor mu?`, `PMS kaydı tutuldu mu?`],
          paragraphs: [`Vinç arızası geared gemide yük operasyonunu durdurur.`],
        },
      ],
    },
  ],
};

export default content;
