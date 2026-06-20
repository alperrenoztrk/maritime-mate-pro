import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Kompresörler ve Basınçlı Hava Sistemi",
  sectionId: "auxiliary",
  topicIndex: 3,
  estimatedPages: 23,
  intro: `Basınçlı hava sistemi; ana makine ve jeneratörlerin marş (starting air) havasını, kontrol/otomasyon (control air) havasını ve genel servis (working air) havasını sağlar. Hava kompresörleri (genelde iki kademeli pistonlu) havayı sıkıştırır, hava şişeleri (air receiver/bottle) depolar. Bu bölüm; kompresör tiplerini ve iki kademeli sıkıştırmayı (intercooling), starting air sistemini ve emniyetini (flame arrester, bursting disc), basınç regülasyonu ve nem/yağ ayırmayı, klas gereksinimlerini (iki kompresör, marş kapasitesi) ve bakım/arızayı ele alır.`,
  sources: [
    "SOLAS / IACS UR — starting air arrangements",
    "Klas kuralları — air receivers & relief",
    "Üretici el kitapları (Sperre, Hatlapa, Tanabe)",
    "Pounder's Marine Diesel Engines",
  ],
  chapters: [
    {
      heading: "1. Kompresör ve İki Kademeli Sıkıştırma",
      sections: [
        {
          subheading: "1.1 İki kademe ve intercooler",
          paragraphs: [
            `Marş havası genelde ~30 bar gerektirir; tek kademede sıkıştırma aşırı ısınma ve verim kaybı yaratır. Bu yüzden iki kademeli sıkıştırma kullanılır: birinci kademe havayı orta basınca çıkarır, intercooler soğutur, ikinci kademe nihai basınca tamamlar. Soğutma verimi artırır ve yağ kömürleşmesini azaltır.`,
          ],
          bullets: [
            `1. kademe → intercooler → 2. kademe`,
            `Ara soğutma verim ve emniyet sağlar`,
            `After-cooler + su ayırıcı nemi alır`,
          ],
        },
        {
          subheading: "1.2 Nem ve yağ ayırma",
          paragraphs: [
            `Sıkışan hava nem ve yağ buharı içerir; after-cooler ve moisture separator suyu, kontrol havası için ayrıca hava kurutucu (air dryer) nemi alır. Nemli/yağlı hava enstrüman valflerini tıkar ve marş hattında patlama riski yaratır; drenaj düzenli yapılır.`,
          ],
        },
      ],
    },
    {
      heading: "2. Starting Air Sistemi ve Emniyet",
      sections: [
        {
          subheading: "2.1 Marş havası devresi",
          paragraphs: [
            `Hava şişesinden gelen yüksek basınçlı hava, ana start valfi ve dağıtıcı (air distributor) üzerinden silindir start supaplarına gider; doğru sırada silindirlere verilerek motoru döndürür. Yanlış zamanlama veya sızdıran start supabı geri tepme/patlama yaratabilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Starting air line explosion",
              text: `Sızdıran bir silindir start supabı, marş hattına sıcak gaz/yağ kaçırarak patlamaya yol açabilir; bu yüzden flame arrester ve bursting disc takılır, yağ taşınması sınırlanır.`,
            },
          ],
        },
        {
          subheading: "2.2 Emniyet elemanları",
          paragraphs: [
            `Marş hattında flame arrester (alev tutucu), her şişede emniyet valfi ve bursting disc bulunur. Hava şişeleri klas survey'ine tabidir; iç korozyon ve kalınlık kontrol edilir.`,
          ],
          table: {
            headers: ["Eleman", "Görev"],
            rows: [
              ["Flame arrester", "Marş hattı patlamasını söndürür"],
              ["Relief valve", "Aşırı basıncı boşaltır"],
              ["Bursting disc", "Silindir başı patlama tahliyesi"],
              ["Drain valve", "Su/yağı boşaltır"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Kapasite ve Klas Gereksinimi",
      sections: [
        {
          subheading: "3.1 Marş kapasitesi",
          paragraphs: [
            `Klas, reversible ana makineler için hava şişelerinin yakıt almadan belirli sayıda (tipik 12) ardışık marşı karşılamasını ister. Genelde iki bağımsız kompresör ve iki hava şişesi bulunur; biri arızalansa diğeri marş kabiliyetini sürdürür.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "İki kompresör / iki şişe",
              text: `Yedeklilik için en az iki kompresör ve iki hava şişesi gerekir; ana hava sisteminin tek arızada marş kabiliyetini yitirmemesi esastır.`,
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
            `Bakım; supap (suction/discharge) temizliği, segman/gömlek aşınması, intercooler/after-cooler temizliği, emniyet valf testi, otomatik drenaj ve unloader (boşaltma) kontrolünü kapsar. Hava şişesi iç muayene ve drenajı düzenli yapılır.`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Basınç yavaş yükseliyor", "Supap kaçağı/aşınma", "Supap temizlik/değişim"],
              ["Aşırı ısınma", "Intercooler tıkalı/su yok", "Soğutma kontrolü"],
              ["Şişede çok su/yağ", "Drenaj yok, after-cooler", "Drenaj + ayırıcı kontrolü"],
              ["Sık emniyet valf açması", "Unloader/ayar bozuk", "Unloader ve set basıncı kontrol"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
