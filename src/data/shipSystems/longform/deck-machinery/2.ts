import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Mooring Vinçleri ve Bağlama Sistemleri",
  sectionId: "deck-machinery",
  topicIndex: 2,
  estimatedPages: 25,
  intro: `Bağlama (mooring) vinçleri, gemiyi rıhtıma veya şamandıraya emniyetle bağlamak için halatları toplayan, gergin tutan ve salan güverte makineleridir. OCIMF MEG4, bağlama emniyetinin merkezine halat kopma yükü (MBL), vinç fren tutma kapasitesi (brake holding capacity) ve bağlama düzeninin (mooring pattern) doğru tasarımını koyar. Bu bölüm; vinç tiplerini (split drum, render-recover, otomatik gergi), fren tutma kapasitesi hesabını ve %60 MBL kuralını, snap-back tehlike bölgelerini, halat seçimini ve bağlama operasyonunun emniyet yönetimini derinlemesine işler.`,
  sources: [
    "OCIMF Mooring Equipment Guidelines (MEG4)",
    "ISO 3730 — Mooring winches",
    "OCIMF Effective Mooring",
    "SIRE / TMSA bağlama denetim kriterleri",
    "Üretici el kitapları (Rolls-Royce, Hatlapa, TTS-MacGregor)",
  ],
  chapters: [
    {
      heading: "1. Bağlama Vinci Tipleri",
      sections: [
        {
          subheading: "1.1 Split drum ve undivided drum",
          paragraphs: [
            `Split drum vinçlerde tambur iki bölmelidir: çalışma (working/tension) bölümü ve depolama (storage) bölümü. Halatın yalnızca bir tabakası (single layer) çalışma bölümünde gergi taşır; bu, fren tutma kapasitesinin halat çapına ve sarım katmanına bağlı düşmesini önler. Undivided drumda halat üst üste sarıldıkça fren tutma kapasitesi azalır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Neden split drum?",
              text: `Split drumda yük daima ilk katmanda taşınır; böylece fren tutma kapasitesi katman sayısından bağımsız ve öngörülebilir kalır. MEG4 split drumu önerir.`,
            },
          ],
        },
        {
          subheading: "1.2 Render-recover ve otomatik gergi",
          paragraphs: [
            `Otomatik gergili (auto-tension) vinçler halatı önceden ayarlanmış gergide tutmaya çalışır: gergi düşerse toplar, artarsa salar (render). Ancak gel-git ve draft değişiminde sürekli render gemi emniyetini bozabilir; bu nedenle birçok terminal bağlı durumda auto-tension'ı yasaklar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Auto-tension yasağı",
              text: `Bağlı (alongside) durumda auto-tension açık bırakmak, komşu halatların aşırı yüklenmesine ve zincirleme kopmaya yol açabilir. Bağlandıktan sonra vinç frene alınır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Fren Tutma Kapasitesi ve MBL",
      sections: [
        {
          subheading: "2.1 Tanımlar",
          paragraphs: [
            `MBL (Minimum Breaking Load), halatın koptuğu yüktür. Ship Design MBL (SDMBL), bağlama sisteminin tasarlandığı referans MBL'dir. Vinç freni, halat kopmadan önce kayacak (render) şekilde ayarlanır; böylece halat değil, fren devreye girer.`,
          ],
          table: {
            headers: ["Parametre", "MEG4 kriteri"],
            rows: [
              ["Fren tutma ayarı", "SDMBL'nin %60'ı"],
              ["Tail (kuyruk halat) MBL", "Ana halatın ≥ %125-150'si"],
              ["Halat tasarım gerilimi", "Çalışmada MBL'nin %55'ini aşmamalı"],
              ["Fren testi periyodu", "Yıllık + şüphede"],
            ],
            caption: "MEG4 bağlama emniyet kriterleri",
          },
        },
        {
          subheading: "2.2 Neden %60 MBL?",
          paragraphs: [
            `Fren %60 MBL'de kaymaya ayarlanır ki aşırı yük geldiğinde halat kopmadan fren render etsin (kontrollü kayma). Bu, hem halatı hem de personeli korur: kopan bir halatın geri savrulması (snap-back) ölümcüldür.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Snap-back zone",
              text: `Halat koptuğunda saklı enerji halatı kamçı gibi geri savurur. Güvertede snap-back tehlike bölgeleri işaretlenmeli ve operasyon sırasında personel bu bölgelerden uzak tutulmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Halat Seçimi ve Bağlama Düzeni",
      sections: [
        {
          subheading: "3.1 Halat tipleri",
          paragraphs: [
            `Bağlamada çelik tel, yüksek modüllü sentetik (HMPE/Dyneema) ve polyester/naylon halatlar kullanılır. Elastikiyet (elongation) ve snap-back enerjisi malzemeye göre değişir; naylon esnek ama yüksek snap-back enerjili, HMPE az esner ve hafiftir.`,
          ],
          table: {
            headers: ["Halat", "Özellik", "Dikkat"],
            rows: [
              ["Çelik tel", "Az esner, dayanıklı", "Korozyon, ağır, yaralanma riski"],
              ["Naylon", "Çok esner, ucuz", "Yüksek snap-back enerjisi"],
              ["Polyester", "Orta esner", "Dengeli seçim"],
              ["HMPE (Dyneema)", "Az esner, hafif, güçlü", "UV/abrazyon, pahalı"],
            ],
          },
        },
        {
          subheading: "3.2 Mooring pattern",
          paragraphs: [
            `Tipik bağlama düzeni baş/kıç hat (head/stern lines), açmaz (breast lines) ve spring hatlarından oluşur. Boyuna kuvvetleri spring'ler, enine kuvvetleri breast'ler karşılar. Hatların aynı malzeme ve uzunlukta olması yükün dengeli dağılması için önemlidir.`,
          ],
          bullets: [
            `Aynı yöndeki hatlar aynı tip/uzunlukta olmalı (yük paylaşımı)`,
            `Karışık (mixed) halat kullanımı yükü tek hatta yığar`,
            `Fairlead ve bitt açıları halat ömrünü etkiler`,
          ],
        },
      ],
    },
    {
      heading: "4. Operasyon, Bakım ve Arıza",
      sections: [
        {
          subheading: "4.1 Bağlama operasyonu emniyeti",
          paragraphs: [
            `Bağlama, gemideki en tehlikeli operasyonlardan biridir. Tatbikatlı ekip, net iletişim, snap-back bölgelerinden uzak durma ve eldiven/baret kullanımı esastır. Halat gergideyken kimse halat üzerinden atlamamalı veya bight (halka) içinde durmamalıdır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Kaza örneği",
              text: `Birçok ölümcül liman kazası, gergin haldeki naylon halatın kopup snap-back bölgesindeki personeli çarpmasıyla yaşanmıştır. Bölge işaretlemesi ve disiplin hayat kurtarır.`,
            },
          ],
        },
        {
          subheading: "4.2 Bakım ve arıza tablosu",
          paragraphs: [`Vinç ve fren bakımı bağlama emniyetinin temelidir.`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Fren kayıyor (düşük tutma)", "Balata aşınmış/yağlı, ayar bozuk", "Fren testi + balata/ayar"],
              ["Vinç toplamıyor", "Hidrolik basınç / kavrama", "Basınç ve kavrama kontrolü"],
              ["Halatta aşırı aşınma", "Fairlead/bitt keskin köşe", "Yüzeyleri düzelt, halat dön/değiştir"],
              ["Auto-tension sürekli render", "Set düşük, draft değişimi", "Frene al, ayarı gözden geçir"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
