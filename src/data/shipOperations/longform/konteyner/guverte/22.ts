import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Ballast, servis ve yakıt tankları sounding — seyir defterine kayıt",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 22,
  estimatedPages: 12,
  intro: `Günlük tank sounding'leri (ballast, servis suyu, yakıt) ROB takibi, stabilite ve sızıntı tespiti için tutulur ve seyir defterine işlenir. Bu bölüm sounding disiplinini ele alır.`,
  sources: ["Company procedures", "Deck log requirements"],
  chapters: [
    {
      heading: "1. Sounding",
      sections: [
        {
          subheading: "1.1 Günlük ölçüm",
          paragraphs: [
            `Tanklar günlük sounding edilir; beklenmeyen seviye değişimi sızıntı/transfer hatasına işaret eder. Sonuçlar deftere kaydedilir.`,
          ],
          bullets: [`Günlük sounding`, `Beklenmeyen değişim analizi`, `Deftere kayıt`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Tüm tanklar sounding edildi mi?`, `Sapma var mı?`, `Kayıt yapıldı mı?`],
          paragraphs: [`Düzenli sounding, sızıntı ve transfer hatalarının erken tespitini sağlar.`],
        },
      ],
    },
  ],
};

export default content;
