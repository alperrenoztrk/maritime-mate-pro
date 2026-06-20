import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Trim ve stabilite hesabı (araç yükü dahil)",
  shipType: "ro-ro",
  dept: "guverte",
  opIndex: 3,
  estimatedPages: 18,
  intro: `Ro-Ro gemilerinde geniş açık araç güverteleri, su girişi halinde büyük serbest yüzey etkisi yaratır; bu nedenle stabilite ve trim yönetimi kritiktir. Araç yükü, ballast ve free surface birlikte değerlendirilir. Bu bölüm Ro-Ro stabilitesini ele alır.`,
  sources: ["IS Code 2008", "SOLAS II-1 (damage stability)", "Stockholm Agreement (Ro-Ro damage)"],
  chapters: [
    {
      heading: "1. Stabilite Yönetimi",
      sections: [
        {
          subheading: "1.1 Free surface ve GM",
          paragraphs: [
            `Araç güvertesine su girişi büyük serbest yüzey etkisiyle GM'yi hızla düşürür; bu yüzden kapı/rampa sızdırmazlığı stabilitenin parçasıdır. Yükleme intact ve damage kriterlerini sağlamalıdır.`,
          ],
          bullets: [`GM (FSC dahil) > min`, `Damage stability uyumu`, `Kapı/rampa sızdırmazlığı`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Water on deck",
          paragraphs: [
            `Araç güvertesinde su birikmesi (water on deck) Ro-Ro alabora kazalarının ana nedenidir; drainage ve sızdırmazlık birlikte yönetilir.`,
          ],
          callouts: [
            { type: "warning", title: "Free surface", text: `Açık güvertede su, dev serbest yüzey etkisiyle hızlı alaboraya yol açar (Estonia, 1994).` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`GM kriterleri sağlanıyor mu?`, `Damage case kontrol edildi mi?`, `Drainage çalışıyor mu?`, `Çıktı saklandı mı?`],
        },
      ],
    },
  ],
};

export default content;
