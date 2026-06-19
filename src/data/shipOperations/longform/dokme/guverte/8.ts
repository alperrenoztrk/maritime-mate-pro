import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Ballast/deballast operasyonu (yükleme dengesi)",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 8,
  estimatedPages: 16,
  intro: `Dökme yük yükleme/boşaltma hızı yüksektir; ballast/deballast bu hıza ayak uydurarak SF/BM ve trim'i korumalıdır. BLU Code, gemi-terminal arası ballast/loading eşgüdümünü düzenler. Bu bölüm ballast operasyonunu ele alır.`,
  sources: ["BLU Code", "BWM Convention (D-2)", "Loading manual"],
  chapters: [
    {
      heading: "1. Eşgüdüm",
      sections: [
        {
          subheading: "1.1 BLU sequence",
          paragraphs: [
            `Loading sequence ve ballast planı BLU Code uyumlu hazırlanır; yükleme hızı ile deballast kapasitesi uyumlu olmalıdır. Aksi halde SF/BM aşımı veya gecikme olur.`,
          ],
          bullets: [`BLU loading/ballast sequence`, `Pompa kapasitesi uyumu`, `SF/BM her adımda`, `BWTS aktif (D-2)`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`BLU sequence terminale verildi mi?`, `Ballast hızı yük hızına uyuyor mu?`, `SF/BM kontrol edildi mi?`, `BWRB güncel mi?`],
          paragraphs: [`Hızlı yüklemede ballast yetişemezse mukavemet limitleri hızla aşılabilir.`],
        },
      ],
    },
  ],
};

export default content;
