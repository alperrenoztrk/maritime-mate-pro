import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Slop yönetimi ve transferi",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 9,
  estimatedPages: 16,
  intro: `Slop; tank yıkama ve COW sonucu oluşan yağ/su karışımının toplandığı slop tank içeriğidir. MARPOL Annex I, slop'un denize basılmasını kesin kurallara bağlar; uygun olmayan tahliye ağır cezalı çevre suçudur. Bu bölüm slop birikimi, load-on-top yöntemi ve reception facility'ye transferi ele alır.`,
  sources: ["MARPOL Annex I Reg. 29-31", "ISGOTT 6th edition", "Oil Record Book Part I"],
  chapters: [
    {
      heading: "1. Slop Oluşumu ve Takibi",
      sections: [
        {
          subheading: "1.1 Slop tank yönetimi",
          paragraphs: [
            `Tank yıkama suları ve COW kalıntıları slop tank'ta toplanır; yağ ve su zamanla ayrışır (settling). Slop seviyesi ve yağ/su arayüzü (interface) takip edilir.`,
          ],
          bullets: [
            `Slop seviyesi ve interface ölçümü`,
            `Settling süresi (ayrışma) takibi`,
            `Decant (üst su tahliyesi) sadece MARPOL şartlarında`,
          ],
        },
      ],
    },
    {
      heading: "2. Load-on-Top ve Transfer",
      sections: [
        {
          subheading: "2.1 Load-on-top",
          paragraphs: [
            `Mümkün olduğunda slop'taki yağ fazı, bir sonraki yük üzerine yüklenerek (load-on-top) geri kazanılır; bu hem çevresel hem ticari avantaj sağlar.`,
          ],
        },
        {
          subheading: "2.2 Reception facility",
          paragraphs: [
            `Geri kazanılamayan slop yalnız liman atık kabul tesisine (reception facility) verilir. Transfer ORB I'da uygun kod (Code J vb.) ile kayıt altına alınır ve makbuz saklanır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex I",
              text: `Slop'un izinsiz denize tahliyesi yasaktır; tahliye yalnız reception facility'ye veya katı MARPOL kriterlerine göre yapılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kayıt ve Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Son kontrol",
          bullets: [
            `Slop interface ölçüldü, settling sağlandı mı?`,
            `Load-on-top uygunsa uygulandı mı?`,
            `Reception transferi ORB I'a kaydedildi mi?`,
            `Reception makbuzu dosyalandı mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
