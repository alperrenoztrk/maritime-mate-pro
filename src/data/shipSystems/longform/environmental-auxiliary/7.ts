import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Sıkıştırılmış Hava Sistemi (Start / Control / Working Air)",
  sectionId: "environmental-auxiliary",
  topicIndex: 7,
  estimatedPages: 22,
  intro: `Sıkıştırılmış hava sistemi, gemide üç temel hizmet sağlar: ana makine/jeneratör marşı için starting air, otomasyon ve valf kumandası için control/instrument air ve genel kullanım için working/service air. Her hizmetin basınç, saflık ve yedeklilik gereksinimi farklıdır. Bu bölüm; hava sistemi kademelerini ve basınç seviyelerini, hava hazırlama (soğutma, nem alma, dryer) gereksinimini, kontrol havası saflığının önemini, basınç düşürme ve dağıtımı, yedeklilik ve emniyeti ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "IACS UR — starting & control air",
    "SOLAS — essential services air supply",
    "ISO 8573 — compressed air quality",
    "Üretici el kitapları (Sperre, Tanabe, Hatlapa)",
  ],
  chapters: [
    {
      heading: "1. Hizmet Kademeleri",
      sections: [
        {
          subheading: "1.1 Start, control, working air",
          paragraphs: [
            `Starting air yüksek basınçtır (~30 bar) ve hava şişelerinde depolanır; control/instrument air daha düşük basınçta (~7 bar) ama çok temiz ve kuru olmalıdır; working air genel kullanım (temizlik, pnömatik el aleti) içindir. Genelde marş havası basınç düşürülerek kontrol/servis havasına da beslenir.`,
          ],
          table: {
            headers: ["Hizmet", "Basınç (tipik)", "Kalite gereksinimi"],
            rows: [
              ["Starting air", "~30 bar", "Marş için yeterli, drenajlı"],
              ["Control/instrument", "~7 bar", "Çok kuru ve temiz"],
              ["Working/service", "~7 bar", "Genel"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Hava Hazırlama",
      sections: [
        {
          subheading: "2.1 Nem alma ve dryer",
          paragraphs: [
            `Sıkışan hava nem ve yağ içerir; after-cooler ve moisture separator suyu alır, control air için ayrıca air dryer (adsorpsiyon/soğutmalı) nemi düşürür. Nemli/yağlı kontrol havası valf ve pozisyoner arızasına, donma ve enstrüman tıkanmasına yol açar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kontrol havası saflığı",
              text: `Nemli kontrol havası, otomasyon valflerini ve pozisyonerleri arızalandırır; düşük yük/donma riskli ortamlarda dryer şarttır. Drenajlar düzenli kontrol edilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Dağıtım, Yedeklilik ve Emniyet",
      sections: [
        {
          subheading: "3.1 Basınç düşürme ve dağıtım",
          paragraphs: [
            `Marş havası şişeden basınç düşürücü (reducing valve) ile kontrol/servis hattına verilir. Kontrol havası kaybı, kritik otomasyonu felç edebileceğinden ayrı bir control air receiver (rezerv) ile süreklilik sağlanır.`,
          ],
        },
        {
          subheading: "3.2 Yedeklilik ve emniyet",
          paragraphs: [
            `En az iki kompresör ve iki hava şişesi yedeklilik sağlar; emniyet valfleri her basınç bölgesini korur. Marş hattında flame arrester ve bursting disc bulunur (start air patlamasına karşı). Hava şişeleri klas survey'ine tabidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Kontrol havası süreklilik",
              text: `Kritik kontrol havası, kompresör durmasında bile bir süre devam edecek rezerve sahip olmalı; ani kayıp güvenli durmayı tehlikeye atabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Bakım ve Arıza",
      sections: [
        {
          subheading: "4.1 Bakım",
          paragraphs: [
            `Bakım; kompresör supap/segman, intercooler/after-cooler, dryer eleman/rejenerasyon, otomatik drenaj, emniyet valf testi ve hava şişesi iç muayene/drenajını kapsar. Drenaj eksikliği nem birikimine yol açar.`,
          ],
          bullets: [
            `Otomatik drenaj kontrolü`,
            `Dryer eleman/rejenerasyon`,
            `Emniyet valf ve şişe survey`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Basınç yavaş yükseliyor", "Supap kaçağı", "Kompresör supap kontrol"],
              ["Kontrol havası nemli", "Dryer/drenaj arızası", "Dryer + drenaj kontrol"],
              ["Valf/otomasyon hatası", "Hava kalitesi/basınç", "Hat ve filtre kontrol"],
              ["Şişede su/yağ fazla", "Drenaj/after-cooler", "Drenaj + soğutma kontrol"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
