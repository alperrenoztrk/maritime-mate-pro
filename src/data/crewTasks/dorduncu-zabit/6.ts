import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Sistem ve prosedür öğrenimi",
  roleSlug: "dorduncu-zabit",
  taskIndex: 6,
  estimatedPages: 22,
  intro: `Dördüncü Zabit, kariyerinin başında köprüüstü cihazlarını, emniyet ve operasyon prosedürlerini ve güverte bakım sistemlerini öğrenerek mesleki temelini kurar. ECDIS, radar, AIS, GMDSS gibi cihazların kullanımı; ISM, ISPS, SOPEP gibi yönetim sistemleri; yük operasyonu prosedürleri ve Training Record Book disiplini bu dönemde içselleştirilir. Bu bölüm, genç zabitin sistem ve prosedür öğreniminin yapılandırılmış yolunu ele alır.`,
  sources: [
    "STCW — yetkinlik standartları ve Training Record Book",
    "ISM Code — Safety Management System",
    "ISPS Code — gemi güvenliği",
    "SOLAS Chapter V — köprüüstü ekipmanı",
    "Şirket SMS prosedürleri ve familiarization checklist",
  ],
  chapters: [
    {
      heading: "1. Öğrenme Disiplini",
      sections: [
        {
          subheading: "1.1 Yapılandırılmış öğrenme",
          paragraphs: [
            `Genç zabit, "iş üstünde" öğrenmeyi sistematik bir Training Record Book (TRB) ile birleştirir. Her cihaz ve prosedür için yetkinlik kazanımı gözetmen zabit tarafından doğrulanır. Pasif izleme değil, soru sorma ve uygulama yoluyla aktif öğrenme esastır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Soru sormak güçtür",
              text: `Bilmediğini sormak, bilmediğini gizlemekten her zaman güvenlidir. Genç zabitin en değerli alışkanlığı, emin olmadığı her şeyi gözetmenine sormaktır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Köprüüstü Cihazları",
      sections: [
        {
          subheading: "2.1 ECDIS, radar, AIS, GMDSS",
          paragraphs: [
            `Dördüncü Zabit; ECDIS'te rota izleme ve alarm ayarlarını, radar/ARPA ile hedef takibini, AIS verisinin kullanımını ve GMDSS ekipmanının temel işleyişini öğrenir. Her cihazın yeteneği kadar sınırını da bilmek (örn. AIS'in eksik/yanlış veri verebileceği) güvenli kullanım için kritiktir.`,
          ],
          bullets: [
            `ECDIS: rota, safety contour, alarm yorumlama`,
            `Radar/ARPA: hedef edinme, CPA/TCPA`,
            `AIS: veri kullanımı ve sınırları`,
            `GMDSS: distress/temel haberleşme`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Tek cihaza güvenme",
              text: `Hiçbir cihaz tek başına gerçeği vermez. Genç zabit, cihaz verisini görsel gözlem ve çapraz kontrolle birleştirmeyi öğrenir; ekrana körü körüne güven, kazaların klasik nedenidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Emniyet Yönetim Sistemleri",
      sections: [
        {
          subheading: "3.1 ISM, ISPS, SOPEP",
          paragraphs: [
            `ISM (emniyetli işletim), ISPS (güvenlik) ve SOPEP (kirlilik müdahale) gemideki temel yönetim sistemleridir. Dördüncü Zabit; SMS prosedürlerini, near-miss raporlamayı, güvenlik seviyelerini ve kirlilik müdahale ekipmanını öğrenir. Bu sistemlerin "kâğıt" değil, günlük pratiğin parçası olduğunu kavrar.`,
          ],
          table: {
            caption: "Temel yönetim sistemleri",
            headers: ["Sistem", "Odak", "Genç zabit için"],
            rows: [
              ["ISM", "Emniyetli işletim", "SMS prosedürleri, near-miss"],
              ["ISPS", "Güvenlik", "Erişim kontrolü, seviye"],
              ["SOPEP", "Kirlilik müdahale", "Ekipman, ilk müdahale"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Yük Operasyon Prosedürleri",
      sections: [
        {
          subheading: "4.1 Yük türüne göre temel",
          paragraphs: [
            `Gemi tipine göre (bulk, tanker, container, ro-ro) yük operasyonu prosedürleri farklıdır. Dördüncü Zabit; cargo watch, stabilite/draft takibi, lashing kontrolü ve emniyet tedbirlerinin temellerini öğrenir. Tehlikeli yük (IMDG/IMSBC) farkındalığı bu dönemde başlar.`,
          ],
        },
      ],
    },
    {
      heading: "5. Güverte Bakım Sistemleri",
      sections: [
        {
          subheading: "5.1 Bakım ve PMS",
          paragraphs: [
            `Pas raspalama, boyama, halat/tel bakımı, güverte makineleri ve PMS iş emirlerinin temel mantığı öğrenilir. Dördüncü Zabit, bakımın hem geminin değerini hem emniyetini koruduğunu ve doğru kaydın bakımın bir parçası olduğunu kavrar.`,
          ],
        },
      ],
    },
    {
      heading: "6. Training Record Book",
      sections: [
        {
          subheading: "6.1 TRB'nin güncel tutulması",
          paragraphs: [
            `TRB, kazanılan yetkinliklerin kanıt defteridir ve sertifika/terfi sürecinin temelidir. Dördüncü Zabit her tamamlanan görevi zamanında işler ve gözetmenine onaylatır. Geç veya eksik doldurulan TRB, ilerleyen kariyer adımlarında sorun yaratır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Geciken TRB",
              text: `Ay sonuna bırakılan TRB girişleri çoğu zaman eksik ve yüzeysel kalır. Görevi yaptıkça kaydetmek, hem öğrenmeyi pekiştirir hem de defteri gerçekçi kılar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 Öğrenme kontrolü",
          bullets: [
            `Köprüüstü cihazlarının kullanımı ve sınırları öğrenildi mi?`,
            `ISM/ISPS/SOPEP temel prosedürleri kavrandı mı?`,
            `Yük operasyonu ve güvenlik temelleri öğrenildi mi?`,
            `Güverte bakım ve PMS mantığı anlaşıldı mı?`,
            `Bilinmeyenler gözetmene düzenli soruluyor mu?`,
            `TRB güncel ve gözetmen onaylı mı?`,
          ],
          paragraphs: [
            `Sistem ve prosedür öğrenimi, Dördüncü Zabitin gelecekteki tüm yetkinliğinin temelini atar. Aktif merak, çapraz kontrol alışkanlığı ve disiplinli TRB; genç zabiti güvenilir bir köprüüstü zabitine dönüştüren yapı taşlarıdır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
