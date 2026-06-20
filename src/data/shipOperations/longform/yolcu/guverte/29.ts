import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Ses ve kalabalık kontrol önlemleri (capstan, bar)",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 29,
  estimatedPages: 12,
  intro: `Yolcu gemilerinde bar, restoran, tiyatro ve etkinlik alanlarında kalabalık kontrolü (crowd control); panik ve sıkışmayı önler, acil durumda düzenli tahliyeyi sağlar. Bu bölüm kalabalık kontrolünü ele alır.`,
  sources: ["SOLAS III", "Crowd management training (STCW)"],
  chapters: [
    {
      heading: "1. Kalabalık Yönetimi",
      sections: [
        {
          subheading: "1.1 Akış ve kapasite",
          paragraphs: [
            `Etkinlik alanlarında kapasite ve çıkış yolu açıklığı yönetilir; personel crowd management eğitimlidir. Acil durumda yönlendirme prosedürü uygulanır.`,
          ],
          bullets: [`Kapasite yönetimi`, `Çıkış yolu açıklığı`, `Crowd management eğitimi`, `Acil yönlendirme`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Kapasite uygun mu?`, `Çıkışlar açık mı?`, `Personel eğitimli mi?`, `Prosedür hazır mı?`],
        },
      ],
    },
  ],
};

export default content;
