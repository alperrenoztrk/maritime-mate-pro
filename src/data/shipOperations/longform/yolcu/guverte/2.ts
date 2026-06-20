import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Muster drill (toplanma tatbikatı) organizasyonu",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 2,
  estimatedPages: 16,
  intro: `Muster drill, yolcuların kalkıştan sonra (SOLAS gereği genelde 24 saat içinde) muster station'a yönlendirilmesini sağlar; Costa Concordia felaketi sonrası bu kuralın önemi artmıştır. Bu bölüm muster drill organizasyonunu ele alır.`,
  sources: ["SOLAS III/19", "Costa Concordia lessons"],
  chapters: [
    {
      heading: "1. Organizasyon",
      sections: [
        {
          subheading: "1.1 Yolcu yönlendirme",
          paragraphs: [
            `Yolcular alarm sonrası muster station'a yönlendirilir; can yeleği ve prosedür gösterilir. Sayım/işaretleme ile katılım doğrulanır. Mümkünse kalkıştan önce yapılır.`,
          ],
          bullets: [`24 saat içinde (mümkünse kalkış öncesi)`, `Muster station yönlendirme`, `Can yeleği gösterimi`, `Katılım sayımı`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Costa Concordia dersi",
          paragraphs: [
            `Costa Concordia'da (2012) muster drill henüz yapılmadan kaza oldu; bu yüzden drill'in erken yapılması kritik bir öğrenilen derstir.`,
          ],
          callouts: [
            { type: "example", title: "Costa Concordia (2012)", text: `Tahliye karmaşası, geç ve eksik muster bilgisini öne çıkardı; muster drill mümkün olan en erken zamanda yapılmalıdır.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Drill zamanında yapıldı mı?`, `Tüm yolcular yönlendirildi mi?`, `Katılım sayıldı mı?`, `Kayıt tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
