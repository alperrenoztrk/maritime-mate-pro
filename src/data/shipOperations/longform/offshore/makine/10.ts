import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Blackout prevention ve kontrollü recovery",
  shipType: "offshore",
  dept: "makine",
  opIndex: 10,
  estimatedPages: 20,
  intro: `DP'de blackout, station-keeping'in tamamen kaybı demektir; öncelik önlemedir, ardından kısmi/tam blackout sonrası propulsion'ı kontrollü sırayla geri getirmektir. Arıza izole edilmeden hızlı re-energisation ikinci bir blackout ve ekipman hasarı yaratabilir; emergency generator DP thruster yükünü taşımak için tasarlanmamış olabilir. Bu bölüm blackout önleme ve recovery'yi ele alır.`,
  sources: [
    "SOLAS II-1",
    "IMCA M206",
    "IMCA M166",
    "Vessel blackout recovery procedure",
  ],
  chapters: [
    {
      heading: "1. Önleme",
      sections: [
        {
          subheading: "1.1 Koruma ayarları",
          bullets: [
            `Reverse power, overload, under-frequency load shedding ve preferential trip ayarlarının test durumunu doğrula`,
            `Kısmi blackout'ta sağlam redundant group'u koru`,
            `Arızalı bölümü izole etmeden tie kapatma`,
          ],
          callouts: [
            {
              type: "warning",
              title: "İzole etmeden re-energisation",
              text: `Arıza izole edilmeden hızlı re-energisation ikinci blackout ve ekipman hasarı yaratabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Kontrollü Recovery",
      sections: [
        {
          subheading: "2.1 Geri getirme sırası",
          paragraphs: [
            `Blackout recovery sırası emergency generator, essential auxiliaries, DG start, bus energisation ve thruster bağlantısı olarak gemiye özel çalışılır. Her geri bağlantıda frekans/voltaj stabilitesi ve available power kontrol edilir; DPO ile hangi thrusterın önce devreye alınacağı kaçış ve drift yönüne göre koordine edilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Emergency generator kapasitesi",
              text: `Emergency generator DP thruster yükünü taşımak için tasarlanmamış olabilir; recovery sırası buna göre kurulur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Blackout recovery son kontrol",
          bullets: [
            `Koruma/load-shedding ayarları doğru durumda mı?`,
            `Recovery sırası gemiye özel çalışıldı mı (drill)?`,
            `Arızalı bölüm izole edilmeden tie kapatılmıyor mu?`,
            `Drill report ve corrective action FMEA'ya besleniyor mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
