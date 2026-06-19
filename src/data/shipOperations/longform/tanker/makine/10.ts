import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Tatlı su üretimi",
  shipType: "tanker",
  dept: "makine",
  opIndex: 10,
  estimatedPages: 14,
  intro: `Tatlı su, vakum evaporator (FWG) veya RO ile üretilir; içme suyu (potable) kalitesi sağlık açısından kritiktir. Liman ve kıyı sularında üretim yapılmaz (kontaminasyon). Bu bölüm tatlı su üretimini ele alır.`,
  sources: ["WHO Guidelines for Drinking-water Quality", "Maker manuals"],
  chapters: [
    {
      heading: "1. Üretim",
      sections: [
        {
          subheading: "1.1 Şartlar ve salinite",
          paragraphs: [
            `Jacket water sıcaklığı yeterli olduğunda (örn. > 50°C) evaporator çalıştırılır; salinometer ile tuzluluk izlenir (örn. < 10 ppm). Liman/kıyıda kontaminasyon nedeniyle üretim durdurulur.`,
          ],
          bullets: [
            `Jacket water sıcaklığı uygun`,
            `Salinometer eşiği`,
            `Limanda üretim YAPMA`,
          ],
        },
      ],
    },
    {
      heading: "2. İçme Suyu Kalitesi",
      sections: [
        {
          subheading: "2.1 Dezenfeksiyon",
          paragraphs: [
            `Potable su için dezenfeksiyon (klorlama/UV) ve mineralizasyon uygulanır; periyodik bakteriyolojik test yapılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Liman kontaminasyonu",
              text: `Liman sularında üretim mikrobiyolojik/kimyasal kirlilik riski taşır; bu sularda üretim yapılmaz.`,
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
            `Salinite eşik altında mı?`,
            `Limanda üretim durduruldu mu?`,
            `Dezenfeksiyon uygulandı mı?`,
            `FW production log güncel mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
