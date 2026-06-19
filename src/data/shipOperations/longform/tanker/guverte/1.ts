import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Manifold bağlantısı, körük/hortum ve kör flanş kontrolü",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 1,
  estimatedPages: 22,
  intro: `Cargo manifold, geminin yük sistemiyle kıyı/terminal hattı arasındaki tek fiziksel arayüzdür; burada yapılan her bağlantı hatası doğrudan büyük çaplı dökülme (spill) ve yangın riskine dönüşür. Bu bölüm manifold bağlantısının hazırlığını, hortum/cool-arm (chiksan) montajını, sızdırmazlık ve bonding kontrolünü, basınç testini ve ESD/dry-break coupling doğrulamasını ele alır.`,
  sources: [
    "ISGOTT 6th edition",
    "OCIMF Hose Guidelines / Guide to Manufacturing and Purchasing Hoses",
    "OCIMF Recommendations for Oil Tanker Manifolds",
    "Ship/Shore Safety Checklist (SSSCL)",
  ],
  chapters: [
    {
      heading: "1. Manifold Hazırlığı",
      sections: [
        {
          subheading: "1.1 Bağlantı öncesi denetim",
          paragraphs: [
            `Bağlantıdan önce manifold flanşları, contalar (gasket), bolt'lar ve drip tray gözle denetlenir. Kullanılacak parsel için doğru manifold seçilir; kullanılmayan manifoldlar kör flanş (blank/blind flange) ile tam bolt sayısıyla kapatılır. Spill containment (drip tray) ve scupper plug'lar yerinde olmalıdır.`,
          ],
          bullets: [
            `Flanş yüzeyi temiz, conta hasarsız`,
            `Drip tray manifold altında, scupper plug takılı`,
            `Kullanılmayan manifold kör flanşlı (tam bolt)`,
            `Reducer/spool kullanılıyorsa sertifikalı ve uygun çap`,
          ],
        },
        {
          subheading: "1.2 Hortum/cool-arm seçimi",
          paragraphs: [
            `Hortumlar kargo cinsine ve basınca uygun, sertifikalı ve test tarihi geçerli olmalıdır. Cool-arm (chiksan/loading arm) kullanılıyorsa hareket zarfı (envelope) içinde kalındığı ve drift/limit alarmlarının çalıştığı doğrulanır.`,
          ],
        },
      ],
    },
    {
      heading: "2. Bağlantı ve Sızdırmazlık",
      sections: [
        {
          subheading: "2.1 Bolt sıkma ve conta",
          paragraphs: [
            `Manifold bolt'ları yıldız (çapraz) sırayla, kademeli torkla sıkılır; tek taraflı sıkma contayı ezerek sızıntı yaratır. Tüm bolt delikleri dolu olmalı, eksik bolt ile bağlantı yapılmamalıdır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Hortum failure",
              text: `Basınç altındaki bir hortum kopması jet etkisiyle ciddi yaralanma ve yangın yapar. Bağlantı sırasında manifold bölgesi yalnız yetkili personele açık tutulur.`,
            },
          ],
        },
        {
          subheading: "2.2 Bonding ve statik elektrik",
          paragraphs: [
            `Gemi-kıyı arasında potansiyel farkı ve statik kıvılcımı önlemek için bonding cable ve/veya insulating flange kullanımı ISGOTT'a göre düzenlenir. Çoğu modern terminalde insulating flange tercih edilir; bonding cable yanlış uygulanırsa katodik akım sorunları yaratabilir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Basınç Testi ve ESD",
      sections: [
        {
          subheading: "3.1 Leak/pressure test",
          paragraphs: [
            `Bağlantı, transfere başlamadan önce çalışma basıncının üzerinde (tipik 1.1 × MAWP) test edilir ve tüm flanşlar sızıntı açısından gözlenir. Sızıntı varsa basınç boşaltılıp conta/bolt düzeltilir.`,
          ],
        },
        {
          subheading: "3.2 ESD ve dry-break coupling",
          paragraphs: [
            `Emergency Shutdown (ESD) link ve dry-break (emergency release) coupling kontrol edilir; acil ayrılma durumunda hattın güvenli ve dökülmesiz ayrılacağı doğrulanır. ESD aktivasyon süresi maker spesinde olmalıdır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Ship/Shore Safety Checklist",
              text: `Bağlantı tamamlandığında pre-transfer checklist karşılıklı doldurulur ve imzalanır; eksik madde transferi durdurur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Kayıt ve Kontrol Listesi",
      sections: [
        {
          subheading: "4.1 Bağlantı öncesi son kontrol",
          bullets: [
            `Doğru manifold seçildi, diğerleri kör flanşlı mı?`,
            `Drip tray + scupper plug yerinde mi?`,
            `Bolt'lar yıldız sırayla tam mı?`,
            `Bonding/insulating flange uygun mu?`,
            `Pressure/leak test geçti mi?`,
            `ESD + dry-break coupling test edildi mi?`,
          ],
          paragraphs: [
            `Manifold, tanker güvenliğinin en yoğun risk noktasıdır; burada acele etmek değil, her flanşı tek tek doğrulamak esastır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
