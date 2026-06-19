import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Ambar temizleme ve müfettiş kabulü",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 6,
  estimatedPages: 18,
  intro: `Hold (ambar) hazırlığı; önceki ve sonraki yüke göre load-ready, shovel-clean, grain-clean veya hospital-clean seviyelerinde yapılır. Grain ve hassas yüklerde müfettiş (surveyor/NCB) kabulü gerekir. Bu bölüm hold temizliğini ele alır.`,
  sources: ["IMSBC Code", "Charter party cleanliness clauses", "NCB grain inspection"],
  chapters: [
    {
      heading: "1. Temizlik Seviyeleri",
      sections: [
        {
          subheading: "1.1 Standartlar",
          paragraphs: [
            `Temizlik; sweeping, washing (deniz + tatlı su durulama), kurutma, koku giderme, bilge well temizliği ve boya rötuşunu kapsar. Seviye charter party ve sonraki yüke göre belirlenir.`,
          ],
          bullets: [`Load-ready / shovel-clean`, `Grain-clean / hospital-clean`, `Bilge well + smell`, `Boya rötuşu`],
        },
      ],
    },
    {
      heading: "2. Kabul",
      sections: [
        {
          subheading: "2.1 Surveyor onayı",
          paragraphs: [
            `Hold inspection bizzat yapılır ve foto/video ile belgelenir; grain için NCB/surveyor kabulü alınır. Reddedilen hold tekrar temizlenir.`,
          ],
          callouts: [
            { type: "tip", title: "Kanıtla", text: `Hold kondisyonu yükleme öncesi fotoğrafla belgelenmeli; sonradan kalıntı/koku claim'lerine karşı koruma sağlar.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Hedef temizlik seviyesi sağlandı mı?`, `Bilge well temiz/kuru mu?`, `Surveyor kabulü alındı mı?`, `Foto kanıt var mı?`],
        },
      ],
    },
  ],
};

export default content;
