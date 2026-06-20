import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Hidrofor ve Tatlı Su Dağıtım Sistemi",
  sectionId: "environmental-auxiliary",
  topicIndex: 5,
  estimatedPages: 21,
  intro: `Hidrofor (pressure set) ve tatlı su dağıtım sistemi, gemideki içme ve sıhhi suyu basınçlı olarak yaşam mahallindeki tüm musluk, duş ve mutfağa ulaştıran sistemdir; mürettebat sağlığı (MLC) açısından su kalitesi ve hijyen kritiktir. Sıcak su sistemi (calorifier) ayrıca ısıtma sağlar. Bu bölüm; hidrofor çalışma prensibini (basınçlı tank, hava yastığı), tatlı su tankı ve dağıtım hattını, sıcak su (calorifier) sistemini, içme suyu hijyeni ve dezenfeksiyonu (klor/UV, Legionella), MLC su gereksinimini ve bakım/arızayı ele alır.`,
  sources: [
    "MLC 2006 — food & catering, fresh water",
    "WHO — drinking water on ships guide",
    "IMO/ILO sanitation guidelines",
    "Üretici el kitapları (hidrofor/calorifier)",
  ],
  chapters: [
    {
      heading: "1. Hidrofor Prensibi",
      sections: [
        {
          subheading: "1.1 Basınçlı tank ve hava yastığı",
          paragraphs: [
            `Hidrofor, içinde hava yastığı (air cushion) bulunan basınçlı tanktır; pompa suyu tanka basar, hava sıkışır ve basınç oluşturur. Musluk açıldığında basınçlı hava suyu iter; basınç alt sınıra düşünce pompa otomatik devreye girer (pressure switch). Böylece pompa sürekli çalışmadan basınç korunur.`,
          ],
          bullets: [
            `Hava yastığı basıncı korur`,
            `Pressure switch pompayı otomatik çalıştırır`,
            `Sık devir = hava yastığı kaybı işareti`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Hava yastığı kaybı",
              text: `Pompanın çok sık devreye girmesi (short-cycling) genelde hidrofor hava yastığının suya doyduğunu gösterir; tank yeniden havalandırılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Dağıtım ve Sıcak Su",
      sections: [
        {
          subheading: "2.1 Tatlı su tankı ve hat",
          paragraphs: [
            `İçme suyu, ayrı (sadece içme suyuna ayrılmış) tatlı su tankından beslenir; tank ve hatlar gıda-güvenli kaplama/malzemeden olmalı ve teknik suyla karışmamalıdır. Geri akış önleyici (non-return) ve cross-connection yasağı kontaminasyonu engeller.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Çapraz bağlantı yasağı",
              text: `İçme suyu hattı asla teknik su, balast veya tuvalet suyu hattına bağlanmamalı; çapraz bağlantı toplu hastalığa yol açabilir.`,
            },
          ],
        },
        {
          subheading: "2.2 Calorifier (sıcak su)",
          paragraphs: [
            `Sıcak su, calorifier'da (elektrik veya buhar/ceket suyu ile) ısıtılır ve sirkülasyon hattıyla dağıtılır. Sıcak su sıcaklığı Legionella kontrolü için belirli seviyenin (genelde ≥60 °C depolama) üzerinde tutulur; soğuk su ise serin tutulur.`,
          ],
        },
      ],
    },
    {
      heading: "3. Hijyen ve Dezenfeksiyon",
      sections: [
        {
          subheading: "3.1 İçme suyu dezenfeksiyonu",
          paragraphs: [
            `İçme suyu klorlama veya UV ile dezenfekte edilir; FWG'den gelen mineralsiz su gerekirse mineralize edilir. Tanklar periyodik temizlenir ve dezenfekte edilir; su numuneleri test edilir. Düşük klor veya durgun su bakteriyel üremeye davetiyedir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC su gereksinimi",
              text: `MLC 2006, mürettebata yeterli ve güvenli içme suyu sağlanmasını ister; su kalitesi izlenmeli ve hijyen kayıtları tutulmalıdır.`,
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
            `Bakım; hidrofor hava yastığı kontrolü, pressure switch ayarı, pompa ve non-return valf, calorifier anot/element, tank temizliği ve dezenfeksiyon dozajını kapsar. Su numune testi düzenli yapılır.`,
          ],
          bullets: [
            `Hidrofor hava yastığı yenileme`,
            `Tank temizlik + dezenfeksiyon`,
            `Sıcak su ≥60 °C (Legionella)`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Pompa sık çalışıyor", "Hava yastığı kaybı", "Hidrofor havalandır"],
              ["Basınç düşük/dalgalı", "Pressure switch/sızıntı", "Switch ayarı, kaçak kontrol"],
              ["Su kokulu/bulanık", "Tank/hijyen sorunu", "Tank temizlik + dezenfeksiyon"],
              ["Sıcak su yok", "Calorifier element/buhar", "Element/buhar besleme kontrol"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
