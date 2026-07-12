import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Thruster interaction, forbidden zone ve güç limiti",
  shipType: "offshore",
  dept: "makine",
  opIndex: 6,
  estimatedPages: 20,
  intro: `Thruster wash, hull veya diğer thrusterlarla etkileşim ve mekanik yasak açılar (forbidden zone), beklenen net thrust'ı düşürür; bu kayıp kontrol sistemine doğru yansıtılmalıdır. Thruster wash dalgıç, ROV ve hafif seabed ekipmanı için doğrudan tehlikedir; aşırı bias kullanılabilir gücü tüketip WCF sonrası marjı azaltır. Bu bölüm interaction ve limit yönetimini ele alır.`,
  sources: [
    "IMCA M103",
    "IMCA M206",
    "IMCA M247",
    "Vessel thruster manual",
  ],
  chapters: [
    {
      heading: "1. Yasak Bölge ve Etkileşim",
      sections: [
        {
          subheading: "1.1 Forbidden sector ve inhibit",
          bullets: [
            `Azimuth forbidden sector, tunnel-thruster hız limiti ve thruster-thruster interaction haritasını maker verisinden doğrula`,
            `Taut wire, diver, ROV, umbilical veya riser için thrust inhibit/limitlerini kontrol et`,
            `Thruster bias ve power priority ayarını göreve ve grup kapasitesine uygun teyit et`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Thruster wash tehlikesi",
              text: `Thruster wash dalgıç, ROV ve hafif seabed ekipmanı için doğrudan tehlikedir; tanımlı inhibit uygulanmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Demanded vs Delivered",
      sections: [
        {
          subheading: "2.1 Trend ve MOC",
          paragraphs: [
            `DP'nin demanded ve delivered thrust değerleri trendlenir; yüksek komuta rağmen düşük tepki araştırılır. Ayar değişikliği MOC ve Master/DPO/Chief Engineer onayı olmadan yapılmaz.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Aşırı bias",
              text: `Aşırı bias kullanılabilir gücü tüketip WCF sonrası marjı azaltabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Interaction son kontrol",
          bullets: [
            `Forbidden sector ve interaction haritası maker verisiyle doğrulandı mı?`,
            `Diver/ROV/umbilical için thrust inhibit uygulandı mı?`,
            `Demanded–delivered thrust trendleniyor mu?`,
            `Ayar değişiklikleri MOC ile mi yapıldı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
