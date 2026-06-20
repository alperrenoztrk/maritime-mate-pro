import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "İnsinerator (Atık Yakma Fırını)",
  sectionId: "environmental-auxiliary",
  topicIndex: 3,
  estimatedPages: 21,
  intro: `İnsinerator (gemi atık yakma fırını), katı atık (çöp/sludge) ve yağ kalıntısını (sludge, slop, atık yağ) yakarak hacmini azaltan ve bertaraf eden çevre ekipmanıdır; MARPOL Annex VI insineratör emisyon ve yakılabilir atık kurallarını koyar. Bu bölüm; insineratör çalışma prensibini ve yanma odasını, yakılabilir/yakılamaz atıkları (MARPOL), sludge ve katı atık beslemesini, emisyon ve sıcaklık kontrolünü, çöp yönetim planı (Garbage Management Plan) ile ilişkisini ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "MARPOL Annex VI Reg. 16 — shipboard incineration",
    "MARPOL Annex V — garbage management",
    "IMO Res. MEPC.244(66) — incinerator standard",
    "Üretici el kitapları (Atlas, TeamTec)",
  ],
  chapters: [
    {
      heading: "1. Çalışma Prensibi",
      sections: [
        {
          subheading: "1.1 Yanma odası ve sıcaklık",
          paragraphs: [
            `İnsineratör, brülörle ısıtılan yanma odasında atığı yüksek sıcaklıkta (tipik ~850-1200 °C) yakar. Sludge atık yağı ayrı bir brülörle beslenir; katı atık (çöp) yükleme kapağından verilir. Yeterli sıcaklık ve hava, tam yanma ve düşük emisyon için şarttır.`,
          ],
          bullets: [
            `Yüksek sıcaklık + hava = tam yanma`,
            `Sludge brülörü ve katı atık beslemesi ayrı`,
            `Baca gazı emisyon kontrolüne tabi`,
          ],
        },
      ],
    },
    {
      heading: "2. Atık Türleri ve MARPOL",
      sections: [
        {
          subheading: "2.1 Yakılabilir ve yakılamaz atık",
          paragraphs: [
            `MARPOL bazı atıkların gemide yakılmasını yasaklar: PCB içerenler, ağır metal içeren atıklar, halojenli plastikler ve kargo kalıntıları gibi. Genel çöp (kağıt, gıda atığı kalıntısı), sludge ve atık yağ yakılabilir. Yakma kaydı Garbage Record Book / Oil Record Book'a işlenir.`,
          ],
          table: {
            headers: ["Atık", "Yakma"],
            rows: [
              ["Sludge / atık yağ", "Yakılabilir"],
              ["Genel çöp (yanıcı)", "Yakılabilir"],
              ["Halojenli plastik/PVC", "Yasak"],
              ["PCB / ağır metalli atık", "Yasak"],
            ],
          },
          callouts: [
            {
              type: "regulation",
              title: "Liman/özel alan yasağı",
              text: `İnsineratör genelde liman ve bazı özel alanlarda çalıştırılamaz; emisyon kuralları ve liman kısıtları dikkate alınır. Yakma açık denizde yapılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Bakım ve Emniyet",
      sections: [
        {
          subheading: "3.1 Emniyet",
          paragraphs: [
            `Yükleme kapağı yanma sırasında açılmamalı; geri tepme/alev riski vardır. Yeterli soğuma olmadan kül boşaltılmaz. Sludge servis tankı sıcaklığı ve nemi kontrol edilir; aşırı su içeren sludge yanmayı bozar ve patlama yaratabilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Su içeren sludge",
              text: `Yüksek su içeren sludge yanma odasında ani buharlaşma ve patlama (flashback) yaratabilir; sludge tankı önceden ısıtılıp settling ile suyu azaltılır.`,
            },
          ],
        },
        {
          subheading: "3.2 Bakım ve arıza tablosu",
          paragraphs: [
            `Bakım; brülör temizliği, refraktör (ateş tuğlası) kontrolü, kül temizliği, baca/fan ve sıcaklık sensörü kontrolünü kapsar.`,
          ],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Brülör ateşlemiyor", "Yakıt/foto sel", "Brülör tip/flame eye kontrol"],
              ["Düşük yanma sıcaklığı", "Hava/yakıt, refraktör", "Hava ayarı, refraktör"],
              ["Aşırı duman", "Eksik hava/ıslak sludge", "Hava artır, sludge kurut"],
              ["Sludge yanmıyor", "Su içeriği yüksek", "Settling + ön ısıtma"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
